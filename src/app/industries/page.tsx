import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { ORGANIZATION_REF, SITE_URL, breadcrumbList } from '../components/JsonLd';
import '../css/content-pages.css';

const url = `${SITE_URL}/industries`;
const title = 'Industries We Build Software For';
const description =
  'The industries Peregrine IT Solutions builds software for, starting with real estate and proptech: MLS/IDX integration, brokerage platforms and investor portals.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website', siteName: 'Peregrine IT Solutions', locale: 'en_US', images: [{ url: '/ogimage.png', width: 1200, height: 630, alt: title }] },
};

const industries = [
  {
    href: '/industries/real-estate',
    name: 'Real Estate & Proptech',
    icon: 'ri-building-line',
    summary:
      'MLS data pipelines and IDX search, brokerage and agent platforms, AI search and lead qualification, and investor portals, with the case studies behind each.',
  },
];

export default function IndustriesPage() {
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
        hasPart: industries.map((i) => ({ '@id': `${SITE_URL}${i.href}#webpage` })),
      },
      breadcrumbList(url, [
        { name: 'Home', path: '' },
        { name: 'Industries', path: '/industries' },
      ]),
    ],
  };
  return (
    <main className="cp-page">
      <JsonLd data={schema} />
      <section className="cp-hero">
        <div className="cp-container">
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">›</span><span>Industries</span>
          </nav>
          <div className="cp-badge"><i className="ri-briefcase-line" aria-hidden="true" />Industries</div>
          <h1>Industries We Build Software For</h1>
          <p className="cp-lead">
            Our published case studies span many industries. Real estate and proptech is where we do the most work,
            so it has its own page with the services and case studies that apply.
          </p>
          <p className="cp-lead-muted">
            For work in other industries, browse the <Link href="/case-studies">case studies</Link> by category.
          </p>
        </div>
      </section>
      <section className="cp-section">
        <div className="cp-container">
          <div className="cp-grid">
            {industries.map((i) => (
              <Link key={i.href} href={i.href} className="cp-card">
                <span className="cp-card-icon"><i className={i.icon} aria-hidden="true" /></span>
                <h2 style={{ fontSize: 22, margin: 0 }}>{i.name}</h2>
                <p>{i.summary}</p>
                <span className="cp-card-more">View industry <i className="ri-arrow-right-line" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
