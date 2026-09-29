import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, IBM_Plex_Sans_Arabic, Manrope, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileFloatingButtons from "./components/MobileFloatingButtons";
import DeferredScripts from "./components/DeferredScripts";
import { office } from "@/data/company";
import { team, personId } from "@/data/team";

// Import CSS in order matching original HTML to preserve cascade
import "./css/normalize.css";
import "./css/components.css";
import "./css/peregrine.css";
import "./css/popup-overlay.css";
import "./css/remixicon-subset.css";

// Tailwind last as it was last in the HTML <head>
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: false });
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap", preload: false,
});
// preload: false on all fonts: they are declared here for every route, but only
// the hub (Inter) and case studies (Manrope, Instrument Serif, JetBrains Mono)
// use them, so each page downloads only what its CSS references.
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap", preload: false });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap", preload: false,
});
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains-mono", display: "swap", preload: false });
const fontVariables = [inter, ibmPlexSansArabic, manrope, instrumentSerif, jetbrainsMono].map((f) => f.variable).join(" ");

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
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Engineering Scalable Software Systems",
    description: "Peregrine IT Solutions builds scalable SaaS platforms, API integrations, automation systems and cloud infrastructure for startups and enterprises. We design, develop and optimize high-performance software products.",
    images: ["/ogimage.png"],
  },

  category: "technology",
};

const SITE_URL = "https://peregrine-it.com";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

// The single site-wide Organization node. Other JSON-LD nodes reference it by @id.
const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Peregrine IT Solutions",
      legalName: "Peregrine IT Solutions LLP",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/favicons/favicon-512x512.png`,
        contentUrl: `${SITE_URL}/favicons/favicon-512x512.png`,
        width: 512,
        height: 512,
        caption: "Peregrine IT Solutions",
      },
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/peregrine-logo-new.png`,
        width: 1024,
        height: 180,
      },
      description:
        "Peregrine IT builds scalable SaaS platforms, API integrations, automation systems and high-performance software infrastructure for startups and enterprises.",
      sameAs: [
        "https://www.linkedin.com/company/peregrine-it-solutions/",
        "https://www.facebook.com/peregrineitsolution",
        "https://www.instagram.com/peregrineitsolution/",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: office.streetAddress,
        addressLocality: office.addressLocality,
        addressRegion: office.addressRegion,
        ...(office.postalCode ? { postalCode: office.postalCode } : {}),
        addressCountry: office.addressCountry,
      },
      founder: { "@id": personId("mukesh-swami") },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "info@peregrine-it.com",
        availableLanguage: "English",
      },
      knowsAbout: [
        "SaaS Development",
        "API Integration",
        "Automation Engineering",
        "Platform Modernization",
        "Cloud Infrastructure",
      ],
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Place", name: "Europe" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
    },
    ...team.map((m) => ({
      "@type": "Person",
      "@id": personId(m.id),
      name: m.name,
      jobTitle: m.role,
      description: m.bio,
      worksFor: { "@id": ORGANIZATION_ID },
      ...(m.photo ? { image: `${SITE_URL}${m.photo}` } : {}),
      ...(m.linkedin ? { sameAs: [m.linkedin] } : {}),
    })),
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Peregrine IT Solutions",
      inLanguage: "en-US",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData) }}
        />
        <Navbar />
        {children}
        <Footer />
        <MobileFloatingButtons />
        <SpeedInsights />
        <Analytics />

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

        {/* jQuery, GSAP, anime, Typed, Waypoints, CounterUp, animation.js, Webflow runtime */}
        <DeferredScripts />
      </body>
    </html>
  );
}
