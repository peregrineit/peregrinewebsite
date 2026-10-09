// Unit tests for the cost calculator's fee arithmetic (src/data/mls-fees.ts).
// Run: node --experimental-strip-types scripts/test_mls_fees.mjs
// Each expectation restates the fee's own `published` text, so a change to a formula
// that no longer matches the published wording fails here.
import assert from 'node:assert/strict';
import { dataVendors, hourlyBands, idxPlugins, mlsLicenses } from '../src/data/mls-fees.ts';

const all = [...idxPlugins, ...mlsLicenses.flatMap((b) => b.options), ...dataVendors];
const fee = (id, n = 1) => {
  const option = all.find((o) => o.id === id);
  assert.ok(option, `unknown option ${id}`);
  return option.fee(n);
};
let passed = 0;
const eq = (actual, expected, name) => { assert.deepEqual(actual, expected, name); passed++; };

// Stellar broker: $450 per office per year, capped at $7,500
eq(fee('stellar-broker', 1).yearly, [450, 450], 'stellar broker 1 office');
eq(fee('stellar-broker', 16).yearly, [7200, 7200], 'stellar broker 16 offices');
eq(fee('stellar-broker', 17).yearly, [7500, 7500], 'stellar broker cap reached at 17 offices');
eq(fee('stellar-broker', 200).yearly, [7500, 7500], 'stellar broker cap holds');
// Stellar vendor: $7,500 per product per year, $2,500 each additional product
eq(fee('stellar-vendor', 1).yearly, [7500, 7500], 'stellar vendor 1 product');
eq(fee('stellar-vendor', 3).yearly, [12500, 12500], 'stellar vendor 3 products');
// ARMLS broker: five free feeds, then $150 per month each
eq(fee('armls-broker', 5).monthly, [0, 0], 'armls 5 feeds free');
eq(fee('armls-broker', 6).monthly, [150, 150], 'armls 6th feed');
eq(fee('armls-broker', 8).monthly, [450, 450], 'armls 8 feeds');
// ARMLS vendor: $1,000 to $1,500 per product per month
eq(fee('armls-vendor', 2).monthly, [2000, 3000], 'armls vendor 2 products');
// REcolorado
eq(fee('reco-idx'), { monthly: [150, 150], oneTime: [500, 500] }, 'recolorado idx');
eq(fee('reco-vow'), { monthly: [500, 500], oneTime: [1500, 1500] }, 'recolorado vow');
// MLS PIN
eq(fee('mlspin-broker').monthly, [100, 100], 'mls pin broker');
eq(fee('mlspin-vendor').monthly, [525, 525], 'mls pin vendor');
// CREA: CAD onboarding, never mixed into USD totals
eq(fee('crea-tech'), { oneTime: [1500, 1500], currency: 'CAD' }, 'crea onboarding in CAD');
// Trestle
eq(fee('trestle-broker', 3).monthly, [90, 90], 'trestle broker 3 feeds');
eq(fee('trestle-other', 2).monthly, [200, 200], 'trestle other 2 feeds');
eq(fee('trestle-tech', 2).monthly, [200, 350], 'trestle technology provider 2 connections');
// MLS Grid adds nothing of its own
eq(fee('mlsgrid'), {}, 'mls grid no added fee');
// SimplyRETS: one connection, one-time $99; count must not scale it
eq(fee('simplyrets-basic', 4), { monthly: [49, 49], oneTime: [99, 99] }, 'simplyrets basic');
eq(fee('simplyrets-enterprise'), { monthly: [199, 199], oneTime: [99, 99] }, 'simplyrets enterprise');
// Repliers
eq([fee('repliers-1').monthly[0], fee('repliers-2').monthly[0], fee('repliers-3').monthly[0]], [199, 299, 399], 'repliers plans');
// IDX plugins: starting prices only, no pass-through added
eq(fee('showcase-1').monthly, [94.95, 94.95], 'showcase lower plan is the starting price');
eq(fee('showcase-2').monthly, [124.95, 124.95], 'showcase higher plan is the starting price');
eq(fee('realtyna'), { monthly: [99, 99], oneTime: [850, 850] }, 'realtyna');
eq([fee('idxb-core').monthly[0], fee('idxb-engage').monthly[0], fee('idxb-elite').monthly[0]], [60, 99, 149], 'idx broker plans');
eq([fee('buddy-1').monthly[0], fee('buddy-2').monthly[0]], [49, 77], 'buying buddy plans');
// Clutch bands
eq(hourlyBands.map((b) => b.rate), [[25, 49], [50, 99], [100, 149]], 'clutch hourly bands');
// Every option names a source and its published wording; ids are unique
for (const o of all) { assert.match(o.source, /^https:\/\//, `${o.id} source`); assert.ok(o.published.length > 5, `${o.id} published`); passed++; }
eq(new Set(all.map((o) => o.id)).size, all.length, 'option ids are unique');

console.log(`mls-fees unit tests: ${passed} passed`);
