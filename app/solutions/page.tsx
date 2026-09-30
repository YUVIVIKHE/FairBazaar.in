import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { IconTile } from "@/components/ui/Icon";
import { CTASection } from "@/components/sections/CTASection";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { JsonLd } from "@/components/ui/JsonLd";
import { FAQ } from "@/components/ui/FAQ";
import { IndustryCard } from "@/components/cards/Cards";
import { solutionCategories } from "@/content/solutions";
import { industries, featuredIndustrySlugs } from "@/content/industries";
import { buildMetadata, breadcrumbSchema, faqSchema, graph } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Business, AI, Enterprise & Industry Solutions | FairBazaar",
  description: "Compare FairBazaar solutions: business platforms, AI solutions, enterprise solutions, industry solutions, automation and digital transformation — and find the right fit.",
  path: "/solutions",
});

const compare = [
  { label: "Ready platform", values: ["Yes", "Components", "Components", "Blueprints", "Yes", "—"] },
  { label: "Custom development", values: ["Extensions", "Yes", "Yes", "Yes", "Yes", "Yes"] },
  { label: "AI capabilities", values: ["Optional", "Core", "Governed", "Optional", "AI steps", "Roadmap"] },
];

const faqs = [
  { q: "How do I know whether I need a product or a custom solution?", a: "If a FairBazaar platform covers most of your process, configuring it is faster. If your process is unique or spans many systems, a custom build — often on FairBazaar platform components — fits better. A discovery call clarifies this quickly." },
  { q: "Can solutions be combined?", a: "Yes. Most clients combine a platform such as HRMS or CRM with automation and AI, connected through one data layer." },
];

export default function Page() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions" }];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), faqSchema(faqs))} />
      <PageHero crumbs={crumbs} eyebrow="Solutions" title={<>Solutions for every stage of <span className="text-gradient">digital growth</span></>} intro="Whether you need a ready platform, an AI initiative or a full transformation, start with the outcome — we'll assemble the right solution." primary={{ label: "Talk to an Expert", href: "/contact?intent=expert" }} secondary={{ label: "Explore Products", href: "/products" }} />
      <section className="py-14 sm:py-20">
        <div className="container-x max-w-5xl">
          <AnswerBlock question="What kind of solutions does FairBazaar provide?" answer="FairBazaar provides six categories of solutions: business platforms (HRMS, CRM, ERP), AI solutions (agents, RAG, document intelligence), enterprise solutions (custom apps and integrations), industry solutions, automation solutions (workflows and approvals), and digital transformation programmes that phase these together." />
        </div>
      </section>
      <section className="pb-16 sm:pb-24">
        <div className="container-x grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {solutionCategories.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 60} className="h-full">
              <article id={s.slug} className="card flex h-full flex-col p-6">
                <IconTile name={s.icon} />
                <h2 className="mt-5 text-xl font-bold">{s.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{s.summary}</p>
                <dl className="mt-5 space-y-2 text-sm">
                  <div className="flex justify-between gap-4 border-t border-line pt-2"><dt className="text-slate-500">Best for</dt><dd className="text-right font-medium text-ink-900">{s.bestFor}</dd></div>
                  <div className="flex justify-between gap-4 border-t border-line pt-2"><dt className="text-slate-500">Timeline</dt><dd className="text-right font-medium text-ink-900">{s.timeline}</dd></div>
                </dl>
                <ul className="mt-5 flex-1 space-y-1.5">
                  {s.includes.map((it) => <li key={it} className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 aria-hidden="true" className="size-4 text-mint-500" />{it}</li>)}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  {s.links.map((l) => <Link key={l.href} href={l.href} className="text-sm font-semibold text-brand-600 hover:text-brand-700">{l.label} →</Link>)}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-24" aria-labelledby="compare">
        <div className="container-x">
          <SectionHeader eyebrow="Compare" title={<span id="compare">Solution comparison</span>} />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-line bg-white" role="region" aria-label="Solution comparison table" tabIndex={0}>
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead><tr><th scope="col" className="p-4 font-semibold text-slate-500">Capability</th>{solutionCategories.map((s) => <th key={s.slug} scope="col" className="p-4 font-semibold text-ink-900">{s.name}</th>)}</tr></thead>
              <tbody>
                {compare.map((r) => (
                  <tr key={r.label} className="border-t border-line"><th scope="row" className="p-4 font-medium text-slate-600">{r.label}</th>{r.values.map((v, i) => <td key={i} className="p-4 text-slate-700">{v}</td>)}</tr>
                ))}
                <tr className="border-t border-line"><th scope="row" className="p-4 font-medium text-slate-600">Typical timeline</th>{solutionCategories.map((s) => <td key={s.slug} className="p-4 text-slate-700">{s.timeline}</td>)}</tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24" aria-labelledby="ind">
        <div className="container-x">
          <SectionHeader eyebrow="Industry solutions" title={<span id="ind">Popular industry solutions</span>} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.filter((i) => featuredIndustrySlugs.includes(i.slug)).map((i) => <IndustryCard key={i.slug} i={i} />)}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader align="left" eyebrow="FAQ" title="Choosing a solution" />
          <FAQ items={faqs} />
        </div>
      </section>
      <CTASection track="solutions_bottom" />
    </>
  );
}
