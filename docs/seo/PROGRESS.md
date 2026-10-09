# Progress log

One entry per task, newest last. Hashes are on `seo/phase-12`.

## T0 — execution state
- **Files:** `CLAUDE.md`, `docs/seo/*`, `scripts/seo_check.py`, `scripts/serve-local.sh`, `.gitignore`
- **Commits:** `be1462b`, plus the commit that adds `docs/seo/`
- **Tests:** production build; `seo_check.py` on 39 URLs → FAILS: 0
- **Remaining:** none
- **Next:** T3

## T3 + T4 — consultation CTA, short form, events, attribution
- **Files:** `src/lib/track.ts`, `src/app/components/Tracking.tsx`, `ConsultationCta.tsx`, `LeadForms.tsx`, `GuideLayout.tsx`, `src/app/services/[slug]/page.tsx`, `src/app/api/lead/route.ts`, `src/data/guides.ts`, `src/app/layout.tsx`, `src/app/css/content-pages.css`, `next.config.ts`
- **Commit:** `a4c6551`
- **What changed:** every guide and service page ends with a consultation block and the short form (guides had no CTA at all). Six events go to Vercel Analytics, and to GA4 when the ID is set. Leads carry landing page, referrer and UTM. The API has a honeypot, a rate limit, an optional CRM webhook and a configurable sender, and returns an error instead of a false "sent" when nothing accepted the lead.
- **Tests:** `tsc` clean; `eslint` clean on changed files; build; `seo_check.py` FAILS: 0; API exercised with curl: honeypot → 200 and dropped, bad email → 400, no destination → 502, sixth request → 429; webhook delivery verified against a local listener with all attribution fields; block checked in the browser at 1280 px.
- **Remaining:** B2 (GA4 ID, consent), B3 (webhook URL, verified sender), B4 (one response-time promise). Events were not observed in a GA4 property because none is configured.
- **Next:** T2

## T2 — MLS/IDX cost guide
- **Files:** `src/app/blog/mls-idx-integration-cost/page.tsx`, `src/data/guides.ts`, `public/llms.txt`
- **Commit:** `bdc88d9`
- **What changed:** title and description carry "per month / per year"; a cost-at-a-glance table regroups the cited figures by billing unit; new sections on MLS Grid pricing and per-user pricing; four FAQ entries; link to the calculator.
- **Tests:** all 15 sources re-fetched on 2026-10-09 and every cited figure found on its page (Clutch checked in a browser because it blocks scripts); build; `seo_check.py` FAILS: 0 (FAQPage equals the visible FAQ, 9 questions).
- **Remaining:** no first-hand prices or approval timelines (B8). Canada coverage is still one CREA fee.
- **Next:** T1

## T1 — seven title and description experiments
- **Files:** five case-study `page.tsx` files, `src/data/case-studies.ts`, `src/data/services.ts` (Odoo), `src/data/guides.ts` (in T2)
- **Commit:** `30339d0`
- **Tests:** build; `seo_check.py` FAILS: 0 (all titles ≤ 60, descriptions ≤ 160, unique).
- **Remaining:** results can only be read after about 300 further impressions per page. Baselines are in `TASKS.md`.
- **Next:** T9

## T7, T8, T9 — industry hub, self-storage page, investor portal page
- **Files:** `src/data/industries.ts`, `src/app/industries/[slug]/page.tsx`, `src/app/industries/page.tsx`, `src/data/services.ts`, `Footer.tsx`, `Navbar.tsx`, `CaseStudyGlance.tsx`, `RelatedCaseStudies.tsx`, `src/app/services/[slug]/page.tsx`, `sitemap.ts`, `public/llms.txt`; removed the static `industries/real-estate/page.tsx` (same URL now served by the data-driven route)
- **Commit:** `5125afc`
- **Tests:** `tsc`, `eslint` on changed files, build, `seo_check.py` on 45 URLs FAILS: 0; hub and self-storage page checked in the browser at 1280 px.
- **Remaining:** self-storage page does not name lock vendors (B10). The investor portal page rests on one case study and says so.
- **Next:** T12

