import Link from 'next/link';
import { getCaseStudy } from '@/data/case-studies';
import { getService } from '@/data/services';
import { industryForCaseStudy } from '@/data/industries';

export default function RelatedCaseStudies({ slug }: { slug: string }) {
  const study = getCaseStudy(slug);
  const related = study.related.map(getCaseStudy);
  const service = getService(study.service);
  const industry = industryForCaseStudy(slug);
  return (
    <div className="csd-section csd-related">
      <div className="csd-section-label">Related Case Studies</div>
      <h2>More Work Like This</h2>
      <p className="csd-related-service">
        Service: <Link href={`/services/${service.slug}`}>{service.name}</Link>
        {' · '}
        {industry ? (
          <>Industry: <Link href={`/industries/${industry.slug}`}>{industry.name}</Link></>
        ) : (
          <Link href="/industries">All industries</Link>
        )}
        {' · '}
        <Link href="/services">All services</Link>
      </p>
      <div className="csd-related-grid">
        {related.map((study) => (
          <Link key={study.slug} href={`/case-studies/${study.slug}`} className="csd-related-card">
            <span className="csd-related-industry">{study.industry}</span>
            <span className="csd-related-title">{study.title}</span>
            <span className="csd-related-more">
              Read case study <i className="ri-arrow-right-line" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
