'use client';
import { useCallback, useEffect, useRef } from 'react';

// Cloudflare Turnstile for the lead forms. Active only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is
// set at build time; without it nothing loads and the forms behave as before.
//
// Loaded lazily: the script is fetched the first time someone focuses a field in a form, not on
// page load. The widget uses `appearance: 'interaction-only'`, so it stays invisible unless
// Cloudflare needs the visitor to interact (then a small box appears inside the form).
// Tokens are single use and valid for 300 seconds, so the widget is reset after every submit.
// https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/ (read 2026-10-20)

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let loading: Promise<TurnstileApi | null> | null = null;
function loadTurnstile(): Promise<TurnstileApi | null> {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!loading) {
    loading = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve(window.turnstile || null);
      script.onerror = () => {
        loading = null;
        resolve(null);
      };
      document.head.appendChild(script);
    });
  }
  return loading;
}

/** Turnstile (when enabled) and form timing for one lead form. Everything returned is a
 *  stable callback, so nothing reads a ref during render. */
export function useLeadGuard(action: string) {
  const container = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);
  const token = useRef<string | null>(null);
  const waiters = useRef<((t: string | null) => void)[]>([]);
  const shownAt = useRef(0);

  useEffect(() => {
    shownAt.current = Date.now();
    return () => {
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
    };
  }, []);

  const settle = useCallback((t: string | null) => {
    token.current = t;
    if (t) {
      waiters.current.forEach((w) => w(t));
      waiters.current = [];
    }
  }, []);

  /** Callback ref for the (invisible unless needed) widget container. */
  const setContainer = useCallback((el: HTMLDivElement | null) => {
    container.current = el;
  }, []);

  const start = useCallback(async () => {
    if (!TURNSTILE_SITE_KEY || widgetId.current || !container.current) return;
    const api = await loadTurnstile();
    if (!api || widgetId.current || !container.current) return;
    widgetId.current = api.render(container.current, {
      sitekey: TURNSTILE_SITE_KEY,
      action,
      appearance: 'interaction-only',
      callback: (t: string) => settle(t),
      'expired-callback': () => settle(null),
      'error-callback': () => settle(null),
    });
  }, [action, settle]);

  /** A token for this submit, or null if none arrived within `ms`. Null at once when Turnstile is off. */
  const getToken = useCallback(async (ms = 12000): Promise<string | null> => {
    if (!TURNSTILE_SITE_KEY) return null;
    await start();
    if (token.current) return token.current;
    return new Promise((resolve) => {
      const done = (t: string | null) => {
        clearTimeout(timer);
        resolve(t);
      };
      const timer = setTimeout(() => {
        waiters.current = waiters.current.filter((w) => w !== done);
        resolve(null);
      }, ms);
      waiters.current.push(done);
    });
  }, [start]);

  /** Spend the current token: the next submit gets a fresh one. */
  const reset = useCallback(() => {
    token.current = null;
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }, []);

  /** Milliseconds since the form was shown. */
  const elapsedMs = useCallback(() => (shownAt.current ? Date.now() - shownAt.current : -1), []);

  return { setContainer, start, getToken, reset, elapsedMs };
}

export type LeadGuard = ReturnType<typeof useLeadGuard>;
export const turnstileOn = Boolean(TURNSTILE_SITE_KEY);
