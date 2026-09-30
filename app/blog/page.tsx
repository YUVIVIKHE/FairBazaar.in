import type { Metadata } from "next";
import { BlogIndex } from "@/components/templates/BlogIndex";
import { JsonLd } from "@/components/ui/JsonLd";
import { getAllPosts, toMeta } from "@/lib/blog";
import { buildMetadata, breadcrumbSchema, graph, itemListSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog: AI, SaaS & Software Development Insights | FairBazaar",
  description: "Practical articles on AI agents, RAG, SaaS, custom software, CRM, ERP, HRMS, business automation, cloud and digital transformation from the FairBazaar team.",
  path: "/blog",
});

export default function Page() {
  const posts = getAllPosts().map(toMeta);
  const counts: Record<string, number> = {};
  posts.forEach((p) => (counts[p.category] = (counts[p.category] ?? 0) + 1));
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), itemListSchema("FairBazaar articles", posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` }))))} />
      <BlogIndex posts={posts} crumbs={crumbs} allCounts={counts} title={<>Insights for <span className="text-gradient">building smarter businesses</span></>} intro="Guides, explainers and decision frameworks on AI, SaaS, software and digital transformation." />
    </>
  );
}
