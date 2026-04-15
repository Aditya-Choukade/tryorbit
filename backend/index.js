require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { fetchRedditPosts, preparePostText } = require('./redditService');
const { processWithAI, sleep } = require('./aiService');
const { calculateOrbitScore } = require('./scoreService');
const { getProblems, getProblemById, insertProblems, healthCheck, hasProblemWithUrl, searchProblems } = require('./supabaseService');

const app = express();
const PORT = process.env.PORT || 8000;

// Curated subreddits with concentrated startup problems
const DEFAULT_SUBREDDITS = ['startups', 'Entrepreneur', 'SaaS', 'smallbusiness', 'india'];

// Track whether a sync is currently running to prevent overlap
let isSyncing = false;

app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────────────────────
// CORE: Reddit → AI → Score → Supabase pipeline
// ─────────────────────────────────────────────────────────────

/**
 * Full sync pipeline: fetches Reddit posts, processes with AI,
 * scores them, and inserts new ones into Supabase.
 *
 * @param {string[]} subreddits
 * @param {number}   limit
 * @returns {Promise<{fetched, processed, inserted}>}
 */
async function syncRedditToDB(subreddits = DEFAULT_SUBREDDITS, limit = 5) {
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`[Sync] Starting Reddit → AI → Supabase pipeline`);
    console.log(`  Subreddits: ${subreddits.join(', ')} | Limit: ${limit}`);
    console.log(`${'═'.repeat(60)}\n`);

    // Step 1: Fetch raw posts
    const rawPosts = await fetchRedditPosts(subreddits, limit);
    console.log(`[Sync] Fetched ${rawPosts.length} posts after filtering\n`);

    if (rawPosts.length === 0) {
        return { fetched: 0, processed: 0, inserted: 0 };
    }

    // Step 2: AI process + score each post
    const processed = [];

    let skipped = 0;

    for (let i = 0; i < rawPosts.length; i++) {
        const post = rawPosts[i];

        // Ensure we don't process posts already in DB to save AI compute & time
        if (await hasProblemWithUrl(post.url)) {
            console.log(`[Sync] ⏭️ Skipped (already in DB): "${post.title.substring(0, 50)}..."`);
            skipped++;
            continue;
        }

        const inputText = preparePostText(post, 1000);

        console.log(`[Sync] Post ${i + 1}/${rawPosts.length}: "${post.title.substring(0, 65)}..." (r/${post.subreddit}, ↑${post.upvotes})`);

        const aiResult = await processWithAI(inputText, i + 1);

        if (aiResult) {
            const { orbitScore, scoreLabel } = calculateOrbitScore(post, aiResult);

            processed.push({
                problem:     aiResult.problem,
                industry:    aiResult.industry,
                summary:     aiResult.summary,
                tags:        aiResult.tags,
                complaints:  aiResult.complaints,
                rootCause:   aiResult.rootCause,
                opportunity: aiResult.opportunity,
                source:      'Reddit',
                subreddit:   post.subreddit,
                upvotes:     post.upvotes,
                comments:    post.comments,
                url:         post.url,
                orbitScore,
                scoreLabel,
            });
            console.log(`  ✅ "${aiResult.problem}" → Score: ${orbitScore} (${scoreLabel})\n`);
        } else {
            console.log(`  ⏭️  Skipped (AI returned null)\n`);
        }

        if (i < rawPosts.length - 1) await sleep(1000);
    }

    // Step 3: Batch insert into Supabase (duplicates skipped automatically)
    const inserted = await insertProblems(processed);

    console.log(`${'─'.repeat(60)}`);
    console.log(`[Sync] Done: ${rawPosts.length} fetched | ${skipped} skipped (dupes) | ${processed.length} AI processed | ${inserted} inserted to DB`);
    console.log(`${'─'.repeat(60)}\n`);

    return { fetched: rawPosts.length, processed: processed.length, skipped, inserted };
}

