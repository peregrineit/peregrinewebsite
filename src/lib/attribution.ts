// How a visitor arrived, kept in the browser until they submit a lead form.
//
// Nothing here sets a cookie or sends anything on its own. The values sit in
// sessionStorage (this tab) and localStorage (this browser) and leave the browser only
// inside the POST to /api/lead that the visitor triggers by submitting a form.
// Rules and field list: docs/growth/lead/ARCHITECTURE.md.
//
// This file has no imports so the pure functions can be unit-tested with
// `node --experimental-strip-types scripts/test_lead_client.mjs`.

/** One arrival on the site: the page, where from, and any campaign tags on that URL. */
export type Touch = {
  /** ISO time the touch was recorded. */
  at: string;
  landingPage: string;
  referrer: string;
  /** `utm_*` parameters as they appeared, joined with `&`. */
  utm: string;
  gclid: string;
  msclkid: string;
  fbclid: string;
};

/** The attribution fields sent with a lead. All strings except `pagesViewed`. */
export type LeadAttribution = {
  /** Last touch (kept under the names the API already used). */
  landingPage: string;
  referrer: string;
  utm: string;
  lastTouchAt: string;
  firstLandingPage: string;
  firstReferrer: string;
  firstUtm: string;
  firstTouchAt: string;
  gclid: string;
  msclkid: string;
  fbclid: string;
  /** Where on the page the CTA that opened the form (or the inline form itself) sits. */
  ctaLocation: string;
  /** Page views in this tab session, counted up to the submit. 0 = not known. */
  pagesViewed: number;
};

export const CLICK_IDS = ['gclid', 'msclkid', 'fbclid'] as const;

const SITE_HOSTS = ['peregrine-it.com', 'www.peregrine-it.com'];

/** True when the referrer is another site (not empty, not this site, not this host). */
export function isExternalReferrer(referrer: string, currentHost: string): boolean {
  if (!referrer) return false;
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    return host !== currentHost.toLowerCase() && !SITE_HOSTS.includes(host);
  } catch {
    return false;
  }
}

/** Reads one arrival from a page URL and its referrer. Pure. */
export function parseTouch(url: string, referrer: string, now: Date): Touch {
  let pathname = '/';
  let params = new URLSearchParams();
  try {
    const parsed = new URL(url);
    pathname = parsed.pathname;
    params = parsed.searchParams;
  } catch {
    // Not a URL: keep the defaults.
  }
  const utm = Array.from(params)
    .filter(([k, v]) => k.startsWith('utm_') && v)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
  return {
    at: now.toISOString(),
    landingPage: pathname,
    referrer,
    utm,
    gclid: params.get('gclid') || '',
    msclkid: params.get('msclkid') || '',
    fbclid: params.get('fbclid') || '',
  };
}

/** A touch names a source when it has campaign tags, a click id, or came from another site. */
export function hasSource(touch: Touch, currentHost: string): boolean {
  return Boolean(touch.utm || touch.gclid || touch.msclkid || touch.fbclid) || isExternalReferrer(touch.referrer, currentHost);
}

/** First touches older than this are replaced, so the stored value does not live for ever. */
export const FIRST_TOUCH_MAX_AGE_DAYS = 90;

export function isFresh(touch: Partial<Touch> | null, now: Date): touch is Touch {
  if (!touch || typeof touch.at !== 'string') return false;
  const age = now.getTime() - Date.parse(touch.at);
  return Number.isFinite(age) && age >= 0 && age < FIRST_TOUCH_MAX_AGE_DAYS * 86_400_000;
}

/**
 * What to store after a page load. Pure: takes what is stored, returns what should be.
 *  - first touch: the first arrival this browser has a record of (replaced after 90 days)
 *  - last touch: the first arrival of this tab session, replaced by any later full page
 *    load that names a source (an ad click or a link from another site in the same tab)
 */
export function nextTouches(
  stored: { first: Partial<Touch> | null; last: Partial<Touch> | null },
  current: Touch,
  currentHost: string,
  now: Date
): { first: Touch; last: Touch } {
  const first = isFresh(stored.first, now) ? stored.first : current;
  const keepLast = stored.last && typeof stored.last.at === 'string' && !hasSource(current, currentHost);
  return { first, last: keepLast ? (stored.last as Touch) : current };
}

