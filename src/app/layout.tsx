import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileFloatingButtons from "./components/MobileFloatingButtons";

// Import CSS in order matching original HTML to preserve cascade
import "./css/normalize.css";
import "./css/components.css";
import "./css/peregrine.css";
import "./css/popup-overlay.css";

// Tailwind last as it was last in the HTML <head>
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#06b6d4",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://peregrine-it.com"),

  title: {
    default: "Peregrine IT Solutions | SaaS, API & Automation Development Company",
    template: "%s | Peregrine IT Solutions",
  },

  description:
    "Peregrine IT Solutions builds scalable SaaS platforms, API integrations, automation systems and cloud infrastructure for startups and enterprises. We design, develop and optimize high-performance software products.",

  keywords: [
    "SaaS development company",
    "API development services",
    "automation software development",
    "custom software development company",
    "Node.js React development agency",
    "MLS integration developers",
  ],

  authors: [{ name: "Peregrine IT Solutions LLP", url: "https://peregrine-it.com" }],
  creator: "Peregrine IT Solutions LLP",
  publisher: "Peregrine IT Solutions LLP",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://peregrine-it.com",
  },

  icons: {
    icon: [
      { url: "/favicons/favicon.ico?v=4", sizes: "any" },
      { url: "/favicons/favicon-16x16.png?v=4", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png?v=4", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-48x48.png?v=4", sizes: "48x48", type: "image/png" },
      { url: "/favicons/favicon-64x64.png?v=4", sizes: "64x64", type: "image/png" },
      { url: "/favicons/favicon-128x128.png?v=4", sizes: "128x128", type: "image/png" },
      { url: "/favicons/favicon-192x192.png?v=4", sizes: "192x192", type: "image/png" },
      { url: "/favicons/favicon-256x256.png?v=4", sizes: "256x256", type: "image/png" },
      { url: "/favicons/favicon-512x512.png?v=4", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/favicons/favicon-180x180.png?v=4", sizes: "180x180", type: "image/png" },
  },
  manifest: "/site.webmanifest",

  openGraph: {
    title: "Engineering Scalable Software Systems",
    description: "Peregrine IT Solutions builds scalable SaaS platforms, API integrations, automation systems and cloud infrastructure for startups and enterprises. We design, develop and optimize high-performance software products.",
    url: "https://peregrine-it.com",
    siteName: "Peregrine IT Solutions",
    images: [
      {
        url: "/ogimage.png",
        width: 1200,
        height: 630,
        alt: "Peregrine IT Solutions - SaaS, API and Automation Development Company",
      },
    ],
    locale: "en_US",
    type: "article",
    publishedTime: "2026-02-17T00:00:00.000Z",
    modifiedTime: "2026-02-17T00:00:00.000Z",
  },

  twitter: {
    card: "summary_large_image",
    title: "Engineering Scalable Software Systems",
    description: "Peregrine IT Solutions builds scalable SaaS platforms, API integrations, automation systems and cloud infrastructure for startups and enterprises. We design, develop and optimize high-performance software products.",
    images: ["/ogimage.png"],
  },

  category: "technology",

  other: {
    "article:author": "Peregrine IT Solutions",
    "article:publisher": "https://peregrine-it.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Head is handled by Metadata + manual links if needed */}
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <MobileFloatingButtons />
        <SpeedInsights />
        <Analytics />

        {/* Scripts from original HTML */}
        <Script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" strategy="beforeInteractive" />
        <Script id="webfont-load" strategy="afterInteractive">
          {`
            WebFont.load({
              google: {
                families: ["Inter:300,400,500,600,700", "IBM Plex Sans Arabic:300,regular,500,600,700"]
              }
            });
          `}
        </Script>

        {/* Helper Script from original HTML */}
        <Script id="touch-mod" strategy="afterInteractive">
          {`
             ! function (o, c) {
               var n = c.documentElement,
                 t = " w-mod-";
               n.className += t + "js", ("ontouchstart" in o || o.DocumentTouch && c instanceof DocumentTouch) && (n.className += t + "touch")
             }(window, document);
           `}
        </Script>

        {/* Main JS logic from Webflow/Original Site */}
        {/* Loading it lazily or after interactive to ensure DOM exists */}
        {/* Using /js/peregrine.js since we copied js folder to public/js */}
        <Script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=66b50d9ad39e4c82098fe099" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.0/jquery.waypoints.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/jquery.counterup@2.1.0/jquery.counterup.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.9/typed.js" strategy="afterInteractive" />
        <Script src="/js/animation.js" strategy="afterInteractive" />
        <Script src="/js/peregrine.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
