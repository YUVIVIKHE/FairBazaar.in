import { AlertCircle, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ } from "@/components/ui/FAQ";
import { JsonLd } from "@/components/ui/JsonLd";
import { IconTile } from "@/components/ui/Icon";
import { ProcessSteps } from "@/components/sections/Shared";
import { CTASection } from "@/components/sections/CTASection";
import { RelatedEntities, RelatedPosts, RelatedCaseStudies } from "@/components/sections/Related";
import { DashboardMockup } from "@/components/visuals/DashboardMockup";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { caseStudies } from "@/content/case-studies";
import { getPostsBySlugs, toMeta } from "@/lib/blog";
import { breadcrumbSchema, faqSchema, graph, howToSchema, serviceSchema } from "@/lib/seo";
import type { Service, Product } from "@/content/types";

const heroMockup: Record<string, Product["mockup"]> = {
  "ai-development": "ai", "crm-development": "crm", "erp-development": "erp", "hrms-development": "hrms",
  "business-automation": "automation", "saas-development": "custom", "custom-software-development": "custom",
  "digital-transformation": "erp", "web-development": "leads", "ui-ux-design": "hrms", "it-consulting": "custom",
};
const heroMedia: Record<string, string> = { "cloud-devops": "cloud-infra", "mobile-app-development": "mobile-mockups" };

export function ServiceTemplate({ s }: { s: Service }) {
  const path = `/services/${s.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.name, path }];
  const posts = getPostsBySlugs(s.relatedPosts).map(toMeta);
  const cs = caseStudies.filter((c) => c.relatedServices.includes(s.slug));
  const mock = heroMockup[s.slug];
  const mediaId = heroMedia[s.slug];

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(crumbs),
          serviceSchema({ name: s.name, description: s.metaDescription, path, offers: s.offerings.map((o) => o.title) }),
          faqSchema(s.faqs),
          howToSchema(`How FairBazaar delivers ${s.name.toLowerCase()}`, s.process),
        )}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={s.pillar ? "Core service" : "Service"}
        title={<><span className="mb-3 block font-sans text-base font-semibold uppercase tracking-[0.14em] text-mint-300 sm:text-lg">{s.name}</span>{s.headline}</>}
        intro={s.intro}
        primary={{ label: "Talk to an Expert", href: `/contact?intent=expert&service=${s.slug}`, track: `svc_${s.slug}_expert` }}
        secondary={{ label: "Book a Free Consultation", href: `/contact?intent=consultation&service=${s.slug}` }}
        aside={mock ? <DashboardMockup variant={mock} className="lg:rotate-[-1deg]" /> : mediaId ? <MediaSlot id={mediaId} className="aspect-[4/3]" priority /> : undefined}
      />

      <section className="py-14 sm:py-20">
        <div className="container-x max-w-5xl"><AnswerBlock question={s.answer.question} answer={s.answer.text} /></div>
      </section>

      <section className="pb-16 sm:pb-24" aria-labelledby="problems">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionHeader align="left" eyebrow="The challenge" title={<span id="problems">Sound familiar?</span>} intro={`Common signs a business needs ${s.name.toLowerCase()}.`} />
          <ul className="grid gap-3 sm:grid-cols-2">
            {s.problems.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 60} className="card flex gap-3 p-5">
                <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-coral-400" />
                <span className="text-sm leading-6 text-slate-700">{p}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-24" aria-labelledby="offer">
        <div className="container-x">
          <SectionHeader eyebrow="What we deliver" title={<span id="offer">{s.name} services</span>} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.offerings.map((o, i) => (
              <Reveal key={o.title} delay={(i % 3) * 60} className="card card-hover h-full p-6">
                <IconTile name={s.icon} />
                <h3 className="mt-5 text-lg font-semibold">{o.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{o.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark relative overflow-hidden py-16 sm:py-24" aria-labelledby="process">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div className="container-x relative">
          <SectionHeader dark eyebrow="Process" title={<span id="process">How we deliver</span>} intro="A transparent process with working software at every step." />
          <div className="mt-12"><ProcessSteps dark steps={s.process} /></div>
        </div>
      </section>

      <section className="py-16 sm:py-24" aria-labelledby="outcomes">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader align="left" eyebrow="Outcomes" title={<span id="outcomes">What changes for your business</span>} />
            <ul className="mt-8 space-y-3">
              {s.outcomes.map((o) => <li key={o} className="flex items-start gap-3 text-base text-slate-700"><CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-mint-500" />{o}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Technology we use</h2>
            <p className="mt-3 text-slate-600">Chosen for reliability, performance and long-term maintainability — see our <a className="font-medium text-brand-600 underline underline-offset-4" href="/technology">technology ecosystem</a>.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {s.technologies.map((t) => <li key={t} className="rounded-full bg-surface px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-line">{t}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <RelatedCaseStudies items={cs} />
      <RelatedEntities products={s.relatedProducts} industries={s.relatedIndustries} title="Related products & industries" />

      <section className="bg-surface py-16 sm:py-24" aria-labelledby="faq">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader align="left" eyebrow="FAQ" title={<span id="faq">{s.name} FAQs</span>} />
          <FAQ items={s.faqs} />
        </div>
      </section>

      <RelatedPosts posts={posts} title={`Learn more about ${s.name.toLowerCase()}`} />
      <CTASection title="Let's Discuss Your Project" text={`Tell us what you need from ${s.name.toLowerCase()}. We'll respond with clear next steps, a suggested approach and an honest view of scope.`} primary={{ label: "Discuss Your Project", href: `/contact?intent=project&service=${s.slug}` }} track={`svc_${s.slug}_bottom`} />
    </>
  );
}
