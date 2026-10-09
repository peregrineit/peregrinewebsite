# GO / NO-GO: Phases 11 and 12

**Date:** 2026-10-09 · **Branch:** `seo/phase-12` · **Pull request:** [#7](https://github.com/peregrineit/peregrinewebsite/pull/7) (draft) · **Not merged, not deployed.**

## Decision

**Code: GO.** Every automated check passes on the final build.

**Release: conditional on one unverified item, lead delivery (E1).** Nobody has yet seen a form submission arrive in an inbox, on production or on a preview. Until that is seen, lead capture is **unverified**, not working. The form's email link after a failure is a last resort for the visitor; it is not a delivered lead and is not counted as one.

Recommended gate: pass the four-step check in `LEAD-DELIVERY.md` on the preview deployment **before** merging. The branch does not make delivery worse than production (production reports "sent" even when Resend rejects; the branch reports the failure), but that is a reason the merge is safe, not evidence that leads arrive.

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

### Still unresolved (owner)
| # | Claim | Where | Problem |
|---|---|---|---|
| C1 | "within 1 business day" | site-wide | Applied on instruction. Confirm the team can keep it on every working day, or tell me to remove it |
| C2 | "50+ systems", "3+ years", "97% on-time", "4.7/5"; homepage technology lists | homepage | No source on the site (B11). Left in place: removing them changes the homepage design, which is your call |
| C3 | The percentages removed above (85%, 40%) | investor portal, clinic | Restore whichever you can state the measurement for |
| C4 | 8-month project whose last phase ends at week 24 | real estate SaaS case study | Unchanged: no way to tell which is right |
| C5 | Kypiq testimonial: rebuild "in about 10 weeks", costs down "roughly 40%" | homepage | Unchanged. It is a named client's quote; the anonymous self-storage case study says 10 months. Different engagements, or a conflict? |
| C6 | Case-study quotes | 19 case studies | Attributed by role only ("COO, Events Company"); W3\|re's is a named person. None has a confirmation on file. Unchanged: I cannot tell a real quote from an unsupported one, and deleting real client words would be worse |
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

- Case-study LCP is about 3.3 s in the local lab run (hero image); content pages are faster. Measure on production before spending time on it.
- Enforce the CSP after two weeks of clean reports in the Vercel log (B15).
- Team section, Odoo named integrations, first-hand MLS timelines, project proof for Shopify, Laravel and WordPress (B5–B8).
- USD Odoo plan prices from a US connection (B16); a public NAR policy source (B17).
- A `lead_submit` conversion in GA4, once the ID exists.

## 5. Deployment

1. Pass E1 on the preview (`LEAD-DELIVERY.md`, steps 1 to 5).
2. On PR #7 click **Ready for review**, wait for the Vercel check, then **Merge pull request** with a merge commit. Vercel deploys `main` to production.
3. When the deployment is live:
```bash
python3 scripts/seo_check.py https://peregrine-it.com
```
   Expect `FAILS: 0` on 57 URLs.
4. Open `https://peregrine-it.com/api/lead` and check the status JSON (`ok`, `resend`, `senderDomainVerified` all true). Submit one real test lead and see both emails arrive.
5. Say "deployed" in this session and I will resubmit the sitemap URLs to IndexNow and run the production checks in `MONITORING.md`.

## 6. Rollback

1. **Fastest, no git change:** Vercel → Deployments → the previous production deployment → **Promote to Production**.
2. Then make `main` match what is live:
```bash
git revert -m 1 <merge-commit-sha>
```
   Push the revert through a pull request.
3. Narrower switches: remove `NEXT_PUBLIC_GA_ID` to turn off GA4 and the consent bar; remove `LEAD_WEBHOOK_URL` to stop the webhook. Both need a redeploy. The previous code ignores the new variables, so they can stay set.

No database, no data migration, no redirects: a rollback loses nothing.
