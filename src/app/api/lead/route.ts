import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Lead intake for the two site forms (components/LeadForms.tsx).
//
// Three different things, never conflated:
//   1. submission accepted  - this API validated the lead and gave it a reference
//   2. provider accepted    - Resend (or the webhook) returned an id / 2xx for it
//   3. delivered            - Resend later reports the message as delivered to the inbox
// POST reports 1 and 2. It never says "delivered": that is only known afterwards, from
// GET /api/lead?delivery=<message id> or the Resend dashboard.
//
// Acceptance rule: the visitor is told the request was received only when the
// notification email was accepted by Resend or the webhook accepted the lead.
//
// There is no durable storage in this app (no database; Vercel has no writable disk).
// The record of a lead is the notification email, Resend's own log and, when
// LEAD_WEBHOOK_URL is set, whatever that webhook writes to (docs/seo/LEAD-DELIVERY.md).

const NOTIFY_TO = "info@peregrine-it.com";
/** Must match the hidden input in components/LeadForms.tsx. */
const HONEYPOT_FIELD = "pit_confirm_field";
// The fallback is Resend's test sender, which Resend only delivers to the account owner.
const FROM = process.env.LEAD_FROM_EMAIL || "Peregrine IT <onboarding@resend.dev>";

interface LeadData {
  /** Short reference shared by the emails, the webhook row, the server log and the visitor. */
  ref: string;
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
  /** The hidden field had a value: probably a bot, possibly browser autofill. */
  spamSuspected: boolean;
}

/** Outcome of one outbound message. `id` is the provider's message id, never content. */
type Outcome =
  | { status: "accepted"; id: string }
  | { status: "failed"; reason: string }
  | { status: "skipped"; reason: string };

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

/** Error name and status only: Resend's messages can echo addresses. */
function describe(error: unknown): string {
  if (error && typeof error === "object") {
    const e = error as { name?: string; statusCode?: number | null; message?: string };
    if (e.name && e.name !== "Error") return `${e.name}${e.statusCode ? ` (${e.statusCode})` : ""}`;
    if (e.message) return e.message.slice(0, 80);
  }
  return "unknown error";
}

/**
 * Send one email. The idempotency key makes a repeat of the same message (our own retry,
 * a double click, a visitor's retry after a lost response) a no-op at Resend instead of
 * a second email. One retry, and only when the failure could be transient.
 */
async function sendEmail(
  resend: Resend,
  payload: { to: string; subject: string; text: string; replyTo?: string },
  idempotencyKey: string
): Promise<Outcome> {
  let reason = "unknown error";
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const { data, error } = await resend.emails.send({ from: FROM, ...payload }, { idempotencyKey });
      if (data?.id) return { status: "accepted", id: data.id };
      reason = error ? describe(error) : "no message id returned";
      // A 4xx (other than rate limiting) will fail the same way again.
      const code = error?.statusCode ?? 0;
      if (code >= 400 && code < 500 && code !== 429) break;
    } catch (err) {
      reason = describe(err);
    }
  }
  return { status: "failed", reason };
}

function notificationEmail(lead: LeadData) {
  const line = (label: string, value?: string) => `${label}: ${value || "Not provided"}`;
  const text = [
    "New Project Inquiry",
    "",
    ...(lead.spamSuspected
      ? [
          "NOTE: the form's hidden anti-spam field was filled in. That is usually a bot and sometimes a browser's autofill. No acknowledgement was sent to this address.",
          "",
        ]
      : []),
    line("Reference", lead.ref),
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
  return {
    to: NOTIFY_TO,
    replyTo: lead.email,
    subject: `${lead.spamSuspected ? "[Possible spam] " : ""}New Project Inquiry – Peregrine IT [${lead.ref}]`,
    text,
  };
}

function acknowledgementEmail(lead: LeadData) {
  // One reply-time promise site-wide: "within 1 business day" (owner instruction, 2026-10-09).
  return {
    to: lead.email,
    subject: "We received your project request",
    text: `Hi ${lead.name},

Thanks for contacting Peregrine IT.
An engineer will review your request and reply within 1 business day.

Your reference: ${lead.ref}

– Peregrine IT Team
https://peregrine-it.com`,
  };
}

async function postToWebhook(url: string, lead: LeadData): Promise<Outcome> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Idempotency-Key": `lead-${lead.ref}` },
      body: JSON.stringify({ receivedAt: new Date().toISOString(), source: "peregrine-it.com", ...lead }),
      // A hung CRM must not stall the visitor's response.
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return { status: "failed", reason: `webhook responded ${res.status}` };
    return { status: "accepted", id: `http-${res.status}` };
  } catch (err) {
    const name = (err as { name?: string })?.name;
    return { status: "failed", reason: name === "TimeoutError" || name === "AbortError" ? "webhook timed out" : "webhook unreachable" };
  }
}

