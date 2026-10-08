import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { guides } from "@/data/guides";
import { industries } from "@/data/industries";
import { privacyPolicyUpdated, termsOfUseUpdated } from "@/data/legal";

const SITE_URL = "https://peregrine-it.com";

// lastModified only where the page itself declares a dateModified in its JSON-LD
// (guides, service pages and the two legal pages). Everything else omits it rather than stamping the
// build time.
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
    ...services.map((s) => ({ url: `${SITE_URL}/services/${s.slug}`, lastModified: s.updated })),
    { url: `${SITE_URL}/industries` },
    ...industries.map((i) => ({ url: `${SITE_URL}/industries/${i.slug}` })),
    { url: `${SITE_URL}/blog` },
    ...guides.map((g) => ({ url: `${SITE_URL}/blog/${g.slug}`, lastModified: g.dateModified })),
    { url: `${SITE_URL}/about` },
    { url: `${SITE_URL}/contact` },
    { url: `${SITE_URL}/case-studies` },
    ...caseStudySlugs.map((slug) => ({ url: `${SITE_URL}/case-studies/${slug}` })),
    { url: `${SITE_URL}/privacy-policy`, lastModified: privacyPolicyUpdated },
    { url: `${SITE_URL}/terms-of-use`, lastModified: termsOfUseUpdated },
  ];
}
