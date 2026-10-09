'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { rememberAttribution, track } from '@/lib/track';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CONSENT_KEY = 'pit_analytics_consent';
type Consent = 'granted' | 'denied';

const noSubscription = () => () => {};

function storedConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

// Shown only when GA4 is enabled and the visitor has not chosen yet. Until they accept,
// Consent Mode keeps analytics storage denied, so GA4 sets no cookies.
function ConsentBar() {
  // localStorage is not available during server rendering, so the server snapshot is
  // "no choice needed" and the bar appears only after hydration.
  const needsChoice = useSyncExternalStore(noSubscription, () => storedConsent() === null, () => false);
  const [closed, setClosed] = useState(false);
  if (!needsChoice || closed) return null;
  const choose = (value: Consent) => {
    try { localStorage.setItem(CONSENT_KEY, value); } catch { /* choice lasts for this page only */ }
    window.gtag?.('consent', 'update', { analytics_storage: value });
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

// Nearest meaningful container, so reports say where on the page a CTA was clicked.
function locationOf(el: Element) {
  const tagged = el.closest<HTMLElement>('[data-cta-location]');
  if (tagged) return tagged.dataset.ctaLocation || '';
  if (el.closest('nav')) return 'nav';
  if (el.closest('.footer-section')) return 'footer';
  return el.closest('section[id], div[id]')?.id || 'page';
}

/** Site-wide click tracking (delegated, so no page needs its own handlers) and optional GA4
 *  with Consent Mode. Without NEXT_PUBLIC_GA_ID nothing from Google loads and no bar shows. */
export default function Tracking() {
  useEffect(() => {
    rememberAttribution();
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const page = window.location.pathname;
      const cta = target.closest('[data-open-contact], #lets-talk-btn, [data-open-quick-project]');
      if (cta) {
        const form = cta.matches('[data-open-quick-project]') ? 'quick-project' : 'strategy-call';
        const guide = cta.closest<HTMLElement>('[data-guide]')?.dataset.guide;
        track('cta_open', { form, location: locationOf(cta), page });
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
    // A form submitted inside a guide's consultation block counts as a guide CTA.
    const onSubmit = (e: Event) => {
      const guide = (e.target as Element | null)?.closest<HTMLElement>('[data-guide]')?.dataset.guide;
      if (guide) track('guide_cta_click', { guide, action: 'form' });
    };
    document.addEventListener('click', onClick, true);
    document.addEventListener('submit', onSubmit, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('submit', onSubmit, true);
    };
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;` +
          // Consent Mode v2: everything denied until the visitor accepts analytics.
          `var c='denied';try{if(localStorage.getItem('${CONSENT_KEY}')==='granted')c='granted';}catch(e){}` +
          `gtag('consent','default',{analytics_storage:c,ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});` +
          `gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
      <ConsentBar />
    </>
  );
}
