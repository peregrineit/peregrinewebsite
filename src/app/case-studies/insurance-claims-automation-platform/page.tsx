import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'Insurance Claims Automation for Claims Processing — Case Study',
  description: 'How we built an InsurTech claims automation platform processing 45K+ claims/year — 60% faster processing, HIPAA compliant, with document extraction, multi-carrier rules, and full audit trail.',
  keywords: ['InsurTech', 'claims automation', 'FinTech', 'document extraction', 'HIPAA', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — Insurance Claims Automation for Claims Processing | Peregrine IT Solutions',
    description: 'How we built an InsurTech claims automation platform processing 45K+ claims/year with 60% faster processing.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/insurance-claims-automation-platform',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'Insurance Claims Automation Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — Insurance Claims Automation for Claims Processing',
    description: 'Claims automation processing 45K+ claims/year with document extraction and multi-carrier rules.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/insurance-claims-automation-platform' },
};

export default function InsuranceClaimsAutomationPlatform() {
  return (
    <div className="case-study-detail">
      {/* ═══ HERO — Default (no accent) ═══ */}
      <section className="csd-hero">
        <div className="csd-back-nav" style={{ maxWidth: 960, margin: '0 auto', paddingBottom: 24 }}>
          <Link href="/case-studies" className="csd-back-link">
            <i className="ri-arrow-left-s-line" style={{ fontSize: 18 }} />
            Back to Case Studies
          </Link>
        </div>

        <div className="csd-hero-inner">
          <div className="csd-hero-badge">
            <span className="csd-badge-dot" />
            Case Study
          </div>

          <h1>
            Insurance Claims Automation for <em>Claims Processing</em>
          </h1>

          <p className="csd-hero-sub">
            How we built an InsurTech claims automation platform processing 45K+ claims per year —
            with document extraction, multi-carrier adjudication rules, and a full audit trail,
            achieving 60% faster processing and HIPAA compliance.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">InsurTech / FinTech</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">14 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Full-Stack &middot; ML &middot; Compliance</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Markets</div>
              <div className="csd-hero-meta-value">United States</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Hero Image ═══ */}
      <div className="csd-hero-image-wrapper">
        <div className="csd-hero-image">
          <div className="csd-hero-image-placeholder">
            <div className="csd-icon-grid">
              <div className="csd-placeholder-node">
                <i className="ri-file-search-line" style={{ fontSize: 28, color: '#93b4f5' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-robot-2-line" style={{ fontSize: 28, color: '#93b4f5' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-shield-check-line" style={{ fontSize: 28, color: '#93b4f5' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-hospital-line" style={{ fontSize: 28, color: '#93b4f5' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-database-2-line" style={{ fontSize: 28, color: '#93b4f5' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-file-list-3-line" style={{ fontSize: 28, color: '#93b4f5' }} />
              </div>
            </div>
            <p>InsurTech Claims &middot; HIPAA Compliant</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">45K+</div>
            <div className="csd-stat-label">Claims/Year</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">60%</div>
            <div className="csd-stat-label">Faster Processing</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">HIPAA</div>
            <div className="csd-stat-label">Compliant</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">Full</div>
            <div className="csd-stat-label">Audit Trail</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Client&apos;s Vision</h2>
          <p>
            A regional health insurer processing 45K+ medical claims per year was drowning in manual
            adjudication. Claims adjusters opened PDFs and EOBs one by one, typed data into
            spreadsheets, and checked carrier rules against printed policy documents. A single
            claim could take 20+ minutes. Backlogs stretched to weeks, and providers complained
            about delayed reimbursements. Errors were common — wrong procedure codes or duplicate
            submissions slipped through.
          </p>
          <p>
            They needed an automation platform that could extract structured data from uploaded
            documents (PDFs, scanned images) using OCR and ML, apply multi-carrier adjudication
            rules to determine eligibility and payment amounts, maintain a complete audit trail for
            compliance and disputes, and integrate with HL7 FHIR for interoperability with provider
            systems. HIPAA compliance was mandatory — all PHI had to be encrypted, access-logged,
            and retained according to policy.
          </p>
        </div>

        {/* CHALLENGES */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>What Was Breaking</h2>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-user-search-line" />
              </div>
              <h4>Manual Adjudication</h4>
              <p>
                Adjusters manually read each claim form and supporting documents. Data entry was
                error-prone — wrong CPT codes, missing modifiers, duplicate submissions. A single
                adjuster could process only 20–30 claims per day.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-file-text-line" />
              </div>
              <h4>Document Extraction</h4>
              <p>
                Claims arrived as PDFs, scanned images, and sometimes faxes. Extracting procedure
                codes, dates, amounts, and patient identifiers required manual review. OCR tools
                existed but produced noisy output with no validation.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-bank-card-2-line" />
              </div>
              <h4>Multi-Carrier Rules</h4>
              <p>
                Different carriers and plans had different reimbursement rules, exclusions, and
                prior-auth requirements. Rules changed frequently. There was no centralized engine
                to evaluate claims against policy logic.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-file-list-3-line" />
              </div>
              <h4>Audit Trail</h4>
              <p>
                Auditors and dispute resolution required a complete record: who viewed what, when
                decisions were made, and what data was used. Legacy systems had partial logs and
                no way to reconstruct claim lifecycle.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>The Architecture We Built</h2>
          <p>
            We built a claims automation platform with a Next.js portal for adjusters and a Node.js
            backend that orchestrates document ingestion, extraction, adjudication, and payment.
            AWS Textract extracts text and tables from PDFs and images; we run validation and
            entity resolution against our schema. A rules engine evaluates each claim against
            carrier-specific configs. HL7 FHIR integration enables exchange with provider systems.
            Every action — view, edit, approve — is logged with user, timestamp, and payload for
            audit.
          </p>

          <div className="csd-arch-block">
            <h3>System Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-window-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Claims Portal — Adjuster Workspace</div>
                  <div className="csd-arch-layer-desc">
                    Next.js app for claim intake, review queue, extracted data correction, and
                    approval workflow. Role-based access for adjusters and supervisors
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-server-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Claims Engine &amp; Rules Orchestrator</div>
                  <div className="csd-arch-layer-desc">
                    Node.js services for claim lifecycle, document routing, and adjudication
                    triggers. Integrates Textract, rules engine, and FHIR endpoints
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-robot-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Document Extraction — AWS Textract</div>
                  <div className="csd-arch-layer-desc">
                    Text and table extraction from PDFs and images. Custom validators for CPT codes,
                    dates, and amounts. Confidence scoring for human review flagging
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">PostgreSQL — Claims &amp; Audit Log</div>
                  <div className="csd-arch-layer-desc">
                    Claims, extracted data, adjudication results, and immutable audit events. PHI
                    encrypted at rest. Retention policies for compliance
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-hospital-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">HL7 FHIR — Interoperability Layer</div>
                  <div className="csd-arch-layer-desc">
                    FHIR API for claim submission and status with provider systems. Supports
                    Coverage, Claim, and ExplanationOfBenefit resources
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            Document extraction was the hardest part. Textract returns raw text and table cells —
            we had to build logic to map fields to our schema (patient ID, provider NPI, procedure
            codes, dates, amounts). We added confidence thresholds: below 85% confidence, we flag
            for human review. That reduced auto-processing errors by 40% while still automating
            the majority of straightforward claims.
          </p>
        </div>

        {/* TECH STACK */}
        <div className="csd-section">
          <div className="csd-section-label">Technology</div>
          <h2>Tech Stack</h2>
          <div className="csd-tech-grid">
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-reactjs-line" /></span> Next.js
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-nodejs-line" /></span> Node.js
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-database-2-line" /></span> PostgreSQL
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-robot-2-line" /></span> AWS Textract
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-hospital-line" /></span> HL7 FHIR
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-shield-check-line" /></span> HIPAA
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-amazon-line" /></span> AWS
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-file-lock-line" /></span> Encryption
            </div>
          </div>
        </div>

        {/* EXECUTION TIMELINE */}
        <div className="csd-section">
          <div className="csd-section-label">Execution</div>
          <h2>How We Delivered It</h2>

          <div className="csd-timeline">
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 1 — Weeks 1–6</div>
              <div className="csd-timeline-title">Discovery &amp; Rule Modeling</div>
              <p className="csd-timeline-desc">
                Audited claim types and workflows. Documented carrier rules and exclusion logic.
                Evaluated Textract vs. alternatives. Designed claim schema and audit log model.
                Defined HIPAA controls and encryption strategy.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 7–24</div>
              <div className="csd-timeline-title">Extraction &amp; Rules Engine</div>
              <p className="csd-timeline-desc">
                Integrated AWS Textract with custom field mapping. Built rules engine with
                carrier-specific configs. Implemented validation and confidence scoring. Added
                human-in-the-loop queue for low-confidence extractions.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 25–44</div>
              <div className="csd-timeline-title">Claims Portal &amp; FHIR</div>
              <p className="csd-timeline-desc">
                Built Next.js claims portal with review queue and approval workflow. Implemented
                HL7 FHIR endpoints for provider integration. Added full audit logging and
                encryption. Conducted HIPAA risk assessment.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 45–56</div>
              <div className="csd-timeline-title">Pilot &amp; Rollout</div>
              <p className="csd-timeline-desc">
                Piloted with 5K claims. Tuned extraction and rules based on error analysis.
                Scaled to 45K+ claims/year. Trained adjusters and documented runbooks.
                Achieved 60% faster processing and passed compliance review.
              </p>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="csd-section">
          <div className="csd-section-label">Results</div>
          <h2>The Impact</h2>

          <div className="csd-results-grid">
            <div className="csd-result-card">
              <div className="csd-result-before">20+ min per claim</div>
              <div className="csd-result-after">60% faster</div>
              <div className="csd-result-label">Automated extraction and adjudication</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Manual data entry</div>
              <div className="csd-result-after">Textract + validation</div>
              <div className="csd-result-label">Structured data with confidence scoring</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Partial audit logs</div>
              <div className="csd-result-after">Full audit trail</div>
              <div className="csd-result-label">Complete lifecycle for compliance</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Carrier rule sprawl</div>
              <div className="csd-result-after">Centralized engine</div>
              <div className="csd-result-label">Multi-carrier rules with versioning</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;We used to have a backlog of thousands of claims and auditors breathing down our
            necks. Now we process 45K claims a year with 60% less time per claim. The document
            extraction alone saved us from hiring five more adjusters. And we finally have an
            audit trail that stands up to scrutiny.&rdquo;
          </div>
          <div className="csd-quote-author">— Director of Claims, Health Insurer</div>
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            Claims automation sits at the intersection of document intelligence and business rules.
            Textract gives you raw extraction — the real work is mapping that to your schema,
            validating against known codes (CPT, ICD-10), and handling the long tail of document
            formats. We built a validation layer that catches common errors (wrong date format,
            invalid procedure code) before claims reach the rules engine. Low-confidence
            extractions go to a human review queue; we don&apos;t auto-approve those.
          </p>
          <p>
            Multi-carrier rules are inherently complex. We modeled rules as configurable
            expressions — eligibility checks, reimbursement formulas, exclusion lists — stored in
            versioned JSON. When a carrier updates policy, we add a new version with an effective
            date. The engine evaluates claims against the correct version for the service date.
            That kept rule maintenance manageable as we added carriers.
          </p>
          <p>
            HIPAA compliance meant encrypting PHI at rest and in transit, logging every access,
            and implementing role-based controls. We worked with the client&apos;s compliance team
            from day one — audit requirements shaped the schema and logging design. The full
            audit trail turned out to be a competitive advantage: when providers disputed claims,
            the client could show exactly what data was used and when decisions were made.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Building an Insurance or Claims Platform?</h2>
          <p>
            We help InsurTech companies build document automation, adjudication engines, and
            compliant claims systems. Let&apos;s talk about your architecture.
          </p>
          <div className="csd-cta-buttons">
            <a href="#" data-open-contact className="csd-cta-btn">
              Tell Us About Your Project
              <i className="ri-arrow-right-line" />
            </a>
            <a
              href="https://calendly.com/mukesh-peregrine-it/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="csd-cta-btn csd-cta-btn-secondary"
            >
              Book a Strategy Call
              <i className="ri-calendar-line" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
