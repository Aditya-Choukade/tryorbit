import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/problems/stats`, { cache: 'no-store' });
    const json = await res.json();
    return NextResponse.json(json);
  } catch {
    return NextResponse.json({ success: false, counts: {} }, { status: 500 });
  }
}
