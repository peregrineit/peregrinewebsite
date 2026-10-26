// Non-blocking lead classification for inbox prioritisation.
//
// Deterministic, pure, no I/O. Looks only at what the visitor wrote and the
// structured context the form sent. It NEVER changes whether a lead is
// accepted, delivered, acknowledged or forwarded; it only sets the subject
// prefix of the owner's notification and an internal note. When in doubt the
// answer is NORMAL.
//
// Deliberately NOT used as signals: the visitor's name (any spelling), the
// email address or its domain, language, grammar, or IP. (The older
// lead-priority.ts sorting hint keeps its own documented rules; this one is
// the subject prefix.)
//
// Mirrored (same rules, CommonJS) in crm-apis helpers/leadClassifier.js.
// No imports: unit-tested with `node --experimental-strip-types scripts/test_lead_classifier.mjs`.

export type LeadLevel = 'HIGH' | 'NORMAL' | 'POSSIBLE_SPAM';
export type LeadSignal = { points: number; reason: string };
export type LeadClassification = { level: LeadLevel; score: number; reasons: string[]; signals: LeadSignal[] };

export type ClassifyInput = {
  message?: string;
  phone?: string;
  /** The fixed-choice context the visitor picked (enquiry type, project type). */
  enquiry?: string;
  /** A canonical board / known identifier; "Other" is neutral. */
  board?: string;
  conversionPath?: string;
  landingPath?: string;
  /** The hidden anti-spam field had a value. */
  honeypot?: boolean;
};
export type ClassifyConfig = {
  highIntentEnquiries?: readonly string[];
  contextTerms?: readonly string[];
  relevantPath?: RegExp | null;
  /** Extra positive context signals (+1 each) the project can derive itself, e.g. "asked for a call". */
  extraContext?: readonly string[];
};

