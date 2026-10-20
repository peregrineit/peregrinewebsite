// Spam scoring for /api/lead. Pure and dependency-free so it can be unit-tested with
// `node --experimental-strip-types scripts/test_lead_spam.mjs`.
//
// A score is a sorting aid, not a verdict on a person. A lead at or above the quarantine
// threshold is still delivered to the inbox, marked "[Possible spam]", and receives no
// acknowledgement email (an acknowledgement goes to an address the submitter chose, which a
// bot can aim at a third party). Nothing here rejects a lead.
//
// What is deliberately NOT a signal: the script or alphabet of a name, a short name, a
// university or free-mail address, a short message that reads as words, a country.
// Signals look only at patterns that real people almost never type: a single long token of
// randomly mixed upper and lower case ("evNIOhEFuplOwQcdVjWg"), a message with no spaces
// that is only digits or random letters, many links, form fields echoed in the page URL
// (a native form submission before the page's script ran, typical of form-filling bots),
// and a form completed faster than a person can type.

export type SpamInput = {
  name: string;
  email: string;
  company?: string;
  message: string;
  pageUrl?: string;
  /** The hidden field had a value (or a non-string value). */
  honeypot: boolean;
  /** Milliseconds between the form being shown or first touched and the submit, if the client sent it. */
  elapsedMs?: number | null;
  /** Turnstile was enabled but could not be checked (Cloudflare unreachable). */
  verificationUnavailable?: boolean;
};

export type SpamWeights = {
  honeypot: number;
  randomCaseToken: number;
  noSpaceMessage: number;
  digitsOnlyMessage: number;
  manyLinks: number;
  formFieldsInPageUrl: number;
  tooFast: number;
  verificationUnavailable: number;
};

export type SpamConfig = { threshold: number; weights: SpamWeights; minElapsedMs: number };

export const DEFAULT_SPAM_CONFIG: SpamConfig = {
  threshold: 5,
  minElapsedMs: 3000,
  weights: {
    honeypot: 10,
    randomCaseToken: 4,
    noSpaceMessage: 2,
    digitsOnlyMessage: 3,
    manyLinks: 3,
    formFieldsInPageUrl: 3,
    tooFast: 3,
    verificationUnavailable: 5,
  },
};

/** Field names of the site's forms. Seeing them in a page URL means a native GET submission. */
export const FORM_FIELD_PARAMS = [
  'scName', 'scEmail', 'scCompany', 'scType', 'scTimeline', 'scMessage',
  'qpName', 'qpEmail', 'qpNeed', 'qpTimeline', 'pit_confirm_field',
];

/**
 * True for one word of 12+ letters whose case flips lower-to-upper at least 4 times inside
 * it, e.g. "evNIOhEFuplOwQcdVjWg" (6). Real names with inner capitals ("McDonald",
 * "DeShawn") and joined product names ("JavaScriptTypeScript", "QuickBooksOnlineAdvanced")
 * flip at most 3 times.
 */
export function isRandomCaseToken(word: string): boolean {
  if (word.length < 12 || !/^[A-Za-z]+$/.test(word)) return false;
  let flips = 0;
  for (let i = 1; i < word.length; i++) {
    const prevLower = word[i - 1] >= 'a' && word[i - 1] <= 'z';
    const curUpper = word[i] >= 'A' && word[i] <= 'Z';
    if (prevLower && curUpper) flips++;
  }
  return flips >= 4;
}

function hasRandomCaseToken(text: string | undefined): boolean {
  return (text || '').split(/[\s,.;:!?()"'/-]+/).some(isRandomCaseToken);
}

/** Configuration from environment variables, falling back to the defaults. */
export function spamConfigFromEnv(env: Record<string, string | undefined>): SpamConfig {
  const num = (v: string | undefined, d: number) => {
    const n = Number(v);
    return v !== undefined && v !== '' && Number.isFinite(n) ? n : d;
  };
  let weights = { ...DEFAULT_SPAM_CONFIG.weights };
  if (env.LEAD_SPAM_WEIGHTS) {
    try {
      const parsed = JSON.parse(env.LEAD_SPAM_WEIGHTS) as Record<string, unknown>;
      for (const key of Object.keys(weights) as (keyof SpamWeights)[]) {
        if (typeof parsed[key] === 'number' && Number.isFinite(parsed[key])) weights = { ...weights, [key]: parsed[key] as number };
      }
    } catch {
      // Malformed JSON: keep the defaults rather than fail every lead.
    }
  }
  return {
    threshold: num(env.LEAD_SPAM_THRESHOLD, DEFAULT_SPAM_CONFIG.threshold),
    minElapsedMs: num(env.LEAD_SPAM_MIN_ELAPSED_MS, DEFAULT_SPAM_CONFIG.minElapsedMs),
    weights,
  };
}

export type SpamResult = { score: number; reasons: string[]; quarantine: boolean };

export function scoreLead(input: SpamInput, config: SpamConfig = DEFAULT_SPAM_CONFIG): SpamResult {
  const w = config.weights;
  const reasons: string[] = [];
  let score = 0;
  const add = (points: number, reason: string) => {
    if (points > 0) {
      score += points;
      reasons.push(reason);
    }
  };

  if (input.honeypot) add(w.honeypot, 'hidden field filled');
  if (input.verificationUnavailable) add(w.verificationUnavailable, 'verification unavailable');

  const message = input.message.trim();
  if (hasRandomCaseToken(message) || hasRandomCaseToken(input.name) || hasRandomCaseToken(input.company)) {
    add(w.randomCaseToken, 'random mixed-case text');
  }
  if (message.length >= 12 && !/\s/.test(message)) {
    if (/^\d+$/.test(message)) add(w.digitsOnlyMessage, 'message is only digits');
    else add(w.noSpaceMessage, 'message has no spaces');
  }
  const links = (message.match(/https?:\/\/|www\./gi) || []).length;
  if (links >= 3) add(w.manyLinks, `${links} links in message`);

  if (input.pageUrl) {
    try {
      const params = new URL(input.pageUrl).searchParams;
      if (FORM_FIELD_PARAMS.some((p) => params.has(p))) add(w.formFieldsInPageUrl, 'form fields in page URL');
    } catch {
      // Not a URL: nothing to read.
    }
  }

  if (typeof input.elapsedMs === 'number' && Number.isFinite(input.elapsedMs) && input.elapsedMs >= 0 && input.elapsedMs < config.minElapsedMs) {
    add(w.tooFast, 'form completed in under ' + Math.round(config.minElapsedMs / 1000) + ' s');
  }

  return { score, reasons, quarantine: score >= config.threshold };
}
