
'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Script from 'next/script'; // Ensure Script is available if we use it, though we stripped scripts
import Link from 'next/link';

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Peregrine IT Solutions",
      url: "https://peregrine-it.com",
      logo: "https://peregrine-it.com/og.png",
      description:
        "Peregrine IT builds scalable SaaS platforms, API integrations, automation systems and high-performance software infrastructure for startups and enterprises.",
      sameAs: [],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "info@peregrine-it.com",
        availableLanguage: "English",
      },
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Place", name: "Europe" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
    },
    {
      "@type": "ProfessionalService",
      name: "Peregrine IT Solutions",
      url: "https://peregrine-it.com",
      logo: "https://peregrine-it.com/og.png",
      description:
        "Peregrine IT builds scalable SaaS platforms, API integrations, automation systems and high-performance software infrastructure for startups and enterprises.",
      serviceType: [
        "SaaS Development",
        "API Integration",
        "Automation Engineering",
        "Platform Modernization",
        "Cloud Infrastructure",
      ],
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Place", name: "Europe" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "info@peregrine-it.com",
        availableLanguage: "English",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "When should a company hire a software development partner instead of employees?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "When you need to ship product fast without the 3\u20136 month hiring cycle. A development partner gives you an experienced, ready-to-deploy engineering team that scales with your roadmap. It\u2019s ideal when you need specialized skills like SaaS architecture, API integrations, or cloud infrastructure without long-term overhead.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to build a SaaS platform?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A production-ready MVP typically takes 8\u201314 weeks. This covers core features, authentication, billing, multi-tenancy, and deployment. We deliver working software every two weeks through sprint-based execution. More complex platforms with advanced integrations may take 4\u20136 months.",
          },
        },
        {
          "@type": "Question",
          name: "Can legacy systems be modernized without downtime?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We use incremental migration strategies \u2014 wrapping legacy APIs, migrating data in stages, and gradually routing traffic to new services. Your existing system stays live throughout the process. We\u2019ve modernized monolithic applications into cloud-native architectures without any business disruption.",
          },
        },
        {
          "@type": "Question",
          name: "What industries does Peregrine IT specialize in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We work with SaaS companies, real estate technology platforms, healthcare IT, fintech, logistics, and e-commerce. Our focus is product engineering \u2014 building scalable web applications, automation systems, and platform integrations using Node.js, React, Python, AWS, Azure, and modern DevOps practices.",
          },
        },
        {
          "@type": "Question",
          name: "How do API integrations improve operations?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "APIs connect your CRM, ERP, billing, and third-party tools into a single automated workflow. This eliminates manual data entry, reduces errors, and lets you scale operations without adding headcount. We build integrations with platforms like Stripe, HubSpot, Salesforce, and custom internal systems.",
          },
        },
      ],
    },
  ],
};

// Import extracted CSS
import './css/index-extracted.css'; // This will be replaced
import './css/marquee-fix.css'; // Fix for oversized decorative elements in tech section
import './css/lean-animation.css'; // Animation for LEAN Principles vertical scrolling text

