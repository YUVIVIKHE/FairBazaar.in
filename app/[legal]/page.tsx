import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { getLegalDoc, legalSlugs } from "@/lib/legal";
import { buildMetadata, breadcrumbSchema, graph } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return legalSlugs.map((legal) => ({ legal }));
}

export async function generateMetadata({ params }: PageProps<"/[legal]">): Promise<Metadata> {
  const d = getLegalDoc((await params).legal);
  if (!d) return {};
  return buildMetadata({ title: `${d.title} | FairBazaar`, description: d.description, path: `/${d.slug}` });
}

export default async function Page({ params }: PageProps<"/[legal]">) {
  const d = getLegalDoc((await params).legal);
  if (!d) notFound();
  const crumbs = [{ name: "Home", path: "/" }, { name: d.title, path: `/${d.slug}` }];
  const updated = new Date(d.updated).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <PageHero crumbs={crumbs} eyebrow={d.slug === "security" || d.slug === "accessibility" ? "Trust" : "Legal"} title={d.title} intro={d.description} compact>
        <p className="mt-6 text-sm text-slate-400">Last updated: <time dateTime={d.updated}>{updated}</time></p>
      </PageHero>
      <div className="container-x grid gap-12 py-14 sm:py-20 lg:grid-cols-[220px_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <ol className="sticky top-28 space-y-2 text-sm">
            {d.headings.map((h) => <li key={h.id}><a href={`#${h.id}`} className="text-slate-600 hover:text-brand-600">{h.text}</a></li>)}
          </ol>
        </nav>
        <div className="max-w-3xl">
          {!site.legal.reviewed && (
            <p role="note" className="mb-10 flex gap-3 rounded-xl border border-amber-400/50 bg-amber-400/10 p-4 text-sm text-ink-900">
              <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-amber-400" />
              This document is a draft prepared for Indian legal context and must be reviewed by qualified legal counsel before it is relied upon. It does not state any registration or certification that FairBazaar has not obtained.
            </p>
          )}
          <div className="legal prose-fb" dangerouslySetInnerHTML={{ __html: d.html }} />
          <p className="mt-12 border-t border-line pt-6 text-sm text-slate-500">Questions? <Link href="/contact" className="text-brand-600 underline">Contact us</Link>.</p>
        </div>
      </div>
    </>
  );
}