## T10–T13 — technology service pages
- **Files:** `src/data/technology-services.ts`, `src/data/services.ts`, `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`, `about/page.tsx`, `Footer.tsx`, `CaseStudyGlance.tsx`, `scripts/seo_check.py`, `public/llms.txt`
- **Commit:** `36228d7`
- **Tests:** build; `seo_check.py` on 50 URLs FAILS: 0, including the new rule that each service page has five 40–60-word answers naming Peregrine; 5-word-shingle uniqueness of each service page against the other eleven: 69.5%–79.2%.
- **Remaining:** Shopify, Laravel and WordPress have no project proof (B5); they state that no case study is published. No keyword-volume validation was done for any of the five.
- **Next:** T16

## T5, T16 — client links and housekeeping
- **Files:** `about/page.tsx`, 19 case-study pages (robots override removed), `w3re-ai-real-estate-platform/page.tsx`, `src/data/case-studies.ts`, `layout.tsx`, `scripts/seo_check.py`
- **Commit:** `e587a48`
- **Tests:** build; `seo_check.py` FAILS: 0, including the new rule that every page carries `max-image-preview:large`.
- **Remaining:** team section (B7); W3|re figures and dashboard block (B9); CSP `report-to`; homepage media weight.
- **Next:** T15

## T15 — MLS and IDX cost calculator
- **Files:** `src/data/mls-fees.ts`, `src/app/components/MlsCostCalculator.tsx`, `src/app/tools/mls-idx-cost-calculator/page.tsx`, `content-pages.css`, `sitemap.ts`, cost guide, MLS service page, `/blog` hub, `public/llms.txt`
- **Commit:** `55bc3f8`
- **Tests:** `tsc`, `eslint`, build, `seo_check.py` on 51 URLs FAILS: 0. One combination worked by hand and matched in the browser: Realtyna + Stellar broker (20 offices) + MLS PIN vendor + CREA + Trestle technology provider (2 connections) + 100 US hours → $824–$974 per month, $7,500 annual, $17,388–$19,188 per year, $850 plus CAD 1,500 one-time, $5,000–$9,900 development.
- **Remaining:** fee data is duplicated between the guide and `mls-fees.ts`; both must be updated together. No automated unit test for the fee functions.
- **Next:** T17, T18

## T17, T18 — article briefs and outreach assets
- **Files:** `docs/seo/ARTICLES.md`, `docs/seo/OUTREACH.md`
- **Commit:** see the docs commit after `55bc3f8`
- **Tests:** none (documents).
- **Remaining:** no article is written or published; each needs its sources gathered first. Nothing in OUTREACH.md has been sent.
- **Next:** write article 1 (investor portal vs file sharing) once its vendor sources are gathered; phone-width visual pass on the new pages; then owner blockers.

## Phone-width pass (after T15)
- Checked at 375 px in the browser: calculator, `/industries`, `/industries/self-storage`, `/services/shopify-development`, a case study. No horizontal overflow; calculator inputs are at least 44 px tall; the consultation block stacks to one column.
- **Not done:** Lighthouse accessibility and performance runs on the new pages; a real-device check.

## Review of Phases 11 and 12 together (2026-10-09)
- **Review:** an independent reviewer read `origin/main...HEAD`. No critical or high defects. Fixed: honeypot field named `website` could be autofilled and silently drop a real lead; `guide_cta_click` never fired; footer pulled the data files into the client bundle; two React Native claims and three smaller statements went beyond their case studies; webhook had no timeout; a null body returned 500; calculator turned "from" and "typically" into hard bounds and scaled SimplyRETS incorrectly; form inputs had no accessible names. **Not fixable in code:** the Resend test sender (B3).
- **Commits:** `884aa5b` (API, forms, tests), `864a9f0` (consent, guide event), `b8823a1` (media, footer props, nav), `31b7446` (claims, calculator)
- **Tests:**
  - `scripts/test_lead_api.py`: 39 passed. Four configurations (none, webhook, Resend mock, both), including one destination down and both down.
  - Browser, GA4 test ID + local webhook: consent default denied, no `_ga` cookie before Accept, Accept stored and sent as a consent update; `lead_submit`, `cta_open`, `calendly_click`, `email_click` observed in `dataLayer`; the inline form showed success and the webhook received company, timeline, service and page.
  - Headless Chrome at 1280 px: hero video gets its sources, the off-screen CTA video does not.
  - Nav at 1024 px: no wrapped link; hamburger below 1024.
  - `seo_check.py`: FAILS: 0; `tsc` clean; `eslint` clean on every changed file (the two `any` errors in LeadForms are fixed; two older ones remain in `src/app/page.tsx`).
