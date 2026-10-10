# Source verification log: /blog/investor-portal-security-checklist

Every URL below was fetched on **2026-10-10** (HTTP 200) and the quoted text was read that day. ASVS text was read from the raw Markdown at tag `v5.0.0` (`raw.githubusercontent.com/OWASP/ASVS/v5.0.0/5.0/en/<file>`); the guide links the matching `github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/<file>` pages, each of which returned 200. Requirement numbers are written `v5.0.0-<chapter>.<section>.<requirement>`; the level in brackets is the level column of that row.

## Which versions are current

| URL | Text relied on |
|---|---|
| https://owasp.org/www-project-application-security-verification-standard/ | "Get the latest stable version of the ASVS (5.0.0) from the Downloads page." · "Since the identifiers may change between versions of the standard, it is preferable for other documents, reports, or tools to use the following format: v<version>-<chapter>.<section>.<requirement>" |
| https://github.com/OWASP/ASVS (README) | "The latest stable version is version 5.0.0 (dated May 2025)" |
| https://owasp.org/Top10/2025/ | owasp.org/Top10/ redirects to "OWASP Top 10:2025"; list begins "A01:2025 - Broken Access Control" |
| https://pages.nist.gov/800-63-4/ | "In July 2025, NIST released the final version of SP 800-63, Revision 4." |
| https://csrc.nist.gov/pubs/sp/800/63/b/4/final (checked, not linked) | "Date Published: July 2025" · "This guideline focuses on the authentication of subjects who interact with government information systems over networks" |

## OWASP ASVS 5.0.0

| File (under `.../blob/v5.0.0/5.0/en/`) | Requirement and text relied on |
|---|---|
| 0x03-What-is-the-ASVS.md | "The ASVS defines three security verification levels" · Level 2: "Most applications should be striving to achieve this level of security." |
| 0x04-Assessment_and_Certification.md | "OWASP, as a vendor-neutral nonprofit, does not certify any vendors, verifiers, or software. ... organizations should be cautious of third-party claims of ASVS certification." |
| 0x17-V8-Authorization.md | 8.1.1 [1] "authorization documentation defines rules for restricting function-level and data-specific access based on consumer permissions and resource attributes" · 8.1.2 [2] "rules for field-level access restrictions (both read and write)" · 8.2.2 [1] "data-specific access is restricted to consumers with explicit permissions to specific data items to mitigate insecure direct object reference (IDOR)" · 8.2.3 [2] "field-level access is restricted to consumers with explicit permissions to specific fields" · 8.3.1 [1] "enforces authorization rules at a trusted service layer and doesn't rely on controls that an untrusted consumer could manipulate, such as client-side JavaScript" · 8.4.1 [2] "multi-tenant applications use cross-tenant controls to ensure consumer operations will never affect tenants with which they do not have permissions to interact" |
| 0x15-V6-Authentication.md | 6.2.12 [2] "checked against a set of breached passwords" · 6.3.3 [2] "either a multi-factor authentication mechanism or a combination of single-factor authentication mechanisms, must be used in order to access the application" · 6.4.2 [1] "password hints or knowledge-based authentication (so-called \"secret questions\") are not present" · 6.4.3 [2] "a secure process for resetting a forgotten password is implemented, that does not bypass any enabled multi-factor authentication mechanisms" · 6.6.1 [2] PSTN one-time passwords "offered only when the phone number has previously been validated, alternate stronger methods (such as Time based One-time Passwords) are also offered" |
| 0x16-V7-Session-Management.md | 7.1.1 [2] "documentation includes justification for any deviations from NIST SP 800-63B re-authentication requirements" · 7.1.3 [2] federated session lifetimes documented · 7.3.1 [2] inactivity timeout · 7.3.2 [2] absolute maximum session lifetime · 7.4.1 [1] "when session termination is triggered ... the application disallows any further use of the session" · 7.4.2 [1] "terminates all active sessions when a user account is disabled or deleted" · 7.5.1 [2] "full re-authentication before allowing modifications to sensitive account attributes ... such as email address, phone number, MFA configuration" · 7.5.2 [2] "users are able to view and ... terminate any or all currently active sessions" · 7.5.3 [3] "further authentication with at least one factor or secondary verification before performing highly sensitive transactions or operations" |
| 0x23-V14-Data-Protection.md | 14.1.1 [2] "all sensitive data created and processed by the application has been identified and classified into protection levels" · 14.1.2 [2] documented protection requirements · 14.2.1 [1] "the URL and query string do not contain sensitive information, such as an API key or session token" · 14.2.3 [2] "defined sensitive data is not sent to untrusted parties (e.g., user trackers)" · 14.2.7 [3] "outdated or unnecessary data is deleted automatically, on a defined schedule, or as the situation requires" · 14.3.2 [2] "anti-caching HTTP response header fields (i.e., Cache-Control: no-store) so that sensitive data is not cached in browsers" |
| 0x25-V16-Security-Logging-and-Error-Handling.md | 16.1.1 [2] log inventory including "for how long logs are kept" · 16.2.1 [2] "each log entry includes necessary metadata (such as when, where, who, what)" · 16.2.2 [2] "timestamps in security event metadata use UTC or include an explicit time zone offset" · 16.2.5 [2] credentials not logged, session tokens only hashed or masked · 16.3.1 [2] "all authentication operations are logged, including successful and unsuccessful attempts" · 16.3.2 [2] "failed authorization attempts are logged" · 16.4.2 [2] "logs are protected from unauthorized access and cannot be modified" · 16.4.3 [2] "logs are securely transmitted to a logically separate system ... if the application is breached, the logs are not compromised" |
| 0x11-V2-Validation-and-Business-Logic.md | 2.3.1 [1] "only process business logic flows for the same user in the expected sequential step order and without skipping steps" · 2.3.5 [3] "high-value business logic flows require multi-user approval" · 2.4.1 [2] "anti-automation controls are in place to protect against excessive calls to application functions that could lead to data exfiltration" |
| 0x14-V5-File-Handling.md | 5.2.2 [1] "checks if the file extension matches an expected file extension and validates that the contents correspond to the type represented by the extension" · 5.4.3 [2] "files obtained from untrusted sources are scanned by antivirus scanners" |

