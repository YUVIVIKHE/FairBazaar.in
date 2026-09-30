/**
 * Single source of truth for FairBazaar company information.
 *
 * IMPORTANT: Only verified facts belong here. Anything set to `null` is automatically hidden
 * across the website (footer, contact page, schema markup, llms.txt). Fill these in once they
 * are confirmed — every surface updates from this file, keeping the entity data consistent
 * for search engines and AI answer systems.
 */
export const site = {
  name: "FairBazaar",
  legalName: null as string | null, // e.g. "FairBazaar Technologies Private Limited" — only once registered name is confirmed
  tagline: "Technology that transforms businesses.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://fairbazaar.in").replace(/\/$/, ""),
  description:
    "FairBazaar is a technology company that builds SaaS products, custom software, AI solutions, CRM, ERP and HRMS platforms, and web and mobile applications that help businesses automate operations and scale.",
  shortDescription:
    "SaaS products, custom software, AI & automation, CRM, ERP, HRMS, web and mobile development for growing businesses.",
  foundingYear: null as number | null,
  // Contact details — shown only when not null.
  contact: {
    email: null as string | null, // e.g. "hello@fairbazaar.in"
    salesEmail: null as string | null,
    phone: null as string | null, // E.164, e.g. "+91XXXXXXXXXX"
    whatsapp: null as string | null, // digits only with country code, e.g. "91XXXXXXXXXX"
  },
  // Registered/office address — shown only when every required part is set.
  address: {
    street: null as string | null,
    locality: null as string | null,
    region: "Maharashtra" as string | null,
    postalCode: null as string | null,
    country: "IN",
    countryName: "India",
  },
  areaServed: ["India", "Maharashtra", "Worldwide (remote delivery)"],
  social: {
    linkedin: null as string | null,
    x: null as string | null,
    youtube: null as string | null,
    instagram: null as string | null,
    github: null as string | null,
  },
  // Only list verified numbers here. Empty array => capability statements are shown instead.
  verifiedStats: [] as { value: number; suffix?: string; label: string }[],
  legal: {
    // Set to true only after qualified legal counsel has reviewed every legal page.
    // While false, a visible review notice is shown on legal pages.
    reviewed: false,
    jurisdiction: "Maharashtra, India",
  },
  announcement: {
    text: "New: FairBazaar HRMS with location-based attendance and payroll.",
    href: "/products/hrms",
    cta: "See the product",
  },
} as const;

export const hasAddress = Boolean(site.address.street && site.address.locality && site.address.postalCode);

export const sameAs = Object.values(site.social).filter((v): v is string => Boolean(v));

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export const ctas = {
  primary: { label: "Talk to an Expert", href: "/contact?intent=expert" },
  secondary: { label: "Explore Solutions", href: "/solutions" },
  consult: { label: "Book a Free Consultation", href: "/contact?intent=consultation" },
  demo: { label: "Request a Demo", href: "/contact?intent=demo" },
  project: { label: "Start Your Project", href: "/contact?intent=project" },
  products: { label: "Explore Products", href: "/products" },
};
