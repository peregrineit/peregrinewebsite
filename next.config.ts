import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old static HTML exports of case studies -> their Next.js routes.
      ...[
        ["case-study-ecommerce-marketplace", "multi-vendor-ecommerce-marketplace"],
        ["case-study-healthcare-clinic-management", "multi-location-clinic-management"],
        ["case-study-logistics-fleet-management", "logistics-fleet-tracking-platform"],
        ["case-study-proptech-investor-portal", "proptech-investor-portal"],
        ["case-study-real-estate-saas-scaling", "scaling-real-estate-saas-platform"],
        ["case-study-self-storage-saas", "self-storage-management-platform"],
        ["case-study-northbridge-realty-ai-platform", "w3re-ai-real-estate-platform"],
      ].map(([file, slug]) => ({
        source: `/case-studies/${file}.html`,
        destination: `/case-studies/${slug}`,
        statusCode: 301 as const,
      })),
      // Case study renamed to match the client (W3|re).
      {
        source: "/case-studies/northbridge-realty-ai-platform",
        destination: "/case-studies/w3re-ai-real-estate-platform",
        statusCode: 301 as const,
      },
    ];
  },
};

export default nextConfig;
