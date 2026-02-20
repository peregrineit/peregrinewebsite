import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'Unified Clinic Management System for a Multi-Location Healthcare Network — Case Study',
  description: 'How we built a HIPAA-compliant practice management platform — unifying patient records, telehealth, appointment scheduling, and insurance billing across 35 clinic locations.',
  keywords: ['healthcare SaaS', 'HIPAA compliant', 'telehealth', 'practice management', 'EHR', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — Multi-Location Clinic Management System | Peregrine IT Solutions',
    description: 'How we built a HIPAA-compliant practice management platform — unifying patient records, telehealth, appointment scheduling, and insurance billing across 35 clinic locations.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/multi-location-clinic-management',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'Healthcare Clinic Management Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — Multi-Location Clinic Management System',
    description: 'How we built a HIPAA-compliant platform unifying patient records, telehealth, scheduling, and billing across 35 clinics.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/multi-location-clinic-management' },
};

export default function MultiLocationClinicManagement() {
  return (
    <div className="case-study-detail csd-teal">
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
            Unified Clinic Management System for a <em>Multi-Location Healthcare Network</em>
          </h1>

          <p className="csd-hero-sub">
            How we built a HIPAA-compliant practice management platform — unifying patient records,
            telehealth, appointment scheduling, and insurance billing across 35 clinic locations.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">Healthcare / HealthTech</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">12 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Full-Stack &middot; Security &middot; Compliance</div>
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
                <i className="ri-heart-pulse-line" style={{ fontSize: 28, color: '#99f6e4' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-video-chat-line" style={{ fontSize: 28, color: '#99f6e4' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-shield-check-line" style={{ fontSize: 28, color: '#99f6e4' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-calendar-check-line" style={{ fontSize: 28, color: '#99f6e4' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-file-list-3-line" style={{ fontSize: 28, color: '#99f6e4' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-cloud-line" style={{ fontSize: 28, color: '#99f6e4' }} />
              </div>
            </div>
            <p>Healthcare SaaS &middot; HIPAA Compliant</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">35</div>
            <div className="csd-stat-label">Clinic Locations</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">120K+</div>
            <div className="csd-stat-label">Patient Records</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">99.99%</div>
            <div className="csd-stat-label">HIPAA Uptime</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">40%</div>
            <div className="csd-stat-label">Faster Billing</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Client&apos;s Vision</h2>
          <p>
            A growing healthcare network operating 35 clinics across the southeastern United States was
            struggling with a fractured technology stack. Each clinic had been acquired independently and
            brought its own EHR system, scheduling software, and billing process. Patient records
            couldn&apos;t follow patients between locations, referrals were faxed manually, and insurance
            claim denials were running at 18% because of inconsistent coding practices.
          </p>
          <p>
            They needed a single, HIPAA-compliant platform that unified patient records, standardized
            appointment scheduling, enabled telehealth visits, and automated insurance billing — all
            while meeting the strict security and audit requirements of healthcare data regulation.
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
              <h4>Fragmented Patient Records</h4>
              <p>
                35 clinics used 4 different EHR systems. When patients visited a different location,
                clinicians had no access to their history. Charts were faxed between offices, often
                arriving too late for the appointment.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-shield-check-line" />
              </div>
              <h4>HIPAA Compliance Gaps</h4>
              <p>
                No centralized audit logging. PHI was transmitted via unencrypted email. Access controls
                were inconsistent — some staff had admin access to all records regardless of their role.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-money-dollar-circle-line" />
              </div>
              <h4>Insurance Billing Failures</h4>
              <p>
                Claims were coded manually with no validation. An 18% denial rate was costing the
                network over $2.1M annually in rejected and delayed reimbursements.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-video-chat-line" />
              </div>
              <h4>No Telehealth Infrastructure</h4>
              <p>
                The COVID pivot exposed the lack of virtual care capability. Clinics were using consumer
                Zoom calls with no EHR integration, no visit documentation, and no compliant recording.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>System Architecture</h2>
          <p>
            We engineered a zero-trust healthcare platform with end-to-end encryption, role-based access
            control, and comprehensive audit logging. The architecture separates PHI storage from
            application logic with an encrypted data layer that meets HIPAA technical safeguard
            requirements.
          </p>

          <div className="csd-arch-block">
            <h3>System Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-laptop-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Clinician Portal &amp; Patient App</div>
                  <div className="csd-arch-layer-desc">
                    Next.js clinician dashboard with real-time scheduling. Patient portal for
                    appointments, telehealth, and secure messaging
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-shield-check-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Zero-Trust Security Layer</div>
                  <div className="csd-arch-layer-desc">
                    End-to-end TLS 1.3, field-level encryption for PHI, RBAC with 12 role types,
                    comprehensive audit trail for every data access
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">PostgreSQL with Encrypted PHI Store</div>
                  <div className="csd-arch-layer-desc">
                    Separate encrypted schema for protected health information. Full audit logging of
                    every read, write, and export operation
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-video-chat-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Telehealth Engine (WebRTC)</div>
                  <div className="csd-arch-layer-desc">
                    HIPAA-compliant video visits with automatic visit note generation. Integrated
                    directly into the EHR workflow — no context switching
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-file-list-3-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Claims Engine &amp; Insurance API</div>
                  <div className="csd-arch-layer-desc">
                    Automated CPT/ICD-10 code validation, real-time eligibility checks, electronic
                    claim submission with denial management workflow
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            The field-level encryption for PHI was a deliberate architectural choice. Rather than
            encrypting entire database tables, we encrypt individual fields — patient names, SSNs,
            diagnoses — with separate encryption keys. This means even if an attacker gains database
            access, they can&apos;t read PHI without the application-layer key management system.
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
              <span className="csd-tech-icon"><i className="ri-video-chat-line" /></span> WebRTC
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-amazon-line" /></span> AWS (HIPAA BAA)
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-bank-card-line" /></span> Stripe
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-link" /></span> HL7 FHIR
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
              <div className="csd-timeline-title">Compliance Audit &amp; Architecture</div>
              <p className="csd-timeline-desc">
                HIPAA gap analysis across all 35 clinics. Mapped existing EHR data models. Designed the
                zero-trust architecture with field-level encryption. Established AWS HIPAA BAA and
                security controls.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 7–20</div>
              <div className="csd-timeline-title">Core Platform &amp; Data Migration</div>
              <p className="csd-timeline-desc">
                Built the unified patient record system, appointment scheduling, and clinician portal.
                Migrated 120K+ patient records from 4 legacy EHR systems with zero data loss.
                Implemented role-based access for 12 staff types.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 21–36</div>
              <div className="csd-timeline-title">Telehealth &amp; Billing Engine</div>
              <p className="csd-timeline-desc">
                Developed the WebRTC-based telehealth system with EHR-integrated visit documentation.
                Built the claims automation engine with CPT/ICD-10 validation and real-time insurance
                eligibility checks.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 37–48</div>
              <div className="csd-timeline-title">Security Hardening &amp; Rollout</div>
              <p className="csd-timeline-desc">
                Penetration testing, HIPAA security audit, and compliance certification. Phased rollout:
                5 pilot clinics, then remaining 30 locations over 8 weeks with staff training at each
                site.
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
              <div className="csd-result-before">Insurance claim denials</div>
              <div className="csd-result-after">18% → 4.2%</div>
              <div className="csd-result-label">77% reduction saves $1.6M/year</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Patient record access</div>
              <div className="csd-result-after">Instant cross-clinic</div>
              <div className="csd-result-label">Unified records across 35 locations</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Telehealth capability</div>
              <div className="csd-result-after">2,800+ visits/month</div>
              <div className="csd-result-label">Fully HIPAA-compliant video visits</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Billing cycle time</div>
              <div className="csd-result-after">45 → 18 days</div>
              <div className="csd-result-label">40% faster insurance reimbursement</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;The insurance billing automation alone justified the entire project. We went from an
            18% denial rate to under 5%, and our revenue cycle improved by over $1.6 million annually.
            But honestly, the biggest win was giving our clinicians access to complete patient histories
            at every location.&rdquo;
          </div>
          <div className="csd-quote-author">— Chief Medical Officer</div>
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            Healthcare software projects fail when teams treat HIPAA compliance as a checkbox at the
            end. We built security into the architecture from day one — field-level encryption,
            comprehensive audit logging, and zero-trust access controls weren&apos;t features added
            later, they were foundational design decisions.
          </p>
          <p>
            The data migration from 4 legacy EHR systems was the riskiest phase. We built a dedicated
            ETL pipeline with validation rules for every field type — patient demographics, clinical
            notes, lab results, medication histories. Every record was migrated, validated, and verified
            by clinical staff before the old systems were decommissioned.
          </p>
          <p>
            The claims automation engine reduced denial rates from 18% to 4.2% not through AI magic,
            but through systematic validation. Every claim is checked against the payer&apos;s specific
            coding rules, eligibility is verified in real-time before submission, and common denial
            patterns are flagged proactively. Simple rules, applied consistently, beat manual processes
            every time.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Digitizing a Healthcare Operation?</h2>
          <p>
            We build HIPAA-compliant platforms for healthcare networks, clinics, and HealthTech
            companies. Let&apos;s talk about your compliance and architecture needs.
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
