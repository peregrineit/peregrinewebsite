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
