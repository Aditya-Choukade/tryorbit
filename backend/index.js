require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { fetchRedditPosts, preparePostText } = require('./redditService');
const { processWithAI, sleep } = require('./aiService');
const { calculateOrbitScore } = require('./scoreService');

const app = express();
const PORT = process.env.PORT || 8000;

// ── In-memory store for processed problems ──────────────────────────────────
// Keyed by problem ID so detail lookups are O(1)
const problemsStore = new Map();
let problemCounter = 0; // Simple incrementing ID

// Highly curated subreddits where professionals report pain points
const DEFAULT_SUBREDDITS = ['startups', 'smallbusiness', 'SaaS', 'webdev', 'freelance'];

// Middleware
app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────
// Route 1: Raw Reddit Posts
// GET /api/reddit?subreddit=startups
// ─────────────────────────────────────────────
app.get('/api/reddit', async (req, res) => {
    try {
        const subreddit = req.query.subreddit || 'startups';
        console.log(`[API] GET /api/reddit → r/${subreddit}`);
        const posts = await fetchRedditPosts([subreddit], 20);
        res.status(200).json({ success: true, count: posts.length, subreddit, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve Reddit data.', error: error.message });
    }
});

// ─────────────────────────────────────────────
// Route 2: AI-Processed Problem Feed
// GET /api/problems
// GET /api/problems?subreddits=startups,SaaS&limit=5
// ─────────────────────────────────────────────
app.get('/api/problems', async (req, res) => {
    try {
        const subreddits = req.query.subreddits
            ? req.query.subreddits.split(',').map(s => s.trim()).filter(Boolean)
            : DEFAULT_SUBREDDITS;

        // Cap at 8 to prevent frontend request timeouts (AI processing takes time)
        const limit = Math.min(parseInt(req.query.limit) || 5, 8);

        console.log(`\n${'━'.repeat(60)}`);
        console.log(`[API] GET /api/problems | Subreddits: ${subreddits.join(', ')} | Limit: ${limit}`);
        console.log(`${'━'.repeat(60)}\n`);

        // Step 1: Fetch from multiple subreddits
        const rawPosts = await fetchRedditPosts(subreddits, limit);

        if (rawPosts.length === 0) {
            return res.status(200).json({ success: true, count: 0, subreddits, data: [] });
        }

        console.log(`[API] Sending ${rawPosts.length} posts to AI...\n`);

        // Step 2: Process each post through AI sequentially
        const problems = [];

        for (let i = 0; i < rawPosts.length; i++) {
            const post = rawPosts[i];
            const inputText = preparePostText(post, 1000);

            console.log(`[API] Post ${i + 1}/${rawPosts.length}: "${post.title.substring(0, 70)}..." (r/${post.subreddit}, ↑${post.upvotes})`);

            const aiResult = await processWithAI(inputText, i + 1);

            if (aiResult) {
                const { orbitScore, scoreLabel } = calculateOrbitScore(post, aiResult);

                // Generate a unique, stable ID for this problem
                problemCounter += 1;
                const id = `problem_${problemCounter}`;

                const problem = {
                    id,
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
                };

                // Store for detail lookup
                problemsStore.set(id, problem);
                problems.push(problem);

                console.log(`  ✅ [${id}] "${aiResult.problem}" [${aiResult.industry}] → Score: ${orbitScore} (${scoreLabel})\n`);
            } else {
                console.log(`  ⏭️  Skipped\n`);
            }

            // Cool down between requests
            if (i < rawPosts.length - 1) {
                await sleep(1000);
            }
        }

        console.log(`${'─'.repeat(60)}`);
        console.log(`[API] DONE: ${problems.length} problems extracted. Store size: ${problemsStore.size}`);
        console.log(`${'─'.repeat(60)}\n`);

        res.status(200).json({ success: true, count: problems.length, subreddits, data: problems });

    } catch (error) {
        console.error('[API] Fatal error in /api/problems:', error.message);
        res.status(500).json({ success: false, message: 'Failed to process Reddit data with AI.', error: error.message });
    }
});

// ─────────────────────────────────────────────
// Route 3: Problem Detail by ID (NEW)
// GET /api/problems/:id
// ─────────────────────────────────────────────
app.get('/api/problems/:id', (req, res) => {
    const { id } = req.params;
    console.log(`[API] GET /api/problems/${id}`);

    const problem = problemsStore.get(id);

    if (!problem) {
        return res.status(404).json({
            success: false,
            message: `Problem "${id}" not found. The server may have restarted — visit /dashboard to refresh the feed.`,
        });
    }

    res.status(200).json({ success: true, data: problem });
});

// ─────────────────────────────────────────────
// Route 4: Store debug (dev only)
// GET /api/store
// ─────────────────────────────────────────────
app.get('/api/store', (req, res) => {
    const ids = [...problemsStore.keys()];
    res.status(200).json({ count: problemsStore.size, ids });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Orbit Backend v3.0 running on http://localhost:${PORT}`);
    console.log(`\n📡 Endpoints:`);
    console.log(`   GET /api/problems              → AI-processed problem feed`);
    console.log(`   GET /api/problems/:id          → Problem detail by ID`);
    console.log(`   GET /api/reddit                → Raw Reddit posts`);
    console.log(`   GET /api/store                 → Debug: list stored IDs`);
    console.log(`\n🔑 GitHub Token: ${process.env.GITHUB_TOKEN ? '✅ loaded' : '❌ MISSING'}\n`);
});
