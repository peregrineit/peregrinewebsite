import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'Legal Document Automation for Contract Generation & E-Signature — Case Study',
  description: 'How we built a legal document automation platform processing 15K+ documents/month — with contract templates, clause libraries, multi-party e-signature, and SOC2-compliant audit trails.',
  keywords: ['legal tech', 'document automation', 'e-signature', 'contract generation', 'DocuSign', 'FinTech', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — Legal Document Automation for Contract Generation & E-Signature | Peregrine IT Solutions',
    description: 'How we built a legal document automation platform processing 15K+ documents/month with DocuSign integration and SOC2 compliance.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/legal-document-automation-platform',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'Legal Document Automation Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — Legal Document Automation for Contract Generation & E-Signature',
    description: 'Legal document automation processing 15K+ documents/month with 40% faster turnaround and SOC2 compliance.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/legal-document-automation-platform' },
};

export default function LegalDocumentAutomationPlatform() {
  return (
    <div className="case-study-detail csd-gold">
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
            Legal Document Automation for <em>Contract Generation &amp; E-Signature</em>
          </h1>

          <p className="csd-hero-sub">
            How we built a legal document automation platform processing 15K+ documents/month — with
            contract templates, clause libraries, multi-party e-signature, and SOC2-compliant audit
            trails.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">Legal Tech / FinTech</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">9 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Full-Stack &middot; DocuSign &middot; SOC2</div>
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
                <i className="ri-file-text-line" style={{ fontSize: 28, color: '#f59e0b' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-edit-line" style={{ fontSize: 28, color: '#f59e0b' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-user-add-line" style={{ fontSize: 28, color: '#f59e0b' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-shield-check-line" style={{ fontSize: 28, color: '#f59e0b' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-stack-line" style={{ fontSize: 28, color: '#f59e0b' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-cloud-line" style={{ fontSize: 28, color: '#f59e0b' }} />
              </div>
            </div>
            <p>Contract Generation &middot; E-Signature &middot; Audit Trail</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">15K+</div>
            <div className="csd-stat-label">Documents/Month</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">40%</div>
            <div className="csd-stat-label">Faster Turnaround</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">SOC2</div>
            <div className="csd-stat-label">Compliant</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">Multi-Party</div>
            <div className="csd-stat-label">E-Signature</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Client&apos;s Vision</h2>
          <p>
            A mid-market legal services firm handling corporate contracts, NDAs, and vendor
            agreements needed to replace manual document drafting and wet-ink signing. Lawyers were
            copying paragraphs from previous contracts into Word, then emailing PDFs back and forth
            for signatures — a process that took 5–7 days per document.
          </p>
          <p>
            They wanted a unified platform where contracts could be assembled from reusable templates
            and clause libraries, populated with client data, and sent for sequential or parallel
            e-signature — with a complete audit trail for compliance.
          </p>
        </div>

        {/* CHALLENGES */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>What Was Breaking</h2>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-file-list-3-line" />
              </div>
              <h4>Template Management</h4>
              <p>
                Hundreds of contract variants lived in Word files and shared drives. Version control
                was non-existent — one lawyer&apos;s amendment could overwrite another&apos;s without
                traceability.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-bookmark-line" />
              </div>
              <h4>Clause Library</h4>
              <p>
                Standard clauses (indemnification, termination, governing law) were scattered across
                documents. There was no single source of truth — inconsistent language across
                contracts risked legal exposure.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-user-add-line" />
              </div>
              <h4>Multi-Party E-Signature</h4>
              <p>
                Complex deals required 3–8 signers in specific order. Coordinating wet-ink signatures
                via mail and courier added weeks. Email chains for e-sign links were chaotic.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-shield-check-line" />
              </div>
              <h4>Audit Compliance</h4>
              <p>
                Clients demanded SOC2 and proof of who signed what, when. Paper trails and email logs
                didn&apos;t meet audit requirements. Document retention policies were inconsistently
                applied.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>The Architecture We Built</h2>
          <p>
            We built a document automation platform with a template engine, clause library, and
            DocuSign integration. Templates are versioned and stored in PostgreSQL. Clauses are
            tagged and searchable. Documents are assembled server-side, stored in S3, and sent via
            DocuSign with configurable signing order. Every action is logged for audit.
          </p>

          <div className="csd-arch-block">
            <h3>System Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-window-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Next.js Document Builder &amp; Admin Portal</div>
                  <div className="csd-arch-layer-desc">
                    Template editor with merge fields, clause picker, and preview. Admin dashboard for
                    user management and analytics
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-server-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">API Gateway &amp; Auth Layer</div>
                  <div className="csd-arch-layer-desc">
                    JWT-based auth with role-based access. Lawyers, admins, and external signers each
                    have appropriate permissions
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">PostgreSQL — Templates, Clauses &amp; Audit</div>
                  <div className="csd-arch-layer-desc">
                    Versioned templates and clause library. Document metadata, merge field values, and
                    audit log entries
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-file-pdf-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Document Assembly &amp; DocuSign Integration</div>
                  <div className="csd-arch-layer-desc">
                    Server-side merge engine generates PDFs from templates. DocuSign API for envelope
                    creation, routing, and webhook callbacks
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-cloud-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">AWS S3 Storage &amp; Redis Cache</div>
                  <div className="csd-arch-layer-desc">
                    Signed documents stored in S3 with retention policies. Redis for session and
                    template caching to reduce latency
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            The DocuSign integration was designed for reliability. We implemented webhook handlers for
            envelope events (sent, viewed, signed, completed) and store completion status in our
            database. If DocuSign has an outage, documents already in progress continue — we retry
            API calls with exponential backoff.
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
              <span className="csd-tech-icon"><i className="ri-file-pdf-line" /></span> DocuSign
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-amazon-line" /></span> AWS S3
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-flashlight-line" /></span> Redis
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-shield-check-line" /></span> SOC2
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-code-s-line" /></span> PDF Generation
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
              <div className="csd-timeline-phase">Phase 1 — Weeks 1–3</div>
              <div className="csd-timeline-title">Discovery &amp; Schema Design</div>
              <p className="csd-timeline-desc">
                Audited existing contract types and workflows. Designed template and clause data
                models. Defined merge field vocabulary. Mapped DocuSign envelope flow to signing
                sequences.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 4–16</div>
              <div className="csd-timeline-title">Template Engine &amp; Clause Library</div>
              <p className="csd-timeline-desc">
                Built template editor with versioning. Implemented clause library with tagging and
                search. Developed server-side merge engine. Integrated PDF generation with fillable
                fields.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 17–28</div>
              <div className="csd-timeline-title">DocuSign Integration &amp; Audit Trail</div>
              <p className="csd-timeline-desc">
                Integrated DocuSign API for envelope creation and signing. Implemented webhook
                handlers for completion events. Built audit log with immutable entries. Stored
                signed documents in S3.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 29–36</div>
              <div className="csd-timeline-title">SOC2 Preparation &amp; Rollout</div>
              <p className="csd-timeline-desc">
                Documented security controls. Implemented access logging and retention policies.
                Load-tested with 15K documents/month. Phased rollout with 20 pilot users, then full
                firm deployment.
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
              <div className="csd-result-before">5–7 days per document</div>
              <div className="csd-result-after">40% faster</div>
              <div className="csd-result-label">Average turnaround cut by nearly half</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">15K+ documents/month</div>
              <div className="csd-result-after">Processed</div>
              <div className="csd-result-label">Scalable document volume</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Audit compliance</div>
              <div className="csd-result-after">SOC2 ready</div>
              <div className="csd-result-label">Immutable audit trail for every action</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Version control</div>
              <div className="csd-result-after">Full traceability</div>
              <div className="csd-result-label">Template and clause version history</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;We went from hunting for clauses in old Word files to having a single source of
            truth. The multi-party e-signature alone eliminated two weeks per complex deal. Our
            clients trust the audit trail.&rdquo;
          </div>
          <div className="csd-quote-author">— General Counsel, Legal Services Firm</div>
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            Legal document automation is more than PDF generation. The clause library and template
            versioning were the real differentiators — lawyers needed to trust that the system
            wouldn&apos;t introduce errors or overwrite their work. We built a branching model for
            templates so edits could be reviewed before going live.
          </p>
          <p>
            DocuSign integration requires careful handling of webhooks and retries. Envelope status
            changes asynchronously — we designed our schema so the app never assumes an envelope is
            complete until we receive the webhook. Duplicate webhook delivery is handled idempotently.
          </p>
          <p>
            SOC2 compliance was baked in from the start. Every document access, template edit, and
            envelope action is logged with user ID, timestamp, and IP. Retention policies in S3
            ensure signed documents are preserved per client requirements. When auditors came, the
            data was already there.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Building a Legal Document Platform?</h2>
          <p>
            We help Legal Tech and FinTech companies build compliant document automation. Let&apos;s
            talk about your architecture.
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
