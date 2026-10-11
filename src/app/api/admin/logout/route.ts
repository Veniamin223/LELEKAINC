import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/admin-session';

export async function POST() {
  return NextResponse.json(
    { success: true },
    { headers: { 'Set-Cookie': clearSessionCookie() } }
  );
}