// ─────────────────────────────────────────────────────────────
// Route 1: GET /api/problems  — fetch from DB (FAST, no AI)
// ─────────────────────────────────────────────────────────────
app.get('/api/problems', async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 20, 50);
        const VALID_SORTS = ['orbit_score', 'newest', 'trend'];
        const sort = VALID_SORTS.includes(req.query.sort) ? req.query.sort : 'orbit_score';
        const industry = req.query.industry || null;

        console.log(`[API] GET /api/problems (limit: ${limit}, sort: ${sort}, industry: ${industry || 'all'})`);

        const problems = await getProblems(limit, sort, industry);

        if (problems.length === 0) {
            // DB is empty — auto-trigger a sync in the background
            console.log('[API] DB empty — triggering background sync...');
            if (!isSyncing) {
                isSyncing = true;
                syncRedditToDB().finally(() => { isSyncing = false; });
            }

            return res.status(200).json({
                success: true,
                count: 0,
                syncing: true,
                message: 'Database is empty. Background sync started — check back in ~1 minute.',
                data: [],
            });
        }

        res.status(200).json({ success: true, count: problems.length, data: problems });
    } catch (error) {
        console.error('[API] GET /api/problems error:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch problems from database.', error: error.message });
    }
});

// ─────────────────────────────────────────────────────────────
// Route 2: GET /api/problems/:id  — fetch single from DB
// ─────────────────────────────────────────────────────────────
app.get('/api/problems/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`[API] GET /api/problems/${id}`);

    try {
        const problem = await getProblemById(id);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: `Problem "${id}" not found in database.`,
            });
        }

        res.status(200).json({ success: true, data: problem });
    } catch (error) {
        console.error('[API] GET /api/problems/:id error:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch problem.', error: error.message });
    }
});

// ─────────────────────────────────────────────────────────────
// Route: GET /api/search?q=keyword  — keyword search from DB
// ─────────────────────────────────────────────────────────────
app.get('/api/search', async (req, res) => {
    const q = (req.query.q || '').trim();
    console.log(`[API] GET /api/search?q=${q}`);

    if (!q) {
        return res.status(400).json({ success: false, message: 'Query parameter ?q= is required.' });
    }

    try {
        const results = await searchProblems(q, 20);
        res.status(200).json({ success: true, count: results.length, query: q, data: results });
    } catch (error) {
        console.error('[API] /api/search error:', error.message);
        res.status(500).json({ success: false, message: 'Search failed.', error: error.message });
    }
});

// ─────────────────────────────────────────────────────────────
// Route: POST /api/validate  — AI validates a startup idea
// ─────────────────────────────────────────────────────────────
app.post('/api/validate', async (req, res) => {
    const { idea } = req.body;
    if (!idea || idea.trim().length < 10) {
        return res.status(400).json({ success: false, message: 'Please provide a startup idea (min 10 chars).' });
    }

    console.log(`[API] POST /api/validate: "${idea.substring(0, 80)}..."`);

    const VALIDATE_PROMPT = `You are a startup analyst. A founder has described their idea below.
Return ONLY valid JSON. No markdown, no explanation.

Idea: "${idea}"

Analyze and return:
{
  "verdict": "Build" | "Validate Further" | "High Risk",
  "score": <0-100 demand score>,
  "marketSize": "<1-2 sentence TAM estimate>",
  "targetCustomer": "<who needs this most, 1 sentence>",
  "competitors": ["<competitor 1>", "<competitor 2>", "<competitor 3>"],
  "keyRisks": ["<risk 1>", "<risk 2>", "<risk 3>"],
  "uniqueAngle": "<what gap this fills, 1 sentence>",
  "firstStep": "<recommended first action for the founder, 1 sentence>"
}`;

    try {
        const axios = require('axios');
        const token = process.env.GITHUB_TOKEN;

        const response = await axios.post(
            'https://models.github.ai/inference/chat/completions',
            {
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'You are a JSON API. Return ONLY valid JSON, no markdown.' },
                    { role: 'user', content: VALIDATE_PROMPT }
                ],
                temperature: 0.3,
                max_tokens: 700,
                response_format: { type: 'json_object' }
            },
            {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                timeout: 30000
            }
        );

        const raw = response.data.choices[0].message.content;
        const parsed = JSON.parse(raw);
        res.status(200).json({ success: true, idea, data: parsed });
    } catch (error) {
        console.error('[API] /api/validate error:', error.message);
        res.status(500).json({ success: false, message: 'Validation failed. Try again.', error: error.message });
    }
});

