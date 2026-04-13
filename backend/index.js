require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { fetchRedditPosts, preparePostText } = require('./redditService');
const { processWithAI, sleep } = require('./aiService');
const { calculateOrbitScore } = require('./scoreService');
const { getProblems, getProblemById, insertProblems, healthCheck } = require('./supabaseService');

const app = express();
const PORT = process.env.PORT || 8000;

// Curated subreddits with high complaint density
const DEFAULT_SUBREDDITS = ['startups', 'smallbusiness', 'SaaS', 'webdev', 'freelance'];

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

    for (let i = 0; i < rawPosts.length; i++) {
        const post = rawPosts[i];
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
    console.log(`[Sync] Done: ${rawPosts.length} fetched → ${processed.length} processed → ${inserted} inserted to DB`);
    console.log(`${'─'.repeat(60)}\n`);

    return { fetched: rawPosts.length, processed: processed.length, inserted };
}

// ─────────────────────────────────────────────────────────────
// Route 1: GET /api/problems  — fetch from DB (FAST, no AI)
// ─────────────────────────────────────────────────────────────
app.get('/api/problems', async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 20, 50);
        console.log(`[API] GET /api/problems (limit: ${limit})`);

        const problems = await getProblems(limit);

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
    console.log(`\n🚀 Orbit Backend v4.0 running on http://localhost:${PORT}`);
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
    } else {
        console.error(`❌ Supabase connection failed! Check SUPABASE_URL and SUPABASE_KEY in .env\n`);
    }
});
