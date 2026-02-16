'use client';
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/peregrine-logo-new.png" alt="Peregrine IT" className="h-10 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#sec-service"
            className="transition-colors cursor-pointer font-semibold text-sm uppercase tracking-wider !text-slate-800 hover:!text-cyan-600 !no-underline">Services</Link>
          <Link href="/#sec-process"
            className="transition-colors cursor-pointer font-semibold text-sm uppercase tracking-wider !text-slate-800 hover:!text-cyan-600 !no-underline">How We Work</Link>
          <Link href="/#sec-testimonials"
            className="transition-colors cursor-pointer font-semibold text-sm uppercase tracking-wider !text-slate-800 hover:!text-cyan-600 !no-underline">Results</Link>
          <Link href="/case-studies"
            className="transition-colors cursor-pointer font-semibold text-sm uppercase tracking-wider !text-slate-800 hover:!text-slate-900 border-2 border-transparent hover:border-b-cyan-600 !no-underline">Case Studies</Link>
        </div>
        <a href="#" id="lets-talk-btn"
          className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all whitespace-nowrap cursor-pointer font-medium text-sm shadow-lg shadow-cyan-500/30 !no-underline">Book a Strategy Call</a>
      </div>
    </nav>
  );
}