/** Combines both touches into the flat fields the API accepts. Pure. */
export function toLeadAttribution(
  first: Partial<Touch> | null,
  last: Partial<Touch> | null,
  ctaLocation: string,
  pagesViewed: number
): LeadAttribution {
  const f = first || {};
  const l = last || {};
  return {
    landingPage: l.landingPage || '',
    referrer: l.referrer || '',
    utm: l.utm || '',
    lastTouchAt: l.at || '',
    firstLandingPage: f.landingPage || '',
    firstReferrer: f.referrer || '',
    firstUtm: f.utm || '',
    firstTouchAt: f.at || '',
    // The most recent click id seen; the first touch's when the last touch had none.
    gclid: l.gclid || f.gclid || '',
    msclkid: l.msclkid || f.msclkid || '',
    fbclid: l.fbclid || f.fbclid || '',
    ctaLocation,
    pagesViewed,
  };
}

// ---------------------------------------------------------------------------
// Server side: nothing from the browser is trusted.
// ---------------------------------------------------------------------------

// Characters that end a line in at least one mail client, terminal or spreadsheet.
const LINE_BREAKS = /\r\n?|[\n\u0085\u2028\u2029]/g;
// Everything else that is invisible or reorders text: C0 and C1 controls (tab and line feed
// are handled separately), zero-width characters, and the bidirectional overrides, embeddings
// and isolates that can make "Priority: Low" display as something else.
const INVISIBLE = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u061c\u200b-\u200f\u202a-\u202e\u2060-\u2069\ufeff]/g;

/**
 * One line of text: every kind of line break and tab becomes a single space, invisible and
 * direction-changing characters are removed, then it is trimmed and cut to `max`. Used for
 * every field that is printed as "Label: value", so a value cannot add a line of its own.
 */
export function oneLine(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(LINE_BREAKS, ' ').replace(/\t/g, ' ').replace(INVISIBLE, '').replace(/ {2,}/g, ' ').trim().slice(0, max);
}

/**
 * Free text that may span lines (the message): every kind of line break becomes "\n", the
 * same invisible characters are removed, runs of blank lines are shortened to one.
 */
export function multiLine(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(LINE_BREAKS, '\n')
    .replace(/\t/g, ' ')
    .replace(INVISIBLE, '')
    .replace(/[ ]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max);
}

const isoTime = (value: unknown) => {
  const v = oneLine(value, 40);
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/.test(v) ? v : '';
};
/** Click ids are opaque tokens; anything outside this alphabet is not one. */
const clickId = (value: unknown) => {
  const v = oneLine(value, 200);
  return /^[A-Za-z0-9_.\-]+$/.test(v) ? v : '';
};

