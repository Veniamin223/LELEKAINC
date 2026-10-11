import { NextResponse } from 'next/server';
import { isOverLimit, listReviews, recordLimit, saveReview, toPublicReview, type Review } from '@/lib/reviews';
import { notifyReviewReceived } from '@/lib/review-mail';

function clean(value: unknown, max: number) {
  return String(value || '').replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max);
}

export async function GET() {
  const reviews = await listReviews();
  const published = reviews
    .filter((review) => review.status === 'published')
    .sort((a, b) => (b.publishedAt || b.createdAt).localeCompare(a.publishedAt || a.createdAt))
    .map(toPublicReview);

  return NextResponse.json({ reviews: published });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (clean(body.website, 200)) {
    return NextResponse.json({ success: true });
  }

  const limited = await isOverLimit(request, 'review', 3, 60 * 60 * 1000);
  if (limited) {
    return NextResponse.json({ error: 'Please wait a while before sending another review.' }, { status: 429 });
  }

  const name = clean(body.name, 80);
  const email = clean(body.email, 120);
  const location = clean(body.location, 80);
  const project = clean(body.project, 80);
  const message = clean(body.body, 1500);
  const rating = Number(body.rating);

  if (name.length < 2) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Please choose a rating from 1 to 5.' }, { status: 400 });
  }
  if (message.length < 20) {
    return NextResponse.json({ error: 'Please write at least a few sentences.' }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address, or leave it blank.' }, { status: 400 });
  }

  const review: Review = {
    id: crypto.randomUUID(),
    name,
    email,
    location,
    project,
    rating,
    body: message,
    status: 'pending',
    createdAt: new Date().toISOString(),
    publishedAt: null,
  };

  await recordLimit(request, 'review', 60 * 60 * 1000);
  await saveReview(review);

  try {
    await notifyReviewReceived(review);
  } catch (error) {
    console.error('Review notification failed:', error instanceof Error ? error.message : 'unknown');
  }

  return NextResponse.json({ success: true });
}
