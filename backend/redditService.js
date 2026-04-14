const axios = require('axios');

/**
 * Fetches raw posts from a single subreddit's public JSON endpoint.
 *
 * @param {string} subreddit - Subreddit name (e.g., "startups").
 * @param {number} limit - Max posts to fetch per subreddit.
 * @returns {Promise<Array>} Array of cleaned post objects.
 */
async function fetchFromSubreddit(subreddit, limit = 25) {
    // Fetch the genuine newest posts — not keyword-filtered — so we catch
    // fresh discussions before they gain traction.
    const url = `https://www.reddit.com/r/${subreddit}/new.json?limit=${limit}&raw_json=1`;

    const response = await axios.get(url, {
        headers: {
            'User-Agent': 'OrbitApp/1.0.0 (Node.js/Axios Fetcher)'
        },
        timeout: 15000
    });

    const rawPosts = response.data.data.children;

    return rawPosts.map(post => {
        const d = post.data;
        return {
            title: (d.title || '').trim(),
            content: (d.selftext || '').trim(),
            upvotes: d.ups || 0,
            comments: d.num_comments || 0,
            subreddit: d.subreddit,
            url: `https://reddit.com${d.permalink}`,
            created_utc: d.created_utc || 0
        };
    });
}

/**
 * Fetches and combines posts from MULTIPLE subreddits.
 * Deduplicates by URL, filters weak posts, and limits total output.
 *
 * @param {string[]} subreddits - Array of subreddit names.
 * @param {number} totalLimit - Max total posts to return after combining.
 * @returns {Promise<Array>} Combined, deduplicated, filtered post array.
 */
async function fetchRedditPosts(subreddits = ['startups'], totalLimit = 30) {
    const allPosts = [];

    console.log(`\n[RedditService] Fetching from ${subreddits.length} subreddit(s): ${subreddits.join(', ')}`);

    for (const sub of subreddits) {
        try {
            const posts = await fetchFromSubreddit(sub, 20); // fetch plenty to ensure we hit totalLimit
            console.log(`[RedditService]   r/${sub} → ${posts.length} raw posts`);
            allPosts.push(...posts);
        } catch (err) {
            console.error(`[RedditService]   r/${sub} → FAILED: ${err.message}`);
            // Continue to next subreddit even if one fails
        }
    }

    // ── Deduplicate by URL ──
    const seen = new Set();
    const unique = allPosts.filter(post => {
        if (seen.has(post.url)) return false;
        seen.add(post.url);
        return true;
    });

    // ── Filter weak or promotional posts ──
    const strong = unique.filter(post => {
        // Must have a meaningful title
        if (!post.title || post.title.length < 15) return false;

        // Must have some body content (pure link posts / empty selftext skipped)
        if (!post.content || post.content.trim().length < 40) return false;

        // Skip mod / megathread / promotional posts
        const lower = (post.title + ' ' + post.content).toLowerCase();
        if (
            lower.includes('[hiring') ||
            lower.includes('[weekly') ||
            lower.includes('megathread') ||
            lower.includes('how i got') ||
            lower.includes('how we got') ||
            lower.includes('my first 10') ||
            lower.includes('my first 100') ||
            lower.includes('just launched') ||
            lower.includes('here is how') ||
            lower.includes('guide to') ||
            lower.includes('ama:') ||
            lower.includes('ask me anything')
        ) {
            return false;
        }

        return true;
    });

    // ── Sort by newest (highest timestamp first) and limit ──
    const sorted = strong.sort((a, b) => b.created_utc - a.created_utc).slice(0, totalLimit);

    console.log(`[RedditService] Total: ${allPosts.length} raw → ${unique.length} unique → ${strong.length} strong → ${sorted.length} returned\n`);

    return sorted;
}

/**
 * Prepares a post for AI processing by combining title + content
 * and truncating to a safe character limit.
 *
 * @param {Object} post - A post object with title and content fields.
 * @param {number} maxChars - Maximum characters for the combined text.
 * @returns {string} Prepared text string.
 */
function preparePostText(post, maxChars = 1000) {
    let text = `Title: ${post.title}`;
    if (post.content) {
        text += `\n\nContent: ${post.content}`;
    }
    // Truncate to limit
    if (text.length > maxChars) {
        text = text.substring(0, maxChars) + '...';
    }
    return text;
}

module.exports = { fetchRedditPosts, preparePostText };
