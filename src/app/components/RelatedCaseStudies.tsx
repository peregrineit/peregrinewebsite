import Link from 'next/link';
import { getCaseStudy } from '@/data/case-studies';

export default function RelatedCaseStudies({ slug }: { slug: string }) {
  const related = getCaseStudy(slug).related.map(getCaseStudy);
  return (
    <div className="csd-section csd-related">
      <div className="csd-section-label">Related Case Studies</div>
      <h2>More Work Like This</h2>
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
