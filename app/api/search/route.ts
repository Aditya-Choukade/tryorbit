import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';

  if (!q.trim()) {
    return NextResponse.json({ success: true, count: 0, data: [], query: '' });
  }

  try {
    const res = await fetch(
      `${BACKEND_URL}/api/search?q=${encodeURIComponent(q)}`,
      { cache: 'no-store', signal: AbortSignal.timeout(8000) }
    );
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message, data: [] }, { status: 502 });
  }
}
