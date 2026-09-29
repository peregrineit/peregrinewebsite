'use client';
import { useEffect } from 'react';

// Homepage animations that used to need jQuery, GSAP, anime.js, Typed.js, Waypoints
// and CounterUp (/js/animation.js): the hero scramble line, the typing terminal, the
// stat counters and the service cards' random-character hover. Plain DOM + CSS, and
// nothing starts until the page is idle after `load`, as before.

const SCRAMBLE_PHRASES = ['PoC and MVP Development', 'Product Design', 'Full-Stack Development', 'AI Services'];
const SCRAMBLE_CHARS = '!<>-_\\/[]{ }—=+*^?#________';
const TYPED_STRINGS = ['git push', 'git pull'];
const RANDOM_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const randomString = (length: number) => {
  let s = '';
  for (let i = 0; i < length; i++) s += RANDOM_CHARS.charAt(Math.floor(Math.random() * RANDOM_CHARS.length));
  return s;
};
const pick = (chars: string) => chars[Math.floor(Math.random() * chars.length)];
// Resolves once the element is on screen (checked again before each cycle), so
// loops don't spend main-thread time while nobody can see them.
const visible = new WeakMap<Element, boolean>();
function watchVisibility(el: Element, observers: IntersectionObserver[]) {
  visible.set(el, false);
  const io = new IntersectionObserver((entries) => entries.forEach((e) => visible.set(e.target, e.isIntersecting)));
  io.observe(el);
  observers.push(io);
}
async function whileHidden(el: Element, signal: { stopped: boolean }) {
  while (!signal.stopped && visible.get(el) === false) await new Promise((r) => setTimeout(r, 250));
}
const sleep = (ms: number, signal: { stopped: boolean }) =>
  new Promise<void>((resolve) => setTimeout(resolve, signal.stopped ? 0 : ms));

// Hero scramble: each character flips through random symbols between a random
// start and end frame, then settles on the next phrase (same timing as the old
// TextScramble class).
function scramble(el: HTMLElement, signal: { stopped: boolean }) {
  let index = 0;
  const setText = (to: string) => new Promise<void>((resolve) => {
    const from = el.textContent || '';
    const length = Math.max(from.length, to.length);
    const queue = Array.from({ length }, (_, i) => {
      const start = Math.floor(Math.random() * 40);
      return { from: from[i] || '', to: to[i] || '', start, end: start + Math.floor(Math.random() * 40), char: '' };
    });
    let frame = 0;
    const update = () => {
      if (signal.stopped) return resolve();
      let out = '';
      let complete = 0;
      for (const q of queue) {
        if (frame >= q.end) { complete++; out += q.to; }
        else if (frame >= q.start) {
          if (!q.char || Math.random() < 0.28) q.char = pick(SCRAMBLE_CHARS);
          out += q.char;
        } else out += q.from;
      }
      el.textContent = out;
      if (complete === queue.length) resolve();
      else { frame++; requestAnimationFrame(update); }
    };
    update();
  });
  const run = async () => {
    while (!signal.stopped) {
      await whileHidden(el, signal);
      await setText(SCRAMBLE_PHRASES[index]);
      index = (index + 1) % SCRAMBLE_PHRASES.length;
      await sleep(800, signal);
    }
  };
  run();
}

// Typing terminal: types each string, pauses, backspaces to the shared prefix
// (Typed.js "smart backspace") and loops.
function typeLoop(el: HTMLElement, signal: { stopped: boolean }) {
  const speed = () => 50 + Math.round(Math.random() * 25);
  const run = async () => {
    let current = '';
    let i = 0;
    while (!signal.stopped) {
      await whileHidden(el, signal);
      const target = TYPED_STRINGS[i];
      while (current !== target && !signal.stopped) {
        current = target.slice(0, current.length + 1);
        el.textContent = current;
        await sleep(speed(), signal);
      }
      await sleep(700, signal);
      const next = TYPED_STRINGS[(i + 1) % TYPED_STRINGS.length];
      let keep = 0;
      while (keep < current.length && current[keep] === next[keep]) keep++;
      while (current.length > keep && !signal.stopped) {
        current = current.slice(0, -1);
        el.textContent = current;
        await sleep(speed(), signal);
      }
      i = (i + 1) % TYPED_STRINGS.length;
    }
  };
  run();
}

