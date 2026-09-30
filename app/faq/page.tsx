import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FAQ } from "@/components/ui/FAQ";
import { JsonLd } from "@/components/ui/JsonLd";
import { CTASection } from "@/components/sections/CTASection";
import { generalFaqs } from "@/content/faqs";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { buildMetadata, breadcrumbSchema, faqSchema, graph } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQs: Software Development, SaaS, AI, CRM, ERP & HRMS | FairBazaar",
  description: "Answers to common questions about FairBazaar: what we build, custom software timelines and cost, CRM, ERP and HRMS, AI agents, SaaS, mobile apps, cloud and maintenance.",
  path: "/faq",
});

export default function Page() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "FAQs", path: "/faq" }];
  const productFaqs = products.flatMap((p) => p.faqs.slice(0, 2));
  const serviceFaqs = services.filter((s) => s.pillar).flatMap((s) => s.faqs.slice(0, 2));
  const seen = new Set(generalFaqs.map((f) => f.q));
  const uniq = (arr: typeof generalFaqs) => arr.filter((f) => (seen.has(f.q) ? false : (seen.add(f.q), true)));
  const groups = [
    { id: "company", title: "About FairBazaar", items: generalFaqs },
    { id: "services", title: "Services & development", items: uniq(serviceFaqs) },
    { id: "products", title: "Products", items: uniq(productFaqs) },
  ];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), faqSchema(groups.flatMap((g) => g.items)))} />
      <PageHero crumbs={crumbs} eyebrow="FAQs" title={<>Frequently asked <span className="text-gradient">questions</span></>} intro="Clear answers about what FairBazaar builds, how we work and what to expect." compact />
      <div className="container-x grid gap-12 py-14 sm:py-20 lg:grid-cols-[220px_1fr]">
        <nav aria-label="FAQ sections" className="hidden lg:block">
          <ul className="sticky top-28 space-y-2 text-sm">
            {groups.map((g) => <li key={g.id}><a href={`#${g.id}`} className="text-slate-600 hover:text-brand-600">{g.title}</a></li>)}
          </ul>
        </nav>
        <div className="space-y-14">
          {groups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-t`}>
              <h2 id={`${g.id}-t`} className="mb-6 text-2xl font-bold">{g.title}</h2>
              <FAQ items={g.items} />
            </section>
          ))}
        </div>
      </div>
      <CTASection title="Still Have Questions?" text="Talk to a FairBazaar technology expert — we'll give you a straight answer." />
    </>
  );
}
