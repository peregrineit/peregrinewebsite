import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { ORGANIZATION_REF, SITE_URL, breadcrumbList } from '../../components/JsonLd';
import ConsultationCta from '../../components/ConsultationCta';
import { getService } from '@/data/services';
import { getGuide } from '@/data/guides';
import '../../css/content-pages.css';

/**
 * RealFoyer product showcase: a Peregrine credibility page for engineering buyers, not a
 * RealFoyer sales page. Every product statement below restates a page on realfoyer.com
 * (fetched 2026-10-21) or a fact the owner confirmed on 2026-10-21 (tenancy model; MLS board
 * status). No customer counts, dates, metrics, pricing, demos or testimonials: none is
 * published or verified. Owner-confirm log: peregrine-it.com-audit/2026-10-21/FACT-CHECK-LOG.md.
 */

const REALFOYER = 'https://realfoyer.com/';
const AS_OF = '21 October 2026';
const url = `${SITE_URL}/products/realfoyer`;
const title = 'RealFoyer: Our Real Estate SaaS Product';
const productSummary =
  'RealFoyer is the real estate SaaS product Peregrine IT Solutions builds and runs: IDX websites, MLS feeds, a CRM and site CMS.';
const description = `${productSummary} What it does and how we built it.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: 'website',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: '/ogimage.png', width: 1200, height: 630, alt: title }],
  },
};

/** As described on realfoyer.com; each row links to the page it restates. */
const capabilities: { area: string; body: string; source: string; sourceLabel: string }[] = [
  {
    area: 'MLS feeds',
    body: 'Reads listing data over the RESO Web API (OData) as the primary route, with aggregator routes where a board uses one. Listings, media and geocoding sync on a schedule rather than streaming, and listings removed at the source are reconciled.',
    source: 'https://realfoyer.com/products/mls-idx-integration',
    sourceLabel: 'MLS & IDX integration',
  },
  {
    area: 'Search and listing pages',
    body: 'Map search with clustering and draw-an-area, filters and autosuggest; a page per listing; saved searches with instant, daily or weekly alerts. Listing pages are ungated by default.',
    source: 'https://realfoyer.com/features',
    sourceLabel: 'Features',
  },
  {
    area: 'CRM and lead handling',
    body: 'A lead record with the visitor\'s website activity attached, pipeline stages, tasks, assignment and routing rules, and a rule-based lead health score. The score is computed from five factors; no AI produces it.',
    source: 'https://realfoyer.com/products/crm',
    sourceLabel: 'CRM',
  },
  {
    area: 'Integrations',
    body: 'Outbound lead push to Zoho CRM, GoHighLevel and Zapier as a one-time push, not an ongoing sync; an inbound webhook URL with a token for other sources. Maps and places through Mapbox and Google Places; billing through Stripe.',
    source: 'https://realfoyer.com/help-center/integrations',
    sourceLabel: 'Integrations help',
  },
  {
    area: 'Site CMS',
    body: 'Pages, slugs and menus, configurable homepage sections, themes and header/footer layouts, per-page SEO fields, a generated sitemap, custom domains with platform-issued certificates, publish on save. Configurable sections, not a freeform canvas.',
    source: 'https://realfoyer.com/products/cms-builder',
    sourceLabel: 'CMS builder',
  },
];

const notIncluded = [
  'No dialler or SMS sending',
  'No external calendar sync',
  'No property recommendation engine',
  'Outbound CRM push is one-time, not a two-way sync',
  'Board coverage beyond the first integrations is roadmap, not live',
];

const engineering: { title: string; body: string; href?: string; hrefLabel?: string }[] = [
  {
    title: 'One platform, many branded sites',
    body: 'Agent and brokerage sites share one codebase and one database, with a tenant key on every record and the tenant resolved from the request hostname. Branding, theme, menus and SEO fields are data, not forks of the code.',
    href: '/blog/multi-tenant-real-estate-saas',
    hrefLabel: 'Multi-tenant real estate SaaS',
  },
  {
    title: 'MLS ingestion per board',
    body: 'Each board is a separate feed with its own fields, refresh cadence and rules. Scheduled sync and removal reconciliation keep a site in step with the feed its agreement allows.',
    href: '/blog/mls-sync-engine',
    hrefLabel: 'MLS sync engine',
  },
  {
    title: 'Search index separate from the source database',
    body: 'Normalized listings are written to a search index built for filters, geo queries and map clustering, so the database of record is not the thing answering every map move.',
    href: '/blog/real-estate-search-elasticsearch',
    hrefLabel: 'Real estate search',
  },
  {
    title: 'Compliance as data, per board',
    body: 'Attribution, disclaimers and whether sold data may be shown differ by market. RealFoyer implements what the agent\'s board agreement permits without widening it, so those rules live in configuration rather than in templates.',
    href: '/blog/idx-website-features-checklist',
    hrefLabel: 'IDX website features',
  },
  {
    title: 'Website activity on the lead timeline',
    body: 'Property views, saved searches and alert clicks are captured against the lead, so an enquiry arrives with the search that produced it rather than as a bare contact form.',
    href: '/blog/real-estate-crm-architecture',
    hrefLabel: 'Real estate CRM architecture',
  },
  {
    title: 'Integration boundaries designed in',
    body: 'A one-time outbound push and a token-protected inbound webhook are deliberately narrow interfaces: simple to reason about, simple to secure, and honest about what they do not do.',
    href: '/blog/webhook-event-driven-integrations',
    hrefLabel: 'Webhook integrations',
  },
];

const serviceSlugs = ['mls-idx-integration', 'saas-development', 'api-integration'];
const guideSlugs = ['multi-tenant-real-estate-saas', 'mls-sync-engine', 'cost-to-build-a-real-estate-platform'];

export default function RealFoyerPage() {
  const services = serviceSlugs.map(getService);
  const guides = guideSlugs.map(getGuide);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': 'https://realfoyer.com/#software' },
        publisher: ORGANIZATION_REF,
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://realfoyer.com/#software',
        name: 'RealFoyer',
        description: productSummary,
        url: REALFOYER,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web browser',
        creator: ORGANIZATION_REF,
        publisher: ORGANIZATION_REF,
        sameAs: [REALFOYER],
      },
      breadcrumbList(url, [
        { name: 'Home', path: '' },
        { name: 'RealFoyer', path: '/products/realfoyer' },
      ]),
    ],
  };

  return (
    <main className="cp-page">
      <JsonLd data={schema} />
      <section className="cp-hero">
        <div className="cp-container">
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">›</span><span>RealFoyer</span>
          </nav>
          <div className="cp-badge"><i className="ri-building-line" aria-hidden="true" />Own product</div>
          <h1>RealFoyer: the real estate SaaS product we build and run</h1>
          <p className="cp-lead">
            RealFoyer is a real estate website, IDX, CRM and AI marketing platform for agents, teams and
            brokerages in the United States and Canada. It is owned and operated by Peregrine IT Solutions LLP.
            This page is about the engineering; it is here so a company weighing us as a vendor can see a product
            we run ourselves, not only work we delivered for clients.
          </p>
          <p className="cp-lead-muted">
            If you are an agent or brokerage looking for a website or CRM, RealFoyer&apos;s own site is the right
            place: <a href={REALFOYER} target="_blank" rel="noopener">realfoyer.com</a>. Product details below
            summarise realfoyer.com as of {AS_OF}; plans, MLS coverage and features are maintained there.
          </p>
          <div className="cp-buttons">
            <a href={REALFOYER} target="_blank" rel="noopener" className="cp-btn cp-btn-secondary">Visit realfoyer.com</a>
            <Link href="/services/mls-idx-integration" className="cp-btn">Build a platform like it</Link>
          </div>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Why it exists</span>
          <h2>The problem RealFoyer addresses</h2>
          <div className="cp-prose">
            <p>
              An agent&apos;s digital business is usually spread across a website vendor, an IDX plugin, a CRM
              and a marketing tool, each with its own copy of the lead and none of them knowing what the others
              saw. RealFoyer&apos;s premise is one data model shared by the website, the property search, the
              lead record and the marketing: a visitor who saves a search on the site is the same record the
              agent sees in the CRM, with that search attached.
            </p>
            <p>
              The second problem is MLS rules. What a site may display, how it must attribute listings and
              whether it may show sold data are terms in the agreement between an agent and their board, and
              they differ by market. RealFoyer&apos;s first board integrations are the Toronto Regional Real
              Estate Board (through PropTx) and MLS PIN; a board&apos;s feed is activated for an agent once
              their board approves it, and further boards are on RealFoyer&apos;s roadmap.
            </p>
          </div>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">What it does today</span>
          <h2>Capabilities as described on realfoyer.com</h2>
          <div className="cp-table-wrap">
            <table>
              <thead>
                <tr><th>Area</th><th>What is implemented</th><th>Source</th></tr>
              </thead>
              <tbody>
                {capabilities.map((c) => (
                  <tr key={c.area}>
                    <td>{c.area}</td>
                    <td>{c.body}</td>
                    <td><a href={c.source} target="_blank" rel="noopener">{c.sourceLabel}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="cp-muted" style={{ marginTop: 16 }}>
            RealFoyer publishes what it does not do as deliberately as what it does. As of {AS_OF}:
          </p>
          <ul className="cp-checks cp-checks-no">
            {notIncluded.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Engineering</span>
          <h2>What is interesting about building it</h2>
          <div className="cp-grid">
            {engineering.map((e) => (
              <div key={e.title} className="cp-card">
                <h3>{e.title}</h3>
                <p>{e.body}</p>
                {e.href && (
                  <Link href={e.href} className="cp-card-more">{e.hrefLabel}</Link>
                )}
              </div>
            ))}
          </div>
          <p style={{ marginTop: 20 }}>
            <Link href="/case-studies/realfoyer" className="cp-standalone-link">Read the engineering case study: how we built RealFoyer</Link>
          </p>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Why we built it</span>
          <h2>What running our own SaaS changes about our engineering</h2>
          <div className="cp-prose">
            <p>
              Peregrine has built real estate platforms for clients since 2018, mainly for companies in the United
              States and Canada. RealFoyer is where those decisions are ours to live with: the MLS sync that has
              to be right every night, the search index that has to stay fast as listings grow, the tenant
              isolation that has to hold for every site on the platform, and the operating cost of all of it.
              When we recommend an approach to a client, it is usually one we run in production ourselves.
            </p>
            <p>
              It also keeps the team current on board-by-board MLS rules, RESO Web API changes and the CRM and
              marketing integrations agents actually use, which is the knowledge most of our real estate
              engagements draw on.
            </p>
          </div>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Services</span>
          <h2>Building something similar?</h2>
          <div className="cp-grid">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="cp-card">
                <span className="cp-card-icon"><i className={s.icon} aria-hidden="true" /></span>
                <h3>{s.name}</h3>
                <p>{s.offer}</p>
                <span className="cp-card-more">See the service</span>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 20 }}>
            <Link href="/industries/real-estate" className="cp-standalone-link">Real estate and proptech software development</Link>
          </p>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Guides</span>
          <h2>The engineering, in more depth</h2>
          <div className="cp-grid">
            {guides.map((g) => (
              <Link key={g.slug} href={`/blog/${g.slug}`} className="cp-card">
                <h3>{g.title}</h3>
                <p>{g.description}</p>
                <span className="cp-card-more">Read the guide</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCta
        heading="Building a real estate platform of your own?"
        text="We can walk you through the MLS, search and CRM decisions behind RealFoyer on a 30-minute technical discovery call with an engineer."
        source="product:realfoyer"
      />
    </main>
  );
}
