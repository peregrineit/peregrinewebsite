// Published MLS, IDX and data-vendor fees used by the cost calculator
// (/tools/mls-idx-cost-calculator). Every figure is the one cited, with the same source,
// in the guide at src/app/blog/mls-idx-integration-cost/page.tsx. Keep the two in step:
// when a fee changes, update both and FEES_CHECKED.
// No Peregrine prices and no estimates of hours: development cost is the visitor's own
// hour estimate multiplied by Clutch's published hourly bands.

export const FEES_CHECKED = '2026-10-09';

/** A cost line. Amounts are USD unless `currency` says otherwise. */
export interface Fee {
  monthly?: [number, number];
  yearly?: [number, number];
  oneTime?: [number, number];
  currency?: 'CAD';
}

export interface FeeOption {
  id: string;
  label: string;
  source: string;
  /** What the published fee says, in words. */
  published: string;
  /** If the fee scales with a count, what is counted. */
  per?: 'office' | 'product' | 'feed' | 'connection';
  fee: (count: number) => Fee;
  note?: string;
}

const flat = (fee: Fee) => () => fee;
const same = (n: number): [number, number] => [n, n];

const IDXB = 'https://www.idxbroker.com/compare-idx';
const SHOWCASE = 'https://showcaseidx.com/pricing/';
const BUDDY = 'https://www.buyingbuddy.com/pricing.php';
const REALTYNA = 'https://realtyna.com/mls-on-the-fly/';
const STELLAR = 'https://www.stellarmls.com/data-delivery';
const ARMLS = 'https://armls.com/data-feeds-vendor-info';
const RECO = 'https://cdn.recolorado.com/files/data/Participant-Pricing-Schedule.pdf';
const MLSPIN = 'https://www.mlspin.com/resources/data-services';
const CREA = 'https://crea.vanillacommunity.com/discussion/73/ddf-r-technology-provider-pricing-tiers';
const TRESTLE = 'https://trestle-documentation.corelogic.com/data-pricing.html';
const MLSGRID = 'https://www.mlsgrid.com/faq';
const SIMPLYRETS = 'https://simplyrets.com/';
const REPLIERS = 'https://repliers.com/plans-and-pricing/';
export const CLUTCH = 'https://clutch.co/developers/pricing';

export const idxPlugins: FeeOption[] = [
  { id: 'idxb-core', label: 'IDX Broker Core', source: IDXB, published: '$60 per month', fee: flat({ monthly: same(60) }), note: 'One-time setup fee applies; the amount is not published.' },
  { id: 'idxb-engage', label: 'IDX Broker Engage', source: IDXB, published: '$99 per month', fee: flat({ monthly: same(99) }), note: 'One-time setup fee applies; the amount is not published.' },
  { id: 'idxb-elite', label: 'IDX Broker Elite', source: IDXB, published: '$149 per month', fee: flat({ monthly: same(149) }), note: 'One-time setup fee applies; the amount is not published.' },
  { id: 'showcase-1', label: 'Showcase IDX (lower plan)', source: SHOWCASE, published: 'From $94.95 per month', fee: flat({ monthly: same(94.95) }), note: 'This is the starting price. Showcase IDX says MLS pass-through fees are typically $0 to $33 per month; they are not included.' },
  { id: 'showcase-2', label: 'Showcase IDX (higher plan)', source: SHOWCASE, published: 'From $124.95 per month', fee: flat({ monthly: same(124.95) }), note: 'This is the starting price. Showcase IDX says MLS pass-through fees are typically $0 to $33 per month; they are not included.' },
  { id: 'buddy-1', label: 'Buying Buddy (lower plan)', source: BUDDY, published: '$49 per month', fee: flat({ monthly: same(49) }) },
  { id: 'buddy-2', label: 'Buying Buddy (higher plan)', source: BUDDY, published: '$77 per month', fee: flat({ monthly: same(77) }) },
  { id: 'realtyna', label: 'Realtyna MLS On The Fly (Tier 1 MLS)', source: REALTYNA, published: '$99 per month plus $850 one-time setup', fee: flat({ monthly: same(99), oneTime: same(850) }) },
];

