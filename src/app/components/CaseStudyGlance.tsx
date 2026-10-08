import Link from 'next/link';
import { getCaseStudy } from '@/data/case-studies';
import { industryForCaseStudy } from '@/data/industries';
import { technologyPageFor } from '@/data/technology-services';

// "Results at a glance" table at the top of a case study. Every value comes from the
// page itself (see `glance` in src/data/case-studies.ts); nothing new is stated here.
export default function CaseStudyGlance({ slug }: { slug: string }) {
  const study = getCaseStudy(slug);
  const { client, duration, results } = study.glance;
  const industry = industryForCaseStudy(slug);
  return (
    <div className="csd-section csd-glance">
      <div className="csd-section-label">Results at a glance</div>
      <table>
        <tbody>
          <tr><th scope="row">Client</th><td>{client}</td></tr>
          <tr>
            <th scope="row">Industry</th>
            <td>{industry ? <Link href={`/industries/${industry.slug}`}>{study.industry}</Link> : study.industry}</td>
          </tr>
          <tr>
            <th scope="row">Stack</th>
            <td>
              {study.stack.map((item, i) => {
                const page = technologyPageFor(item);
                return (
                  <span key={item}>
                    {i > 0 && ', '}
                    {page ? <Link href={`/services/${page}`}>{item}</Link> : item}
                  </span>
                );
              })}
            </td>
          </tr>
          <tr><th scope="row">Project duration</th><td>{duration}</td></tr>
          <tr>
            <th scope="row">Headline results</th>
            <td>
              <ul>
                {results.map(([value, label]) => (
                  <li key={label}><strong>{value}</strong> {label}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
