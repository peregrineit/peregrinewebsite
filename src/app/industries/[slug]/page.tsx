import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd, { ORGANIZATION_REF, SITE_URL, breadcrumbList } from '../../components/JsonLd';
import ConsultationCta from '../../components/ConsultationCta';
import { BringBlock, FitBlock, ProofLinks, ScopeBlock } from '../../services/_components/BuyerBlocks';
import { getIndustry, industries } from '@/data/industries';
import { getService } from '@/data/services';
import { getCaseStudy } from '@/data/case-studies';
import { getGuide } from '@/data/guides';
import '../../css/content-pages.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};
  const url = `${SITE_URL}/industries/${slug}`;
  return {
    title: industry.title,
    description: industry.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: industry.title,
      description: industry.metaDescription,
      url,
      type: 'website',
      siteName: 'Peregrine IT Solutions',
      locale: 'en_US',
      images: [{ url: '/ogimage.png', width: 1200, height: 630, alt: industry.title }],
    },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  if (!industries.some((i) => i.slug === slug)) notFound();
  const industry = getIndustry(slug);
  const url = `${SITE_URL}/industries/${slug}`;
  const services = industry.services.map(getService);
  const studies = industry.caseStudies.map(getCaseStudy);
  const guides = industry.guides.map(getGuide);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: industry.title,
        description: industry.metaDescription,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: ORGANIZATION_REF,
        hasPart: [
          ...services.map((s) => ({ '@id': `${SITE_URL}/services/${s.slug}#service` })),
          ...studies.map((c) => ({ '@id': `${SITE_URL}/case-studies/${c.slug}#article` })),
        ],
      },
      ...(industry.faq
        ? [{
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: industry.faq.map(({ question, answer }) => ({
              '@type': 'Question',
              name: question,
              acceptedAnswer: { '@type': 'Answer', text: answer },
            })),
          }]
        : []),
      breadcrumbList(url, [
        { name: 'Home', path: '' },
        { name: 'Industries', path: '/industries' },
        { name: industry.name, path: `/industries/${slug}` },
      ]),
    ],
  };

  return (
    <main className="cp-page">
      <JsonLd data={schema} />
      <section className="cp-hero">
        <div className="cp-container">
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/industries">Industries</Link><span aria-hidden="true">›</span><span>{industry.name}</span>
          </nav>
          <div className="cp-badge"><i className={industry.icon} aria-hidden="true" />{industry.badge}</div>
          <h1>{industry.h1}</h1>
          <p className="cp-lead">{industry.lead}</p>
          <p className="cp-lead-muted">
            {industry.leadMuted}
            {industry.ownProduct && (
              <>
                {' '}We also build and operate our own real estate product,{' '}
                <a href="https://realfoyer.com/" target="_blank" rel="noopener">RealFoyer</a>.
              </>
            )}
          </p>
        </div>
      </section>

      {industry.buyer && (
        <section className="cp-section" id="fit">
          <div className="cp-container">
            <span className="cp-label">Fit</span>
            <h2>Is Custom {industry.name} Software the Right Fit?</h2>
            <FitBlock guide={industry.buyer} />
          </div>
        </section>
      )}

      {industry.whatWeBuild && (
        <section className="cp-section">
          <div className="cp-container">
            <span className="cp-label">What we build</span>
            <h2>What {industry.name} Software Includes</h2>
            <div className="cp-grid">
              {industry.whatWeBuild.map((item) => (
                <div key={item.title} className="cp-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <ProofLinks slugs={item.proof} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Case studies</span>
          <h2>{industry.name} Case {studies.length === 1 ? 'Study' : 'Studies'}</h2>
          <div className="cp-grid" style={studies.length === 1 ? { gridTemplateColumns: '1fr' } : undefined}>
            {studies.map((c) => (
              <Link key={c.slug} href={`/case-studies/${c.slug}`} className="cp-card">
                <span className="cp-card-meta">{c.industry}</span>
                <h3>{c.title}</h3>
                <p>{c.card.summary}</p>
                <p style={{ fontSize: 14 }}>
                  {c.glance.results.map(([value, label]) => `${value} ${label}`).join(' · ')} · {c.glance.duration}
                </p>
                <span className="cp-card-more">
                  Read the case study · Service: {getService(c.service).name}
                </span>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 20 }}><Link href="/case-studies" className="cp-standalone-link">Browse all case studies</Link></p>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Services</span>
          <h2>Services for {industry.name} Companies</h2>
          <div className="cp-grid">
            {services.map((s) => {
              const related = s.caseStudies.filter((c) => industry.caseStudies.includes(c.slug)).map((c) => getCaseStudy(c.slug).title);
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="cp-card">
                  <span className="cp-card-icon"><i className={s.icon} aria-hidden="true" /></span>
                  <h3>{s.name}</h3>
                  <p>{s.offer}</p>
                  {related.length > 0 && <p style={{ fontSize: 14 }}>Related work: {related.join(' · ')}</p>}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {industry.buyer && (
        <section className="cp-section" id="scope">
          <div className="cp-container">
            <span className="cp-label">Scope</span>
            <h2>What Determines the Scope of {industry.name} Software?</h2>
            <ScopeBlock guide={industry.buyer} />
            <BringBlock guide={industry.buyer} />
            <p><Link href="/contact" className="cp-standalone-link">Book a discovery call or send a project enquiry</Link></p>
          </div>
        </section>
      )}

      {guides.length > 0 && (
        <section className="cp-section">
          <div className="cp-container">
            <span className="cp-label">Guides</span>
            <h2>Guides for {industry.name} Software Buyers</h2>
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
      )}

      {industry.faq && (
        <section className="cp-section">
          <div className="cp-container cp-narrow cp-faq">
            <span className="cp-label">FAQ</span>
            <h2>Frequently Asked Questions</h2>
            {industry.faq.map(({ question, answer }) => (
              <details key={question}>
                <summary>
                  <h3>{question}</h3>
                  <i className="ri-add-line" aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <ConsultationCta heading={industry.cta.heading} text={industry.cta.text} source={`industry:${industry.slug}`} />
    </main>
  );
}
