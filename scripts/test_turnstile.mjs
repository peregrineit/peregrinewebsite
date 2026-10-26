// Unit tests for src/lib/turnstile.ts (server-side Turnstile verification). No network:
// fetch is replaced by a stub that plays Cloudflare's siteverify answers.
// Usage: node --experimental-strip-types scripts/test_turnstile.mjs
import { verifyTurnstile, allowedHostnames } from '../src/lib/turnstile.ts';

let passed = 0;
const fails = [];
const check = (name, cond, detail = '') => (cond ? passed++ : fails.push(`${name} ${detail}`));

const SECRET = 'test-secret-not-real';
const ENV = { TURNSTILE_SECRET_KEY: SECRET };
let calls = [];
/** Replace fetch with a stub that answers `answer(body)`; records every call. */
function stub(answer) {
  calls = [];
  globalThis.fetch = async (url, init) => {
    const body = JSON.parse(init.body);
    calls.push({ url: String(url), body, init });
    return answer(body, init);
  };
}
const json = (status, obj) => new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });

// Not configured: refused, Cloudflare not asked.
stub(() => json(200, { success: true, hostname: 'peregrine-it.com' }));
let r = await verifyTurnstile('tok', undefined, {});
check('no secret: unconfigured', r.status === 'unconfigured', JSON.stringify(r));
check('no secret: siteverify not called', calls.length === 0);

// Missing / malformed token: refused without a call.
for (const t of [undefined, '', 42, null]) {
  r = await verifyTurnstile(t, undefined, ENV);
  check(`token ${JSON.stringify(t)}: fail`, r.status === 'fail' && r.codes.includes('missing-input-response'), JSON.stringify(r));
}
r = await verifyTurnstile('x'.repeat(2049), undefined, ENV);
check('oversized token: fail', r.status === 'fail' && r.codes.includes('invalid-input-response'), JSON.stringify(r));
check('missing/oversized tokens: siteverify not called', calls.length === 0);

// Valid answer from the production hostname.
stub(() => json(200, { success: true, hostname: 'peregrine-it.com', 'error-codes': [] }));
r = await verifyTurnstile('good-token', '203.0.113.7', ENV);
check('valid: pass', r.status === 'pass' && r.hostname === 'peregrine-it.com', JSON.stringify(r));
check('valid: one call to Cloudflare siteverify', calls.length === 1 && calls[0].url === 'https://challenges.cloudflare.com/turnstile/v0/siteverify', JSON.stringify(calls.map((c) => c.url)));
check('valid: secret, token and remoteip sent', calls[0].body.secret === SECRET && calls[0].body.response === 'good-token' && calls[0].body.remoteip === '203.0.113.7');
check('valid: not cached', calls[0].init.cache === 'no-store');
stub(() => json(200, { success: true, hostname: 'www.peregrine-it.com' }));
r = await verifyTurnstile('good-token', undefined, ENV);
check('www hostname: pass', r.status === 'pass', JSON.stringify(r));
check('no remoteip when not given', !('remoteip' in calls[0].body));

// Every call asks Cloudflare again (no caching of a success).
stub(() => json(200, { success: true, hostname: 'peregrine-it.com' }));
await verifyTurnstile('same', undefined, ENV);
await verifyTurnstile('same', undefined, ENV);
check('each verification asks Cloudflare', calls.length === 2);

// Failures.
stub(() => json(200, { success: false }));
r = await verifyTurnstile('bad', undefined, ENV);
check('success:false: fail', r.status === 'fail', JSON.stringify(r));
stub(() => json(200, { success: false, 'error-codes': ['timeout-or-duplicate'] }));
r = await verifyTurnstile('spent', undefined, ENV);
check('expired/reused: fail with code', r.status === 'fail' && r.codes.includes('timeout-or-duplicate'), JSON.stringify(r));
stub(() => json(200, { success: false, 'error-codes': ['invalid-input-secret'] }));
r = await verifyTurnstile('tok', undefined, ENV);
check('bad secret: fail (refused, not accepted)', r.status === 'fail', JSON.stringify(r));
stub(() => json(200, { success: 'true', hostname: 'peregrine-it.com' }));
r = await verifyTurnstile('tok', undefined, ENV);
check('success must be boolean true', r.status === 'fail', JSON.stringify(r));

