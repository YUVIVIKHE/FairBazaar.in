import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { IndustryCard } from "@/components/cards/Cards";
import { CTASection } from "@/components/sections/CTASection";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { JsonLd } from "@/components/ui/JsonLd";
import { industries } from "@/content/industries";
import { buildMetadata, breadcrumbSchema, graph, itemListSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industry Software Solutions for Every Sector | FairBazaar",
  description: "Software, automation and AI solutions for healthcare, education, agriculture, retail, manufacturing, real estate, hospitality, finance, logistics, automotive, startups, SMEs and enterprises.",
  path: "/industries",
});

export default function Page() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), itemListSchema("Industries FairBazaar serves", industries.map((i) => ({ name: i.name, path: `/industries/${i.slug}` }))))} />
      <PageHero crumbs={crumbs} eyebrow="Industries" title={<>Built for <span className="text-gradient">how your industry works</span></>} intro="Solution blueprints shaped by the workflows, regulations and customers of each sector." primary={{ label: "Talk to an Expert", href: "/contact?intent=expert" }} />
      <section className="py-14 sm:py-20">
        <div className="container-x max-w-5xl">
          <AnswerBlock question="Which industries does FairBazaar build software for?" answer="FairBazaar builds software, automation and AI solutions for healthcare, education, agriculture, retail, manufacturing, real estate, hospitality, financial services, logistics, automotive and professional services, as well as startups, SMEs and enterprises across India and internationally." />
        </div>
      </section>
      <section className="pb-16 sm:pb-24">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i, n) => <Reveal key={i.slug} delay={(n % 3) * 60}><IndustryCard i={i} withImage /></Reveal>)}
        </div>
      </section>
      <CTASection track="industries_bottom" />
    </>
  );
}
