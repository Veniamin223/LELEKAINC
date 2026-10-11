import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'crypto';

const COOKIE = 'leleka_admin';
const MAX_AGE_SECONDS = 60 * 60 * 12;

function sessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_SESSION_SECRET is not configured');
  }
  return secret;
}

export function verifyAdminPassword(password: string) {
  const stored = process.env.ADMIN_PASSWORD_HASH || '';
  const [scheme, salt, expectedHex] = stored.split('$');
  if (scheme !== 'scrypt' || !salt || !expectedHex) return false;

  const actual = scryptSync(password, salt, 32);
  const expected = Buffer.from(expectedHex, 'hex');
  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}

export function createSessionToken() {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const nonce = randomBytes(16).toString('hex');
  const payload = `${expires}.${nonce}`;
  const signature = createHmac('sha256', sessionSecret()).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

export function isValidSession(token: string | undefined) {
  if (!token) return false;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [expires, nonce, signature] = parts;
  const payload = `${expires}.${nonce}`;
  const expected = createHmac('sha256', secret).update(payload).digest('hex');
  const actualBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (actualBuf.length !== expectedBuf.length || !timingSafeEqual(actualBuf, expectedBuf)) {
    return false;
  }

  const expiry = Number(expires);
  return Number.isFinite(expiry) && expiry > Date.now();
}

export function sessionFromRequest(request: Request) {
  const header = request.headers.get('cookie') || '';
  const pair = header
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE}=`));
  if (!pair) return false;
  return isValidSession(decodeURIComponent(pair.slice(COOKIE.length + 1)));
}

export function sessionCookie(token: string) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${MAX_AGE_SECONDS}${secure}`;
}

export function clearSessionCookie() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secure}`;
}
