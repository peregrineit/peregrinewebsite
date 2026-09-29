import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { ORGANIZATION_REF, SITE_URL, breadcrumbList } from '../../components/JsonLd';
import { getService } from '@/data/services';
import { getCaseStudy } from '@/data/case-studies';
import { guides } from '@/data/guides';
import '../../css/content-pages.css';

const url = `${SITE_URL}/industries/real-estate`;
const title = 'Real Estate & Proptech Software Development';
const description =
  'Software for brokerages and proptech companies: MLS/IDX integration, real estate SaaS, AI search, lead qualification and investor portals, with case studies.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website', siteName: 'Peregrine IT Solutions', locale: 'en_US', images: [{ url: '/ogimage.png', width: 1200, height: 630, alt: title }] },
};

const serviceSlugs = ['mls-idx-integration', 'saas-development', 'ai-automation', 'api-integration', 'cloud-devops'];
const caseStudySlugs = [
  'w3re-ai-real-estate-platform',
  'scaling-real-estate-saas-platform',
  'proptech-investor-portal',
  'self-storage-management-platform',
];

export default function RealEstateIndustryPage() {
  const services = serviceSlugs.map(getService);
  const studies = caseStudySlugs.map(getCaseStudy);
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
        hasPart: [
          ...services.map((s) => ({ '@id': `${SITE_URL}/services/${s.slug}#service` })),
          ...studies.map((c) => ({ '@id': `${SITE_URL}/case-studies/${c.slug}#article` })),
        ],
      },
      breadcrumbList(url, [
        { name: 'Home', path: '' },
        { name: 'Industries', path: '/industries' },
        { name: 'Real Estate', path: '/industries/real-estate' },
      ]),
    ],
  };
  return (
    <main className="cp-page">
      <JsonLd data={schema} />
      <section className="cp-hero">
        <div className="cp-container">
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/industries">Industries</Link><span aria-hidden="true">›</span><span>Real Estate</span>
          </nav>
          <div className="cp-badge"><i className="ri-building-line" aria-hidden="true" />Real estate &amp; proptech</div>
          <h1>Software Development for Real Estate and Proptech</h1>
          <p className="cp-lead">
            We build software for brokerages, agent-website platforms and proptech companies: MLS data pipelines, IDX
            search, CRMs and lead handling, AI search and valuation, and investor and property management portals.
          </p>
          <p className="cp-lead-muted">
            Real estate software has problems general software firms tend to underestimate: every MLS board has its own
            fields and license rules, listing status has to be current, and agents expect search to be instant. The case
            studies below show how we handled those problems, and the service pages explain how we would approach yours.
            We also build and operate our own real estate product,{' '}
            <a href="https://realfoyer.com/" target="_blank" rel="noopener">RealFoyer</a>.
          </p>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Case studies</span>
          <h2>Real Estate Case Studies</h2>
          <div className="cp-grid">
            {studies.map((c) => (
              <Link key={c.slug} href={`/case-studies/${c.slug}`} className="cp-card">
                <span className="cp-card-meta">{c.industry}</span>
                <h3>{c.title}</h3>
                <p>{c.card.summary}</p>
                <span className="cp-card-more">
                  Read the case study · Service: {getService(c.service).name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Services</span>
          <h2>Services for Real Estate Companies</h2>
          <div className="cp-grid">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="cp-card">
                <span className="cp-card-icon"><i className={s.icon} aria-hidden="true" /></span>
                <h3>{s.name}</h3>
                <p>{s.offer}</p>
                <p style={{ fontSize: 14 }}>
                  Related work: {s.caseStudies.filter((c) => caseStudySlugs.includes(c.slug)).map((c) => getCaseStudy(c.slug).title).join(' · ') || 'see the service page'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Guides</span>
          <h2>Guides for Real Estate Software Buyers</h2>
          <div className="cp-grid">
            {guides.map((g) => (
              <Link key={g.slug} href={`/blog/${g.slug}`} className="cp-card">
                <h3>{g.title}</h3>
                <p>{g.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <div className="cp-cta">
            <h2>Planning a Real Estate Platform or Integration?</h2>
            <p>Talk directly with the engineers who would build it.</p>
            <div className="cp-buttons">
              <Link href="/contact" className="cp-btn">Contact Us <i className="ri-arrow-right-line" aria-hidden="true" /></Link>
              <Link href="/services/mls-idx-integration" className="cp-btn cp-btn-secondary">MLS &amp; IDX Integration</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
