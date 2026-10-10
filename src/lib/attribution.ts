// How a visitor arrived, kept in the browser until they submit a lead form.
//
// Nothing here sets a cookie or sends anything on its own. The values leave the browser
// only inside the POST to /api/lead that the visitor triggers by submitting a form.
//
// Where they are kept depends on the visitor's analytics choice (`pit_analytics_consent`,
// set by the consent bar in components/Tracking.tsx):
//   - no choice, or declined: sessionStorage only. Everything, click ids included, is gone
//     when the tab closes, and any first-touch record in localStorage is deleted.
//   - accepted: the first touch is also kept in localStorage for at most 90 days (deleted
//     when read after that), so a later visit can still be tied to the first one.
// The consent bar only exists when GA4 is configured, so without NEXT_PUBLIC_GA_ID nobody
// can accept and the first touch never outlives the session.
// Referrers are stored as origin + path; the query string, which can hold a search phrase
// or a token, is dropped.
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

/** A referrer reduced to origin + path: no query string, no fragment, no credentials. */
export function stripReferrer(referrer: string): string {
  if (!referrer) return '';
  try {
    const url = new URL(referrer);
    return `${url.protocol}//${url.host}${url.pathname}`;
  } catch {
    return '';
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
    referrer: stripReferrer(referrer),
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

/** With consent, the longest a first touch is kept in localStorage. Older ones are deleted when read. */
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
const FIRST_KEY = 'pit_first_touch'; // sessionStorage always; localStorage only with consent
const PAGES_KEY = 'pit_pages_viewed'; // sessionStorage
const CTA_KEY = 'pit_cta'; // sessionStorage
/** Written by the consent bar (components/Tracking.tsx): 'granted' or 'denied'. */
export const CONSENT_KEY = 'pit_analytics_consent';

/** The part of the Storage interface used here, so tests can pass a stand-in. */
export type StorageLike = { getItem(key: string): string | null; setItem(key: string, value: string): void; removeItem(key: string): void };

function read<T>(storage: StorageLike | null, key: string): T | null {
  try {
    const value = JSON.parse(storage?.getItem(key) || 'null');
    return value && typeof value === 'object' ? (value as T) : null;
  } catch {
    return null;
  }
}
function write(storage: StorageLike | null, key: string, value: unknown) {
  try {
    storage?.setItem(key, JSON.stringify(value));
  } catch {
    // Attribution is optional.
  }
}
function remove(storage: StorageLike | null, key: string) {
  try {
    storage?.removeItem(key);
  } catch {
    // Nothing to do.
  }
}

/** True only for an explicit "granted". No choice yet is not consent. */
export function hasConsent(local: StorageLike | null): boolean {
  try {
    return local?.getItem(CONSENT_KEY) === 'granted';
  } catch {
    return false;
  }
}

/**
 * The first touch that may be used right now, enforcing the storage rules as it reads:
 *  - without consent the localStorage record is deleted and only the session's is used;
 *  - with consent the localStorage record is used if it is younger than 90 days, deleted
 *    if it is older, and the session's first touch is copied there when there is none
 *    (the visitor accepted during this visit).
 * Call it on page load, when the visitor makes a consent choice, and before a submit.
 */
export function readFirstTouch(local: StorageLike | null, session: StorageLike | null, now: Date): Touch | null {
  const inSession = read<Touch>(session, FIRST_KEY);
  if (!hasConsent(local)) {
    remove(local, FIRST_KEY);
    return inSession;
  }
  const kept = read<Touch>(local, FIRST_KEY);
  if (isFresh(kept, now)) return kept;
  remove(local, FIRST_KEY);
  if (inSession) write(local, FIRST_KEY, inSession);
  return inSession;
}

/** A touch with its click ids removed unless the visitor has accepted analytics. */
export function withoutClickIdsUnlessConsented(touch: Touch, local: StorageLike | null): Touch {
  return hasConsent(local) ? touch : { ...touch, gclid: '', msclkid: '', fbclid: '' };
}

/** Records one page load. All storage decisions are here and in readFirstTouch. */
export function syncTouches(env: { local: StorageLike | null; session: StorageLike | null; href: string; referrer: string; host: string; now: Date }) {
  // Advertising click ids (gclid, msclkid, fbclid) identify one person's ad click. They are
  // read only after an explicit analytics consent; without it they are never stored or sent.
  const parsed = withoutClickIdsUnlessConsented(parseTouch(env.href, env.referrer, env.now), env.local);
  // A referrer on this site (a reload, an internal link) is not where the visitor came from.
  const current = isExternalReferrer(parsed.referrer, env.host) ? parsed : { ...parsed, referrer: '' };
  const stored = { first: readFirstTouch(env.local, env.session, env.now), last: read<Touch>(env.session, LAST_KEY) };
  const next = nextTouches(stored, current, env.host, env.now);
  if (next.first !== stored.first) {
    write(env.session, FIRST_KEY, next.first);
    if (hasConsent(env.local)) write(env.local, FIRST_KEY, next.first);
  }
  if (next.last !== stored.last) write(env.session, LAST_KEY, next.last);
}

function storages(): { local: StorageLike | null; session: StorageLike | null } {
  // Reading the property itself can throw when storage is blocked.
  let local: StorageLike | null = null;
  let session: StorageLike | null = null;
  try { local = window.localStorage; } catch { /* blocked */ }
  try { session = window.sessionStorage; } catch { /* blocked */ }
  return { local, session };
}
const session = () => window.sessionStorage;

/** Call once per full page load. */
export function rememberAttribution() {
  if (typeof window === 'undefined') return;
  syncTouches({ ...storages(), href: window.location.href, referrer: document.referrer, host: window.location.hostname, now: new Date() });
}

/** Call right after the visitor accepts or declines analytics: keeps or deletes the stored first touch accordingly. */
export function applyConsentChoice() {
  if (typeof window === 'undefined') return;
  const { local, session: tab } = storages();
  readFirstTouch(local, tab, new Date());
  // Declined or withdrawn: click ids captured while consent was in force are removed too.
  if (!hasConsent(local)) {
    for (const key of [FIRST_KEY, LAST_KEY]) {
      const touch = read<Touch>(tab, key);
      if (touch && (touch.gclid || touch.msclkid || touch.fbclid)) write(tab, key, withoutClickIdsUnlessConsented(touch, local));
    }
  }
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
  write(storages().session, CTA_KEY, { form, location, page: window.location.pathname });
}

/**
 * The CTA location for a form that is being submitted: the CTA that opened it when the
 * form is in a popup, otherwise where the inline form sits on the page.
 */
export function ctaLocationFor(formEl: Element, form: string): string {
  if (formEl.closest('.popup-overlay')) {
    const cta = read<{ form: string; location: string }>(storages().session, CTA_KEY);
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
  const { local, session: tab } = storages();
  return toLeadAttribution(readFirstTouch(local, tab, new Date()), read<Touch>(tab, LAST_KEY), ctaLocation, pages);
}
