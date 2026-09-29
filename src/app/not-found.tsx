import type { Metadata } from 'next';
import Link from 'next/link';
import './css/content-pages.css';

export const metadata: Metadata = {
  title: 'Page Not Found',
  // Next.js also injects <meta name="robots" content="noindex"> on 404s; keep ours identical.
  robots: { index: false },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main className="cp-page">
      <section className="cp-hero" style={{ minHeight: '60vh' }}>
        <div className="cp-container cp-narrow">
          <div className="cp-badge"><i className="ri-error-warning-line" aria-hidden="true" />404</div>
          <h1>Page Not Found</h1>
          <p className="cp-lead">The page you are looking for does not exist or has moved.</p>
          <div className="cp-buttons" style={{ justifyContent: 'flex-start', marginTop: 24 }}>
            <Link href="/" className="cp-btn">Go to the homepage</Link>
            <Link href="/services" className="cp-btn cp-btn-secondary">Services</Link>
            <Link href="/case-studies" className="cp-btn cp-btn-secondary">Case Studies</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
