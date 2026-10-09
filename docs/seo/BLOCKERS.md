# Blockers: what needs the owner

Work that cannot be finished without a fact, a credential or an authorization. Each has a code-side fallback so the site stays truthful meanwhile.

| ID | Needed from the owner | Blocks | Fallback in place |
|---|---|---|---|
| B1 | Merge `seo/phase-11`, then `seo/phase-12`, to `main` (production change) | everything reaching production | work continues on the branch |
| B2 | GA4 measurement ID as `NEXT_PUBLIC_GA_ID` in Vercel. Consent is handled by default: Consent Mode keeps analytics denied until the visitor accepts a small bar. Say so if you want a different approach (no bar, or bar only for EU visitors) | GA4 reporting (T4) | events already go to Vercel Analytics; nothing from Google loads without the ID |
| B3 | **Must be resolved before merging (see DEPLOYMENT.md section 2).** Confirm `RESEND_API_KEY` is set in Vercel and that the Resend domain is verified, then set `LEAD_FROM_EMAIL`; optionally a CRM or automation webhook URL as `LEAD_WEBHOOK_URL` | durable lead storage, auto-reply delivery (T3, T4) | leads are emailed to info@peregrine-it.com when Resend is configured; the form now shows an error if nothing accepted the lead |
| B4 | One response-time promise. The site says 6 hours, 1 business day and 48 hours in different places | consistent form copy (T3) | wording unchanged |
| B5 | A real project each for Shopify, Laravel and WordPress (what was built, for what kind of client, anything measurable) | proof sections on T10, T11, T13 | capability pages that state no case study is published yet |
| B6 | Which third-party systems have actually been integrated with Odoo. Search Console shows demand for Refurbed and OrderStream | T6 named-integration section | page names no systems |
| B7 | Engineers to show on `/about`: name, role, specialism, LinkedIn, photo | T5 team section | founder only |
| B8 | Peregrine's own observed MLS approval timelines and onboarding experience, by board | T14 | guides say no MLS publishes a timeline |
| B9 | W3\|re: how "94% valuation accuracy" relates to "23% of prices off by more than 8%"; "$2.3M annual loss" vs "$1.8M annual savings"; measurement windows for the seven metrics | W3\|re fixes beyond labels (T16) | figures unchanged |
| B10 | May new pages name the smart-lock vendors in the self-storage case study (Nokē, PTI)? | vendor names on T7 | T7 says "smart locks" and links the case study |
| B11 | Source for homepage stats (50+ systems shipped, 3+ avg. years per client, 97% on-time, 4.7/5) and the homepage technology lists (Vue, Angular, .NET, Django, Spring and others not in any case study) | reuse of those claims on new pages | not reused anywhere new |
| B12 | External accounts and actions (see T18 output `OUTREACH.md`): Search Console, Bing, Google Business Profile, Clutch, GoodFirms, RESO membership listing, client link requests | off-site work | assets prepared, nothing sent |

## Never done without explicit authorization
Deploying or merging to `main`; sending any email or message; creating accounts; requesting reviews; purchases; changing DNS, secrets, billing or Vercel settings.

## Added 2026-10-09 (review of Phases 11 and 12)

| ID | Needed from the owner | Blocks | Fallback in place |
|---|---|---|---|
| B13 | Read the Shopify, Laravel and WordPress pages and confirm each describes a service Peregrine actually sells. They cite no project | keeping T10, T11, T13 live | pages state that no case study is published |
| B14 | Vendor disclosure for the new investor-portal guide: any partnership or referral arrangement with AppFolio, Agora, Cash Flow Portal, Covercy, InvestNext, Juniper Square or SponsorCloud | a disclosure line on the guide | none shown; TODO(owner) in the page |
| B15 | Resolved in code 2026-10-09: `/api/csp-report` logs violations to the Vercel log. Remaining owner step after deploy: read the log for "CSP violation" for two weeks, then authorize enforcing the policy | enforcing the CSP | CSP stays report-only |
