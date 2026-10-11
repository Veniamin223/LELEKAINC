import { createHash } from 'crypto';
import { del, get, list, put } from '@vercel/blob';
import type { PublicReview, Review } from './review-types';

export type { PublicReview, Review, ReviewStatus } from './review-types';

const REVIEW_PREFIX = 'reviews/';

function pathname(id: string) {
  return `${REVIEW_PREFIX}${id}.json`;
}

async function readJson<T>(path: string): Promise<T | null> {
  const file = await get(path, { access: 'private', useCache: false });
  if (!file || file.statusCode !== 200 || !file.stream) return null;
  const text = await new Response(file.stream).text();
  return JSON.parse(text) as T;
}

async function writeJson(path: string, value: unknown) {
  await put(path, JSON.stringify(value), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
  });
}

export function toPublicReview(review: Review): PublicReview {
  return {
    id: review.id,
    name: review.name,
    location: review.location,
    project: review.project,
    rating: review.rating,
    body: review.body,
    publishedAt: review.publishedAt,
  };
}

export async function listReviews() {
  const found: Review[] = [];
  let cursor: string | undefined;

  do {
    const page = await list({ prefix: REVIEW_PREFIX, cursor, limit: 1000 });
    for (const blob of page.blobs) {
      if (!blob.pathname.endsWith('.json')) continue;
      const review = await readJson<Review>(blob.pathname);
      if (review?.id && review.status) found.push(review);
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  return found.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveReview(review: Review) {
  await writeJson(pathname(review.id), review);
}

export async function getReview(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  return readJson<Review>(pathname(id));
}

export async function deleteReview(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return;
  await del(pathname(id));
}

function clientDigest(request: Request, bucket: string) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const salt = process.env.ADMIN_SESSION_SECRET || 'leleka';
  return createHash('sha256').update(`${salt}:${bucket}:${forwarded}`).digest('hex').slice(0, 40);
}

async function recentHits(request: Request, bucket: string, windowMs: number) {
  const path = `limits/${bucket}/${clientDigest(request, bucket)}.json`;
  const now = Date.now();
  const current = (await readJson<{ at: string[] }>(path))?.at || [];
  return {
    path,
    recent: current.filter((stamp) => now - Date.parse(stamp) < windowMs),
  };
}

export async function isOverLimit(request: Request, bucket: string, max: number, windowMs: number) {
  const { recent } = await recentHits(request, bucket, windowMs);
  return recent.length >= max;
}

export async function recordLimit(request: Request, bucket: string, windowMs: number) {
  const { path, recent } = await recentHits(request, bucket, windowMs);
  recent.push(new Date().toISOString());
  await writeJson(path, { at: recent.slice(-20) });
}
