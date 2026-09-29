import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Case study renamed to match the client (W3|re).
      {
        source: "/case-studies/northbridge-realty-ai-platform",
        destination: "/case-studies/w3re-ai-real-estate-platform",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
