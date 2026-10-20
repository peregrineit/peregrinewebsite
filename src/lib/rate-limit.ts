// Fixed-window rate limiting for /api/lead.
//
// Default: in memory, per serverless instance. Cheap and dependency-free, but instances do
// not share counts and a cold start resets them, so it only slows a single noisy client.
// Shared: when UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set, counts live in
// Upstash Redis (REST API, no SDK) and hold across instances. If Redis does not answer in
// time the in-memory count is used instead, so an outage never blocks real visitors.
//
// Keys never contain a raw IP or email address: callers pass a hash.

export type Limit = { key: string; max: number; windowMs: number };
export type LimitResult = { limited: boolean; count: number; backend: 'memory' | 'redis' };

const memory = new Map<string, { start: number; count: number }>();

function memoryHit(key: string, windowMs: number, now: number): number {
  const entry = memory.get(key);
  if (!entry || now - entry.start >= windowMs) {
    memory.set(key, { start: now, count: 1 });
    if (memory.size > 10000) {
      for (const [k, v] of memory) if (now - v.start >= windowMs) memory.delete(k);
    }
    return 1;
  }
  entry.count += 1;
  return entry.count;
}

/** Runs Upstash REST commands in one pipeline call. Null when not configured or not answering. */
export async function redis(commands: (string | number)[][], timeoutMs = 800): Promise<unknown[] | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    // https://upstash.com/docs/redis/features/restapi: POST /pipeline with a JSON array of
    // commands, Authorization: Bearer <token>; the answer is one {result} or {error} per command.
    const res = await fetch(`${url.replace(/\/$/, '')}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(commands.map((c) => c.map(String))),
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: unknown; error?: unknown }[];
    if (!Array.isArray(data) || data.some((d) => d && d.error)) return null;
    return data.map((d) => d?.result ?? null);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function redisHit(key: string, windowMs: number): Promise<number | null> {
  const window = Math.floor(Date.now() / windowMs);
  const k = `pit:rl:${key}:${window}`;
  const out = await redis([['INCR', k], ['PEXPIRE', k, windowMs]]);
  const n = Number(out?.[0]);
  return out && Number.isFinite(n) ? n : null;
}

/** Counts one hit against `limit` and reports whether it is over the maximum. */
export async function hit(limit: Limit, now = Date.now()): Promise<LimitResult> {
  const shared = await redisHit(limit.key, limit.windowMs);
  if (shared !== null) return { limited: shared > limit.max, count: shared, backend: 'redis' };
  const count = memoryHit(limit.key, limit.windowMs, now);
  return { limited: count > limit.max, count, backend: 'memory' };
}

export function sharedLimiterConfigured(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

/** A positive integer from the environment, or the default. */
export function envInt(value: string | undefined, fallback: number): number {
  const n = Number.parseInt(value || '', 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}
