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
          <ul className="cp-checks" style={{ maxWidth: 760, marginTop: 20 }}>
            <li>
              <strong>Planning a build, a rebuild or a larger integration:</strong>{' '}
              <a href="#project-form">use the project form</a>. It asks for the project type and timeline.
            </li>
            <li>
              <strong>One integration, fix or automation you can describe in a few lines:</strong>{' '}
              <a href="#quick-form">use the quick project form</a> for a scoped estimate.
            </li>
            <li>
              <strong>Ready to talk it through:</strong>{' '}
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer">pick a time for the 30-minute discovery call</a>.
            </li>
          </ul>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <div className="cp-grid-2">
            <div className="cp-form-panel" id="project-form">
              <h2>Tell Us About Your Project</h2>
              <StrategyCallForm />
            </div>
            <div className="cp-form-panel" id="quick-form">
              <h2>Request a Quick Project Quote</h2>
              <p className="cp-muted" style={{ fontSize: 15 }}>For a single integration, fix or automation.</p>
              <QuickProjectForm />
            </div>
          </div>
        </div>
      </section>

      <section className="cp-section" id="next-steps">
        <div className="cp-container">
          <span className="cp-label">Next steps</span>
          <h2>What Happens After You Send It</h2>
          {/* Owner-confirmed facts only: reply within 1 business day; 30-minute technical
              discovery call with an engineer; engagement model agreed after the call; larger
              builds start with a discovery sprint and run in two-week sprints with weekly demos. */}
          <div className="cp-steps">
            <div className="cp-card cp-step">
              <h3>We reply within 1 business day</h3>
              <p>By email, to the address you gave, so use one you read. Booking a call on Calendly skips this step.</p>
            </div>
            <div className="cp-card cp-step">
              <h3>A 30-minute technical discovery call</h3>
              <p>With an engineer, not a salesperson. The call covers the system you have, the outcome you need and whether we are the right team for it.</p>
            </div>
            <div className="cp-card cp-step">
              <h3>Scope and engagement model</h3>
              <p>A fixed-scope project, a monthly retainer or a combination is agreed after the call. Larger builds start with a discovery sprint, then run in two-week sprints with weekly demos.</p>
            </div>
          </div>

          <h3 style={{ marginTop: 32 }}>What to include in your message</h3>
          <ul className="cp-checks" style={{ maxWidth: 820 }}>
            <li>What you are building or fixing, and who uses it.</li>
            <li>What exists today: the stack, where it is hosted, and what is failing or missing.</li>
            <li>The other systems involved, such as MLS boards, a CRM, an ERP, payment or e-signature providers.</li>
            <li>What sets your timeline: a launch, a contract, a renewal or a season.</li>
            <li>Rough size: customers, users, records or locations, whichever fits.</li>
          </ul>
          <p className="cp-muted" style={{ maxWidth: 820, fontSize: 15 }}>
            Two or three sentences are enough to start. Each <Link href="/services">service page</Link> has a longer
            checklist of what to bring to the scoping call. Pricing is scoped per project; no price list is published.
          </p>
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
              <p><a href="mailto:info@peregrine-it.com" className="cp-standalone-link">info@peregrine-it.com</a></p>
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
                <a href={officeMapsUrl} target="_blank" rel="noopener noreferrer" className="cp-standalone-link">View on Google Maps</a>
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
                <a href="https://www.linkedin.com/company/peregrine-it-solutions/" target="_blank" rel="noopener noreferrer" className="cp-standalone-link">LinkedIn</a>
                {' · '}
                <a href="https://www.facebook.com/peregrineitsolution" target="_blank" rel="noopener noreferrer" className="cp-standalone-link">Facebook</a>
                {' · '}
                <a href="https://www.instagram.com/peregrineitsolution/" target="_blank" rel="noopener noreferrer" className="cp-standalone-link">Instagram</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