- **Remaining:** events not observed in a real GA4 property; no real Resend send (mocked); Lighthouse not re-run on the new pages.

## T17 — first guide: investor portal vs file sharing
- **Files:** `src/app/blog/investor-portal-vs-file-sharing/page.tsx`, `opengraph-image.tsx`, `src/data/guides.ts`, `services.ts`, `industries.ts`, `public/llms.txt`
- **Commit:** `9470849`
- **Sources:** gathered by a research pass that matched each quote against the fetched page; I re-fetched the price and plan statements myself (Agora, Cash Flow Portal, Covercy, InvestNext, SponsorCloud, Box, Dropbox, Juniper Square, Microsoft, Google; AppFolio in a browser because its price renders client-side). Two SEC quotes could not be matched against the raw page and were left out.
- **Tests:** build; `seo_check.py` on 52 URLs FAILS: 0 (FAQPage equals the visible FAQ); 1,572 words, 40 source links to 25 pages; no dollar figure outside a source link.
- **Remaining:** vendor disclosure (B14). The guide states that no product was evaluated. The homepage shows four chosen guides (`homeGuides`), so the four-column grid stays full; the CRM guide is reachable from /blog and its service page.
- **Next:** owner review of DEPLOYMENT.md section 2, then merge; after that, articles 2–5.

## Loop iteration 1 (2026-10-09)

### Q1 — code quality
- **Files:** `src/app/page.tsx`, `scripts/test_mls_fees.mjs`
- **What changed:** removed a dead category-filter effect from the homepage (it looked for buttons that only exist on /case-studies, and carried the last two `any` lint errors) and two unused imports. Added unit tests for every fee formula in the calculator.
- **Tests:** `node --experimental-strip-types scripts/test_mls_fees.mjs` → 56 passed; `eslint src/app/page.tsx` → 0 errors (68 pre-existing warnings, mostly `<img>` in legacy markup); `tsc` clean.
- **Remaining:** the 68 lint warnings are untouched.

### Q2 — CSP reporting
- **Files:** `src/app/api/csp-report/route.ts`, `next.config.ts`
- **What changed:** the report-only policy now has `report-uri` and `report-to`; violations are logged as `CSP violation {directive, blocked, page, source}`.
- **Tests:** build; headers present on `/`; legacy, Reporting-API and malformed bodies each return 204; `seo_check.py` FAILS: 0; `test_lead_api.py` 39 passed.
- **Remaining:** enforcing the policy needs two weeks of production reports (Q9).
- **Next:** Q7 while the research for Q3–Q5 runs.

### Q7 — Lighthouse on new page types
- **Pages:** `/industries`, `/industries/self-storage`, `/services/nextjs-development`, `/services/investor-portal-development`, `/tools/mls-idx-cost-calculator`, both newest guides. Mobile, local build, one run each.
- **Result:** accessibility 100, SEO 100, performance 95–96, CLS 0, TBT 16–124 ms on all seven. The only failed audit is "errors in console", caused by Vercel's analytics scripts returning 404 on localhost; it does not occur on Vercel.
- **Remaining:** none. Single local runs; production numbers will differ.

