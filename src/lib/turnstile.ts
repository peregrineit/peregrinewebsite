// Server-side Cloudflare Turnstile verification for /api/lead. Server only: it reads
// TURNSTILE_SECRET_KEY, which must never reach client code or a NEXT_PUBLIC_* variable.
// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/:
// POST secret + response (+ remoteip) to siteverify; tokens are single use, valid for 300
// seconds and at most 2048 characters; the JSON answer has `success`, `hostname` and
// `error-codes`.
//
// Fails closed. A lead is accepted only on { status: 'pass' }:
//   unconfigured  TURNSTILE_SECRET_KEY is not set: nothing can be verified, nothing is accepted.
//   fail          token missing, malformed, expired, reused, failed, or from another hostname.
//   unavailable   Cloudflare could not be asked (timeout, network error, 5xx, internal-error).
// Nothing is cached: every submission needs its own token, verified once.
//
// TURNSTILE_ALLOWED_HOSTNAMES (comma-separated) replaces the default production hostnames,
// for a staging host or Cloudflare's test keys (whose answers carry hostname "example.com").
// TURNSTILE_VERIFY_URL points verification at a mock in the integration tests; only a
// loopback http:// address is honoured (verifyUrl).

export type TurnstileResult =
  | { status: 'pass'; hostname: string }
  | { status: 'fail'; codes: string[] }
  | { status: 'unavailable'; reason: string }
  | { status: 'unconfigured' };

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const DEFAULT_HOSTNAMES = ['peregrine-it.com', 'www.peregrine-it.com'];
const TIMEOUT_MS = 5000;
const MAX_TOKEN_LENGTH = 2048;

type Env = Record<string, string | undefined>;

/** Hostnames a verified token may come from. */
export function allowedHostnames(env: Env = process.env): string[] {
  const list = (env.TURNSTILE_ALLOWED_HOSTNAMES || '')
    .split(',')
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
  return list.length ? list : DEFAULT_HOSTNAMES;
}

const LOOPBACK = new Set(['127.0.0.1', 'localhost', '[::1]']);

/** Cloudflare's endpoint, or a local mock: the override is honoured only for a loopback
 *  address, so it can never send verification to another server. On a deployment nothing
 *  listens there, and a stray override fails closed. */
function verifyUrl(env: Env): string {
  const override = env.TURNSTILE_VERIFY_URL;
  if (!override) return VERIFY_URL;
  try {
    const url = new URL(override);
    return url.protocol === 'http:' && LOOPBACK.has(url.hostname) ? override : VERIFY_URL;
  } catch {
    return VERIFY_URL;
  }
}

export async function verifyTurnstile(token: unknown, remoteip?: string, env: Env = process.env): Promise<TurnstileResult> {
  const secret = env.TURNSTILE_SECRET_KEY;
  if (!secret) return { status: 'unconfigured' };
  if (typeof token !== 'string' || token.length === 0) return { status: 'fail', codes: ['missing-input-response'] };
  if (token.length > MAX_TOKEN_LENGTH) return { status: 'fail', codes: ['invalid-input-response'] };

  const body: Record<string, string> = { secret, response: token };
  if (remoteip) body.remoteip = remoteip;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(verifyUrl(env), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
      cache: 'no-store',
    });
    if (res.status >= 500) return { status: 'unavailable', reason: `siteverify ${res.status}` };
    const data = (await res.json().catch(() => null)) as { success?: unknown; hostname?: unknown; 'error-codes'?: unknown } | null;
    if (!data) return { status: 'unavailable', reason: 'siteverify returned no JSON' };
    const codes = Array.isArray(data['error-codes']) ? data['error-codes'].filter((c): c is string => typeof c === 'string') : [];
    if (codes.includes('internal-error')) return { status: 'unavailable', reason: 'siteverify internal-error' };
    if (data.success !== true) return { status: 'fail', codes: codes.length ? codes : ['unsuccessful'] };
    const hostname = typeof data.hostname === 'string' ? data.hostname.toLowerCase() : '';
    if (!allowedHostnames(env).includes(hostname)) return { status: 'fail', codes: ['hostname-mismatch'] };
    return { status: 'pass', hostname };
  } catch (err) {
    return { status: 'unavailable', reason: (err as { name?: string })?.name === 'AbortError' ? 'siteverify timeout' : 'siteverify unreachable' };
  } finally {
    clearTimeout(timer);
  }
}
