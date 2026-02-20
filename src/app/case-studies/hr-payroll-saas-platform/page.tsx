import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'HR & Payroll SaaS for Mid-Market Companies — Case Study',
  description: 'How we built an HR &amp; payroll SaaS platform for mid-market companies — 85+ companies, 12K employees, 99.9% payroll accuracy, with multi-state tax, benefits integration, and compliance.',
  keywords: ['HR SaaS', 'payroll', 'FinTech', 'HR Tech', 'benefits', 'compliance', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — HR & Payroll SaaS for Mid-Market Companies | Peregrine IT Solutions',
    description: 'How we built an HR &amp; payroll SaaS for 85+ companies and 12K employees with 99.9% payroll accuracy.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/hr-payroll-saas-platform',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'HR Payroll SaaS Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — HR & Payroll SaaS for Mid-Market Companies',
    description: 'HR &amp; payroll SaaS for 85+ companies and 12K employees with multi-state tax and compliance.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/hr-payroll-saas-platform' },
};

export default function HRPayrollSaaSPlatform() {
  return (
    <div className="case-study-detail csd-purple">
      {/* ═══ HERO ═══ */}
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
            HR &amp; Payroll SaaS for <em>Mid-Market Companies</em>
          </h1>

          <p className="csd-hero-sub">
            How we built an HR &amp; payroll SaaS platform serving 85+ companies and 12K employees —
            with multi-state tax rules, benefits integration, compliance automation, and
            self-service portals achieving 99.9% payroll accuracy.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">HR Tech / FinTech</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">10 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Full-Stack &middot; Integrations &middot; Compliance</div>
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
                <i className="ri-user-3-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-money-dollar-circle-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-shield-check-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-file-text-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-calendar-check-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-dashboard-3-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
            </div>
            <p>HR &amp; Payroll SaaS &middot; Tax &amp; Compliance</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">85+</div>
            <div className="csd-stat-label">Companies</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">12K</div>
            <div className="csd-stat-label">Employees</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">99.9%</div>
            <div className="csd-stat-label">Payroll Accuracy</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">Multi-State</div>
            <div className="csd-stat-label">Tax Support</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Client&apos;s Vision</h2>
          <p>
            A PEO (Professional Employer Organization) serving mid-market companies was struggling
            with legacy payroll software that couldn&apos;t keep up with multi-state expansion.
            Their clients employed workers across 40+ states, each with different withholding rules,
            sick leave mandates, and reporting requirements. Payroll runs took hours of manual
            verification, and one state tax rule change could break an entire pay cycle.
          </p>
          <p>
            They needed a modern HR &amp; payroll platform that could handle multi-state tax
            calculations automatically, integrate with benefits providers (ADP, QuickBooks) and
            compliance systems (DocuSign for I-9, W-4), provide employees with a self-service portal
            for pay stubs and tax documents, and maintain a full audit trail for SOC 2 and payroll
            compliance. The goal was to reduce payroll processing time by 70% while improving
            accuracy to 99.9%+.
          </p>
        </div>

        {/* CHALLENGES */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>What Was Breaking</h2>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-map-pin-line" />
              </div>
              <h4>Multi-State Tax Rules</h4>
              <p>
                Each state has different withholding rates, local tax jurisdictions, and special
                rules (e.g., reciprocity agreements). Manual updates were error-prone — a single
                wrong rate could affect hundreds of employees. Rules changed quarterly.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-heart-pulse-line" />
              </div>
              <h4>Benefits Integration</h4>
              <p>
                Health insurance, 401(k), and other benefits were administered by external
                providers. Payroll deductions had to sync with ADP, QuickBooks, and carrier feeds.
                Mismatches caused over/under deductions and employee confusion.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-shield-check-line" />
              </div>
              <h4>Compliance &amp; Audit Trail</h4>
              <p>
                SOC 2 and payroll compliance required immutable audit logs. Who changed an
                employee&apos;s salary? When was a pay run approved? Legacy systems had gaps that
                auditors flagged. Document retention for 7+ years was manual.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-user-settings-line" />
              </div>
              <h4>Self-Service Portal</h4>
              <p>
                Employees called HR for pay stubs, W-2s, and tax form updates. HR spent 40% of their
                time on repetitive requests. There was no way for employees to update W-4 or banking
                info themselves.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>The Architecture We Built</h2>
          <p>
            We built a multi-tenant SaaS platform with a Next.js admin for HR and finance teams,
            an employee self-service portal, and a Node.js backend that orchestrates payroll runs,
            tax calculations, and third-party integrations. Tax rules live in a versioned,
            state-specific config that we update as regulations change. ADP and QuickBooks
            integrations sync deductions and ledger entries. DocuSign handles I-9 and W-4
            e-signatures. Every mutation is logged with user, timestamp, and before/after state
            for audit compliance.
          </p>

          <div className="csd-arch-block">
            <h3>System Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-smartphone-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">HR Admin Portal &amp; Employee Self-Service</div>
                  <div className="csd-arch-layer-desc">
                    Next.js admin for HR admins (employees, pay runs, reports). Employee portal for
                    pay stubs, W-4 updates, direct deposit, and document download
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-server-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Payroll Engine &amp; Tax Calculator</div>
                  <div className="csd-arch-layer-desc">
                    Node.js services for payroll runs, multi-state tax calculation, and approval
                    workflows. Versioned tax rule engine with state-specific configs
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-links-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Integrations — ADP, QuickBooks, DocuSign</div>
                  <div className="csd-arch-layer-desc">
                    API integrations for benefits sync, ledger export, and e-signature. Webhook
                    handlers for status updates and reconciliation
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">PostgreSQL — Employees, Pay Runs &amp; Audit</div>
                  <div className="csd-arch-layer-desc">
                    Companies, employees, pay runs, tax configs, and immutable audit log. Multi-tenant
                    isolation with company-scoped data
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-file-lock-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Compliance &amp; Document Storage</div>
                  <div className="csd-arch-layer-desc">
                    Secure document storage for pay stubs, W-2s, and signed forms. 7-year retention
                    policy. Role-based access with full audit trail
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            The tax engine was the most delicate piece. We built a rule engine that evaluates
            employee work location, residence state, reciprocity agreements, and local jurisdiction
            codes. Rules are stored as JSON configs with effective dates — when a state updates
            rates, we add a new version and the engine picks the correct one for each pay period.
            We run regression tests against known pay scenarios before every release.
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
              <span className="csd-tech-icon"><i className="ri-links-line" /></span> ADP API
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-file-list-2-line" /></span> QuickBooks API
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-file-text-line" /></span> DocuSign
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-shield-check-line" /></span> SOC 2
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-amazon-line" /></span> AWS
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
              <div className="csd-timeline-phase">Phase 1 — Weeks 1–5</div>
              <div className="csd-timeline-title">Discovery &amp; Tax Rule Design</div>
              <p className="csd-timeline-desc">
                Audited payroll workflows and pain points. Mapped multi-state tax rules and built
                initial rule config schema. Defined integration requirements for ADP, QuickBooks,
                and DocuSign. Designed audit log and compliance model.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 6–18</div>
              <div className="csd-timeline-title">Core Platform &amp; Payroll Engine</div>
              <p className="csd-timeline-desc">
                Built Next.js admin and employee portal. Implemented Node.js payroll engine with
                tax calculator. Integrated ADP and QuickBooks for deductions and ledger. Added
                DocuSign for I-9 and W-4. Deployed multi-tenant PostgreSQL with audit tables.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 19–30</div>
              <div className="csd-timeline-title">Tax Rules &amp; Compliance</div>
              <p className="csd-timeline-desc">
                Populated tax rules for 40+ states. Built rule versioning and regression test
                suite. Implemented document storage and 7-year retention. Completed SOC 2
                readiness checklist.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 31–40</div>
              <div className="csd-timeline-title">Pilot &amp; Rollout</div>
              <p className="csd-timeline-desc">
                Piloted with 10 companies and 800 employees. Validated 99.9% payroll accuracy.
                Phased migration of remaining 75+ companies. Trained HR teams and documented
                runbooks for tax rule updates.
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
              <div className="csd-result-before">Manual tax updates</div>
              <div className="csd-result-after">Automated 40+ states</div>
              <div className="csd-result-label">Versioned rule engine with regression tests</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Payroll processing</div>
              <div className="csd-result-after">70% faster</div>
              <div className="csd-result-label">From hours to minutes per pay run</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">HR support calls</div>
              <div className="csd-result-after">-55%</div>
              <div className="csd-result-label">Self-service portal for stubs and documents</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Audit readiness</div>
              <div className="csd-result-after">SOC 2 aligned</div>
              <div className="csd-result-label">Full audit trail and document retention</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;Multi-state payroll used to keep us up at night. One wrong rate and we&apos;d
            have to issue corrections for hundreds of employees. Now the system handles it
            automatically — we hit 99.9% accuracy from day one. The self-service portal alone cut
            our HR support load in half.&rdquo;
          </div>
          <div className="csd-quote-author">— VP of Operations, PEO</div>
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            Payroll is unforgiving. A single miscalculation can affect an employee&apos;s taxes,
            benefits, and trust. The tax engine had to be deterministic, versioned, and testable.
            We built a regression suite with hundreds of scenarios — employee in State A, works in
            State B, reciprocity applies — and run it before every deploy. That discipline caught
            several edge cases before they reached production.
          </p>
          <p>
            Integrations with ADP, QuickBooks, and DocuSign were critical. Each has different
            webhook semantics and error handling. We built idempotent sync logic and reconciliation
            jobs that compare our records with provider data. Mismatches trigger alerts — we&apos;d
            rather flag a discrepancy than silently propagate an error.
          </p>
          <p>
            The audit trail was non-negotiable for compliance. Every change to an employee record,
            tax config, or pay run is logged with user ID, timestamp, and before/after JSON. That
            gave auditors a complete picture and the client confidence to pass SOC 2. Document
            retention for 7 years was implemented with lifecycle policies and encrypted storage.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Building an HR or Payroll Platform?</h2>
          <p>
            We help HR Tech and FinTech companies build compliant payroll, benefits integration,
            and self-service portals. Let&apos;s talk about your architecture.
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