### Q6 — guide: IDX vendor vs custom build
- **Files:** `src/app/blog/idx-vendor-vs-custom-build/` (page, OG image), `src/data/guides.ts`, `services.ts`, `industries.ts`, cost guide (link, per-user wording, NAR note), `public/llms.txt`
- **Tests:** build; `seo_check.py` on 53 URLs FAILS: 0; 1,380 words, 19 source links, no dollar figure outside a source link; 93.2% unique on 5-word shingles against the cost guide.
- **Findings while writing:**
  - NAR's MLS policy handbook pages (7.58, 7.90, VOW policy) now show "Login Required". The cost guide and the data-access guide cite them. The cost guide now says the NAR statements are as read on September 29. The data-access guide is unchanged (its `dateModified` is unchanged too). Follow-up: find a public NAR source or drop the direct quotes at the next quarterly re-check.
  - NorthstarMLS blocks automated access, so its fees in the data-access guide could not be re-verified today.
  - The cost guide's new "priced per user" section now says some MLSs do tier vendor fees by user count and points to the data-access guide, which cites one.
- **Next:** Q3.

### Q3 — guide: RESO Web API vs RETS
- **Files:** `src/app/blog/reso-web-api-vs-rets/`, `guides.ts`, `services.ts`, `industries.ts`, cost guide (link), `content-pages.css` (inline code style), `llms.txt`
- **Commit:** `1519884`
- **Tests:** 34 quoted statements re-fetched and matched by me (RESO, transport.reso.org, dd.reso.org, MLS Grid docs, Trestle docs, ARMLS, RLCAR, Metro MLS, Spark RETS docs); build; `seo_check.py` on 54 URLs FAILS: 0; 1,325 words, 48 source links; 97.4% unique against the other MLS guides.
- **Remaining:** no statement on how long a migration takes (B8). Bridge's limits were left out because its docs could only be matched in a JavaScript bundle.

### Q4 — guide: self-storage software, build or buy
- **Files:** `src/app/blog/self-storage-software-build-vs-buy/`, `guides.ts`, `industries.ts`, `llms.txt`
- **Commit:** `6a66eea`
- **Tests:** 26 vendor statements re-fetched and matched by me; build; `seo_check.py` on 55 URLs FAILS: 0; 1,172 words, 35 source links; 97.4% unique against `/industries/self-storage`.
- **Remaining:** Stora's dollar prices render client-side and vary by unit count, so the guide says "published by unit count, starting at 50 units" without a figure. Unit Trac's per-unit figure is split across markup, so only its stated minimum is quoted. Vendor disclosure is TODO(owner) (B14 now covers this guide too).

### Q5 — guide: MLS data access in Canada
- **Files:** `src/app/blog/mls-data-access-canada/`, `guides.ts`, `services.ts`, `industries.ts`, `llms.txt`
- **Commit:** see the commit after `6a66eea`
- **Tests:** CREA's June 2026 DDF rules PDF (10 quotes), the technology-provider pricing post and its image table (read by eye, matches), DDF API docs, PropTx IDX/VOW pages and rules PDF, OREB, BC Rules of Cooperation PDF, VREB, Repliers, SimplyRETS, RESO posts, and realtor.ca's FAQ and Pillar 9 in a browser: all matched. Build; `seo_check.py` on 56 URLs FAILS: 0; 1,541 words, 46 source links; 98.2% unique against the other MLS guides.
- **Remaining:** no board publishes a fee, and the guide says so. Pillar 9's quoted process is about data and report requests, and the guide says no public IDX/VOW program page was found. Centris, Edmonton and Nova Scotia are named as not verified. The fee table's cells are not individually linked; the table has one source line.
- **Also found:** the existing data-access guide cites CREA's February 2024 rules; a June 2026 revision exists (Q14).

### Regression after five new guides
- `test_lead_api.py` 39 passed; `test_mls_fees.mjs` 56 passed; `tsc` clean; `seo_check.py` on 56 URLs FAILS: 0.
- **Next:** Q8 (draft pull request), then Q13 and Q14.

### Q8 — release readiness
- Draft pull request opened: https://github.com/peregrineit/peregrinewebsite/pull/7 (`seo/phase-12` → `main`, draft). Not merged; merging is the owner's decision (B1) after DEPLOYMENT.md section 2.

## Loop status
- **Mechanism:** Claude Code `/loop` in self-paced mode (ScheduleWakeup), started 2026-10-09 in this session. Each wake-up re-reads `CLAUDE.md` and `docs/seo/`, takes the first `ready` row in the loop queue, and pushes to `seo/phase-12`. It runs only while this Claude Code session stays open.
- **Iteration 1 completed:** Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8.
- **Queue now:** Q13 (Odoo implementation cost guide; research running) and Q14 (data-access guide citation follow-up) are `ready`. Q9–Q12 are blocked on the owner or on production data.

