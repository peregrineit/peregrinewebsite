// Browser check of the client-side lead logic in a real (headless) Chrome, driven over the
// DevTools protocol. No dependencies: Node 22 (WebSocket, fetch) and an installed Chrome.
//
// Covers what unit tests cannot: storage after a real page load, the page-view counter
// across a client-side navigation, Calendly hrefs at click time on real pages, the form
// start / abandon events from real input and a real pagehide, and the body the form POSTs.
// Nothing leaves the machine: calendly.com and every non-local host are blocked, and the
// app's webhook points at a mock started by this script.
//
// Needs a build (`npm run build`). Usage:
//   node scripts/test_lead_browser.mjs
// Ports (override with env): LEAD_BROWSER_APP_PORT 3071, LEAD_BROWSER_CDP_PORT 3072,
// LEAD_BROWSER_MOCK_PORT 3073. CHROME_BIN overrides the Chrome path.
import { spawn } from 'node:child_process';
import http from 'node:http';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const APP_PORT = Number(process.env.LEAD_BROWSER_APP_PORT || 3071);
const CDP_PORT = Number(process.env.LEAD_BROWSER_CDP_PORT || 3072);
const MOCK_PORT = Number(process.env.LEAD_BROWSER_MOCK_PORT || 3073);
const APP = `http://localhost:${APP_PORT}`;
const CHROME = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let passed = 0;
const fails = [];
const check = (name, cond, detail = '') => { if (cond) passed++; else fails.push(`${name} ${detail}`); };

// --- mock webhook: accepts every lead, keeps the bodies
const hooks = [];
const mock = http.createServer((req, res) => {
  let body = '';
  req.on('data', (c) => { body += c; });
  req.on('end', () => {
    try { hooks.push(JSON.parse(body)); } catch { /* ignore */ }
    res.writeHead(200, { 'Content-Type': 'application/json' }); res.end('{"ok":true}');
  });
}).listen(MOCK_PORT, '127.0.0.1');

// --- the built app, with only the webhook configured
const env = { ...process.env, PORT: String(APP_PORT), LEAD_WEBHOOK_URL: `http://127.0.0.1:${MOCK_PORT}/hook` };
for (const k of ['RESEND_API_KEY', 'LEAD_FROM_EMAIL', 'NEXT_PUBLIC_GA_ID', 'LEAD_STORE', 'LEAD_WEBHOOK_SECRET', 'LEAD_ALERT_WEBHOOK_URL']) delete env[k];
const app = spawn('npx', ['next', 'start'], { cwd: ROOT, env, stdio: 'ignore', detached: true });
const profile = mkdtempSync(path.join(tmpdir(), 'pit-chrome-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${profile}`, '--no-first-run',
  '--disable-extensions', '--window-size=1280,900', 'about:blank'], { stdio: 'ignore' });

