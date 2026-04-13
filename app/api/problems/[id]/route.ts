import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    console.log(`[Proxy] GET /api/problems/${id}`);

    const res = await fetch(`${BACKEND_URL}/api/problems/${id}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[Proxy] /api/problems/${id} failed:`, message);

    return NextResponse.json(
      { success: false, message: 'Could not reach backend.', error: message },
      { status: 502 }
    );
  }
}
