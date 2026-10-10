# Growth Sprint 2: release report

**Date:** 2026-10-10 · **Candidate:** pull request #15 (`growth/s2-integration`) · **Base:** `main` at `48ed23f` · **Not merged, not deployed.**

## Decision: NO-GO today, on one blocker

**Blocker: no real lead has been delivered from this build.** Every email result below comes from a local mock of Resend. A mock proves the code's logic, not delivery. The lead API changed in this release, so the release needs one real submission on the pull request's preview, with the notification and the acknowledgement both seen in an inbox, the same reference in both, and no duplicate. I cannot run it: the preview redirects to the Vercel sign-in.

Everything else is ready. When the test below passes, this becomes GO, pending the owner's authorization to merge.

### The one test (owner, about 3 minutes)

Preview: `https://peregrinewebsite-git-growth-s2-1f2aec-mukeshs-projects-36e886df.vercel.app`

1. Signed in to Vercel, open `/api/lead` on that address. Expect `"resend":true`, `"sender":"custom"`, `"senderDomainVerified":true`, `"environment":"preview"`, `"webhookRetry":false`, `"ownerAlert":false`, `"durableStorage":"none"`. If `resend` is false or `sender` is `resend-test-sender`, the Preview scope lacks the variables production has; add them to Preview and redeploy.
2. Open `/case-studies/proptech-investor-portal`, scroll to the form at the end, and submit it with "TEST" in the name, an address you can read, and a message of 10 or more characters.
3. Pass = the form shows **Request received** and a **Reference**; one notification arrives at `info@peregrine-it.com` whose subject ends with that reference and whose body has a `Priority:` line, `Service: case-study:proptech-investor-portal` and the attribution lines; one acknowledgement arrives at your address with the same reference; neither arrives twice.
4. If it fails, send me the grey line under the error (HTTP status, reference, provider error).

## Priority 1: production risks, and what was done

| # | Risk | Action | Evidence |
|---|---|---|---|
| 1 | Review of #15 against `main` | 114 files; reviewed by stream during the sprint, by an independent reviewer for the lead path, and again for this release | this table |
| 2 | Experimental Vercel Blob store on an undocumented endpoint | **Removed**: `src/lib/lead-store.ts` deleted, all route logic, tests and docs for it removed. `LEAD_STORE`, `BLOB_READ_WRITE_TOKEN` and `LEAD_STORE_BLOB_API_URL` now do nothing | tests: with those variables set, no request is made, the status has no `store` field, and they alone give HTTP 502 |
| 3 | Webhook retries creating duplicates | **Retry is now off by default** (`LEAD_WEBHOOK_RETRY=1` to enable). A receiver can record a lead and still answer 5xx; only a deduplicating receiver makes a retry safe. Emails keep one idempotency key per message | tests: 500, 503 and 429 produce exactly one request; "recorded, then 500" leaves exactly one row; with retry on, both attempts carry the same bytes, key and signature; identical resubmission sends no second email |
| 4 | Attribution and personal data | **Advertising click ids (`gclid`, `msclkid`, `fbclid`) are read only after an explicit analytics consent**; without it they are never stored or sent; removed when consent is declined or withdrawn. Other attribution (landing page, referrer without query string, UTM, pages viewed, form location) stays in session storage without consent and is sent only when the visitor submits. A same-site referrer is not recorded. No cookies | browser, GA test build: without consent `gclid` empty, no cookie, nothing in local storage, Consent Mode default `denied`; after Accept, `gclid` recorded and first touch kept in local storage. The published policy already lists "pages visited, time spent, and referral source"; it does not mention click ids, which is why they need consent |
| 5 | Lead priority misrepresenting a lead | Kept as a sorting hint. Reasons are worded as observed facts ("email domain is not a free-mail provider", not "business email"); the line ends "Sorting hint from the form fields only; nothing about the sender is verified." A free-mail address never lowers it; never shown to the visitor | 54 unit tests; the notification line asserted in the API suite |
| 6 | Owner alerts | Off unless `LEAD_ALERT_WEBHOOK_URL` is set; status shows `ownerAlert: false` | tests: no alert request in any default configuration |
| 7 | Webhook signing | Now `X-Peregrine-Signature: t=<unix seconds>,v1=<HMAC-SHA256 of "<t>.<body>">`. The timestamp is signed, so a replay fails the verifier's 5-minute limit. Secrets under 16 characters are ignored and reported as unsigned. Off unless `LEAD_WEBHOOK_SECRET` is set | tests with the reference verifier: valid accepted; wrong secret, altered body, rewritten timestamp, replay after 301 s and malformed header all rejected; secret never logged or returned |

