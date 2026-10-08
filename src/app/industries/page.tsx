import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { ORGANIZATION_REF, SITE_URL, breadcrumbList } from '../components/JsonLd';
import { industries, singleCaseStudyVerticals } from '@/data/industries';
import { caseStudies, getCaseStudy } from '@/data/case-studies';
import '../css/content-pages.css';

const url = `${SITE_URL}/industries`;
const title = 'Industries We Build Software For';
const description =
  'Industries we build software for: real estate and proptech, self-storage, logistics, healthcare, HR and recruitment, and e-commerce, each with case studies.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website', siteName: 'Peregrine IT Solutions', locale: 'en_US', images: [{ url: '/ogimage.png', width: 1200, height: 630, alt: title }] },
};

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
        hasPart: industries.map((i) => ({ '@id': `${SITE_URL}/industries/${i.slug}#webpage` })),
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
            Our {caseStudies.length} published case studies span the industries below. Real estate and proptech is
            where we do the most work; each industry page gathers the case studies, services and guides that apply to it.
          </p>
          <p className="cp-lead-muted">
            An industry has its own page only where we have published work to show. Every figure on these pages comes
            from the linked case study.
          </p>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Industries</span>
          <h2>Industries With Published Case Studies</h2>
          <div className="cp-grid-2">
            {industries.map((i) => (
              <div key={i.slug} className="cp-card">
                <span className="cp-card-icon"><i className={i.icon} aria-hidden="true" /></span>
                <h3><Link href={`/industries/${i.slug}`}>{i.name}</Link></h3>
                <p>{i.summary}</p>
                <ul className="cp-card-list">
                  {i.caseStudies.map((slug) => (
                    <li key={slug}><Link href={`/case-studies/${slug}`}>{getCaseStudy(slug).title}</Link></li>
                  ))}
                </ul>
                <p style={{ marginTop: 12 }}>
                  <Link href={`/industries/${i.slug}`} className="cp-standalone-link">View {i.name}</Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">More industries</span>
          <h2>Other Industries We Have Built For</h2>
          <p className="cp-muted">One published case study each, so these link straight to the case study rather than to a page of their own.</p>
          <div className="cp-grid">
            {singleCaseStudyVerticals.map(({ name, caseStudy }) => {
              const study = getCaseStudy(caseStudy);
              return (
                <Link key={caseStudy} href={`/case-studies/${caseStudy}`} className="cp-card">
                  <span className="cp-card-meta">{name}</span>
                  <h3>{study.title}</h3>
                  <p>{study.card.summary}</p>
                  <span className="cp-card-more">Read the case study <i className="ri-arrow-right-line" aria-hidden="true" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <div className="cp-cta">
            <h2>Don&apos;t See Your Industry?</h2>
            <p>The engineering problems repeat across industries: multi-tenant data, integrations, search and billing. Tell us what you are building.</p>
            <div className="cp-buttons">
              <Link href="/contact" className="cp-btn">Contact Us <i className="ri-arrow-right-line" aria-hidden="true" /></Link>
              <Link href="/case-studies" className="cp-btn cp-btn-secondary">All Case Studies</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
