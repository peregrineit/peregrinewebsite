import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { guides } from "@/data/guides";

const SITE_URL = "https://peregrine-it.com";

// Case studies have no publish/update dates in their content, so lastModified is
// omitted rather than stamped with the build time.
const caseStudySlugs = [
  "scaling-real-estate-saas-platform",
  "w3re-ai-real-estate-platform",
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
    { url: `${SITE_URL}/services` },
    ...services.map((s) => ({ url: `${SITE_URL}/services/${s.slug}` })),
    { url: `${SITE_URL}/industries` },
    { url: `${SITE_URL}/industries/real-estate` },
    { url: `${SITE_URL}/blog` },
    ...guides.map((g) => ({ url: `${SITE_URL}/blog/${g.slug}`, lastModified: g.dateModified })),
    { url: `${SITE_URL}/about` },
    { url: `${SITE_URL}/contact` },
    { url: `${SITE_URL}/case-studies` },
    ...caseStudySlugs.map((slug) => ({ url: `${SITE_URL}/case-studies/${slug}` })),
    // Legal pages carry a visible "Last updated" date.
    { url: `${SITE_URL}/privacy-policy`, lastModified: "2026-02-15" },
    { url: `${SITE_URL}/terms-of-use`, lastModified: "2026-02-15" },
  ];
}
