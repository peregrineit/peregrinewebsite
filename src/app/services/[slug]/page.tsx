import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd, { ORGANIZATION_REF, SITE_URL, breadcrumbList } from '../../components/JsonLd';
import { engagement, getService, services } from '@/data/services';
import { getCaseStudy } from '@/data/case-studies';
import '../../css/content-pages.css';

export const dynamicParams = false;

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
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">What we build</span>
          <h2>What We Build</h2>
          <div className="cp-grid">
            {service.whatWeBuild.map((item) => (
              <div key={item.title} className="cp-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Case studies</span>
          <h2>Work We Can Point To</h2>
          <p className="cp-muted">Rather than make claims, here is published work that shows how we approach {service.name} projects.</p>
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
          <p style={{ marginTop: 20 }}><Link href="/case-studies">Browse all case studies</Link></p>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <span className="cp-label">Process</span>
          <h2>How the Project Runs</h2>
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
          <span className="cp-label">Stack</span>
          <h2>Technology We Use</h2>
          <div className="cp-tags">
            {service.stack.map((t) => <span key={t} className="cp-tag">{t}</span>)}
          </div>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container cp-narrow">
          <span className="cp-label">Engagement</span>
          <h2>{engagement.heading}</h2>
          {engagement.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          <p className="cp-muted">{engagement.pricingNote}</p>
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
            <p>Tell us what you are building or fixing. You will talk directly with the engineers who would do the work.</p>
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
