'use client';
import { useCallback, useEffect, useRef } from 'react';

// Cloudflare Turnstile widget for the lead forms; /api/lead verifies the token server-side
// (lib/turnstile.ts) and refuses every lead without a valid one.
//
// The script loads the first time someone focuses a field in a form, not on page load, so
// pages that are only read never fetch it. The widget mode (Managed) is set in Cloudflare;
// `appearance: 'interaction-only'` keeps it out of the way unless Cloudflare needs the
// visitor to interact, in which case its own accessible checkbox appears inside the form.
// Tokens are single use and valid for 300 seconds, so the widget is reset after every
// request and a new token is waited for on the next submit.
// https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/

/** Inlined at build time. Without it the forms cannot get a token and every lead is refused. */
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

/** The Turnstile widget of one lead form. Everything returned is a stable callback. */
export function useTurnstile(action: string) {
  const container = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);
  const token = useRef<string | null>(null);
  const waiters = useRef<((t: string | null) => void)[]>([]);

  useEffect(() => () => {
    if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
  }, []);

  const settle = useCallback((t: string | null) => {
    token.current = t;
    if (t) {
      waiters.current.forEach((w) => w(t));
      waiters.current = [];
    }
  }, []);

  /** Callback ref for the widget container inside the form. */
  const setContainer = useCallback((el: HTMLDivElement | null) => {
    container.current = el;
  }, []);

  /** Loads the script and renders the widget once; called on the form's first focus. */
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

  /** A token for this submit, or null if none arrived within `ms` (or there is no site key). */
  const getToken = useCallback(async (ms = 15000): Promise<string | null> => {
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

  /** Spends the current token: the next submit waits for a fresh one. */
  const reset = useCallback(() => {
    token.current = null;
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }, []);

  return { setContainer, start, getToken, reset };
}

export type TurnstileGuard = Pick<ReturnType<typeof useTurnstile>, 'getToken' | 'reset'>;
