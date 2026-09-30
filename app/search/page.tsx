import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { SearchResults } from "./SearchResults";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Search | FairBazaar", description: "Search FairBazaar services, products, industries, articles, case studies and FAQs.", path: "/search", noindex: true });

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Search" title="Search FairBazaar" compact crumbs={[{ name: "Home", path: "/" }, { name: "Search", path: "/search" }]} />
      <div className="container-x max-w-3xl py-12">
        <Suspense fallback={<p className="text-slate-500">Loading search…</p>}><SearchResults /></Suspense>
      </div>
    </>
  );
}
