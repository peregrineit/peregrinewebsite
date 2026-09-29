import type { Metadata } from 'next';
import CaseStudiesClient from './CaseStudiesClient';

const title = 'Case Studies: SaaS, Proptech & Integrations';
const description =
  'Peregrine IT Solutions projects in real estate SaaS, MLS integration, AI automation, marketplaces, ERP and logistics, with the architecture and results.';
const url = 'https://peregrine-it.com/case-studies';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title: `${title} | Peregrine IT Solutions`,
    description,
    url,
    type: 'website',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: '/ogimage.png', width: 1200, height: 630, alt: 'Peregrine IT Solutions case studies' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | Peregrine IT Solutions`,
    description,
    images: ['/ogimage.png'],
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
