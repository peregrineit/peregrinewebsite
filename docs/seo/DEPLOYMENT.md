# Production deployment checklist: Phases 11 and 12

**Status:** not merged, not deployed. `seo/phase-12` contains `seo/phase-11`, so one pull request from `seo/phase-12` into `main` ships both. Merging to `main` triggers the Vercel production deploy.

**Footprint (vs `main`):** 75+ files, no new npm dependencies, no database, no data migration. 18 new URLs (39 → 57 in the sitemap); no URL removed or renamed.

## 1. What changes for visitors

| Change | Risk | Note |
|---|---|---|
| Lead forms report an error when no destination accepts the lead | **High if Resend is misconfigured** | Before, the form said "sent" even when the email failed. See section 2 |
| Consultation block with the short form on every guide, service, industry and calculator page | Low | Same form and API as the popup |
| Nav gains Industries and Guides; the desktop bar now starts at 1024 px (hamburger below that) | Low | Checked at 375, 900, 1024 and 1280 px |
| 18 new pages: 5 industries, investor portal service, 5 technology services, calculator, 6 guides | Low | All in sitemap and llms.txt |
| 7 titles and descriptions changed | Low | Experiments; baselines in TASKS.md |
| GA4 and the consent bar | None until `NEXT_PUBLIC_GA_ID` is set | Nothing from Google loads without it |
| CTA background video loads only when scrolled near | Low | Verified in headless Chrome |
| Phase 11: founded 2018, PIN 201301, IP ownership FAQ, founder photo | Low | Owner-confirmed facts |

## 2. Before merging: lead delivery (do not skip)

The API delivers each lead to every configured destination and shows the visitor an error if **none** accepts it.

1. In Vercel → Project → Settings → Environment Variables, confirm `RESEND_API_KEY` exists for **Production**.
2. In the Resend dashboard, check the sending domain:
   - If `peregrine-it.com` is **verified**: set `LEAD_FROM_EMAIL` (below). Notifications and visitor auto-replies will both deliver.
   - If it is **not verified**: the fallback sender `onboarding@resend.dev` is delivered only to the Resend account owner's own address. If that address is not `info@peregrine-it.com`, Resend rejects the notification and **every form submission will show an error** after this merge. Fix it first by verifying the domain (DNS records from Resend), or by setting `LEAD_WEBHOOK_URL` so a second destination accepts leads.
3. Test on the Vercel **Preview** deployment of this branch before merging: submit the form once and confirm the email arrives. Preview uses the *Preview* environment's variables, so set them there too.

## 3. Environment variables

Set in Vercel for **Production** (and **Preview** to test). `NEXT_PUBLIC_*` values are compiled into the build, so a redeploy is needed after changing them.

| Variable | Required | Example | Effect |
|---|---|---|---|
| `RESEND_API_KEY` | Yes (already expected by `main`) | `re_…` | Notification email to `info@peregrine-it.com` and the visitor auto-reply |
| `LEAD_FROM_EMAIL` | Strongly recommended | `Peregrine IT <hello@peregrine-it.com>` | Sender on a Resend-verified domain. Without it the Resend test sender is used |
| `LEAD_WEBHOOK_URL` | Optional | `https://hooks.example.com/…` | Every lead is also POSTed as JSON (CRM, Zapier, Make, n8n, a Google Sheet webhook). 5-second timeout |
| `NEXT_PUBLIC_GA_ID` | Optional | `G-XXXXXXXXXX` | Loads GA4 with Consent Mode (analytics denied until the visitor accepts) and shows the consent bar |

Do **not** set `RESEND_BASE_URL` in Vercel; it exists only so the integration tests can point the Resend SDK at a local mock.

Webhook payload: `receivedAt`, `source`, `name`, `email`, `company`, `form`, `projectType`, `timeline`, `service`, `message`, `pageUrl`, `landingPage`, `referrer`, `utm`.

## 4. Migration requirements

- **Database / data:** none.
- **DNS:** only if verifying the Resend sending domain (SPF/DKIM records from Resend).
- **Redirects:** none needed. `/industries/real-estate` keeps its URL (now served by a data-driven route).
- **Removed static file:** `/logos/brokerlinx.jpg` (replaced by `/logos/brokerlinx.webp`). Nothing on the site references the old file.
- **GA4:** create the property, link it to Search Console, mark `lead_submit` as a key event. Events sent: `cta_open`, `lead_submit`, `lead_error`, `calendly_click`, `email_click`, `guide_cta_click`, `calculator_use`.
- **Privacy policy:** already discloses Google Analytics, Calendly and cookies. If you add a CRM through the webhook, name it under "Third-Party Services".

## 5. Tests before merging (all run locally on the branch)

```bash
npx tsc --noEmit -p .
```
```bash
scripts/serve-local.sh
```
```bash
python3 scripts/seo_check.py
```
```bash
python3 scripts/test_lead_api.py
```
```bash
node --experimental-strip-types scripts/test_mls_fees.mjs
```

Expected: no type errors; `seo_check.py` prints `FAILS: 0` for 57 URLs; `test_lead_api.py` prints `39 passed, 0 failed`; `test_mls_fees.mjs` prints `56 passed`.

Manual, on the Vercel Preview URL:
1. Submit the form on a service page; the success message shows and the email arrives with company, timeline, service, landing page and UTM.
2. Open the nav popup form, submit, same result.
3. If `LEAD_WEBHOOK_URL` is set, confirm the lead arrives there.
4. If `NEXT_PUBLIC_GA_ID` is set: the consent bar shows; after Accept, `lead_submit` appears in GA4 Realtime (DebugView).
5. Open `/tools/mls-idx-cost-calculator`, pick two options, confirm the totals.
6. Check the homepage at phone width: hamburger menu, consent bar above the bottom CTA bar.

## 6. Deploy

1. Open one PR: `seo/phase-12` → `main`. Wait for the Vercel check to pass.
2. Merge with a merge commit (as PRs #2–#6 were).
3. Wait for the production deployment to finish in Vercel.

## 7. After deploy

```bash
python3 scripts/seo_check.py https://peregrine-it.com
```

- Expect `FAILS: 0` on 57 URLs.
- Submit one real test lead on production and confirm delivery.
- Resubmit all sitemap URLs to IndexNow (the footer and nav changed on every page).
- In Search Console, submit the sitemap again and request indexing for the new pages you care about most: `/industries/self-storage`, `/services/investor-portal-development`, `/tools/mls-idx-cost-calculator`, and the six new guides under `/blog/`.
- Watch Vercel → Logs for `Lead not delivered` or `Lead notification email failed` during the first day.
- Filter the same logs for `CSP violation`. After two clean weeks the report-only policy can be enforced.
- Re-pull Search Console at week 3 for the title experiments.

## 8. Rollback

Fastest (seconds, no git change): Vercel → Deployments → the previous production deployment → **Promote to Production** (Instant Rollback). Use this first if forms fail.

Then, to keep `main` consistent with what is live, revert the merge commit:

```bash
git revert -m 1 <merge-commit-sha>
```

Push that revert through a PR, as usual. Environment variables can stay; the previous code ignores `LEAD_FROM_EMAIL`, `LEAD_WEBHOOK_URL` and `NEXT_PUBLIC_GA_ID`.

Partial rollbacks without reverting code:
- **GA4 or the consent bar misbehaves:** remove `NEXT_PUBLIC_GA_ID` and redeploy.
- **Webhook misbehaves:** remove `LEAD_WEBHOOK_URL` (takes effect on the next request after redeploy).
- **A title experiment drops a page's position:** revert that one title in `src/data/…` (old titles are listed in TASKS.md).
