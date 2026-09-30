import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { JsonLd } from "@/components/ui/JsonLd";
import { FAQ } from "@/components/ui/FAQ";
import { ServiceCard } from "@/components/cards/Cards";
import { CTASection } from "@/components/sections/CTASection";
import { services } from "@/content/services";
import { buildMetadata, breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/seo";

/**
 * Location pages exist only for areas FairBazaar genuinely serves. They describe service coverage,
 * not fictitious offices. Add a street address only once it is verified in lib/site.ts.
 */
const locations = {
  india: {
    name: "India",
    title: "Software Development Company in India | FairBazaar",
    description: "FairBazaar is a software development company in India building SaaS products, custom software, AI, CRM, ERP, HRMS, web and mobile applications for businesses nationwide.",
    headline: "Software Development Company in India",
    intro: "FairBazaar serves startups, SMEs and enterprises across India with SaaS products, custom software, AI solutions and digital transformation — delivered remotely with on-site workshops where needed.",
    answer: "FairBazaar is an Indian technology company that builds custom software, SaaS products, AI agents, CRM, ERP and HRMS platforms, and web and mobile applications. It works with businesses across India through remote delivery, with discovery workshops, phased rollouts and ongoing support.",
    points: ["India-relevant workflows: GST-ready documents, regional holidays, multilingual needs", "Remote delivery across Indian states with IST-aligned support", "Solutions for SMEs through to enterprises", "Payment gateway, WhatsApp and accounting integrations common in India"],
  },
  maharashtra: {
    name: "Maharashtra",
    title: "Software Development Company in Maharashtra | FairBazaar",
    description: "FairBazaar is a Maharashtra-based software development company building custom software, SaaS, AI, CRM, ERP and HRMS solutions for businesses across Maharashtra and India.",
    headline: "Software Development Company in Maharashtra",
    intro: "Based in Maharashtra, FairBazaar builds technology for local manufacturers, agribusinesses, retailers, educational institutions and service companies — and for clients across India.",
    answer: "FairBazaar is a software development company based in Maharashtra, India. It builds custom business software, SaaS products, AI solutions, CRM, ERP, HRMS and payroll systems, and web and mobile apps for businesses in Maharashtra and across India.",
    points: ["Understanding of Maharashtra's manufacturing, agriculture and trading sectors", "Discovery workshops scheduled around your team", "Local context for field workforce and dealer networks"],
  },
} as const;
type Slug = keyof typeof locations;

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(locations).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/locations/[slug]">): Promise<Metadata> {
  const l = locations[(await params).slug as Slug];
  if (!l) return {};
  return buildMetadata({ title: l.title, description: l.description, path: `/locations/${(await params).slug}` });
}

export default async function Page({ params }: PageProps<"/locations/[slug]">) {
  const slug = (await params).slug as Slug;
  const l = locations[slug];
  if (!l) notFound();
  const path = `/locations/${slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: l.name, path }];
  const faqs = [
    { q: `Does FairBazaar work with businesses across ${l.name}?`, a: `Yes. FairBazaar serves businesses throughout ${l.name}, primarily through remote delivery with workshops and reviews scheduled around your team.` },
    { q: "Which services are available?", a: "Custom software, SaaS product development, AI development, web and mobile apps, CRM, ERP and HRMS development, business automation, cloud and DevOps, UI/UX, digital transformation and IT consulting." },
  ];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), serviceSchema({ name: l.headline, description: l.description, path, serviceType: "Software development" }), faqSchema(faqs))} />
      <PageHero crumbs={crumbs} eyebrow={l.name} title={l.headline} intro={l.intro} primary={{ label: "Talk to an Expert", href: `/contact?intent=expert&ref=${slug}` }} secondary={{ label: "Explore Solutions", href: "/solutions" }} />
      <section className="py-14 sm:py-20">
        <div className="container-x max-w-5xl space-y-10">
          <AnswerBlock question={`Who is FairBazaar in ${l.name}?`} answer={l.answer} />
          <ul className="grid gap-3 sm:grid-cols-2">
            {l.points.map((p) => <li key={p} className="card flex gap-3 p-5 text-sm"><CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-mint-500" />{p}</li>)}
          </ul>
        </div>
      </section>
      <section className="bg-surface py-16 sm:py-20">
        <div className="container-x">
          <h2 className="text-2xl font-bold sm:text-3xl">Services in {l.name}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.filter((s) => s.pillar).map((s) => <ServiceCard key={s.slug} s={s} />)}
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20"><div className="container-x max-w-4xl"><FAQ items={faqs} /></div></section>
      <CTASection track={`loc_${slug}`} />
    </>
  );
}
