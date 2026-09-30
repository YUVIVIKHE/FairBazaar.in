import Link from "next/link";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ } from "@/components/ui/FAQ";
import { JsonLd } from "@/components/ui/JsonLd";
import { IconTile, Icon } from "@/components/ui/Icon";
import { MediaSlot, AbstractArt } from "@/components/ui/MediaSlot";
import { CTASection } from "@/components/sections/CTASection";
import { RelatedEntities, RelatedCaseStudies } from "@/components/sections/Related";
import { caseStudies } from "@/content/case-studies";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/seo";
import type { Industry } from "@/content/types";

export function IndustryTemplate({ i }: { i: Industry }) {
  const path = `/industries/${i.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }, { name: i.name, path }];
  const cs = caseStudies.filter((c) => c.relatedServices.some((s) => i.relatedServices.includes(s)) || c.relatedProducts.some((p) => i.relatedProducts.includes(p)));

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), serviceSchema({ name: `${i.name} software solutions`, description: i.metaDescription, path, serviceType: `${i.name} software development`, offers: i.solutions.map((s) => s.title) }), faqSchema(i.faqs))} />
      <PageHero
        crumbs={crumbs}
        eyebrow={`${i.name} solutions`}
        title={i.headline}
        intro={i.intro}
        primary={{ label: "Talk to an Expert", href: `/contact?intent=expert&industry=${i.slug}`, track: `ind_${i.slug}_expert` }}
        secondary={{ label: "Request a Demo", href: `/contact?intent=demo&industry=${i.slug}` }}
        aside={
          <MediaSlot id={`industry-${i.slug}`} className="aspect-[4/3] ring-1 ring-white/10" priority fallback={
            <>
              <AbstractArt seed={i.slug} />
              <span className="absolute inset-0 flex items-center justify-center"><span className="glass flex size-24 items-center justify-center rounded-3xl text-mint-300"><Icon name={i.icon} className="size-10" /></span></span>
            </>
          } />
        }
      />

      <section className="py-14 sm:py-20">
        <div className="container-x max-w-5xl"><AnswerBlock question={i.answer.question} answer={i.answer.text} /></div>
      </section>

      <section className="pb-16 sm:pb-24" aria-labelledby="challenges">
        <div className="container-x">
          <SectionHeader eyebrow="Industry challenges" title={<span id="challenges">What holds {i.name.toLowerCase()} businesses back</span>} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {i.challenges.map((c, n) => (
              <Reveal key={c.title} delay={n * 60} className="card h-full p-6">
                <span className="font-display text-sm font-bold text-coral-400">0{n + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark relative overflow-hidden py-16 sm:py-24" aria-labelledby="solutions">
        <div aria-hidden="true" className="bg-aurora absolute inset-0 opacity-70" />
        <div className="container-x relative">
          <SectionHeader dark eyebrow="Solutions" title={<span id="solutions">How FairBazaar helps</span>} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {i.solutions.map((s, n) => {
              const inner = (
                <>
                  <h3 className="flex items-center justify-between text-lg font-semibold text-white">{s.title}{s.href && <ArrowUpRight aria-hidden="true" className="size-5 text-mint-300" />}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{s.text}</p>
                </>
              );
              return (
                <Reveal key={s.title} delay={n * 60}>
                  {s.href ? <Link href={s.href} className="glass block h-full rounded-2xl p-6 transition hover:border-white/25">{inner}</Link> : <div className="glass h-full rounded-2xl p-6">{inner}</div>}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24" aria-labelledby="features">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader align="left" eyebrow="Features" title={<span id="features">Capabilities built for {i.name.toLowerCase()}</span>} />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {i.features.map((f) => <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700"><CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-mint-500" />{f}</li>)}
            </ul>
            <h3 className="mt-10 text-lg font-semibold">Technology</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {i.technology.map((t) => <li key={t} className="rounded-full bg-surface px-3 py-1.5 text-sm text-slate-700 ring-1 ring-line">{t}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">A connected {i.name.toLowerCase()} workflow</h2>
            <ol className="relative mt-8 space-y-4 border-l border-brand-100 pl-6">
              {i.workflow.map((w, n) => (
                <Reveal as="li" key={w} delay={n * 60} className="relative">
                  <span className="absolute -left-[33px] top-0.5 flex size-4 items-center justify-center rounded-full bg-brand-500 ring-4 ring-brand-50" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Step {n + 1}</span>
                  <p className="font-medium text-ink-900">{w}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-24" aria-labelledby="usecases">
        <div className="container-x">
          <SectionHeader eyebrow="Use cases" title={<span id="usecases">Where it applies</span>} />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {i.useCases.map((u) => (
              <div key={u.title} className="card h-full p-6">
                <IconTile name={i.icon} className="size-10" />
                <h3 className="mt-4 text-lg font-semibold">{u.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{u.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-2xl border border-mint-400/30 bg-white p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Benefits</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {i.benefits.map((b) => <li key={b} className="flex items-center gap-2 text-sm font-medium text-ink-900"><CheckCircle2 aria-hidden="true" className="size-4 text-mint-500" />{b}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <RelatedCaseStudies items={cs} />
      <RelatedEntities services={i.relatedServices} products={i.relatedProducts} title={`Services & products for ${i.name.toLowerCase()}`} />

      <section className="bg-surface py-16 sm:py-24" aria-labelledby="faq">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader align="left" eyebrow="FAQ" title={<span id="faq">{i.name} software FAQs</span>} />
          <FAQ items={i.faqs} />
        </div>
      </section>
      <CTASection title={`Transform Your ${i.name} Operations`} text={`Tell us about your ${i.name.toLowerCase()} workflows and we'll suggest a practical, phased solution.`} track={`ind_${i.slug}_bottom`} />
    </>
  );
}
