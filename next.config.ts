import type { NextConfig } from "next";

// Content-Security-Policy, sent as Report-Only for now: violations are reported in the
// browser console without blocking anything. Third-party origins actually used at
// runtime: cdnjs (GSAP, anime, Typed, Waypoints, lottie-web) and jsDelivr (CounterUp),
// homepage only. Switch to an enforced CSP once the reports are clean.
const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  // frame-ancestors has no effect in Report-Only, so it is enforced on its own.
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Content-Security-Policy-Report-Only", value: cspReportOnly },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
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
      // Next.js also serves the homepage at /index; send it to the canonical URL.
      { source: "/index", destination: "/", statusCode: 301 as const },
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
