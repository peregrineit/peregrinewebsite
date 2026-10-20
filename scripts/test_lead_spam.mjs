// Unit tests for spam scoring (src/lib/lead-spam.ts) and the page-URL cleaning in
// src/lib/attribution.ts. Usage: node --experimental-strip-types scripts/test_lead_spam.mjs
import { DEFAULT_SPAM_CONFIG, FORM_FIELD_PARAMS as SPAM_PARAMS, isRandomCaseToken, scoreLead, spamConfigFromEnv } from '../src/lib/lead-spam.ts';
import { FORM_FIELD_PARAMS as ATTR_PARAMS, cleanPageUrl, withoutFormParams } from '../src/lib/attribution.ts';

let passed = 0;
const fails = [];
const check = (name, cond, detail = '') => { if (cond) passed++; else fails.push(`${name} ${detail}`); };
const base = { name: 'Test Person', email: 'lead@example.com', company: '', message: 'We need an MLS integration for our site.', pageUrl: 'https://peregrine-it.com/contact', honeypot: false, elapsedMs: 45000 };
const score = (over) => scoreLead({ ...base, ...over });

// The submission reported on 2026-10-20 (reference c05bc740).
const c05 = score({
  name: 'Yeoaihd Pylxdnmo', email: 'levin.2101@buckeyemail.osu.edu', message: 'evNIOhEFuplOwQcdVjWg',
  pageUrl: 'https://peregrine-it.com/contact?scName=Tedc+Pzktxzu&scCompany=Bvbhwg+LLC&scMessage=3875958733&pit_confirm_field=',
});
check('c05bc740 is quarantined', c05.quarantine, JSON.stringify(c05));
check('c05bc740 reasons name the patterns', c05.reasons.includes('random mixed-case text') && c05.reasons.includes('form fields in page URL'), JSON.stringify(c05.reasons));
check('c05bc740 without the URL evidence is still quarantined (message alone)', score({ name: 'Yeoaihd Pylxdnmo', email: 'levin.2101@buckeyemail.osu.edu', message: 'evNIOhEFuplOwQcdVjWg' }).quarantine);

// Real people must pass: international names, university and free-mail addresses, short meaningful requests.
const people = [
  { name: 'Nguyễn Thị Minh Khai', email: 'minh@hcmut.edu.vn', message: 'Need help with a Shopify app.' },
  { name: '张伟', email: 'zhang.wei@tsinghua.edu.cn', message: 'IDX feed for 3 MLS boards' },
  { name: 'Siobhán Ó Dálaigh', email: 'siobhan@gmail.com', message: 'Quote for an investor portal please' },
  { name: 'DeShawn McDonald', email: 'deshawn.mcdonald@osu.edu', message: 'Fix our Next.js deployment' },
  { name: 'Xi', email: 'x@y.co', message: 'Odoo + Shopify sync' },
  { name: 'Jean-Luc Picard', email: 'jl@starfleet.example', message: 'RESO Web API migration from RETS, about 40k listings.' },
  { name: 'Priya Raghunathan', email: 'priya@company.in', message: 'SaaS MVP built in Lovable needs production help' },
  { name: 'Ana', email: 'ana@uni.br', message: 'Necesito integrar MLS con mi sitio web.' },
];
for (const p of people) {
  const r = score(p);
  check(`legitimate: ${p.name} is not quarantined`, !r.quarantine && r.score === 0, JSON.stringify(r));
}
check('a CamelCase product name in a message is fine', !score({ message: 'We use HubSpot, QuickBooks and ServiceTitan today.' }).quarantine);
check('a URL or two is fine', !score({ message: 'See https://example.com and https://example.org for context.' }).quarantine);

