# Blockers: what needs the owner

Work that cannot be finished without a fact, a credential or an authorization. Each has a code-side fallback so the site stays truthful meanwhile.

| ID | Needed from the owner | Blocks | Fallback in place |
|---|---|---|---|
| B1 | Merge `seo/phase-11`, then `seo/phase-12`, to `main` (production change) | everything reaching production | work continues on the branch |
| B2 | GA4 measurement ID as `NEXT_PUBLIC_GA_ID` in Vercel. Consent is handled by default: Consent Mode keeps analytics denied until the visitor accepts a small bar. Say so if you want a different approach (no bar, or bar only for EU visitors) | GA4 reporting (T4) | events already go to Vercel Analytics; nothing from Google loads without the ID |
| B3 | **Check before or straight after merging (GO-NO-GO.md, E1).** Confirm `RESEND_API_KEY` is set in Vercel and that the Resend domain is verified, then set `LEAD_FROM_EMAIL`; optionally a CRM or automation webhook URL as `LEAD_WEBHOOK_URL` | durable lead storage, auto-reply delivery (T3, T4) | leads are emailed to info@peregrine-it.com when Resend is configured; the form now shows an error if nothing accepted the lead |
| B4 | Resolved in code 2026-10-09: one promise, "within 1 business day". Owner to confirm the team can keep it | consistent form copy (T3) | wording unchanged |
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
| B14 | Vendor disclosure for the new guides (investor portals and self-storage software name many vendors): any partnership or referral arrangement with AppFolio, Agora, Cash Flow Portal, Covercy, InvestNext, Juniper Square or SponsorCloud | a disclosure line on the guide | none shown; TODO(owner) in the page |
| B15 | Resolved in code 2026-10-09: `/api/csp-report` logs violations to the Vercel log. Remaining owner step after deploy: read the log for "CSP violation" for two weeks, then authorize enforcing the policy | enforcing the CSP | CSP stays report-only |
| B16 | Open https://www.odoo.com/pricing from a US connection and send the Standard and Custom per-user prices (yearly and monthly billing) with the date | USD plan prices in the Odoo cost guide (it cites CAD from a Canadian capture) | guide tells readers to check Odoo's page from their own location |
| B17 | A public source for NAR MLS policy (IDX 7.58, VOW, 7.90), now that NAR's handbook requires a member login; or member access to re-verify | re-verifying the NAR statements in the cost and data-access guides | both guides say the NAR statements are as read on September 29–30 |

## Added 2026-10-09 (release validation and content accuracy review)

| ID | Needed from the owner | Blocks | Fallback in place |
|---|---|---|---|
| B18 | Resend: public DNS shows no `resend._domainkey` or `send` records for `peregrine-it.com`, so the domain is very likely not verified. Verify it in Resend, set `LEAD_FROM_EMAIL`, then open `/api/lead` and submit one test lead (GO-NO-GO.md, E1) | proof that leads are delivered | form shows an error and a prefilled email link when nothing accepts the lead |
| B19 | Vercel access: this machine's Vercel CLI login is a different account from the one that owns `peregrinewebsite`, and previews need a Vercel sign-in. Either do the E1 check yourself or run `vercel login` with the owning account | listing env var names, preview delivery test | none needed if the owner does E1 |
| B20 | Case-study figures that disagree with themselves: real estate SaaS (8 months vs phases ending at week 24); investor portal ("3 weeks → 2 hours" labelled 85%; "3 weeks" vs "60+ hours per quarter"); clinic ("45 → 18 days" labelled 40%); legal and HR ("SOC2 Compliant" vs "SOC2 ready"); collaboration tool (operational transform vs CRDT). Say which side is right | corrections on those pages and the pages quoting them | unchanged |
| B21 | Kypiq testimonial on the homepage ("about 10 weeks", "roughly 40%") vs the self-storage case study (10 months, no 40%): same client? | consistency between the two | unchanged |
| B22 | Homepage statements with no support elsewhere: "AWS, Azure, and GCP certified engineers", "SLA-backed maintenance", and "North American and European business hours" (About says US and Canadian) | reuse on new pages | not reused |

## Update 2026-10-09 (credibility fixes)
- **B20** partly resolved in code: contradictory percentage labels removed (investor portal 85%, clinic 40%), SOC2 wording aligned to "ready", collaboration tool aligned to CRDT. Still open: the real estate SaaS duration (8 months vs week 24), and which removed percentage can be restored with a stated measurement.
- **B22** partly resolved: the certification and SLA claims are removed. Still open: business-hours wording.
- **B18** restated: DNS is a hint, not proof. `GET /api/lead` reports `senderDomainVerified` from Resend itself; a test submission is the only proof of delivery. Steps in `LEAD-DELIVERY.md`.
- **B23 (new)** Testimonials: case-study quotes are attributed by role only and none has a confirmation on file; the Kypiq quote (B21) is unresolved. Tell me which quotes are confirmed; unconfirmed ones can then be removed.
- **B24 (new)** A durable lead record needs one owner action: deploy `scripts/lead-sheet-webhook.gs` in a Google Sheet and set `LEAD_WEBHOOK_URL` (`LEAD-DELIVERY.md`).
