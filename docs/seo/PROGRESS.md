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
