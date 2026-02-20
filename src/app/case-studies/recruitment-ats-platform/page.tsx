import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'Recruitment ATS for Applicant Tracking & Hiring — Case Study',
  description: 'How we built a recruitment ATS platform for 200+ companies and 80K+ candidates — with resume parsing, interview scheduling, candidate pipelines, and 65% time-to-hire reduction.',
  keywords: ['recruitment ATS', 'applicant tracking', 'HR tech', 'hiring', 'SaaS', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — Recruitment ATS for Applicant Tracking & Hiring | Peregrine IT Solutions',
    description: 'How we built a recruitment ATS for 200+ companies and 80K+ candidates with Elasticsearch and Calendly integration.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/recruitment-ats-platform',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'Recruitment ATS Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — Recruitment ATS for Applicant Tracking & Hiring',
    description: 'Recruitment ATS for 200+ companies and 80K+ candidates with 65% time-to-hire reduction.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/recruitment-ats-platform' },
};

export default function RecruitmentAtsPlatform() {
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
            Recruitment ATS for <em>Applicant Tracking &amp; Hiring</em>
          </h1>

          <p className="csd-hero-sub">
            How we built a recruitment ATS platform for 200+ companies and 80K+ candidates — with
            resume parsing, interview scheduling, candidate pipelines, and 65% time-to-hire reduction.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">HR Tech / SaaS</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">8 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Full-Stack &middot; Elasticsearch &middot; Calendly</div>
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
                <i className="ri-user-search-line" style={{ fontSize: 28, color: '#2dd4bf' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-file-search-line" style={{ fontSize: 28, color: '#2dd4bf' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-calendar-check-line" style={{ fontSize: 28, color: '#2dd4bf' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-flow-chart-line" style={{ fontSize: 28, color: '#2dd4bf' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-building-line" style={{ fontSize: 28, color: '#2dd4bf' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-mail-send-line" style={{ fontSize: 28, color: '#2dd4bf' }} />
              </div>
            </div>
            <p>Resume Parsing &middot; Pipeline &middot; Employer Brand</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">200+</div>
            <div className="csd-stat-label">Companies</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">80K+</div>
            <div className="csd-stat-label">Candidates</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">65%</div>
            <div className="csd-stat-label">Time-to-Hire Reduction</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">Elasticsearch</div>
            <div className="csd-stat-label">Resume Search</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Client&apos;s Vision</h2>
          <p>
            A staffing and recruitment SaaS serving 200+ SMB and mid-market companies was drowning in
            spreadsheets and email. Recruiters manually screened resumes, copied candidate details into
            ATS fields, and coordinated interviews via back-and-forth emails. Time-to-hire averaged
            35 days.
          </p>
          <p>
            They wanted a modern ATS where resumes could be parsed automatically, candidates
            searchable by skills and experience, interview scheduling handled via Calendly, and
            pipeline stages customizable per company — with strong employer branding on career pages.
          </p>
        </div>

        {/* CHALLENGES */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>What Was Breaking</h2>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-file-search-line" />
              </div>
              <h4>Resume Parsing</h4>
              <p>
                Resumes arrived as PDFs and Word files in every format imaginable. Manual data entry
                took 10–15 minutes per candidate. Typos and inconsistent naming caused duplicate
                records and missed matches.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-calendar-check-line" />
              </div>
              <h4>Interview Scheduling</h4>
              <p>
                Coordinating 3–5 interview rounds across multiple calendars was a nightmare.
                Recruiters sent Doodle polls and email chains. No-shows and double-bookings were
                common. Candidates dropped out from frustration.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-flow-chart-line" />
              </div>
              <h4>Candidate Pipeline</h4>
              <p>
                Each company had different stages — Applied, Phone Screen, Technical, Offer, etc.
                The old system used a single rigid pipeline. Drag-and-drop was slow. Bulk actions
                (reject, move) didn&apos;t exist.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-building-line" />
              </div>
              <h4>Employer Branding</h4>
              <p>
                Career pages looked generic. Companies wanted custom domains, branded application
                flows, and integration with their website. The old system offered only white-label
                URLs.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>The Architecture We Built</h2>
          <p>
            We built a multi-tenant ATS with resume parsing via document extraction, Elasticsearch
            for full-text search, and Calendly API for interview scheduling. Pipelines are
            configurable per company. Career pages support custom branding and domains. SendGrid
            powers candidate and interviewer emails.
          </p>

          <div className="csd-arch-block">
            <h3>System Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-window-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Next.js Recruiter Portal &amp; Career Pages</div>
                  <div className="csd-arch-layer-desc">
                    Kanban pipeline, candidate profiles, and job board. White-label career pages with
                    custom branding and application form
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
                    Multi-tenant isolation — each company&apos;s data is separated. Role-based access
                    for recruiters, hiring managers, and admins
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">PostgreSQL — Candidates, Jobs &amp; Pipelines</div>
                  <div className="csd-arch-layer-desc">
                    Jobs, applications, pipeline stages, and interview slots. Parsed resume data and
                    activity history per candidate
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-search-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Elasticsearch — Resume &amp; Job Search</div>
                  <div className="csd-arch-layer-desc">
                    Full-text search on skills, experience, education. Faceted filters for location,
                    salary, and job type. Real-time index updates
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-mail-send-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">SendGrid &amp; Calendly API Integration</div>
                  <div className="csd-arch-layer-desc">
                    Transactional emails for applications and interview invites. Calendly API for
                    scheduling links and availability sync
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            Resume parsing uses a hybrid approach — we extract text from PDFs and Word via libraries,
            then apply regex and NLP patterns for name, email, phone, skills, and experience. We
            store structured data in PostgreSQL and sync to Elasticsearch for search. Parsing
            accuracy improved from 60% to 92% with iterative refinement.
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
              <span className="csd-tech-icon"><i className="ri-search-line" /></span> Elasticsearch
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-mail-send-line" /></span> SendGrid
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-calendar-line" /></span> Calendly API
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-file-text-line" /></span> Resume Parsing
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-building-line" /></span> Multi-Tenant
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
                Mapped recruiter workflows across 20 pilot companies. Designed multi-tenant schema
                with company isolation. Defined pipeline stage and job models.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 4–14</div>
              <div className="csd-timeline-title">Core ATS &amp; Resume Parsing</div>
              <p className="csd-timeline-desc">
                Built job posting, application, and pipeline modules. Implemented resume parsing with
                PDF/Word extraction. Indexed candidates in Elasticsearch with full-text search.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 15–24</div>
              <div className="csd-timeline-title">Calendly &amp; Career Pages</div>
              <p className="csd-timeline-desc">
                Integrated Calendly API for scheduling links. Built branded career pages with custom
                domains. Implemented SendGrid email templates for applications and interviews.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 25–32</div>
              <div className="csd-timeline-title">Pipeline Customization &amp; Rollout</div>
              <p className="csd-timeline-desc">
                Added configurable pipeline stages per company. Implemented bulk actions and
                analytics. Migrated 200+ companies with historical data. Trained recruiters and
                measured time-to-hire.
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
              <div className="csd-result-before">35 days time-to-hire</div>
              <div className="csd-result-after">65% reduction</div>
              <div className="csd-result-label">Faster scheduling and pipeline visibility</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">200+ companies</div>
              <div className="csd-result-after">On platform</div>
              <div className="csd-result-label">Multi-tenant ATS with custom pipelines</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">80K+ candidates</div>
              <div className="csd-result-after">Searchable</div>
              <div className="csd-result-label">Elasticsearch full-text and faceted search</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Manual resume entry</div>
              <div className="csd-result-after">92% parsed</div>
              <div className="csd-result-label">Automated extraction and structuration</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;The resume parsing alone saves our recruiters hours every day. We went from
            searching through email to having a searchable talent pool. Calendly integration
            eliminated the scheduling chaos.&rdquo;
          </div>
          <div className="csd-quote-author">— Head of Talent, Staffing Company</div>
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            Resume parsing is hard — PDFs and Word files have inconsistent layouts. We focused on
            extracting the high-value fields (name, email, phone, skills, experience) and accepted
            that some fields might be wrong. Recruiters can correct parsed data; we learn from
            corrections over time.
          </p>
          <p>
            Elasticsearch made candidate search transformative. Recruiters can find &ldquo;React
            developers with 5+ years in fintech&rdquo; in seconds. We use synonym expansion for
            skills (e.g., &ldquo;JS&rdquo; maps to &ldquo;JavaScript&rdquo;) and faceted filters for
            location and salary. Index updates are near real-time.
          </p>
          <p>
            Calendly API integration was straightforward — we create scheduling links per
            interview round and pass candidate context via custom questions. The tricky part was
            handling cancellations and rescheduling. We sync Calendly webhooks to update our
            interview records. No-shows are tracked and flagged for follow-up.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Building a Recruitment ATS?</h2>
          <p>
            We help HR Tech companies build production-grade ATS platforms. Let&apos;s talk about your
            architecture.
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
