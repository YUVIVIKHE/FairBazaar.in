import "server-only";
import { services } from "@/content/services";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { caseStudies } from "@/content/case-studies";
import { generalFaqs } from "@/content/faqs";
import { solutionCategories } from "@/content/solutions";
import { getAllPosts } from "./blog";

export type SearchDoc = { t: string; u: string; k: "Service" | "Product" | "Industry" | "Solution" | "Case study" | "Article" | "FAQ" | "Page"; d: string; x: string };

export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  services.forEach((s) => docs.push({ t: s.name, u: `/services/${s.slug}`, k: "Service", d: s.metaDescription, x: [s.headline, ...s.keywords, ...s.offerings.map((o) => o.title)].join(" ") }));
  products.forEach((p) => docs.push({ t: p.name, u: `/products/${p.slug}`, k: "Product", d: p.metaDescription, x: [p.tagline, ...p.highlights, ...p.modules.map((m) => m.title)].join(" ") }));
  industries.forEach((i) => docs.push({ t: `${i.name} solutions`, u: `/industries/${i.slug}`, k: "Industry", d: i.intro, x: [i.headline, ...i.features].join(" ") }));
  solutionCategories.forEach((s) => docs.push({ t: s.name, u: `/solutions#${s.slug}`, k: "Solution", d: s.summary, x: s.includes.join(" ") }));
  caseStudies.forEach((c) => docs.push({ t: c.title, u: `/case-studies/${c.slug}`, k: "Case study", d: c.summary, x: [...c.features, ...c.technology].join(" ") }));
  getAllPosts().forEach((p) => docs.push({ t: p.title, u: `/blog/${p.slug}`, k: "Article", d: p.description, x: [p.category, ...p.tags].join(" ") }));
  generalFaqs.forEach((f) => docs.push({ t: f.q, u: `/faq#${f.q.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`, k: "FAQ", d: f.a, x: "" }));
  [
    ["About FairBazaar", "/about", "Who we are, mission, vision and approach."],
    ["Technology", "/technology", "Frontend, backend, AI, cloud and databases we use."],
    ["Contact", "/contact", "Talk to a technology expert."],
    ["Careers", "/careers", "Work with FairBazaar."],
    ["Security", "/security", "How we protect data and applications."],
  ].forEach(([t, u, d]) => docs.push({ t, u, k: "Page", d, x: "" }));
  return docs;
}
