import { StrategyCallForm } from './LeadForms';

const CALENDLY = 'https://calendly.com/mukesh-peregrine-it/30min';

/**
 * Closing "technical consultation" block: one line of context, the short qualification
 * form and a Calendly link. `source` is sent with the lead (which page it came from) and
 * used as the CTA location in tracking; `guide` marks guide CTAs for guide_cta_click.
 */
export default function ConsultationCta({ heading, text, source, guide }: { heading: string; text: string; source: string; guide?: string }) {
  return (
    <section className="cp-section" data-cta-location={source} data-guide={guide}>
      <div className="cp-container">
        <div className="cp-consult">
          <div>
            <span className="cp-label">Technical consultation</span>
            <h2>{heading}</h2>
            <p>{text}</p>
            <ul className="cp-consult-points">
              <li>A 30-minute technical discovery call with an engineer, not a salesperson.</li>
              <li>Fixed-scope projects, monthly retainers, or a combination, agreed after the call.</li>
              <li>Small, well-defined tasks get a scoped estimate within 48 hours.</li>
            </ul>
            <p>
              Prefer to pick a time?{' '}
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="cp-standalone-link">Book a call on Calendly</a>
            </p>
          </div>
          <div className="cp-form-panel">
            <h3 style={{ marginBottom: 14 }}>Tell us about your project</h3>
            <StrategyCallForm service={source} />
          </div>
        </div>
      </div>
    </section>
  );
}
