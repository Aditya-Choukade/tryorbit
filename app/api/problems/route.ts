import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

// Fallback data shown when the backend is offline — keeps the dashboard useful
const FALLBACK_PROBLEMS = [
  {
    problem: "Freelancers struggle to chase unpaid invoices without damaging client relationships",
    industry: "SaaS",
    summary: "Sending payment reminders feels awkward. Freelancers delay follow-ups and lose money because there's no professional automated system.",
    tags: ["frustration", "manual", "urgent"],
    source: "Reddit", subreddit: "freelance",
    upvotes: 312, comments: 54, url: "#",
    orbitScore: 84, scoreLabel: "High Opportunity",
  },
  {
    problem: "Small businesses can't track which marketing channel actually drives paying customers",
    industry: "SaaS",
    summary: "Business owners run ads on multiple platforms but have no unified attribution. They waste budget on channels that don't convert.",
    tags: ["pain", "expensive", "manual"],
    source: "Reddit", subreddit: "smallbusiness",
    upvotes: 198, comments: 37, url: "#",
    orbitScore: 72, scoreLabel: "Medium",
  },
  {
    problem: "SaaS founders lose churning users because they detect churn too late",
    industry: "SaaS",
    summary: "By the time a subscription cancels, the founder has no visibility into the warning signs. No proactive retention tooling exists for early-stage SaaS.",
    tags: ["urgent", "frustration"],
    source: "Reddit", subreddit: "SaaS",
    upvotes: 145, comments: 28, url: "#",
    orbitScore: 68, scoreLabel: "Medium",
  },
  {
    problem: "Web developers waste hours debugging vague third-party API error responses",
    industry: "Other",
    summary: "API vendors return cryptic errors without enough context. Developers spend hours reproducing issues that should be obvious, slowing delivery.",
    tags: ["annoying", "slow", "tedious"],
    source: "Reddit", subreddit: "webdev",
    upvotes: 89, comments: 19, url: "#",
    orbitScore: 55, scoreLabel: "Medium",
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subreddits = searchParams.get('subreddits') || '';
    const limit = searchParams.get('limit') || '5';

    const backendUrl = subreddits
      ? `${BACKEND_URL}/api/problems?subreddits=${subreddits}&limit=${limit}`
      : `${BACKEND_URL}/api/problems?limit=${limit}`;

    console.log(`[Proxy] Forwarding to: ${backendUrl}`);

    const res = await fetch(backendUrl, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      // 3-minute timeout — AI processing takes time
      signal: AbortSignal.timeout(180000),
    });

    if (!res.ok) {
      throw new Error(`Backend responded with status ${res.status}`);
    }

    const data = await res.json();

    // If backend returned success but zero results, return fallback
    if (data.success && data.data?.length === 0) {
      console.warn('[Proxy] Backend returned 0 results. Serving fallback data.');
      return NextResponse.json({ success: true, count: FALLBACK_PROBLEMS.length, data: FALLBACK_PROBLEMS, fallback: true });
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Proxy] Backend unreachable:', message, '→ serving fallback data');

    // Return fallback data instead of an error so the dashboard stays useful
    return NextResponse.json({
      success: true,
      count: FALLBACK_PROBLEMS.length,
      data: FALLBACK_PROBLEMS,
      fallback: true,   // Flag so dashboard can optionally show a banner
    });
  }
}