// Hostname.
stub(() => json(200, { success: true, hostname: 'evil.example' }));
r = await verifyTurnstile('tok', undefined, ENV);
check('other hostname: fail', r.status === 'fail' && r.codes.includes('hostname-mismatch'), JSON.stringify(r));
stub(() => json(200, { success: true }));
r = await verifyTurnstile('tok', undefined, ENV);
check('no hostname: fail', r.status === 'fail', JSON.stringify(r));
stub(() => json(200, { success: true, hostname: 'example.com' }));
r = await verifyTurnstile('tok', undefined, { ...ENV, TURNSTILE_ALLOWED_HOSTNAMES: 'example.com, staging.example.com' });
check('TURNSTILE_ALLOWED_HOSTNAMES replaces the defaults', r.status === 'pass', JSON.stringify(r));
check('default hostnames', JSON.stringify(allowedHostnames({})) === JSON.stringify(['peregrine-it.com', 'www.peregrine-it.com']));
check('no wildcard: "*" is just a hostname', JSON.stringify(allowedHostnames({ TURNSTILE_ALLOWED_HOSTNAMES: '*' })) === '["*"]');

// Cloudflare unavailable: fail closed.
stub(() => { throw new TypeError('fetch failed'); });
r = await verifyTurnstile('tok', undefined, ENV);
check('network error: unavailable', r.status === 'unavailable', JSON.stringify(r));
stub(() => json(503, {}));
r = await verifyTurnstile('tok', undefined, ENV);
check('5xx: unavailable', r.status === 'unavailable', JSON.stringify(r));
stub(() => new Response('<html>', { status: 200 }));
r = await verifyTurnstile('tok', undefined, ENV);
check('non-JSON answer: unavailable', r.status === 'unavailable', JSON.stringify(r));
stub(() => json(200, { success: false, 'error-codes': ['internal-error'] }));
r = await verifyTurnstile('tok', undefined, ENV);
check('internal-error: unavailable', r.status === 'unavailable', JSON.stringify(r));
stub((_b, init) => new Promise((_res, rej) => init.signal.addEventListener('abort', () => rej(Object.assign(new Error('aborted'), { name: 'AbortError' })))));
const t0 = Date.now();
r = await verifyTurnstile('tok', undefined, ENV);
check('timeout: unavailable within ~5 s', r.status === 'unavailable' && r.reason === 'siteverify timeout' && Date.now() - t0 < 7000, `${JSON.stringify(r)} ${Date.now() - t0}ms`);

// The verify-URL override exists for local mocks: only loopback http:// URLs are honoured.
stub(() => json(200, { success: true, hostname: 'peregrine-it.com' }));
const CF = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const urlFor = async (u) => { await verifyTurnstile('tok', undefined, { ...ENV, TURNSTILE_VERIFY_URL: u }); return calls.at(-1).url; };
check('override: loopback mock honoured', (await urlFor('http://127.0.0.1:9/siteverify')) === 'http://127.0.0.1:9/siteverify');
check('override: localhost honoured', (await urlFor('http://localhost:9/siteverify')) === 'http://localhost:9/siteverify');
check('override: external host ignored', (await urlFor('https://always-true.example/siteverify')) === CF);
check('override: look-alike host ignored', (await urlFor('http://127.0.0.1.evil.example/siteverify')) === CF);
check('override: https to loopback ignored (mocks are http)', (await urlFor('https://127.0.0.1/siteverify')) === CF);
check('override: garbage ignored', (await urlFor('not a url')) === CF);

// Results never carry the secret or the token.
stub(() => json(200, { success: false, 'error-codes': ['invalid-input-response'] }));
r = await verifyTurnstile('secret-looking-token', undefined, ENV);
check('result carries neither secret nor token', !JSON.stringify(r).includes(SECRET) && !JSON.stringify(r).includes('secret-looking-token'));

if (fails.length) {
  console.error(`turnstile unit tests: ${passed} passed, ${fails.length} failed`);
  for (const f of fails) console.error('  FAIL', f);
  process.exit(1);
}
console.log(`turnstile unit tests: ${passed} passed`);
