import { NextResponse } from 'next/server';
import { createSessionToken, sessionCookie, verifyAdminPassword } from '@/lib/admin-session';
import { isOverLimit, recordLimit } from '@/lib/reviews';

export async function POST(request: Request) {
  const limited = await isOverLimit(request, 'admin-login', 8, 15 * 60 * 1000);
  if (limited) {
    return NextResponse.json({ error: 'Too many attempts. Try again in a few minutes.' }, { status: 429 });
  }

  let password = '';
  try {
    const body = await request.json();
    password = String(body.password || '');
  } catch {
    password = '';
  }

  if (!verifyAdminPassword(password)) {
    await recordLimit(request, 'admin-login', 15 * 60 * 1000);
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  return NextResponse.json(
    { success: true },
    { headers: { 'Set-Cookie': sessionCookie(createSessionToken()) } }
  );
}
