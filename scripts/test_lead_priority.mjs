// Unit tests for the lead priority rules (src/lib/lead-priority.ts).
// Run: node --experimental-strip-types scripts/test_lead_priority.mjs
// The rules are restated here on purpose: a change to the scoring has to be made twice,
// and in docs/growth/lead/ARCHITECTURE.md.
import assert from 'node:assert/strict';
import { DISPOSABLE_MAIL_DOMAINS, FREE_MAIL_DOMAINS, HIGH_AT, LOW_AT, emailDomain, leadPriority, priorityLine } from '../src/lib/lead-priority.ts';

let passed = 0;
const eq = (actual, expected, name) => { assert.deepEqual(actual, expected, name); passed++; };
const long = (n) => 'x'.repeat(n);
// A neutral lead: every rule scores 0 except the ones a test changes.
const base = { email: 'a@gmail.com', message: long(60), timeline: '2-6-months', company: '', form: 'quick-project', service: '' };
const score = (over) => leadPriority({ ...base, ...over }).score;

eq(leadPriority(base), { priority: 'normal', score: 0, reasons: ['timeline 2-6 months 0', 'free-mail address 0'] }, 'neutral lead scores 0, which is normal');
eq([HIGH_AT, LOW_AT], [5, -1], 'thresholds: 5 or more is high, -1 or less is low');

// The four cases from the review of the first version (2026-10-10).
// 1. A neutral lead must not be low.
eq(leadPriority({ email: 'someone@gmail.com', timeline: '2-6-months', message: long(100), form: 'quick-project' }).priority, 'normal', 'review 1: gmail + 2-6 months + 100 characters is normal');
// 2. A quick-project lead (no company field, no service, short need) must be able to be normal.
eq(leadPriority({ email: 'someone@gmail.com', timeline: '1-2-months', message: long(45), form: 'quick-project' }).priority, 'normal', 'review 2: an ordinary quick-project lead is normal');
eq(leadPriority({ email: 'someone@gmail.com', timeline: '2-6-months', message: long(45), form: 'quick-project' }).priority, 'normal', 'review 2: also with the slowest real timeline');
// 3. A throwaway address must never be high, whatever else is claimed.
eq(leadPriority({ email: 'a@mailinator.com', timeline: 'asap', company: 'Any Company', message: long(60), form: 'quick-project' }).priority, 'normal', 'review 3: mailinator + asap + company is not high');
eq(leadPriority({ ...{ email: 'a@mailinator.com', message: long(500), timeline: 'asap', company: 'Acme', form: 'strategy-call', service: 'service:x' } }).priority, 'normal', 'review 3: not even with every other signal at its maximum');
// 4. A free-mail address alone never makes a lead low.
for (const domain of FREE_MAIL_DOMAINS)
  assert.notEqual(leadPriority({ ...base, email: `x@${domain}` }).priority, 'low', `review 4: ${domain} alone is not low`);
passed++;
eq(leadPriority({ ...base, email: 'x@gmail.com' }).score - leadPriority({ ...base, email: 'x@acme.com' }).score, -1, 'review 4: free-mail costs the +1 a business domain earns, nothing more');
// Low takes a negative signal.
eq(leadPriority({ ...base, timeline: 'exploring' }).priority, 'low', 'just exploring, with nothing in its favour, is low');
eq(leadPriority({ ...base, message: long(20) }).priority, 'low', 'a near-empty message, with nothing in its favour, is low');
eq(leadPriority({ ...base, timeline: 'exploring', company: 'Acme' }).priority, 'normal', 'one positive signal offsets one negative');
// disposable addresses
eq(score({ email: 'x@mailinator.com' }), -3, 'disposable domain -3');
eq(score({ email: 'x@YOPMAIL.com' }), -3, 'disposable list is case-insensitive');
eq(leadPriority({ ...base, email: 'x@guerrillamail.com' }).reasons[1], 'email domain is on the throwaway-mailbox list -3', 'disposable reason is named');
eq([...DISPOSABLE_MAIL_DOMAINS].filter((d) => FREE_MAIL_DOMAINS.has(d)), [], 'no domain is on both lists');

