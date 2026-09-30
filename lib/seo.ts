import type { Metadata } from "next";
import { site, absoluteUrl, sameAs, hasAddress } from "./site";
import type { FAQ } from "@/content/types";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  keywords?: string[];
};

/** Keep titles within ~70 chars: drop the brand suffix first if needed. */
export function fitTitle(title: string, max = 70) {
  if (title.length <= max) return title;
  const stripped = title.replace(/\s*\|\s*FairBazaar$/, "");
  return stripped.length <= max ? stripped : stripped.slice(0, stripped.lastIndexOf(" ", max - 1)).replace(/[,:|–-]\s*$/, "");
}

/** Keep descriptions within ~160 chars, cutting at a sentence or word boundary. */
export function fitDescription(d: string, max = 160) {
  if (d.length <= max) return d;
  const cut = d.slice(0, max);
  const sentence = cut.lastIndexOf(". ");
  if (sentence > 90) return cut.slice(0, sentence + 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "") + "…";
}

export function buildMetadata({ title: rawTitle, description: rawDesc, path, image, type = "website", publishedTime, modifiedTime, noindex, keywords }: MetaInput): Metadata {
  const title = fitTitle(rawTitle);
  const description = fitDescription(rawDesc);
  const url = absoluteUrl(path);
  const images = image ? [{ url: absoluteUrl(image), width: 1200, height: 630, alt: title }] : undefined;
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: "en_IN",
      ...(images ? { images } : {}),
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(images ? { images: images.map((i) => i.url) } : {}) },
  };
}

// ---------- JSON-LD builders ----------
const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

function postalAddress() {
  if (!hasAddress) return { "@type": "PostalAddress", addressRegion: site.address.region, addressCountry: site.address.country };
  return {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  };
}

export function organizationSchema() {
  const contactPoint = site.contact.email || site.contact.phone
    ? [{ "@type": "ContactPoint", contactType: "sales", areaServed: "IN", availableLanguage: ["en"], ...(site.contact.email ? { email: site.contact.email } : {}), ...(site.contact.phone ? { telephone: site.contact.phone } : {}) }]
    : undefined;
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    ...(site.legalName ? { legalName: site.legalName } : {}),
    url: site.url,
    logo: { "@type": "ImageObject", url: absoluteUrl("/brand/fairbazaar-mark-512.png"), width: 512, height: 512 },
    description: site.description,
    slogan: site.tagline,
    ...(site.foundingYear ? { foundingDate: String(site.foundingYear) } : {}),
    address: postalAddress(),
    areaServed: site.areaServed,
    knowsAbout: [
      "Custom software development", "SaaS product development", "Artificial intelligence", "AI agents", "Retrieval-augmented generation",
      "CRM software", "ERP software", "HRMS software", "Payroll software", "Business process automation", "Web development",
      "Mobile app development", "Cloud computing", "DevOps", "Digital transformation",
    ],
    ...(sameAs.length ? { sameAs } : {}),
    ...(contactPoint ? { contactPoint } : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${site.url}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Only emitted when a verified address exists — we never publish a fabricated location. */
export function localBusinessSchema() {
  if (!hasAddress) return null;
  return {
    "@type": "ProfessionalService",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    url: site.url,
    image: absoluteUrl("/brand/fairbazaar-mark-512.png"),
    address: postalAddress(),
    parentOrganization: { "@id": ORG_ID },
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    areaServed: site.areaServed,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

export function faqSchema(faqs: FAQ[]) {
  if (!faqs.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function serviceSchema(s: { name: string; description: string; path: string; serviceType?: string; offers?: string[] }) {
  return {
    "@type": "Service",
    name: s.name,
    serviceType: s.serviceType ?? s.name,
    description: s.description,
    url: absoluteUrl(s.path),
    provider: { "@id": ORG_ID },
    areaServed: site.areaServed,
    ...(s.offers?.length
      ? { hasOfferCatalog: { "@type": "OfferCatalog", name: s.name, itemListElement: s.offers.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o } })) } }
      : {}),
  };
}

export function softwareSchema(p: { name: string; description: string; path: string; category: string; features: string[] }) {
  // No price/rating is emitted: we do not publish unverified offers or reviews.
  return {
    "@type": "SoftwareApplication",
    name: p.name,
    description: p.description,
    url: absoluteUrl(p.path),
    applicationCategory: "BusinessApplication",
    applicationSubCategory: p.category,
    operatingSystem: "Web, Android, iOS",
    featureList: p.features,
    publisher: { "@id": ORG_ID },
  };
}

export function articleSchema(a: { title: string; description: string; path: string; image?: string; published: string; modified: string; author: string; section: string; keywords: string[] }) {
  return {
    "@type": "Article",
    headline: a.title,
    description: a.description,
    mainEntityOfPage: absoluteUrl(a.path),
    ...(a.image ? { image: absoluteUrl(a.image) } : {}),
    datePublished: a.published,
    dateModified: a.modified,
    author: { "@type": "Organization", name: a.author, url: absoluteUrl("/about") },
    publisher: { "@id": ORG_ID },
    articleSection: a.section,
    keywords: a.keywords.join(", "),
    inLanguage: "en-IN",
  };
}

export function howToSchema(name: string, steps: { title: string; text: string }[]) {
  return {
    "@type": "HowTo",
    name,
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
  };
}

export function itemListSchema(name: string, items: { name: string; path: string }[]) {
  return {
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
  };
}

export function graph(...nodes: (object | null | undefined)[]) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
