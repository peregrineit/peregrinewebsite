import { track as vercelTrack } from '@vercel/analytics';

// One place for conversion events. Every event goes to Vercel Analytics and, when GA4
// is loaded (NEXT_PUBLIC_GA_ID set), to GA4 as well. Event names and properties are
// documented in docs/seo/TASKS.md; keep the two in step.
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

// Attribution (how the visitor arrived) lives in ./attribution.ts.
