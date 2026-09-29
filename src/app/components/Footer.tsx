'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { QuickProjectForm, StrategyCallForm } from './LeadForms';
import { officeAddressLine, officeMapsUrl } from '@/data/company';

export default function Footer() {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    services: false,
    industries: false,
    company: false,
    contact: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };


  useEffect(() => {
    const popup = document.getElementById('contact-popup');
    const qpPopup = document.getElementById('quick-project-popup');
    const open = (el: HTMLElement | null) => {
      if (!el) return;
      el.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
    const close = (el: HTMLElement | null) => {
      if (!el) return;
      el.classList.remove('active');
      document.body.style.overflow = '';
    };

    // Delegated so buttons on pages reached by client-side navigation also work.
    const CONTACT_TRIGGERS = '#lets-talk-btn, [data-open-contact]';
    const QUICK_TRIGGERS = '[data-open-quick-project], #quick-project-btn, #quick-project-btn-footer, #quick-project-btn-footer-col';
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      if (target.closest(CONTACT_TRIGGERS)) {
        e.preventDefault();
        open(popup);
      } else if (target.closest(QUICK_TRIGGERS)) {
        e.preventDefault();
        open(qpPopup);
      } else if (target.closest('#close-popup') || target === popup) {
        close(popup);
      } else if (target.closest('#close-quick-popup') || target === qpPopup) {
        close(qpPopup);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <div data-w-id="53aec337-cf60-1ff7-e4d7-85a8a4b6c559" className="footer-section bg-white text-gray-900" style={{ backgroundColor: '#ffffff !important', color: '#111827 !important' }}>
        <div className="dfs-container-1" style={{ backgroundColor: '#ffffff' }}>
          <div className="dfs-wrap-1" style={{ backgroundColor: '#ffffff' }}>
            <div className="dfs-wrap-2" style={{ backgroundColor: '#f9fafb', padding: '1.5rem 2rem', gap: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <a href="#" className="dfs-wrap-3 w-inline-block" style={{ marginBottom: '0.5rem' }}><Image
                style={{ WebkitTransform: 'scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }}
                alt="Peregrine Logo" src="/images/peregrine-logo.png" width={1024} height={180} sizes="192px" className="dfs-logo-1" /></a>

              <div className="dfs-wrap-4" style={{ marginTop: '0', marginBottom: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{ WebkitTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', color: '#4b5563', fontSize: '0.9rem', marginBottom: '0.75rem', textAlign: 'center' }}
                  className="dfs-text-1">Engineering partner for SaaS &amp; platform companies.</div>

                <a
                  href="https://calendly.com/mukesh-peregrine-it/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    WebkitTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                    MozTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                    msTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                    transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                    display: 'inline-block',
                    padding: '12px 24px',
                    backgroundColor: '#0e7490',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginTop: '0'
                  }}
                  className="hover:bg-cyan-800"
                >
                  Book a Strategy Call &rarr;
                </a>
                <a href="#" id="quick-project-btn-footer" style={{ color: '#0e7490', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block', textDecoration: 'none' }}>Have a smaller task? Submit a quick request &rarr;</a>

              </div>
            </div>
            <div className="dfs-wrap-6" style={{ backgroundColor: '#ffffff' }}>
              <div
                style={{ WebkitTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }}
                className="dfs-grid-1">
                <div className="dfs-wrap-7 footer-section-item">
                  <div className="footer-section-header" onClick={() => toggleSection('services')}>
                    <h2 className="dfs-heading-1" style={{ color: '#111827', fontSize: '1.15em', fontWeight: '700', marginBottom: '0.75rem' }}>Services</h2>
                    <button className="footer-accordion-btn" aria-label="Toggle services">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s', transform: expandedSections.services ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>
                  <div className={`footer-section-content ${expandedSections.services ? 'expanded' : ''}`}>
                    <Link href="/services/saas-development" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>SaaS Development</Link>
                    <Link href="/services/api-integration" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>API Integration</Link>
                    <Link href="/services/mls-idx-integration" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>MLS &amp; IDX Integration</Link>
                    <Link href="/services/ai-automation" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>AI Automation</Link>
                    <Link href="/services/cloud-devops" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>Cloud &amp; DevOps</Link>
                    <Link href="/services/odoo-erp" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>Odoo ERP</Link>
                    <Link href="/services" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>All Services</Link>
                  </div>
                </div>
                <div className="dfs-wrap-7 footer-section-item">
                  <div className="footer-section-header" onClick={() => toggleSection('industries')}>
                    <h2 className="dfs-heading-1" style={{ color: '#111827', fontSize: '1.15em', fontWeight: '700', marginBottom: '0.75rem' }}>Industries</h2>
                    <button className="footer-accordion-btn" aria-label="Toggle industries">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s', transform: expandedSections.industries ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>
                  <div className={`footer-section-content ${expandedSections.industries ? 'expanded' : ''}`}>
                    <Link href="/industries/real-estate" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>Real Estate Platforms &amp; CRMs</Link>
                    <a href="/#sec-logistics" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>Marketplaces &amp; Portals</a>
                    <a href="/#sec-logistics" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>Logistics &amp; Operations Systems</a>
                    <a href="/#sec-logistics" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>Data-Heavy SaaS Products</a>
                  </div>
                </div>
                <div className="dfs-wrap-7 footer-section-item">
                  <div className="footer-section-header" onClick={() => toggleSection('company')}>
                    <h2 className="dfs-heading-1" style={{ color: '#111827', fontSize: '1.15em', fontWeight: '700', marginBottom: '0.75rem' }}>Company</h2>
                    <button className="footer-accordion-btn" aria-label="Toggle company">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s', transform: expandedSections.company ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>
                  <div className={`footer-section-content ${expandedSections.company ? 'expanded' : ''}`}>
                    <Link href="/about" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>About Us</Link>
                    <Link href="/case-studies" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>Case Studies</Link>
                    <Link href="/industries" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>Industries</Link>
                    <Link href="/contact" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>Contact</Link>
                    <Link href="/blog" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>Guides</Link>
                    <a href="https://calendly.com/mukesh-peregrine-it/30min" target="_blank" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>Careers</a>
                    <a href="https://share.google.com/DOm7mkXoRAN5u1mWi" target="_blank" rel="noopener noreferrer" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>Testimonials</a>
                  </div>
                </div>
                <div id="w-node-_53aec337-cf60-1ff7-e4d7-85a8a4b6c583-098fe091" className="dfs-wrap-7 footer-section-item">
                  <div className="footer-section-header" onClick={() => toggleSection('contact')}>
                    <h2 className="dfs-heading-1" style={{ color: '#111827', fontSize: '1.15em', fontWeight: '700', marginBottom: '0.75rem' }}>Get In Touch</h2>
                    <button className="footer-accordion-btn" aria-label="Toggle contact">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s', transform: expandedSections.contact ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>
                  <div className={`footer-section-content ${expandedSections.contact ? 'expanded' : ''}`}>
                    <a href="https://calendly.com/mukesh-peregrine-it/30min" target="_blank" className="dfs-link-1-cta" style={{ color: '#0e7490', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>Book a Strategy Call</a>
                    <a href="#" id="quick-project-btn-footer-col" className="dfs-link-1" style={{ color: '#4b5563', fontSize: '0.95em', display: 'block', marginTop: '0.4rem' }}>Small task? Get a scoped estimate within 48 hours</a>
                    <p style={{ color: '#6b7280', fontSize: '0.78em', marginTop: '0.6rem', lineHeight: '1.5' }}>Real engineers reply — not sales</p>
                    <p style={{ color: '#6b7280', fontSize: '0.78em', marginTop: '0.15rem', lineHeight: '1.5' }}>Daily overlap with North American &amp; European business hours</p>
                    <p style={{ color: '#6b7280', fontSize: '0.78em', marginTop: '0.15rem', lineHeight: '1.5' }}>Technical conversations are with engineers, not sales</p>
                    <address style={{ color: '#6b7280', fontSize: '0.78em', marginTop: '0.6rem', lineHeight: '1.5', fontStyle: 'normal' }}>
                      <a href={officeMapsUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280' }}>{officeAddressLine}</a>
                    </address>
                  </div>
                </div>
              </div>
              <div style={{WebkitTransform: 'translate3d(0, 12px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0, 12px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0, 12px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0, 12px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '0.5rem'}} className="dfs-wrap-8">
                <a href="https://www.facebook.com/peregrineitsolution" target="_blank" rel="noopener noreferrer" className="social-link w-inline-block" aria-label="Facebook">
                  <svg width="20" height="20" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="social-link w-inline-block" aria-label="YouTube">
                  <svg width="20" height="20" fill="#FF0000" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="#" className="social-link w-inline-block" aria-label="X">
                  <svg width="20" height="20" fill="#000000" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/peregrine-it-solutions/" target="_blank" rel="noopener noreferrer" className="social-link w-inline-block" aria-label="LinkedIn">
                  <svg width="20" height="20" fill="#0A66C2" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://www.instagram.com/peregrineitsolution/" target="_blank" rel="noopener noreferrer" className="social-link w-inline-block" aria-label="Instagram">
                  <svg width="20" height="20" fill="#E4405F" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 1 1-2.882 0 1.441 1.441 0 0 1 2.882 0z"/></svg>
                </a>
              </div>

            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-200 bg-gray-50 py-3">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="text-sm" style={{ color: '#374151' }}>
                Copyright {new Date().getFullYear()}© Peregrine-it.com | All Rights Reserved
              </div>
              <div className="flex items-center gap-4 text-sm">
                <a href="#" style={{ color: '#374151', fontWeight: '500' }} className="footer-legal-link hover:text-cyan-600 transition-colors">Sitemap</a>
                <Link href="/privacy-policy" style={{ color: '#374151', fontWeight: '500' }} className="footer-legal-link hover:text-cyan-600 transition-colors">Privacy Policy</Link>
                <Link href="/terms-of-use" style={{ color: '#374151', fontWeight: '500' }} className="footer-legal-link hover:text-cyan-600 transition-colors">Terms of Use</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="contact-popup" className="popup-overlay">
        <div className="popup-content">
          <div className="popup-header">
            <h2>Tell Us About Your Project</h2>
            <button id="close-popup" className="close-btn">&times;</button>
          </div>
          <div className="popup-body">
            <StrategyCallForm />
          </div>
        </div>
      </div>

      <div id="quick-project-popup" className="popup-overlay">
        <div className="popup-content">
          <div className="popup-header">
            <h2>Request a Quick Project Quote</h2>
            <button id="close-quick-popup" className="close-btn">&times;</button>
          </div>
          <div className="popup-body">
            <QuickProjectForm />
          </div>
        </div>
      </div>
    </>
  );
}