**Not activated and not needed for this release:** webhook, webhook retry, signing, owner alert. With none of their variables set, delivery is email only, as on production today.

## Priority 2: commercial credibility

| Item | Result |
|---|---|
| Homepage technologies | Each of the six lists now shows "In published case studies: …" and "Additional capabilities: …". The split is computed from the 19 case-study stacks: Next.js (React); Node.js, Python; React Native; AWS, Linode; AWS EKS; MongoDB, PostgreSQL, Redis, Elasticsearch. Nothing was added |
| Phone layout of that section | An existing defect, also on production: the cards were 416 px wide on a 375 px screen and clipped their text. Fixed; cards now sit inside the viewport (30 to 345 px) |
| Client names and project evidence | Unchanged: seven client logos, 19 case studies |
| Invented material | None added. Shopify, Laravel, WordPress and Odoo pages still state that no case study is published |
| Four new guides | Sources re-fetched and matched by sample for each (RESO, MLS Grid, Trestle, Laravel, PHP, OWASP ASVS, NIST, Shopify, Odoo). Each targets a query no existing page targets. One overlap found and fixed: the Odoo guide's title competed with the Odoo service page for "Odoo integration"; it is now "Odoo–Shopify Sync: Integration Design Guide" |
| Case-study forms | Six controls, each with an accessible label; name, email, project type and timeline required; an empty submit is blocked by the browser on those four; errors render in an alert region with the HTTP status and reference; success renders in a status region; no horizontal overflow at 375 px |

## Priority 3: tests on the release candidate

Run on `growth/s2-integration` after the release fixes.

| Check | Result |
|---|---|
| Production build | passes |
| TypeScript | clean |
| ESLint | 0 errors (68 legacy warnings) |
| `seo_check.py` | FAILS: 0 on 61 URLs; 165 schema nodes, 421 references |
| Metadata snapshot | 0 differences from the committed baseline (61 URLs) |
| Lead API integration (mock Resend, mock webhook) | 205 passed |
| Lead priority / client unit tests | 54 / 82 passed |
| Lead browser checks (headless Chrome) | 39 passed |
| Tool tests | 197 passed |
| Calculator fees | 56 passed |
| Lighthouse (local): home, contact, a case study, the Odoo guide | accessibility 100 and SEO 100 on all; performance 92, 96, 90, 96 |
| Responsive | case-study form and homepage technology cards measured at 375 px and 1280 px: no overflow |
| GA4 and consent (test ID build) | bar shown; default denied; no cookie before consent; Accept recorded; click id only after consent |
| **Real email delivery** | **not tested** (preview behind Vercel sign-in) |

The lead API suite went from 229 to 205 checks because the store's tests were deleted with the store.

## Priority 4: pull request

| Check | Result |
|---|---|
| Contains #10 to #14 | yes: each pull request's head commit is an ancestor of this branch |
| Based on latest `main` | yes (`48ed23f`) |
| Unfinished worktree changes | none: all four stream worktrees are clean and have nothing ahead of this branch |
| Differs from #14 | yes, deliberately: the store removal, opt-in retry, timestamped signature and consent rule exist only here. **Merge #15, not #14** |
| GitHub checks | Vercel preview check: see the pull request (green at the time of writing) |
| CI workflow | still a proposal file; the token lacks the `workflow` scope |

## Remaining items that do not block

- Durable lead storage does not exist. The record of a lead is the email and Resend's log. A supported store needs a documented API and a real test.
- The privacy policy does not mention click ids or the 90-day first-touch record. Neither is active until a GA4 ID and a visitor's consent exist; the draft wording is in `docs/growth/lead/ARCHITECTURE.md` for review before GA4 is switched on.
- Webhook signing and the owner alert have never run against a real receiver.
- Pull request #9 (documentation from the last release) is still open.

## Merge and deployment (after the test passes and the owner authorizes)

1. Pull request #15 → Ready for review → **Merge pull request** with a merge commit. Vercel deploys `main`.
2. Close #10 to #14 without merging (their commits are in #15).
3. When the production deployment is Ready: `python3 scripts/seo_check.py https://peregrine-it.com` (61 URLs, FAILS 0) and `npm run check:leads`.
4. One "TEST" lead on production; both emails seen.
5. Resubmit the sitemap in Search Console; tell me "deployed" for IndexNow and the day-0 checks.

**Rollback:** Vercel → previous production deployment → Promote to Production; then revert the merge commit through a pull request. No database and no migration, so nothing is lost.
