# GO / NO-GO: Phases 11 and 12

**Date:** 2026-10-09 · **Branch:** `seo/phase-12` · **Pull request:** [#7](https://github.com/peregrineit/peregrinewebsite/pull/7) (draft) · **Not merged, not deployed.**

## Decision

**GO for the code.** Every automated check passes and no page depends on an unverified claim that this release introduces.

**One condition, about 10 minutes, on the owner's side:** confirm that a lead submitted on the site reaches an inbox (section 3, E1). This cannot be checked from here. It is not a reason to hold the release, because the branch is safer than what is live today: production currently tells the visitor "sent" even when the email fails; the branch shows an error and an email link instead. If lead delivery is broken, it is already broken on production, silently.

## 1. Verified technical readiness

Run on the final local production build of the branch.

| Check | Result |
|---|---|
| Production build, TypeScript | pass, no errors |
| ESLint, whole repo | 0 errors (68 warnings, all in legacy markup: `<img>` tags) |
| `scripts/seo_check.py`, 57 sitemap URLs | FAILS: 0 |
| ...which covers | status, title ≤ 60, description length, uniqueness, self-canonical, one H1, heading order, image alt, JSON-LD parses, 152 schema nodes with 393 `@id` references all resolving, FAQ schema equals visible FAQ, sitemap `lastmod` equals `dateModified`, robots.txt, llms.txt matches the sitemap, internal links resolve, at least 2 inbound links per page, a contact path on every page |
| Lead API integration tests (mock Resend and webhook) | 41 passed |
| Calculator fee arithmetic | 56 passed |
| Lighthouse mobile, 12 pages (local) | Accessibility 100 and SEO 100 on all; Performance 92 homepage, 96 content pages, about 90 case studies; CLS 0 |
| Responsive | no horizontal overflow on 18 page types at 375 px and 11 at 1280 px; nav does not wrap |
| Consent Mode (build with a test GA ID) | analytics denied by default, no `_ga` cookie before consent, bar shown, decline remembered |
| GA4 events observed | `calendly_click`, `guide_cta_click` (Calendly and form), `lead_error`. `lead_submit` is covered by the API tests; not observed in GA because no real destination was available |
| Form failure path | error message plus a prefilled "Send it by email instead" link |
| Spam protection | honeypot, per-IP rate limit (5 per 10 minutes), server-side validation; all tested |

**Not verifiable from here:** real email delivery, the Vercel environment variables, GA4 receiving data in a real property, field Core Web Vitals.

## 2. Unverified business claims

None of these was introduced by Phases 11 or 12 unless marked. None blocks the release; each is the owner's to confirm or correct. Found by an independent read of the site against its own case studies, then checked by hand.

| # | Claim | Where | Problem |
|---|---|---|---|
| C1 | Reply time | forms and auto-reply email | The same form says "1 business day" before submitting and "6 hours" after; the quick form says 48 hours and its auto-reply says 6 hours (B4) |
| C2 | "50+ systems", "3+ years", "97% on-time", "4.7/5"; homepage technology lists | homepage | No source on the site (B11) |
| C3 | "AWS, Azure, and GCP certified engineers", "SLA-backed maintenance" | homepage | No support elsewhere; About says certifications are unconfirmed |
| C4 | 8-month project whose last phase ends at week 24 | real estate SaaS case study | Duration and phase timeline disagree |
| C5 | "3 weeks → 2 hours" labelled "85% time saved" | investor portal case study, and pages that quote it | The arithmetic gives about 98% |
| C6 | "45 → 18 days" labelled "40% faster" | clinic case study | The arithmetic gives 60% |
| C7 | "SOC2 Compliant" in the stats, "SOC2 ready" in the body | legal and HR case studies | Ready and compliant are different claims |
| C8 | Hero says operational transform; stack says CRDT (Yjs) | collaboration case study | Internal mismatch |
| C9 | Kypiq testimonial: rebuild "in about 10 weeks", costs down "roughly 40%" | homepage | The self-storage case study says 10 months and gives no 40% figure. Same client or not? |
| C10 | W3\|re: named quote, "$480M+", and the figures in B9 | W3\|re case study | No owner confirmation on file |
| C11 | "North American and European business hours" vs "US and Canadian hours" | homepage, contact, footer vs About | Pick one |
| C12 | Shopify, Laravel, WordPress pages *(new in Phase 12)* | three service pages | They state that no case study is published; owner to confirm the services are sold (B13) |
| C13 | MLS approval timelines | guides | Deliberately absent: guides say no MLS publishes one (B8) |

The owner-stated "4–6 week MVP, 8–12 week complex platform" figures sit next to case studies that ran 6 to 14 months. They are owner-confirmed, so they stay; worth a second look.

## 3. Environment configuration blockers

| # | Item | What is known | Owner action |
|---|---|---|---|
| E1 | Lead email delivery | Public DNS for `peregrine-it.com` has Google Workspace MX, SPF for Google only and a Google DKIM key. There is **no** `resend._domainkey` record and no `send` subdomain, which Resend needs to verify a domain. So the root domain is very likely not a verified Resend sender (a differently named subdomain cannot be ruled out). With the fallback sender, Resend delivers only to the Resend account owner's own address | Steps below |
| E2 | Vercel project access | The Vercel CLI login on this machine is a different account (team "Peregrine", one project, `sellv3`). The site's project is under `mukeshs-projects-36e886df`. Environment variable names could not be listed | None needed if you do E1 yourself |
| E3 | Preview testing | Preview deployments are behind Vercel sign-in, so no delivery test could be run | Open the preview while signed in |
| E4 | GA4 | No measurement ID (B2). Nothing from Google loads without it | Optional: set `NEXT_PUBLIC_GA_ID` |
| E5 | CRM webhook | Not configured, optional (B3) | Optional: set `LEAD_WEBHOOK_URL` |

**E1 steps (owner):**
1. Resend → Domains. If `peregrine-it.com` is not listed as verified, add it and create the DNS records Resend shows (a DKIM `TXT` at `resend._domainkey`, and `MX` and SPF `TXT` at `send`). They do not touch the existing Google records.
2. Vercel → `peregrinewebsite` → Settings → Environment Variables, for Production and Preview: confirm `RESEND_API_KEY`; add `LEAD_FROM_EMAIL` = `Peregrine IT <hello@peregrine-it.com>`.
3. Redeploy the preview, open `<preview-url>/api/lead`. Expect `{"ok":true,"resend":true,"sender":"verified-domain","webhook":false}`. It shows booleans only, never a value.
4. Submit the form once on the preview. Confirm the notification reaches `info@peregrine-it.com` and the auto-reply reaches the address you entered.

If you would rather merge first: do steps 3 and 4 on production straight after the deploy. Until they pass, a visitor whose submission fails sees the error and the email link, so the lead is not lost silently.

## 4. Optional improvements (do not block)

- Case-study LCP is about 3.3 s in the local lab run (hero image); content pages are faster. Measure on production before spending time on it.
- Enforce the CSP after two weeks of clean reports in the Vercel log (B15).
- Team section, Odoo named integrations, first-hand MLS timelines, project proof for Shopify, Laravel and WordPress (B5–B8).
- USD Odoo plan prices from a US connection (B16); a public NAR policy source (B17).
- A `lead_submit` conversion in GA4, once the ID exists.

## 5. Deployment

1. Do E1 (or accept doing it straight after).
2. On PR #7 click **Ready for review**, wait for the Vercel check, then **Merge pull request** with a merge commit. Vercel deploys `main` to production.
3. When the deployment is live:
```bash
python3 scripts/seo_check.py https://peregrine-it.com
```
   Expect `FAILS: 0` on 57 URLs.
4. Open `https://peregrine-it.com/api/lead` and check the status JSON. Submit one real test lead.
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
