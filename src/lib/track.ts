import { track as vercelTrack } from '@vercel/analytics';

// One place for conversion events. Every event goes to Vercel Analytics and, when GA4
// is loaded (NEXT_PUBLIC_GA_ID set), to GA4 as well. Event names and properties are
// documented in SEO-TASKS.md; keep the two in step.
type Props = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, props: Props = {}) {
  if (typeof window === 'undefined') return;
  try {
    vercelTrack(event, props);
    window.gtag?.('event', event, props);
  } catch {
    // Tracking must never break the page.
  }
}

const ATTRIBUTION_KEY = 'pit_attribution';
export type Attribution = { landingPage: string; referrer: string; utm: string };

/** Remembers how the visitor arrived (first page, referrer, UTM tags) for this tab session. */
export function rememberAttribution() {
  try {
    if (sessionStorage.getItem(ATTRIBUTION_KEY)) return;
    const utm = Array.from(new URLSearchParams(window.location.search))
      .filter(([k]) => k.startsWith('utm_') || k === 'gclid')
      .map(([k, v]) => `${k}=${v}`)
      .join('&');
    const value: Attribution = { landingPage: window.location.pathname, referrer: document.referrer, utm };
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(value));
  } catch {
    // Storage can be unavailable (private mode); attribution is optional.
  }
}

export function getAttribution(): Partial<Attribution> {
  try {
    return JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) || '{}');
  } catch {
    return {};
  }
}
