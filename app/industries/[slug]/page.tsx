import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries, getIndustry } from "@/content/industries";
import { IndustryTemplate } from "@/components/templates/IndustryTemplate";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const i = getIndustry((await params).slug);
  if (!i) return {};
  return buildMetadata({ title: i.seoTitle, description: i.metaDescription, path: `/industries/${i.slug}` });
}

export default async function Page({ params }: PageProps<"/industries/[slug]">) {
  const i = getIndustry((await params).slug);
  if (!i) notFound();
  return <IndustryTemplate i={i} />;
}
