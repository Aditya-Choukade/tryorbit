/**
 * Orbit Score Engine
 * A deterministic, fast, pure scoring system for evaluating problem quality.
 * No AI calls — runs instantly.
 */

// Tags that indicate high pain intensity
const PAIN_TAG_SCORES = {
    frustration: 10,
    frustrated:  10,
    urgent:      10,
    urgency:     10,
    pain:         5,
    painful:      5,
    annoying:     5,
    broken:       5,
    failing:      4,
    expensive:    4,
    manual:       3,
    slow:         3,
    tedious:      3,
};

/**
 * Normalizes upvote count into an engagement subscore (0–25).
 */
function scoreUpvotes(upvotes) {
    if (upvotes >= 500) return 25;
    if (upvotes >= 200) return 20;
    if (upvotes >= 100) return 15;
    if (upvotes >= 50)  return 10;
    if (upvotes >= 10)  return 5;
    return 2;
}

/**
 * Normalizes comment count into an engagement subscore (0–15).
 */
function scoreComments(comments) {
    if (comments >= 100) return 15;
    if (comments >= 50)  return 12;
    if (comments >= 20)  return 9;
    if (comments >= 5)   return 5;
    if (comments >= 1)   return 2;
    return 0;
}

/**
 * Scores based on AI-extracted tags (0–30 max).
 */
function scoreTagIntensity(tags = []) {
    let total = 0;
    const normalizedTags = tags.map(t => t.toLowerCase().replace(/[^a-z]/g, ''));
    for (const tag of normalizedTags) {
        total += PAIN_TAG_SCORES[tag] || 0;
    }
    return Math.min(total, 30);
}

/**
 * Scores content quality — problem clarity and summary richness (0–20 max).
 */
function scoreContent(problem = '', summary = '') {
    let score = 0;
    // Summary length indicates depth of insight
    if (summary.length > 100) score += 10;
    else if (summary.length > 50) score += 6;
    else if (summary.length > 20) score += 3;

    // Problem statement clarity (length proxy for specificity)
    if (problem.length > 60) score += 10;
    else if (problem.length > 30) score += 6;
    else if (problem.length > 10) score += 3;

    return Math.min(score, 20);
}

/**
 * Returns a human-readable label for the given score.
 *
 * @param {number} score
 * @returns {string}
 */
function getScoreLabel(score) {
    if (score >= 80) return 'High Opportunity';
    if (score >= 50) return 'Medium';
    return 'Low';
}

/**
 * Main scoring entry point. Returns orbitScore and scoreLabel.
 *
 * @param {Object} post    - Reddit post { upvotes, comments, content }
 * @param {Object} aiData  - AI result { problem, summary, tags }
 * @returns {{ orbitScore: number, scoreLabel: string }}
 */
function calculateOrbitScore(post, aiData) {
    const engagementScore  = scoreUpvotes(post.upvotes || 0) + scoreComments(post.comments || 0); // 0–40
    const tagScore         = scoreTagIntensity(aiData.tags || []);                                 // 0–30
    const contentScore     = scoreContent(aiData.problem || '', aiData.summary || '');             // 0–20

    // Bonus: extra 10 points if the post has strong engagement AND strong tags
    const synergyBonus = (engagementScore > 25 && tagScore > 10) ? 10 : 0;

    const raw = engagementScore + tagScore + contentScore + synergyBonus;
    const orbitScore = Math.max(0, Math.min(100, raw));

    console.log(`  [Score] engagement=${engagementScore} tags=${tagScore} content=${contentScore} bonus=${synergyBonus} → total=${orbitScore}`);

    return {
        orbitScore,
        scoreLabel: getScoreLabel(orbitScore),
    };
}

module.exports = { calculateOrbitScore };
