import { NextResponse } from 'next/server';
import { sessionFromRequest } from '@/lib/admin-session';
import { listReviews } from '@/lib/reviews';

export async function GET(request: Request) {
  if (!sessionFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const reviews = await listReviews();
  return NextResponse.json({ reviews });
}
