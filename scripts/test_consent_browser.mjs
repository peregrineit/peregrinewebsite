// Browser check of Basic Consent Mode for GA4 (components/Tracking.tsx, lib/consent.ts) in a
// real headless Chrome, driven over the DevTools protocol. No dependencies: Node 22 and Chrome.
//
// Every request to a Google host is intercepted and recorded. gtag.js itself is served from a
// copy this script downloads once, so the real tag runs; measurement requests (g/collect and
// anything else) are answered locally with 204 and never reach Google. Nothing is sent to GA4.
//
// Needs a build made with the measurement ID, because it is compiled into the page:
//   NEXT_PUBLIC_GA_ID=G-WE6C60LG08 npm run build && node scripts/test_consent_browser.mjs
// Then rebuild without it before serving anything else (scripts/serve-local.sh does).
// Ports (override with env): CONSENT_BROWSER_APP_PORT 3081, CONSENT_BROWSER_CDP_PORT 3082.
// CONSENT_TEST_GA_ID overrides the ID; CHROME_BIN the Chrome path.
import { spawn } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const GA_ID = process.env.CONSENT_TEST_GA_ID || 'G-WE6C60LG08';
const APP_PORT = Number(process.env.CONSENT_BROWSER_APP_PORT || 3081);
const CDP_PORT = Number(process.env.CONSENT_BROWSER_CDP_PORT || 3082);
const APP = `http://localhost:${APP_PORT}`;
const CHROME = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let passed = 0;
const fails = [];
const check = (name, cond, detail = '') => { if (cond) passed++; else fails.push(`${name} ${detail}`); };

// The ID is compiled into the client bundle; without it this test would prove nothing.
function buildHasId(dir) {
  for (const entry of readdirSync(dir)) {
    const p = path.join(dir, entry);
    if (statSync(p).isDirectory()) { if (buildHasId(p)) return true; }
    else if (p.endsWith('.js') && readFileSync(p, 'utf8').includes(GA_ID)) return true;
  }
  return false;
}
if (!buildHasId(path.join(ROOT, '.next', 'static'))) {
  console.log(`consent browser tests: the build in .next does not contain ${GA_ID}. Run: NEXT_PUBLIC_GA_ID=${GA_ID} npm run build`);
  process.exit(2);
}

const gtagSource = await fetch(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`).then((r) => {
  if (!r.ok) throw new Error(`could not download gtag.js (${r.status})`);
  return r.text();
});

const env = { ...process.env, PORT: String(APP_PORT) };
for (const k of ['RESEND_API_KEY', 'LEAD_FROM_EMAIL', 'LEAD_WEBHOOK_URL', 'LEAD_WEBHOOK_RETRY', 'LEAD_WEBHOOK_SECRET', 'LEAD_ALERT_WEBHOOK_URL']) delete env[k];
const app = spawn('npx', ['next', 'start'], { cwd: ROOT, env, stdio: 'ignore', detached: true });
const profile = mkdtempSync(path.join(tmpdir(), 'pit-consent-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${profile}`, '--no-first-run',
  '--disable-extensions', '--window-size=1280,900', 'about:blank'], { stdio: 'ignore' });

function cleanup() {
  try { process.kill(-app.pid); } catch { /* gone */ }
  chrome.kill();
  try { rmSync(profile, { recursive: true, force: true }); } catch { /* best effort */ }
}

async function waitFor(fn, what, ms = 15000) {
  const end = Date.now() + ms;
  for (;;) {
    try { const v = await fn(); if (v) return v; } catch { /* not yet */ }
    if (Date.now() > end) throw new Error(`timed out waiting for ${what}`);
    await sleep(150);
  }
}

