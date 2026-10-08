'use client';
import { useEffect } from 'react';
import Script from 'next/script';
import { rememberAttribution, track } from '@/lib/track';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Nearest meaningful container, so reports say where on the page a CTA was clicked.
function locationOf(el: Element) {
  const tagged = el.closest<HTMLElement>('[data-cta-location]');
  if (tagged) return tagged.dataset.ctaLocation || '';
  if (el.closest('nav')) return 'nav';
  if (el.closest('.footer-section')) return 'footer';
  return el.closest('section[id], div[id]')?.id || 'page';
}

/** Site-wide click tracking (delegated, so no page needs its own handlers) and optional GA4. */
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
        if (guide) track('guide_cta_click', { guide });
        return;
      }
      const link = target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (href.includes('calendly.com')) track('calendly_click', { location: locationOf(link), page });
      else if (href.startsWith('mailto:')) track('email_click', { page });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
