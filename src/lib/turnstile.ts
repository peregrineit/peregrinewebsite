// Server-side Cloudflare Turnstile verification for /api/lead.
// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/ (read 2026-10-20):
// POST secret + response (+ remoteip, idempotency_key) to siteverify; tokens are single use,
// valid for 300 seconds and at most 2048 characters; the JSON answer has `success`,
// `hostname`, `action` and `error-codes`.
//
// Configuration (turnstileMode):
//   enabled        both TURNSTILE_SECRET_KEY and NEXT_PUBLIC_TURNSTILE_SITE_KEY are set
//   off            neither is set (local development, tests, or not yet configured)
//   misconfigured  exactly one is set. The forms cannot produce tokens the server can check,
//                  so nothing can be verified: every lead is accepted into quarantine and an
//                  error is logged. Protection is never silently skipped, and leads are not
//                  silently refused either.
// TURNSTILE_VERIFY_URL exists for tests only.

export type TurnstileResult =
  | { status: 'disabled' }
  | { status: 'pass'; hostname?: string }
  /** The token is missing, malformed, expired, reused, from another host or failed. */
  | { status: 'fail'; codes: string[] }
  /** Cloudflare could not be asked (timeout, network, 5xx). The caller decides; /api/lead quarantines. */
  | { status: 'unavailable'; reason: string };

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const DEFAULT_HOSTNAMES = ['peregrine-it.com', 'www.peregrine-it.com'];
const TIMEOUT_MS = 4000;

export type TurnstileMode = 'enabled' | 'off' | 'misconfigured';
/** The site key compiled into this build (Next.js inlines NEXT_PUBLIC_* at build time), which is
 *  what the visitor's form actually has. A key added in Vercel without a redeploy is not in the
 *  forms yet, so it does not count. TURNSTILE_TEST_SITE_KEY=1 stands in for a built key in the
 *  integration tests and is ignored in production. */
const BUILT_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

export function turnstileMode(env: Record<string, string | undefined> = process.env, builtSiteKey = BUILT_SITE_KEY): TurnstileMode {
  const secret = Boolean(env.TURNSTILE_SECRET_KEY);
  const site = Boolean(builtSiteKey) || (env.VERCEL_ENV !== 'production' && env.TURNSTILE_TEST_SITE_KEY === '1');
  if (secret && site) return 'enabled';
  return secret || site ? 'misconfigured' : 'off';
}

/** Hostnames a token may come from. Empty list (TURNSTILE_ALLOWED_HOSTNAMES="*") = any. */
export function allowedHostnames(env: Record<string, string | undefined> = process.env): string[] {
  const raw = env.TURNSTILE_ALLOWED_HOSTNAMES;
  if (raw === '*') return [];
  if (!raw) return DEFAULT_HOSTNAMES;
  return raw.split(',').map((h) => h.trim().toLowerCase()).filter(Boolean);
}

export async function verifyTurnstile(token: unknown, remoteip: string, idempotencyKey: string): Promise<TurnstileResult> {
  const mode = turnstileMode();
  if (mode === 'off') return { status: 'disabled' };
  if (mode === 'misconfigured') return { status: 'unavailable', reason: 'turnstile misconfigured: set both keys or neither' };
  const secret = process.env.TURNSTILE_SECRET_KEY as string;
  if (typeof token !== 'string' || token.length === 0) return { status: 'fail', codes: ['missing-input-response'] };
  if (token.length > 2048) return { status: 'fail', codes: ['invalid-input-response'] };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const body: Record<string, string> = { secret, response: token, idempotency_key: idempotencyKey };
    if (remoteip && remoteip !== 'unknown') body.remoteip = remoteip;
    const res = await fetch(process.env.TURNSTILE_VERIFY_URL || VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (res.status >= 500) return { status: 'unavailable', reason: `siteverify ${res.status}` };
    const data = (await res.json().catch(() => null)) as { success?: unknown; hostname?: unknown; 'error-codes'?: unknown } | null;
    if (!data) return { status: 'unavailable', reason: 'siteverify returned no JSON' };
    const codes = Array.isArray(data['error-codes']) ? data['error-codes'].filter((c): c is string => typeof c === 'string') : [];
    if (codes.includes('internal-error')) return { status: 'unavailable', reason: 'siteverify internal-error' };
    if (data.success !== true) return { status: 'fail', codes: codes.length ? codes : ['unsuccessful'] };
    const hostname = typeof data.hostname === 'string' ? data.hostname.toLowerCase() : undefined;
    const allowed = allowedHostnames();
    if (allowed.length && (!hostname || !allowed.includes(hostname))) return { status: 'fail', codes: ['hostname-mismatch'] };
    return { status: 'pass', hostname };
  } catch (err) {
    return { status: 'unavailable', reason: (err as { name?: string })?.name === 'AbortError' ? 'siteverify timeout' : 'siteverify unreachable' };
  } finally {
    clearTimeout(timer);
  }
}
