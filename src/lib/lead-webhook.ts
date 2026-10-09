import { createHmac } from "node:crypto";

// Delivery of one lead to LEAD_WEBHOOK_URL (server only).
//
// Budget: everything here, retry included, finishes within WEBHOOK_BUDGET_MS. A hung
// receiver must not hold the visitor's response for longer than that.
//
// Retry: one, and only after a failure that came back quickly and could be transient
// (5xx, 408, 429, connection error). A timeout is not retried: the budget is spent, and a
// receiver that is merely slow may still have stored the lead. Both attempts send the same
// bytes and the same Idempotency-Key, so a receiver that honours the key stores one lead.
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
// Signature: when LEAD_WEBHOOK_SECRET is set, each request carries
//   X-Peregrine-Signature: sha256=<hex HMAC-SHA256 of the raw request body>
// so a receiver that knows the secret can tell the request came from this site and was
// not altered. The body contains `receivedAt`; a receiver can refuse old ones.
// Reference verifier: docs/growth/lead/verify-signature.mjs.

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

export function signBody(body: string, secret: string): string {
  return `sha256=${createHmac("sha256", secret).update(body, "utf8").digest("hex")}`;
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
  options: { secret?: string; budgetMs?: number } = {}
): Promise<Outcome> {
  const deadline = Date.now() + (options.budgetMs ?? WEBHOOK_BUDGET_MS);
  const headers: Record<string, string> = { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey };
  if (options.secret) headers[SIGNATURE_HEADER] = signBody(body, options.secret);

  const first = await attempt(url, body, headers, deadline - Date.now());
  if (first.ok) return { status: "accepted", id: `http-${first.status}` };
  if (!first.retry || deadline - Date.now() - BACKOFF_MS < MIN_ATTEMPT_MS) return { status: "failed", reason: first.reason };

  await new Promise((resolve) => setTimeout(resolve, BACKOFF_MS));
  const second = await attempt(url, body, headers, deadline - Date.now());
  if (second.ok) return { status: "accepted", id: `http-${second.status}` };
  return { status: "failed", reason: `${second.reason} after 2 attempts` };
}
