import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'Investor Communication Portal for a Real Estate Development Firm — Case Study',
  description: 'How we built a secure, role-based portal for real estate investors — with document management, project milestone tracking, capital call workflows, and automated distribution reporting across a $450M portfolio.',
  keywords: ['investor portal', 'PropTech', 'FinTech', 'document management', 'RBAC', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — PropTech Investor Communication Portal | Peregrine IT Solutions',
    description: 'How we built a secure, role-based investor portal with document management, watermarking, and automated reporting for a $450M real estate portfolio.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/proptech-investor-portal',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'PropTech Investor Portal Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — PropTech Investor Communication Portal',
    description: 'Secure investor portal with role-based access, automated watermarking, and distribution reporting for a $450M real estate portfolio.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/proptech-investor-portal' },
};

export default function PropTechInvestorPortal() {
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
            Investor Communication Portal for a <em>Real Estate Development Firm</em>
          </h1>

          <p className="csd-hero-sub">
            How we built a secure, role-based portal for real estate investors — with document
            management, project milestone tracking, capital call workflows, and automated distribution
            reporting across a $450M portfolio.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">Real Estate / Investment</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">6 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Full-Stack &middot; Security &middot; Document Management</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Markets</div>
              <div className="csd-hero-meta-value">United States &amp; Europe</div>
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
                <i className="ri-funds-box-line" style={{ fontSize: 28, color: '#fcd34d' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-file-lock-line" style={{ fontSize: 28, color: '#fcd34d' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-pie-chart-line" style={{ fontSize: 28, color: '#fcd34d' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-team-line" style={{ fontSize: 28, color: '#fcd34d' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-calendar-check-line" style={{ fontSize: 28, color: '#fcd34d' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-cloud-line" style={{ fontSize: 28, color: '#fcd34d' }} />
              </div>
            </div>
            <p>PropTech &middot; Investor Relations</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">$450M</div>
            <div className="csd-stat-label">Portfolio AUM</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">280+</div>
            <div className="csd-stat-label">Active Investors</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">99.9%</div>
            <div className="csd-stat-label">Document Delivery</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">85%</div>
            <div className="csd-stat-label">Time Saved on Reporting</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Problem</h2>
          <p>
            A real estate development firm managing a $450M portfolio across 18 active projects was
            running investor communications through email, Dropbox, and quarterly PDF reports. Limited
            partners had no self-service access to their investment documents, distribution schedules,
            or project updates. Every quarter, the IR team spent 3 weeks manually compiling reports,
            watermarking documents per investor, and sending personalized email packages to 280+
            investors.
          </p>
          <p>
            They needed a secure, investor-grade portal where LPs could log in and see their specific
            investments, download watermarked documents, track project milestones, and view distribution
            history — all with role-based access that ensured each investor only saw what they were
            entitled to see.
          </p>
        </div>

        {/* CHALLENGES */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>What Was Breaking</h2>
          <p>
            The firm&apos;s investor relations workflow was built on manual processes that couldn&apos;t
            scale with a growing portfolio and investor base.
          </p>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-mail-line" />
              </div>
              <h4>Email-Based IR Workflow</h4>
              <p>
                Quarterly reports were emailed as PDF attachments to 280+ investors. Each investor
                received different documents based on their fund participation. The IR team spent 60+
                hours per quarter just on document preparation and distribution.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-file-lock-line" />
              </div>
              <h4>No Document Security</h4>
              <p>
                Sensitive financial documents (K-1s, distribution notices, PPMs) were shared via
                Dropbox links with no access controls, no watermarking, and no audit trail. The firm
                had no way to know who had accessed what.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-team-line" />
              </div>
              <h4>Complex Role Hierarchies</h4>
              <p>
                Investors participated in different funds, co-investments, and SPVs. Each entity had
                different access rights. Some investors had family office administrators who needed
                delegate access. The permission model was genuinely complex.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-pie-chart-line" />
              </div>
              <h4>Manual Reporting</h4>
              <p>
                Distribution calculations, IRR computations, and performance metrics were done in
                Excel. Errors crept in quarterly, and investors frequently questioned numbers —
                eroding trust and creating compliance risk.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>Portal Architecture</h2>
          <p>
            We designed a document-centric architecture with granular role-based access control. Every
            document, every data point, and every page is permission-gated at the API level — not just
            the UI. The system generates investor-specific watermarked documents on the fly and
            maintains a complete audit trail of every access event.
          </p>

          <div className="csd-arch-block">
            <h3>System Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-laptop-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Investor Portal (Next.js)</div>
                  <div className="csd-arch-layer-desc">
                    Responsive dashboard with personalized views per investor. Fund performance
                    charts, document library, milestone tracker, and distribution history
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-shield-check-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">RBAC &amp; Access Control Engine</div>
                  <div className="csd-arch-layer-desc">
                    6 role types (LP, GP, Family Office Admin, Legal, Auditor, IR Team).
                    Entity-level permissions supporting fund, co-invest, and SPV participation
                    structures
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-file-lock-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Document Management System</div>
                  <div className="csd-arch-layer-desc">
                    Automated PDF watermarking with investor name and timestamp. Version control,
                    e-signature integration, and secure viewing with download restrictions where
                    configured
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">PostgreSQL + S3 Document Store</div>
                  <div className="csd-arch-layer-desc">
                    Investment data, distribution records, and capital account balances in PostgreSQL.
                    Documents stored in encrypted S3 buckets with signed URL access
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-pie-chart-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Reporting &amp; Analytics Engine</div>
                  <div className="csd-arch-layer-desc">
                    Automated quarterly report generation. IRR, equity multiple, and distribution
                    waterfall calculations. Exportable to PDF with investor-specific branding
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            The watermarking system was a key security requirement. Every document viewed or downloaded
            is automatically watermarked with the investor&apos;s name, access timestamp, and a unique
            tracking ID. This creates a forensic trail — if a confidential document leaks, the firm can
            trace exactly which investor&apos;s copy was shared, and when they accessed it.
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
              <span className="csd-tech-icon"><i className="ri-flashlight-line" /></span> Redis
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-amazon-line" /></span> AWS S3
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-quill-pen-line" /></span> DocuSign API
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-bank-card-line" /></span> Stripe
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-pie-chart-line" /></span> Chart.js
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
              <div className="csd-timeline-title">Requirements &amp; Access Modeling</div>
              <p className="csd-timeline-desc">
                Mapped the firm&apos;s fund structure, investor hierarchies, and document types.
                Designed the 6-role RBAC model with entity-level permissions. Defined the watermarking
                and audit trail specifications.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 4–12</div>
              <div className="csd-timeline-title">Core Portal &amp; Document System</div>
              <p className="csd-timeline-desc">
                Built the investor dashboard, document management system, and automated watermarking
                pipeline. Implemented PostgreSQL schema for multi-fund investment tracking with capital
                account balances.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 13–20</div>
              <div className="csd-timeline-title">Reporting Engine &amp; Integrations</div>
              <p className="csd-timeline-desc">
                Developed automated quarterly report generation with IRR and waterfall calculations.
                Integrated DocuSign for subscription documents and capital call notices. Built the
                distribution tracking and payment history views.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 21–24</div>
              <div className="csd-timeline-title">Security Audit &amp; Launch</div>
              <p className="csd-timeline-desc">
                Penetration testing and security audit. Migrated 3 years of historical documents and
                investor data. Onboarded 280+ investors with personalized welcome packages and guided
                portal walkthroughs.
              </p>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="csd-section">
          <div className="csd-section-label">Results</div>
          <h2>The Impact</h2>
          <p>
            Within the first quarter of launch, the portal eliminated the IR team&apos;s biggest
            bottleneck and transformed investor relations into a self-service experience.
          </p>

          <div className="csd-results-grid">
            <div className="csd-result-card">
              <div className="csd-result-before">Quarterly report preparation</div>
              <div className="csd-result-after">3 weeks → 2 hours</div>
              <div className="csd-result-label">85% time saved on IR reporting</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Document security</div>
              <div className="csd-result-after">Full audit trail</div>
              <div className="csd-result-label">Watermarked docs with forensic tracking</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Investor inquiries</div>
              <div className="csd-result-after">-73% reduction</div>
              <div className="csd-result-label">Self-service portal eliminates routine questions</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Capital call processing</div>
              <div className="csd-result-after">12 days → 3 days</div>
              <div className="csd-result-label">75% faster with e-signature workflow</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;Our IR team was spending three weeks every quarter just assembling and sending
            reports. Now the portal generates everything automatically, each investor sees exactly their
            data, and we have a complete audit trail. It transformed our investor relations from a
            bottleneck into a competitive advantage.&rdquo;
          </div>
          <div className="csd-quote-author">— Managing Partner, Real Estate Development Firm</div>
        </div>

        {/* KEY LEARNINGS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            Investor portals succeed or fail on the permission model. Real estate investment structures
            are complex — an investor might participate as an LP in Fund II, a co-investor in a
            specific deal, and have a family office administrator who needs read-only access to both. We
            modeled permissions at the entity level, not the user level, which made the system flexible
            enough to handle any participation structure without custom code.
          </p>
          <p>
            Automated watermarking sounds like a small feature, but it was transformative for document
            security. The firm had experienced a confidential PPM leak the year before with no way to
            trace the source. Now every document access is logged, every download is watermarked, and
            the audit trail gives the compliance team complete visibility into document distribution.
          </p>
          <p>
            The reporting engine eliminated the most painful bottleneck in the IR workflow. Distribution
            waterfall calculations, IRR computations, and performance benchmarking all run automatically
            from the source data. The quarterly report that used to take 3 weeks of manual Excel work
            now generates in under 2 hours — and the numbers are always consistent because they come
            from one system of record.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Building an Investor Portal?</h2>
          <p>
            We build secure portals, document management systems, and reporting platforms for real
            estate and investment firms. Let&apos;s discuss your investor relations needs.
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
