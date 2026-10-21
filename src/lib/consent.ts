// The visitor's analytics choice, and the rules that follow from it (Basic Consent Mode).
//
// Nothing from Google Analytics loads, initializes or sends anything until the stored
// choice is "granted". No choice yet, or "denied", means no GA4 at all: no gtag.js, no
// cookieless pings, no queued events.
//
// The choice lives in localStorage under CONSENT_KEY (the same key lib/attribution.ts
// reads for its own storage rules). Changes made in this tab are announced with
// CONSENT_EVENT; changes in another tab arrive as the browser's `storage` event.
//
// The pure functions at the top have no browser dependencies so they can be unit-tested
// with `node --experimental-strip-types scripts/test_consent.mjs`.

export const CONSENT_KEY = 'pit_analytics_consent';
export const CONSENT_EVENT = 'pit-consent-change';
export type Consent = 'granted' | 'denied';

/** Only the two exact values count; anything else is "no choice". */
export function parseConsent(value: unknown): Consent | null {
  return value === 'granted' || value === 'denied' ? value : null;
}

/** GA4 may load only with an explicit "granted" and a configured measurement ID. */
export function shouldLoadGa(gaId: string | undefined, consent: Consent | null): boolean {
  return Boolean(gaId) && consent === 'granted';
}

/** Names of the cookies GA4 (gtag.js) sets: _ga, _ga_<container>, and the legacy _gid/_gat. */
export function gaCookieNames(cookieHeader: string): string[] {
  return cookieHeader
    .split(';')
    .map((part) => part.trim().split('=')[0])
    .filter((name) => /^(_ga|_ga_[A-Za-z0-9]+|_gid|_gat(_.*)?)$/.test(name));
}

/**
 * Cookie strings that expire `name` on this host and on each parent domain. gtag.js sets
 * its cookies on the widest domain it can (for example `.peregrine-it.com`), so deleting
 * only the host cookie would leave them in place.
 */
export function expireCookieStrings(name: string, host: string): string[] {
  const labels = host.split('.');
  const domains: string[] = [];
  for (let i = 0; i < labels.length - 1; i++) domains.push(labels.slice(i).join('.'));
  const base = `${name}=; Max-Age=0; Path=/`;
  return [base, ...domains.map((d) => `${base}; Domain=.${d}`)];
}

// ---------------------------------------------------------------------------
// Browser glue. Storage access is wrapped: private modes can throw.
// ---------------------------------------------------------------------------

export function readConsent(): Consent | null {
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_KEY));
  } catch {
    return null;
  }
}

/** Stores the choice (null clears it) and tells this tab's listeners. */
export function writeConsent(value: Consent | null) {
  try {
    if (value) window.localStorage.setItem(CONSENT_KEY, value);
    else window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    // The choice then lasts for this page only.
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** For useSyncExternalStore: this tab's changes and other tabs' changes. */
export function subscribeConsent(onChange: () => void): () => void {
  const onStorage = (e: StorageEvent) => { if (e.key === CONSENT_KEY || e.key === null) onChange(); };
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener('storage', onStorage);
  };
}

/** Deletes every GA4 cookie this page can see. */
export function clearGaCookies() {
  try {
    for (const name of gaCookieNames(document.cookie)) {
      for (const cookie of expireCookieStrings(name, window.location.hostname)) document.cookie = cookie;
    }
  } catch {
    // Cookies blocked: there is nothing to delete.
  }
}
