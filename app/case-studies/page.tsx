import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyCard } from "@/components/cards/Cards";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/ui/JsonLd";
import { caseStudies } from "@/content/case-studies";
import { buildMetadata, breadcrumbSchema, graph, itemListSchema } from "@/lib/seo";
import { Info } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies & Solution Stories | FairBazaar",
  description: "How FairBazaar approaches real business problems: HRMS and attendance, dealer CRM, AI knowledge assistants and manufacturing ERP — with architecture, implementation and outcomes.",
  path: "/case-studies",
});

export default function Page() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies" }];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), itemListSchema("FairBazaar case studies", caseStudies.map((c) => ({ name: c.title, path: `/case-studies/${c.slug}` }))))} />
      <PageHero crumbs={crumbs} eyebrow="Case studies" title={<>Solution <span className="text-gradient">stories</span></>} intro="Problem, architecture, implementation and outcomes — how we approach the business challenges we're asked to solve most often." primary={{ label: "Build Something Similar", href: "/contact?intent=project", track: "cs_index_similar" }} />
      <section className="py-14 sm:py-20">
        <div className="container-x">
          <p className="mb-8 flex max-w-3xl items-start gap-3 rounded-xl border border-line bg-surface p-4 text-sm text-slate-600">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-500" />
            These stories are reference implementations describing our approach and expected qualitative outcomes. Client-approved case studies with verified results will be published here as they become available.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {caseStudies.map((c, i) => <Reveal key={c.slug} delay={(i % 2) * 60}><CaseStudyCard c={c} /></Reveal>)}
          </div>
        </div>
      </section>
      <CTASection title="Build Something Similar" text="Have a comparable challenge? Let's map how this approach would work for your organisation." primary={{ label: "Build Something Similar", href: "/contact?intent=project" }} track="cs_index_bottom" />
    </>
  );
}
