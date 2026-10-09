// Unit tests for the browser-side lead logic that has no DOM in it
// (src/lib/attribution.ts, src/lib/form-tracking.ts).
// Run: node --experimental-strip-types scripts/test_lead_client.mjs
import assert from 'node:assert/strict';
import {
  calendlyUrl, cleanAttribution, hasSource, isExternalReferrer, nextTouches, oneLine, parseTouch, toLeadAttribution,
} from '../src/lib/attribution.ts';
import { createFormTracker } from '../src/lib/form-tracking.ts';

let passed = 0;
const eq = (actual, expected, name) => { assert.deepEqual(actual, expected, name); passed++; };
const HOST = 'peregrine-it.com';
const day = (n) => new Date(Date.UTC(2026, 9, n, 12));

// --- parseTouch
const ad = parseTouch('https://peregrine-it.com/services/saas-development?utm_source=google&utm_medium=cpc&gclid=Cj0-x_1&x=1', 'https://www.google.com/', day(1));
eq(ad, { at: '2026-10-01T12:00:00.000Z', landingPage: '/services/saas-development', referrer: 'https://www.google.com/',
  utm: 'utm_source=google&utm_medium=cpc', gclid: 'Cj0-x_1', msclkid: '', fbclid: '' }, 'ad click: path, referrer, utm and gclid kept apart');
eq(parseTouch('https://peregrine-it.com/?msclkid=m1&fbclid=f1', '', day(1)).msclkid, 'm1', 'msclkid read');
eq(parseTouch('https://peregrine-it.com/?msclkid=m1&fbclid=f1', '', day(1)).fbclid, 'f1', 'fbclid read');
eq(parseTouch('not a url', '', day(1)).landingPage, '/', 'bad URL does not throw');
eq(parseTouch('https://peregrine-it.com/a?utm_source=', '', day(1)).utm, '', 'empty utm value ignored');

// --- which arrivals name a source
eq(isExternalReferrer('https://www.google.com/', HOST), true, 'search engine is external');
eq(isExternalReferrer('https://peregrine-it.com/contact', HOST), false, 'own site is not');
eq(isExternalReferrer('https://www.peregrine-it.com/', 'localhost'), false, 'www host is not');
eq(isExternalReferrer('', HOST), false, 'direct is not');
eq(isExternalReferrer('garbage', HOST), false, 'malformed referrer is not');
eq(hasSource(parseTouch('https://peregrine-it.com/', '', day(1)), HOST), false, 'direct visit has no source');
eq(hasSource(ad, HOST), true, 'ad click has a source');

// --- first touch / last touch
const direct = parseTouch('https://peregrine-it.com/blog/x', '', day(2));
let t = nextTouches({ first: null, last: null }, ad, HOST, day(1));
eq([t.first, t.last], [ad, ad], 'first visit: both touches are the arrival');
t = nextTouches({ first: ad, last: ad }, direct, HOST, day(2));
eq([t.first, t.last], [ad, ad], 'same session, internal page load: nothing changes');
t = nextTouches({ first: ad, last: null }, direct, HOST, day(2));
eq([t.first, t.last], [ad, direct], 'new session, direct: first touch kept, last touch is the new arrival');
const bing = parseTouch('https://peregrine-it.com/contact?msclkid=m9', 'https://www.bing.com/', day(3));
t = nextTouches({ first: ad, last: direct }, bing, HOST, day(3));
eq([t.first, t.last], [ad, bing], 'same session, new ad click: last touch replaced, first kept');
t = nextTouches({ first: ad, last: null }, direct, HOST, new Date(Date.UTC(2027, 1, 1)));
eq(t.first, direct, 'first touch older than 90 days is replaced');
t = nextTouches({ first: { landingPage: '/x' }, last: null }, direct, HOST, day(2));
eq(t.first, direct, 'corrupt stored first touch is replaced');

// --- what the form sends
eq(toLeadAttribution(ad, bing, 'hero', 3), {
  landingPage: '/contact', referrer: 'https://www.bing.com/', utm: '', lastTouchAt: '2026-10-03T12:00:00.000Z',
  firstLandingPage: '/services/saas-development', firstReferrer: 'https://www.google.com/', firstUtm: 'utm_source=google&utm_medium=cpc',
  firstTouchAt: '2026-10-01T12:00:00.000Z', gclid: 'Cj0-x_1', msclkid: 'm9', fbclid: '', ctaLocation: 'hero', pagesViewed: 3,
}, 'flat fields; a click id falls back to the first touch when the last has none');
eq(toLeadAttribution(null, null, '', 0).landingPage, '', 'no storage: empty fields, no throw');

