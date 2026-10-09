import { Instrument_Serif, Manrope } from 'next/font/google';

// The root layout declares every font with preload: false, so each page downloads only
// what its CSS uses. Case-study pages render their hero in Manrope and Instrument Serif,
// and the late font swap was their Largest Contentful Paint. Declaring the same two
// fonts here with preload: true makes Next.js emit <link rel="preload"> for them on the
// routes that import this module (the case-study detail pages, via CaseStudySchema).
// The files are the same ones the root layout's @font-face rules point to.
export const manropePreload = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap', preload: true });
export const instrumentSerifPreload = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
  preload: true,
});