function cleanup() {
  try { process.kill(-app.pid); } catch { /* gone */ }
  chrome.kill(); mock.close();
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

async function main() {
  await waitFor(() => fetch(`${APP}/robots.txt`).then((r) => r.ok), 'the app', 40000);
  const target = await waitFor(() => fetch(`http://127.0.0.1:${CDP_PORT}/json/new?about:blank`, { method: 'PUT' }).then((r) => r.json()), 'Chrome');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let seq = 0;
  const pending = new Map();
  const posts = [];
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
    if (msg.method === 'Network.requestWillBeSent' && msg.params.request.method === 'POST' && msg.params.request.url.endsWith('/api/lead'))
      posts.push(JSON.parse(msg.params.request.postData));
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, (msg) => (msg.error ? reject(new Error(`${method}: ${msg.error.message}`)) : resolve(msg.result)));
    ws.send(JSON.stringify({ id, method, params }));
  });
  const js = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(`page error: ${r.exceptionDetails.exception?.description || r.exceptionDetails.text}`);
    return r.result.value;
  };
  await send('Page.enable'); await send('Network.enable'); await send('Runtime.enable');
  // Nothing but the local app is reachable from the page.
  await send('Network.setBlockedURLs', { urls: ['*calendly.com*', '*googletagmanager.com*', '*google-analytics.com*', '*vercel-insights.com*', '*vercel-scripts.com*'] });
  // Record every tracking event the page sends (lib/track.ts calls window.gtag when it exists).
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.__ev = [];
    // Each event is also copied to sessionStorage, so events fired while a page unloads can be read afterwards.
    window.gtag = function () { var a = [].slice.call(arguments); if (a[0] !== 'event') return; window.__ev.push({ name: a[1], props: a[2] });
      try { sessionStorage.setItem('__ev', JSON.stringify(window.__ev)); } catch (e) {} };
    // A Calendly click must not open a tab or leave the page during the test.
    document.addEventListener('click', function (e) { var a = e.target.closest && e.target.closest('a[href*="calendly.com"]'); if (a) e.preventDefault(); }, false);
  ` });
  const goto = async (url, referrer) => {
    await send('Page.navigate', referrer ? { url, referrer, referrerPolicy: 'unsafeUrl' } : { url });
    await waitFor(() => js(`document.readyState === 'complete' && location.href.startsWith(${JSON.stringify(url.split('?')[0])})`), `load of ${url}`);
    await waitFor(() => js(`sessionStorage.getItem('pit_pages_viewed') !== null`), 'hydration');
  };
  const events = (name) => js(`window.__ev.filter(function (e) { return e.name === ${JSON.stringify(name)}; })`);
  const typeInto = async (selector, text) => {
    // A field in a popup that is still fading in cannot take focus yet.
    await waitFor(() => js(`(function () { var el = document.querySelector(${JSON.stringify(selector)}); el.focus(); return document.activeElement === el; })()`), `focus on ${selector}`);
    await send('Input.insertText', { text });
  };

  // ---------------------------------------------------------------- 1. arrival
  await goto(`${APP}/services/saas-development?utm_source=test-src&utm_medium=cpc&gclid=G-123_x`, 'https://www.google.com/');
  const last = await js(`JSON.parse(sessionStorage.getItem('pit_attribution'))`);
  const first = await js(`JSON.parse(localStorage.getItem('pit_first_touch'))`);
  check('arrival: last touch in sessionStorage', last && last.landingPage === '/services/saas-development' && last.utm === 'utm_source=test-src&utm_medium=cpc'
    && last.gclid === 'G-123_x' && last.referrer === 'https://www.google.com/', JSON.stringify(last));
  check('arrival: first touch in localStorage, same arrival', JSON.stringify(first) === JSON.stringify(last), JSON.stringify(first));
  check('arrival: one page viewed', (await js(`sessionStorage.getItem('pit_pages_viewed')`)) === '1');
  check('arrival: no cookie is set', (await js(`document.cookie`)) === '', await js(`document.cookie`));
  check('arrival: nothing was posted', posts.length === 0 && hooks.length === 0);

  // ---------------------------------------------------------------- 2. Calendly, rendered and at click time
  const rendered = await js(`document.querySelector('[data-cta-location] a.cp-standalone-link').getAttribute('href')`);
  const q = (href) => Object.fromEntries(new URL(href).searchParams);
  check('calendly: ConsultationCta link is rendered with the UTM parameters',
    JSON.stringify(q(rendered)) === JSON.stringify({ utm_source: 'peregrine-it.com', utm_medium: 'website', utm_content: '/services/saas-development', utm_term: 'service:saas-development' }), rendered);
  const html = await fetch(`${APP}/services/saas-development`).then((r) => r.text());
  check('calendly: the same link is in the server HTML', html.includes('utm_content=%2Fservices%2Fsaas-development&amp;utm_term=service%3Asaas-development'));
  const clickAll = () => js(`Array.from(document.querySelectorAll('a[href*="calendly.com"]')).map(function (a) {
    var before = a.getAttribute('href'); a.click(); return { before: before, after: a.getAttribute('href') }; })`);
  for (const page of ['/services/saas-development', '/', '/contact', '/case-studies/proptech-investor-portal']) {
    await goto(APP + page);
    const links = await clickAll();
    const bad = links.filter((l) => { const p = q(l.after); return !(p.utm_source === 'peregrine-it.com' && p.utm_medium === 'website' && p.utm_content === page && p.utm_term); });
    check(`calendly: all ${links.length} links on ${page} carry source, medium, page and location after a click`, links.length > 0 && bad.length === 0, JSON.stringify(bad));
    check(`calendly: ${page} footer links are located as "footer"`, links.some((l) => q(l.after).utm_term === 'footer'), JSON.stringify(links.map((l) => q(l.after).utm_term)));
  }
  const clicks = await events('calendly_click');
  check('calendly: calendly_click still fires for each click', clicks.length > 0 && clicks.every((c) => c.props.location && c.props.page), JSON.stringify(clicks.slice(0, 2)));
  // context menu / middle click path
  await goto(`${APP}/contact`);
  const ctx = await js(`(function () { var a = document.querySelector('a[href*="calendly.com"]'); a.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true })); return a.getAttribute('href'); })()`);
  check('calendly: a right-click (copy link, open in new tab) tags the link too', q(ctx).utm_content === '/contact', ctx);

  // ---------------------------------------------------------------- 3. page views across a client-side navigation
  const before = Number(await js(`sessionStorage.getItem('pit_pages_viewed')`));
  await js(`window.__marker = 1; Array.from(document.querySelectorAll('a[href="/services"]')).find(function (a) { return a.offsetParent !== null; }).click()`);
  await waitFor(() => js(`location.pathname === '/services'`), 'client navigation');
  await sleep(400);
  check('pages: a client-side navigation (no reload) counts as a page view',
    (await js(`window.__marker`)) === 1 && Number(await js(`sessionStorage.getItem('pit_pages_viewed')`)) === before + 1, await js(`sessionStorage.getItem('pit_pages_viewed')`));
  const lastNow = await js(`JSON.parse(sessionStorage.getItem('pit_attribution'))`);
  check('touch: internal page loads leave the last touch alone', lastNow.gclid === 'G-123_x' && lastNow.landingPage === '/services/saas-development', JSON.stringify(lastNow));

  // ---------------------------------------------------------------- 4. inline form: start, POST body, no abandon after success
  await goto(`${APP}/services/saas-development`);
  const F = 'form[data-lead-form="strategy-call"]';
  const inline = `[data-cta-location="service:saas-development"] ${F}`;
  await typeInto(`${inline} [name=scName]`, 'TEST Browser Check');
  await typeInto(`${inline} [name=scName]`, ' again');
  let starts = await events('lead_form_start');
  check('form start: fires once on first input, with form and page only',
    starts.length === 1 && JSON.stringify(starts[0].props) === JSON.stringify({ form: 'strategy-call', page: '/services/saas-development' }), JSON.stringify(starts));
  await typeInto(`${inline} [name=scEmail]`, 'browser-check@example.com');
  await typeInto(`${inline} [name=scCompany]`, 'Example Co');
  await js(`(function () { var f = document.querySelector(${JSON.stringify(inline)}); f.scType.value = 'integration'; f.scTimeline.value = '1-2-months';
    f.scType.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  await typeInto(`${inline} [name=scMessage]`, 'Browser check of the lead form. Not a real enquiry.');
  check('form start: still once after every field was filled', (await events('lead_form_start')).length === 1);
  await js(`document.querySelector(${JSON.stringify(inline)}).requestSubmit()`);
  await waitFor(() => js(`document.body.innerText.includes('Request received')`), 'the success message');
  const body = posts.at(-1) || {};
  check('submit: the POST carries last touch, first touch and click id',
    body.landingPage === '/services/saas-development' && body.utm === 'utm_source=test-src&utm_medium=cpc' && body.referrer === 'https://www.google.com/'
    && body.firstLandingPage === '/services/saas-development' && body.firstUtm === body.utm && body.gclid === 'G-123_x'
    && /^\d{4}-\d\d-\d\dT/.test(body.firstTouchAt) && /^\d{4}-\d\d-\d\dT/.test(body.lastTouchAt), JSON.stringify(body));
  check('submit: inline form reports where it sits', body.ctaLocation === 'inline:service:saas-development', body.ctaLocation);
  check('submit: pages viewed is the session count', body.pagesViewed === Number(await js(`sessionStorage.getItem('pit_pages_viewed')`)) && body.pagesViewed >= 6, String(body.pagesViewed));
  check('submit: the webhook mock received the same attribution and a priority', hooks.length === 1 && hooks[0].gclid === 'G-123_x' && ['high', 'normal', 'low'].includes(hooks[0].priority) && hooks[0].ctaLocation === body.ctaLocation
    && hooks[0].pagesViewed === body.pagesViewed, JSON.stringify(hooks[0]));
  check('submit: lead_submit fired', (await events('lead_submit')).length === 1);
  await js(`window.dispatchEvent(new Event('pagehide'))`);
  check('abandon: a submitted form is not reported as abandoned', (await events('lead_form_abandon')).length === 0);

  // ---------------------------------------------------------------- 5. popup form: CTA location, then a real pagehide
  await goto(`${APP}/contact`);
  await js(`Array.from(document.querySelectorAll('nav [data-open-contact], nav #lets-talk-btn')).find(function (a) { return a.offsetParent !== null; }).click()`);
  await waitFor(() => js(`document.getElementById('contact-popup').classList.contains('active')`), 'the popup');
  const opened = await events('cta_open');
  check('cta: cta_open fired with a location', opened.length === 1 && opened[0].props.location === 'nav', JSON.stringify(opened));
  const popup = `#contact-popup ${F}`;
  await typeInto(`${popup} [name=scName]`, 'TEST Popup');
  await typeInto(`${popup} [name=scEmail]`, 'popup-check@example.com');
  await js(`(function () { var f = document.querySelector(${JSON.stringify(popup)}); f.scType.value = 'other'; f.scTimeline.value = 'exploring'; })()`);
  await typeInto(`${popup} [name=scMessage]`, 'Popup browser check, not a real enquiry.');
  await js(`document.querySelector(${JSON.stringify(popup)}).requestSubmit()`);
  await waitFor(() => posts.length === 2, 'the popup POST');
  check('cta: a popup form reports the CTA that opened it', posts[1].ctaLocation === 'nav', posts[1].ctaLocation);

  // quick-project form on /contact: start it, then really leave the page
  const Q = 'form[data-lead-form="quick-project"]';
  await goto(`${APP}/contact`);
  await typeInto(`main ${Q} [name=qpName], .cp-main ${Q} [name=qpName], ${Q} [name=qpName]`, 'TEST Abandon');
  check('abandon: start fired for the second form', (await events('lead_form_start')).some((e) => e.props.form === 'quick-project'));
  await js(`document.dispatchEvent(new Event('visibilitychange'))`);
  check('abandon: a visibilitychange while still visible is not an abandon', (await events('lead_form_abandon')).length === 0);
  await send('Page.navigate', { url: `${APP}/robots.txt` });   // a real unload: pagehide fires in the old page
  await waitFor(() => js(`location.pathname === '/robots.txt'`), 'navigation away');
  const kept = JSON.parse((await js(`sessionStorage.getItem('__ev')`)) || '[]');
  const abandons = kept.filter((e) => e.name === 'lead_form_abandon');
  check('abandon: leaving with a started, unsent form fires lead_form_abandon once, form and page only',
    abandons.length === 1 && JSON.stringify(abandons[0].props) === JSON.stringify({ form: 'quick-project', page: '/contact' }), JSON.stringify(kept));
  check('abandon: no event carries a field value', !JSON.stringify(kept).includes('TEST Abandon'));
  ws.close();
}

main().catch((err) => { fails.push(`script error: ${err.message}`); }).finally(() => {
  cleanup();
  console.log(`lead browser checks: ${passed} passed, ${fails.length} failed`);
  for (const f of fails) console.log('  FAIL ' + f);
  process.exit(fails.length ? 1 : 0);
});