// --- server-side cleaning
eq(oneLine('  a\r\nb c\t ', 50), 'a b c', 'control characters become spaces');
eq(oneLine(42, 50), '', 'non-strings are dropped');
const c = cleanAttribution({ gclid: 'ok-1_2.3', msclkid: 'no spaces', fbclid: '<script>', pagesViewed: -5, firstTouchAt: '2026-10-01T12:00:00Z',
  lastTouchAt: 'now', ctaLocation: 'inline:service:saas-development', utm: 'a'.repeat(900) });
eq([c.gclid, c.msclkid, c.fbclid], ['ok-1_2.3', '', ''], 'click ids: token alphabet only');
eq([c.pagesViewed, c.firstTouchAt, c.lastTouchAt], [0, '2026-10-01T12:00:00Z', ''], 'numbers clamped, times validated');
eq([c.ctaLocation, c.utm.length], ['inline:service:saas-development', 500], 'location kept, long strings cut');
eq(cleanAttribution({ pagesViewed: 3.9 }).pagesViewed, 3, 'pagesViewed is an integer');
eq(cleanAttribution({ pagesViewed: Number.NaN }).pagesViewed, 0, 'NaN is 0');

// --- Calendly links
const CAL = 'https://calendly.com/mukesh-peregrine-it/30min';
const u = new URL(calendlyUrl(CAL, '/services/saas-development', 'service:saas-development'));
eq([u.origin + u.pathname, u.searchParams.get('utm_source'), u.searchParams.get('utm_medium'), u.searchParams.get('utm_content'), u.searchParams.get('utm_term')],
  [CAL, 'peregrine-it.com', 'website', '/services/saas-development', 'service:saas-development'], 'calendly: four UTM parameters');
eq(calendlyUrl(calendlyUrl(CAL, '/a', 'nav'), '/b', 'footer'), calendlyUrl(CAL, '/b', 'footer'), 'calendly: rewriting twice replaces, never appends');
eq(new URL(calendlyUrl(CAL + '?month=2026-11', '/', '')).searchParams.get('month'), '2026-11', 'calendly: existing parameters kept');
eq(new URL(calendlyUrl(CAL, '', '')).searchParams.get('utm_term'), 'page', 'calendly: defaults for missing page and location');
for (const other of ['https://example.com/calendly.com', 'https://notcalendly.com/x', 'http://calendly.com/x', 'mailto:info@peregrine-it.com', '/contact', ''])
  eq(calendlyUrl(other, '/a', 'nav'), other, `calendly: ${other || 'empty'} is left alone`);

// --- form start and abandonment
const run = (steps) => { const out = []; const tr = createFormTracker((e) => out.push(`${e.event}:${e.form}:${e.page}`)); steps(tr); return out; };
eq(run((tr) => { tr.input('strategy-call', '/contact'); tr.input('strategy-call', '/contact'); tr.input('strategy-call', '/contact'); }),
  ['lead_form_start:strategy-call:/contact'], 'start fires once however much is typed');
eq(run((tr) => { tr.input('strategy-call', '/contact'); tr.hidden(); tr.hidden(); tr.input('strategy-call', '/contact'); tr.hidden(); }),
  ['lead_form_start:strategy-call:/contact', 'lead_form_abandon:strategy-call:/contact'], 'abandon fires once; typing again on the same page view restarts nothing');
eq(run((tr) => { tr.input('strategy-call', '/contact'); tr.submitted('strategy-call'); tr.hidden(); }),
  ['lead_form_start:strategy-call:/contact'], 'a submitted form is not abandoned');
eq(run((tr) => { tr.hidden(); }), [], 'nothing started, nothing abandoned');
eq(run((tr) => { tr.input('strategy-call', '/contact'); tr.input('quick-project', '/contact'); tr.submitted('quick-project'); tr.hidden(); }),
  ['lead_form_start:strategy-call:/contact', 'lead_form_start:quick-project:/contact', 'lead_form_abandon:strategy-call:/contact'], 'forms are tracked separately');
eq(run((tr) => { tr.input('strategy-call', '/a'); tr.input('strategy-call', '/b'); }),
  ['lead_form_start:strategy-call:/a', 'lead_form_start:strategy-call:/b'], 'a new page view can start again');
eq(run((tr) => { tr.input('', '/a'); tr.hidden(); }), [], 'a form without a name is ignored');
let keys = []; createFormTracker((e) => { keys = Object.keys(e); }).input('quick-project', '/');
eq(keys.sort(), ['event', 'form', 'page'], 'events carry form and page only');

console.log(`lead client unit tests: ${passed} passed`);