## Loop iteration 2 (2026-10-09)

### Q13 — guide: Odoo implementation cost
- **Files:** `src/app/blog/odoo-implementation-cost/`, `guides.ts` (`caseStudy` is now optional), `GuideLayout.tsx`, `services.ts` (Odoo guide link, API facts, `updated`), `llms.txt`
- **Commit:** `e8db863`
- **Verification:** the research reported US-dollar plan prices from an Internet Archive capture. When I fetched that capture it was the page served to **Canada** (CAD), so the USD plan prices were not confirmed and are not in the guide. Verified by me and used: CAD plan prices from that capture; USD Success Pack prices from a US capture dated 2026-08-09; Odoo.sh annual-billing prices in a browser; 20 quotes from Odoo's pricing, documentation and Enterprise agreement; Clutch's ERP consulting rate in a browser. One Odoo.sh sizing quote did not match and was left out.
- **Tests:** build; `seo_check.py` on 57 URLs FAILS: 0; 1,567 words, 52 source links.
- **Also changed:** the Odoo service page named only XML-RPC and JSON-RPC. It now names the JSON-2 API (new in Odoo 19), says the older APIs are scheduled for removal, and that Odoo limits external API access to its Custom plan.
- **Remaining:** USD plan prices (B16). The Success Pack capture is two months old and the guide says so.

### Q14 — data-access guide citations
- **Files:** `src/app/blog/how-to-get-mls-data-access/page.tsx`, `guides.ts`
- **What changed:** CREA citation now points to the June 2026 rules and uses their wording ("REALTOR.ca Canada Inc."); links the Canada guide for fees; the note states that NAR's handbook required a login and NorthstarMLS could not be reached on October 9. `dateModified` is 2026-10-09.
- **Tests:** `seo_check.py` FAILS: 0; `test_lead_api.py` 39 passed; `test_mls_fees.mjs` 56 passed; `tsc` clean.
- **Remaining:** NAR and NorthstarMLS statements could not be re-verified (B17).

## Loop status (final for this run)
- **Iteration 2 completed:** Q13, Q14.
- **Every remaining row in the loop queue is blocked** on the owner, on production data or on a US network check: Q9 (CSP enforcement needs production reports), Q10 (W3|re, B9), Q11 (team, Odoo integrations, MLS timelines, Shopify/Laravel/WordPress proof: B5–B8), Q12 (merge, deploy, IndexNow, outreach: B1, B12), Q15 and Q16 (no case study to build on), Q17 (B16).
- **The loop has stopped itself** as instructed. Restart it with `/loop` after any blocker is cleared; it will read this file and the queue and continue.
- **State of the branch:** `seo/phase-12`, draft PR #7, 57 sitemap URLs, 10 guides, all tests passing.

## Next phase (2026-10-09)

### R6 — release validation
- **Commit:** `641cb6e`
- **Defects found and fixed:** the 19 case-study pages had no `<main>` landmark (Lighthouse accessibility 98, now 100); a failed form submission gave the visitor no other way to reach us (now a prefilled email link); nothing let the owner confirm lead configuration without reading secrets (now `GET /api/lead`, booleans only); `seo_check.py` did not check schema references, robots.txt, llms.txt or a contact path (now does).
- **Results:** in `GO-NO-GO.md` section 1.

### R7 — production readiness
- **Could not be completed.** No access to the site's Vercel project or to Resend from this machine (B19). Public DNS has no Resend records for the domain (B18). Previews need a Vercel sign-in, so no delivery test was run. No customer data was sent anywhere; all delivery tests use a local mock.

