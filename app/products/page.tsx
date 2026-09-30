import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/cards/Cards";
import { CTASection } from "@/components/sections/CTASection";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BusinessOS } from "@/components/visuals/BusinessOS";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { products } from "@/content/products";
import { buildMetadata, breadcrumbSchema, graph, itemListSchema } from "@/lib/seo";
import { ctas } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "SaaS Products: HRMS, CRM, ERP, AI Agents & Automation | FairBazaar",
  description: "Explore FairBazaar SaaS products — HRMS, CRM, ERP, Lead Management, Inventory, Business Automation, AI Agents and custom business software platforms.",
  path: "/products",
});

export default function Page() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Products", path: "/products" }];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), itemListSchema("FairBazaar products", products.map((p) => ({ name: p.name, path: `/products/${p.slug}` }))))} />
      <PageHero crumbs={crumbs} eyebrow="Products" title={<>Our <span className="text-gradient">SaaS Products</span></>} intro="Configurable platforms for workforce, sales, operations and AI — ready to deploy, built to extend." primary={{ label: ctas.demo.label, href: ctas.demo.href, track: "products_demo" }} secondary={{ label: ctas.primary.label, href: ctas.primary.href }} aside={<MediaSlot id="product-launch" className="aspect-[16/10]" priority />} />
      <section className="py-14 sm:py-20">
        <div className="container-x max-w-5xl">
          <AnswerBlock question="What products does FairBazaar offer?" answer="FairBazaar offers FairBazaar HRMS for attendance, payroll and workforce management, plus configurable platforms for CRM, ERP, lead management, inventory, business automation and AI agents. Each platform is deployed and configured for the client's processes and can be extended with custom modules." />
        </div>
      </section>
      <section className="pb-16 sm:pb-24">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => <Reveal key={p.slug} delay={(i % 4) * 60}><ProductCard p={p} /></Reveal>)}
        </div>
      </section>
      <section className="section-dark relative overflow-hidden py-16 sm:py-24">
        <div aria-hidden="true" className="bg-aurora absolute inset-0 opacity-60" />
        <div className="container-x relative">
          <SectionHeader dark eyebrow="Connected by design" title="One business operating system" intro="Every FairBazaar product shares identity, permissions and data — so they work as one." />
          <div className="mt-12"><BusinessOS /></div>
        </div>
      </section>
      <CTASection title="Find the Right Platform" text="Tell us your processes and we'll show you the products — and custom modules — that fit." primary={{ label: "Request a Demo", href: ctas.demo.href }} track="products_bottom" />
    </>
  );
}
