'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/industries', label: 'Industries' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/blog', label: 'Guides' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 lg:py-5">
        {/* Mobile: logo centered, hamburger right */}
        <div className="flex lg:hidden items-center">
          <div className="flex-1 min-w-0" />
          <Link href="/" className="flex-shrink-0 nav-logo-link" onClick={() => setMenuOpen(false)}>
            <Image src="/images/peregrine-logo-new.png" alt="Peregrine IT" width={205} height={36} loading="eager" className="h-9 w-auto" />
          </Link>
          <div className="flex-1 flex justify-end min-w-0">
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-700 hover:text-cyan-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop: logo left, nav center, CTA right */}
        <div className="hidden lg:flex items-center justify-between">
          <Link href="/" className="flex-shrink-0 nav-logo-link" onClick={() => setMenuOpen(false)}>
            <Image src="/images/peregrine-logo-new.png" alt="Peregrine IT" width={228} height={40} loading="eager" className="h-10 w-auto" />
          </Link>
          {/* Six links: the desktop bar starts at lg, and links never wrap. */}
          <div className="flex items-center gap-5 xl:gap-8">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                className="transition-colors cursor-pointer font-medium text-sm uppercase tracking-wider whitespace-nowrap !text-slate-800 hover:!text-cyan-600 !no-underline">
                {label}
              </Link>
            ))}
          </div>
          <a href="#" id="lets-talk-btn"
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all whitespace-nowrap cursor-pointer font-medium text-sm shadow-lg shadow-cyan-500/30 !no-underline">
            Book a Strategy Call
          </a>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 lg:hidden transition-opacity ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[280px] bg-white shadow-xl lg:hidden transform transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="flex flex-col h-full pt-16 px-6 pb-8">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            // Inline size: peregrine.css stretches buttons to full width; 44x44 is the tap-target minimum.
            style={{ width: 44, height: 44, padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            className="absolute top-3 right-3 text-slate-600 hover:text-slate-900 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <nav className="flex flex-col gap-6">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                className="mobile-nav-link font-medium text-slate-800 hover:text-cyan-600 py-1 !no-underline"
                onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <a href="#" data-open-contact onClick={() => setMenuOpen(false)}
              className="mt-4 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-center font-medium !no-underline">
              Book a Strategy Call
            </a>
          </nav>
        </div>
      </div>
    </nav>
  );
}
