import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button, TextLink } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/Icon";
import { FAQ } from "@/components/ui/FAQ";
import { Tilt } from "@/components/ui/Tilt";
import { JsonLd } from "@/components/ui/JsonLd";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { CTASection, InlineCTA } from "@/components/sections/CTASection";
import { Stats, CapabilityStrip, ProcessSteps, LogoCloud, Testimonials } from "@/components/sections/Shared";
import { ProductCard, IndustryCard, CaseStudyCard, BlogCard } from "@/components/cards/Cards";
import { DashboardMockup } from "@/components/visuals/DashboardMockup";
import { PhoneMockup } from "@/components/visuals/PhoneMockup";
import { AIFlow } from "@/components/visuals/AIFlow";
import { BusinessOS } from "@/components/visuals/BusinessOS";
import { ArchitectureViz } from "@/components/visuals/ArchitectureViz";
import { HRMSTour } from "@/components/visuals/HRMSTour";
import { products, getProduct } from "@/content/products";
import { industries, featuredIndustrySlugs } from "@/content/industries";
import { caseStudies } from "@/content/case-studies";
import { generalFaqs } from "@/content/faqs";
import { solutionCategories } from "@/content/solutions";
import { techGroups } from "@/content/technology";
import { videos, media } from "@/content/media";
import { getAllPosts, toMeta } from "@/lib/blog";
import { buildMetadata, faqSchema, graph, itemListSchema } from "@/lib/seo";
import type { IconName } from "@/content/types";

export const metadata: Metadata = buildMetadata({
  title: "FairBazaar | SaaS, Custom Software & AI Solutions Company in India",
  description:
    "FairBazaar builds SaaS products, custom software, AI agents, CRM, ERP and HRMS platforms, and web and mobile apps that help businesses automate operations and scale. Talk to an expert.",
  path: "/",
  keywords: ["custom software development company", "software development company India", "SaaS development company", "AI development company", "HRMS software", "CRM software development", "ERP software development"],
});

const capabilities: { icon: IconName; title: string; text: string; href: string }[] = [
  { icon: "code", title: "Custom Software", text: "Platforms designed around your workflows.", href: "/services/custom-software-development" },
  { icon: "layers", title: "SaaS Products", text: "Multi-tenant products from MVP to scale.", href: "/services/saas-development" },
  { icon: "brain", title: "AI & Automation", text: "Agents, RAG and intelligent workflows.", href: "/services/ai-development" },
  { icon: "boxes", title: "CRM & ERP", text: "Sales, inventory and finance, connected.", href: "/services/erp-development" },
  { icon: "briefcase", title: "HRMS", text: "Attendance, payroll and workforce analytics.", href: "/products/hrms" },
  { icon: "smartphone", title: "Web & Mobile", text: "Fast websites, web apps and mobile apps.", href: "/services/web-development" },
  { icon: "cloud", title: "Cloud & DevOps", text: "Reliable deployments that scale quietly.", href: "/services/cloud-devops" },
  { icon: "compass", title: "Digital Transformation", text: "A phased path from manual to digital.", href: "/services/digital-transformation" },
];

const aiCaps = ["AI Agents", "RAG Systems", "LLM Applications", "Document Intelligence", "AI Customer Support", "AI Sales Assistants", "AI Workflow Automation", "AI Analytics", "AI Content Automation", "Custom AI Solutions"];
const customServices = ["Enterprise Software", "Business Management Systems", "Custom CRM", "Custom ERP", "HRMS", "Inventory Systems", "Booking Systems", "Healthcare Systems", "Education Platforms", "Marketplace Platforms", "Dealer Management", "Industry-specific Software"];
const buildSteps = ["Discover", "Analyze", "Design", "Develop", "Test", "Deploy", "Scale"];
const webServices = ["Corporate Websites", "SaaS Websites", "E-commerce", "Web Applications", "Customer Portals", "Admin Dashboards", "Enterprise Platforms", "Landing Pages", "SEO Websites"];
const mobileServices = ["Android Apps", "iOS Apps", "Cross-platform Apps", "React Native", "Flutter", "Business Apps", "Customer Apps", "Employee Apps", "Marketplace Apps", "Field Workforce Apps"];

