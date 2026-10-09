import { NextRequest, NextResponse } from "next/server";

// Receives Content-Security-Policy violation reports (the policy is Report-Only; see
// next.config.ts) and writes one compact line per violation to the server log, where
// Vercel's log viewer can filter on "CSP violation". Nothing is stored.
// Browsers send either the legacy `application/csp-report` body or the Reporting API's
// `application/reports+json` array; both are handled.

const MAX_BODY = 8 * 1024;
const MAX_REPORTS = 10;

type Legacy = { "csp-report"?: Record<string, unknown> };
type Modern = { type?: string; body?: Record<string, unknown> };

const pick = (r: Record<string, unknown>, ...keys: string[]) => {
  for (const k of keys) if (typeof r[k] === "string" && r[k]) return String(r[k]).slice(0, 300);
  return "";
};

export async function POST(request: NextRequest) {
  try {
    const text = (await request.text()).slice(0, MAX_BODY);
    const parsed: unknown = JSON.parse(text);
    const reports: Record<string, unknown>[] = Array.isArray(parsed)
      ? (parsed as Modern[]).filter((r) => r?.type === "csp-violation" && r.body).map((r) => r.body!)
      : (parsed as Legacy)?.["csp-report"]
        ? [(parsed as Legacy)["csp-report"]!]
        : [];
    for (const r of reports.slice(0, MAX_REPORTS)) {
      console.warn("CSP violation", JSON.stringify({
        directive: pick(r, "effective-directive", "effectiveDirective", "violated-directive"),
        blocked: pick(r, "blocked-uri", "blockedURL"),
        page: pick(r, "document-uri", "documentURL"),
        source: pick(r, "source-file", "sourceFile"),
      }));
    }
  } catch {
    // Malformed reports are ignored; this endpoint must never error loudly.
  }
  return new NextResponse(null, { status: 204 });
}
