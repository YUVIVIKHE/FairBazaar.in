import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/cards/Cards";
import { ProcessSteps } from "@/components/sections/Shared";
import { CTASection } from "@/components/sections/CTASection";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { JsonLd } from "@/components/ui/JsonLd";
import { services } from "@/content/services";
import { buildMetadata, breadcrumbSchema, graph, itemListSchema } from "@/lib/seo";
import { ctas } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Software Development & IT Services | FairBazaar",
  description: "Custom software, SaaS, AI, web and mobile development, CRM, ERP and HRMS development, business automation, cloud & DevOps, UI/UX, digital transformation and IT consulting services.",
  path: "/services",
});

const groups = [
  { title: "Build", slugs: ["custom-software-development", "saas-development", "web-development", "mobile-app-development", "ui-ux-design"] },
  { title: "Business platforms", slugs: ["crm-development", "erp-development", "hrms-development"] },
  { title: "Intelligence & automation", slugs: ["ai-development", "business-automation"] },
  { title: "Transform & operate", slugs: ["digital-transformation", "cloud-devops", "it-consulting"] },
];

export default function Page() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), itemListSchema("FairBazaar services", services.map((s) => ({ name: s.name, path: `/services/${s.slug}` }))))} />
      <PageHero crumbs={crumbs} eyebrow="Services" title={<>Services that take you from <span className="text-gradient">idea to impact</span></>} intro="Strategy, design, engineering, AI and operations — delivered by one accountable team." primary={{ label: ctas.primary.label, href: ctas.primary.href }} secondary={{ label: ctas.project.label, href: ctas.project.href }} />
      <section className="py-14 sm:py-20">
        <div className="container-x max-w-5xl">
          <AnswerBlock question="What services does FairBazaar provide?" answer="FairBazaar provides custom software development, SaaS product development, AI development, web and mobile app development, CRM, ERP and HRMS development, business automation, cloud and DevOps, UI/UX design, digital transformation and IT consulting for startups, SMEs and enterprises in India and worldwide." />
        </div>
      </section>
      {groups.map((g) => (
        <section key={g.title} className="pb-14 sm:pb-20" aria-labelledby={`g-${g.title}`}>
          <div className="container-x">
            <h2 id={`g-${g.title}`} className="text-2xl font-bold">{g.title}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.slugs.map((slug, i) => {
                const s = services.find((x) => x.slug === slug)!;
                return <Reveal key={slug} delay={i * 50}><ServiceCard s={s} /></Reveal>;
              })}
            </div>
          </div>
        </section>
      ))}
      <section className="section-dark relative overflow-hidden py-16 sm:py-24">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div className="container-x relative">
          <SectionHeader dark eyebrow="Our process" title="Discover → Analyze → Design → Develop → Test → Deploy → Scale" />
          <div className="mt-12"><ProcessSteps dark steps={services[0].process} /></div>
        </div>
      </section>
      <CTASection title="Discuss Your Project" text="Not sure which service fits? Describe the problem — we'll recommend the right mix." primary={{ label: "Discuss Your Project", href: ctas.project.href }} track="services_bottom" />
    </>
  );
}
