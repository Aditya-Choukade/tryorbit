import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

// POST /api/sync → trigger Reddit→AI→DB pipeline
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    const res = await fetch(`${BACKEND_URL}/api/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, message: 'Could not reach backend.', error: message },
      { status: 502 }
    );
  }
}

// GET /api/sync → check sync status
export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/sync/status`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ syncing: false });
  }
}
