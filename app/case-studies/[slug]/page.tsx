import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, XCircle, Info } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { CTASection } from "@/components/sections/CTASection";
import { RelatedEntities } from "@/components/sections/Related";
import { DashboardMockup } from "@/components/visuals/DashboardMockup";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { buildMetadata, breadcrumbSchema, graph, articleSchema } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  return buildMetadata({ title: `${c.title} | FairBazaar`, description: c.metaDescription, path: `/case-studies/${c.slug}` });
}

export default async function Page({ params }: PageProps<"/case-studies/[slug]">) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();
  const path = `/case-studies/${c.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies" }, { name: c.title, path }];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), articleSchema({ title: c.title, description: c.metaDescription, path, published: "2026-09-01", modified: "2026-09-28", author: "FairBazaar", section: "Case studies", keywords: c.technology }))} />
      <PageHero crumbs={crumbs} eyebrow={`${c.kind} · ${c.industry}`} title={c.title} intro={c.summary} primary={{ label: "Build Something Similar", href: `/contact?intent=project&ref=${c.slug}`, track: `cs_${c.slug}` }} aside={<DashboardMockup variant={c.mockup} />} />

      <section className="py-14 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-12">
            <p className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 text-sm text-slate-600"><Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-500" />{c.kind}: describes approach and expected outcomes; no client-specific data or metrics are claimed.</p>
            <div><h2 className="text-2xl font-bold">The problem</h2><p className="mt-4 text-lg leading-8 text-slate-700">{c.problem}</p></div>
            <div>
              <h2 className="text-2xl font-bold">Business challenge</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">{c.challenge.map((x) => <li key={x} className="card p-4 text-sm text-slate-700">{x}</li>)}</ul>
            </div>
            <div><h2 className="text-2xl font-bold">The solution</h2><p className="mt-4 text-lg leading-8 text-slate-700">{c.solution}</p></div>
            <div>
              <h2 className="text-2xl font-bold">Implementation</h2>
              <ol className="mt-6 space-y-4">
                {c.implementation.map((s, i) => (
                  <Reveal as="li" key={s.phase} delay={i * 60} className="flex gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-500 font-display text-sm font-bold text-white">{i + 1}</span>
                    <div><p className="font-semibold text-ink-900">{s.phase}</p><p className="text-slate-600">{s.text}</p></div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="card p-6">
              <h2 className="text-lg font-semibold">Technology</h2>
              <ul className="mt-4 flex flex-wrap gap-2">{c.technology.map((t) => <li key={t} className="rounded-full bg-surface px-3 py-1.5 text-sm ring-1 ring-line">{t}</li>)}</ul>
            </div>
            <div className="card p-6">
              <h2 className="text-lg font-semibold">Key features</h2>
              <ul className="mt-4 space-y-2">{c.features.map((f) => <li key={f} className="flex items-center gap-2 text-sm"><CheckCircle2 aria-hidden="true" className="size-4 text-mint-500" />{f}</li>)}</ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-24" aria-labelledby="ba">
        <div className="container-x">
          <SectionHeader eyebrow="Workflow" title={<span id="ba">Before and after</span>} />
          <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
            <div className="card p-6"><h3 className="font-semibold text-coral-400">Before</h3><ul className="mt-4 space-y-3">{c.before.map((b) => <li key={b} className="flex gap-2 text-sm"><XCircle aria-hidden="true" className="size-4 shrink-0 text-coral-400" />{b}</li>)}</ul></div>
            <div className="flex items-center justify-center"><ArrowRight aria-hidden="true" className="size-8 rotate-90 text-brand-400 lg:rotate-0" /></div>
            <div className="card border-mint-400/40 p-6"><h3 className="font-semibold text-mint-600">After</h3><ul className="mt-4 space-y-3">{c.after.map((b) => <li key={b} className="flex gap-2 text-sm"><CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-mint-500" />{b}</li>)}</ul></div>
          </div>
        </div>
      </section>

      <section className="section-dark relative overflow-hidden py-16 sm:py-24" aria-labelledby="arch">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div className="container-x relative grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader dark align="left" eyebrow="Architecture" title={<span id="arch">How it fits together</span>} />
            <div className="mt-8 space-y-3">
              {c.architecture.map((l) => (
                <div key={l.layer} className="glass rounded-2xl p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mint-300">{l.layer}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">{l.items.map((it) => <li key={it} className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white">{it}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Expected outcomes</h2>
            <ul className="mt-6 space-y-3">{c.outcomes.map((o) => <li key={o} className="flex gap-3 text-slate-200"><CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-mint-400" />{o}</li>)}</ul>
            <div className="mt-8"><DashboardMockup variant={c.mockup} compact /></div>
          </div>
        </div>
      </section>

      <RelatedEntities services={c.relatedServices} products={c.relatedProducts} />
      <CTASection title="Build Something Similar" primary={{ label: "Build Something Similar", href: `/contact?intent=project&ref=${c.slug}` }} track={`cs_${c.slug}_bottom`} />
    </>
  );
}
