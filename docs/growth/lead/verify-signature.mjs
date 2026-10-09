// Reference verifier for the X-Peregrine-Signature header, for a Node receiver of
// LEAD_WEBHOOK_URL. Not used by the site itself; copy `verifyLeadSignature` into the receiver.
//
// The site sends, when LEAD_WEBHOOK_SECRET is set:
//   X-Peregrine-Signature: sha256=<hex HMAC-SHA256 of the raw request body, keyed with the secret>
//
// Three rules for the receiver:
//   1. Verify the RAW body bytes, before any JSON parsing. Re-serialized JSON will not match.
//   2. Compare in constant time (timingSafeEqual), never with ===.
//   3. After verifying, refuse a body whose `receivedAt` is older than a few minutes
//      (a captured request replayed later), and treat a repeated `ref` as the same lead.
//
// Command-line check (used by scripts/test_lead_api.py):
//   node docs/growth/lead/verify-signature.mjs <secret> <header value> < raw-body
//   exit 0 = valid, 1 = invalid
import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * @param {string | Buffer} rawBody  the request body exactly as received
 * @param {string | undefined} header  the X-Peregrine-Signature header value
 * @param {string} secret  the shared secret (LEAD_WEBHOOK_SECRET on the site)
 * @returns {boolean}
 */
export function verifyLeadSignature(rawBody, header, secret) {
  if (!secret || typeof header !== 'string' || !header.startsWith('sha256=')) return false;
  const expected = createHmac('sha256', secret).update(rawBody).digest();
  const given = Buffer.from(header.slice('sha256='.length), 'hex');
  return given.length === expected.length && timingSafeEqual(given, expected);
}

/** How old a verified lead may be before a receiver should refuse it as a replay. */
export function isFresh(receivedAt, maxAgeMs = 5 * 60 * 1000, now = Date.now()) {
  const age = now - Date.parse(receivedAt);
  return Number.isFinite(age) && age > -60_000 && age < maxAgeMs;
}

// Example with node:http (Express: use express.raw({ type: 'application/json' }) so the
// handler gets the bytes, not a parsed object):
//
//   http.createServer(async (req, res) => {
//     const chunks = []; for await (const c of req) chunks.push(c);
//     const raw = Buffer.concat(chunks);
//     if (!verifyLeadSignature(raw, req.headers['x-peregrine-signature'], process.env.LEAD_WEBHOOK_SECRET)) {
//       res.writeHead(401).end(); return;
//     }
//     const lead = JSON.parse(raw.toString('utf8'));
//     if (!isFresh(lead.receivedAt)) { res.writeHead(409).end(); return; }
//     // store by lead.ref ...
//     res.writeHead(200).end('{"ok":true}');
//   });

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const [secret, header] = process.argv.slice(2);
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  process.exit(verifyLeadSignature(Buffer.concat(chunks), header, secret) ? 0 : 1);
}
