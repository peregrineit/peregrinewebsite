import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { ORGANIZATION_REF, SITE_URL, breadcrumbList } from '../components/JsonLd';
import TeamGrid from '../components/TeamGrid';
import { coreServices as services } from '@/data/services';
import { caseStudies } from '@/data/case-studies';
import { team } from '@/data/team';
import { officeAddressLine } from '@/data/company';
import '../css/content-pages.css';

const url = `${SITE_URL}/about`;
const title = 'About Peregrine IT Solutions';
const pageTitle = 'About Peregrine IT Solutions, a Software Engineering Firm';
const description =
  'Peregrine IT Solutions is a software engineering firm building SaaS platforms, integrations, AI automation and cloud infrastructure for B2B companies.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description,
  alternates: { canonical: url },
  openGraph: {
    title: pageTitle,
    description,
    url,
    type: 'website',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: '/ogimage.png', width: 1200, height: 630, alt: 'Peregrine IT Solutions' }],
  },
};

// Clients whose testimonials appear on the homepage, with their own websites.
const NAMED_CLIENTS: [string, string][] = [
  ['Easy Agent PRO', 'https://www.easyagentpro.com'],
  ['BrokerLinx', 'https://www.brokerlinx.com'],
  ['Kypiq', 'https://www.kypiq.com'],
  ['Search Realty', 'https://www.searchrealty.ca'],
  ['Bahia International Realty', 'https://www.bahiainternationalrealty.com'],
  ['Torrins', 'https://www.torrins.com'],
  ['MM Nova Tech', 'https://www.mmnovatech.com'],
];

export default function AboutPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
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
        { name: 'About', path: '/about' },
      ]),
    ],
  };

  return (
    <main className="cp-page">
      <JsonLd data={schema} />

      <section className="cp-hero">
        <div className="cp-container">
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">›</span><span>About</span>
          </nav>
          <div className="cp-badge"><i className="ri-team-line" aria-hidden="true" />About us</div>
          <h1>About Peregrine IT Solutions</h1>
          <p className="cp-lead">
            Peregrine IT Solutions (Peregrine IT Solutions LLP) is a software engineering firm. We design, build and
            scale the systems behind software products: SaaS platforms, the integrations that connect them, AI
            automation, and the cloud infrastructure they run on.
          </p>
          <p className="cp-lead-muted">
            Most of our clients are B2B companies in the United States and Canada. Real estate and proptech make up a
            large share of the work, alongside SaaS companies in other industries.
          </p>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container cp-narrow">
          <span className="cp-label">Company facts</span>
          <h2>Who Is Peregrine IT Solutions?</h2>
          {/* Entity facts. Founding year (2018) and team size (25+) confirmed by the owner
              (2026-09-30); they also appear as Organization.foundingDate / numberOfEmployees. */}
          <p className="cp-answer">
            Peregrine IT Solutions (legal name Peregrine IT Solutions LLP) is a software engineering firm founded in
            2018, with a team of 25+, led by {team[0].name}, {team[0].role}. Its office is at {officeAddressLine}. Most clients are B2B companies
            in the United States and Canada, with real estate and proptech a large share of the work alongside SaaS,
            logistics, healthcare, HR, insurance, legal, education, e-commerce and manufacturing. Clients named on this
            site include <Link href="/case-studies/w3re-ai-real-estate-platform">W3|re</Link>,{' '}
            {NAMED_CLIENTS.map(([name, href], i) => (
              <span key={name}>
                {i === NAMED_CLIENTS.length - 1 ? 'and ' : ''}
                <a href={href} target="_blank" rel="noopener noreferrer">{name}</a>
                {i < NAMED_CLIENTS.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">What we build</span>
          <h2>What We Build</h2>
          <div className="cp-grid">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="cp-card">
                <span className="cp-card-icon"><i className={s.icon} aria-hidden="true" /></span>
                <h3>{s.name}</h3>
                <p>{s.offer}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container cp-narrow">
          <span className="cp-label">How we work</span>
          <h2>How We Work</h2>
          <p>
            Every engagement starts with a technical conversation with an engineer rather than a sales team.
          </p>
          <p>
            Larger projects begin with a discovery sprint: we map the requirements, design the architecture and deliver
            a written technical plan before development starts. Development runs in two-week sprints with weekly demos,
            so working software is visible early and priorities can change at each checkpoint.
          </p>
          <p>
            Based in Noida, India, working in overlap with US and Canadian hours.
          </p>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container cp-narrow">
          <span className="cp-label">Our work</span>
          <h2>Published Case Studies</h2>
          <p>
            We publish {caseStudies.length} case studies, each covering the problem, the architecture and the results.
            They span real estate and proptech, logistics and supply chain, healthcare, HR and payroll, insurance,
            legal, education, e-commerce and marketplaces, hospitality, events and manufacturing.
          </p>
          <p><Link href="/case-studies" className="cp-standalone-link">Read the case studies</Link></p>
          <p>
            We also build and operate our own real estate product,{' '}
            <a href="https://realfoyer.com/" target="_blank" rel="noopener">RealFoyer</a>, which combines IDX websites, a
            CRM and marketing tools for agents and brokerages.
          </p>
        </div>
      </section>

      {/* TODO(owner): certifications are only shown once the owner confirms who holds which. */}
      {team.length > 0 && (
        <section className="cp-section">
          <div className="cp-container">
            <span className="cp-label">Leadership</span>
            <h2>{team.length === 1 ? 'Founder' : 'The Team'}</h2>
            <TeamGrid members={team} />
          </div>
        </section>
      )}

      <section className="cp-section">
        <div className="cp-container">
          <div className="cp-cta">
            <h2>Start With a Conversation</h2>
            <p>Tell us about the system you are building or the problem you need solved.</p>
            <div className="cp-buttons">
              <Link href="/contact" className="cp-btn">Contact Us <i className="ri-arrow-right-line" aria-hidden="true" /></Link>
              <Link href="/services" className="cp-btn cp-btn-secondary">Our Services</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