// Stat counters: count up from 0 in 20 steps over 2 s when scrolled into view
// (the old CounterUp settings: delay 100, time 2000).
function counters(els: HTMLElement[], observers: IntersectionObserver[]) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target as HTMLElement;
      io.unobserve(el);
      const final = el.textContent || '';
      const num = parseFloat(final);
      if (Number.isNaN(num)) return;
      const decimals = (final.split('.')[1] || '').length;
      const steps = 20;
      let step = 0;
      const tick = () => {
        step++;
        const value = (num * step) / steps;
        el.textContent = step >= steps ? final : decimals ? value.toFixed(decimals) : String(Math.floor(value));
        if (step < steps) setTimeout(tick, 100);
      };
      el.textContent = decimals ? (0).toFixed(decimals) : '0';
      setTimeout(tick, 100);
    });
  });
  els.forEach((el) => io.observe(el));
  observers.push(io);
}

// Service cards: a spotlight of random characters follows the pointer on hover.
// On touch screens it is shown, centred, all the time.
function gridItems(cells: HTMLElement[], cleanups: (() => void)[]) {
  const touch = window.matchMedia('(hover: none)').matches || window.matchMedia('(max-width: 768px)').matches;
  const mouse = { x: 0, y: 0 };
  const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
  window.addEventListener('mousemove', onMove, { passive: true });
  cleanups.push(() => window.removeEventListener('mousemove', onMove));

  cells.forEach((cell) => {
    const deco = cell.querySelector<HTMLElement>('.grid__item-img-deco');
    if (!deco) return;
    if (touch) {
      const rect = cell.getBoundingClientRect();
      deco.setAttribute('data-text', randomString(2000));
      deco.classList.add('grid__item-img-deco--mobile-visible');
      cell.style.setProperty('--x', `${rect.width > 0 ? rect.width / 2 : 150}px`);
      cell.style.setProperty('--y', `${rect.height > 0 ? rect.height / 2 : 150}px`);
      deco.style.opacity = '1';
      return;
    }
    deco.classList.add('grid__item-img-deco--fade');
    let text = randomString(2000);
    let frame = 0;
    let pos: { x: number; y: number } | null = null;
    const render = () => {
      const rect = cell.getBoundingClientRect();
      const target = { x: mouse.x - rect.left, y: mouse.y - rect.top };
      pos = pos ? { x: pos.x + (target.x - pos.x) * 0.1, y: pos.y + (target.y - pos.y) * 0.1 } : target;
      cell.style.setProperty('--x', `${pos.x}px`);
      cell.style.setProperty('--y', `${pos.y}px`);
      if (deco.getAttribute('data-text') !== text) deco.setAttribute('data-text', text);
      frame = requestAnimationFrame(render);
    };
    const enter = () => {
      pos = null;
      deco.style.opacity = '1';
      if (!frame) frame = requestAnimationFrame(render);
    };
    const move = () => { text = randomString(2000); };
    const leave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      deco.style.opacity = '0';
    };
    cell.addEventListener('mouseenter', enter);
    cell.addEventListener('mousemove', move);
    cell.addEventListener('mouseleave', leave);
    cleanups.push(() => {
      cancelAnimationFrame(frame);
      cell.removeEventListener('mouseenter', enter);
      cell.removeEventListener('mousemove', move);
      cell.removeEventListener('mouseleave', leave);
    });
  });
}

export default function HomeAnimations() {
  useEffect(() => {
    const signal = { stopped: false };
    const observers: IntersectionObserver[] = [];
    const cleanups: (() => void)[] = [];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const start = () => {
      if (signal.stopped) return;
      gridItems(Array.from(document.querySelectorAll<HTMLElement>('.grid__item > .grid__item-img')), cleanups);
      counters(Array.from(document.querySelectorAll<HTMLElement>('.counterup')), observers);
      const typing = document.getElementById('typetxt-1');
      if (typing) { watchVisibility(typing, observers); typeLoop(typing, signal); }
      // Reduced motion: keep the server-rendered hero line instead of cycling phrases.
      const line = document.querySelector<HTMLElement>('.scramble-text');
      if (line && !reduceMotion) { watchVisibility(line, observers); scramble(line, signal); }
    };
    const whenIdle = () =>
      'requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 2000 }) : setTimeout(start, 1);
    if (document.readyState === 'complete') whenIdle();
    else window.addEventListener('load', whenIdle, { once: true });

    return () => {
      signal.stopped = true;
      window.removeEventListener('load', whenIdle);
      observers.forEach((o) => o.disconnect());
      cleanups.forEach((fn) => fn());
    };
  }, []);
  return null;
}
