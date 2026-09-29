import Link from 'next/link';
import type { Metadata } from 'next';
import JsonLd, { ORGANIZATION_REF, SITE_URL, breadcrumbList } from './JsonLd';
import { formatDate, getGuide } from '@/data/guides';
import { getService } from '@/data/services';
import { getCaseStudy } from '@/data/case-studies';
import { getCaseStudyAuthor, personId } from '@/data/team';
import '../css/content-pages.css';

export function guideMetadata(slug: string): Metadata {
  const g = getGuide(slug);
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    title: g.metaTitle,
    description: g.description,
    alternates: { canonical: url },
    openGraph: {
      title: g.title,
      description: g.description,
      url,
      type: 'article',
      publishedTime: g.datePublished,
      modifiedTime: g.dateModified,
      siteName: 'Peregrine IT Solutions',
      locale: 'en_US',
      images: [{ url: '/ogimage.png', width: 1200, height: 630, alt: g.title }],
    },
  };
}

/** A cited source link. Every figure in a guide goes through this. */
export function Src({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="cp-src">{children}</a>;
}

export default function GuideLayout({ slug, children }: { slug: string; children: React.ReactNode }) {
  const g = getGuide(slug);
  const url = `${SITE_URL}/blog/${slug}`;
  const service = getService(g.service);
  const study = getCaseStudy(g.caseStudy);
  const author = getCaseStudyAuthor(); // TODO(owner): a named author once team data exists
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: g.title,
        description: g.description,
        image: `${SITE_URL}/ogimage.png`,
        url,
        mainEntityOfPage: url,
        datePublished: g.datePublished,
        dateModified: g.dateModified,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        author: author ? { '@id': personId(author.id) } : ORGANIZATION_REF,
        publisher: ORGANIZATION_REF,
      },
      breadcrumbList(url, [
        { name: 'Home', path: '' },
        { name: 'Blog', path: '/blog' },
        { name: g.title, path: `/blog/${slug}` },
      ]),
    ],
  };
  return (
    <main className="cp-page">
      <JsonLd data={schema} />
      <section className="cp-hero">
        <div className="cp-container cp-narrow">
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">›</span>
            <Link href="/blog">Blog</Link><span aria-hidden="true">›</span>
            <span>Guide</span>
          </nav>
          <div className="cp-badge"><i className="ri-book-open-line" aria-hidden="true" />Guide</div>
          <h1>{g.title}</h1>
          <p className="cp-lead-muted">{g.description}</p>
          <p className="cp-byline">
            By {author ? <Link href={`/about#${author.id}`}>{author.name}</Link> : 'Peregrine IT Solutions'}
            {' · '}Published <time dateTime={g.datePublished}>{formatDate(g.datePublished)}</time>
            {g.dateModified !== g.datePublished && <> · Updated <time dateTime={g.dateModified}>{formatDate(g.dateModified)}</time></>}
          </p>
        </div>
      </section>
      <article className="cp-section">
        <div className="cp-container cp-narrow cp-prose">{children}</div>
      </article>
      <section className="cp-section">
        <div className="cp-container cp-narrow">
          <span className="cp-label">Related</span>
          <div className="cp-grid">
            <Link href={`/services/${service.slug}`} className="cp-card">
              <span className="cp-card-meta">Service</span>
              <h3>{service.name}</h3>
              <p>{service.offer}</p>
            </Link>
            <Link href={`/case-studies/${study.slug}`} className="cp-card">
              <span className="cp-card-meta">Case study</span>
              <h3>{study.title}</h3>
              <p>{study.industry}</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
