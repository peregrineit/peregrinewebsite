import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { ORGANIZATION_REF, SITE_URL, breadcrumbList } from '../components/JsonLd';
import { QuickProjectForm, StrategyCallForm } from '../components/LeadForms';
import { officeAddressLine, officeMapsUrl } from '@/data/company';
import '../css/content-pages.css';

const url = `${SITE_URL}/contact`;
const title = 'Contact Peregrine IT Solutions';
const description =
  'Contact Peregrine IT Solutions about a SaaS, integration, MLS/IDX, AI or cloud project. Book a technical discovery call or send a quick project request.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: 'website',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: '/ogimage.png', width: 1200, height: 630, alt: 'Contact Peregrine IT Solutions' }],
  },
};

const CALENDLY = 'https://calendly.com/mukesh-peregrine-it/30min';

export default function ContactPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: ORGANIZATION_REF,
        mainEntity: ORGANIZATION_REF,
      },
      breadcrumbList(url, [
        { name: 'Home', path: '' },
        { name: 'Contact', path: '/contact' },
      ]),
    ],
  };

  return (
    <main className="cp-page">
      <JsonLd data={schema} />

      <section className="cp-hero">
        <div className="cp-container">
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">›</span><span>Contact</span>
          </nav>
          <div className="cp-badge"><i className="ri-mail-send-line" aria-hidden="true" />Contact</div>
          <h1>Contact Peregrine IT Solutions</h1>
          <p className="cp-lead">
            Tell us what you are building or fixing. Real engineers reply, not sales, and technical questions are
            answered by engineers.
          </p>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <div className="cp-grid-2">
            <div className="cp-form-panel">
              <h2>Tell Us About Your Project</h2>
              <StrategyCallForm />
            </div>
            <div className="cp-form-panel">
              <h2>Request a Quick Project Quote</h2>
              <p className="cp-muted" style={{ fontSize: 15 }}>For a single integration, fix or automation.</p>
              <QuickProjectForm />
            </div>
          </div>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Other ways to reach us</span>
          <h2>Contact Details</h2>
          <div className="cp-grid">
            <div className="cp-card">
              <span className="cp-card-icon"><i className="ri-mail-line" aria-hidden="true" /></span>
              <h3>Email</h3>
              <p><a href="mailto:info@peregrine-it.com">info@peregrine-it.com</a></p>
            </div>
            <div className="cp-card">
              <span className="cp-card-icon"><i className="ri-calendar-line" aria-hidden="true" /></span>
              <h3>Book a strategy call</h3>
              <p>A 30-minute technical discovery call. <a href={CALENDLY} target="_blank" rel="noopener noreferrer">Pick a time</a></p>
            </div>
            <div className="cp-card">
              <span className="cp-card-icon"><i className="ri-map-pin-line" aria-hidden="true" /></span>
              <h3>Office</h3>
              <div style={{ color: 'var(--cp-muted)', fontSize: 15 }}>
                <address style={{ fontStyle: 'normal', marginBottom: 6 }}>{officeAddressLine}</address>
                <a href={officeMapsUrl} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
              </div>
            </div>
            <div className="cp-card">
              <span className="cp-card-icon"><i className="ri-time-line" aria-hidden="true" /></span>
              <h3>Working hours</h3>
              <p>Daily overlap with North American and European business hours.</p>
            </div>
            <div className="cp-card">
              <span className="cp-card-icon"><i className="ri-linkedin-box-line" aria-hidden="true" /></span>
              <h3>Social</h3>
              <p>
                <a href="https://www.linkedin.com/company/peregrine-it-solutions/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                {' · '}
                <a href="https://www.facebook.com/peregrineitsolution" target="_blank" rel="noopener noreferrer">Facebook</a>
                {' · '}
                <a href="https://www.instagram.com/peregrineitsolution/" target="_blank" rel="noopener noreferrer">Instagram</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
