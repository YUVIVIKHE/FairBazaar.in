import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { IconTile } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { ArchitectureViz } from "@/components/visuals/ArchitectureViz";
import { CTASection } from "@/components/sections/CTASection";
import { techGroups } from "@/content/technology";
import { buildMetadata, breadcrumbSchema, graph } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Technology Stack: React, Next.js, Python, AI, Cloud | FairBazaar",
  description: "The FairBazaar technology ecosystem: React and Next.js frontends, Python, FastAPI, Django and Java backends, LLMs, RAG and AI agents, AWS, Docker, CI/CD, PostgreSQL and Supabase.",
  path: "/technology",
});

export default function Page() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Technology", path: "/technology" }];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <PageHero crumbs={crumbs} eyebrow="Technology" title={<>Capabilities, <span className="text-gradient">not a logo wall</span></>} intro="We choose technology for what it delivers to your business — performance, reliability, security and the freedom to grow." primary={{ label: "Talk to an Expert", href: "/contact?intent=expert" }} aside={<MediaSlot id="tech-objects" className="aspect-[16/10]" priority />} />
      <section className="py-14 sm:py-20">
        <div className="container-x max-w-5xl">
          <AnswerBlock question="What technologies does FairBazaar use?" answer="FairBazaar builds with React, Next.js and TypeScript on the frontend; Python, FastAPI, Django, PHP and Java/Spring Boot on the backend; LLMs, RAG, LangChain, LangGraph and vector databases for AI; AWS, Docker and CI/CD for cloud; PostgreSQL, MySQL and Supabase for data; and React Native and Flutter for mobile." />
        </div>
      </section>
      {techGroups.map((g, gi) => (
        <section key={g.slug} id={g.slug} className={`py-14 sm:py-20 ${gi % 2 ? "bg-surface" : ""}`} aria-labelledby={`tg-${g.slug}`}>
          <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <IconTile name={g.icon} />
              <h2 id={`tg-${g.slug}`} className="mt-5 text-3xl font-bold">{g.name}</h2>
              <p className="mt-2 font-semibold text-brand-600">{g.capability}</p>
              <p className="mt-4 leading-7 text-slate-600">{g.why}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {g.items.map((it, i) => (
                <Reveal key={it.name} delay={i * 50} className="card p-5">
                  <h3 className="text-base font-semibold">{it.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{it.use}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
      <section className="py-16 sm:py-24" aria-labelledby="arch">
        <div className="container-x">
          <SectionHeader eyebrow="Reference architecture" title={<span id="arch">How the pieces fit together</span>} />
          <div className="mt-12"><ArchitectureViz /></div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
