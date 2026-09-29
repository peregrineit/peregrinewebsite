import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { ORGANIZATION_REF, SITE_URL, breadcrumbList } from '../components/JsonLd';
import { engagement, services } from '@/data/services';
import { getCaseStudy } from '@/data/case-studies';
import '../css/content-pages.css';

const url = `${SITE_URL}/services`;
const title = 'Software Development Services';
const description =
  'SaaS development, API integration, MLS/IDX integration, AI automation, cloud and DevOps, and Odoo ERP, each backed by published case studies.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title: `${title} | Peregrine IT Solutions`,
    description,
    url,
    type: 'website',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: '/ogimage.png', width: 1200, height: 630, alt: 'Peregrine IT Solutions services' }],
  },
};

export default function ServicesPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: ORGANIZATION_REF,
        hasPart: services.map((s) => ({ '@id': `${SITE_URL}/services/${s.slug}#service` })),
      },
      breadcrumbList(url, [
        { name: 'Home', path: '' },
        { name: 'Services', path: '/services' },
      ]),
    ],
  };

  return (
    <main className="cp-page">
      <JsonLd data={schema} />

      <section className="cp-hero">
        <div className="cp-container">
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">›</span><span>Services</span>
          </nav>
          <div className="cp-badge"><i className="ri-tools-line" aria-hidden="true" />Services</div>
          <h1>Software Development Services for Real Estate, Proptech and B2B Companies</h1>
          <p className="cp-lead">
            Peregrine IT Solutions designs, builds and scales custom software for companies in the US and Canada: SaaS
            platforms, the integrations that connect them, and the cloud infrastructure they run on.
          </p>
          <p className="cp-lead-muted">
            Each service below links to case studies that show how we did the work, so you can judge the approach
            before you talk to us.
          </p>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <div className="cp-grid-2">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="cp-card">
                <span className="cp-card-icon"><i className={s.icon} aria-hidden="true" /></span>
                <h2 style={{ fontSize: 22, margin: 0 }}>{s.name}</h2>
                <p>{s.offer}</p>
                {s.caseStudies.length > 0 && (
                  <p style={{ fontSize: 14 }}>
                    Case studies: {s.caseStudies.map((c) => getCaseStudy(c.slug).title).join(' · ')}
                  </p>
                )}
                <span className="cp-card-more">View service <i className="ri-arrow-right-line" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container cp-narrow">
          <span className="cp-label">Engagement</span>
          <h2>{engagement.heading}</h2>
          {engagement.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          <p className="cp-muted">{engagement.pricingNote}</p>
          <div className="cp-buttons" style={{ justifyContent: 'flex-start', marginTop: 24 }}>
            <Link href="/contact" className="cp-btn">Contact Us <i className="ri-arrow-right-line" aria-hidden="true" /></Link>
            <Link href="/case-studies" className="cp-btn cp-btn-secondary">Case Studies</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
