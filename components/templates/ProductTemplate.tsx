import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ } from "@/components/ui/FAQ";
import { JsonLd } from "@/components/ui/JsonLd";
import { IconTile } from "@/components/ui/Icon";
import { Tilt } from "@/components/ui/Tilt";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { CTASection } from "@/components/sections/CTASection";
import { RelatedEntities, RelatedPosts, RelatedCaseStudies } from "@/components/sections/Related";
import { DashboardMockup } from "@/components/visuals/DashboardMockup";
import { HRMSTour } from "@/components/visuals/HRMSTour";
import { PhoneMockup } from "@/components/visuals/PhoneMockup";
import { caseStudies } from "@/content/case-studies";
import { videos } from "@/content/media";
import { getPostsBySlugs, toMeta } from "@/lib/blog";
import { breadcrumbSchema, faqSchema, graph, softwareSchema } from "@/lib/seo";
import type { Product } from "@/content/types";

const productVideo: Record<string, string> = { hrms: "hrms-product", crm: "crm-product", "ai-agents": "ai-explainer" };
const envMedia: Record<string, string> = { hrms: "hrms-environment", crm: "crm-environment", erp: "erp-visual" };

export function ProductTemplate({ p }: { p: Product }) {
  const path = `/products/${p.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: p.name, path }];
  const posts = getPostsBySlugs(p.relatedPosts).map(toMeta);
  const cs = caseStudies.filter((c) => c.relatedProducts.includes(p.slug));
  const vid = productVideo[p.slug] ? videos[productVideo[p.slug]] : undefined;
  const demoHref = `/contact?intent=demo&product=${p.slug}`;

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), softwareSchema({ name: p.name, description: p.metaDescription, path, category: p.category, features: p.modules.map((m) => m.title) }), faqSchema(p.faqs))} />
      <PageHero
        crumbs={crumbs}
        eyebrow={`${p.name} · ${p.status === "available" ? "Available now" : "Deployed per client"}`}
        title={p.headline}
        intro={p.intro}
        primary={{ label: p.slug === "hrms" ? "Request an HRMS Demo" : "Request a Demo", href: demoHref, track: `demo_${p.slug}_hero` }}
        secondary={{ label: "Talk to an Expert", href: `/contact?intent=expert&product=${p.slug}` }}
        aside={<Tilt max={4}><DashboardMockup variant={p.mockup} /></Tilt>}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {p.highlights.map((h) => <li key={h} className="glass rounded-full px-3 py-1.5 text-xs font-medium text-slate-200">{h}</li>)}
        </ul>
      </PageHero>

      <section className="py-14 sm:py-20">
        <div className="container-x max-w-5xl"><AnswerBlock question={p.answer.question} answer={p.answer.text} /></div>
      </section>

      <section className="pb-16 sm:pb-24" aria-labelledby="modules">
        <div className="container-x">
          <SectionHeader eyebrow="Modules" title={<span id="modules">Everything in one platform</span>} intro={`${p.name} modules work together on one data model — no duplicate entry, no disconnected tools.`} />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {p.modules.map((m, i) => (
              <Reveal key={m.title} delay={(i % 4) * 50} className="card card-hover h-full p-5">
                <IconTile name={m.icon} className="size-10" />
                <h3 className="mt-4 text-base font-semibold">{m.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">{m.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark noise relative overflow-hidden py-16 sm:py-24" aria-labelledby="flow">
        <div aria-hidden="true" className="bg-aurora absolute inset-0 opacity-80" />
        {envMedia[p.slug] && <div aria-hidden="true" className="absolute inset-0 opacity-20"><MediaSlot id={envMedia[p.slug]} rounded="rounded-none" className="h-full w-full" sizes="100vw" /></div>}
        <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <SectionHeader dark align="left" eyebrow="How it works" title={<span id="flow">From action to insight, automatically</span>} />
            <ol className="mt-8 space-y-3">
              {p.workflow.map((w, i) => (
                <Reveal as="li" key={w} delay={i * 60} className="flex items-center gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-mint-400/15 font-display text-xs font-bold text-mint-300 ring-1 ring-mint-400/30">{i + 1}</span>
                  <span className="text-slate-200">{w}</span>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal delay={100}>
            {vid?.ready ? <MediaSlot id={vid.id} className="aspect-video" /> : p.slug === "hrms" ? <HRMSTour /> : (
              <div className="flex items-end justify-center gap-6">
                <DashboardMockup variant={p.mockup} className="hidden flex-1 sm:block" compact />
                <PhoneMockup screen={p.slug === "hrms" ? "attendance" : p.slug === "inventory-management" || p.slug === "erp" ? "orders" : "field"} />
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24" aria-labelledby="roles">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader align="left" eyebrow="Built for every role" title={<span id="roles">The right view for everyone</span>} />
            <div className="mt-8 space-y-3">
              {p.roles.map((r) => (
                <div key={r.role} className="card p-5">
                  <h3 className="text-base font-semibold">{r.role}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Deployment & support</h2>
            <ul className="mt-6 space-y-3">
              {p.deployment.map((d) => <li key={d} className="flex items-start gap-3"><CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-mint-500" />{d}</li>)}
              <li className="flex items-start gap-3"><CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-mint-500" />Role-based access, audit logs and encrypted data in transit</li>
              <li className="flex items-start gap-3"><CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-mint-500" />Custom modules available through our development team</li>
            </ul>
            <p className="mt-6 text-sm text-slate-500">Read about our <a href="/security" className="text-brand-600 underline underline-offset-4">security practices</a> and <a href="/subscription-terms" className="text-brand-600 underline underline-offset-4">subscription terms</a>.</p>
          </div>
        </div>
      </section>

      <RelatedCaseStudies items={cs} />
      <RelatedEntities services={p.relatedServices} industries={p.relatedIndustries} title={`${p.shortName} for your industry`} />

      <section className="bg-surface py-16 sm:py-24" aria-labelledby="faq">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader align="left" eyebrow="FAQ" title={<span id="faq">{p.name} FAQs</span>} />
          <FAQ items={p.faqs} />
        </div>
      </section>

      <RelatedPosts posts={posts} />
      <CTASection
        title={p.slug === "hrms" ? "See FairBazaar HRMS in Action" : `See ${p.name} in Action`}
        text="Book a personalised walkthrough configured around your organisation's processes."
        primary={{ label: p.slug === "hrms" ? "Request an HRMS Demo" : "Request a Demo", href: demoHref }}
        secondary={{ label: "Talk to an Expert", href: `/contact?intent=expert&product=${p.slug}` }}
        track={`demo_${p.slug}_bottom`}
      />
    </>
  );
}
