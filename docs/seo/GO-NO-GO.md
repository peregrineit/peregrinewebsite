# GO / NO-GO: Phases 11 and 12

**Date:** 2026-10-09 · **Branch:** `seo/phase-12` · **Pull request:** [#7](https://github.com/peregrineit/peregrinewebsite/pull/7) (draft) · **Not merged, not deployed.**

## Decision

**NOT YET READY TO DEPLOY. One step is left: a real test submission on the preview, seen to arrive.** Everything that can be checked without signing in to Vercel has passed. PR #7 stays a draft.

### Lead delivery evidence (updated 2026-10-09, after the owner verified the domain in Resend)

| Item | Status | Evidence |
|---|---|---|
| Recipient is `info@peregrine-it.com` | **Verified** | fixed in `src/app/api/lead/route.ts` (`NOTIFY_TO`); the local end-to-end run sent the notification to that address |
| Domain verified in Resend | **Owner-stated; consistent with DNS** | public DNS now has `resend._domainkey.peregrine-it.com` (DKIM key) and mail records on `send.peregrine-it.com`. On the morning of 2026-10-09 neither existed |
| `RESEND_API_KEY` in Vercel | **Owner-stated; not seen** | no access to the project from this machine |
| `LEAD_FROM_EMAIL` in Vercel, Preview scope | **Unknown** | not seen. Without it the code uses Resend's test sender, which delivers only to the Resend account owner's address, so the visitor acknowledgement would not arrive |
| A real submission on the preview arrives | **Not tested** | the preview redirects to the Vercel login (checked again after the domain was verified) |

### The one remaining step

Either of these, nothing else. No DNS, key or Resend change is asked for.

- **You (2 minutes):** signed in to Vercel, open `https://peregrinewebsite-git-seo-phase-12-mukeshs-projects-36e886df.vercel.app/api/lead`. If it shows `"sender":"custom"`, change nothing. If it shows `"sender":"resend-test-sender"`, add `LEAD_FROM_EMAIL` = `Peregrine IT <hello@peregrine-it.com>` in Vercel (Preview and Production) and redeploy the preview. Then submit the form on `/contact` with "TEST" in the name and an address you can read. Two emails should arrive: the notification at `info@peregrine-it.com` and the acknowledgement at your address.
- **Or me:** sign in to Vercel in this app's Browser pane and name the visitor address; I run the same test and you confirm the two emails.

When both emails are confirmed this file changes to **READY TO DEPLOY**.

### Verified locally on the final build (2026-10-09)

Run in a browser against the built site, with Resend replaced by a local mock (nothing left the machine):

| Check | Result |
|---|---|
| Consultation form on a service page, labeled test submission | "Request sent successfully"; notification addressed to `info@peregrine-it.com` with a reference in the subject; acknowledgement addressed to the test visitor |
| Tracking on success | `lead_submit` fired once; no `lead_error` |
| Failure path on `/contact` (mock rejects the email) | error message and the email link shown; `lead_error` fired; **no** `lead_submit`; no success message. The email link is not counted as a lead |
| Status endpoint | `{"ok":true,"resend":true,"sender":"custom","senderDomainVerified":true,"webhook":false}` |
| Build, TypeScript, ESLint | pass; 0 errors |
| `seo_check.py` | FAILS: 0 on 57 URLs |
| `test_lead_api.py` | 44 passed |
| `test_mls_fees.mjs` | 56 passed |

## 1. Verified technical readiness

Run on the final local production build of the branch.

| Check | Result |
|---|---|
| Production build, TypeScript | pass, no errors |
| ESLint, whole repo | 0 errors (68 warnings, all in legacy markup: `<img>` tags) |
| `scripts/seo_check.py`, 57 sitemap URLs | FAILS: 0 |
| ...which covers | status, title ≤ 60, description length, uniqueness, self-canonical, one H1, heading order, image alt, JSON-LD parses, 152 schema nodes with 393 `@id` references all resolving, FAQ schema equals visible FAQ, sitemap `lastmod` equals `dateModified`, robots.txt, llms.txt matches the sitemap, internal links resolve, at least 2 inbound links per page, a contact path on every page |
| Lead API integration tests (mock Resend and webhook) | 44 passed |
| Calculator fee arithmetic | 56 passed |
| Lighthouse mobile, 12 pages (local) | Accessibility 100 and SEO 100 on all; Performance 92 homepage, 96 content pages, about 90 case studies; CLS 0 |
| Responsive | no horizontal overflow on 18 page types at 375 px and 11 at 1280 px; nav does not wrap |
| Consent Mode (build with a test GA ID) | analytics denied by default, no `_ga` cookie before consent, bar shown, decline remembered |
| GA4 events observed | `calendly_click`, `guide_cta_click` (Calendly and form), `lead_error`. `lead_submit` is covered by the API tests; not observed in GA because no real destination was available |
| Form failure path | error message plus a prefilled email link; tracked as `lead_error`, never as `lead_submit` |
| Lead email retry and reference | one retry on a Resend error; an 8-character reference in the email subject, webhook payload and log |
| Spam protection | honeypot, per-IP rate limit (5 per 10 minutes), server-side validation; all tested |

**Not verifiable from here:** real email delivery, the Vercel environment variables, GA4 receiving data in a real property, field Core Web Vitals.

## 2. Business claims

### Corrected on the branch (2026-10-09)
No figure was invented. Where a label contradicted the figures beside it, the label went and the figures stayed.

| Claim | Was | Now | Basis |
|---|---|---|---|
| Reply time | "6 hours", "1 business day" and "48 hours" in different places | "within 1 business day" everywhere; the 6-hour and 48-hour promises are gone (forms, auto-reply email, service pages, homepage, footer, llms.txt) | owner instruction |
| Investor portal | "3 weeks → 2 hours" labelled "85% time saved" | the before and after only; no percentage | the two disagree (3 weeks to 2 hours is about 98%); which was measured is unknown |
| Clinic | "45 → 18 days" labelled "40% faster" | "18 days (was 45)"; no percentage | same (45 to 18 is 60%) |
| Legal platform | "SOC2 Compliant" | "SOC2 Ready" | the page's own timeline and results say preparation and "ready" |
| Legal platform | "40% faster" captioned "cut by nearly half" | caption removed | 40% is not half |
| HR platform | "confidence to pass SOC 2" | "confidence going into a SOC 2 audit" | the page reports a readiness checklist, not a passed audit |
| Collaboration tool | hero and a heading said operational transform | CRDT, as the stack and the body say | internal mismatch |
| Food delivery | "<3min Avg Delivery" | labelled as the pilot zone | the body and the client quote say pilot zone |
| Homepage | "AWS, Azure, and GCP certified engineers across the team" | removed | no certification is on file; About says unconfirmed |
| Homepage | "SLA-backed maintenance" | "maintenance" | no SLA terms exist anywhere on the site |
| Homepage | seven client testimonials with performance figures | the seven clients' logos and names, linked to their sites | quotes had no independent support; the client names were already on About |
| Homepage | "50+ systems shipped", "3+ avg. years per client", "97% on-time", "4.7/5" | "2018 founded", "25+ team members", "19 published case studies", "6 industries with published work" | first two owner-confirmed; last two counted from the data files at build time |
| Homepage | "eliminate downtime" | "reduce downtime" | absolute claim |
| Case studies | a client quote on each of the 19 pages, attributed by role | removed | no confirmation on file |

### Still unresolved (owner)
| # | Claim | Where | Problem |
|---|---|---|---|
| C1 | "within 1 business day" | site-wide | Applied on instruction. Confirm the team can keep it on every working day, or tell me to remove it |
| C2 | Homepage technology lists (Vue, Angular, .NET and others in no case study) | homepage | No source on the site (B11). Capability list, not a performance claim; left in place |
| C3 | The percentages removed above (85%, 40%) | investor portal, clinic | Restore whichever you can state the measurement for |
| C4 | 8-month project whose last phase ends at week 24 | real estate SaaS case study | Unchanged: no way to tell which is right |
| C5 | Client quotes (7 on the homepage, 19 in case studies) | removed | To restore one, send the client's written confirmation of the wording; the text is in git history (before `seo(C4)`). The footer's "Testimonials" link to Google could not be opened from here, so it was not used as support |
| C7 | W3\|re figures | W3\|re case study | B9 |
| C8 | "North American and European business hours" vs "US and Canadian hours" | homepage, contact, footer vs About | Pick one |
| C9 | "Dedicated project lead on every engagement", "also work with Azure, Google Cloud Platform" | homepage, cloud service page | No case study shows them |
| C10 | Shopify, Laravel, WordPress pages | three service pages | State that no case study is published; confirm the services are sold (B13) |
| C11 | "4–6 week MVP, 8–12 week complex platform" | homepage, service pages | Owner-confirmed, but every case study ran 6 to 14 months |

## 3. Environment configuration blockers

Detail and steps: `LEAD-DELIVERY.md`.

| # | Item | Evidence | Status |
|---|---|---|---|
| E1 | Lead email delivery | **Code (read):** Resend is the only mail provider; recipient `info@peregrine-it.com` is fixed in code; sender is `LEAD_FROM_EMAIL` or Resend's test sender. **Configuration (not readable from here):** whether `RESEND_API_KEY` and `LEAD_FROM_EMAIL` are set, and whether Resend has verified the domain. **DNS (a hint only):** no `resend._domainkey` or `send` records on `peregrine-it.com`; a subdomain or custom record names would not show up this way | **Unverified. Release condition** |
| E2 | Vercel project access | The CLI login on this machine is a different account (team "Peregrine", one project, `sellv3`); the site is under `mukeshs-projects-36e886df` | blocks reading env var names |
| E3 | Preview testing | Preview deployments require a Vercel sign-in | blocks a delivery test from here |
| E4 | Durable lead record | The app has no database and Vercel has no writable disk, so none can be added without new infrastructure. Prepared: a Google Sheet receiver (`scripts/lead-sheet-webhook.gs`) for the existing `LEAD_WEBHOOK_URL`; free, in your Google Workspace; not deployed | optional, owner steps |
| E5 | GA4 | No measurement ID (B2) | optional |

**How E1 gets settled without guessing:** `GET /api/lead` now asks Resend whether the sender's domain is verified and returns `senderDomainVerified: true / false / null` (null when the API key is restricted to sending). It returns booleans only. Then one test submission, with the notification and the auto-reply both seen in an inbox.

## 4. Optional improvements (do not block)

- The favicon fix is a separate pull request, #8, from `main`. It can merge before or after #7.

- Case-study LCP is about 3.3 s in the local lab run (hero image); content pages are faster. Measure on production before spending time on it.
- Enforce the CSP after two weeks of clean reports in the Vercel log (B15).
- Team section, Odoo named integrations, first-hand MLS timelines, project proof for Shopify, Laravel and WordPress (B5–B8).
- USD Odoo plan prices from a US connection (B16); a public NAR policy source (B17).
- A `lead_submit` conversion in GA4, once the ID exists.

## 5. Merge and deployment (only after explicit authorization)

Preconditions: the preview lead test passed; this file says READY TO DEPLOY; you have said to release.

1. PR #7 → **Ready for review**. Wait for the Vercel check to pass.
2. **Merge pull request** → **Create a merge commit** (as PRs #2–#6). Vercel deploys `main` to production automatically.
3. Vercel → Deployments: wait for the production deployment to show **Ready**.
4. Verify production:
```bash
python3 scripts/seo_check.py https://peregrine-it.com
```
   Expect `FAILS: 0` on 57 URLs.
5. Open `https://peregrine-it.com/api/lead`: `"resend":true`, `"senderDomainVerified":true` (or `null`).
6. Submit one test lead on `https://peregrine-it.com/contact`; see both emails arrive.
7. Tell me "deployed". I resubmit the sitemap URLs to IndexNow and run the day-0 checks in `MONITORING.md`.

If step 5 or 6 fails on production: roll back (below) and fix the Production-scope variables.

## 6. Rollback

1. **Fastest, no git change:** Vercel → Deployments → the previous production deployment → **Promote to Production**.
2. Then make `main` match what is live:
```bash
git revert -m 1 <merge-commit-sha>
```
   Push the revert through a pull request.
3. Narrower switches: remove `NEXT_PUBLIC_GA_ID` to turn off GA4 and the consent bar; remove `LEAD_WEBHOOK_URL` to stop the webhook. Both need a redeploy. The previous code ignores the new variables, so they can stay set.

No database, no data migration, no redirects: a rollback loses nothing.
