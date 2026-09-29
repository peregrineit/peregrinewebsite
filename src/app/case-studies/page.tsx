import type { Metadata } from 'next';
import CaseStudiesClient from './CaseStudiesClient';
import JsonLd, { ORGANIZATION_REF, SITE_URL, breadcrumbList } from '../components/JsonLd';
import { caseStudies, caseStudyUrl } from '@/data/case-studies';

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
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: ORGANIZATION_REF,
        mainEntity: { '@id': `${url}#list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#list`,
        numberOfItems: caseStudies.length,
        itemListElement: caseStudies.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: caseStudyUrl(c.slug),
          name: c.title,
        })),
      },
      breadcrumbList(url, [
        { name: 'Home', path: '' },
        { name: 'Case Studies', path: '/case-studies' },
      ]),
    ],
  };
  return (
    <>
      <JsonLd data={schema} />
      <CaseStudiesClient />
    </>
  );
}