### P4.1 — internal linking and conversion paths
- **Commit:** `af7afcc`
- **Files:** `guides.ts` (`related`, `guidesForCaseStudy`), `GuideLayout.tsx`, `RelatedCaseStudies.tsx`, `page.tsx`, `CaseStudiesClient.tsx`
- **What changed:** each guide shows one or two related guides; a case study links to the guides that cite it; the six homepage service cards went nowhere (`href="#"`) and now open the matching service page; the case-study hub's industry counts were hardcoded and wrong (3, 1, 1, 1, 2, 1) and are now computed (4, 3, 3, 4, 3, 4); the hub's "Subscribe" form had no handler and promised weekly updates, so it is removed.
- **Tests:** `tsc` clean; ESLint 0 errors; `seo_check.py` FAILS: 0 on 57 URLs; 41 lead tests; 56 fee tests.

### P4.2 — accuracy review
- An independent read of the site against its own case studies; each finding checked by hand. Fixed where no fact was needed (above). The rest are the owner's to settle: B4, B11, B20, B21, B22.
- **Not changed on purpose:** case-study figures, testimonials and homepage claims. Choosing which of two conflicting numbers is right would be inventing a fact.

## Loop status
- Every remaining item needs the owner: the E1 lead check, the merge, and the facts in BLOCKERS.md. No new article was written: the unblocked topics are covered and the rest have no verified material.

## Credibility and lead delivery (2026-10-09)

### C1 — credibility fixes
- **Files:** `LeadForms.tsx`, `api/lead/route.ts`, `ConsultationCta.tsx`, `Footer.tsx`, `page.tsx`, `services.ts`, `technology-services.ts`, `llms.txt`, `case-studies.ts`, six case-study pages
- **What changed:** listed claim by claim in `GO-NO-GO.md` section 2. Rule followed: remove the contradicted label, keep the project's own figures, compute nothing new.
- **Not changed:** client quotes, homepage stats, the real estate SaaS duration. Reasons in section 2.

### C2 — lead delivery
- **Finding:** Resend is the only provider; the recipient is fixed in code; nothing persists a lead inside the app.
- **Code:** `GET /api/lead` reports `senderDomainVerified` by asking Resend (cached 5 minutes); one retry on the notification email; an 8-character reference on the email subject, webhook payload and log; a `Lead delivered` log line without personal data.
- **Prepared, not deployed:** `scripts/lead-sheet-webhook.gs` and `LEAD-DELIVERY.md`.
- **Tests:** `test_lead_api.py` 44 passed (adds retry, reference, verified and unverified domain status).
- **Remaining:** real delivery is unverified (B18, B19).

### C3 — release re-validation
- Build, `tsc` clean, ESLint 0 errors, `seo_check.py` FAILS: 0 on 57 URLs, 44 lead tests, 56 fee tests. Changed stat cards checked at 375 px: no overflow.

## Loop status
- No safe, independent work remains. Open items need the owner: the lead delivery check, the claims in `GO-NO-GO.md` section 2, and the merge.

## Release preparation (2026-10-09)

### C4 — testimonials and homepage figures
- **Files:** `src/app/page.tsx`, 19 case-study pages, `about/page.tsx` (comment)
- **What changed:** the seven homepage testimonials are now a grid of the same clients' logos and names; the stats row shows 2018, 25+, the case-study count and the industry count (the last two computed from `src/data`); the quote block is removed from each case study; "eliminate downtime" is "reduce downtime".
- **Tests:** `tsc` clean; ESLint 0 errors; `seo_check.py` FAILS: 0 on 57 URLs; 44 lead tests; 56 fee tests; homepage checked at desktop and 375 px, no overflow.

### C5 — real lead test
- **Not done.** The preview redirects to the Vercel login; no credentials are entered by me. No Resend access. Sender status is unknown; recipient confirmed from code. Decision is NO-GO until the test passes.

## Loop status
- Waiting on the owner's setup request (GO-NO-GO.md). No other safe work remains; no new SEO features started.

### C6 — release verification after the Resend domain was verified (2026-10-09)
- DNS now shows Resend's DKIM and `send` records for `peregrine-it.com`.
- The preview still redirects to the Vercel login, so the real submission was not run.
- Local end-to-end run in a browser with a mock mail server: success path (`lead_submit`, notification to `info@peregrine-it.com`, acknowledgement to the visitor) and failure path (`lead_error`, no `lead_submit`, error and email link) both behave as designed.
- Final checks: build, `tsc`, ESLint 0 errors, `seo_check.py` FAILS: 0 on 57 URLs, 44 lead tests, 56 fee tests.
- **Status:** not yet ready to deploy; one real preview submission remains.