const RANDOM_TOKEN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z0-9]{16,}$/;
const RANDOM_TOKEN_LONG = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z0-9]{24,}$/;
const URL_OR_EMAIL = /^(https?:\/\/|www\.)|@|\.[a-z]{2,}(\/|$)/i;
const WORD = /^[\p{L}][\p{L}'’\-]*[.,!?;:…]*$/u;
const TEST_STRINGS = new Set(['test', 'testing', 'test test', 'asdf', 'asdfasdf', 'asdfgh', 'qwerty', 'qwertyuiop', 'zxcv', 'abc', 'abcd', 'abc123', '123', '1234', '12345', '123456', 'xyz', 'xxx', 'aaa', 'hello', 'hi', 'hey', 'none', 'n/a', 'na', 'null', 'undefined', 'lorem ipsum']);

const tokens = (message: string): string[] => message.trim().split(/\s+/).filter(Boolean);

/** A long run of letters+digits with no word structure. URLs and emails are not random. */
export function hasRandomToken(message: string): boolean {
  for (const t of tokens(message)) {
    if (URL_OR_EMAIL.test(t)) continue;
    if (RANDOM_TOKEN.test(t) || RANDOM_TOKEN_LONG.test(t)) return true;
  }
  return false;
}
/** Only digits and phone punctuation, at least six digits. */
export function isNumericOnly(message: string): boolean {
  const m = message.trim();
  return /^[\d\s()+\-.]+$/.test(m) && (m.match(/\d/g) || []).length >= 6;
}
/** Keyboard walks, placeholders and the like. */
export function isTestString(message: string): boolean {
  const m = message.trim().toLowerCase().replace(/[.!?]+$/, '');
  if (!m) return false;
  if (TEST_STRINGS.has(m)) return true;
  if (/^(.)\1{2,}$/.test(m)) return true;
  return /^(asdf|qwer|zxcv|1234|abcd)+$/.test(m);
}
function wordStats(message: string) {
  const ts = tokens(message);
  const words = ts.filter((t) => WORD.test(t));
  return { chars: message.trim().length, tokens: ts.length, words: words.length };
}
/** At least a couple of real sentences' worth of word-like text. Any language with letters. */
export function isMeaningful(message: string): boolean {
  const s = wordStats(message);
  return s.chars >= 40 && s.words >= 6 && s.words / Math.max(1, s.tokens) >= 0.6;
}
function countContextTerms(message: string, terms: readonly string[]): number {
  const text = ` ${message.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ')} `;
  let n = 0;
  for (const term of terms) if (text.includes(` ${term} `)) n += 1;
  return n;
}

export function classifyLead(input: ClassifyInput, config: ClassifyConfig = {}): LeadClassification {
  const highIntent = config.highIntentEnquiries ?? [];
  const contextTerms = config.contextTerms ?? [];
  const message = input.message ?? '';
  const reasons: string[] = [];
  const signals: LeadSignal[] = [];
  let score = 0;
  let strongSuspicion = false;
  const add = (points: number, reason: string) => { score += points; reasons.push(reason); signals.push({ points, reason }); };

  if (input.honeypot) { add(-3, 'Hidden anti-spam field was filled'); strongSuspicion = true; }
  let garbage = false; // random or numeric: the enquiry context cannot be real alongside it
  if (hasRandomToken(message)) { add(-3, 'Random alphanumeric message'); strongSuspicion = true; garbage = true; }
  else if (isNumericOnly(message)) { add(-2, 'Message is only a number'); strongSuspicion = true; garbage = true; }
  else if (isTestString(message)) { add(-2, 'Placeholder or test message'); strongSuspicion = true; }
  else if (wordStats(message).chars > 0 && wordStats(message).chars < 4) { add(-1, 'Extremely short message'); }
  if (garbage && (input.enquiry ?? '').trim()) add(-2, 'Message does not match the enquiry');

  const meaningful = isMeaningful(message);
  if (meaningful) add(2, 'Detailed message');
  if (((input.phone ?? '').match(/\d/g) || []).length >= 7) add(1, 'Phone provided');
  if (!strongSuspicion) {
    const enquiry = (input.enquiry ?? '').trim();
    if (enquiry && highIntent.includes(enquiry)) add(1, `${enquiry} enquiry`);
    const board = (input.board ?? '').trim();
    if (board && board !== 'Other') add(1, `Known board ${board}`);
    const path = input.conversionPath || input.landingPath || '';
    if (config.relevantPath && config.relevantPath.test(path)) add(1, 'Submitted from a relevant page');
    if (countContextTerms(message, contextTerms) >= 2) add(1, 'Project details in message');
    for (const extra of config.extraContext ?? []) add(1, extra);
  }
  const substance = meaningful || reasons.includes('Project details in message');

  let level: LeadLevel = 'NORMAL';
  if (score <= -3) level = 'POSSIBLE_SPAM';
  // HIGH needs the message itself to say something, not just form metadata around a one-liner.
  else if (score >= 3 && substance && !strongSuspicion && !reasons.includes('Extremely short message')) level = 'HIGH';
  // A filled hidden field was always marked "[Possible spam]" before this classifier existed;
  // that marking is kept whatever the message says. The visitor still gets a normal response.
  if (input.honeypot) level = 'POSSIBLE_SPAM';
  return { level, score, reasons, signals };
}

/** Subject prefix for the owner's notification; NORMAL has none. */
export function subjectPrefix(level: LeadLevel): string {
  if (level === 'HIGH') return '🔥 HIGH — ';
  if (level === 'POSSIBLE_SPAM') return '⚠️ POSSIBLE SPAM — ';
  return '';
}
/** Lines for the notification body: level plus at most three reasons of the relevant sign. */
export function classificationLines(result: LeadClassification, max = 3): string[] {
  const picked = result.level === 'POSSIBLE_SPAM' ? result.signals.filter((s) => s.points < 0)
    : result.level === 'HIGH' ? result.signals.filter((s) => s.points > 0) : result.signals;
  const reasons = picked.map((s) => s.reason).slice(0, max);
  return [`Lead Classification: ${result.level}`, ...(reasons.length ? ['Reasons:', ...reasons.map((r) => `- ${r}`)] : [])];
}

/* ---- Peregrine IT project enquiries (components/LeadForms.tsx → /api/lead) ---- */
export const PEREGRINE_CONTEXT_TERMS: readonly string[] = [
  'website', 'site', 'app', 'application', 'platform', 'product', 'mobile', 'api', 'saas', 'mvp', 'portal', 'dashboard', 'ecommerce', 'shopify', 'wordpress', 'laravel', 'django', 'react', 'next', 'nextjs', 'node',
  'migrate', 'migration', 'rebuild', 'redesign', 'existing', 'integration', 'integrate', 'automation', 'infrastructure', 'performance',
  'budget', 'timeline', 'launch', 'deadline', 'team', 'agents', 'brokerage', 'mls', 'idx', 'crm', 'quote', 'estimate', 'proposal',
];
export const PEREGRINE_RELEVANT_PATH = /\/(services|case-studies|industries|guides|solutions)(\/|\?|$)/i;

export type PeregrineLeadFields = { message: string; form?: string; projectType?: string; timeline?: string; service?: string; pageUrl?: string; spamSuspected?: boolean };
export function classifyPeregrineLead(f: PeregrineLeadFields): LeadClassification {
  const extraContext: string[] = [];
  if (f.form === 'strategy-call') extraContext.push('Asked for a strategy call');
  const timeline = (f.timeline ?? '').trim().toLowerCase();
  if (timeline === 'asap' || timeline === '1-2-months') extraContext.push(`Timeline ${timeline}`);
  let path = '';
  try { path = f.pageUrl ? new URL(f.pageUrl, 'https://peregrine-it.com').pathname : ''; } catch { path = ''; }
  if (!path && f.service) path = `/services/${f.service.replace(/^service:/, '')}`;
  const projectType = (f.projectType ?? '').trim();
  return classifyLead(
    { message: f.message, enquiry: projectType === 'other' ? '' : projectType, conversionPath: path, honeypot: f.spamSuspected },
    { highIntentEnquiries: ['new-build', 'integration', 'performance'], contextTerms: PEREGRINE_CONTEXT_TERMS, relevantPath: PEREGRINE_RELEVANT_PATH, extraContext },
  );
}
