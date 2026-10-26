// Unit tests for the non-blocking lead classifier (src/lib/lead-classifier.ts).
// Run: node --experimental-strip-types scripts/test_lead_classifier.mjs
import assert from 'node:assert/strict';
import { classifyLead, classifyPeregrineLead, classificationLines, hasRandomToken, isMeaningful, subjectPrefix } from '../src/lib/lead-classifier.ts';

let passed = 0;
const eq = (actual, expected, name) => { assert.deepEqual(actual, expected, name); passed++; };
const level = (f) => classifyPeregrineLead({ form: 'quick-project', ...f }).level;

// Owner fixtures
eq(level({ message: 'We have an existing Laravel application and need a team to migrate the frontend to Next.js. Budget is around $15k and we want to start next month.', projectType: 'new-build' }), 'HIGH', 'detailed project message is HIGH');
eq(level({ message: 'Need a website. Please contact me.' }), 'NORMAL', 'short genuine request is NORMAL');
eq(level({ message: 'A8hf7KkK92mQpP0xLz91BB7w' }), 'POSSIBLE_SPAM', 'random token is POSSIBLE SPAM');
eq(level({ message: 'A8hf7KkK92mQpP0xLz91BB7w', projectType: 'new-build' }), 'POSSIBLE_SPAM', 'random token with a project type is still POSSIBLE SPAM');
eq(level({ message: '6632571870', projectType: 'integration' }), 'POSSIBLE_SPAM', 'number-only message with a project type crosses the threshold');
eq(level({ message: '6632571870' }), 'NORMAL', 'number-only message with no other context stays NORMAL (uncertain → NORMAL)');
eq(level({ message: 'test' }), 'NORMAL', 'a lone placeholder is NORMAL, not spam');
eq(level({ message: 'Please call me.' }), 'NORMAL', 'please call me is NORMAL');
eq(level({ message: 'Integration test message.', form: 'strategy-call', projectType: 'new-build', timeline: 'asap', service: 'service:saas-development', pageUrl: 'http://localhost/services/saas-development' }), 'NORMAL', 'form metadata around a one-line message is NORMAL, not HIGH');

// Name and email are never consulted: the classifier does not even take them.
const strange = classifyPeregrineLead({ message: 'We run a 15-agent brokerage and need a new website with MLS integration, launch before spring. Budget is flexible.', projectType: 'new-build', form: 'strategy-call' });
eq(strange.level, 'HIGH', 'excellent message is HIGH regardless of who sent it');
eq(classifyLead({ message: 'Hello, we need an IDX website with MLS listings for our brokerage team of eight agents.', phone: '4165550100' }).level, 'HIGH', 'free-mail users with real details are HIGH');

// Non-English text is not penalised.
eq(classifyLead({ message: 'Nous sommes une agence immobilière à Montréal et nous voulons refaire notre site web avec intégration Centris.' }).level, 'NORMAL', 'French prose is at least NORMAL');
assert.notEqual(classifyLead({ message: 'Necesitamos una aplicación para nuestra inmobiliaria con integración MLS y presupuesto aprobado.' }).level, 'POSSIBLE_SPAM'); passed++;

// Honeypot: a strong suspicious signal, folded into the same subject prefix.
eq(level({ message: 'We need a new website for our clinic, three locations, launch in spring.', spamSuspected: true }), 'POSSIBLE_SPAM', 'a filled anti-spam field reads as POSSIBLE SPAM');
eq(level({ message: 'test', projectType: 'new-build' }), 'NORMAL', 'a placeholder message with a project type is uncertain, so NORMAL');

// Helpers
eq(hasRandomToken('https://www.example.com/path and our email info@example.com'), false, 'URLs and emails are not random tokens');
eq(hasRandomToken('JkKrIx7Bwvj6jhGQvkJmMdURuT0yPNtGrc4MDofY7TOYDlCiIHa8vAV'), true, 'real fixture is a random token');
eq(isMeaningful('Need a website. Please contact me.'), false, 'under 40 chars is not "detailed"');
eq(subjectPrefix('HIGH'), '🔥 HIGH — ', 'HIGH prefix'); eq(subjectPrefix('NORMAL'), '', 'NORMAL has no prefix'); eq(subjectPrefix('POSSIBLE_SPAM'), '⚠️ POSSIBLE SPAM — ', 'spam prefix');
const lines = classificationLines(classifyPeregrineLead({ message: 'A8hf7KkK92mQpP0xLz91BB7w', projectType: 'new-build', form: 'quick-project' }));
eq(lines, ['Lead Classification: POSSIBLE_SPAM', 'Reasons:', '- Random alphanumeric message', '- Message does not match the enquiry'], 'note lists only the suspicious signals, max three');

console.log(`lead-classifier: ${passed} assertions passed`);
