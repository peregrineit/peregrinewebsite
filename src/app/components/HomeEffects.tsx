'use client';
import { useEffect } from 'react';

// Replaces the two things the Webflow runtime (/js/peregrine.js) still did on the
// homepage: render the Lottie animations and play the scroll-reveal effects.
const LOTTIE_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie_light.min.js';
// Elements Webflow faded or slid in on scroll (see the Phase 7 behaviour diff).
const REVEAL_SELECTORS = ['.tech-cell', '.home-services-item-heading', '.check-list-item'];

type LottieApi = { loadAnimation: (o: Record<string, unknown>) => unknown };
let lottieLoading: Promise<LottieApi> | null = null;
function loadLottie(): Promise<LottieApi> {
  if (!lottieLoading) {
    lottieLoading = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = LOTTIE_SRC;
      s.async = true;
      s.onload = () => resolve((window as unknown as { lottie: LottieApi }).lottie);
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }
  return lottieLoading;
}

export default function HomeEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observers: IntersectionObserver[] = [];

    // Lottie: load the player only when an animation is about to scroll into view.
    const lotties = Array.from(document.querySelectorAll<HTMLElement>('[data-animation-type="lottie"]'));
    const lottieObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        lottieObserver.unobserve(el);
        loadLottie().then((lottie) => {
          if (el.querySelector('svg')) return;
          lottie.loadAnimation({
            container: el,
            renderer: 'svg',
            loop: el.dataset.loop === '1',
            autoplay: !reduceMotion && el.dataset.autoplay === '1',
            path: '/' + (el.dataset.src || '').replace(/^\//, ''),
          });
        }).catch(() => {});
      });
    }, { rootMargin: '200px 0px' });
    lotties.forEach((el) => lottieObserver.observe(el));
    observers.push(lottieObserver);

    // Scroll reveals: only hide elements that start below the viewport, so nothing
    // already on screen blinks. Opacity/transform only, so no layout shift.
    if (!reduceMotion) {
      const targets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS.join(',')))
        .filter((el) => el.getBoundingClientRect().top > window.innerHeight);
      targets.forEach((el) => el.classList.add('reveal-pending'));
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          revealObserver.unobserve(el);
          const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
          el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 5) * 80}ms`;
          el.classList.add('reveal-in');
        });
      }, { rootMargin: '0px 0px -10% 0px' });
      targets.forEach((el) => revealObserver.observe(el));
      observers.push(revealObserver);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);
  return null;
}
