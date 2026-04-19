const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('[Supabase] ❌ SUPABASE_URL or SUPABASE_KEY not set in .env!');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Maps a raw DB row (snake_case) to the API response shape (camelCase).
 * Keeps the frontend consistent regardless of DB column naming.
 */
function rowToApiShape(row) {
    return {
        id:          row.id,
        problem:     row.problem,
        industry:    row.industry,
        summary:     row.summary,
        tags:        row.tags        || [],
        complaints:  row.complaints  || [],
        rootCause:   row.root_cause,
        opportunity: row.opportunity,
        orbitScore:  row.orbit_score,
        scoreLabel:  row.score_label,
        source:      row.source,
        subreddit:   row.subreddit,
        upvotes:     row.upvotes,
        comments:    row.comments,
        url:         row.url,
        createdAt:   row.created_at,
    };
}

// ─────────────────────────────────────────────────────────────────
// READ
// ─────────────────────────────────────────────────────────────────

/**
 * Fetch latest problems from Supabase (used for the dashboard feed).
 * @param {number} limit
 * @param {'orbit_score'|'newest'|'trend'} sort
 * @param {string|null} industry  - optional industry filter
 * @returns {Promise<Array>}
 */
async function getProblems(limit = 20, sort = 'orbit_score', industry = null, offset = 0) {
    let query = supabase.from('problems').select('*', { count: 'exact' }).range(offset, offset + limit - 1);

    // Industry filter
    if (industry && industry !== 'all') {
        query = query.ilike('industry', industry);
    }

    if (sort === 'newest') {
        query = query.order('created_at', { ascending: false })
                     .order('id', { ascending: false }); // stable tiebreaker
    } else if (sort === 'trend') {
        query = query.order('upvotes', { ascending: false })
                     .order('comments', { ascending: false })
                     .order('id', { ascending: false }); // stable tiebreaker
    } else {
        query = query.order('orbit_score', { ascending: false })
                     .order('id', { ascending: false }); // stable tiebreaker
    }

    const { data, error, count } = await query;

    if (error) {
        console.error('[Supabase] getProblems error:', error.message);
        throw new Error(error.message);
    }

    return { rows: (data || []).map(rowToApiShape), total: count || 0 };
}

/**
 * Get the total count of problems grouped by industry.
 * Used to populate sidebar filter counts accurately (ignores pagination).
 * @returns {Promise<Record<string, number>>}
 */
async function getIndustryCounts() {
    const { data, error } = await supabase
        .from('problems')
        .select('industry');

    if (error) {
        console.error('[Supabase] getIndustryCounts error:', error.message);
        return {};
    }

    const counts = {};
    for (const row of (data || [])) {
        const ind = row.industry || 'Other';
        counts[ind] = (counts[ind] || 0) + 1;
    }
    return counts;
}

/**
 * Full-text keyword search across problem, summary, and industry.
 * @param {string} query
 * @param {number} limit
 * @returns {Promise<Array>}
 */
async function searchProblems(query, limit = 20) {
    if (!query || query.trim().length === 0) return [];

    const term = `%${query.trim()}%`;

    const { data, error } = await supabase
        .from('problems')
        .select('*')
        .or(`problem.ilike.${term},summary.ilike.${term},industry.ilike.${term}`)
        .order('orbit_score', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('[Supabase] searchProblems error:', error.message);
        throw new Error(error.message);
    }

    return (data || []).map(rowToApiShape);
}

/**
 * Fetch a single problem by UUID.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
async function getProblemById(id) {
    const { data, error } = await supabase
        .from('problems')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        console.error('[Supabase] getProblemById error:', error.message);
        throw new Error(error.message);
    }

    return data ? rowToApiShape(data) : null;
}

// ─────────────────────────────────────────────────────────────────
// WRITE
// ─────────────────────────────────────────────────────────────────

/**
 * Insert a single processed problem into Supabase.
 * Skips silently if the same problem text already exists (dedup via unique index).
 *
 * @param {Object} problem  - The fully processed problem object.
 * @returns {Promise<Object|null>} The inserted row or null if duplicate.
 */
async function insertProblem(problem) {
    const row = {
        problem:     problem.problem,
        summary:     problem.summary,
        industry:    problem.industry,
        tags:        problem.tags        || [],
        complaints:  problem.complaints  || [],
        root_cause:  problem.rootCause   || '',
        opportunity: problem.opportunity || '',
        orbit_score: problem.orbitScore  || 0,
        score_label: problem.scoreLabel  || 'Low',
        source:      problem.source      || 'Reddit',
        subreddit:   problem.subreddit,
        upvotes:     problem.upvotes     || 0,
        comments:    problem.comments    || 0,
        url:         problem.url         || '',
    };

    const { data, error } = await supabase
        .from('problems')
        .insert(row)
        .select()
        .single();

    if (error) {
        // Code 23505 = unique_violation (duplicate problem text)
        if (error.code === '23505') {
            console.log(`[Supabase] Duplicate skipped: "${problem.problem.substring(0, 60)}..."`);
            return null;
        }
        console.error('[Supabase] insertProblem error:', error.message);
        throw new Error(error.message);
    }

    return data ? rowToApiShape(data) : null;
}

/**
 * Batch insert multiple problems — skip any duplicates silently.
 * Returns the number of successfully inserted rows.
 *
 * @param {Array} problems
 * @returns {Promise<number>} Count of inserted rows.
 */
async function insertProblems(problems) {
    let inserted = 0;
    for (const problem of problems) {
        try {
            const result = await insertProblem(problem);
            if (result) inserted++;
        } catch (err) {
            console.error('[Supabase] Failed to insert problem:', err.message);
        }
    }
    return inserted;
}

/**
 * Quick health check — returns true if Supabase is reachable.
 */
async function healthCheck() {
    try {
        const { error } = await supabase.from('problems').select('id').limit(1);
        return !error;
    } catch {
        return false;
    }
}

/**
 * Check if the given Reddit URL has already been processed and saved.
 * @param {string} url
 * @returns {Promise<boolean>}
 */
async function hasProblemWithUrl(url) {
    if (!url) return false;
    const { data } = await supabase
        .from('problems')
        .select('id')
        .eq('url', url)
        .limit(1);
    
    return data && data.length > 0;
}

module.exports = { getProblems, getIndustryCounts, getProblemById, insertProblem, insertProblems, healthCheck, hasProblemWithUrl, searchProblems };
