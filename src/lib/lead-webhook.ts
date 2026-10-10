import { createHmac } from "node:crypto";

// Delivery of one lead to LEAD_WEBHOOK_URL (server only).
//
// Budget: everything here, retry included, finishes within WEBHOOK_BUDGET_MS. A hung
// receiver must not hold the visitor's response for longer than that.
//
// Retry: OFF unless the caller asks for it (the route passes LEAD_WEBHOOK_RETRY=1). A
// receiver can record a lead and still answer 5xx, or drop the connection after recording,
// and then a second request makes a second row unless the receiver deduplicates. Only the
// receiver can guarantee that, so retrying is an explicit choice for receivers that do
// (scripts/lead-sheet-webhook.gs skips a repeated `ref`; others must honour Idempotency-Key).
// When on: one retry, only after a failure that came back quickly and could be transient
// (5xx, 408, 429, connection error), never after a timeout. Both attempts send the same
// bytes, the same Idempotency-Key and the same signature.
//
// What counts as accepted: a 2xx answer, with two exceptions.
//   - A 2xx whose Content-Type is text/html is NOT accepted. A Google Apps Script web app
//     answers 200 with an HTML page when it shows a sign-in page or dies with an uncaught
//     exception, and nothing was recorded. No machine receiver confirms a lead with a web page.
//   - A 2xx JSON body that says `"ok": false` is NOT accepted. That is how
//     scripts/lead-sheet-webhook.gs reports an error, since Apps Script cannot set a status.
// Nothing else about the body is required: Zapier, Make and others answer in their own way
// (JSON without `ok`, plain text, or nothing), and those all count.
//
// Signature: when LEAD_WEBHOOK_SECRET is set (at least MIN_SECRET_LENGTH characters; a
// shorter one is treated as not set), each request carries
//   X-Peregrine-Signature: t=<unix seconds>,v1=<hex HMAC-SHA256 of "<t>.<raw body>">
// The timestamp is inside the signed text, so a receiver that knows the secret can tell
// that the request came from this site, was not altered, and is recent: a captured
// request replayed later fails the age check. Reference verifier, with the constant-time
// comparison and the age limit: docs/growth/lead/verify-signature.mjs.

/** Outcome of one outbound message. `id` is the provider's message id, never content. */
export type Outcome =
  | { status: "accepted"; id: string }
  | { status: "failed"; reason: string; detail?: string }
  | { status: "skipped"; reason: string };

export const WEBHOOK_BUDGET_MS = 5000;
const BACKOFF_MS = 300;
/** A second attempt with less time than this is not worth starting. */
const MIN_ATTEMPT_MS = 500;
export const SIGNATURE_HEADER = "X-Peregrine-Signature";

export const MIN_SECRET_LENGTH = 16;

/** The secret to sign with, or undefined when none is set or it is too short to be one. */
export function usableSecret(secret: string | undefined): string | undefined {
  return secret && secret.length >= MIN_SECRET_LENGTH ? secret : undefined;
}

export function signBody(body: string, secret: string, timestamp = Math.floor(Date.now() / 1000)): string {
  return `t=${timestamp},v1=${createHmac("sha256", secret).update(`${timestamp}.${body}`, "utf8").digest("hex")}`;
}

type Attempt = { ok: true; status: number } | { ok: false; reason: string; retry: boolean };

async function attempt(url: string, body: string, headers: Record<string, string>, timeoutMs: number): Promise<Attempt> {
  try {
    const res = await fetch(url, { method: "POST", headers, body, signal: AbortSignal.timeout(timeoutMs) });
    if (!res.ok) {
      await res.body?.cancel().catch(() => {});
      return { ok: false, reason: `webhook responded ${res.status}`, retry: res.status >= 500 || res.status === 408 || res.status === 429 };
    }
    const type = (res.headers.get("content-type") || "").toLowerCase();
    if (type.startsWith("text/html")) {
      await res.body?.cancel().catch(() => {});
      return { ok: false, reason: "webhook answered with an HTML page", retry: false };
    }
    if (type.includes("json")) {
      // Only an explicit refusal counts. Anything else, unreadable bodies included, is a receipt.
      const text = await res.text().catch(() => "");
      try {
        const answer: unknown = JSON.parse(text.slice(0, 4096));
        if (answer && typeof answer === "object" && (answer as { ok?: unknown }).ok === false) {
          return { ok: false, reason: "webhook answered ok:false", retry: false };
        }
      } catch {
        // Not JSON after all: still a 2xx from a receiver that did not refuse.
      }
    } else {
      await res.body?.cancel().catch(() => {});
    }
    return { ok: true, status: res.status };
  } catch (err) {
    const name = (err as { name?: string })?.name;
    if (name === "TimeoutError" || name === "AbortError") return { ok: false, reason: "webhook timed out", retry: false };
    return { ok: false, reason: "webhook unreachable", retry: true };
  }
}

/**
 * POSTs `body` (already serialized, so both attempts and the signature cover the same
 * bytes) to the webhook. Never throws.
 */
export async function deliverWebhook(
  url: string,
  body: string,
  idempotencyKey: string,
  options: { secret?: string; budgetMs?: number; retry?: boolean } = {}
): Promise<Outcome> {
  const deadline = Date.now() + (options.budgetMs ?? WEBHOOK_BUDGET_MS);
  const headers: Record<string, string> = { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey };
  const secret = usableSecret(options.secret);
  if (secret) headers[SIGNATURE_HEADER] = signBody(body, secret);

  const first = await attempt(url, body, headers, deadline - Date.now());
  if (first.ok) return { status: "accepted", id: `http-${first.status}` };
  if (!options.retry || !first.retry || deadline - Date.now() - BACKOFF_MS < MIN_ATTEMPT_MS) return { status: "failed", reason: first.reason };

  await new Promise((resolve) => setTimeout(resolve, BACKOFF_MS));
  const second = await attempt(url, body, headers, deadline - Date.now());
  if (second.ok) return { status: "accepted", id: `http-${second.status}` };
  return { status: "failed", reason: `${second.reason} after 2 attempts` };
}