const howWeWork = [
  { title: "Understand the business", text: "We start with your workflows, people and goals — not a technology pitch." },
  { title: "Design the architecture", text: "Data, integrations, security and scale planned before code." },
  { title: "Build in visible sprints", text: "Working software every iteration, with full repository access." },
  { title: "Launch and adopt", text: "Deployment, training and data migration so teams actually use it." },
  { title: "Operate and improve", text: "Monitoring, support and a roadmap that grows with you." },
];

export default function HomePage() {
  const hrms = getProduct("hrms")!;
  const posts = getAllPosts().slice(0, 3).map(toMeta);
  const featured = industries.filter((i) => featuredIndustrySlugs.includes(i.slug));
  const homeFaqs = generalFaqs.slice(0, 8);
  const aiVideo = videos["ai-explainer"];
  const companyVideo = videos["company-film"];

  return (
    <>
      <JsonLd data={graph(faqSchema(homeFaqs), itemListSchema("FairBazaar SaaS Products", products.map((p) => ({ name: p.name, path: `/products/${p.slug}` }))))} />
      <Hero />

      {/* 4. Capability strip (honest alternative to a logo wall) */}
      <section aria-label="Capabilities" className="border-b border-line bg-surface py-6">
        <div className="container-x">
          <LogoCloud />
          <CapabilityStrip />
        </div>
      </section>

      {/* 5. Business transformation statement */}
      <section className="py-20 sm:py-28" aria-labelledby="intro-title">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <Reveal>
              <span className="eyebrow">Who we are</span>
              <h2 id="intro-title" className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Technology Solutions Built Around <span className="text-gradient">Your Business</span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                FairBazaar doesn't sell one-size-fits-all software. We understand how your business works, design the technology architecture, build the product and help your organisation digitally transform — end to end.
              </p>
              <p className="mt-4 leading-7 text-slate-600">
                We're not just a software development company. We build the technology infrastructure that helps businesses operate, automate and grow.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/about" variant="secondary" arrow>About FairBazaar</Button>
                <Button href="/contact?intent=consultation" variant="ghost" track="intro_consultation">Book a Free Consultation</Button>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {capabilities.map((c, i) => (
                <Reveal key={c.title} delay={i * 50}>
                  <Link href={c.href} className="card card-hover group flex h-full flex-col p-4 sm:p-5">
                    <IconTile name={c.icon} className="size-10" />
                    <h3 className="mt-4 text-sm font-semibold sm:text-base">{c.title}</h3>
                    <p className="mt-1 hidden text-sm leading-6 text-slate-500 sm:block">{c.text}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="mt-16"><Stats /></div>
        </div>
      </section>

      {/* 6. Solutions overview */}
      <section className="bg-surface py-20 sm:py-28" aria-labelledby="solutions-title">
        <div className="container-x">
          <SectionHeader eyebrow="Solutions" title={<span id="solutions-title">One partner for every layer of your digital business</span>} intro="Choose a ready platform, commission a custom build, or combine both. Every solution connects to the rest of your stack." />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutionCategories.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <Link href={`/solutions#${s.slug}`} className="card card-hover group flex h-full flex-col p-6">
                  <IconTile name={s.icon} />
                  <h3 className="mt-5 text-lg font-semibold">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{s.summary}</p>
                  <p className="mt-4 text-xs text-slate-500">Best for: {s.bestFor}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SaaS products */}
      <section className="py-20 sm:py-28" aria-labelledby="products-title">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeader align="left" eyebrow="Our SaaS Products" title={<span id="products-title">Platforms that run your business</span>} intro="Proven FairBazaar platforms, configured for your processes and extended where you need something unique." />
            <Button href="/products" variant="secondary" arrow>Explore Products</Button>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => <Reveal key={p.slug} delay={(i % 4) * 60}><ProductCard p={p} /></Reveal>)}
          </div>
          <Reveal className="mt-10 grid gap-4 lg:grid-cols-3">
            {(["crm", "erp", "ai"] as const).map((v) => <Tilt key={v}><DashboardMockup variant={v} compact /></Tilt>)}
          </Reveal>
        </div>
      </section>

      {/* 8. HRMS showcase */}
      <section className="section-dark noise relative overflow-hidden py-20 sm:py-28" aria-labelledby="hrms-title">
        <div aria-hidden="true" className="bg-aurora absolute inset-0 opacity-80" />
        <div className="container-x relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-center">
            <Reveal>
              <span className="eyebrow eyebrow-dark">FairBazaar HRMS</span>
              <h2 id="hrms-title" className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">Your Entire Workforce. <span className="text-gradient">One Intelligent Platform.</span></h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">{hrms.intro}</p>
              <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
                {hrms.modules.map((m) => (
                  <li key={m.title} className="flex items-center gap-2 text-slate-300"><CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-mint-400" />{m.title}</li>
                ))}
              </ul>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact?intent=demo&product=hrms" variant="light" size="lg" arrow track="hrms_demo">Request an HRMS Demo</Button>
                <Button href="/products/hrms" variant="outline-light" size="lg">Explore HRMS</Button>
              </div>
            </Reveal>
            <Reveal delay={120}>
              {videos["hrms-product"].ready ? <MediaSlot id="hrms-product" className="aspect-video" /> : <HRMSTour />}
            </Reveal>
          </div>
          <Reveal className="mt-14"><DashboardMockup variant="hrms" /></Reveal>
        </div>
      </section>

      {/* 9. AI & automation */}
      <section className="section-dark relative overflow-hidden border-t border-white/5 py-20 sm:py-28" aria-labelledby="ai-title">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div aria-hidden="true" className="absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
        {media["ai-network"].ready && <div aria-hidden="true" className="absolute inset-0 opacity-25"><MediaSlot id="ai-network" rounded="rounded-none" className="h-full w-full" sizes="100vw" /></div>}
        <div className="container-x relative">
          <SectionHeader dark eyebrow="AI & Automation" title={<span id="ai-title">AI That Works With <span className="text-gradient">Your Business</span></span>} intro="FairBazaar develops AI agents and intelligent automation systems that understand business workflows, documents, customer requests and operational processes — and act inside the systems you already use." />
          <Reveal className="mt-14 rounded-3xl p-6 sm:p-10 glass"><AIFlow /></Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-2">
              {aiCaps.map((c, i) => (
                <Reveal as="li" key={c} delay={i * 40} className="glass flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium text-white">
                  <span className="size-1.5 rounded-full bg-mint-400 shadow-[0_0_8px_#2EE6A6]" />{c}
                </Reveal>
              ))}
            </ul>
            <Reveal delay={100}><DashboardMockup variant="ai" /></Reveal>
          </div>
          <InlineCTA dark text="Have documents, conversations or processes AI could handle?" label="Build Your AI Solution" href="/contact?intent=project&service=ai-development" track="ai_build" />
        </div>
      </section>

      {/* 10. Custom software */}
      <section className="py-20 sm:py-28" aria-labelledby="custom-title">
        <div className="container-x">
          <SectionHeader eyebrow="Custom Software Development" title={<span id="custom-title">Software Built Around <span className="text-gradient">Your Workflow</span></span>} intro="From discovery to scale, we engineer platforms that fit how your organisation really works." />
          <Reveal className="mt-12">
            <ol className="flex flex-wrap items-center justify-center gap-2 sm:gap-3" aria-label="Delivery process">
              {buildSteps.map((s, i) => (
                <li key={s} className="flex items-center gap-2 sm:gap-3">
                  <span className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">{s}</span>
                  {i < buildSteps.length - 1 && <ArrowRight aria-hidden="true" className="size-4 text-brand-300" />}
                </li>
              ))}
            </ol>
          </Reveal>
          <div className="mt-14"><ArchitectureViz /></div>
          <Reveal className="mt-12">
            <ul className="flex flex-wrap justify-center gap-2">
              {customServices.map((s) => <li key={s} className="rounded-full bg-surface px-4 py-2 text-sm text-slate-700 ring-1 ring-line">{s}</li>)}
            </ul>
          </Reveal>
          <InlineCTA text="Have a process no off-the-shelf tool handles well?" label="Discuss Your Project" href="/contact?intent=project" track="custom_discuss" />
        </div>
      </section>

      {/* 11. CRM / ERP */}
      <section className="section-dark relative overflow-hidden py-20 sm:py-28" aria-labelledby="os-title">
        <div aria-hidden="true" className="bg-aurora absolute inset-0 opacity-60" />
        <div className="container-x relative">
          <SectionHeader dark eyebrow="CRM · ERP · Automation" title={<span id="os-title">One Connected <span className="text-gradient">Business Operating System</span></span>} intro="Sales, operations and workflows share one data backbone — so a won deal, a stock movement and an approval are all part of the same story." />
          <div className="mt-14"><BusinessOS /></div>
          <InlineCTA dark text="See how CRM, ERP and automation work together for your business." label="Explore CRM" href="/products/crm" track="crm_explore" />
        </div>
      </section>

      {/* 12. Web & mobile */}
      <section className="py-20 sm:py-28" aria-labelledby="web-title">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow">Web & Mobile</span>
            <h2 id="web-title" className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">Web Experiences Built to <span className="text-gradient">Perform</span></h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">Fast, search-optimised websites and web apps that turn visitors into customers — and mobile apps your customers and field teams rely on every day.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">Web</h3>
                <ul className="mt-3 space-y-2 text-sm">{webServices.map((s) => <li key={s} className="flex items-center gap-2"><CheckCircle2 aria-hidden="true" className="size-4 text-brand-500" />{s}</li>)}</ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">Mobile</h3>
                <ul className="mt-3 space-y-2 text-sm">{mobileServices.map((s) => <li key={s} className="flex items-center gap-2"><CheckCircle2 aria-hidden="true" className="size-4 text-mint-500" />{s}</li>)}</ul>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <TextLink href="/services/web-development">Web development</TextLink>
              <TextLink href="/services/mobile-app-development">Mobile app development</TextLink>
            </div>
          </Reveal>
          <Reveal delay={120} className="relative flex justify-center">
            <div aria-hidden="true" className="absolute inset-10 rounded-full bg-brand-400/25 blur-3xl" />
            <div className="relative flex items-end gap-4 sm:gap-6">
              <PhoneMockup screen="field" className="hidden translate-y-8 sm:block" />
              <PhoneMockup screen="attendance" className="animate-float-slow" />
              <PhoneMockup screen="orders" className="hidden translate-y-8 md:block lg:hidden" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 13. Industries */}
      <section className="bg-surface py-20 sm:py-28" aria-labelledby="ind-title">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeader align="left" eyebrow="Industries" title={<span id="ind-title">Solutions shaped by industry</span>} intro="Every industry has its own workflows, regulations and customers. Our solution blueprints start from that reality." />
            <Button href="/industries" variant="secondary" arrow>All industries</Button>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((i, n) => <Reveal key={i.slug} delay={(n % 3) * 60}><IndustryCard i={i} withImage /></Reveal>)}
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {industries.filter((i) => !featuredIndustrySlugs.includes(i.slug)).map((i) => (
              <li key={i.slug}><Link href={`/industries/${i.slug}`} className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-line hover:text-brand-700 hover:ring-brand-300">{i.name}</Link></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 14. Technology */}
      <section className="py-20 sm:py-28" aria-labelledby="tech-title">
        <div className="container-x">
          <SectionHeader eyebrow="Technology" title={<span id="tech-title">Modern technology, chosen for outcomes</span>} intro="We pick proven technologies for what they deliver: speed, reliability, security and the ability to grow." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techGroups.map((g, i) => (
              <Reveal key={g.slug} delay={(i % 3) * 60} className="card p-6">
                <div className="flex items-center gap-3"><IconTile name={g.icon} className="size-10" /><div><h3 className="text-base font-semibold">{g.name}</h3><p className="text-xs text-slate-500">{g.capability}</p></div></div>
                <ul className="mt-4 flex flex-wrap gap-1.5">{g.items.map((it) => <li key={it.name} className="rounded-md bg-surface px-2 py-1 text-xs text-slate-600">{it.name}</li>)}</ul>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center"><TextLink href="/technology">Explore our technology ecosystem</TextLink></div>
        </div>
      </section>

      {/* 15. How we work */}
      <section className="section-dark relative overflow-hidden py-20 sm:py-28" aria-labelledby="how-title">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div className="container-x relative">
          <SectionHeader dark eyebrow="How we work" title={<span id="how-title">A delivery model built on transparency</span>} />
          <div className="mt-12"><ProcessSteps dark steps={howWeWork} /></div>
        </div>
      </section>

      {/* 16. Case studies */}
      <section className="py-20 sm:py-28" aria-labelledby="cs-title">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeader align="left" eyebrow="Solution stories" title={<span id="cs-title">How we solve real business problems</span>} intro="Reference implementations showing our approach, architecture and expected outcomes." />
            <Button href="/case-studies" variant="secondary" arrow>All case studies</Button>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {caseStudies.map((c, i) => <Reveal key={c.slug} delay={(i % 2) * 60}><CaseStudyCard c={c} /></Reveal>)}
          </div>
          <Testimonials />
          <InlineCTA text="Facing a similar challenge?" label="Build Something Similar" href="/contact?intent=project" track="cs_similar" />
        </div>
      </section>

      {/* 17. AI/SaaS video */}
      <section className="bg-surface py-20 sm:py-28" aria-labelledby="video-title">
        <div className="container-x">
          <SectionHeader eyebrow="See it in motion" title={<span id="video-title">Technology that transforms businesses</span>} intro="Watch how FairBazaar connects AI, SaaS platforms and custom software into one working system." />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[aiVideo, companyVideo].map((v) => (
              <Reveal key={v.id} className="card overflow-hidden p-2">
                {v.ready ? <MediaSlot id={v.id} className="aspect-video" /> : (
                  <MediaSlot id={v.id} className="aspect-video" fallback={
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <div aria-hidden="true" className="bg-aurora absolute inset-0" />
                      {v.id === "ai-explainer" ? <div className="relative w-full max-w-md scale-90"><DashboardMockup variant="ai" compact /></div> : <div className="relative w-full max-w-md scale-90"><DashboardMockup variant="custom" compact /></div>}
                    </div>
                  } />
                )}
                <p className="px-3 pb-2 pt-4 font-semibold text-ink-900">{v.id === "ai-explainer" ? "How FairBazaar AI agents work" : "Inside FairBazaar"}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 18. Blog */}
      <section className="py-20 sm:py-28" aria-labelledby="blog-title">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeader align="left" eyebrow="Insights" title={<span id="blog-title">Knowledge hub</span>} intro="Practical guides on AI, SaaS, software development and digital transformation." />
            <Button href="/blog" variant="secondary" arrow>Visit the blog</Button>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {posts.map((p, i) => <Reveal key={p.slug} delay={i * 60}><BlogCard p={p} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* 19. FAQ */}
      <section className="bg-surface py-20 sm:py-28" aria-labelledby="faq-title">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeader align="left" eyebrow="FAQ" title={<span id="faq-title">Questions, answered</span>} intro="Straight answers about what we build and how we work." />
            <div className="mt-6"><TextLink href="/faq">See all FAQs</TextLink></div>
          </div>
          <FAQ items={homeFaqs} />
        </div>
      </section>

      {/* 20. CTA */}
      <CTASection />
    </>
  );
}
