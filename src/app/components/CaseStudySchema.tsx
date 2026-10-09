import { SITE_URL, caseStudyUrl, getCaseStudy } from '@/data/case-studies';
import { getCaseStudyAuthor, personId } from '@/data/team';
// Imported for its side effect: preloads the two hero fonts on case-study pages.
import './caseStudyFonts';

const ORGANIZATION = { '@id': `${SITE_URL}/#organization` };

// Article + BreadcrumbList JSON-LD for a case study. No datePublished/dateModified:
// the case studies carry no real dates.
export default function CaseStudySchema({ slug }: { slug: string }) {
  const study = getCaseStudy(slug);
  const url = caseStudyUrl(slug);
  const author = getCaseStudyAuthor();
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: study.title,
        description: study.description,
        image: `${url}/opengraph-image`,
        url,
        mainEntityOfPage: url,
        articleSection: 'Case Studies',
        about: study.industry,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        author: author ? { '@id': personId(author.id) } : ORGANIZATION,
        publisher: ORGANIZATION,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${SITE_URL}/case-studies` },
          { '@type': 'ListItem', position: 3, name: study.title, item: url },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
