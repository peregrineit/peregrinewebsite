import { StrategyCallForm } from './LeadForms';
import { getCaseStudy } from '@/data/case-studies';
import { getService } from '@/data/services';

const CALENDLY = 'https://calendly.com/mukesh-peregrine-it/30min';

/**
 * Closing block of a case study: the page's own heading and line, then the short
 * project form inline (it used to be two buttons that opened a popup). The form is
 * tagged with the case study, so a lead records which project prompted it.
 */
export default function CaseStudyCta({ slug, heading, children }: { slug: string; heading: string; children: React.ReactNode }) {
  const service = getService(getCaseStudy(slug).service);
  return (
    <div className="csd-cta-section csd-cta-form" data-cta-location={`case-study:${slug}`}>
      <div className="csd-cta-copy">
        <h2>{heading}</h2>
        <p>{children}</p>
        <ul className="csd-cta-points">
          <li>A 30-minute technical discovery call with an engineer, not a salesperson.</li>
          <li>We reply within 1 business day.</li>
          <li>
            Related service: <a href={`/services/${service.slug}`}>{service.name}</a>
          </li>
        </ul>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="csd-cta-btn csd-cta-btn-secondary">
          Book a Strategy Call
          <i className="ri-calendar-line" aria-hidden="true" />
        </a>
      </div>
      <div className="csd-cta-panel">
        <h3>Tell us about your project</h3>
        <StrategyCallForm service={`case-study:${slug}`} />
      </div>
    </div>
  );
}
