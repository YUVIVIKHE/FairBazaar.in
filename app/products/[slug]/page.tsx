import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/content/products";
import { ProductTemplate } from "@/components/templates/ProductTemplate";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return buildMetadata({ title: p.seoTitle, description: p.metaDescription, path: `/products/${p.slug}` });
}

export default async function Page({ params }: PageProps<"/products/[slug]">) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  return <ProductTemplate p={p} />;
}
