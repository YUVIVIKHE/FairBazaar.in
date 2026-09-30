import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/templates/BlogIndex";
import { blogCategories, categoryName, getAllPosts, slugify, toMeta } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return blogCategories.map((c) => ({ slug: slugify(c) }));
}

export async function generateMetadata({ params }: PageProps<"/blog/category/[slug]">): Promise<Metadata> {
  const name = categoryName((await params).slug);
  if (!name) return {};
  const count = getAllPosts().filter((p) => p.category === name).length;
  return buildMetadata({
    title: `${name} Articles & Guides | FairBazaar Blog`,
    description: `Articles and guides about ${name.toLowerCase()} for business leaders and technology teams, from the FairBazaar knowledge hub.`,
    path: `/blog/category/${slugify(name)}`,
    noindex: count === 0, // avoid indexing thin, empty category pages
  });
}

export default async function Page({ params }: PageProps<"/blog/category/[slug]">) {
  const name = categoryName((await params).slug);
  if (!name) notFound();
  const all = getAllPosts().map(toMeta);
  const counts: Record<string, number> = {};
  all.forEach((p) => (counts[p.category] = (counts[p.category] ?? 0) + 1));
  const posts = all.filter((p) => p.category === name);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name, path: `/blog/category/${slugify(name)}` }];
  return <BlogIndex posts={posts} crumbs={crumbs} activeCategory={name} allCounts={counts} title={<>{name} <span className="text-gradient">insights</span></>} intro={`Articles and guides on ${name.toLowerCase()} from the FairBazaar team.`} />;
}
