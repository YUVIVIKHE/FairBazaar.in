import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { caseStudies } from "@/content/case-studies";
import { getAllPosts, blogCategories, slugify } from "@/lib/blog";
import { legalSlugs } from "@/lib/legal";
import { absoluteUrl } from "@/lib/site";

const BUILD = new Date("2026-09-30");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const e = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly", lastModified: Date = BUILD) =>
    ({ url: absoluteUrl(path), lastModified, changeFrequency, priority });
  const usedCategories = new Set(posts.map((p) => p.category));
  return [
    e("/", 1, "weekly"),
    ...["/services", "/products", "/solutions", "/industries"].map((p) => e(p, 0.9)),
    ...["/about", "/contact", "/case-studies", "/technology", "/faq", "/careers", "/blog"].map((p) => e(p, 0.7, p === "/blog" ? "weekly" : "monthly")),
    ...services.map((s) => e(`/services/${s.slug}`, s.pillar ? 0.9 : 0.8)),
    ...products.map((p) => e(`/products/${p.slug}`, 0.9)),
    ...industries.map((i) => e(`/industries/${i.slug}`, 0.8)),
    ...caseStudies.map((c) => e(`/case-studies/${c.slug}`, 0.6)),
    ...posts.map((p) => e(`/blog/${p.slug}`, 0.7, "monthly", new Date(p.updatedAt))),
    ...blogCategories.filter((c) => usedCategories.has(c)).map((c) => e(`/blog/category/${slugify(c)}`, 0.5, "weekly")),
    ...["india", "maharashtra"].map((l) => e(`/locations/${l}`, 0.6)),
    ...legalSlugs.map((l) => e(`/${l}`, 0.3, "yearly")),
  ];
}
