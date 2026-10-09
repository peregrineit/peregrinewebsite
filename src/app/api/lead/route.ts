import { createHash } from "node:crypto";
import { after, NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { cleanAttribution, multiLine, oneLine, type LeadAttribution } from "@/lib/attribution";
import { leadPriority, priorityLine, type PriorityResult } from "@/lib/lead-priority";
import { getLeadStore, STORE_TIMEOUT_MS, type StoreResult } from "@/lib/lead-store";
import { deliverWebhook, type Outcome } from "@/lib/lead-webhook";

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
// A store write (lib/lead-store.ts, off by default) is a record of an accepted lead. It is
// never acceptance on its own: nobody is notified when an object lands in a store.
//
// By default there is no durable storage in this app (no database; Vercel has no writable
// disk). The record of a lead is the notification email, Resend's own log and, when
// LEAD_WEBHOOK_URL is set, whatever that webhook writes to (docs/seo/LEAD-DELIVERY.md).
// With LEAD_STORE=vercel-blob and a token, each accepted lead is also written to Vercel
// Blob. Data flow and every variable: docs/growth/lead/ARCHITECTURE.md.

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
  /** How the visitor arrived. Every field is cleaned by lib/attribution.ts. */
  attribution: LeadAttribution;
  /** The hidden field had a value: probably a bot, possibly browser autofill. */
  spamSuspected: boolean;
}

/** A lead plus what this API derived from it. Only for the owner; never sent to the visitor. */
type QualifiedLead = LeadData & { priority: PriorityResult };

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Absent, null and a blank string are "not filled". Everything else is. */
function honeypotFilled(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  return typeof value === "string" ? value.trim() !== "" : true;
}

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

/** The provider's own error text with every email address removed, for diagnosis. */
function detailOf(error: unknown): string | undefined {
  const message = (error as { message?: unknown } | null)?.message;
  if (typeof message !== "string" || !message) return undefined;
  return message.replace(/[^\s<>"'`]+@[^\s<>"'`]+/g, "[email]").slice(0, 200);
}

/**
 * Send one email. The idempotency key makes a repeat of the same message (our own retry,
 * a double click, a visitor's retry after a lost response) a no-op at Resend instead of
 * a second email. One retry, and only when the failure could be transient.
 *
 * `deadlineMs` covers the whole call, retry included. The Resend SDK sets no timeout of its
 * own, so without it a stalled connection would hold the visitor's response for as long as
 * the platform allows. A send that has not answered by then is reported as failed with the
 * reason "timeout"; it may still go through at Resend, which is why a retry by the visitor
 * reuses the same idempotency key (components/LeadForms.tsx keeps the submission id).
 */
async function sendEmail(
  resend: Resend,
  payload: { to: string; subject: string; text: string; replyTo?: string },
  idempotencyKey: string,
  deadlineMs: number
): Promise<Outcome> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<Outcome>((resolve) => {
    timer = setTimeout(() => resolve({ status: "failed", reason: "timeout" }), deadlineMs);
  });
  try {
    return await Promise.race([trySend(resend, payload, idempotencyKey), timeout]);
  } finally {
    clearTimeout(timer);
  }
}

async function trySend(
  resend: Resend,
  payload: { to: string; subject: string; text: string; replyTo?: string },
  idempotencyKey: string
): Promise<Outcome> {
  let reason = "unknown error";
  let detail: string | undefined;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const { data, error } = await resend.emails.send({ from: FROM, ...payload }, { idempotencyKey });
      if (data?.id) return { status: "accepted", id: data.id };
      reason = error ? describe(error) : "no message id returned";
      detail = detailOf(error);
      // A 4xx (other than rate limiting) will fail the same way again.
      const code = error?.statusCode ?? 0;
      if (code >= 400 && code < 500 && code !== 429) break;
    } catch (err) {
      reason = describe(err);
      detail = detailOf(err);
    }
  }
  return { status: "failed", reason, detail };
}