// Individual signals.
check('honeypot alone quarantines', score({ honeypot: true }).quarantine && score({ honeypot: true }).reasons[0] === 'hidden field filled');
check('verification unavailable alone quarantines (lead kept, marked)', score({ verificationUnavailable: true }).quarantine);
check('three links add points but do not quarantine alone', (() => { const r = score({ message: 'http://a.example http://b.example http://c.example' }); return r.score === 3 && !r.quarantine; })());
check('digits-only message', score({ message: '3875958733123' }).reasons.includes('message is only digits'));
check('no-space message', score({ message: 'abcdefghijklmnop' }).reasons.includes('message has no spaces'));
check('too fast', score({ elapsedMs: 900 }).reasons.some((r) => r.startsWith('form completed in under')));
check('elapsed unknown is not a signal', score({ elapsedMs: null }).score === 0 && score({ elapsedMs: -1 }).score === 0);
check('form fields in URL alone do not quarantine', (() => { const r = score({ pageUrl: 'https://peregrine-it.com/?qpName=x' }); return r.score === 3 && !r.quarantine; })());
check('fast + fields in URL quarantine', score({ elapsedMs: 500, pageUrl: 'https://peregrine-it.com/?scName=x' }).quarantine);

// Token detector.
check('random case token detected', isRandomCaseToken('evNIOhEFuplOwQcdVjWg') && isRandomCaseToken('aBcDeFgHiJkLmN'));
check('normal words not detected', !isRandomCaseToken('McDonald') && !isRandomCaseToken('MacKenzieSmith') && !isRandomCaseToken('internationalization') && !isRandomCaseToken('JavaScriptTypeScript') && !isRandomCaseToken('QuickBooksOnlineAdvanced'));

// Configuration.
const cfg = spamConfigFromEnv({ LEAD_SPAM_THRESHOLD: '20', LEAD_SPAM_WEIGHTS: '{"honeypot": 1, "bogus": 99}', LEAD_SPAM_MIN_ELAPSED_MS: '1000' });
check('threshold from env', cfg.threshold === 20);
check('weights from env, unknown keys ignored', cfg.weights.honeypot === 1 && !('bogus' in cfg.weights) && cfg.weights.randomCaseToken === DEFAULT_SPAM_CONFIG.weights.randomCaseToken);
check('min elapsed from env', cfg.minElapsedMs === 1000);
check('malformed weights fall back to defaults', JSON.stringify(spamConfigFromEnv({ LEAD_SPAM_WEIGHTS: '{not json' }).weights) === JSON.stringify(DEFAULT_SPAM_CONFIG.weights));
check('configurable threshold changes the verdict', !scoreLead({ ...base, honeypot: true }, cfg).quarantine);

// Page URL cleaning (attribution.ts).
check('field lists agree between lead-spam.ts and attribution.ts', JSON.stringify(SPAM_PARAMS) === JSON.stringify(ATTR_PARAMS));
check('cleanPageUrl keeps origin, path and utm_*',
  cleanPageUrl('https://peregrine-it.com/contact?scName=Tedc+P&utm_source=g&gclid=abc&utm_medium=cpc#x') === 'https://peregrine-it.com/contact?utm_source=g&utm_medium=cpc',
  cleanPageUrl('https://peregrine-it.com/contact?scName=Tedc+P&utm_source=g&gclid=abc&utm_medium=cpc#x'));
check('cleanPageUrl without parameters', cleanPageUrl('https://peregrine-it.com/services') === 'https://peregrine-it.com/services');
check('cleanPageUrl of garbage is empty', cleanPageUrl('not a url') === '');
check('withoutFormParams removes only form fields', withoutFormParams('https://peregrine-it.com/c?scName=a&scMessage=b&utm_source=x&pit_confirm_field=') === 'https://peregrine-it.com/c?utm_source=x');
check('withoutFormParams is null when there is nothing to remove', withoutFormParams('https://peregrine-it.com/c?utm_source=x') === null);

console.log(`lead spam unit tests: ${passed} passed${fails.length ? `, ${fails.length} failed` : ''}`);
for (const f of fails) console.log('  FAIL', f);
process.exit(fails.length ? 1 : 0);
