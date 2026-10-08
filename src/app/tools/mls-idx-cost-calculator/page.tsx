import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { ORGANIZATION_REF, SITE_URL, breadcrumbList } from '../../components/JsonLd';
import ConsultationCta from '../../components/ConsultationCta';
import MlsCostCalculator from '../../components/MlsCostCalculator';
import { FEES_CHECKED, dataVendors, idxPlugins, mlsLicenses } from '@/data/mls-fees';
import { formatDate } from '@/data/guides';
import '../../css/content-pages.css';

const url = `${SITE_URL}/tools/mls-idx-cost-calculator`;
const title = 'MLS & IDX Cost Calculator: Published Fees';
const h1 = 'MLS and IDX Cost Calculator';
const description =
  'Add up published MLS license fees, IDX plugin plans and RESO Web API vendor fees for your setup, per month and per year. Every figure links to its source.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website', siteName: 'Peregrine IT Solutions', locale: 'en_US', images: [{ url: '/ogimage.png', width: 1200, height: 630, alt: h1 }] },
};

export default function MlsCostCalculatorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: h1,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        publisher: ORGANIZATION_REF,
        dateModified: FEES_CHECKED,
      },
      breadcrumbList(url, [
        { name: 'Home', path: '' },
        { name: 'Guides', path: '/blog' },
        { name: h1, path: '/tools/mls-idx-cost-calculator' },
      ]),
    ],
  };
  const boardCount = mlsLicenses.length;

  return (
    <main className="cp-page">
      <JsonLd data={schema} />
      <section className="cp-hero">
        <div className="cp-container">
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/blog">Guides</Link><span aria-hidden="true">›</span><span>Calculator</span>
          </nav>
          <div className="cp-badge"><i className="ri-calculator-line" aria-hidden="true" />Calculator</div>
          <h1>{h1}</h1>
          <p className="cp-lead">
            This calculator adds up published fees for an MLS or IDX setup: {idxPlugins.length} IDX plugin plans, license
            fees from {boardCount} MLSs, and {dataVendors.length} RESO Web API vendor plans. It shows the total per month
            and per year, and links every figure to the page it comes from.
          </p>
          <p className="cp-lead-muted">
            It is an adding machine, not a quote. It contains no Peregrine prices, it covers only the MLSs and vendors
            cited in our <Link href="/blog/mls-idx-integration-cost">MLS and IDX cost guide</Link>, and fees change, so
            confirm each one with the provider. Fees last checked <time dateTime={FEES_CHECKED}>{formatDate(FEES_CHECKED)}</time>.
          </p>
        </div>
      </section>

      <section className="cp-section" data-cta-location="tool:mls-idx-cost-calculator">
        <div className="cp-container">
          <span className="cp-label">Calculator</span>
          <h2>Add Up Your MLS and IDX Fees</h2>
          <MlsCostCalculator />
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container cp-narrow">
          <span className="cp-label">Read this first</span>
          <h2>What the Total Does and Does Not Include</h2>
          <p>
            <strong>Included:</strong> the published subscription, license, establishment and connection fees for the
            options you pick, and, if you enter hours, a development range at the market hourly rates Clutch reports.
          </p>
          <p>
            <strong>Not included:</strong> setup fees a vendor does not publish, tiered or usage-based fees, maps,
            hosting and other infrastructure, MLS membership or broker dues, and fees from any MLS that is not listed.
            There is no national MLS price list: each board sets its own fees, and the same data is priced differently
            for brokers and for vendors.
          </p>
          <p>
            <strong>Development hours are yours to enter.</strong> We do not suggest a number, because the work depends
            on how many boards you combine, how fresh the data must be and what you build on top. Our guide on{' '}
            <Link href="/blog/cost-to-build-a-real-estate-platform">what it costs to build a real estate platform</Link>{' '}
            explains what drives it.
          </p>
          <p>
            Before you can pay any of these fees you need data access. See{' '}
            <Link href="/blog/how-to-get-mls-data-access">how to get MLS data access for your app</Link>, or our{' '}
            <Link href="/services/mls-idx-integration">MLS and IDX integration service</Link> if you want the pipeline built.
          </p>
        </div>
      </section>

      <ConsultationCta
        heading="Want a Real Scope Instead of a Sum?"
        text="Tell us which MLS boards you need and what you are building. An engineer will tell you which license types, feeds and vendors apply."
        source="tool:mls-idx-cost-calculator"
      />
    </main>
  );
}