// timeline
eq(score({ timeline: 'asap' }), 2, 'asap +2');
eq(score({ timeline: '1-2-months' }), 1, '1-2 months +1');
eq(score({ timeline: 'exploring' }), -1, 'exploring -1');
eq(score({ timeline: '' }), 0, 'no timeline 0');
eq(score({ timeline: ' ASAP ' }), 2, 'timeline is trimmed and case-insensitive');
eq(score({ timeline: 'next year maybe' }), 0, 'unknown timeline 0');
// company
eq(score({ company: 'Acme' }), 1, 'company +1');
eq(score({ company: '   ' }), 0, 'blank company 0');
// email domain
eq(score({ email: 'cto@acme-logistics.com' }), 1, 'business domain +1');
eq(score({ email: 'Someone@GMAIL.com' }), 0, 'free-mail is case-insensitive');
eq(score({ email: 'x@outlook.com' }), 0, 'outlook is free-mail');
eq(emailDomain('a@b@Corp.Example '), 'corp.example', 'domain is what follows the last @');
eq(FREE_MAIL_DOMAINS.has('peregrine-it.com'), false, 'own domain is not free-mail');
// message length
eq(score({ message: long(400) }), 2, '400+ characters +2');
eq(score({ message: long(399) }), 1, '120-399 +1');
eq(score({ message: long(120) }), 1, '120 +1');
eq(score({ message: long(119) }), 0, '30-119 0');
eq(score({ message: long(30) }), 0, '30 0');
eq(score({ message: long(29) }), -1, 'under 30 -1');
eq(score({ message: 'Strategy call request' }), -1, "the form's default message counts as no message");
eq(score({ message: `  ${long(10)}  ` }), -1, 'whitespace does not count');
// form and service
eq(score({ form: 'strategy-call' }), 1, 'strategy-call +1');
eq(score({ service: 'service:saas-development' }), 1, 'service page +1');

// bands
const best = { email: 'cto@acme.com', message: long(500), timeline: 'asap', company: 'Acme', form: 'strategy-call', service: 'service:x' };
eq(leadPriority(best).score, 8, 'maximum is 8');
eq(leadPriority(best).priority, 'high', 'maximum is high');
eq(leadPriority({ ...base, timeline: 'asap', company: 'Acme', email: 'a@acme.com', form: 'strategy-call' }).priority, 'high', 'score 5 is high');
eq(leadPriority({ ...base, timeline: 'asap', company: 'Acme', email: 'a@acme.com' }).priority, 'normal', 'score 4 is normal');
eq(leadPriority({ ...base, company: 'Acme' }).priority, 'normal', 'score 1 is normal');
eq(leadPriority(base).priority, 'normal', 'score 0 is normal');
eq(leadPriority({ ...base, timeline: 'exploring' }).score, -1, 'score -1 ...');
eq(leadPriority({ ...base, timeline: 'exploring' }).priority, 'low', '... is low');
eq(leadPriority({ ...base, timeline: 'exploring', message: 'short one' }).score, -2, 'minimum without a disposable address is -2');
eq(leadPriority({ ...base, timeline: 'exploring', message: 'short one', email: 'x@mailinator.com' }).score, -5, 'minimum is -5');
eq(leadPriority({ ...base, timeline: 'exploring', message: 'short one' }).priority, 'low', 'minimum is low');

// anti-spam field
const spam = leadPriority({ ...best, spamSuspected: true });
eq([spam.priority, spam.score, spam.reasons[0]], ['low', 8, 'anti-spam field was filled'], 'filled anti-spam field is low whatever the score');

// determinism and wording
eq(leadPriority(best), leadPriority({ ...best }), 'same input, same result');
eq(priorityLine(leadPriority({ ...base, timeline: 'asap', company: 'Acme' })), 'Normal (timeline ASAP +2; company given +1; free-mail address 0). Sorting hint from the form fields only; nothing about the sender is verified.', 'email line carries the not-verified note');
eq(leadPriority({ email: 'a@acme.com', message: long(60) }).reasons, ['no timeline 0', 'email domain is not a free-mail provider +1'], 'optional fields may be absent');

console.log(`lead priority unit tests: ${passed} passed`);