// Whether Resend reports the sender's domain as verified. Asked of Resend itself, so it
// does not rest on a DNS guess. null = could not be checked (no key, the test sender,
// or an API key restricted to sending, which may not list domains).
let domainCheck: { at: number; value: boolean | null } | null = null;
async function senderDomainVerified(): Promise<boolean | null> {
  if (!process.env.RESEND_API_KEY || !process.env.LEAD_FROM_EMAIL) return null;
  if (domainCheck && Date.now() - domainCheck.at < 5 * 60 * 1000) return domainCheck.value;
  let value: boolean | null = null;
  try {
    const domain = FROM.match(/@([^>\s]+)/)?.[1]?.toLowerCase();
    const { data, error } = await new Resend(process.env.RESEND_API_KEY).domains.list();
    if (domain && !error && data) {
      const match = data.data.find((d) => domain === d.name.toLowerCase() || domain.endsWith(`.${d.name.toLowerCase()}`));
      value = match ? match.status === "verified" : false;
    }
  } catch {
    value = null;
  }
  domainCheck = { at: Date.now(), value };
  return value;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// GET /api/lead                      configuration, booleans only, never a value.
// GET /api/lead?delivery=<id>[,<id>] what Resend last recorded for those messages
//                                    ("delivered", "bounced", ...). The ids are the
//                                    unguessable ones POST returned; only the event name
//                                    comes back. null = not known (also when the API key
//                                    is restricted to sending and may not read messages).
export async function GET(request: NextRequest) {
  const headers = { "Cache-Control": "no-store" };
  const delivery = request.nextUrl.searchParams.get("delivery");
  if (delivery !== null) {
    const ids = delivery.split(",").filter((id) => UUID.test(id)).slice(0, 2);
    const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
    const events = await Promise.all(
      ids.map(async (id) => {
        if (!resend) return { id, lastEvent: null };
        try {
          const { data } = await resend.emails.get(id);
          return { id, lastEvent: data?.last_event ?? null };
        } catch {
          return { id, lastEvent: null };
        }
      })
    );
    return NextResponse.json({ events }, { headers });
  }

  const resend = Boolean(process.env.RESEND_API_KEY);
  const webhook = Boolean(process.env.LEAD_WEBHOOK_URL);
  return NextResponse.json(
    {
      // A destination is configured. Not proof that anything has been delivered.
      ok: resend || webhook,
      resend,
      // "custom" when LEAD_FROM_EMAIL is set, otherwise Resend's test sender.
      sender: process.env.LEAD_FROM_EMAIL ? "custom" : "resend-test-sender",
      senderDomainVerified: await senderDomainVerified(),
      webhook,
      durableStorage: webhook ? "webhook" : "none",
      environment: process.env.VERCEL_ENV || "local",
    },
    { headers }
  );
}

export async function POST(request: NextRequest) {
  let ref = "unassigned";
  try {
    const raw = await request.json().catch(() => null);
    if (!raw || typeof raw !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
    }

    // The form sends one id per attempt and reuses it when it retries, so a retry maps to
    // the same reference and the same idempotency keys.
    const submissionId = clean(raw.submissionId, 64);
    ref = (UUID.test(submissionId) ? submissionId : crypto.randomUUID()).replace(/-/g, "").slice(0, 8);

    const lead: LeadData = {
      ref,
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
      // Honeypot. A filled field used to return a silent "success" with nothing sent, which
      // also swallowed real visitors whose browser autofilled it. Now the lead still goes to
      // the inbox, marked, and only the acknowledgement (which a bot could aim at a third
      // party) is withheld.
      spamSuspected: Boolean(clean(raw[HONEYPOT_FIELD])),
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
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;

    const [notification, webhook] = await Promise.all([
      resend
        ? sendEmail(resend, notificationEmail(lead), `lead-notify-${ref}`)
        : Promise.resolve<Outcome>({ status: "skipped", reason: "RESEND_API_KEY not set" }),
      webhookUrl
        ? postToWebhook(webhookUrl, lead)
        : Promise.resolve<Outcome>({ status: "skipped", reason: "LEAD_WEBHOOK_URL not set" }),
    ]);

    const accepted = notification.status === "accepted" || webhook.status === "accepted";

    let acknowledgement: Outcome;
    if (!resend) acknowledgement = { status: "skipped", reason: "RESEND_API_KEY not set" };
    else if (!accepted) acknowledgement = { status: "skipped", reason: "lead was not accepted" };
    else if (lead.spamSuspected) acknowledgement = { status: "skipped", reason: "hidden field was filled" };
    else acknowledgement = await sendEmail(resend, acknowledgementEmail(lead), `lead-ack-${ref}`);

    // One line per lead, no personal data: reference, per-message outcome and provider ids.
    const record = {
      ref,
      form: lead.form,
      environment: process.env.VERCEL_ENV || "local",
      sender: process.env.LEAD_FROM_EMAIL ? "custom" : "resend-test-sender",
      spamSuspected: lead.spamSuspected,
      notification,
      acknowledgement,
      webhook,
      durableStorage: webhook.status === "accepted" ? "webhook" : "none",
    };

    if (!accepted) {
      console.error("Lead NOT accepted by any destination", JSON.stringify(record));
      return NextResponse.json(
        { success: false, status: "not-accepted", ref, error: `We could not send your request. Please email ${NOTIFY_TO} directly.` },
        { status: 502 }
      );
    }

    if (notification.status === "failed" || acknowledgement.status === "failed" || webhook.status === "failed") {
      console.error("Lead accepted with a failed step", JSON.stringify(record));
    } else {
      console.log("Lead accepted", JSON.stringify(record));
    }

    const publicOutcome = (o: Outcome) => ({ status: o.status, id: o.status === "accepted" ? o.id : undefined });
    return NextResponse.json({
      success: true,
      // Accepted by the mail provider or the webhook. Not a delivery confirmation.
      status: "accepted",
      ref,
      notification: publicOutcome(notification),
      acknowledgement: publicOutcome(acknowledgement),
      webhook: { status: webhook.status },
      durableStorage: record.durableStorage,
    });
  } catch (err) {
    console.error("Lead API error", JSON.stringify({ ref, error: describe(err) }));
    return NextResponse.json({ success: false, status: "error", error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
