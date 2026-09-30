import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { Analytics } from "@/components/layout/Analytics";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/lib/site";
import { graph, organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap", weight: ["600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "FairBazaar | SaaS Products, Custom Software & AI Solutions", template: "%s | FairBazaar" },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
  alternates: { types: { "application/rss+xml": `${site.url}/blog/rss.xml` } },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#050816" }, { media: "(prefers-color-scheme: dark)", color: "#050816" }],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables progressive reveal animations only when JS runs; content is visible otherwise. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={graph(organizationSchema(), websiteSchema(), localBusinessSchema())} />
      </head>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only z-[100] rounded-full bg-brand-500 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
          Skip to content
        </a>
        <AnnouncementBar />
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <Footer />
        <SearchDialog />
        <Analytics />
      </body>
    </html>
  );
}
