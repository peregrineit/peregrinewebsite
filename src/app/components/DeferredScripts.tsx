'use client';
import { useEffect } from 'react';

// Legacy homepage animation scripts (hero letters, typing terminal, counters, grid
// hover). Rendered only by the homepage. Nothing above the fold needs them to render,
// so they load once the page is idle after `load`, in dependency order (jQuery
// before its plugins). The Webflow runtime (/js/peregrine.js) is no longer loaded;
// HomeEffects covers the Lottie animations and scroll reveals it used to provide.
const SCRIPT_GROUPS: string[][] = [
  ['/js/jquery-3.5.1.min.js'],
  [
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.9/typed.js',
    'https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.0/jquery.waypoints.min.js',
  ],
  ['https://cdn.jsdelivr.net/npm/jquery.counterup@2.1.0/jquery.counterup.min.js'],
  ['/js/animation.js'],
];

function loadScript(src: string) {
  return new Promise<void>((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.body.appendChild(s);
  });
}

export default function DeferredScripts() {
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      for (const group of SCRIPT_GROUPS) {
        if (cancelled) return;
        await Promise.all(group.map(loadScript));
      }
    };
    const whenIdle = () =>
      'requestIdleCallback' in window ? window.requestIdleCallback(() => run(), { timeout: 2000 }) : setTimeout(run, 1);
    if (document.readyState === 'complete') whenIdle();
    else window.addEventListener('load', whenIdle, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', whenIdle);
    };
  }, []);
  return null;
}
