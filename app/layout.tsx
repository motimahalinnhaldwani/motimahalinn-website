import type { Metadata, Viewport } from "next";
import "./globals.css";

import { site } from "@/content/site";
import { hotelSchema, localBusinessSchema } from "@/lib/seo";
import JsonLd from "@/components/ui/JsonLd";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import BookingBar from "@/components/ui/BookingBar";
import RiverProgress from "@/components/ui/RiverProgress";
import SmoothScroll from "@/components/motion/SmoothScroll";
import MagneticCursor from "@/components/motion/MagneticCursor";
import { TransitionProvider } from "@/components/motion/PageTransition";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Haldwani, at the gateway to Kumaon`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "hotel in Haldwani",
    "hotel near Haldwani railway station",
    "hotels near Kainchi Dham",
    "where to stay before Nainital",
    "hotel Haldwani bus stand",
    "Haldwani hotel with restaurant",
    "best restaurant in Haldwani",
  ],
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/", "hi-IN": "/hi" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: `${site.name} — Haldwani`,
    description: site.tagline,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0F0E0C",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Runs before first paint. Arms the reveal system only when motion is wanted,
 * and disarms it unconditionally after two seconds so no text can ever be
 * stranded invisible by a script that failed to load.
 */
const ARM = `(function(){try{var d=document.documentElement;
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var save=navigator.connection&&navigator.connection.saveData;
if(!reduce&&!save)d.classList.add('js-motion');
setTimeout(function(){d.classList.add('reveal-failsafe')},2000);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        {/* §6 — preload the display face only. Nothing else. */}
        <link
          rel="preload"
          href="/fonts/fraunces-latin-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script dangerouslySetInnerHTML={{ __html: ARM }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-sm focus:bg-brass focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>

        <TransitionProvider>
          <SmoothScroll>
            <div className="ground" aria-hidden="true" />
            <div className="fog" aria-hidden="true" />
            <RiverProgress />
            <Nav />
            <main id="main" className="relative z-10">
              {children}
            </main>
            <Footer />
            {/* Reserved height for the docked availability bar, so it never
                permanently covers the end of the page. Always present, so it
                cannot cause a layout shift when the bar docks. */}
            <div aria-hidden="true" className="h-20 lg:h-28" />
            <BookingBar />
            <MagneticCursor />
          </SmoothScroll>
        </TransitionProvider>

        <JsonLd data={[hotelSchema(), localBusinessSchema()]} />
      </body>
    </html>
  );
}