// ─────────────────────────────────────────────────────────────
// Route 3: POST /api/sync  — trigger Reddit → AI → DB pipeline
// ─────────────────────────────────────────────────────────────
app.post('/api/sync', async (req, res) => {
    if (isSyncing) {
        return res.status(409).json({ success: false, message: 'Sync already in progress. Please wait.' });
    }

    const subreddits = req.body.subreddits || DEFAULT_SUBREDDITS;
    const limit      = Math.min(req.body.limit || 5, 8);

    // Respond immediately — sync runs in background
    res.status(202).json({
        success: true,
        message: `Sync started for: ${subreddits.join(', ')} (limit: ${limit}). Check /api/sync/status for progress.`,
    });

    isSyncing = true;
    syncRedditToDB(subreddits, limit).finally(() => { isSyncing = false; });
});

// ─────────────────────────────────────────────────────────────
// Route 4: GET /api/sync/status
// ─────────────────────────────────────────────────────────────
app.get('/api/sync/status', (req, res) => {
    res.status(200).json({ syncing: isSyncing });
});

// ─────────────────────────────────────────────────────────────
// Route 5: GET /api/reddit  — raw Reddit posts (debug)
// ─────────────────────────────────────────────────────────────
app.get('/api/reddit', async (req, res) => {
    try {
        const subreddit = req.query.subreddit || 'startups';
        const posts = await fetchRedditPosts([subreddit], 20);
        res.status(200).json({ success: true, count: posts.length, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ─────────────────────────────────────────────────────────────
// Route 6: GET /api/health
// ─────────────────────────────────────────────────────────────
app.get('/api/health', async (req, res) => {
    const db = await healthCheck();
    res.status(db ? 200 : 503).json({
        status: db ? 'ok' : 'degraded',
        database: db ? 'connected' : 'unreachable',
        syncing: isSyncing,
    });
});

// ─────────────────────────────────────────────────────────────
// Boot
// ─────────────────────────────────────────────────────────────
app.listen(PORT, async () => {
    console.log(`\n🚀 Orbit Backend v5.0 running on http://localhost:${PORT}`);
    console.log(`\n📡 Endpoints:`);
    console.log(`   GET  /api/problems          → Fetch from Supabase DB (fast)`);
    console.log(`   GET  /api/problems/:id       → Single problem by UUID`);
    console.log(`   POST /api/sync               → Trigger Reddit→AI→DB pipeline`);
    console.log(`   GET  /api/sync/status        → Is sync running?`);
    console.log(`   GET  /api/health             → DB connection status`);
    console.log(`\n🔑 GitHub Token:  ${process.env.GITHUB_TOKEN ? '✅' : '❌ MISSING'}`);
    console.log(`🗄️  Supabase URL:  ${process.env.SUPABASE_URL ? '✅' : '❌ MISSING'}`);
    console.log(`🗄️  Supabase Key:  ${process.env.SUPABASE_KEY ? '✅' : '❌ MISSING'}\n`);

    // DB health check at startup
    const dbOk = await healthCheck();
    if (dbOk) {
        console.log(`✅ Supabase connected successfully!\n`);

        // ── Startup sync: run if DB has fewer than 5 rows ──────────────
        // Prevents re-triggering on every nodemon restart while ensuring
        // a cold-start server always seeds itself with fresh data.
        const existingProblems = await getProblems(5);
        const rowCount = existingProblems.length;

        if (rowCount < 5 && !isSyncing) {
            console.log(`[Boot] DB has <5 rows — running initial sync to seed data...\n`);
            isSyncing = true;
            syncRedditToDB(DEFAULT_SUBREDDITS, 20).finally(() => { isSyncing = false; });
        } else {
            console.log(`[Boot] DB already populated (${rowCount}+ rows) — skipping startup sync.\n`);
        }
    } else {
        console.error(`❌ Supabase connection failed! Check SUPABASE_URL and SUPABASE_KEY in .env\n`);
    }

    // ── Hourly background sync ──
    setInterval(() => {
        if (!isSyncing) {
            console.log('\n[Auto-Sync] ⏰ Hourly sync starting to discover fresh problems...');
            isSyncing = true;
            syncRedditToDB(DEFAULT_SUBREDDITS, 20).finally(() => { isSyncing = false; });
        } else {
            console.log('\n[Auto-Sync] ⏳ Skipped hourly sync — a sync is already in progress.');
        }
    }, 60 * 60 * 1000); // Every 1 hour
});