### C7 — `main` (favicon fix, PR #8) merged into `seo/phase-12` (2026-10-09)
- **Commit:** `072b05a` (merge, no conflicts).
- **Tests on the merged build:** `tsc` clean; ESLint 0 errors; `seo_check.py` FAILS: 0 on 57 URLs; 44 lead tests; 56 fee tests; icon URLs all 200 with `?v=5`; transparent corners confirmed on the PNG and ICO files.
- **Preview:** Vercel check passed on `072b05a`; the preview still redirects to the Vercel login, so the real lead test was not run.
- **Status:** ready for the final email test.

## P0 — lead delivery failure on the preview (2026-10-09)
- **Report:** success message shown; neither email arrived; `/api/lead` showed `resend: true`, `sender: custom`.
- **Investigation (code only; no Resend or Vercel log access):** two paths to a success message existed: the hidden anti-spam field returning a silent success with nothing sent, or Resend accepting the notification with no check of what followed. Six defects recorded in `LEAD-DELIVERY.md`.
- **Fix:** `src/app/api/lead/route.ts`, `src/app/components/LeadForms.tsx`, `scripts/test_lead_api.py`.
- **Tests:** `test_lead_api.py` 80 passed; `tsc` clean; ESLint 0 errors; `seo_check.py` FAILS: 0 on 57 URLs; 56 fee tests; browser run with a mock mail server: receipt panel, `lead_submit`, bounce warning and `lead_delivery_failed`.
- **Root cause:** unproven. **Status:** NO-GO until a fresh preview submission is seen to arrive.

### P0 follow-up — failed POST missing from the log export (2026-10-10)
- **Finding:** the error text shown exists only in this API's 502 response on preview builds, and every 502 logs first; so the request happened and the export does not cover it. Cause of Resend's refusal still unknown.
- **Change (diagnostics only):** a failed submission shows HTTP status and reference; preview builds add the provider's error with addresses removed; the same text is in the log. Delivery logic untouched.
- **Tests:** 83 lead tests; `tsc`; ESLint 0 errors; `seo_check.py` FAILS: 0; 56 fee tests. Shown in a browser against the real Resend API with an invalid key: `HTTP 502 · reference … · email: validation_error (401): API key is invalid`.

## Release status (2026-10-10)
- **Real email test passed** on the preview (owner): reference `0a3efc8a`; notification and confirmation both arrived; custom sender on the verified domain.
- **Final checks on `89d06ad`:** `tsc` clean; ESLint 0 errors; `seo_check.py` FAILS: 0 on 57 URLs; 83 lead tests; 56 fee tests; branch contains `main`; PR #7 mergeable; Vercel check green.
- **Not confirmable from here:** the Production scope of the two Resend variables (no Vercel access; production's current code has no status endpoint).
- **Status:** READY TO DEPLOY, waiting for authorization. No SEO feature added and the email implementation not changed since the passing test.

## Loop status
- Stopped. The only remaining step is the owner's authorization to merge PR #7.

## Post-deployment (2026-10-10)
- **Merge commit:** `48ed23f` (PR #7), deployed to production by Vercel.
- **Verified on production:** `seo_check.py` FAILS: 0 on 57 URLs; no `noindex`, canonicals match the sitemap; `robots.txt` and redirects correct; lead status endpoint reports Resend configured with a verified custom sender in the production environment; all new pages 200; calculator computes; homepage as released; IndexNow accepted 57 URLs; Lighthouse accessibility, best practices and SEO 100 on five pages.
- **No deployment defect found.**
- **Looked into and not acted on:** case-study lab LCP (3.7 s simulated). First paint on this machine was too variable across runs and pages to call it a site defect; real-user data in Vercel Speed Insights should decide.
- **Blocked:** Search Console (no access), so sitemap submission, indexing status and the data-driven queue wait on the owner (B26).

## Loop status
- Waiting on data. Nothing further is safe or useful to change without new Search Console numbers or an owner answer in BLOCKERS.md.
