'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { applyConsentChoice, calendlyUrl, countPageView, locationOf, rememberAttribution, rememberCta } from '@/lib/attribution';
import { clearGaCookies, readConsent, shouldLoadGa, subscribeConsent, writeConsent, type Consent } from '@/lib/consent';
import { formTracker, track } from '@/lib/track';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** True when GA4 is configured, so a consent choice means something. */
export const analyticsConfigured = Boolean(GA_ID);

/** The stored choice, kept in step across components and tabs. Null on the server and before a choice. */
export function useConsent(): Consent | null {
  return useSyncExternalStore(subscribeConsent, readConsent, () => null);
}

/**
 * Records the visitor's analytics choice. Accepting lets <Tracking> load GA4 on this page.
 * Declining after GA4 has loaded on this page (a withdrawal) cannot unload the script that is
 * already running, so consent is set to denied for it, its cookies are deleted, and the page
 * reloads: the reloaded page has no GA4 at all.
 */
export function chooseAnalytics(value: Consent) {
  const gaRunning = typeof window.gtag === 'function';
  writeConsent(value);
  // The same choice governs the first-touch record: kept in localStorage only when
  // accepted, deleted from it when declined (lib/attribution.ts).
  applyConsentChoice();
  if (value === 'denied') {
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
    clearGaCookies();
    if (gaRunning) window.location.reload();
  }
}

// Shown only when GA4 is configured and the visitor has not chosen yet. Until they accept,
// nothing from Google Analytics loads (Basic Consent Mode).
function ConsentBar() {
  const [closed, setClosed] = useState(false);
  if (closed) return null;
  const choose = (value: Consent) => {
    chooseAnalytics(value);
    setClosed(true);
  };
  return (
    <div className="consent-bar" role="region" aria-label="Analytics cookies">
      <p>
        We use Google Analytics cookies to see how the site is used. They are off unless you accept.{' '}
        <Link href="/privacy-policy">Privacy policy</Link>
      </p>
      <div className="consent-bar-actions">
        <button type="button" onClick={() => choose('denied')}>Decline</button>
        <button type="button" className="consent-accept" onClick={() => choose('granted')}>Accept</button>
      </div>
    </div>
  );
}

// Every element that opens the quick-project popup (the same list as components/Footer.tsx).
const QUICK_TRIGGERS = '[data-open-quick-project], #quick-project-btn, #quick-project-btn-footer, #quick-project-btn-footer-col';

/** Site-wide click tracking (delegated, so no page needs its own handlers) and optional GA4
 *  in Basic Consent Mode: gtag.js loads only after the visitor accepts. Without
 *  NEXT_PUBLIC_GA_ID nothing from Google loads and no bar shows. */
export default function Tracking() {
  const pathname = usePathname();
  const consent = useConsent();
  // Pages viewed this tab session: the first load and every client-side navigation.
  useEffect(() => {
    countPageView();
  }, [pathname]);

  useEffect(() => {
    rememberAttribution();
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const page = window.location.pathname;
      const cta = target.closest(`[data-open-contact], #lets-talk-btn, ${QUICK_TRIGGERS}`);
      if (cta) {
        const form = cta.matches(QUICK_TRIGGERS) ? 'quick-project' : 'strategy-call';
        const guide = cta.closest<HTMLElement>('[data-guide]')?.dataset.guide;
        const location = locationOf(cta);
        // Sent with the lead if this popup form is submitted (lib/attribution.ts).
        rememberCta(form, location);
        track('cta_open', { form, location, page });
        if (guide) track('guide_cta_click', { guide, action: 'popup' });
        return;
      }
      const link = target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (href.includes('calendly.com')) {
        track('calendly_click', { location: locationOf(link), page });
        const guide = link.closest<HTMLElement>('[data-guide]')?.dataset.guide;
        if (guide) track('guide_cta_click', { guide, action: 'calendly' });
      }
      else if (href.startsWith('mailto:')) track('email_click', { page });
    };
    // Booking attribution: every Calendly link, wherever it is written, leaves the site with
    // the page and the CTA location as UTM parameters (lib/attribution.ts). Done here, once,
    // because the links are hardcoded in many pages. Runs in the capture phase, before the
    // browser follows the link; auxclick and contextmenu cover middle-click and
    // "open in new tab" / "copy link address".
    const tagCalendly = (e: Event) => {
      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const tagged = calendlyUrl(href, window.location.pathname, locationOf(link));
      if (tagged !== href) link.setAttribute('href', tagged);
    };
    // A form submitted inside a guide's consultation block counts as a guide CTA.
    const onSubmit = (e: Event) => {
      const guide = (e.target as Element | null)?.closest<HTMLElement>('[data-guide]')?.dataset.guide;
      if (guide) track('guide_cta_click', { guide, action: 'form' });
    };
    // Form abandonment (lib/form-tracking.ts). Only the form's name is read, never a field.
    const onInput = (e: Event) => {
      const field = e.target as (Element & { name?: string }) | null;
      const form = field?.closest?.<HTMLElement>('form[data-lead-form]');
      // The hidden anti-spam field is filled by bots, not by a visitor starting the form.
      if (!form || field?.name === 'pit_confirm_field') return;
      formTracker.input(form.dataset.leadForm || '', window.location.pathname);
    };
    const onHidden = () => {
      if (document.visibilityState === 'hidden') formTracker.hidden();
    };
    const onPageHide = () => formTracker.hidden();
    document.addEventListener('input', onInput, true);
    document.addEventListener('visibilitychange', onHidden);
    window.addEventListener('pagehide', onPageHide);
    const CALENDLY_EVENTS = ['click', 'auxclick', 'contextmenu'] as const;
    CALENDLY_EVENTS.forEach((type) => document.addEventListener(type, tagCalendly, true));
    document.addEventListener('click', onClick, true);
    document.addEventListener('submit', onSubmit, true);
    return () => {
      CALENDLY_EVENTS.forEach((type) => document.removeEventListener(type, tagCalendly, true));
      document.removeEventListener('input', onInput, true);
      document.removeEventListener('visibilitychange', onHidden);
      window.removeEventListener('pagehide', onPageHide);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('submit', onSubmit, true);
    };
  }, []);

  if (!GA_ID) return null;
  if (!shouldLoadGa(GA_ID, consent)) return consent === null ? <ConsentBar /> : null;
  // Rendered only with consent, so the tag loads at most once per page (next/script dedupes by
  // id). gtag('config') sends the page view for the current page; later client-side
  // navigations are counted by GA4's history-change page views, once each.
  return (
    <>
      <Script id="ga4-src" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;` +
          // Analytics granted (the visitor accepted); advertising stays denied.
          `gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});` +
          `gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