export const mlsLicenses: { board: string; options: FeeOption[] }[] = [
  {
    board: 'Stellar MLS (Florida)',
    options: [
      { id: 'stellar-broker', label: 'Broker back-office feed', source: STELLAR, published: '$450 per office per year, capped at $7,500', per: 'office', fee: (n) => ({ yearly: same(Math.min(450 * n, 7500)) }) },
      { id: 'stellar-vendor', label: 'Vendor product', source: STELLAR, published: '$7,500 per product per year, $2,500 for each additional product', per: 'product', fee: (n) => ({ yearly: same(7500 + 2500 * Math.max(0, n - 1)) }) },
    ],
  },
  {
    board: 'ARMLS (Arizona)',
    options: [
      { id: 'armls-broker', label: 'Broker feeds', source: ARMLS, published: 'Five free feeds per brokerage; additional feeds $150 per month each', per: 'feed', fee: (n) => ({ monthly: same(150 * Math.max(0, n - 5)) }) },
      { id: 'armls-vendor', label: 'Vendor product', source: ARMLS, published: 'Typically $1,000 to $1,500 per product per month', per: 'product', fee: (n) => ({ monthly: [1000 * n, 1500 * n] }) },
    ],
  },
  {
    board: 'REcolorado',
    options: [
      { id: 'reco-idx', label: 'IDX content', source: RECO, published: '$500 establishment fee, $150 per month', fee: flat({ monthly: same(150), oneTime: same(500) }) },
      { id: 'reco-vow', label: 'VOW or all content', source: RECO, published: '$1,500 establishment fee, $500 per month', fee: flat({ monthly: same(500), oneTime: same(1500) }) },
    ],
  },
  {
    board: 'MLS PIN (New England)',
    options: [
      { id: 'mlspin-broker', label: 'Broker', source: MLSPIN, published: '$100 per month, covering branch offices', fee: flat({ monthly: same(100) }) },
      { id: 'mlspin-vendor', label: 'Vendor', source: MLSPIN, published: '$525 per month', fee: flat({ monthly: same(525) }) },
    ],
  },
  {
    board: 'CREA DDF® (Canada)',
    options: [
      { id: 'crea-tech', label: 'New technology provider', source: CREA, published: '$1,500 onboarding fee (CAD), plus tiered feed fees', fee: flat({ oneTime: same(1500), currency: 'CAD' }), note: 'Tiered feed fees are not included in the total.' },
    ],
  },
];

export const dataVendors: FeeOption[] = [
  { id: 'mlsgrid', label: 'MLS Grid', source: MLSGRID, published: 'You only pay the license fee required by your MLS', fee: flat({}) },
  { id: 'trestle-broker', label: 'Trestle: broker data feeds', source: TRESTLE, published: '$30 per month for broker data feeds', per: 'feed', fee: (n) => ({ monthly: same(30 * n) }) },
  { id: 'trestle-other', label: 'Trestle: other feeds', source: TRESTLE, published: '$100 per month for other feeds', per: 'feed', fee: (n) => ({ monthly: same(100 * n) }) },
  { id: 'trestle-tech', label: 'Trestle: technology provider', source: TRESTLE, published: '$100 to $175 per connection per month, depending on volume', per: 'connection', fee: (n) => ({ monthly: [100 * n, 175 * n] }) },
  { id: 'simplyrets-basic', label: 'SimplyRETS Basic', source: SIMPLYRETS, published: '$49 per month plus a one-time $99 connection fee', fee: flat({ monthly: same(49), oneTime: same(99) }), note: 'For one MLS connection. Additional MLS feeds need the multi-MLS add-on, which is not included.' },
  { id: 'simplyrets-premium', label: 'SimplyRETS Premium', source: SIMPLYRETS, published: '$99 per month plus a one-time $99 connection fee', fee: flat({ monthly: same(99), oneTime: same(99) }), note: 'For one MLS connection. Additional MLS feeds need the multi-MLS add-on, which is not included.' },
  { id: 'simplyrets-enterprise', label: 'SimplyRETS Enterprise', source: SIMPLYRETS, published: '$199 per month plus a one-time $99 connection fee', fee: flat({ monthly: same(199), oneTime: same(99) }), note: 'For one MLS connection. Additional MLS feeds need the multi-MLS add-on, which is not included.' },
  { id: 'repliers-1', label: 'Repliers (first paid plan, one MLS)', source: REPLIERS, published: '$199 per month', fee: flat({ monthly: same(199) }) },
  { id: 'repliers-2', label: 'Repliers (second paid plan, one MLS)', source: REPLIERS, published: '$299 per month', fee: flat({ monthly: same(299) }) },
  { id: 'repliers-3', label: 'Repliers (third paid plan, one MLS)', source: REPLIERS, published: '$399 per month', fee: flat({ monthly: same(399) }) },
];

/** Hourly rates Clutch reports for software development companies, by country. */
export const hourlyBands: { id: string; label: string; rate: [number, number] }[] = [
  { id: 'india', label: 'India', rate: [25, 49] },
  { id: 'us', label: 'United States', rate: [50, 99] },
  { id: 'canada', label: 'Canada', rate: [100, 149] },
];
