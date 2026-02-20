'use client';

import Link from 'next/link';

export default function MobileFloatingButtons() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex gap-3 px-4 pb-3 pt-2"
      style={{
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 10px))',
        backgroundColor: 'rgba(255,255,255,0.95)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
      }}
    >
      <a
        href="#"
        data-open-contact
        className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm text-center shadow-lg shadow-cyan-500/25 !no-underline active:scale-[0.98] transition-transform"
      >
        Book Strategy Call
      </a>
      <Link
        href="/case-studies"
        className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm text-center !no-underline active:scale-[0.98] transition-transform shadow-lg flex items-center justify-center"
        style={{ backgroundColor: '#1e293b', color: '#fff', border: '2px solid #1e293b' }}
      >
        Case Studies
      </Link>
    </div>
  );
}
