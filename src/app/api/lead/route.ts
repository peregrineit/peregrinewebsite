import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Lead intake for the two site forms (components/LeadForms.tsx).
// A lead is delivered to every configured destination:
//   - RESEND_API_KEY     -> notification email to info@peregrine-it.com (+ auto-reply)
//   - LEAD_WEBHOOK_URL   -> JSON POST to a CRM or automation webhook (optional)
// The visitor only sees "sent" when at least one destination accepted the lead.
// Vercel's filesystem is not persistent, so nothing is written to disk.

const NOTIFY_TO = "info@peregrine-it.com";
/** Must match the hidden input in components/LeadForms.tsx. */
const HONEYPOT_FIELD = "pit_confirm_field";
// TODO(owner): set LEAD_FROM_EMAIL to a sender on a domain verified in Resend. The
// fallback is Resend's test sender, which Resend only delivers to the account owner.
const FROM = process.env.LEAD_FROM_EMAIL || "Peregrine IT <onboarding@resend.dev>";

interface LeadData {
  name: string;
  email: string;
  message: string;
  form?: string;
  company?: string;
  projectType?: string;
  timeline?: string;
  service?: string;
  pageUrl?: string;
  landingPage?: string;
  referrer?: string;
  utm?: string;
}

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Best-effort rate limit per serverless instance: 5 submissions per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  return recent.length > MAX_PER_WINDOW;
}

async function sendNotificationEmail(resend: Resend, lead: LeadData) {
  const line = (label: string, value?: string) => `${label}: ${value || "Not provided"}`;
  const body = [
    "New Project Inquiry",
    "",
    line("Name", lead.name),
    line("Email", lead.email),
    line("Company", lead.company),
    line("Form", lead.form),
    line("Project Type", lead.projectType),
    line("Timeline", lead.timeline),
    line("Service", lead.service),
    "",
    line("Page URL", lead.pageUrl),
    line("Landing page", lead.landingPage),
    line("Referrer", lead.referrer),
    line("UTM", lead.utm),
    "",
    "Message:",
    lead.message,
  ].join("\n");

  const { error } = await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    replyTo: lead.email,
    subject: "New Project Inquiry – Peregrine IT",
    text: body,
  });
  if (error) throw new Error(error.message);
}

async function sendAutoReply(resend: Resend, email: string, name: string) {
  // TODO(owner): confirm the response-time promise (B3 in docs/seo/BLOCKERS.md). The forms and
  // this email currently state different times.
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "We received your project request",
    text: `Hi ${name},

Thanks for contacting Peregrine IT.
An engineer will review your request and reply within 6 hours.

– Peregrine IT Team
https://peregrine-it.com`,
  });
}

async function postToWebhook(url: string, lead: LeadData) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ receivedAt: new Date().toISOString(), source: "peregrine-it.com", ...lead }),
    // A hung CRM must not stall the visitor's response.
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`webhook responded ${res.status}`);
}

export async function POST(request: NextRequest) {
  try {
    const raw = await request.json().catch(() => null);
    if (!raw || typeof raw !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Honeypot: this field is hidden from people, so only bots fill it in. It has a
    // nonsense name so browser autofill and password managers leave it alone.
    // Answer as if it worked.
    if (clean(raw[HONEYPOT_FIELD])) return NextResponse.json({ success: true });

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
    }

    const lead: LeadData = {
      name: clean(raw.name, 200),
      email: clean(raw.email, 320),
      message: clean(raw.message, 5000),
      form: clean(raw.form, 60),
      company: clean(raw.company, 200),
      projectType: clean(raw.projectType, 100),
      // Older clients sent the timeline in `budget`.
      timeline: clean(raw.timeline, 60) || clean(raw.budget, 60),
      service: clean(raw.service, 100),
      pageUrl: clean(raw.pageUrl, 500),
      landingPage: clean(raw.landingPage, 500),
      referrer: clean(raw.referrer, 500),
      utm: clean(raw.utm, 500),
    };

    if (!lead.name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!validateEmail(lead.email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }
    if (lead.message.length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 400 });
    }

    const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
    const webhook = process.env.LEAD_WEBHOOK_URL;
    let delivered = false;

    if (resend) {
      try {
        await sendNotificationEmail(resend, lead);
        delivered = true;
      } catch (err) {
        console.error("Lead notification email failed:", err);
      }
    }
    if (webhook) {
      try {
        await postToWebhook(webhook, lead);
        delivered = true;
      } catch (err) {
        console.error("Lead webhook failed:", err);
      }
    }

    if (!delivered) {
      // Nothing received the lead. Say so instead of showing a false "sent".
      console.error("Lead not delivered: no destination accepted it.", { form: lead.form, pageUrl: lead.pageUrl });
      return NextResponse.json(
        { error: `We could not send your request. Please email ${NOTIFY_TO} directly.` },
        { status: 502 }
      );
    }

    if (resend) {
      try {
        await sendAutoReply(resend, lead.email, lead.name);
      } catch (err) {
        console.error("Auto-reply email failed:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