## OWASP Top 10:2025

| URL | Text relied on |
|---|---|
| https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/ | "Maintaining its position at #1 in the Top Ten, 100% of the applications tested were found to have some form of broken access control." · "Permitting viewing or editing someone else's account by providing its unique identifier (insecure direct object references)" · "Except for public resources, deny by default." · "Log access control failures, alert admins when appropriate (e.g., repeated failures)." |
| https://owasp.org/Top10/2025/A07_2025-Authentication_Failures/ | "Has missing or ineffective multi-factor authentication." |
| https://owasp.org/Top10/2025/A09_2025-Security_Logging_and_Alerting_Failures/ | "Ensure all transactions have an audit trail with integrity controls to prevent tampering or deletion, such as append-only database tables or similar." |

## NIST SP 800-63B-4

| URL | Text relied on |
|---|---|
| https://pages.nist.gov/800-63-4/sp800-63b.html | AAL2: "Proof of possession and control of two distinct authentication factors through the use of secure authentication protocols is required." · "Verifiers SHALL offer at least one phishing-resistant authentication option at AAL2" · "Email SHALL NOT be used for out-of-band authentication" · "Verifiers and CSPs SHALL require passwords that are used as a single-factor authentication mechanism to be a minimum of 15 characters in length. ... passwords that are only used as part of multi-factor authentication processes ... a minimum of eight characters in length." · "Verifiers and CSPs SHALL NOT impose other composition rules" · "Verifiers and CSPs SHALL NOT require subscribers to change passwords periodically. However, verifiers SHALL force a change if there is evidence that the authenticator has been compromised." · "verifiers SHALL compare the prospective secret against a blocklist that contains known commonly used, expected, or compromised passwords" · "Verifiers SHALL allow the use of password managers and autofill functionality." · AAL2: "A definite reauthentication overall timeout SHALL be established, which SHOULD be no more than 24 hours at AAL2. The inactivity timeout SHOULD be no more than 1 hour." |

## Not used because it could not be verified

- **Any SEC rule** (Regulation S-P, adviser record-keeping, breach-notification deadlines): `https://www.sec.gov/newsroom/press-releases/2024-58` returned HTTP 403 to two different user agents. No regulatory requirement is stated; the guide lists questions for the buyer's counsel.
- **E-signature law** (ESIGN, UETA, provincial acts): no primary source fetched; stated as a question for counsel.
- **Data-residency law**: not asserted; listed as vendor and counsel questions.
- **Watermarking**: none of the standards read covers it; the guide says so instead of citing one.
- **SOC 2, ISO 27001 or any certification status of any vendor or of Peregrine**: not stated anywhere. The case-study page mentions a testing phase; by instruction the guide does not repeat it.

## Statements about Peregrine and where they come from

All from the current `src/app/case-studies/proptech-investor-portal/page.tsx`:
- Six role types (LP, GP, Family Office Admin, Legal, Auditor, IR Team) with entity-level permissions covering fund, co-invest and SPV participation.
- Permissions enforced "at the API level — not just the UI".
- Each document viewed or downloaded is watermarked with the investor's name, access timestamp and a unique tracking ID.

Other:
- "Every project starts with a 30-minute technical discovery call with an engineer": `public/llms.txt`.
- The role table's cells are labeled in the guide as questions to settle, not a description of the case-study system.
- The guide states that nothing in it says any product, including the case-study work, has been audited or certified against the cited standards.
