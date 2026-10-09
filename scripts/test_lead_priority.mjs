// Unit tests for the lead priority rules (src/lib/lead-priority.ts).
// Run: node --experimental-strip-types scripts/test_lead_priority.mjs
// The rules are restated here on purpose: a change to the scoring has to be made twice,
// and in docs/growth/lead/ARCHITECTURE.md.
import assert from 'node:assert/strict';
import { FREE_MAIL_DOMAINS, HIGH_AT, LOW_AT, emailDomain, leadPriority, priorityLine } from '../src/lib/lead-priority.ts';

let passed = 0;
const eq = (actual, expected, name) => { assert.deepEqual(actual, expected, name); passed++; };
const long = (n) => 'x'.repeat(n);
// A neutral lead: every rule scores 0 except the ones a test changes.
const base = { email: 'a@gmail.com', message: long(60), timeline: '2-6-months', company: '', form: 'quick-project', service: '' };
const score = (over) => leadPriority({ ...base, ...over }).score;

eq(leadPriority(base), { priority: 'low', score: 0, reasons: ['timeline 2-6 months 0', 'free-mail address 0'] }, 'neutral lead scores 0, which is low');
eq([HIGH_AT, LOW_AT], [5, 0], 'thresholds');

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
eq(leadPriority({ ...base, timeline: 'exploring', message: 'short one' }).score, -2, 'minimum is -2');
eq(leadPriority({ ...base, timeline: 'exploring', message: 'short one' }).priority, 'low', 'minimum is low');

// anti-spam field
const spam = leadPriority({ ...best, spamSuspected: true });
eq([spam.priority, spam.score, spam.reasons[0]], ['low', 8, 'anti-spam field was filled'], 'filled anti-spam field is low whatever the score');

// determinism and wording
eq(leadPriority(best), leadPriority({ ...best }), 'same input, same result');
eq(priorityLine(leadPriority({ ...base, timeline: 'asap', company: 'Acme' })), 'Normal (timeline ASAP +2; company given +1; free-mail address 0)', 'email line');
eq(leadPriority({ email: 'a@acme.com', message: long(60) }).reasons, ['no timeline 0', 'business email domain +1'], 'optional fields may be absent');

console.log(`lead priority unit tests: ${passed} passed`);