function notificationEmail(lead: QualifiedLead) {
  const line = (label: string, value?: string) => `${label}: ${value || "Not provided"}`;
  const at = lead.attribution;
  const clickIds = (["gclid", "msclkid", "fbclid"] as const).filter((k) => at[k]).map((k) => `${k}=${at[k]}`).join(" ");
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
    // Derived from the fields below by lib/lead-priority.ts. A sorting aid, not a verdict.
    line("Priority", priorityLine(lead.priority)),
    line("Name", lead.name),
    line("Email", lead.email),
    line("Company", lead.company),
    line("Form", lead.form),
    line("Project Type", lead.projectType),
    line("Timeline", lead.timeline),
    line("Service", lead.service),
    "",
    line("Page URL", lead.pageUrl),
    line("Landing page", at.landingPage),
    line("Referrer", at.referrer),
    line("UTM", at.utm),
    line("Click IDs", clickIds),
    line("First visit", at.firstTouchAt ? at.firstTouchAt.slice(0, 10) : ""),
    line("First landing page", at.firstLandingPage),
    line("First referrer", at.firstReferrer),
    line("First UTM", at.firstUtm),
    line("Form opened from", at.ctaLocation),
    line("Pages viewed this visit", at.pagesViewed ? String(at.pagesViewed) : ""),
    "",
    // The message is the one part the visitor controls line by line. It comes last, after a
    // delimiter, and each of its lines is prefixed, so nothing in it can pass for a line of
    // the block above.
    "----- Message, exactly as typed by the visitor. Every line of it starts with \">\" -----",
    ...lead.message.split("\n").map((l) => (l ? `> ${l}` : ">")),
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

/** The lead as the webhook receives it: flat, so a spreadsheet receiver can map keys to columns. */
function webhookBody(lead: QualifiedLead, receivedAt: string) {
  const { attribution, priority, ...rest } = lead;
  return {
    receivedAt,
    source: "peregrine-it.com",
    ...rest,
    ...attribution,
    priority: priority.priority,
    priorityReasons: priority.reasons.join("; "),
  };
}

/** One delivery per lead: retry, time budget and signature are in lib/lead-webhook.ts. */
function postToWebhook(url: string, lead: QualifiedLead, receivedAt: string): Promise<Outcome> {
  return deliverWebhook(url, JSON.stringify(webhookBody(lead, receivedAt)), `lead-${lead.ref}`, { secret: process.env.LEAD_WEBHOOK_SECRET });
}

/** Where a lead is (or would be) durably recorded: "none", "webhook", "vercel-blob" or "webhook+vercel-blob". */
function durable(webhook: boolean, store: string | false): string {
  return [webhook && "webhook", store].filter(Boolean).join("+") || "none";
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

/** Longest wait for Resend, per email, retry included. The acknowledgement gets less: the lead is already safe. */
const NOTIFY_DEADLINE_MS = 8000;
const ACK_DEADLINE_MS = 5000;
/** Webhook and store together must be done this long after the request started. */
const SHARED_DEADLINE_MS = 5500;
/** Once the lead is accepted, the store write waits at most this long for the other destination's answer. */
const STORE_START_MS = 2000;
/** A store write is never started with less time than this. */
const MIN_STORE_MS = 250;

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
  const store = getLeadStore().name;
  return NextResponse.json(
    {
      // A destination is configured. Not proof that anything has been delivered.
      ok: resend || webhook,
      resend,
      // "custom" when LEAD_FROM_EMAIL is set, otherwise Resend's test sender.
      sender: process.env.LEAD_FROM_EMAIL ? "custom" : "resend-test-sender",
      senderDomainVerified: await senderDomainVerified(),
      webhook,
      // Requests to the webhook carry an HMAC signature (LEAD_WEBHOOK_SECRET is set).
      webhookSigned: webhook && Boolean(process.env.LEAD_WEBHOOK_SECRET),
      // Someone is told when the notification email fails but the lead was still accepted.
      ownerAlert: Boolean(process.env.LEAD_ALERT_WEBHOOK_URL),
      // "none" unless LEAD_STORE=vercel-blob and its token are both set. A store alone does
      // not make `ok` true: a lead still needs the email or the webhook to be accepted.
      store,
      durableStorage: durable(webhook, store !== "none" && store),
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

    const content: Omit<LeadData, "ref"> = {
      // Every field printed as "Label: value" is forced onto one line (lib/attribution.ts), so
      // a value cannot forge a line of the notification ("Priority: ...", "Email: ...") or add
      // text to the acknowledgement, which goes to an address the submitter chose.
      name: oneLine(raw.name, 200),
      email: oneLine(raw.email, 320),
      // The only multi-line field. It is quoted line by line in the notification.
      message: multiLine(raw.message, 5000),
      form: oneLine(raw.form, 60),
      company: oneLine(raw.company, 200),
      projectType: oneLine(raw.projectType, 100),
      // Older clients sent the timeline in `budget`.
      timeline: oneLine(raw.timeline, 60) || oneLine(raw.budget, 60),
      service: oneLine(raw.service, 100),
      pageUrl: oneLine(raw.pageUrl, 500),
      attribution: cleanAttribution(raw),
      // Honeypot. A filled field used to return a silent "success" with nothing sent, which
      // also swallowed real visitors whose browser autofilled it. Now the lead still goes to
      // the inbox, marked, and only the acknowledgement (which a bot could aim at a third
      // party) is withheld.
      // Flagged by anything a person's browser would not send: the form sends "" for an
      // untouched field. A non-empty string, or any other type at all (true, 1, 0, [], {}),
      // is a script.
      spamSuspected: honeypotFilled(raw[HONEYPOT_FIELD]),
    };

    // Reference. The form sends one submissionId per attempt and reuses it when it retries.
    // The reference, and with it every idempotency key (`lead-notify-<ref>`, `lead-ack-<ref>`,
    // `lead-<ref>`) and the store path, is derived from that id AND the cleaned content:
    //   - an identical retry gets the same reference, so nothing is sent or stored twice;
    //   - a retry the visitor edited first (network error, changed message, send again) gets
    //     a new reference and is delivered as the new message it is. Before, it reused the
    //     keys: the mail provider dropped it or refused it (Resend answers 409 to a reused
    //     key with a different payload) and it overwrote the first stored object.
    // "Content" is everything that ends up in the notification, attribution included, so one
    // key never stands for two different payloads.
    const submissionId = clean(raw.submissionId, 64).toLowerCase();
    ref = UUID.test(submissionId)
      ? createHash("sha256").update(`${submissionId}\n${JSON.stringify(content)}`).digest("hex").slice(0, 8)
      : crypto.randomUUID().replace(/-/g, "").slice(0, 8);
    const fields: LeadData = { ref, ...content };

    const lead: QualifiedLead = { ...fields, priority: leadPriority(fields) };

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
    const store = getLeadStore();
    const receivedAt = new Date().toISOString();

    // Time. The webhook (retry included) has 5 s. The store shares that deadline instead of
    // adding its own 3 s on top: its write starts as soon as the lead is known to be accepted,
    // at the latest STORE_START_MS after the start even if the other destination has not
    // answered yet, and it must finish by SHARED_DEADLINE_MS. So a hung webhook and a hung
    // store together hold the response for about 5.5 s at most, not 8.
    const started = Date.now();
    const notifying: Promise<Outcome> = resend
      ? sendEmail(resend, notificationEmail(lead), `lead-notify-${ref}`, NOTIFY_DEADLINE_MS)
      : Promise.resolve<Outcome>({ status: "skipped", reason: "RESEND_API_KEY not set" });
    const hooking: Promise<Outcome> = webhookUrl
      ? postToWebhook(webhookUrl, lead, receivedAt)
      : Promise.resolve<Outcome>({ status: "skipped", reason: "LEAD_WEBHOOK_URL not set" });

    // What has answered so far. "pending" in the stored object means "not known yet when
    // the object was written", which is the truth.
    const sofar: { notification?: Outcome; webhook?: Outcome } = {};
    const firstAcceptance = new Promise<void>((resolve) => {
      void notifying.then((o) => { sofar.notification = o; if (o.status === "accepted") resolve(); });
      void hooking.then((o) => { sofar.webhook = o; if (o.status === "accepted") resolve(); });
    });
    const settled = Promise.all([notifying, hooking]);
    await Promise.race([settled, Promise.all([firstAcceptance, new Promise((resolve) => setTimeout(resolve, STORE_START_MS))])]);

    // The durable record, only for a lead something has accepted (lib/lead-store.ts explains
    // why a store write is not acceptance).
    const saveNow = () =>
      store.save(
        {
          ...webhookBody(lead, receivedAt),
          delivery: { notification: sofar.notification?.status ?? "pending", webhook: sofar.webhook?.status ?? "pending" },
        },
        { timeoutMs: Math.max(MIN_STORE_MS, Math.min(STORE_TIMEOUT_MS, started + SHARED_DEADLINE_MS - Date.now())) }
      );
    const acceptedSoFar = sofar.notification?.status === "accepted" || sofar.webhook?.status === "accepted";
    const earlyStoring: Promise<StoreResult> | null = acceptedSoFar ? saveNow() : null;

    const [notification, webhook] = await settled;

    const accepted = notification.status === "accepted" || webhook.status === "accepted";

    let acknowledging: Promise<Outcome> | Outcome;
    if (!resend) acknowledging = { status: "skipped", reason: "RESEND_API_KEY not set" };
    else if (!accepted) acknowledging = { status: "skipped", reason: "lead was not accepted" };
    else if (lead.spamSuspected) acknowledging = { status: "skipped", reason: "hidden field was filled" };
    else acknowledging = sendEmail(resend, acknowledgementEmail(lead), `lead-ack-${ref}`, ACK_DEADLINE_MS);

    const storing: Promise<StoreResult> | StoreResult = accepted
      ? earlyStoring ?? saveNow()
      : { status: "skipped", reason: store.name === "none" ? "no store configured" : "lead was not accepted" };

    const [acknowledgement, stored] = await Promise.all([acknowledging, storing]);

    // One line per lead, no personal data: reference, per-message outcome and provider ids.
    const record = {
      ref,
      form: lead.form,
      environment: process.env.VERCEL_ENV || "local",
      sender: process.env.LEAD_FROM_EMAIL ? "custom" : "resend-test-sender",
      spamSuspected: lead.spamSuspected,
      priority: lead.priority.priority,
      notification,
      acknowledgement,
      webhook,
      store: stored,
      durableStorage: durable(webhook.status === "accepted", stored.status === "stored" && store.name),
    };

    if (!accepted) {
      console.error("Lead NOT accepted by any destination", JSON.stringify(record));
      // Outside production the reason is also returned, so a failed test can be diagnosed
      // from the browser without log access. It names the provider's error, never a value.
      const diagnostic =
        process.env.VERCEL_ENV === "production"
          ? undefined
          : {
              notification: [notification.reason, notification.status === "failed" ? notification.detail : ""].filter(Boolean).join(": "),
              webhook: webhook.reason,
            };
      return NextResponse.json(
        { success: false, status: "not-accepted", ref, error: `We could not send your request. Please email ${NOTIFY_TO} directly.`, diagnostic },
        { status: 502 }
      );
    }

    if (notification.status === "failed" || acknowledgement.status === "failed" || webhook.status === "failed" || stored.status === "failed") {
      console.error("Lead accepted with a failed step", JSON.stringify(record));
    } else {
      console.log("Lead accepted", JSON.stringify(record));
    }

    // Owner alert. The lead is held by the webhook (and perhaps the store) but the email
    // that tells the owner about it was refused, so without this nobody is told. The alert
    // must not depend on what just failed, so it does not use Resend: it is a small POST to
    // LEAD_ALERT_WEBHOOK_URL (for example the Sheet script, which then mails the owner
    // through Google). It carries the reference and the reason, no personal data, and is
    // sent after the response so it cannot delay the visitor. Without that variable there
    // is no alert channel, only the error-level log line above.
    const alertUrl = process.env.LEAD_ALERT_WEBHOOK_URL;
    if (notification.status === "failed" && alertUrl) {
      const alert = JSON.stringify({
        event: "lead_notification_failed",
        ref,
        receivedAt,
        source: "peregrine-it.com",
        environment: record.environment,
        form: lead.form,
        priority: lead.priority.priority,
        heldBy: record.durableStorage,
        reason: notification.reason,
      });
      after(async () => {
        const sent = await deliverWebhook(alertUrl, alert, `lead-alert-${ref}`, { secret: process.env.LEAD_WEBHOOK_SECRET });
        if (sent.status === "accepted") console.log("Lead alert sent", JSON.stringify({ ref }));
        else console.error("Lead alert FAILED", JSON.stringify({ ref, reason: sent.status === "failed" ? sent.reason : sent.status }));
      });
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
      store: { status: stored.status },
      durableStorage: record.durableStorage,
    });
  } catch (err) {
    console.error("Lead API error", JSON.stringify({ ref, error: describe(err) }));
    return NextResponse.json({ success: false, status: "error", error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
