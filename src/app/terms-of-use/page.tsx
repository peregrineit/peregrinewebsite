import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use | Peregrine IT',
  description: 'Terms governing the use of Peregrine IT website and services.',
};

const sectionStyle = { marginBottom: '2.5rem' };
const h2Style = { fontSize: '1.35rem', fontWeight: '600' as const, color: '#111827', marginBottom: '0.75rem', marginTop: '2rem' };
const h3Style = { fontSize: '1.05rem', fontWeight: '600' as const, color: '#1e293b', marginTop: '1.25rem', marginBottom: '0.5rem' };
const pStyle = { marginTop: '0.75rem' };
const ulStyle = { paddingLeft: '1.5rem', marginTop: '0.5rem' };
const liStyle = { marginBottom: '0.35rem' };
const capsStyle = { fontSize: '0.92rem', lineHeight: '1.7' as const, marginTop: '0.75rem' };

export default function TermsOfUse() {
  return (
    <main style={{ maxWidth: '780px', margin: '0 auto', padding: '7rem 2rem 5rem' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>Terms of Use</h1>
      <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '2.5rem' }}>Last Updated: February 15, 2026</p>

      <div style={{ color: '#374151', fontSize: '1rem', lineHeight: '1.8' }}>

        {/* 1 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>1. Acceptance of Terms</h2>
          <p>
            Welcome to Peregrine IT Solutions LLP (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of our website{' '}
            <a href="https://peregrine-it.com" style={{ color: '#06b6d4' }}>peregrine-it.com</a> (the &ldquo;Website&rdquo;) and any related services provided by us.
          </p>
          <p style={pStyle}>
            By accessing or using our Website, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Website.
          </p>
          <p style={pStyle}>
            These Terms constitute a legally binding agreement between you (whether personally or on behalf of an entity) and Peregrine IT Solutions LLP.
          </p>
        </section>

        {/* 2 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>2. Eligibility and Business Use</h2>

          <h3 style={h3Style}>2.1 Business Purpose Only</h3>
          <p>Our Website and services are intended exclusively for business-to-business (B2B) purposes. You represent and warrant that:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>You are accessing the Website on behalf of a business entity or for business purposes</li>
            <li style={liStyle}>You are at least 18 years of age and have the legal capacity to enter into binding contracts</li>
            <li style={liStyle}>You have the authority to bind the entity you represent to these Terms</li>
            <li style={liStyle}>You are not using our services for personal, household, or consumer purposes</li>
          </ul>

          <h3 style={h3Style}>2.2 Geographic Restrictions</h3>
          <p>Our services are primarily offered in the United States, Canada, United Arab Emirates, and Europe. By using this Website, you represent that your use complies with all applicable laws and regulations in your jurisdiction.</p>
        </section>

        {/* 3 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>3. Services and Website Purpose</h2>

          <h3 style={h3Style}>3.1 Information and Consultation</h3>
          <p>This Website provides information about our software engineering consultancy services, including but not limited to:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Custom software development</li>
            <li style={liStyle}>Real estate technology solutions (CRM, IDX websites, MLS integrations)</li>
            <li style={liStyle}>React.js and Next.js development services</li>
            <li style={liStyle}>Technology consulting and advisory services</li>
          </ul>

          <h3 style={h3Style}>3.2 No Direct Sales</h3>
          <p>This Website does not offer e-commerce functionality or direct sales of products or services. All service engagements are subject to separate, written service agreements negotiated individually with clients.</p>

          <h3 style={h3Style}>3.3 Consultation Requests</h3>
          <p>Any consultation requests, demo requests, contact form submissions, or inquiries made through the Website are preliminary expressions of interest and do not constitute binding agreements or commitments by either party.</p>
        </section>

        {/* 4 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>4. Intellectual Property Rights</h2>

          <h3 style={h3Style}>4.1 Ownership of Website Content</h3>
          <p>All content on this Website, including but not limited to text, graphics, logos, images, videos, audio clips, digital downloads, data compilations, source code, software, and the compilation thereof (collectively, &ldquo;Content&rdquo;), is the exclusive property of Peregrine IT Solutions LLP or its licensors and is protected by Indian and international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>

          <h3 style={h3Style}>4.2 Trademarks</h3>
          <p>Peregrine IT Solutions LLP, our logo, and any other product or service names, logos, or slogans that may appear on the Website are trademarks of Peregrine IT Solutions LLP or our affiliates and may not be copied, imitated, or used, in whole or in part, without our prior written permission.</p>

          <h3 style={h3Style}>4.3 Limited License</h3>
          <p>We grant you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Website for your internal business purposes in accordance with these Terms. This license does not include any right to:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any Content obtained from the Website</li>
            <li style={liStyle}>Use any data mining, robots, scraping, or similar data gathering or extraction methods</li>
            <li style={liStyle}>Download any portion of the Website (except for page caching)</li>
            <li style={liStyle}>Reverse engineer, decompile, or disassemble any software or technology on the Website</li>
          </ul>

          <h3 style={h3Style}>4.4 Work Product and Custom Development</h3>
          <p>Intellectual property rights in any custom software, code, or work product created for clients pursuant to separate service agreements shall be governed by the terms of such agreements. These Terms do not grant any ownership rights in custom work product.</p>
        </section>

        {/* 5 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>5. User Conduct and Prohibited Uses</h2>

          <h3 style={h3Style}>5.1 Acceptable Use</h3>
          <p>You agree to use the Website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Use the Website in any way that violates any applicable federal, state, local, or international law or regulation</li>
            <li style={liStyle}>Impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity</li>
            <li style={liStyle}>Engage in any conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Website</li>
            <li style={liStyle}>Introduce any viruses, trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful</li>
            <li style={liStyle}>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Website, servers, or networks connected to the Website</li>
            <li style={liStyle}>Attack the Website via a denial-of-service attack or a distributed denial-of-service attack</li>
          </ul>

          <h3 style={h3Style}>5.2 Competitive Use Restrictions</h3>
          <p>You may not access or use the Website for the purpose of:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Monitoring the availability, performance, or functionality of the Website for competitive purposes</li>
            <li style={liStyle}>Building a competitive product or service</li>
            <li style={liStyle}>Copying any features, functions, or graphics of the Website</li>
          </ul>
        </section>

        {/* 6 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>6. Third-Party Links and Services</h2>

          <h3 style={h3Style}>6.1 Third-Party Websites</h3>
          <p>The Website may contain links to third-party websites or services that are not owned or controlled by Peregrine IT Solutions LLP. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.</p>

          <h3 style={h3Style}>6.2 No Endorsement</h3>
          <p>The inclusion of any link does not imply endorsement by Peregrine IT Solutions LLP of the linked site or any association with its operators. You acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such third-party content, goods, or services.</p>
        </section>

        {/* 7 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>7. Information You Provide</h2>

          <h3 style={h3Style}>7.1 Contact Forms and Communications</h3>
          <p>When you submit information through contact forms, consultation inquiries, or other communication channels on the Website, you represent and warrant that:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>All information you provide is accurate, current, and complete</li>
            <li style={liStyle}>You have the authority to provide such information</li>
            <li style={liStyle}>You consent to our use of such information in accordance with our <Link href="/privacy-policy" style={{ color: '#06b6d4', textDecoration: 'underline' }}>Privacy Policy</Link></li>
            <li style={liStyle}>You understand that any such communication does not create a client relationship or confidential relationship</li>
          </ul>

          <h3 style={h3Style}>7.2 No Confidential Information</h3>
          <p>You should not submit any confidential, proprietary, or sensitive information through the Website&apos;s public forms or communication channels. Any information submitted through such channels will not be treated as confidential unless and until a separate written confidentiality or non-disclosure agreement is executed by both parties.</p>

          <h3 style={h3Style}>7.3 Unsolicited Ideas</h3>
          <p>We do not accept or consider unsolicited ideas, including ideas for new products, technologies, promotions, or processes. If you submit any unsolicited ideas or materials through the Website, you grant us a perpetual, irrevocable, worldwide, royalty-free license to use, modify, and exploit such materials without compensation or attribution.</p>
        </section>

        {/* 8 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>8. Disclaimers and Limitations of Liability</h2>

          <h3 style={h3Style}>8.1 &ldquo;AS IS&rdquo; Basis</h3>
          <p style={capsStyle}>
            THE WEBSITE AND ALL CONTENT, MATERIALS, INFORMATION, AND SERVICES PROVIDED THROUGH THE WEBSITE ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
          </p>
          <p style={capsStyle}>
            TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, PEREGRINE IT SOLUTIONS LLP DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
          </p>

          <h3 style={h3Style}>8.2 No Warranty of Accuracy</h3>
          <p>We do not warrant that:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>The Website will be uninterrupted, timely, secure, or error-free</li>
            <li style={liStyle}>The results that may be obtained from use of the Website will be accurate or reliable</li>
            <li style={liStyle}>The quality of any products, services, information, or other material obtained through the Website will meet your expectations</li>
            <li style={liStyle}>Any errors in the Website will be corrected</li>
          </ul>

          <h3 style={h3Style}>8.3 Information Accuracy</h3>
          <p>The information presented on or through the Website is made available solely for general informational purposes. We do not warrant the accuracy, completeness, or usefulness of this information. Any reliance you place on such information is strictly at your own risk.</p>

          <h3 style={h3Style}>8.4 Professional Advice Disclaimer</h3>
          <p>The content on the Website is not intended to be a substitute for professional advice. You should seek appropriate professional advice before making any business or technical decisions based on content from the Website.</p>

          <h3 style={h3Style}>8.5 Limitation of Liability</h3>
          <p style={capsStyle}>
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL PEREGRINE IT SOLUTIONS LLP, ITS AFFILIATES, DIRECTORS, EMPLOYEES, AGENTS, PARTNERS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
          </p>
          <ul style={ulStyle}>
            <li style={liStyle}>Your access to or use of or inability to access or use the Website</li>
            <li style={liStyle}>Any conduct or content of any third party on the Website</li>
            <li style={liStyle}>Any content obtained from the Website</li>
            <li style={liStyle}>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>
          <p style={capsStyle}>
            WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
          </p>

          <h3 style={h3Style}>8.6 Maximum Liability</h3>
          <p style={capsStyle}>
            IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES, AND CAUSES OF ACTION EXCEED ONE HUNDRED DOLLARS ($100.00 USD).
          </p>

          <h3 style={h3Style}>8.7 Jurisdictional Variations</h3>
          <p>Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for incidental or consequential damages. Accordingly, some of the limitations above may not apply to you. In such jurisdictions, our liability will be limited to the greatest extent permitted by law.</p>
        </section>

        {/* 9 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>9. Indemnification</h2>
          <p>You agree to defend, indemnify, and hold harmless Peregrine IT Solutions LLP and its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Your violation of these Terms</li>
            <li style={liStyle}>Your use of the Website</li>
            <li style={liStyle}>Your violation of any third-party rights, including intellectual property rights</li>
            <li style={liStyle}>Any information or content you provide through the Website</li>
            <li style={liStyle}>Any breach of your representations and warranties set forth in these Terms</li>
          </ul>
        </section>

        {/* 10 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>10. Service Agreements and Contracts</h2>

          <h3 style={h3Style}>10.1 Separate Agreements Required</h3>
          <p>All professional services provided by Peregrine IT Solutions LLP are subject to separate, written service agreements, statements of work, or master services agreements (collectively, &ldquo;Service Agreements&rdquo;) that will be negotiated and executed independently from these Terms.</p>

          <h3 style={h3Style}>10.2 Precedence</h3>
          <p>In the event of any conflict between these Terms and a Service Agreement, the terms of the Service Agreement shall prevail with respect to the services covered by that agreement.</p>

          <h3 style={h3Style}>10.3 No Obligation</h3>
          <p>Nothing in these Terms obligates Peregrine IT Solutions LLP to enter into any Service Agreement or provide any services. We reserve the right to decline any service engagement at our sole discretion.</p>
        </section>

        {/* 11 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>11. Privacy and Data Protection</h2>

          <h3 style={h3Style}>11.1 Privacy Policy</h3>
          <p>Your use of the Website is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our <Link href="/privacy-policy" style={{ color: '#06b6d4', textDecoration: 'underline' }}>Privacy Policy</Link> to understand our practices regarding the collection, use, and disclosure of information.</p>

          <h3 style={h3Style}>11.2 Data Security</h3>
          <p>While we implement reasonable security measures to protect information transmitted through the Website, we cannot guarantee the security of any information you transmit to us over the internet. Transmission of information is at your own risk.</p>

          <h3 style={h3Style}>11.3 Analytics and Cookies</h3>
          <p>We may use cookies, web beacons, and other tracking technologies to collect information about your use of the Website. By using the Website, you consent to our use of these technologies in accordance with our <Link href="/privacy-policy" style={{ color: '#06b6d4', textDecoration: 'underline' }}>Privacy Policy</Link>.</p>
        </section>

        {/* 12 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>12. Modifications to Terms and Website</h2>

          <h3 style={h3Style}>12.1 Updates to Terms</h3>
          <p>We reserve the right to modify these Terms at any time in our sole discretion. We will notify you of material changes by posting the updated Terms on the Website with a new &ldquo;Last Updated&rdquo; date. Your continued use of the Website after such modifications constitutes your acceptance of the updated Terms.</p>

          <h3 style={h3Style}>12.2 Responsibility to Review</h3>
          <p>It is your responsibility to review these Terms periodically for changes. If you do not agree to the modified Terms, you must discontinue use of the Website.</p>

          <h3 style={h3Style}>12.3 Website Modifications</h3>
          <p>We reserve the right to modify, suspend, or discontinue the Website (or any part thereof) at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the Website.</p>
        </section>

        {/* 13 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>13. Termination</h2>

          <h3 style={h3Style}>13.1 Termination Rights</h3>
          <p>We may terminate or suspend your access to the Website immediately, without prior notice or liability, for any reason, including but not limited to breach of these Terms.</p>

          <h3 style={h3Style}>13.2 Effect of Termination</h3>
          <p>Upon termination, your right to use the Website will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including but not limited to ownership provisions, warranty disclaimers, indemnity obligations, and limitations of liability.</p>
        </section>

        {/* 14 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>14. Dispute Resolution</h2>

          <h3 style={h3Style}>14.1 Governing Law</h3>
          <p>These Terms and any dispute arising out of or related to these Terms or the Website shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>

          <h3 style={h3Style}>14.2 Jurisdiction and Venue</h3>
          <p>You agree that any legal action or proceeding arising out of or relating to these Terms or the Website shall be brought exclusively in the courts located in Noida, Uttar Pradesh, India, and you hereby consent to the personal jurisdiction and venue of such courts.</p>

          <h3 style={h3Style}>14.3 Waiver of Class Actions</h3>
          <p>To the extent permitted by law, you agree that you will bring claims against us only on an individual basis and not as a plaintiff or class member in any purported class or representative action or proceeding. Class arbitrations, class actions, private attorney general actions, and consolidation with other arbitrations are not permitted.</p>

          <h3 style={h3Style}>14.4 Limitation Period</h3>
          <p>You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of or related to use of the Website or these Terms must be filed within one (1) year after such claim or cause of action arose or be forever barred.</p>
        </section>

        {/* 15 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>15. General Provisions</h2>

          <h3 style={h3Style}>15.1 Entire Agreement</h3>
          <p>These Terms, together with our <Link href="/privacy-policy" style={{ color: '#06b6d4', textDecoration: 'underline' }}>Privacy Policy</Link> and any Service Agreements, constitute the entire agreement between you and Peregrine IT Solutions LLP regarding the Website and supersede all prior and contemporaneous understandings, agreements, representations, and warranties.</p>

          <h3 style={h3Style}>15.2 Waiver</h3>
          <p>No waiver by Peregrine IT Solutions LLP of any term or condition set forth in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition. Any failure to assert a right or provision under these Terms shall not constitute a waiver of such right or provision.</p>

          <h3 style={h3Style}>15.3 Severability</h3>
          <p>If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent necessary, and the remaining provisions of these Terms will continue in full force and effect.</p>

          <h3 style={h3Style}>15.4 Assignment</h3>
          <p>You may not assign or transfer these Terms or your rights hereunder, in whole or in part, by operation of law or otherwise, without our prior written consent. We may assign these Terms at any time without notice to you. Any attempt by you to assign these Terms without our consent shall be null and void.</p>

          <h3 style={h3Style}>15.5 Force Majeure</h3>
          <p>We shall not be liable for any delay or failure to perform resulting from causes outside our reasonable control, including but not limited to acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, strikes, or shortages of transportation facilities, fuel, energy, labor, or materials.</p>

          <h3 style={h3Style}>15.6 Headings</h3>
          <p>The headings in these Terms are for convenience only and have no legal or contractual effect.</p>

          <h3 style={h3Style}>15.7 Language</h3>
          <p>These Terms are drafted in English. If these Terms are translated into any other language, the English version shall prevail to the extent of any conflict or inconsistency.</p>

          <h3 style={h3Style}>15.8 Export Control</h3>
          <p>You agree to comply with all applicable export and re-export control laws and regulations.</p>
        </section>

        {/* 16 */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>16. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <div style={{ marginTop: '1rem', padding: '1.25rem 1.5rem', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <p style={{ marginBottom: '0.35rem' }}><strong>Peregrine IT Solutions LLP</strong></p>
            <p style={{ marginBottom: '0.35rem' }}>Suite-115, H-160, BSI Business Park, Sector 63</p>
            <p style={{ marginBottom: '0.35rem' }}>Noida, Uttar Pradesh 201301, India</p>
            <p style={{ marginTop: '0.75rem' }}>
              Legal:{' '}
              <a href="mailto:legal@peregrine-it.com" style={{ color: '#06b6d4', textDecoration: 'underline' }}>legal@peregrine-it.com</a>
            </p>
            <p style={{ marginTop: '0.25rem' }}>
              General:{' '}
              <a href="mailto:info@peregrine-it.com" style={{ color: '#06b6d4', textDecoration: 'underline' }}>info@peregrine-it.com</a>
            </p>
          </div>
        </section>

        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', marginTop: '3rem' }}>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            <strong>By using this Website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.</strong>
          </p>
        </div>

      </div>
    </main>
  );
}
