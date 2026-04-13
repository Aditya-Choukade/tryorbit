const axios = require('axios');

/**
 * Fetches raw posts from a single subreddit's public JSON endpoint.
 *
 * @param {string} subreddit - Subreddit name (e.g., "startups").
 * @param {number} limit - Max posts to fetch per subreddit.
 * @returns {Promise<Array>} Array of cleaned post objects.
 */
async function fetchFromSubreddit(subreddit, limit = 25) {
    // Search explicitly for complaint keywords to extract heavily concentrated problems
    const keywords = "frustrating OR hate OR annoying OR struggle OR problem OR hard OR manual";
    const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(keywords)}&restrict_sr=on&sort=new&limit=${limit}`;

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
            url: `https://reddit.com${d.permalink}`
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
async function fetchRedditPosts(subreddits = ['startups'], totalLimit = 15) {
    const allPosts = [];

    console.log(`\n[RedditService] Fetching from ${subreddits.length} subreddit(s): ${subreddits.join(', ')}`);

    for (const sub of subreddits) {
        try {
            const posts = await fetchFromSubreddit(sub, 10);
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
        // Must have a title
        if (!post.title || post.title.length < 10) return false;
        
        // Combined text must have some substance
        const combined = post.title + ' ' + post.content;
        if (combined.length < 30) return false;
        
        // Skip mod/bot posts and blatant self-promotion/guides
        const lowerText = combined.toLowerCase();
        if (
            lowerText.includes('[hiring') || 
            lowerText.includes('[weekly') || 
            lowerText.includes('megathread') ||
            lowerText.includes('how i got') ||
            lowerText.includes('how we got') ||
            lowerText.includes('my first 10') ||
            lowerText.includes('my first 100') ||
            lowerText.includes('just launched') ||
            lowerText.includes('here is how') ||
            lowerText.includes('guide to')
        ) {
            return false;
        }

        return true;
    });

    // ── Sort by upvotes (highest first) and limit ──
    const sorted = strong.sort((a, b) => b.upvotes - a.upvotes).slice(0, totalLimit);

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
