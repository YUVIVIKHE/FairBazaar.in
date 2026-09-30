import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/content/services";
import { ServiceTemplate } from "@/components/templates/ServiceTemplate";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return buildMetadata({ title: s.seoTitle, description: s.metaDescription, path: `/services/${s.slug}`, keywords: s.keywords });
}

export default async function Page({ params }: PageProps<"/services/[slug]">) {
  const s = getService((await params).slug);
  if (!s) notFound();
  return <ServiceTemplate s={s} />;
}
