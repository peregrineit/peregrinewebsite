// Reference verifier for the X-Peregrine-Signature header, for a Node receiver of
// LEAD_WEBHOOK_URL. Not used by the site itself; copy `verifyLeadSignature` into the receiver.
//
// The site sends, when LEAD_WEBHOOK_SECRET is set (16 characters or more):
//   X-Peregrine-Signature: t=<unix seconds>,v1=<hex HMAC-SHA256 of "<t>.<raw body>", keyed with the secret>
//
// Rules for the receiver, all enforced by verifyLeadSignature:
//   1. Verify the RAW body bytes, before any JSON parsing. Re-serialized JSON will not match.
//   2. Compare in constant time (timingSafeEqual), never with ===.
//   3. Refuse a timestamp more than a few minutes old or in the future: the timestamp is
//      part of the signed text, so a captured request cannot be replayed later.
// And one the receiver must do itself: treat a repeated `ref` as the same lead.
//
// Command-line check (used by scripts/test_lead_api.py):
//   node docs/growth/lead/verify-signature.mjs <secret> <header value> [now in unix seconds] < raw-body
//   exit 0 = valid, 1 = invalid
import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * @param {string | Buffer} rawBody  the request body exactly as received
 * @param {string | undefined} header  the X-Peregrine-Signature header value
 * @param {string} secret  the shared secret (LEAD_WEBHOOK_SECRET on the site)
 * @param {{ toleranceSeconds?: number, now?: number }} [options]  now is in unix seconds
 * @returns {boolean}
 */
export function verifyLeadSignature(rawBody, header, secret, { toleranceSeconds = 300, now = Math.floor(Date.now() / 1000) } = {}) {
  if (!secret || typeof header !== 'string') return false;
  const match = /^t=(\d{1,12}),v1=([0-9a-f]{64})$/.exec(header);
  if (!match) return false;
  const timestamp = Number(match[1]);
  if (Math.abs(now - timestamp) > toleranceSeconds) return false;
  const body = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(String(rawBody), 'utf8');
  const expected = createHmac('sha256', secret).update(Buffer.concat([Buffer.from(`${timestamp}.`, 'utf8'), body])).digest();
  const given = Buffer.from(match[2], 'hex');
  return given.length === expected.length && timingSafeEqual(given, expected);
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
//     // store by lead.ref ...
//     res.writeHead(200).end('{"ok":true}');
//   });

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const [secret, header, now] = process.argv.slice(2);
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  process.exit(verifyLeadSignature(Buffer.concat(chunks), header, secret, now ? { now: Number(now) } : {}) ? 0 : 1);
}