/** Event names in one GA4 measurement request: `en` in the URL, plus one line per batched event in the body. */
function eventsIn(url, body) {
  const out = [];
  const u = new URL(url);
  const lines = (body || '').split('\n').filter(Boolean);
  if (lines.length === 0) { if (u.searchParams.get('en')) out.push({ en: u.searchParams.get('en'), dl: u.searchParams.get('dl') || '' }); return out; }
  for (const line of lines) {
    const p = new URLSearchParams(line);
    out.push({ en: p.get('en') || u.searchParams.get('en') || '', dl: p.get('dl') || u.searchParams.get('dl') || '' });
  }
  return out;
}

async function main() {
  await waitFor(() => fetch(`${APP}/robots.txt`).then((r) => r.ok), 'the app', 40000);
  const target = await waitFor(() => fetch(`http://127.0.0.1:${CDP_PORT}/json/new?about:blank`, { method: 'PUT' }).then((r) => r.json()), 'Chrome');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let seq = 0;
  const pending = new Map();
  /** Every Google request since the last reset: { kind: 'tag' | 'collect' | 'other', url, events }. */
  let google = [];
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, (msg) => (msg.error ? reject(new Error(`${method}: ${msg.error.message}`)) : resolve(msg.result)));
    ws.send(JSON.stringify({ id, method, params }));
  });
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
    if (msg.method === 'Fetch.requestPaused') {
      const { requestId, request } = msg.params;
      const url = request.url;
      if (url.includes('googletagmanager.com/gtag/js')) {
        google.push({ kind: 'tag', url });
        send('Fetch.fulfillRequest', { requestId, responseCode: 200, responseHeaders: [{ name: 'Content-Type', value: 'application/javascript' }],
          body: Buffer.from(gtagSource).toString('base64') }).catch(() => {});
      } else {
        const kind = /\/g\/collect/.test(url) ? 'collect' : 'other';
        google.push({ kind, url, events: kind === 'collect' ? eventsIn(url, request.postData) : [] });
        send('Fetch.fulfillRequest', { requestId, responseCode: 204, responseHeaders: [] }).catch(() => {});
      }
    }
  };
  const js = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(`page error: ${r.exceptionDetails.exception?.description || r.exceptionDetails.text}`);
    return r.result.value;
  };
  await send('Page.enable'); await send('Network.enable'); await send('Runtime.enable');
  await send('Network.setBlockedURLs', { urls: ['*calendly.com*', '*vercel-insights.com*', '*vercel-scripts.com*'] });
  await send('Fetch.enable', { patterns: ['googletagmanager.com', 'google-analytics.com', 'analytics.google.com', 'doubleclick.net', 'google.com/', 'googleadservices.com']
    .map((h) => ({ urlPattern: `*${h}*` })) });
  // A Calendly click must not leave the page during the test.
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `document.addEventListener('click', function (e) { var a = e.target.closest && e.target.closest('a[href*="calendly.com"]'); if (a) e.preventDefault(); }, false);` });

  const hydrated = () => waitFor(() => js(`document.readyState === 'complete' && sessionStorage.getItem('pit_pages_viewed') !== null`), 'hydration');
  const goto = async (p) => { await send('Page.navigate', { url: APP + p }); await waitFor(() => js(`location.pathname === ${JSON.stringify(p)}`), `load of ${p}`); await hydrated(); };
  const reload = async () => { const before = await js(`performance.timeOrigin`); await send('Page.reload'); await waitFor(() => js(`performance.timeOrigin !== ${before}`), 'reload'); await hydrated(); };
  // gtag batches events and flushes after a few seconds or when the page is hidden.
  const settle = () => sleep(4500);
  // Waits until `count()` reaches at least `n` (up to 15 s), then a little longer so a duplicate would show.
  const atLeast = async (count, n = 1) => { try { await waitFor(() => count() >= n, 'GA4 request', 15000); } catch { /* checked by the caller */ } await sleep(2500); };
  const gaCookies = () => js(`document.cookie.split(';').map(function (c) { return c.trim().split('=')[0]; }).filter(function (n) { return /^_ga/.test(n); })`);
  const pageViews = (p) => google.filter((g) => g.kind === 'collect').flatMap((g) => g.events).filter((e) => e.en === 'page_view' && (!p || new URL(e.dl || 'http://x/').pathname === p));
  const events = (name) => google.filter((g) => g.kind === 'collect').flatMap((g) => g.events).filter((e) => e.en === name);
  const clickText = (selector, text) => js(`(function () { var b = Array.from(document.querySelectorAll(${JSON.stringify(selector)})).find(function (el) { return el.textContent.trim() === ${JSON.stringify(text)}; }); if (!b) return false; b.click(); return true; })()`);
  const clickInternal = (prefix) => js(`(function () { var a = document.querySelector('main a[href^="${prefix}"]'); if (!a) return null; var h = a.getAttribute('href'); a.click(); return h; })()`);

  // ------------------------------------------------------------ 1. first visit, no choice
  await goto('/services/mls-idx-integration');
  await settle();
  check('fresh: consent bar is shown', await js(`!!document.querySelector('.consent-bar')`));
  check('fresh: no Google request at all (no gtag.js, no ping)', google.length === 0, JSON.stringify(google.map((g) => g.url.slice(0, 90))));
  check('fresh: gtag and dataLayer are not defined', await js(`typeof window.gtag === 'undefined' && typeof window.dataLayer === 'undefined'`));
  check('fresh: no GA cookies', (await gaCookies()).length === 0);

  // ------------------------------------------------------------ 2. Decline
  check('decline: button found', await clickText('.consent-bar button', 'Decline'));
  await settle();
  check('decline: choice stored as denied', (await js(`localStorage.getItem('pit_analytics_consent')`)) === 'denied');
  check('decline: bar closes', !(await js(`!!document.querySelector('.consent-bar')`)));
  check('decline: no Google request', google.length === 0);
  check('decline: no GA cookies', (await gaCookies()).length === 0);

  // ------------------------------------------------------------ 3. navigate after declining
  const to = await clickInternal('/blog/');
  await waitFor(() => js(`location.pathname === ${JSON.stringify(to)}`), 'client navigation');
  await js(`document.querySelector('#lets-talk-btn') && document.querySelector('#lets-talk-btn').click()`);
  await settle();
  check('declined: navigation and a CTA click send nothing to Google', google.length === 0, JSON.stringify(google.map((g) => g.url.slice(0, 90))));

  // ------------------------------------------------------------ 4. new page load with stored rejection
  await goto('/');
  await settle();
  check('stored rejection: no bar', !(await js(`!!document.querySelector('.consent-bar')`)));
  check('stored rejection: GA4 stays inactive', google.length === 0 && (await js(`typeof window.gtag === 'undefined'`)));

  // ------------------------------------------------------------ 5. Accept (fresh choice)
  await js(`localStorage.clear(); sessionStorage.clear();`);
  await goto('/services/saas-development');
  await settle();
  check('before accept: still nothing sent', google.length === 0);
  check('accept: button found', await clickText('.consent-bar button', 'Accept'));
  await atLeast(() => pageViews('/services/saas-development').length);
  check('accept: choice stored as granted', (await js(`localStorage.getItem('pit_analytics_consent')`)) === 'granted');
  check('accept: gtag.js loaded exactly once', google.filter((g) => g.kind === 'tag').length === 1, String(google.filter((g) => g.kind === 'tag').length));
  check('accept: one config call', (await js(`(window.dataLayer || []).filter(function (a) { return a && a[0] === 'config'; }).length`)) === 1);
  const consentArgs = await js(`JSON.stringify((window.dataLayer || []).filter(function (a) { return a && a[0] === 'consent'; }).map(function (a) { return [a[1], a[2]]; }))`);
  check('accept: analytics granted, advertising denied', consentArgs === JSON.stringify([['default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }]]), consentArgs);
  check('accept: exactly one page view for the current page', pageViews('/services/saas-development').length === 1, JSON.stringify(pageViews()));
  check('accept: no other Google hosts contacted', google.filter((g) => g.kind === 'other').length === 0, JSON.stringify(google.filter((g) => g.kind === 'other').map((g) => g.url.slice(0, 90))));
  check('accept: GA cookie set', (await gaCookies()).includes('_ga'), JSON.stringify(await gaCookies()));

  // ------------------------------------------------------------ 6. client-side navigation
  google = [];
  const next = await clickInternal('/blog/');
  await waitFor(() => js(`location.pathname === ${JSON.stringify(next)}`), 'client navigation');
  await atLeast(() => pageViews(next).length);
  check('navigate: exactly one page view for the new page', pageViews(next).length === 1, JSON.stringify(pageViews()));
  check('navigate: no page view repeated for the previous page', pageViews('/services/saas-development').length === 0);
  check('navigate: gtag.js not loaded again', google.filter((g) => g.kind === 'tag').length === 0);

  // ------------------------------------------------------------ 7. existing CTA event
  google = [];
  await js(`document.querySelector('#lets-talk-btn').click()`);
  await atLeast(() => events('cta_open').length);
  check('cta_open: sent once with consent', events('cta_open').length === 1, JSON.stringify(google.flatMap((g) => g.events || [])));
  await js(`document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))`);

  // ------------------------------------------------------------ 8. refresh after accepting
  google = [];
  const here = await js(`location.pathname`);
  await reload();
  await atLeast(() => pageViews(here).length);
  check('refresh: no bar', !(await js(`!!document.querySelector('.consent-bar')`)));
  check('refresh: gtag.js loaded once', google.filter((g) => g.kind === 'tag').length === 1);
  check('refresh: one config call', (await js(`(window.dataLayer || []).filter(function (a) { return a && a[0] === 'config'; }).length`)) === 1);
  check('refresh: exactly one page view', pageViews(here).length === 1, JSON.stringify(pageViews()));

  // ------------------------------------------------------------ 9. withdraw on the privacy policy
  await goto('/privacy-policy');
  await settle();
  google = [];
  check('withdraw: control shows accepted', (await js(`document.querySelector('.analytics-choice') && document.querySelector('.analytics-choice').textContent`) || '').includes('accepted'));
  const t0 = await js(`performance.timeOrigin`);
  check('withdraw: button found', await clickText('.analytics-choice button', 'Withdraw consent'));
  await waitFor(() => js(`performance.timeOrigin !== ${t0}`), 'reload after withdrawal');
  await hydrated();
  google = [];
  await settle();
  check('withdraw: choice stored as denied', (await js(`localStorage.getItem('pit_analytics_consent')`)) === 'denied');
  check('withdraw: GA cookies deleted', (await gaCookies()).length === 0, JSON.stringify(await gaCookies()));
  check('withdraw: reloaded page has no GA4', (await js(`typeof window.gtag === 'undefined'`)) && google.length === 0);
  check('withdraw: control now shows declined', (await js(`document.querySelector('.analytics-choice').textContent`)).includes('declined'));
  const after = await clickInternal('/');
  if (after) await waitFor(() => js(`location.pathname === ${JSON.stringify(after)}`), 'client navigation');
  await settle();
  check('withdraw: navigation sends nothing', google.length === 0, JSON.stringify(google.map((g) => g.url.slice(0, 90))));

  // ------------------------------------------------------------ 10. refresh with withdrawn consent
  google = [];
  await reload();
  await settle();
  check('withdrawn + refresh: no GA4 tag loads', google.length === 0 && (await js(`typeof window.gtag === 'undefined'`)));

  ws.close();
}

try {
  await main();
} catch (e) {
  fails.push(`aborted: ${e.message}`);
} finally {
  cleanup();
}
console.log(`consent browser tests: ${passed} passed${fails.length ? `, ${fails.length} failed` : ''}`);
for (const f of fails) console.log('  FAIL', f);
process.exit(fails.length ? 1 : 0);
