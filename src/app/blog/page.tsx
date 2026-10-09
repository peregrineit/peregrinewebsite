import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { SITE_URL, breadcrumbList } from '../components/JsonLd';
import { formatDate, guides } from '@/data/guides';
import '../css/content-pages.css';

const url = `${SITE_URL}/blog`;
const title = 'Guides for Real Estate & SaaS Buyers';
const description =
  'Guides on MLS/IDX integration cost, custom SaaS versus off-the-shelf CRMs and the cost to build a real estate platform, with every figure sourced.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website', siteName: 'Peregrine IT Solutions', locale: 'en_US', images: [{ url: '/ogimage.png', width: 1200, height: 630, alt: title }] },
};

export default function BlogIndex() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${url}#blog`,
        url,
        name: title,
        description,
        publisher: { '@id': `${SITE_URL}/#organization` },
        blogPost: guides.map((g) => ({ '@id': `${SITE_URL}/blog/${g.slug}#article` })),
      },
      breadcrumbList(url, [{ name: 'Home', path: '' }, { name: 'Blog', path: '/blog' }]),
    ],
  };
  return (
    <main className="cp-page">
      <JsonLd data={schema} />
      <section className="cp-hero">
        <div className="cp-container">
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">›</span><span>Blog</span>
          </nav>
          <div className="cp-badge"><i className="ri-book-open-line" aria-hidden="true" />Guides</div>
          <h1>Guides for Real Estate and SaaS Software Buyers</h1>
          <p className="cp-lead">
            Plain-language guides for brokerages, proptech founders and SaaS teams planning a build or an integration.
            Every figure links to the source it came from.
          </p>
        </div>
      </section>
      <section className="cp-section">
        <div className="cp-container">
          <div className="cp-grid">
            {guides.map((g) => (
              <Link key={g.slug} href={`/blog/${g.slug}`} className="cp-card">
                <span className="cp-card-meta">{formatDate(g.datePublished)}</span>
                <h2 style={{ fontSize: 20, margin: 0 }}>{g.title}</h2>
                <p>{g.description}</p>
                <span className="cp-card-more">Read the guide <i className="ri-arrow-right-line" aria-hidden="true" /></span>
              </Link>
            ))}
            <Link href="/tools/mls-idx-cost-calculator" className="cp-card">
              <span className="cp-card-meta">Calculator</span>
              <h2 style={{ fontSize: 20, margin: 0 }}>MLS and IDX Cost Calculator</h2>
              <p>Add up published MLS license fees, IDX plugin plans and data vendor fees for your setup, per month and per year, with every figure sourced.</p>
              <span className="cp-card-more">Open the calculator <i className="ri-arrow-right-line" aria-hidden="true" /></span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
