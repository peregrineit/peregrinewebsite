// Unit tests for the pure consent rules in src/lib/consent.ts (Basic Consent Mode).
// Usage: node --experimental-strip-types scripts/test_consent.mjs
import { expireCookieStrings, gaCookieNames, parseConsent, shouldLoadGa } from '../src/lib/consent.ts';

let passed = 0;
const fails = [];
const check = (name, cond, detail = '') => { if (cond) passed++; else fails.push(`${name} ${detail}`); };
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// parseConsent: only the two exact values count.
check('granted', parseConsent('granted') === 'granted');
check('denied', parseConsent('denied') === 'denied');
for (const v of [null, undefined, '', 'GRANTED', 'true', 'yes', 1, {}]) check(`no choice: ${JSON.stringify(v)}`, parseConsent(v) === null);

// shouldLoadGa: needs both an ID and an explicit grant.
const ID = 'G-TEST123456';
check('loads with ID and granted', shouldLoadGa(ID, 'granted') === true);
check('not before a choice', shouldLoadGa(ID, null) === false);
check('not after decline', shouldLoadGa(ID, 'denied') === false);
check('not without an ID', shouldLoadGa(undefined, 'granted') === false);
check('not with an empty ID', shouldLoadGa('', 'granted') === false);

// gaCookieNames: GA4 cookies only.
check('finds GA cookies', eq(gaCookieNames('_ga=GA1.1.1; _ga_WE6C60LG08=GS1; _gid=GA1; _gat_UA1=1'), ['_ga', '_ga_WE6C60LG08', '_gid', '_gat_UA1']));
check('ignores other cookies', eq(gaCookieNames('session=abc; _gallery=1; pit_x=2; _gac=1'), []));
check('empty header', eq(gaCookieNames(''), []));

// expireCookieStrings: host and every parent domain.
const strings = expireCookieStrings('_ga', 'www.peregrine-it.com');
check('host cookie', strings.includes('_ga=; Max-Age=0; Path=/'));
check('subdomain', strings.includes('_ga=; Max-Age=0; Path=/; Domain=.www.peregrine-it.com'));
check('registrable domain', strings.includes('_ga=; Max-Age=0; Path=/; Domain=.peregrine-it.com'));
check('never the bare TLD', !strings.some((s) => s.endsWith('Domain=.com')));
check('localhost', eq(expireCookieStrings('_ga', 'localhost'), ['_ga=; Max-Age=0; Path=/']));

console.log(`consent unit tests: ${passed} passed${fails.length ? `, ${fails.length} failed` : ''}`);
for (const f of fails) console.log('  FAIL', f);
process.exit(fails.length ? 1 : 0);
