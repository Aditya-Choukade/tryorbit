const axios = require('axios');

// GitHub Models API endpoint
const GITHUB_MODELS_URL = 'https://models.github.ai/inference/chat/completions';

/**
 * Strict JSON-only system prompt.
 * Designed to eliminate reasoning traces, markdown fences, and extra text.
 */
const SYSTEM_PROMPT = `You are a JSON API. You must ONLY return valid JSON.

Do NOT include explanations, thoughts, <think> tags, markdown, or any text outside JSON.

If no real problem is found, return: { "valid": false }

Extract:
1. problem    → 1-line problem statement
2. industry   → one of: Fintech, Health, SaaS, E-commerce, Education, Logistics, Other
3. summary    → 1-2 sentence explanation of the problem
4. tags       → array of 2-5 pain keywords (e.g. "frustration", "urgent", "manual")
5. complaints → array of 2-3 user-like complaint sentences inferred from the text
6. rootCause  → 1 sentence explaining WHY this problem exists
7. opportunity → 1 sentence startup idea for solving this

Output:
{
  "valid": true,
  "problem": "",
  "industry": "",
  "summary": "",
  "tags": [],
  "complaints": [],
  "rootCause": "",
  "opportunity": ""
}`;

/**
 * Simple sleep utility for spacing API calls.
 * @param {number} ms
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Safely extracts a JSON object from messy AI output.
 * Handles <think> tags, markdown fences, and surrounding text.
 *
 * @param {string} text - Raw AI response string.
 * @returns {Object|null} Parsed JSON or null.
 */
function safeParseJSON(text) {
    try {
        // Step 1: Strip <think>...</think> blocks entirely
        let cleaned = text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

        // Step 2: Strip markdown code fences
        const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (fenceMatch) {
            cleaned = fenceMatch[1].trim();
        }

        // Step 3: Extract substring between first '{' and last '}'
        const firstBrace = cleaned.indexOf('{');
        const lastBrace = cleaned.lastIndexOf('}');

        if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
            console.error('[AIService] No JSON object found in response.');
            return null;
        }

        const jsonString = cleaned.substring(firstBrace, lastBrace + 1);
        return JSON.parse(jsonString);
    } catch (err) {
        console.error('[AIService] JSON parse failed:', err.message);
        return null;
    }
}

/**
 * Sends text to the AI model and returns a structured problem object.
 * Includes retry with exponential backoff for 429 rate limits.
 *
 * @param {string} text - Prepared post text (title + content).
 * @param {number} postIndex - Index for logging purposes.
 * @param {number} maxRetries - Max retry attempts for 429 errors.
 * @returns {Promise<Object|null>} Structured problem or null.
 */
async function processWithAI(text, postIndex = 0, maxRetries = 1) {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        console.error('[AIService] GITHUB_TOKEN is not set!');
        return null;
    }

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await axios.post(
                GITHUB_MODELS_URL,
                {
                    model: 'gpt-4o-mini', // Swapping to a much faster, less rate-limited model!
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        { role: 'user', content: text }
                    ],
                    temperature: 0.1,  // Low for strict JSON
                    max_tokens: 600,
                    response_format: { type: "json_object" } // Force strict JSON parsing natively for gpt-4o models
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 20000 // Only wait 20s max
                }
            );

            const rawContent = response.data.choices[0].message.content;

            // ── Debug log: show raw AI output ──
            console.log(`  [AI Raw #${postIndex}] ${rawContent.substring(0, 100).replace(/\n/g, ' ')}...`);

            // ── Safe parse ──
            const parsed = safeParseJSON(rawContent);

            if (!parsed) {
                console.warn(`  [AI #${postIndex}] Could not parse JSON. Skipping.`);
                return null;
            }

            // Check if AI explicitly marked it as invalid
            if (parsed.valid === false) {
                console.log(`  [AI #${postIndex}] AI says: not a valid problem. Skipping.`);
                return null;
            }

            return {
                problem:    parsed.problem,
                industry:   parsed.industry,
                summary:    parsed.summary    || '',
                tags:       Array.isArray(parsed.tags)       ? parsed.tags       : [],
                complaints: Array.isArray(parsed.complaints) ? parsed.complaints : [],
                rootCause:  parsed.rootCause  || '',
                opportunity:parsed.opportunity|| '',
            };

        } catch (error) {
            if (error.response && error.response.status === 429) {
                // Instantly fail if we are rate-limited. Massively backoff blocking breaks UI.
                console.warn(`  [AI #${postIndex}] GitHub rate limit (429) fully hit! Skipping post immediately without blocking UI...`);
                return null;
            }

            console.error(`  [AI #${postIndex}] Error: ${error.message}`);
            return null;
        }
    }

    return null;
}

module.exports = { processWithAI, sleep };