export default function Home() {

  useEffect(() => {
    // Category filter logic (specific to case-studies)
    const buttons = document.querySelectorAll('.category-btn');
    const articles = document.querySelectorAll('.article-card');
    if (buttons.length > 0) {
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          const category = button.getAttribute('data-category');
          buttons.forEach((btn: any) => btn.className = 'category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white border border-white/5 hover:border-white/10');
          button.className = 'category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-cyan-600 text-white shadow-lg shadow-cyan-500/20';
          articles.forEach((article: any) => {
            if (category === 'all' || article.getAttribute('data-category') === category) {
              article.style.display = '';
              article.style.opacity = '0';
              setTimeout(() => article.style.opacity = '1', 50);
            } else {
              article.style.display = 'none';
            }
          });
        });
      });
    }

  }, []);



  return (
    <div className="page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Start Migrated Content */}

      <div className="body">
        <section id="sec-hero" data-w-id="b9726cc1-f3ba-3db9-8b83-e79b6286ceea" className="section-hero"><svg
          viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor"
          className="section-divider-bae_divider_1723811974442"><svg viewBox="0 0 1200 120" preserveAspectRatio="none"
            fill="currentColor" className="section-divider-bae_divider_1723812248319">
            <path d="M 0, -10 V 7.23 C 0,65.52 268.63,112.77 600,112.77 S 1200,65.52 1200,7.23 V -10 Z"></path>
          </svg>
          <path d="M 0 -10 L 0 0 C 0 0 0 0 0 0 C 400 0 800 27.58 1200 27.58 L 1200 0 L 1200 -10 Z"></path>
        </svg>
          <div className="hero-content-container">
            <div className="hero-title txtanimation3">
              We Build the{' '}
              <span style={{ display: 'inline-block', padding: '4px 16px', border: '2px solid #06b6d4', color: '#22d3ee !important', borderRadius: '8px', fontWeight: 'bold', margin: '0 4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} className="highlighted-word">Systems</span>{' '}
              Behind{' '}
              <span style={{ display: 'inline-block', padding: '4px 16px', border: '2px solid #9333ea', color: '#a855f7 !important', borderRadius: '8px', fontWeight: 'bold', margin: '0 4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} className="highlighted-word">Scalable</span>{' '}
              Products
            </div>
            <div data-w-id="b9726cc1-f3ba-3db9-8b83-e79b6286cef0"
              style={{ WebkitTransform: 'translate3d(0, -16px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0, -16px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0, -16px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0, -16px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }}
              className="hero-sub">We architect, build, and scale the platforms, integrations, and infrastructure that ambitious companies depend on.</div>

          </div>
          <div data-w-id="b9726cc1-f3ba-3db9-8b83-e79b6286cef2"
            style={{ WebkitTransform: 'translate3d(0, -16px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0, -16px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0, -16px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0, -16px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }}
            className="hero-cta-container">
            <div className="text-wrapper">
              <div className="scramble-text text-size-xl text-weight-light">SaaS · Integrations · AI · DevOps</div>
            </div>
            <div className="text-block"><strong>Engineering partner for teams that ship.</strong></div>
            <div className="ctas-wrapper">
              <a href="#sec-CTA" className="cta-primary w-inline-block">
                <div className="cta-label">Book a Strategy Call</div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="svg-icon-button">
                  <path d="m6 17 5-5-5-5"></path>
                  <path d="m13 17 5-5-5-5"></path>
                </svg>
              </a>
              <div className="w-layout-hflex secondary-actions">
                <a href="#sec-service" className="hero-link w-inline-block">
                  <div>Our Services</div>
                </a>
                <a href="#sec-process" className="hero-link w-inline-block">
                  <div>How We Work</div>
                </a>
              </div>
            </div>
          </div>
          <div className="marquee gap-8">
            <div className="marquee-content scroll gap-8">
              <img loading="eager" src="/images/n8n.svg" alt="n8n" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/odoo.svg" alt="Odoo" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/nextjs.svg" alt="Next.js" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/react.svg" alt="React" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/docker.svg" alt="Docker" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/aws.svg" alt="AWS" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/supabase.svg" alt="Supabase" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/python.svg" alt="Python" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/typescript.svg" alt="TypeScript" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/tailwindcss.svg" alt="Tailwind CSS" className="marquee-image h-[45px] w-auto" />

              <img loading="eager" src="/images/js.svg" alt="JavaScript" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/swift.svg" alt="Swift" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/CSS.svg" alt="CSS" className="marquee-image h-[45px] w-auto" />

            </div>
            <div className="marquee-content scroll gap-8" aria-hidden="true">
              <img loading="eager" src="/images/n8n.svg" alt="n8n" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/odoo.svg" alt="Odoo" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/nextjs.svg" alt="Next.js" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/react.svg" alt="React" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/docker.svg" alt="Docker" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/aws.svg" alt="AWS" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/supabase.svg" alt="Supabase" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/python.svg" alt="Python" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/typescript.svg" alt="TypeScript" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/tailwindcss.svg" alt="Tailwind CSS" className="marquee-image h-[45px] w-auto" />

              <img loading="eager" src="/images/js.svg" alt="JavaScript" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/swift.svg" alt="Swift" className="marquee-image h-[45px] w-auto" />
              <img loading="eager" src="/images/CSS.svg" alt="CSS" className="marquee-image h-[45px] w-auto" />

            </div>
            <div className="w-embed">

            </div>
          </div>
          <div
            data-poster-url="https://uploads-ssl.webflow.com/66b50d9ad39e4c82098fe099%2F66c8bf45926796e0b4248dbd_hero-LINESupdated-poster-00001.jpg"
            data-video-urls="https://uploads-ssl.webflow.com/66b50d9ad39e4c82098fe099%2F66c8bf45926796e0b4248dbd_hero-LINESupdated-transcode.mp4,https://uploads-ssl.webflow.com/66b50d9ad39e4c82098fe099%2F66c8bf45926796e0b4248dbd_hero-LINESupdated-transcode.webm"
            data-autoplay="true" data-loop="true" data-wf-ignore="true"
            className="hero-video w-background-video w-background-video-atom"><video
              id="a03dd132-464c-ac5b-6de7-ef4113ef23f2-video" autoPlay loop
              style={{ backgroundImage: 'url(\'https://uploads-ssl.webflow.com/66b50d9ad39e4c82098fe099%2F66c8bf45926796e0b4248dbd_hero-LINESupdated-poster-00001.jpg\')' }}
              muted playsInline data-wf-ignore="true" data-object-fit="cover">
              <source
                src="https://uploads-ssl.webflow.com/66b50d9ad39e4c82098fe099%2F66c8bf45926796e0b4248dbd_hero-LINESupdated-transcode.mp4"
                data-wf-ignore="true" />
              <source
                src="https://uploads-ssl.webflow.com/66b50d9ad39e4c82098fe099%2F66c8bf45926796e0b4248dbd_hero-LINESupdated-transcode.webm"
                data-wf-ignore="true" />
            </video></div>
        </section>
        <section id="sec-service" className="section dark !pt-12 !pb-16"><svg viewBox="0 0 1200 120" preserveAspectRatio="none"
          fill="currentColor" className="section-divider-bae_divider_1723820093757">
          <path d="M 0, -10 V 7.23 C 0,65.52 268.63,112.77 600,112.77 S 1200,65.52 1200,7.23 V -10 Z"></path>
        </svg>
          <div className="container">
            <div className="header-title-img-wrap"><img src="/images/lap-mock.png" loading="lazy" width="462"
              sizes="(max-width: 767px) 93vw, 500px" alt=""
              srcSet="/images/lap-mock-p-500.png 500w, /images/lap-mock.png 800w" className="img-main" />
              <div className="w-layout-vflex content-wrap">
                <h1 className="heading-primary gradient">Built for Scale. Architected for Complexity.</h1>
                <div className="section-sub">From early-stage platforms to enterprise infrastructure — we architect, build, and scale the systems that power your business.</div>
                <a href="#sec-CTA" className="cta-primary dark w-inline-block">
                  <div className="cta-label">Get a Free Consultation</div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="svg-icon-button">
                    <path d="m6 17 5-5-5-5"></path>
                    <path d="m13 17 5-5-5-5"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="css w-embed">

            </div>
            <div className="grid">
              <div className="grid__item">
                <a href="#" className="grid__item-img w-inline-block" aria-label="Learn more about Product Architecture & Prototyping">
                  <div className="iconx_component">
                    <div className="iconx_screen is-radar">
                      <div className="iconx_radar">
                        <div className="iconx_radar-circle is-6th"></div>
                        <div className="iconx_radar-circle is-5th"></div>
                        <div className="iconx_radar-circle is-dark"></div>
                        <div className="iconx_radar-circle is-3rd"></div>
                        <div className="iconx_radar-circle is-2nd"></div>
                        <div className="iconx_radar-circle"></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item-img-deco"></div>
                  <div className="grid__item-img-overlay"></div>
                </a>
                <p className="card-title">Product Architecture & Prototyping</p>
                <p id="w-node-_7dd46aa2-f506-0765-d688-e7b6b33bba18-098fe091" className="card-caption">From concept validation to production-ready architecture — technical scoping, system design, and a working prototype tested with real users.</p>
                <div id="w-node-d4142ec9-974a-0ed0-2121-2b7ac109a48d-098fe091" className="w-layout-vflex check-list-wrapper">
                  <div id="w-node-d4142ec9-974a-0ed0-2121-2b7ac109a493-098fe091"
                    className="w-layout-hflex check-list-item anim01"><svg viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                        fill="currentColor"></path>
                    </svg>
                    <p id="w-node-d4142ec9-974a-0ed0-2121-2b7ac109a496-098fe091" className="card-caption">Technical scoping</p>
                  </div>
                  <div id="w-node-d4142ec9-974a-0ed0-2121-2b7ac109a498-098fe091"
                    className="w-layout-hflex check-list-item anim02"><svg viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                        fill="currentColor"></path>
                    </svg>
                    <p id="w-node-d4142ec9-974a-0ed0-2121-2b7ac109a49b-098fe091" className="card-caption">Architecture design</p>
                  </div>
                  <div className="w-layout-hflex check-list-item anim03"><svg viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                      fill="currentColor"></path>
                  </svg>
                    <p id="w-node-efd1050a-55a0-40ec-533b-fee9457c44a9-098fe091" className="card-caption">Prototype & validation</p>
                  </div>
                </div>
              </div>
              <div id="w-node-_0f6253c9-ec94-a38c-1516-7c75675ef41d-098fe091" className="grid__item">
                <a href="#" className="grid__item-img w-inline-block" aria-label="Learn more about SaaS & Platform Engineering">
                  <div id="w-node-_0f6253c9-ec94-a38c-1516-7c75675ef41f-098fe091" className="iconx_component">
                    <div data-w-id="0f6253c9-ec94-a38c-1516-7c75675ef420" className="iconx_screen is-speaker">
                      <div className="loader_component">
                        <div className="loader_inside"></div>
                        <div className="loader_dot"></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item-img-deco"></div>
                  <div className="grid__item-img-overlay"></div>
                </a>
                <p className="card-title">SaaS & Platform Engineering</p>
                <p id="w-node-_056cfeaf-ed64-eafb-044a-bb3bf2a25722-098fe091" className="card-caption">Multi-tenant SaaS, marketplaces, and portals — architected for scale from day one. Production-ready platforms shipped in 8–12 weeks.</p>
                <div className="w-layout-vflex check-list-wrapper">
                  <div className="w-layout-hflex check-list-item anim01"><svg viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                      fill="currentColor"></path>
                  </svg>
                    <p id="w-node-_352fcf59-27bf-8e64-142f-ae2d8e92e34e-098fe091" className="card-caption">Multi-tenant architecture</p>
                  </div>
                  <div id="w-node-_6d708289-ec66-89c1-3d6e-25fcdef0d93b-098fe091"
                    className="w-layout-hflex check-list-item anim02"><svg viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                        fill="currentColor"></path>
                    </svg>
                    <p id="w-node-_6d708289-ec66-89c1-3d6e-25fcdef0d93e-098fe091" className="card-caption">API-first design
                    </p>
                  </div>
                  <div id="w-node-_072f1d33-3c49-0b96-6010-0933db10fd29-098fe091"
                    className="w-layout-hflex check-list-item anim03"><svg viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                        fill="currentColor"></path>
                    </svg>
                    <p id="w-node-_072f1d33-3c49-0b96-6010-0933db10fd2c-098fe091" className="card-caption">Auth, billing & infra</p>
                  </div>
                </div>
              </div>
              <div id="w-node-ec268015-87b7-7bec-e74d-d8b979ff626c-098fe091" className="grid__item">
                <a href="#" className="grid__item-img w-inline-block" aria-label="Learn more about Systems Integration & Data Pipelines">
                  <div className="iconx_component">
                    <div className="iconx_top-bar-wrap">
                      <div className="iconx_tip-bar">
                        <div className="iconx_dot"></div>
                        <div className="iconx_dot"></div>
                        <div className="iconx_dot"></div>
                      </div>
                    </div>
                    <div className="iconx_screen">
                      <div className="iconx_dev-screen">
                        <div className="code is-start">&gt;</div>
                        <div id="typetxt-1" className="code typing-terminal"></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item-img-deco"></div>
                  <div className="grid__item-img-overlay"></div>
                </a>
                <p className="card-title">Systems Integration & Data Pipelines</p>
                <p id="w-node-_34f07b00-4c15-0a1f-6271-0d5073194765-098fe091" className="card-caption">ERP integrations, API layers, and data pipelines that connect disparate systems and eliminate manual data entry across your organization.</p>
                <div id="w-node-ab1b055a-ae3b-edff-fc0e-30c0e0d96432-098fe091" className="w-layout-vflex check-list-wrapper">
                  <div className="w-layout-hflex check-list-item anim01"><svg viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                      fill="currentColor"></path>
                  </svg>
                    <p id="w-node-ab1b055a-ae3b-edff-fc0e-30c0e0d96436-098fe091" className="card-caption">Complex integrations</p>
                  </div>
                  <div id="w-node-ab1b055a-ae3b-edff-fc0e-30c0e0d96438-098fe091"
                    className="w-layout-hflex check-list-item anim02"><svg viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                        fill="currentColor"></path>
                    </svg>
                    <p id="w-node-ab1b055a-ae3b-edff-fc0e-30c0e0d9643b-098fe091" className="card-caption">Data pipelines & ETL</p>
                  </div>
                  <div id="w-node-ab1b055a-ae3b-edff-fc0e-30c0e0d9643d-098fe091"
                    className="w-layout-hflex check-list-item anim03"><svg viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                        fill="currentColor"></path>
                    </svg>
                    <p id="w-node-ab1b055a-ae3b-edff-fc0e-30c0e0d96440-098fe091" className="card-caption">API design & middleware</p>
                  </div>
                  <div id="w-node-b0ce5084-ad54-9fc1-7be6-3e77334189e6-098fe091"
                    className="w-layout-hflex check-list-item anim04"><svg viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                        fill="currentColor"></path>
                    </svg>
                    <p id="w-node-b0ce5084-ad54-9fc1-7be6-3e77334189e9-098fe091" className="card-caption">Quality Assurance</p>
                  </div>
                </div>
              </div>
              <div id="w-node-_11afe82e-c384-13e8-e364-3e6e558d1844-098fe091" className="grid__item">
                <a href="#" className="grid__item-img w-inline-block" aria-label="Learn more about Cloud Performance & DevOps">
                  <div id="w-node-_11afe82e-c384-13e8-e364-3e6e558d1846-098fe091" className="iconx_component---nnofle"><img
                    src="/images/updateicon.svg" loading="lazy" data-w-id="20085b6b-40e9-5543-2650-533d1fdece93" alt=""
                    className="image-6" /><img src="/images/lap.svg" loading="lazy" alt="" className="image-7" /></div>
                  <div className="grid__item-img-deco"></div>
                  <div className="grid__item-img-overlay"></div>
                </a>
                <p className="card-title">Cloud Performance & DevOps</p>
                <p id="w-node-ce33ac8b-9db8-17bf-d54a-a0731321ef44-098fe091" className="card-caption">Cloud migration, infrastructure optimization, and DevOps pipelines that cut hosting costs and eliminate downtime.</p>
                <div id="w-node-f525032f-b50b-8c52-803a-6c791f1fa233-098fe091" className="w-layout-vflex check-list-wrapper">
                  <div className="w-layout-hflex check-list-item anim01"><svg viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                      fill="currentColor"></path>
                  </svg>
                    <p id="w-node-f525032f-b50b-8c52-803a-6c791f1fa237-098fe091" className="card-caption">Cloud architecture</p>
                  </div>
                  <div id="w-node-f525032f-b50b-8c52-803a-6c791f1fa239-098fe091"
                    className="w-layout-hflex check-list-item anim02"><svg viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                        fill="currentColor"></path>
                    </svg>
                    <p id="w-node-f525032f-b50b-8c52-803a-6c791f1fa23c-098fe091" className="card-caption">CI/CD pipelines</p>
                  </div>
                  <div id="w-node-f525032f-b50b-8c52-803a-6c791f1fa23e-098fe091"
                    className="w-layout-hflex check-list-item anim03"><svg viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                        fill="currentColor"></path>
                    </svg>
                    <p id="w-node-f525032f-b50b-8c52-803a-6c791f1fa241-098fe091" className="card-caption">Monitoring & reliability</p>
                  </div>
                </div>
              </div>
              <div id="w-node-c6b733e2-89d5-d285-9942-1918046a520b-098fe091" className="grid__item">
                <a href="#" className="grid__item-img w-inline-block" aria-label="Learn more about AI & Intelligent Automation">
                  <div id="w-node-c6b733e2-89d5-d285-9942-1918046a520d-098fe091" className="iconx_component"><img
                    src="/images/ai-gif.gif" loading="lazy" alt="" className="image-5" /></div>
                  <div className="grid__item-img-deco"></div>
                  <div className="grid__item-img-overlay"></div>
                </a>
                <p className="card-title">AI & Intelligent Automation</p>
                <p id="w-node-bbb6605b-388c-e81c-0b01-5b46ba0663ac-098fe091" className="card-caption">Predictive analytics, LLM-powered workflows, and custom AI solutions — scoped to your actual business problem, not hype.</p>
                <div id="w-node-_139780c3-d0d0-33c6-80f3-b26b71a73dee-098fe091" className="w-layout-vflex check-list-wrapper">
                  <div className="w-layout-hflex check-list-item anim01"><svg viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                      fill="currentColor"></path>
                  </svg>
                    <p id="w-node-_139780c3-d0d0-33c6-80f3-b26b71a73df2-098fe091" className="card-caption">Predictive analytics
                    </p>
                  </div>
                  <div id="w-node-_139780c3-d0d0-33c6-80f3-b26b71a73df4-098fe091"
                    className="w-layout-hflex check-list-item anim02"><svg viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                        fill="currentColor"></path>
                    </svg>
                    <p id="w-node-_139780c3-d0d0-33c6-80f3-b26b71a73df7-098fe091" className="card-caption">Process automation</p>
                  </div>
                  <div id="w-node-_139780c3-d0d0-33c6-80f3-b26b71a73df9-098fe091"
                    className="w-layout-hflex check-list-item anim03"><svg viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                        fill="currentColor"></path>
                    </svg>
                    <p id="w-node-_139780c3-d0d0-33c6-80f3-b26b71a73dfc-098fe091" className="card-caption">LLM & AI integration</p>
                  </div>
                </div>
              </div>
              <div id="w-node-_762728e3-2fcf-7363-3693-f41c1c075e2c-098fe091"
                data-w-id="762728e3-2fcf-7363-3693-f41c1c075e2c" className="grid__item">
                <a href="#" className="grid__item-img w-inline-block" aria-label="Learn more about Workflow Automation & Internal Tools">
                  <div className="iconx_component">
                    <div className="iconx_screen is-radar">
                      <div className="radar-dot"></div>
                      <div className="radar-dot is-main"></div>
                      <div className="iconx_radar">
                        <div className="iconx_radar-circle is-6th"></div>
                        <div className="iconx_radar-circle is-5th"></div>
                        <div className="iconx_radar-circle is-dark"></div>
                        <div className="iconx_radar-circle is-3rd"></div>
                        <div className="iconx_radar-circle is-2nd"></div>
                        <div className="iconx_radar-circle"></div>
                        <div className="iconx_radar-line rotated"></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item-img-deco"></div>
                  <div className="grid__item-img-overlay"></div>
                </a>
                <p className="card-title">Workflow Automation & Internal Tools</p>
                <p id="w-node-_762728e3-2fcf-7363-3693-f41c1c075e42-098fe091" className="card-caption">Custom internal tools, n8n/Zapier automations, and third-party integrations that replace spreadsheets and manual processes with reliable systems.</p>
                <div id="w-node-_762728e3-2fcf-7363-3693-f41c1c075e44-098fe091" className="w-layout-vflex check-list-wrapper">
                  <div className="w-layout-hflex check-list-item anim01"><svg viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                      fill="currentColor"></path>
                  </svg>
                    <p id="w-node-_762728e3-2fcf-7363-3693-f41c1c075e48-098fe091" className="card-caption">n8n / Zapier integrations</p>
                  </div>
                  <div id="w-node-_762728e3-2fcf-7363-3693-f41c1c075e4a-098fe091"
                    className="w-layout-hflex check-list-item anim02"><svg viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                        fill="currentColor"></path>
                    </svg>
                    <p id="w-node-_762728e3-2fcf-7363-3693-f41c1c075e4d-098fe091" className="card-caption">Custom dashboards</p>
                  </div>
                  <div id="w-node-_762728e3-2fcf-7363-3693-f41c1c075e4f-098fe091"
                    className="w-layout-hflex check-list-item anim03"><svg viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                        fill="currentColor"></path>
                    </svg>
                    <p id="w-node-_762728e3-2fcf-7363-3693-f41c1c075e52-098fe091" className="card-caption">Data sync & automation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="sec-process" className="section !pt-10 !pb-10">
          <div className="container">
            <div className="img-benefits-wrap">
              <div className="image-block"><img
                sizes="(max-width: 479px) 90vw, (max-width: 767px) 88vw, (max-width: 963px) 83vw, (max-width: 991px) 800px, (max-width: 1439px) 40vw, 540px"
                srcSet="/images/handshake-p-500.png 500w, /images/handshake-p-800.png 800w, /images/handshake-p-1080.png 1080w, /images/handshake.png 1174w"
                alt="How We Work" src="/images/handshake.png" className="expand-team" />
                <div data-svg-animation-time="6000" data-svg="animated" id="w-node-_4ad2958e-ecc9-8cd6-1e6f-2264af434729-098fe091"
                  className="loc-outline-svg-copy w-embed"><svg width="100%" height="100%" viewBox="0 0 100 80" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M57.4103 1H81.784V25.3736H57.4103V1ZM50.8269 78.4872C51.0845 65.8051 56.2344 53.6971 65.2221 44.7094C74.2098 35.7218 86.3177 30.5718 98.9998 30.3142V53.4147C92.4433 53.666 86.2072 56.3807 81.5503 61.0376C76.8934 65.6946 74.1787 71.9306 73.9274 78.4872L50.8269 78.4872ZM49.1831 51.0045C43.065 50.8801 37.0206 49.6148 31.3616 47.2708C25.3944 44.7991 19.9725 41.1763 15.4054 36.6092C10.8383 32.0421 7.21551 26.6202 4.74383 20.653C2.39978 14.994 1.13458 8.94964 1.01017 2.83145L24.1107 2.83147C24.2291 5.9166 24.8942 8.95902 26.0777 11.8163C27.3889 14.9819 29.3108 17.8582 31.7336 20.281C34.1564 22.7038 37.0328 24.6257 40.1983 25.937C43.0556 27.1205 46.098 27.7856 49.1831 27.9039V51.0045Z"
                      stroke="url(#paint0_radial_300_537)" strokeWidth="2"></path>
                    <defs>
                      <radialGradient id="paint0_radial_300_537" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(49.9999 39.7436) rotate(90) scale(39.7436 49.9999)">
                        <stop stopColor="white"></stop>
                        <stop offset="1" stopColor="#646464"></stop>
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="content-block-benfits">
                <div className="content-wrap">
                  <p className="section-borrow">How We Work</p>
                  <h2 className="heading-primary">Engineering Partnership. Not a Black Box.</h2>
                  <div className="section-sub">Every engagement follows a clear technical workflow — architecture review, sprint-based delivery, and continuous deployment, with full visibility at every step.</div>
                  <div className="feature">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="loc-symb-grad">
                      <rect width="56" height="56" rx="12" fill="url(#peregrine-gradient-1)" fillOpacity="0.1" />
                      <path d="M28 14C26.067 14 24.5 15.567 24.5 17.5V19.5C24.5 21.433 26.067 23 28 23C29.933 23 31.5 21.433 31.5 19.5V17.5C31.5 15.567 29.933 14 28 14Z" fill="url(#peregrine-gradient-1)" />
                      <path d="M19 24C17.067 24 15.5 25.567 15.5 27.5V29.5C15.5 31.433 17.067 33 19 33C20.933 33 22.5 31.433 22.5 29.5V27.5C22.5 25.567 20.933 24 19 24Z" fill="url(#peregrine-gradient-1)" />
                      <path d="M37 24C35.067 24 33.5 25.567 33.5 27.5V29.5C33.5 31.433 35.067 33 37 33C38.933 33 40.5 31.433 40.5 29.5V27.5C40.5 25.567 38.933 24 37 24Z" fill="url(#peregrine-gradient-1)" />
                      <path d="M28 25C24.134 25 21 28.134 21 32V36C21 37.657 22.343 39 24 39H32C33.657 39 35 37.657 35 36V32C35 28.134 31.866 25 28 25Z" fill="url(#peregrine-gradient-1)" />
                      <path d="M14 35C14 33.343 15.343 32 17 32H20.5C20.5 35.866 17.366 39 13.5 39C13.5 37.895 13.5 36.105 13.5 35C13.5 35 13.724 35 14 35Z" fill="url(#peregrine-gradient-1)" fillOpacity="0.6" />
                      <path d="M42 35C42 33.343 40.657 32 39 32H35.5C35.5 35.866 38.634 39 42.5 39C42.5 37.895 42.5 36.105 42.5 35C42.5 35 42.276 35 42 35Z" fill="url(#peregrine-gradient-1)" fillOpacity="0.6" />
                      <defs>
                        <linearGradient id="peregrine-gradient-1" x1="14" y1="14" x2="42" y2="42" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#8733ff" />
                          <stop offset="1" stopColor="#4f46e5" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="feature-content-wrap">
                      <div className="content-title">Discover & Design</div>
                      <p className="sub-l">We start with a focused discovery sprint — mapping your requirements, defining system architecture, and delivering a detailed technical plan before a single line of code is written.</p>
                    </div>
                  </div>
                  <div className="feature">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="loc-symb-grad">
                      <rect width="56" height="56" rx="12" fill="url(#peregrine-gradient-2)" fillOpacity="0.1" />
                      <path d="M38 16H18C16.895 16 16 16.895 16 18V30C16 31.105 16.895 32 18 32H38C39.105 32 40 31.105 40 30V18C40 16.895 39.105 16 38 16Z" fill="url(#peregrine-gradient-2)" />
                      <path d="M22 34L19 40H37L34 34H22Z" fill="url(#peregrine-gradient-2)" fillOpacity="0.6" />
                      <circle cx="28" cy="24" r="3" fill="white" fillOpacity="0.3" />
                      <path d="M24 20L28 24L32 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                      <path d="M33 27H35V29H33V27Z" fill="white" fillOpacity="0.5" />
                      <path d="M21 27H23V29H21V27Z" fill="white" fillOpacity="0.5" />
                      <defs>
                        <linearGradient id="peregrine-gradient-2" x1="16" y1="16" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#8733ff" />
                          <stop offset="1" stopColor="#4f46e5" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="feature-content-wrap">
                      <div className="content-title">Build & Evolve</div>
                      <p className="sub-l">Development runs in 2-week sprints with weekly demos. You see working software from week one — and can adjust scope, priorities, or direction at every checkpoint.</p>
                    </div>
                  </div>
                  <a href="#sec-CTA" className="cta-primary w-inline-block">
                    <div className="cta-label">Get a Free Consultation</div><svg xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round" className="svg-icon-button">
                      <path d="m6 17 5-5-5-5"></path>
                      <path d="m13 17 5-5-5-5"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="sec-testimonials" className="section !pt-5 !pb-8">
          <div className="container-special">
            <div className="title-wrap">
              <p className="section-borrow">Results</p>
              <h3 className="heading-primary h3-centre">What Our Clients Say</h3>
            </div>

            {/* Testimonials Grid — 6 cards, 3 columns */}
            <div className="testimonials-grid">
              {/* Row 1 */}
              <div className="testimonial-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="testimonial-category">Performance Optimization</span>
                <a href="https://www.easyagentpro.com" target="_blank" rel="noopener noreferrer"><img src="/logos/easyagentpro.webp" alt="Easy Agent PRO" className="testimonial-logo logo-dark-bg" /></a>
                <p style={{ color: '#1e293b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem', flex: '1' }}>&ldquo;We brought them in to fix performance bottlenecks across our all-in-one CRM. They optimized page loads, fixed the lead ingestion pipeline so leads flow directly into marketing sequences, and tightened up the overall system architecture. Agents on our platform started capturing more leads simply because the forms and pages stopped lagging. The full optimization was completed in a single sprint cycle.&rdquo;</p>
                <p style={{ color: '#0e7490', fontSize: '0.85rem', fontWeight: '600' }}>Josh Keeton</p>
                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>CEO, Easy Agent PRO</p>
              </div>
              <div className="testimonial-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="testimonial-category">Lead Automation System</span>
                <a href="https://www.brokerlinx.com" target="_blank" rel="noopener noreferrer"><img src="/logos/brokerlinx.jpg" alt="BrokerLinx" className="testimonial-logo" /></a>
                <p style={{ color: '#1e293b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem', flex: '1' }}>&ldquo;We were drowning in inbound leads with no structured way to route or follow up on them. The team built a custom automation layer on top of our CRM — auto-assigning leads, triggering follow-up sequences, and giving agents mobile access to their pipeline. Response time dropped from hours to minutes. They delivered two weeks ahead of schedule and came in under budget.&rdquo;</p>
                <p style={{ color: '#0e7490', fontSize: '0.85rem', fontWeight: '600' }}>William Betancourt</p>
                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Founder, BrokerLinx</p>
              </div>
              <div className="testimonial-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="testimonial-category">SaaS Platform Rebuild</span>
                <a href="https://www.kypiq.com" target="_blank" rel="noopener noreferrer"><img src="/logos/kypiq.png" alt="Kypiq" className="testimonial-logo" /></a>
                <p style={{ color: '#1e293b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem', flex: '1' }}>&ldquo;Our legacy self-storage platform required manual intervention for most access and billing tasks. Peregrine rebuilt it as a fully automated 24/7-access system — eliminating the manual workflow entirely and cutting operational costs by roughly 40%. Page load times dropped to under a second, and we shipped the full rebuild in about 10 weeks.&rdquo;</p>
                <p style={{ color: '#0e7490', fontSize: '0.85rem', fontWeight: '600' }}>Iván Palacios</p>
                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>CEO, Kypiq</p>
              </div>

              {/* Row 2 */}
              <div className="testimonial-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="testimonial-category">High-Traffic Streaming Platform</span>
                <a href="https://www.torrins.com" target="_blank" rel="noopener noreferrer"><img src="/logos/torrins-logo.svg" alt="Torrins" className="testimonial-logo logo-dark-bg" /></a>
                <p style={{ color: '#1e293b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem', flex: '1' }}>&ldquo;We needed our video streaming infrastructure to handle thousands of concurrent users without buffering or session drops. They re-architected the streaming pipeline and course portal — lesson load times went from several seconds to near-instant. We also added automated enrollment workflows and personalized learning paths, which removed most of the admin overhead our team was spending 15+ hours a week on.&rdquo;</p>
                <p style={{ color: '#0e7490', fontSize: '0.85rem', fontWeight: '600' }}>Manpreet Singh</p>
                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Co-Founder, Torrins</p>
              </div>
              <div className="testimonial-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="testimonial-category">Portal + CRM Integration</span>
                <a href="https://www.bahiainternationalrealty.com" target="_blank" rel="noopener noreferrer"><img src="/logos/bahia-realty.png" alt="Bahia International Realty" className="testimonial-logo" /></a>
                <p style={{ color: '#1e293b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem', flex: '1' }}>&ldquo;We needed a property portal that could serve both international and local buyers, connected to our CRM and marketing stack. They built a fast-loading listing site with automated client-to-listing matching, which cut the manual search-and-send process our agents were doing daily. Operational costs dropped, and our agents reclaimed several hours per week. The system has been stable since launch with no unplanned downtime.&rdquo;</p>
                <p style={{ color: '#0e7490', fontSize: '0.85rem', fontWeight: '600' }}>Raul Aleman</p>
                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Broker/Owner, Bahia International Realty</p>
              </div>
              <div className="testimonial-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="testimonial-category">High-Load Infrastructure</span>
                <a href="https://www.searchrealty.ca" target="_blank" rel="noopener noreferrer"><img src="/logos/search-realty.png" alt="Search Realty" className="testimonial-logo" /></a>
                <p style={{ color: '#1e293b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem', flex: '1' }}>&ldquo;Our Leads on Demand product needed a backend that could handle large traffic spikes without dropping requests or slowing down. They built a scalable infrastructure layer integrated with our CRM — lead capture and nurture now happen in real time with zero delay. Conversion rates improved measurably because prospects aren’t waiting on slow pages. The platform has been handling peak loads cleanly since launch.&rdquo;</p>
                <p style={{ color: '#0e7490', fontSize: '0.85rem', fontWeight: '600' }}>Sterling Wong</p>
                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Founder & CEO, Search Realty</p>
              </div>
            </div>

            {/* Featured Testimonial — Deepak Kumar (full width) */}
            <div className="testimonial-card-featured" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.06) 0%, rgba(59,130,246,0.06) 100%)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: '16px', padding: '2.5rem', marginBottom: '2.5rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
              <span className="testimonial-category">CRM Feature Expansion</span>
              <a href="https://www.mmnovatech.com" target="_blank" rel="noopener noreferrer"><img src="/logos/mmnovatech.png" alt="MM Nova Tech" className="testimonial-logo-featured" /></a>
              <p style={{ color: '#1e293b', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.25rem', fontStyle: 'italic' }}>&ldquo;We’re a SaaS company ourselves, so we had high standards for the team working on our platform. They integrated AI-driven lead scoring, email automation, and analytics dashboards directly into our CRM. System response times improved noticeably, and we can now support 3x the concurrent users on the same infrastructure. Development wrapped faster than our internal estimates, and their support team resolves issues same-day.&rdquo;</p>
              <p style={{ color: '#0e7490', fontSize: '0.95rem', fontWeight: '600' }}>Deepak Kumar</p>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>CEO, MM Nova Tech</p>
            </div>

            {/* Stats Row */}
            <div className="feature-number-wrap" style={{ marginTop: '2rem' }}>
              <div data-w-id="79529fbb-72fb-fe78-0c63-ba7c689cb953" style={{}} className="circle-div">
                <div className="stat-wrap">
                  <h4 className="counterup">50</h4>
                  <h4 className="label-nextcounter">+</h4>
                </div>
                <div className="title-capped">SYSTEMS SHIPPED</div>
              </div>
              <div className="arrow-wrap"><img alt=""
                src="https://uploads-ssl.webflow.com/66b5198d80cc88d19051afb7/66b5198e80cc88d19051b065_arrow-right.svg"
                className="arrow-image shimmer-mask right-to-left" /></div>
              <div data-w-id="79529fbb-72fb-fe78-0c63-ba7c689cb95c" style={{}} className="circle-div">
                <div className="stat-wrap">
                  <h4 className="counterup">3</h4>
                  <h4 className="label-nextcounter">+</h4>
                </div>
                <div className="title-capped">AVG. YEARS PER CLIENT</div>
              </div>
              <div className="arrow-wrap"><img alt=""
                src="https://uploads-ssl.webflow.com/66b5198d80cc88d19051afb7/66b5198e80cc88d19051b065_arrow-right.svg"
                className="arrow-image shimmer-mask right-to-left" /></div>
              <div data-w-id="79529fbb-72fb-fe78-0c63-ba7c689cb965" style={{}} className="circle-div">
                <div className="stat-wrap">
                  <h4 className="counterup">97</h4>
                  <h4 className="label-nextcounter">%</h4>
                </div>
                <div className="title-capped">ON-TIME DELIVERY RATE</div>
              </div>
              <div className="arrow-wrap"><img alt=""
                src="https://uploads-ssl.webflow.com/66b5198d80cc88d19051afb7/66b5198e80cc88d19051b065_arrow-right.svg"
                className="arrow-image shimmer-mask right-to-left" /></div>
              <div data-w-id="bc979d55-ba31-04d1-c194-ff8614ee6322" style={{}} className="circle-div">
                <div className="stat-wrap">
                  <h4 className="counterup">4.7</h4>
                  <h4 className="label-nextcounter">/5</h4>
                </div>
                <div className="title-capped">CLIENT SATISFACTION</div>
              </div>
            </div>

            {/* Checklist */}
            <div id="w-node-_72903153-c5f2-0b1d-fa5f-b590dc62e1f3-098fe091" className="w-layout-hflex flex-block-6">
              <div id="w-node-_8f7364f9-2276-b6ab-48a1-13bbe10e12b3-098fe091"
                data-w-id="8f7364f9-2276-b6ab-48a1-13bbe10e12b3" style={{}} className="circle-div-copy">
                <div id="w-node-ef8198ef-7ccb-6626-617b-4431a7f17ca7-098fe091"
                  className="w-layout-vflex check-list-wrapper light">
                  <div className="w-layout-hflex check-list-item"><svg viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                      fill="currentColor"></path>
                  </svg>
                    <p id="w-node-ef8198ef-7ccb-6626-617b-4431a7f17cab-098fe091" className="checkitem-lrg">Dedicated project lead and direct access to the engineering team on every engagement</p>
                  </div>
                  <div className="w-layout-hflex check-list-item"><svg viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                      fill="currentColor"></path>
                  </svg>
                    <p id="w-node-_6278dd40-be80-4ce3-f0d0-dd1fa2b686d1-098fe091" className="checkitem-lrg">Weekly sprint demos with working software — no status reports without proof</p>
                  </div>
                  <div id="w-node-ef8198ef-7ccb-6626-617b-4431a7f17cad-098fe091" className="w-layout-hflex check-list-item"><svg
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                      fill="currentColor"></path>
                  </svg>
                    <p id="w-node-ef8198ef-7ccb-6626-617b-4431a7f17cb0-098fe091" className="checkitem-lrg">Full source code ownership and documentation handoff on every project</p>
                  </div>
                  <div id="w-node-ef8198ef-7ccb-6626-617b-4431a7f17cb2-098fe091" className="w-layout-hflex check-list-item"><svg
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                      fill="currentColor"></path>
                  </svg>
                    <p id="w-node-ef8198ef-7ccb-6626-617b-4431a7f17cb5-098fe091" className="checkitem-lrg">AWS, Azure, and GCP certified engineers across the team</p>
                  </div>
                  <div id="w-node-_62763973-10c7-b349-7314-34ca65059aa3-098fe091" className="w-layout-hflex check-list-item">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                        fill="currentColor"></path>
                    </svg>
                    <p id="w-node-_62763973-10c7-b349-7314-34ca65059aa6-098fe091" className="checkitem-lrg">Post-launch support and SLA-backed maintenance for production systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-fill-absolo"><img src="/images/vector-lines.svg" loading="lazy"
            data-w-id="57343fd2-dcb9-6528-f601-e6d78e1463d1" alt="" className="image-9" /></div>
        </section>

        <section id="sec-logistics" data-w-id="4b456ef1-02bf-a753-30c8-fef45a56495c" className="section !pb-10">
          <div className="container">
            <div className="beyond-codegird">
              <div className="home-services-grid-left">
                <div className="sticky-content">
                  <div className="heading-primary">Deep Industry Expertise</div><img src="/images/handshake.png" loading="lazy"
                    sizes="(max-width: 479px) 89vw, (max-width: 767px) 315.3671875px, (max-width: 991px) 453.3359375px, (max-width: 1439px) 41vw, 453.3359375px"
                    srcSet="/images/handshake-p-500.png 500w, /images/handshake-p-800.png 800w, /images/handshake-p-1080.png 1080w, /images/handshake.png 1174w"
                    alt="" className="img-main faded-bottom" />
                </div>
                <div className="home-services-about">
                  <div>
                    <div className="text-meta text-color-muted">We build complex software for industries where domain knowledge matters as much as engineering skill.</div>
                  </div>
                </div>
              </div>
              <div id="w-node-_4b456ef1-02bf-a753-30c8-fef45a564974-098fe091" className="home-services-grid-right">
                <div className="home-services-grid-right-inner">
                  <div data-w-id="4b456ef1-02bf-a753-30c8-fef45a564977" className="card sticky">
                    <div className="margin-bottom margin-xsmall">
                      <div className="home-services-item-heading">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                          style={{ WebkitTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }}
                          data-w-id="4b456ef1-02bf-a753-30c8-fef45a56497b">
                          <rect width="40" height="40" rx="8" fill="url(#real-estate-gradient)" fillOpacity="0.15" />
                          <path d="M20 8L10 16V30C10 30.5304 10.2107 31.0391 10.5858 31.4142C10.9609 31.7893 11.4696 32 12 32H16V24C16 23.4696 16.2107 22.9609 16.5858 22.5858C16.9609 22.2107 17.4696 22 18 22H22C22.5304 22 23.0391 22.2107 23.4142 22.5858C23.7893 22.9609 24 23.4696 24 24V32H28C28.5304 32 29.0391 31.7893 29.4142 31.4142C29.7893 31.0391 30 30.5304 30 30V16L20 8Z" fill="url(#real-estate-gradient)" />
                          <circle cx="26" cy="18" r="2" fill="url(#real-estate-gradient)" fillOpacity="0.6" />
                          <defs>
                            <linearGradient id="real-estate-gradient" x1="10" y1="8" x2="30" y2="32" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#8733ff" />
                              <stop offset="1" stopColor="#4f46e5" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <h2 className="content-title">Real Estate Solutions</h2>
                      </div>
                    </div>
                    <div className="w-layout-vflex check-list-wrapper light">
                      <div className="w-layout-hflex check-list-item"><svg viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                        <path fillRule="evenodd" clipRule="evenodd"
                          d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                          fill="currentColor"></path>
                      </svg>
                        <p className="checkitem-lrg"><strong>Custom IDX Websites</strong>: Seamless MLS integration for up-to-date property listings.</p>
                      </div>
                      <div className="w-layout-hflex check-list-item"><svg viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                        <path fillRule="evenodd" clipRule="evenodd"
                          d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                          fill="currentColor"></path>
                      </svg>
                        <p className="checkitem-lrg"><strong>Real Estate CRM</strong>: Advanced lead tracking and management for agents and brokers.</p>
                      </div>
                      <div className="w-layout-hflex check-list-item"><svg viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                        <path fillRule="evenodd" clipRule="evenodd"
                          d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                          fill="currentColor"></path>
                      </svg>
                        <p className="checkitem-lrg"><strong>Multiple Brokerage Support</strong>: Scalable solutions managing multiple brokerages and agent hierarchies.</p>
                      </div>
                    </div>
                  </div>
                  <div data-w-id="f439b134-dbd1-a6a9-c41d-0daf558a5745" className="card sticky _2">
                    <div className="margin-bottom margin-xsmall">
                      <div className="home-services-item-heading">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                          style={{ WebkitTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }}
                          data-w-id="f439b134-dbd1-a6a9-c41d-0daf558a5749">
                          <rect width="40" height="40" rx="8" fill="url(#logistics-gradient)" fillOpacity="0.15" />
                          <path d="M28 14H12C10.8954 14 10 14.8954 10 16V24C10 25.1046 10.8954 26 12 26H28C29.1046 26 30 25.1046 30 24V16C30 14.8954 29.1046 14 28 14Z" fill="url(#logistics-gradient)" />
                          <rect x="13" y="17" width="4" height="4" rx="1" fill="white" fillOpacity="0.3" />
                          <rect x="18" y="17" width="4" height="4" rx="1" fill="white" fillOpacity="0.3" />
                          <rect x="23" y="17" width="4" height="4" rx="1" fill="white" fillOpacity="0.3" />
                          <path d="M14 28C15.1046 28 16 27.1046 16 26H12C12 27.1046 12.8954 28 14 28Z" fill="url(#logistics-gradient)" />
                          <path d="M26 28C27.1046 28 28 27.1046 28 26H24C24 27.1046 24.8954 28 26 28Z" fill="url(#logistics-gradient)" />
                          <defs>
                            <linearGradient id="logistics-gradient" x1="10" y1="14" x2="30" y2="28" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#8733ff" />
                              <stop offset="1" stopColor="#4f46e5" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <h2 className="content-title">Logistics & Space Management</h2>
                      </div>
                    </div>
                    <div className="w-layout-vflex check-list-wrapper light">
                      <div className="w-layout-hflex check-list-item"><svg viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                        <path fillRule="evenodd" clipRule="evenodd"
                          d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                          fill="currentColor"></path>
                      </svg>
                        <p className="checkitem-lrg">
                          <strong>Warehouse Optimization</strong>: Maximize storage efficiency and reduce operational costs.
                        </p>
                      </div>
                      <div className="w-layout-hflex check-list-item"><svg viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                        <path fillRule="evenodd" clipRule="evenodd"
                          d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                          fill="currentColor"></path>
                      </svg>
                        <p className="checkitem-lrg"><strong>Fleet Management</strong>: Track and optimize vehicle routes for faster deliveries.</p>
                      </div>
                      <div className="w-layout-hflex check-list-item">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                          <path fillRule="evenodd" clipRule="evenodd"
                            d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                            fill="currentColor"></path>
                        </svg>
                        <p className="checkitem-lrg"><strong>Space Utilization</strong>: Smart allocation systems for optimal space management.</p>
                      </div>
                    </div>
                  </div>
                  <div className="card sticky _3">
                    <div className="margin-bottom margin-xsmall">
                      <div className="home-services-item-heading">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                          style={{ WebkitTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }}>
                          <rect width="40" height="40" rx="8" fill="url(#supply-chain-gradient)" fillOpacity="0.15" />
                          <circle cx="12" cy="20" r="3" fill="url(#supply-chain-gradient)" />
                          <circle cx="20" cy="14" r="3" fill="url(#supply-chain-gradient)" />
                          <circle cx="28" cy="20" r="3" fill="url(#supply-chain-gradient)" />
                          <circle cx="20" cy="26" r="3" fill="url(#supply-chain-gradient)" />
                          <path d="M14 19L18 15M22 15L26 19M26 21L22 25M18 25L14 21" stroke="url(#supply-chain-gradient)" strokeWidth="2" strokeLinecap="round" />
                          <defs>
                            <linearGradient id="supply-chain-gradient" x1="10" y1="10" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#8733ff" />
                              <stop offset="1" stopColor="#4f46e5" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <h2 className="content-title">Supply Chain Optimization</h2>
                      </div>
                    </div>
                    <div className="w-layout-vflex check-list-wrapper light">
                      <div className="w-layout-hflex check-list-item"><svg viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                        <path fillRule="evenodd" clipRule="evenodd"
                          d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                          fill="currentColor"></path>
                      </svg>
                        <p className="checkitem-lrg">
                          <strong>Inventory Management</strong>: Reduce excess inventory and improve supply chain responsiveness.
                        </p>
                      </div>
                      <div className="w-layout-hflex check-list-item"><svg viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                        <path fillRule="evenodd" clipRule="evenodd"
                          d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                          fill="currentColor"></path>
                      </svg>
                        <p className="checkitem-lrg">
                          <strong>Logistics Efficiency</strong>: Streamline logistics for faster, more reliable deliveries.
                        </p>
                      </div>
                      <div className="w-layout-hflex check-list-item">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-checkicon">
                          <path fillRule="evenodd" clipRule="evenodd"
                            d="M19.916 4.62592C20.2607 4.85568 20.3538 5.32134 20.124 5.66598L11.124 19.166C10.9994 19.3529 10.7975 19.4742 10.5739 19.4963C10.3503 19.5184 10.1286 19.4392 9.96967 19.2803L3.96967 13.2803C3.67678 12.9874 3.67678 12.5125 3.96967 12.2196C4.26256 11.9267 4.73744 11.9267 5.03033 12.2196L10.3834 17.5727L18.876 4.83393C19.1057 4.48929 19.5714 4.39616 19.916 4.62592Z"
                            fill="currentColor"></path>
                        </svg>
                        <p className="checkitem-lrg"><strong>Demand Forecasting</strong>: Use data to predict demand and minimize stockouts or overages.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="sec-tech" className="section dark !pt-3">
          <div className="container">
            <div className="section-text-5"></div>
            <div className="header-title-img-wrap">
              <div className="lottie-animation" data-w-id="6d36b9ed-9197-539a-f455-7e1bc3c58a04" data-animation-type="lottie"
                data-src="documents/AgLEFuYsGE.json" data-loop="1" data-direction="1" data-autoplay="1"
                data-is-ix2-target="0" data-renderer="svg" data-default-duration="4" data-duration="0"></div>
              <div className="w-layout-vflex content-wrap">
                <h1 className="heading-primary gradient">Technologies We Work With</h1>
                <p className="section-sub">Our engineering teams work across the full modern stack — from frontend frameworks to cloud infrastructure.</p>
              </div>
            </div>
            <div className="w-layout-vflex">
              <div className="wrap-grids">
                <div className="content-4-copy">
                  <div className="tech-cell">
                    <div className="icon-space" data-w-id="cc670d70-8038-eba2-eff3-700bab60650e" data-animation-type="lottie"
                      data-src="documents/front-end.json" data-loop="1" data-direction="1" data-autoplay="1"
                      data-is-ix2-target="0" data-renderer="svg" data-default-duration="2.56" data-duration="0"></div>
                    <div className="w-layout-vflex titleandcaption">
                      <div className="cert-title">Frontend: React, Vue.js, Angular, Next.js, Nuxt.js, Svelte, Tailwind CSS
                      </div>
                      <p id="w-node-b0216bc3-24d3-4254-e998-f8437df35508-098fe091" className="card-caption">Enables creation
                        of
                        responsive, high-performance user interfaces</p>
                    </div>
                  </div>
                  <div id="w-node-d73c53f8-5359-9799-b71c-8af21aa3f010-098fe091" className="tech-cell">
                    <div className="icon-space" data-w-id="d73c53f8-5359-9799-b71c-8af21aa3f011" data-animation-type="lottie"
                      data-src="documents/devops.json" data-loop="1" data-direction="1" data-autoplay="1"
                      data-is-ix2-target="0" data-renderer="svg" data-default-duration="1.9166666666666667"
                      data-duration="0"></div>
                    <div className="w-layout-vflex titleandcaption">
                      <div className="cert-title">Backend: Laravel, .NET, Node.js, Python, NestJS, Django, FastAPI, Spring
                        Boot
                      </div>
                      <p id="w-node-d73c53f8-5359-9799-b71c-8af21aa3f015-098fe091" className="card-caption">Provides robust,
                        scalable server-side solutions</p>
                    </div>
                  </div>
                  <div id="w-node-_3647b580-903b-fd43-e760-bbe8a4026ae8-098fe091" className="tech-cell">
                    <div className="icon-space" data-w-id="3647b580-903b-fd43-e760-bbe8a4026ae9" data-animation-type="lottie"
                      data-src="documents/phone.json" data-loop="1" data-direction="1" data-autoplay="1"
                      data-is-ix2-target="0" data-renderer="svg" data-default-duration="3" data-duration="0"></div>
                    <div className="w-layout-vflex titleandcaption">
                      <div className="cert-title">Mobile: React Native, Flutter, Swift, Kotlin, Ionic</div>
                      <p id="w-node-_3647b580-903b-fd43-e760-bbe8a4026aed-098fe091" className="card-caption">Allows efficient
                        development of cross-platform mobile applications</p>
                    </div>
                  </div>
                  <div id="w-node-bb6deb21-2cb2-dc8b-0b7f-dc119c5de73e-098fe091" className="tech-cell">
                    <div className="icon-space" data-w-id="bb6deb21-2cb2-dc8b-0b7f-dc119c5de73f" data-animation-type="lottie"
                      data-src="documents/clouod-up.json" data-loop="1" data-direction="1" data-autoplay="1"
                      data-is-ix2-target="0" data-renderer="svg" data-default-duration="2.5166666666666666"
                      data-duration="0"></div>
                    <div className="w-layout-vflex titleandcaption">
                      <div className="cert-title">Cloud: AWS, Azure, Google Cloud Platform, DigitalOcean, Linode, Vultr</div>
                      <p id="w-node-bb6deb21-2cb2-dc8b-0b7f-dc119c5de743-098fe091" className="card-caption">Enables scalable,
                        flexible, and cost-effective cloud solutions</p>
                    </div>
                  </div>
                  <div id="w-node-_5452233e-aa99-5dce-8460-d03d8af886a1-098fe091" className="tech-cell">
                    <div className="icon-space" data-w-id="5452233e-aa99-5dce-8460-d03d8af886a2" data-animation-type="lottie"
                      data-src="documents/teamrotate.json" data-loop="1" data-direction="1" data-autoplay="1"
                      data-is-ix2-target="0" data-renderer="svg" data-default-duration="3" data-duration="0"></div>
                    <div className="w-layout-vflex titleandcaption">
                      <div className="cert-title">DevOps: Docker, Kubernetes, Jenkins, GitHub Actions, GitLab CI, Terraform,
                        Ansible</div>
                      <p id="w-node-_5452233e-aa99-5dce-8460-d03d8af886a6-098fe091" className="card-caption">Streamlines
                        development and deployment processes</p>
                    </div>
                  </div>
                  <div id="w-node-_5b347f63-bd06-b689-70e6-1fad2c984d46-098fe091" className="tech-cell">
                    <div className="icon-space" data-w-id="5b347f63-bd06-b689-70e6-1fad2c984d47" data-animation-type="lottie"
                      data-src="documents/database-table.json" data-loop="1" data-direction="1" data-autoplay="1"
                      data-is-ix2-target="0" data-renderer="svg" data-default-duration="2.0166666666666666"
                      data-duration="0"></div>
                    <div className="w-layout-vflex titleandcaption">
                      <div className="cert-title">Database: MongoDB, PostgreSQL, MySQL, Redis, Elasticsearch, Cassandra,
                        DynamoDB</div>
                      <p id="w-node-_5b347f63-bd06-b689-70e6-1fad2c984d4b-098fe091" className="card-caption">Provides efficient data storage, retrieval, and management solutions</p>
                    </div>
                  </div>

                  <div id="w-node-b0216bc3-24d3-4254-e998-f8437df35531-098fe091" className="div-block-4">
                    <div className="marquee">
                      <div className="marquee-content scroll">
                        <img loading="eager" src="/images/n8n.svg" alt="n8n" className="marquee-image" />
                        <img loading="eager" src="/images/odoo.svg" alt="Odoo" className="marquee-image" />
                        <img loading="eager" src="/images/nextjs.svg" alt="Next.js" className="marquee-image" />
                        <img loading="eager" src="/images/react.svg" alt="React" className="marquee-image" />
                        <img loading="eager" src="/images/docker.svg" alt="Docker" className="marquee-image" />
                        <img loading="eager" src="/images/aws.svg" alt="AWS" className="marquee-image" />
                        <img loading="eager" src="/images/supabase.svg" alt="Supabase" className="marquee-image" />
                        <img loading="eager" src="/images/python.svg" alt="Python" className="marquee-image" />
                        <img loading="eager" src="/images/typescript.svg" alt="TypeScript" className="marquee-image" />
                        <img loading="eager" src="/images/tailwindcss.svg" alt="Tailwind CSS" className="marquee-image" />
                        <img loading="eager" src="/images/js.svg" alt="JavaScript" className="marquee-image" />
                        <img loading="eager" src="/images/swift.svg" alt="Swift" className="marquee-image" />
                        <img loading="eager" src="/images/CSS.svg" alt="CSS" className="marquee-image" />
                        <img loading="eager" src="/images/my-sql.svg" alt="MySQL" className="marquee-image" />
                      </div>
                      <div className="marquee-content scroll">
                        <img loading="eager" src="/images/n8n.svg" alt="n8n" className="marquee-image" />
                        <img loading="eager" src="/images/odoo.svg" alt="Odoo" className="marquee-image" />
                        <img loading="eager" src="/images/nextjs.svg" alt="Next.js" className="marquee-image" />
                        <img loading="eager" src="/images/react.svg" alt="React" className="marquee-image" />
                        <img loading="eager" src="/images/docker.svg" alt="Docker" className="marquee-image" />
                        <img loading="eager" src="/images/aws.svg" alt="AWS" className="marquee-image" />
                        <img loading="eager" src="/images/supabase.svg" alt="Supabase" className="marquee-image" />
                        <img loading="eager" src="/images/python.svg" alt="Python" className="marquee-image" />
                        <img loading="eager" src="/images/typescript.svg" alt="TypeScript" className="marquee-image" />
                        <img loading="eager" src="/images/tailwindcss.svg" alt="Tailwind CSS" className="marquee-image" />
                        <img loading="eager" src="/images/js.svg" alt="JavaScript" className="marquee-image" />
                        <img loading="eager" src="/images/swift.svg" alt="Swift" className="marquee-image" />
                        <img loading="eager" src="/images/CSS.svg" alt="CSS" className="marquee-image" />
                        <img loading="eager" src="/images/my-sql.svg" alt="MySQL" className="marquee-image" />
                      </div>
                      <div className="w-embed">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sec-CTA" className="section dark vh">
          <div
            data-poster-url="https://uploads-ssl.webflow.com/66b50d9ad39e4c82098fe099%2F66be2d194558cc6e063b5dd6_hb-Shutterstock%201093083365-Fast%201080p30-poster-00001.jpg"
            data-video-urls="https://uploads-ssl.webflow.com/66b50d9ad39e4c82098fe099%2F66be2d194558cc6e063b5dd6_hb-Shutterstock%201093083365-Fast%201080p30-transcode.mp4,https://uploads-ssl.webflow.com/66b50d9ad39e4c82098fe099%2F66be2d194558cc6e063b5dd6_hb-Shutterstock%201093083365-Fast%201080p30-transcode.webm"
            data-autoplay="true" data-loop="true" data-wf-ignore="true"
            className="cta-video w-background-video w-background-video-atom"><video
              id="f042f04d-36ab-c84d-8adf-8bcc37730517-video" autoPlay loop
              style={{ backgroundImage: 'url(\'https://uploads-ssl.webflow.com/66b50d9ad39e4c82098fe099%2F66be2d194558cc6e063b5dd6_hb-Shutterstock%201093083365-Fast%201080p30-poster-00001.jpg\')' }}
              muted playsInline data-wf-ignore="true" data-object-fit="cover">
              <source
                src="https://uploads-ssl.webflow.com/66b50d9ad39e4c82098fe099%2F66be2d194558cc6e063b5dd6_hb-Shutterstock%201093083365-Fast%201080p30-transcode.mp4"
                data-wf-ignore="true" />
              <source
                src="https://uploads-ssl.webflow.com/66b50d9ad39e4c82098fe099%2F66be2d194558cc6e063b5dd6_hb-Shutterstock%201093083365-Fast%201080p30-transcode.webm"
                data-wf-ignore="true" />
            </video></div>
          <div className="container">
            <div className="w-layout-vflex flex-block-4-copy"><img src="/images/peregrine-logo-new.png" loading="lazy"
              width="300" alt="Peregrine IT Logo" className="Peregrine-white" />
              <h1 className="cta">Let’s Talk About Your Project</h1>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '600px', textAlign: 'center', marginTop: '-0.5rem', marginBottom: '2rem' }}>Tell us about your goals and constraints — we’ll recommend the right way to work together.</p>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '800px' }}>
                <div style={{ flex: '1 1 340px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '2rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Planning a new build or scaling an existing system</p>
                  <a href="https://calendly.com/mukesh-peregrine-it/30min" target="_blank"
                    className="cta-primary dark w-inline-block" style={{ display: 'inline-flex', marginBottom: '1rem' }}>
                    <div className="cta-label">Book a Strategy Call</div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="svg-icon-button">
                      <path d="m6 17 5-5-5-5"></path>
                      <path d="m13 17 5-5-5-5"></path>
                    </svg>
                  </a>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>30-minute technical discovery — we assess fit before anything else</p>
                </div>
                <div style={{ flex: '1 1 340px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '2rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Need a specific integration, fix, or automation</p>
                  <a href="#" id="quick-project-btn"
                    className="cta-primary dark blue w-inline-block" style={{ display: 'inline-flex', marginBottom: '1rem' }}>
                    <div className="cta-label">Request a Quick Project Quote</div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="svg-icon-button">
                      <path d="m6 17 5-5-5-5"></path>
                      <path d="m13 17 5-5-5-5"></path>
                    </svg>
                  </a>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>Scoped work — we respond with an estimate within 48 hours</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
      {/* End Migrated Content */}
    </div >
  );
}
