export default function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export const SITE_URL = 'https://peregrine-it.com';
export const ORGANIZATION_REF = { '@id': `${SITE_URL}/#organization` };

export function breadcrumbList(url: string, items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
