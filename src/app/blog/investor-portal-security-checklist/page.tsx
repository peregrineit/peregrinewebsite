import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'investor-portal-security-checklist';
export const metadata = guideMetadata(SLUG);

// Sources fetched and checked 2026-10-10; the sentence relied on for each link is logged in
// docs/growth/content/SOURCES-investor-portal-security-checklist.md. ASVS requirement numbers
// are from version 5.0.0 (tag v5.0.0 on GitHub). sec.gov returned HTTP 403 on that date, so the
// guide states no US regulatory requirement; those points are written as questions for counsel.
// Nothing here says or implies that Peregrine or any portal it built is certified, audited or
// compliant with a standard. Case-study facts are as the current case-study page states them.
const ASVS = 'https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/';
const ASVS_ABOUT = `${ASVS}0x03-What-is-the-ASVS.md`;
const ASVS_PROJECT = 'https://owasp.org/www-project-application-security-verification-standard/';
const ASVS_CERT = `${ASVS}0x04-Assessment_and_Certification.md`;
const V2 = `${ASVS}0x11-V2-Validation-and-Business-Logic.md`;
const V5 = `${ASVS}0x14-V5-File-Handling.md`;
const V6 = `${ASVS}0x15-V6-Authentication.md`;
const V7 = `${ASVS}0x16-V7-Session-Management.md`;
const V8 = `${ASVS}0x17-V8-Authorization.md`;
const V14 = `${ASVS}0x23-V14-Data-Protection.md`;
const V16 = `${ASVS}0x25-V16-Security-Logging-and-Error-Handling.md`;
const TOP10 = 'https://owasp.org/Top10/2025/';
const A01 = 'https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/';
const A07 = 'https://owasp.org/Top10/2025/A07_2025-Authentication_Failures/';
const A09 = 'https://owasp.org/Top10/2025/A09_2025-Security_Logging_and_Alerting_Failures/';
const NIST_B = 'https://pages.nist.gov/800-63-4/sp800-63b.html';
const NIST_HOME = 'https://pages.nist.gov/800-63-4/';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        An investor portal fails in one of a small number of ways: an investor sees another investor&apos;s
        documents, an account is taken over, a document leaves and cannot be traced, or nobody can show afterwards
        who saw what. This checklist maps each of those threats to a control, to the requirement in a public
        standard that describes it, and to a test you can run or ask a vendor to demonstrate. It applies equally
        to a portal you buy and one you commission. Whether you need a portal at all is a different question,
        covered in <Link href="/blog/investor-portal-vs-file-sharing">investor portal vs file sharing</Link>.
      </p>

      <h2>The standards this checklist uses</h2>
      <ul>
        <li>
          <strong>OWASP ASVS 5.0.0.</strong> The Application Security Verification Standard is a list of testable
          requirements; <Src href={ASVS_PROJECT}>the latest stable version is 5.0.0</Src>. It defines{' '}
          <Src href={ASVS_ABOUT}>three security verification levels</Src> and says of Level 2 that{' '}
          <Src href={ASVS_ABOUT}>most applications should be striving to achieve this level of security</Src>.
          Requirement numbers below use the form OWASP recommends, with the version in front, because{' '}
          <Src href={ASVS_PROJECT}>identifiers may change between versions of the standard</Src>.
        </li>
        <li>
          <strong>OWASP Top 10:2025.</strong> The <Src href={TOP10}>current list</Src> puts Broken Access Control
          first, and reports that <Src href={A01}>100% of the applications tested were found to have some form of broken access control</Src>.
          For a portal whose whole job is showing each investor only their own records, that is the risk to
          design around.
        </li>
        <li>
          <strong>NIST SP 800-63B-4.</strong> NIST&apos;s authentication guideline;{' '}
          <Src href={NIST_HOME}>the final version of Revision 4 was released in July 2025</Src>. It is written for
          US government systems, and is used here as a public benchmark, not as a rule that binds a private fund.
        </li>
      </ul>
      <p>
        These are design and verification references. Meeting a requirement in this checklist is not a
        certification: OWASP itself{' '}
        <Src href={ASVS_CERT}>does not certify any vendors, verifiers, or software</Src>, and advises caution about
        third-party claims of ASVS certification.
      </p>

      <h2>Start with the access model</h2>
      <p>
        Every other control depends on a written answer to &ldquo;who may see what&rdquo;. ASVS asks for this as
        documentation first: rules for{' '}
        <Src href={V8}>function-level and data-specific access based on consumer permissions and resource attributes</Src>{' '}
        (v5.0.0-8.1.1), and at Level 2 <Src href={V8}>field-level access restrictions, both read and write</Src>{' '}
        (v5.0.0-8.1.2).
      </p>
      <p>
        In an LP portal the unit of permission is the investing entity, not the person. One person may act for a
        fund commitment, a co-investment and an SPV, and one entity may have several people acting for it. Our{' '}
        <Link href="/case-studies/proptech-investor-portal">investor portal case study</Link> describes a model of
        this kind: six role types (LP, GP, Family Office Admin, Legal, Auditor, IR Team) with entity-level
        permissions covering fund, co-invest and SPV participation, enforced at the API level and not only in the
        interface. The table below is a starting point for writing your own; the role names are from that case
        study, and the cells are questions to settle, not a description of that system.
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Role</th><th>Scope to define</th><th>Decide explicitly</th></tr></thead>
          <tbody>
            <tr><td><strong>LP</strong></td><td>Own entities only: statements, tax documents, notices, capital account</td><td>Can one login hold several entities? Who approves adding one?</td></tr>
            <tr><td><strong>Family office admin</strong></td><td>Delegated access to named entities</td><td>Read-only or able to sign? Who grants and revokes the delegation, and is the LP told?</td></tr>
            <tr><td><strong>GP</strong></td><td>Funds and deals they manage</td><td>All investors in those funds, or aggregate figures only?</td></tr>
            <tr><td><strong>IR team</strong></td><td>Publish documents, manage investor records</td><td>Can one person both prepare and release a capital call, or does release need a second person?</td></tr>
            <tr><td><strong>Legal</strong></td><td>Offering and subscription documents</td><td>Access to investor tax documents: yes or no?</td></tr>
            <tr><td><strong>Auditor</strong></td><td>Read-only, time-limited, named funds</td><td>Expiry date set when the account is created; export allowed or view only?</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Threats, controls and how to verify them</h2>
      <p>
        ASVS numbers are version 5.0.0; the level each requirement first applies at is in brackets.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Threat</th><th>Control</th><th>Standard</th><th>How to verify</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>An investor opens another investor&apos;s document by changing an ID in the URL</strong></td>
              <td>Every request for a record or file checks that this user has explicit permission to that item</td>
              <td><Src href={V8}>v5.0.0-8.2.2</Src> [L1]: data-specific access restricted to consumers with explicit permissions, to mitigate insecure direct object reference. The Top 10 lists <Src href={A01}>viewing someone else&apos;s account by providing its unique identifier</Src> as a common failure</td>
              <td>Log in as investor A, request investor B&apos;s document ID and statement ID directly. Expect a refusal and a log entry</td>
            </tr>
            <tr>
              <td><strong>Rules exist in the interface but not on the server</strong></td>
              <td>Authorization enforced in the API or service layer; default is deny</td>
              <td><Src href={V8}>v5.0.0-8.3.1</Src> [L1]: rules enforced at a trusted service layer, not client-side JavaScript. Top 10: <Src href={A01}>except for public resources, deny by default</Src></td>
              <td>Call each API route with a low-privilege token, ignoring the interface</td>
            </tr>
            <tr>
              <td><strong>A user sees a field they should not</strong> (another LP&apos;s commitment, a tax ID)</td>
              <td>Field-level rules; return only the fields the role needs</td>
              <td><Src href={V8}>v5.0.0-8.2.3</Src> [L2]: field-level access restricted to consumers with explicit permissions</td>
              <td>Compare the raw API response for each role against the access model</td>
            </tr>
            <tr>
              <td><strong>One client firm&apos;s data reaches another</strong> (a portal product serving several sponsors)</td>
              <td>Tenant identifier enforced on every query and every storage path; separate encryption keys or buckets where the risk warrants</td>
              <td><Src href={V8}>v5.0.0-8.4.1</Src> [L2]: multi-tenant applications use cross-tenant controls so operations never affect tenants the consumer has no permission to interact with</td>
              <td>Ask how tenant separation is enforced and tested; run the ID-swap test across two tenants</td>
            </tr>
            <tr>
              <td><strong>Account takeover with a reused or guessed password</strong></td>
              <td>Multi-factor authentication for every user; passwords checked against breached lists; rate limiting</td>
              <td><Src href={V6}>v5.0.0-6.3.3</Src> [L2]: multi-factor, or a combination of single-factor mechanisms, must be used. <Src href={V6}>v5.0.0-6.2.12</Src> [L2]: passwords checked against a set of breached passwords. Top 10: <Src href={A07}>missing or ineffective multi-factor authentication</Src></td>
              <td>Try to log in with a password only; try a known-breached password at sign-up</td>
            </tr>
            <tr>
              <td><strong>Password reset or lost-device recovery bypasses the second factor</strong></td>
              <td>Reset keeps MFA in force; no security questions</td>
              <td><Src href={V6}>v5.0.0-6.4.3</Src> [L2]: reset must not bypass enabled multi-factor mechanisms. <Src href={V6}>v5.0.0-6.4.2</Src> [L1]: no password hints or secret questions</td>
              <td>Walk through &ldquo;forgot password&rdquo; and &ldquo;lost my phone&rdquo; as a tester; note what the help desk will accept</td>
            </tr>
            <tr>
              <td><strong>A session left open on a shared or stolen device</strong></td>
              <td>Inactivity and absolute timeouts; server-side logout; users and admins can end sessions</td>
              <td><Src href={V7}>v5.0.0-7.3.1 and 7.3.2</Src> [L2]: inactivity timeout and absolute maximum session lifetime. <Src href={V7}>v5.0.0-7.4.1</Src> [L1]: no further use of a session after termination</td>
              <td>Log out, then replay the old session cookie against the API</td>
            </tr>
            <tr>
              <td><strong>Departed staff or a removed delegate keeps access</strong></td>
              <td>Disabling an account ends its sessions at once; permission changes apply immediately</td>
              <td><Src href={V7}>v5.0.0-7.4.2</Src> [L1]: terminate all active sessions when an account is disabled or deleted</td>
              <td>Disable a logged-in test account and watch its next request</td>
            </tr>
            <tr>
              <td><strong>A document link is forwarded</strong></td>
              <td>Downloads go through an authorization check; any direct storage link is short-lived and issued per request; nothing sensitive is cached</td>
              <td><Src href={V14}>v5.0.0-14.2.1</Src> [L1]: the URL and query string do not contain sensitive information such as a session token. <Src href={V14}>v5.0.0-14.3.2</Src> [L2]: anti-caching headers so sensitive data is not cached in browsers</td>
              <td>Copy a download link into a private browser window; note how long it works</td>
            </tr>
            <tr>
              <td><strong>A confidential document leaks and cannot be traced</strong></td>
              <td>Per-investor watermark applied at view or download; access logged with the same identifier</td>
              <td>No requirement in the standards cited here covers watermarking; it is a deterrent and a tracing aid, not access control</td>
              <td>Download the same file as two investors and compare; find both events in the log</td>
            </tr>
            <tr>
              <td><strong>Nobody can show who accessed what</strong></td>
              <td>Log every sign-in, refusal and sensitive-document access with who, what, when and where; keep logs where the application cannot alter them</td>
              <td><Src href={V16}>v5.0.0-16.2.1</Src> [L2]: each entry includes when, where, who, what. <Src href={V16}>v5.0.0-16.3.1 and 16.3.2</Src> [L2]: authentication operations and failed authorization attempts are logged. <Src href={V16}>v5.0.0-16.4.2</Src> [L2]: logs protected from unauthorized access and cannot be modified. Top 10: <Src href={A09}>an audit trail with integrity controls, such as append-only database tables</Src></td>
              <td>Ask for the log of one named document over one quarter; ask who can delete a log entry</td>
            </tr>
            <tr>
              <td><strong>A capital call or wire-detail change is released by one compromised account</strong></td>
              <td>Re-authentication before the action; a second person approves release</td>
              <td><Src href={V7}>v5.0.0-7.5.3</Src> [L3]: further authentication before highly sensitive transactions. <Src href={V2}>v5.0.0-2.3.5</Src> [L3]: high-value business logic flows require multi-user approval</td>
              <td>As a single IR user, try to change bank details and send a notice in one session</td>
            </tr>
            <tr>
              <td><strong>Bulk scraping through a valid account</strong></td>
              <td>Rate limits and alerts on unusual download volume; export is a permission, not a default</td>
              <td><Src href={V2}>v5.0.0-2.4.1</Src> [L2]: anti-automation controls against excessive calls that could lead to data exfiltration</td>
              <td>Script 500 document requests on a test account; see what is blocked and who is alerted</td>
            </tr>
            <tr>
              <td><strong>A malicious file is uploaded</strong> (signed subscription documents, KYC files)</td>
              <td>Allowed types and sizes enforced; content checked against extension; files scanned</td>
              <td><Src href={V5}>v5.0.0-5.2.2</Src> [L1]: extension and content validated. <Src href={V5}>v5.0.0-5.4.3</Src> [L2]: files from untrusted sources scanned by antivirus</td>
              <td>Upload a renamed executable and an oversized file</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Authentication and session settings to ask for</h2>
      <p>
        NIST SP 800-63B-4 gives concrete numbers. Its second assurance level, AAL2, requires{' '}
        <Src href={NIST_B}>proof of possession and control of two distinct authentication factors</Src>, which is
        the sensible floor for a portal holding tax documents and bank details.
      </p>
      <ul className="cp-checklist">
        <li>Multi-factor sign-in for every account, with <Src href={NIST_B}>at least one phishing-resistant option offered</Src>, as NIST requires of verifiers at AAL2.</li>
        <li>Email is not a second factor: NIST says <Src href={NIST_B}>email shall not be used for out-of-band authentication</Src>.</li>
        <li>SMS codes only alongside a stronger option. ASVS allows them only when <Src href={V6}>alternate stronger methods, such as time-based one-time passwords, are also offered</Src> (v5.0.0-6.6.1).</li>
        <li>Passwords that are one of two factors: <Src href={NIST_B}>a minimum of eight characters</Src>; passwords used alone, <Src href={NIST_B}>a minimum of 15</Src>.</li>
        <li>No composition rules and no forced periodic change: verifiers <Src href={NIST_B}>shall not impose other composition rules</Src> and <Src href={NIST_B}>shall not require subscribers to change passwords periodically</Src>, but must force a change on evidence of compromise.</li>
        <li>New passwords checked against <Src href={NIST_B}>a blocklist of commonly used, expected or compromised passwords</Src>.</li>
        <li>Password managers and paste allowed: verifiers <Src href={NIST_B}>shall allow the use of password managers and autofill</Src>.</li>
        <li>Session limits written down. NIST&apos;s AAL2 figures are <Src href={NIST_B}>an overall timeout of no more than 24 hours and an inactivity timeout of no more than 1 hour</Src>. ASVS asks that any deviation from NIST&apos;s re-authentication requirements <Src href={V7}>be documented with a justification</Src> (v5.0.0-7.1.1).</li>
        <li>Re-authentication before changing email, phone or MFA settings (<Src href={V7}>v5.0.0-7.5.1</Src>), and a way for users to <Src href={V7}>view and end their active sessions</Src> (v5.0.0-7.5.2).</li>
        <li>Single sign-on for your own staff, if you use it, with session lifetime and sign-out behavior documented (<Src href={V7}>v5.0.0-7.1.3</Src>).</li>
      </ul>

      <h2>Documents: storage, links, watermarks and export</h2>
      <ul className="cp-checklist">
        <li>Classify document types by sensitivity before building: ASVS asks that <Src href={V14}>all sensitive data be identified and classified into protection levels</Src> (v5.0.0-14.1.1), each with documented requirements for encryption, retention and logging (v5.0.0-14.1.2).</li>
        <li>Store files outside any public path, encrypted at rest, and serve them only after the permission check for that entity and document.</li>
        <li>If storage links are used, treat each as a password: issued per request, short-lived, never emailed. A signed link carries its own access, so its lifetime is the control.</li>
        <li>Notification emails say a document is ready and link to the login page. They do not attach the document.</li>
        <li>Watermark at the moment of access with the investor&apos;s identity, a timestamp and an ID that also appears in the audit log. The case study describes this arrangement: each document viewed or downloaded is watermarked with the investor&apos;s name, access timestamp and a unique tracking ID.</li>
        <li>Decide per document type whether download is allowed or view-only, and say plainly that view-only does not stop a screenshot.</li>
        <li>Make bulk export a separate permission with its own log entry and alert.</li>
        <li>Keep versions. A replaced K-1 or notice stays retrievable, with a record of who replaced it.</li>
        <li>Set retention: ASVS expects that <Src href={V14}>outdated or unnecessary sensitive data is deleted on a defined schedule</Src> (v5.0.0-14.2.7, Level 3). What you must keep, and for how long, is a question for counsel.</li>
      </ul>

      <h2>The audit trail</h2>
      <p>
        An audit trail is useful only if it answers a specific question months later. Record at least:
      </p>
      <ul className="cp-checklist">
        <li>Who: user, the entity they acted for, role, and whether they acted as a delegate.</li>
        <li>What: document or record ID and version, and the action (viewed, downloaded, exported, signed, shared, permission changed).</li>
        <li>When: in UTC or with an offset, from synchronized clocks (<Src href={V16}>v5.0.0-16.2.2</Src>).</li>
        <li>Where: IP address and device or session identifier.</li>
        <li>The watermark ID for any file that left the system.</li>
        <li>Refusals as well as successes. The Top 10 advises: <Src href={A01}>log access control failures and alert admins when appropriate</Src>.</li>
        <li>Administrator actions: role grants, delegation, account disablement, impersonation if the product has it.</li>
      </ul>
      <p>
        Then protect it. Logs should go{' '}
        <Src href={V16}>to a logically separate system, so that if the application is breached the logs are not compromised</Src>{' '}
        (v5.0.0-16.4.3), must not contain credentials or session tokens in the clear (v5.0.0-16.2.5), and need a
        stated retention period (v5.0.0-16.1.1). Investors and auditors should be able to get an extract without an
        engineer.
      </p>

      <h2>E-signature and capital call flows</h2>
      <ul className="cp-checklist">
        <li>The signer is authenticated in the portal before the signing session starts; the signing link is not usable by whoever holds the email.</li>
        <li>Steps cannot be skipped or replayed: ASVS requires that flows run <Src href={V2}>in the expected sequential step order and without skipping steps</Src> (v5.0.0-2.3.1).</li>
        <li>The signed file, its completion certificate and the signer&apos;s portal identity are stored together and logged.</li>
        <li>Callbacks from the e-signature provider are verified as coming from that provider before the portal marks anything as signed.</li>
        <li>A delegate&apos;s right to view is separate from a right to sign.</li>
        <li>Bank and wire details are never changed on the strength of an email. Changes need re-authentication and a second approver, and the investor is notified through a channel already on file.</li>
        <li>A capital call notice is released only after a second person approves it, and every recipient list is derived from the cap table, not typed.</li>
      </ul>
      <p>
        Whether a given electronic signature is valid for a given document in a given jurisdiction is a legal
        question. Ask counsel; this guide does not answer it.
      </p>

      <h2>Questions to ask a vendor or a development team</h2>
      <p>
        Ask for the document, not the adjective. Ask the same questions of an internal team or of us.
      </p>
      <h3>Incidents and breaches</h3>
      <ul>
        <li>Do you have a written incident response plan? Who decides that an event is a breach, and how soon are we told?</li>
        <li>What will you give us after an incident: affected accounts, documents accessed, time range, from which logs?</li>
        <li>How long are access logs kept, and can we export them ourselves?</li>
        <li>When did you last restore from backup as a test, and how long did it take?</li>
        <li>Which third parties process our investors&apos; data (hosting, email, e-signature, analytics), and what does each receive? ASVS asks that sensitive data <Src href={V14}>is not sent to untrusted parties such as user trackers</Src> (v5.0.0-14.2.3).</li>
      </ul>
      <h3>Assurance</h3>
      <ul>
        <li>Has the application been assessed against ASVS? Which version and level, by whom, and may we see the report?</li>
        <li>Is there an independent audit report or penetration test we can read under NDA, and what was its scope and date?</li>
        <li>Show us the ID-swap test from the table above, live, on a test tenant.</li>
        <li>How are your own staff&apos;s access to production data granted, logged and reviewed?</li>
      </ul>
      <h3>Data location and exit</h3>
      <ul>
        <li>In which country and with which provider are documents, databases, backups and logs stored? Does support staff access them from elsewhere?</li>
        <li>Can we choose the region, and will it change without notice?</li>
        <li>On termination, in what format do we get our data and audit logs, and when is your copy deleted?</li>
      </ul>
      <h3>For your counsel, not your vendor</h3>
      <ul>
        <li>Which privacy, securities and record-keeping rules apply to our firm and our investors, including investors outside the US?</li>
        <li>Do any of them set a breach-notification deadline, a retention period or a data-location requirement?</li>
        <li>What must our agreement with the vendor say about each?</li>
      </ul>
      <p>
        We have left regulation as questions on purpose: we are engineers, not lawyers, and the rules depend on
        how your firm is registered and where your investors are.
      </p>

      <h2>Acceptance tests before launch</h2>
      <ul className="cp-checklist">
        <li>ID-swap test on every record type and every file route, for every role.</li>
        <li>Each role&apos;s raw API responses compared with the written access model.</li>
        <li>Password-only login refused; reset and recovery paths keep the second factor.</li>
        <li>Old session cookie rejected after logout, timeout and account disablement.</li>
        <li>Copied download link fails in another browser after its lifetime.</li>
        <li>Two investors&apos; copies of one file carry different watermarks, both found in the log.</li>
        <li>One user cannot both change bank details and release a notice.</li>
        <li>A scripted bulk download is throttled and raises an alert.</li>
        <li>An audit extract for one document and one quarter is produced without an engineer.</li>
        <li>A backup restore is performed and timed.</li>
      </ul>

      <GuideFaq slug={SLUG} items={[
        { question: 'What is the biggest security risk in an investor portal?', answer: ['Broken access control: one investor seeing another’s records. It is first in the OWASP Top 10:2025, which reports that ', ['100% of the applications tested were found to have some form of broken access control', A01], '. Test it directly by logging in as one investor and requesting another investor’s document ID.'] },
        { question: 'Should an investor portal require multi-factor authentication?', answer: ['Yes. OWASP ASVS 5.0.0 requires at Level 2 that ', ['multi-factor authentication, or a combination of single-factor mechanisms, must be used', V6], ', and NIST’s AAL2 requires ', ['two distinct authentication factors', NIST_B], '. Email does not count as one: NIST says ', ['email shall not be used for out-of-band authentication', NIST_B], '.'] },
        { question: 'How long should an investor portal session last?', answer: ['Set it by risk and write it down. As a public benchmark, NIST SP 800-63B-4 gives for AAL2 ', ['an overall timeout of no more than 24 hours and an inactivity timeout of no more than 1 hour', NIST_B], '. ASVS 5.0.0 asks for both an inactivity timeout and an absolute session lifetime at Level 2.'] },
        { question: 'Does watermarking stop documents from leaking?', answer: ['No. A watermark does not prevent copying; it deters it and lets you trace a leaked copy to an account and an access event. It works only if the watermark ID is also in the audit log, and it is no substitute for the permission check that decides who can open the file.'] },
        { question: 'What should an investor portal audit trail record?', answer: ['Who acted and for which entity, what they did to which document version, when, and from where. ASVS 5.0.0 requires that ', ['each log entry includes metadata such as when, where, who, what', V16], ' and that ', ['logs are protected from unauthorized access and cannot be modified', V16], '. Log refusals as well as successful access.'] },
      ]} />

      <p className="cp-note">
        Requirement numbers and quotations are from OWASP ASVS 5.0.0, the OWASP Top 10:2025 and NIST SP 800-63B-4,
        read on October 10, 2026. This is a design checklist, not legal advice and not a certification; nothing in
        it states that any product, including work described in our case study, has been audited or certified
        against these standards. The SEC&apos;s website did not serve its pages to us on that date, so no
        regulatory requirement is stated here.
      </p>
      <p>
        Planning an investor portal? See our{' '}
        <Link href="/services/investor-portal-development">investor portal development service</Link> and the{' '}
        <Link href="/case-studies/proptech-investor-portal">case study</Link> behind it. Every project starts with
        a 30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
