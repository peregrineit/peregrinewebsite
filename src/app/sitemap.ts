import type { MetadataRoute } from "next";

const SITE_URL = "https://peregrine-it.com";

// Case studies have no publish/update dates in their content, so lastModified is
// omitted rather than stamped with the build time.
const caseStudySlugs = [
  "scaling-real-estate-saas-platform",
  "northbridge-realty-ai-platform",
  "self-storage-management-platform",
  "logistics-fleet-tracking-platform",
  "multi-location-clinic-management",
  "multi-vendor-ecommerce-marketplace",
  "proptech-investor-portal",
  "edtech-learning-platform",
  "food-delivery-aggregator-platform",
  "hr-payroll-saas-platform",
  "insurance-claims-automation-platform",
  "restaurant-pos-ordering-system",
  "fitness-wellness-subscription-app",
  "legal-document-automation-platform",
  "manufacturing-erp-system",
  "recruitment-ats-platform",
  "event-ticketing-platform",
  "supply-chain-visibility-platform",
  "realtime-collaboration-tool",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL },
    { url: `${SITE_URL}/case-studies` },
    ...caseStudySlugs.map((slug) => ({ url: `${SITE_URL}/case-studies/${slug}` })),
    // Legal pages carry a visible "Last updated" date.
    { url: `${SITE_URL}/privacy-policy`, lastModified: "2026-02-15" },
    { url: `${SITE_URL}/terms-of-use`, lastModified: "2026-02-15" },
  ];
}
