import { getCaseStudy } from '@/data/case-studies';

// "Results at a glance" table at the top of a case study. Every value comes from the
// page itself (see `glance` in src/data/case-studies.ts); nothing new is stated here.
export default function CaseStudyGlance({ slug }: { slug: string }) {
  const study = getCaseStudy(slug);
  const { client, duration, results } = study.glance;
  return (
    <div className="csd-section csd-glance">
      <div className="csd-section-label">Results at a glance</div>
      <table>
        <tbody>
          <tr><th scope="row">Client</th><td>{client}</td></tr>
          <tr><th scope="row">Industry</th><td>{study.industry}</td></tr>
          <tr><th scope="row">Stack</th><td>{study.stack.join(', ')}</td></tr>
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
