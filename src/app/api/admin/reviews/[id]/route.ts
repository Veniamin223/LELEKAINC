import { NextResponse } from 'next/server';
import { sessionFromRequest } from '@/lib/admin-session';
import { deleteReview, getReview, saveReview } from '@/lib/reviews';
import type { ReviewStatus } from '@/lib/review-types';

const STATUSES: ReviewStatus[] = ['pending', 'published', 'hidden'];

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!sessionFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const review = await getReview(id);
  if (!review) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  }

  const body = await request.json().catch(() => ({}));
  const status = body.status as ReviewStatus;
  if (!STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Choose pending, published, or hidden.' }, { status: 400 });
  }

  review.status = status;
  review.publishedAt = status === 'published' ? review.publishedAt || new Date().toISOString() : review.publishedAt;
  await saveReview(review);
  return NextResponse.json({ review });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!sessionFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const review = await getReview(id);
  if (!review) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  }

  await deleteReview(id);
  return NextResponse.json({ success: true });
}
