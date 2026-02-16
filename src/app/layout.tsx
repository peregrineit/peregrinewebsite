import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import CSS in order matching original HTML to preserve cascade
import "./css/normalize.css";
import "./css/components.css";
import "./css/peregrine.css";

// Tailwind last as it was last in the HTML <head>
import "./globals.css";

export const metadata: Metadata = {
  title: "Peregrine IT",
  description: "We turn lines of code into powerful solutions that drive your business forward",
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
    type: "website",
    url: "https://peregrine-it.com/",
    title: "Peregrine IT",
    description: "We turn lines of code into powerful solutions that drive your business forward",
    images: ["https://peregrine-it.com/images/sharing-preview.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peregrine IT",
    description: "We turn lines of code into powerful solutions that drive your business forward",
    images: ["https://peregrine-it.com/images/sharing-preview.png"],
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
        <Script src="/js/animation.js" strategy="lazyOnload" />
        <Script src="/js/peregrine.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