/** Cleans and length-limits every attribution field of a request body. */
export function cleanAttribution(raw: Record<string, unknown>): LeadAttribution {
  const pages = typeof raw.pagesViewed === 'number' ? raw.pagesViewed : Number.parseInt(oneLine(raw.pagesViewed, 6), 10);
  return {
    landingPage: oneLine(raw.landingPage, 500),
    referrer: oneLine(raw.referrer, 500),
    utm: oneLine(raw.utm, 500),
    lastTouchAt: isoTime(raw.lastTouchAt),
    firstLandingPage: oneLine(raw.firstLandingPage, 500),
    firstReferrer: oneLine(raw.firstReferrer, 500),
    firstUtm: oneLine(raw.firstUtm, 500),
    firstTouchAt: isoTime(raw.firstTouchAt),
    gclid: clickId(raw.gclid),
    msclkid: clickId(raw.msclkid),
    fbclid: clickId(raw.fbclid),
    ctaLocation: oneLine(raw.ctaLocation, 80).replace(/[^\w:./# -]/g, ''),
    pagesViewed: Number.isFinite(pages) ? Math.min(Math.max(Math.trunc(pages), 0), 999) : 0,
  };
}

// ---------------------------------------------------------------------------
// Calendly links
// ---------------------------------------------------------------------------

/**
 * Adds the UTM parameters Calendly records with a booking, so a booked call can be tied
 * to the page and the CTA it came from. Any other URL is returned unchanged. Pure.
 */
export function calendlyUrl(href: string, page: string, location: string): string {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }
  if (url.protocol !== 'https:' || !/(^|\.)calendly\.com$/i.test(url.hostname)) return href;
  url.searchParams.set('utm_source', 'peregrine-it.com');
  url.searchParams.set('utm_medium', 'website');
  url.searchParams.set('utm_content', page.slice(0, 200) || '/');
  url.searchParams.set('utm_term', location.slice(0, 80) || 'page');
  return url.toString();
}

// ---------------------------------------------------------------------------
// Browser glue. Every storage access is wrapped: private modes can throw.
// ---------------------------------------------------------------------------

const LAST_KEY = 'pit_attribution'; // sessionStorage (name kept from the first version)
const FIRST_KEY = 'pit_first_touch'; // localStorage
const PAGES_KEY = 'pit_pages_viewed'; // sessionStorage
const CTA_KEY = 'pit_cta'; // sessionStorage

function read<T>(storage: () => Storage, key: string): T | null {
  try {
    const value = JSON.parse(storage().getItem(key) || 'null');
    return value && typeof value === 'object' ? (value as T) : null;
  } catch {
    return null;
  }
}
function write(storage: () => Storage, key: string, value: unknown) {
  try {
    storage().setItem(key, JSON.stringify(value));
  } catch {
    // Attribution is optional.
  }
}
const session = () => window.sessionStorage;
const local = () => window.localStorage;

/** Call once per full page load. */
export function rememberAttribution() {
  if (typeof window === 'undefined') return;
  const now = new Date();
  const current = parseTouch(window.location.href, document.referrer, now);
  const stored = { first: read<Touch>(local, FIRST_KEY), last: read<Touch>(session, LAST_KEY) };
  const next = nextTouches(stored, current, window.location.hostname, now);
  if (next.first !== stored.first) write(local, FIRST_KEY, next.first);
  if (next.last !== stored.last) write(session, LAST_KEY, next.last);
}

/** Call on every page view (first load and each client-side navigation). */
export function countPageView() {
  if (typeof window === 'undefined') return;
  try {
    const n = Number.parseInt(session().getItem(PAGES_KEY) || '0', 10) || 0;
    session().setItem(PAGES_KEY, String(Math.min(n + 1, 999)));
  } catch {
    // Optional.
  }
}

/** Nearest meaningful container, so reports say where on the page a CTA sits. */
export function locationOf(el: Element): string {
  const tagged = el.closest<HTMLElement>('[data-cta-location]');
  if (tagged) return tagged.dataset.ctaLocation || '';
  if (el.closest('nav')) return 'nav';
  if (el.closest('.footer-section')) return 'footer';
  return el.closest('section[id], div[id]')?.id || 'page';
}

/** Remembers which CTA opened a popup form. */
export function rememberCta(form: string, location: string) {
  if (typeof window === 'undefined') return;
  write(session, CTA_KEY, { form, location, page: window.location.pathname });
}

/**
 * The CTA location for a form that is being submitted: the CTA that opened it when the
 * form is in a popup, otherwise where the inline form sits on the page.
 */
export function ctaLocationFor(formEl: Element, form: string): string {
  if (formEl.closest('.popup-overlay')) {
    const cta = read<{ form: string; location: string }>(session, CTA_KEY);
    return cta && cta.form === form && typeof cta.location === 'string' ? cta.location : 'popup';
  }
  return `inline:${locationOf(formEl)}`;
}

/** Everything known about how the visitor arrived, for the lead POST. */
export function getAttribution(ctaLocation = ''): LeadAttribution {
  let pages = 0;
  try {
    pages = Number.parseInt(session().getItem(PAGES_KEY) || '0', 10) || 0;
  } catch {
    // Optional.
  }
  return toLeadAttribution(read<Touch>(local, FIRST_KEY), read<Touch>(session, LAST_KEY), ctaLocation, pages);
}
