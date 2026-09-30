import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd, { ORGANIZATION_REF, SITE_URL, breadcrumbList } from '../../components/JsonLd';
import { engagement, engagementModel, getService, services, startAnswer } from '@/data/services';
import { getCaseStudy } from '@/data/case-studies';
import { formatDate, getGuide, type Guide } from '@/data/guides';
import '../../css/content-pages.css';

export const dynamicParams = false;

// "an MLS ...", "an AI ...", "an Odoo ..." but "a SaaS ...", "a Cloud ...".
const withArticle = (name: string) => `${/^(MLS|AI|API|Odoo)/.test(name) ? 'an' : 'a'} ${name}`;

// Replaces the [[guide]] token in a cost answer with a link to the service's first guide.
function withGuideLink(text: string, guide?: Guide) {
  const [before, after] = text.split('[[guide]]');
  if (after === undefined || !guide) return text;
  return <>{before}<Link href={`/blog/${guide.slug}`}>{guide.title}</Link>{after}</>;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  const url = `${SITE_URL}/services/${slug}`;
  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${service.title} | Peregrine IT Solutions`,
      description: service.metaDescription,
      url,
      type: 'website',
      siteName: 'Peregrine IT Solutions',
      locale: 'en_US',
      images: [{ url: '/ogimage.png', width: 1200, height: 630, alt: service.h1 }],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  if (!services.some((s) => s.slug === slug)) notFound();
  const service = getService(slug);
  const url = `${SITE_URL}/services/${slug}`;
  const cited = service.caseStudies.map((c) => ({ ...c, study: getCaseStudy(c.slug) }));
  const guides = service.guides.map(getGuide);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.name,
        serviceType: service.serviceType,
        description: service.intro.join(' '),
        url,
        provider: ORGANIZATION_REF,
        areaServed: [
          { '@type': 'Country', name: 'United States' },
          { '@type': 'Country', name: 'Canada' },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: service.title,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': `${url}#service` },
        dateModified: service.updated,
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: service.faq.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
      breadcrumbList(url, [
        { name: 'Home', path: '' },
        { name: 'Services', path: '/services' },
        { name: service.name, path: `/services/${slug}` },
      ]),
    ],
  };

  return (
    <main className="cp-page">
      <JsonLd data={schema} />

      <section className="cp-hero">
        <div className="cp-container">
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">›</span>
            <Link href="/services">Services</Link><span aria-hidden="true">›</span>
            <span>{service.name}</span>
          </nav>
          <div className="cp-badge"><i className={service.icon} aria-hidden="true" />{service.name}</div>
          <h1>{service.h1}</h1>
          {service.intro.map((p, i) => (
            <p key={i} className={i === 0 ? 'cp-lead' : 'cp-lead-muted'}>{p}</p>
          ))}
          <p className="cp-byline">Last updated <time dateTime={service.updated}>{formatDate(service.updated)}</time></p>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">At a glance</span>
          <h2>{service.name} at a Glance</h2>
          <div className="cp-table-wrap">
            <table className="cp-glance">
              <tbody>
                <tr><th scope="row">What&apos;s delivered</th><td>{service.glance.delivered}</td></tr>
                {service.glance.timeline && <tr><th scope="row">Timeline</th><td>{service.glance.timeline}</td></tr>}
                <tr><th scope="row">Engagement model</th><td>{engagementModel}</td></tr>
                <tr><th scope="row">How it starts</th><td>A 30-minute technical discovery call with an engineer</td></tr>
                <tr><th scope="row">Pricing</th><td>{engagement.pricingNote}</td></tr>
                <tr>
                  <th scope="row">Related case studies</th>
                  <td>
                    {cited.length > 0
                      ? cited.map(({ slug: csSlug, study }, i) => (
                          <span key={csSlug}>{i > 0 && '; '}<Link href={`/case-studies/${csSlug}`}>{study.title}</Link></span>
                        ))
                      : <>None published yet. <Link href="/case-studies">Browse all case studies</Link></>}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">What we build</span>
          <h2>What Does Peregrine&apos;s {service.name} Service Include?</h2>
          <p className="cp-answer">{service.answers.includes}</p>
          <div className="cp-grid">
            {service.whatWeBuild.map((item) => (
              <div key={item.title} className="cp-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 20 }}><Link href="/industries" className="cp-standalone-link">Industries we build for</Link></p>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Timeline</span>
          <h2>How Long Does {withArticle(service.name)} Project Take?</h2>
          <p className="cp-answer">{service.answers.timeline}</p>
          <div className="cp-steps">
            {service.process.map((step) => (
              <div key={step.title} className="cp-card cp-step">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Cost</span>
          <h2>What Does {service.name} Cost?</h2>
          <p className="cp-answer">{withGuideLink(service.answers.cost, guides[0])}</p>
          {guides.length > 0 && (
            <div className="cp-grid">
              {guides.map((g) => (
                <Link key={g.slug} href={`/blog/${g.slug}`} className="cp-card">
                  <span className="cp-card-meta">Guide</span>
                  <h3>{g.title}</h3>
                  <p>{g.description}</p>
                  <span className="cp-card-more">Read the guide <i className="ri-arrow-right-line" aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container cp-narrow">
          <span className="cp-label">Getting started</span>
          <h2>How Does {withArticle(service.name)} Project Start?</h2>
          <p className="cp-answer">{startAnswer(service.name)}</p>
          <p><Link href="/contact" className="cp-standalone-link">Book a discovery call or send a quick project request</Link></p>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Case studies</span>
          <h2>Which Case Studies Show Peregrine&apos;s {service.name} Work?</h2>
          <p className="cp-answer">{service.answers.work}</p>
          {cited.length > 0 && (
            <div className="cp-grid">
              {cited.map(({ slug: csSlug, note, study }) => (
                <Link key={csSlug} href={`/case-studies/${csSlug}`} className="cp-card">
                  <span className="cp-card-meta">{study.industry}</span>
                  <h3>{study.title}</h3>
                  <p>{note}</p>
                  <span className="cp-card-more">Read the case study <i className="ri-arrow-right-line" aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          )}
          <p style={{ marginTop: 20 }}><Link href="/case-studies" className="cp-standalone-link">Browse all case studies</Link></p>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Stack</span>
          <h2>Technology We Use</h2>
          <div className="cp-tags">
            {service.stack.map((t) => <span key={t} className="cp-tag">{t}</span>)}
          </div>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container cp-narrow cp-faq">
          <span className="cp-label">FAQ</span>
          <h2>Frequently Asked Questions</h2>
          {service.faq.map(({ question, answer }) => (
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

      <section className="cp-section">
        <div className="cp-container">
          <div className="cp-cta">
            <h2>Talk to an Engineer About Your Project</h2>
            <p>Tell us what you are building or fixing. Your first conversation is with an engineer, not a salesperson.</p>
            <div className="cp-buttons">
              <Link href="/contact" className="cp-btn">Contact Us <i className="ri-arrow-right-line" aria-hidden="true" /></Link>
              <Link href="/services" className="cp-btn cp-btn-secondary">All Services</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
