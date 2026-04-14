import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

// Fallback data shown when the backend is completely offline
const FALLBACK_PROBLEMS = [
  {
    id: 'fallback_1',
    problem: "Freelancers struggle to chase unpaid invoices without damaging client relationships",
    industry: "SaaS",
    summary: "Sending payment reminders feels awkward. Freelancers delay follow-ups and lose money because there's no professional automated system.",
    tags: ["frustration", "manual", "urgent"],
    complaints: [
      "I've had clients ghost me for 3 months over a $500 invoice.",
      "Every reminder email feels like I'm begging for my own money.",
      "There's no polite way to say 'pay me or I'll stop working' without losing the client.",
    ],
    rootCause: "No standardized, professional follow-up tooling exists for independent freelancers.",
    opportunity: "Build an automated invoice follow-up SaaS that handles reminders with professional, pre-written templates.",
    source: "Reddit", subreddit: "freelance",
    upvotes: 312, comments: 54, url: "#",
    orbitScore: 84, scoreLabel: "High Opportunity",
  },
  {
    id: 'fallback_2',
    problem: "Small businesses can't track which marketing channel actually drives paying customers",
    industry: "SaaS",
    summary: "Business owners run ads on multiple platforms but have no unified attribution. They waste budget on channels that don't convert.",
    tags: ["pain", "expensive", "manual"],
    complaints: [
      "I'm spending $2k/month on ads and have no idea what's working.",
      "Google Analytics is too complex — I just want to know which post brought me sales.",
      "My agency sends reports but I can't tell if they're actually driving revenue.",
    ],
    rootCause: "Multi-touch attribution is technically complex and existing tools are built for enterprise budgets.",
    opportunity: "Build a simple, one-dashboard marketing attribution tool priced for SMBs under $50/month.",
    source: "Reddit", subreddit: "smallbusiness",
    upvotes: 198, comments: 37, url: "#",
    orbitScore: 72, scoreLabel: "Medium",
  },
  {
    id: 'fallback_3',
    problem: "SaaS founders lose churning users because they detect churn signals too late",
    industry: "SaaS",
    summary: "By the time a user cancels, the founder has seen no warning signs. Proactive retention tooling for early-stage SaaS doesn't exist.",
    tags: ["urgent", "frustration"],
    complaints: [
      "I only find out someone churned when Stripe sends me the cancellation email.",
      "There's no way to know a user is unhappy before they leave.",
      "I tried Mixpanel but it's too complex to set up just to track churn signals.",
    ],
    rootCause: "Early-stage SaaS tools are overwhelmingly focused on acquisition, not retention monitoring.",
    opportunity: "Build a lightweight churn-prediction widget that integrates in 5 minutes and alerts founders to at-risk users.",
    source: "Reddit", subreddit: "SaaS",
    upvotes: 145, comments: 28, url: "#",
    orbitScore: 68, scoreLabel: "Medium",
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '20';
    const sort  = searchParams.get('sort')  || 'orbit_score';

    const backendUrl = `${BACKEND_URL}/api/problems?limit=${limit}&sort=${sort}`;
    console.log(`[Proxy] GET /api/problems → ${backendUrl}`);

    const res = await fetch(backendUrl, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10000), // Fast — just a DB read
    });

    if (!res.ok) throw new Error(`Backend status ${res.status}`);

    const data = await res.json();

    // If backend says DB is empty and sync is starting, pass that through
    if (data.syncing) {
      return NextResponse.json({ ...data, fallback: false });
    }

    // If DB returned zero results fall back to curated data
    if (data.success && data.data?.length === 0) {
      console.warn('[Proxy] DB returned 0 results → serving fallback');
      return NextResponse.json({ success: true, count: FALLBACK_PROBLEMS.length, data: FALLBACK_PROBLEMS, fallback: true });
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Proxy] Backend unreachable:', message, '→ serving fallback');
    return NextResponse.json({
      success: true,
      count: FALLBACK_PROBLEMS.length,
      data: FALLBACK_PROBLEMS,
      fallback: true,
    });
  }
}
