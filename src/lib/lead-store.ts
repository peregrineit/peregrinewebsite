import { createHmac } from "node:crypto";

// Durable lead store, behind a switch that is OFF by default (server only).
//
// STATUS: NOT PRODUCTION-READY. The Vercel Blob adapter has only ever been run against the
// mock in scripts/test_lead_api.py. Before relying on it the owner has to create a Blob
// store, set the variables below and submit a real test lead
// (docs/growth/lead/ARCHITECTURE.md, "Turning the store on").
//
// Switch: the adapter is used only when LEAD_STORE=vercel-blob AND BLOB_READ_WRITE_TOKEN
// is set. In every other case the no-op store is used and nothing about the API changes.
//
// What a store write means, and what it does not:
//   - It is a durable RECORD of a lead that was already accepted. It is written after the
//     notification email or the webhook accepted the lead, never before.
//   - It is NOT acceptance. Nobody is notified when an object appears in a Blob store, so
//     a lead that reached only the store would be one the visitor believes was received
//     and nobody reads. If neither the email nor the webhook accepts the lead, the visitor
//     gets the same error as before and nothing is stored.
//   - Time: the webhook and the store share one deadline (route.ts). The write starts as
//     soon as the lead is accepted, without waiting for a webhook that is still hanging, so
//     the two together cannot hold the visitor's response much beyond 5 seconds.
//   - A failed write is logged and reported (`store.status: "failed"`, `durableStorage`
//     without the store's name). It never turns an accepted lead into a failure.

/** What is written: the lead, its attribution, its priority and how delivery went. */
export type StoredLead = { ref: string; receivedAt: string } & Record<string, unknown>;

export type StoreResult =
  | { status: "stored" }
  | { status: "failed"; reason: string }
  | { status: "skipped"; reason: string };

export interface LeadStore {
  /** "none" for the no-op store; otherwise the name reported in `durableStorage`. */
  readonly name: string;
  /**
   * Writes one lead. Never throws. Writing the same `ref` again replaces the first object.
   * `timeoutMs` shortens the store's own limit when the caller has less time left.
   */
  save(lead: StoredLead, options?: { timeoutMs?: number }): Promise<StoreResult>;
}

export const noopStore = (reason: string): LeadStore => ({
  name: "none",
  save: async () => ({ status: "skipped", reason }),
});

export const STORE_TIMEOUT_MS = 3000;
// The REST call the current @vercel/blob SDK makes (packages/blob/src/put.ts and api.ts in
// github.com/vercel/storage, read 2026-10-10): PUT <api>/?pathname=<path> with the headers
// below. Vercel documents the SDK, not this HTTP interface, so it can change without
// notice; if it does, the write fails, is logged, and leads are unaffected.
const BLOB_API_URL = "https://vercel.com/api/blob";
const BLOB_API_VERSION = "12";

/**
 * Where a lead is written. The store may be a public one, where anyone who has an object's
 * URL can read it, so the path must not be guessable from the 8-character reference (which
 * the visitor sees). The suffix is an HMAC of the reference keyed with the store token:
 * 128 bits nobody can compute without the token, and the same for a repeat of the same
 * submission, so a retry replaces its own object instead of adding a second one.
 */
export function blobPath(ref: string, receivedAt: string, token: string): string {
  const suffix = createHmac("sha256", token).update(`lead-store:${ref}`).digest("hex").slice(0, 32);
  return `leads/${receivedAt.slice(0, 7)}/${ref}-${suffix}.json`;
}

/**
 * The Blob API base URL. LEAD_STORE_BLOB_API_URL exists so the tests can point the adapter
 * at a mock. Every request carries the store's bearer token, so in production the override
 * is ignored: a mistyped or planted value must not be able to send the token to another host.
 */
export function blobApiUrl(env: Record<string, string | undefined>): string {
  const override = env.VERCEL_ENV === "production" ? "" : (env.LEAD_STORE_BLOB_API_URL || "").trim();
  return (override || BLOB_API_URL).replace(/\/+$/, "");
}

export function vercelBlobStore(config: { token: string; apiUrl: string; access?: string }): LeadStore {
  const apiUrl = config.apiUrl;
  // "private" needs a private Blob store (recommended: reads then need the token).
  // A public store rejects it, which shows up as a failed write, not as public leads.
  const access = config.access === "public" ? "public" : "private";
  return {
    name: "vercel-blob",
    async save(lead, options = {}) {
      try {
        const pathname = blobPath(lead.ref, lead.receivedAt, config.token);
        const res = await fetch(`${apiUrl}/?pathname=${encodeURIComponent(pathname)}`, {
          method: "PUT",
          headers: {
            authorization: `Bearer ${config.token}`,
            "x-api-version": BLOB_API_VERSION,
            "x-vercel-blob-access": access,
            "x-content-type": "application/json",
            // The path is already unique and unguessable; a second random part would
            // defeat "one object per lead".
            "x-add-random-suffix": "0",
            "x-allow-overwrite": "1",
            "x-cache-control-max-age": "60",
          },
          body: JSON.stringify(lead),
          signal: AbortSignal.timeout(Math.min(STORE_TIMEOUT_MS, options.timeoutMs ?? STORE_TIMEOUT_MS)),
        });
        if (!res.ok) {
          await res.body?.cancel().catch(() => {});
          return { status: "failed", reason: `store responded ${res.status}` };
        }
        // Success is the store confirming the path it wrote, not just a 2xx.
        const json = (await res.json().catch(() => null)) as { pathname?: unknown } | null;
        if (!json || json.pathname !== pathname) return { status: "failed", reason: "store did not confirm the write" };
        return { status: "stored" };
      } catch (err) {
        const name = (err as { name?: string })?.name;
        return { status: "failed", reason: name === "TimeoutError" || name === "AbortError" ? "store timed out" : "store unreachable" };
      }
    },
  };
}

/** The store selected by the environment. The no-op store unless the switch is fully on. */
export function getLeadStore(env: Record<string, string | undefined> = process.env): LeadStore {
  const kind = (env.LEAD_STORE || "").trim();
  if (!kind) return noopStore("LEAD_STORE not set");
  if (kind !== "vercel-blob") return noopStore("LEAD_STORE has an unknown value");
  if (!env.BLOB_READ_WRITE_TOKEN) return noopStore("BLOB_READ_WRITE_TOKEN not set");
  return vercelBlobStore({ token: env.BLOB_READ_WRITE_TOKEN, apiUrl: blobApiUrl(env), access: env.LEAD_STORE_BLOB_ACCESS });
}
