// Lead qualification: a priority for the owner's inbox, derived only from what the
// visitor already typed into the form. Deterministic; no lookups, no third parties.
//
// It goes into the notification email and the webhook payload. It is never returned to
// the visitor and never changes whether or how a lead is delivered.
// Rules are documented in docs/growth/lead/ARCHITECTURE.md; keep the two in step.
//
// No imports: unit-tested with `node --experimental-strip-types scripts/test_lead_priority.mjs`.

export type Priority = 'high' | 'normal' | 'low';

export type PriorityInput = {
  email: string;
  message: string;
  timeline?: string;
  company?: string;
  form?: string;
  service?: string;
  /** The hidden anti-spam field had a value. */
  spamSuspected?: boolean;
};

export type PriorityResult = { priority: Priority; score: number; reasons: string[] };

/** Consumer mailbox providers. An address here says nothing about the sender's employer. */
export const FREE_MAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.ca', 'yahoo.co.uk', 'yahoo.co.in', 'ymail.com', 'rocketmail.com',
  'hotmail.com', 'hotmail.ca', 'hotmail.co.uk', 'outlook.com', 'live.com', 'live.ca', 'msn.com',
  'icloud.com', 'me.com', 'mac.com', 'aol.com', 'proton.me', 'protonmail.com', 'pm.me', 'gmx.com', 'gmx.net', 'mail.com',
  'zoho.com', 'yandex.com', 'yandex.ru', 'fastmail.com', 'hey.com', 'tutanota.com', 'tuta.io', 'qq.com', '163.com', 'rediffmail.com',
  'shaw.ca', 'rogers.com', 'bell.net', 'sympatico.ca', 'telus.net', 'comcast.net', 'verizon.net', 'att.net', 'sbcglobal.net', 'cox.net',
]);

/**
 * Throwaway-mailbox services: a short, explicit list, not a lookup. An address here is the
 * one negative signal about the sender rather than the request, and it is sized so that no
 * combination of other signals reaches "high".
 */
export const DISPOSABLE_MAIL_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'sharklasers.com', 'yopmail.com', '10minutemail.com',
  'tempmail.com', 'temp-mail.org', 'trashmail.com', 'getnada.com', 'maildrop.cc', 'dispostable.com', 'throwawaymail.com',
  'fakeinbox.com', 'mintemail.com', 'emailondeck.com', 'mohmal.com', 'moakt.com',
]);

/** The forms' own placeholder for an empty message (components/LeadForms.tsx). */
const DEFAULT_MESSAGE = 'Strategy call request';

/** This score or more is high. */
export const HIGH_AT = 5;
/** This score or less is low: low takes a net negative, never the mere absence of positives. */
export const LOW_AT = -1;

export function emailDomain(email: string): string {
  return email.slice(email.lastIndexOf('@') + 1).trim().toLowerCase();
}

/**
 * Points:
 *   timeline   asap +2 · 1-2-months +1 · 2-6-months 0 · exploring -1 · anything else 0
 *   company    given +1
 *   email      business domain +1 · free-mail 0 · disposable-mailbox domain -3
 *   message    400+ characters +2 · 120+ +1 · under 30 (or the default text) -1
 *   form       strategy-call +1 (asked for a call and chose a project type) · other 0
 *   service    sent from a service, industry or guide page +1
 * Score 5 or more = high, -1 or less = low, otherwise normal (0 is normal).
 * A filled anti-spam field is always low, whatever the score.
 *
 * Why these bands: a lead with nothing for or against it (free-mail address, no rush, a
 * sentence or two) scores 0 and must read as an ordinary enquiry, so "low" needs an actual
 * negative: "just exploring", a near-empty message, or a throwaway address, not outweighed
 * by anything else. A free-mail address is never negative: many owners of small firms
 * write from one. The quick-project form has no company field and is rarely on a service
 * page, so its leads sit around 0 to 3 and are normal unless something is against them.
 */
export function leadPriority(input: PriorityInput): PriorityResult {
  let score = 0;
  const reasons: string[] = [];
  const add = (points: number, reason: string) => {
    score += points;
    reasons.push(`${reason} ${points > 0 ? '+' : ''}${points}`);
  };

  const timeline = (input.timeline || '').trim().toLowerCase();
  if (timeline === 'asap') add(2, 'timeline ASAP');
  else if (timeline === '1-2-months') add(1, 'timeline 1-2 months');
  else if (timeline === '2-6-months') add(0, 'timeline 2-6 months');
  else if (timeline === 'exploring') add(-1, 'just exploring');
  else add(0, 'no timeline');

  if ((input.company || '').trim()) add(1, 'company given');

  const domain = emailDomain(input.email);
  if (DISPOSABLE_MAIL_DOMAINS.has(domain)) add(-3, 'disposable email domain');
  else if (FREE_MAIL_DOMAINS.has(domain)) add(0, 'free-mail address');
  else add(1, 'business email domain');

  const message = input.message.trim();
  const length = message === DEFAULT_MESSAGE ? 0 : message.length;
  if (length >= 400) add(2, 'detailed message');
  else if (length >= 120) add(1, 'message with some detail');
  else if (length < 30) add(-1, length ? 'very short message' : 'no message');

  if (input.form === 'strategy-call') add(1, 'strategy-call form');
  if ((input.service || '').trim()) add(1, 'sent from a service or landing page');

  if (input.spamSuspected) return { priority: 'low', score, reasons: ['anti-spam field was filled', ...reasons] };
  return { priority: score >= HIGH_AT ? 'high' : score <= LOW_AT ? 'low' : 'normal', score, reasons };
}

/** "High (timeline ASAP +2; company given +1)" for the notification email. */
export function priorityLine(result: PriorityResult): string {
  const label = result.priority[0].toUpperCase() + result.priority.slice(1);
  return `${label} (${result.reasons.join('; ')})`;
}
