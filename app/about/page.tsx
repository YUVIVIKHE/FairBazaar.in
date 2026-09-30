import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { JsonLd } from "@/components/ui/JsonLd";
import { IconTile } from "@/components/ui/Icon";
import { Stats } from "@/components/sections/Shared";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata, breadcrumbSchema, graph } from "@/lib/seo";
import { site, absoluteUrl } from "@/lib/site";
import type { IconName } from "@/content/types";

export const metadata: Metadata = buildMetadata({
  title: "About FairBazaar | SaaS, Custom Software & AI Company",
  description: "FairBazaar is a technology company from Maharashtra, India, building SaaS products, custom software, AI solutions and digital platforms that help businesses operate, automate and grow.",
  path: "/about",
});

const beliefs: { icon: IconName; title: string; text: string }[] = [
  { icon: "compass", title: "Business first", text: "Technology decisions start from workflows, people and outcomes — never from a tool we want to sell." },
  { icon: "shield", title: "Trust by default", text: "Security, privacy and honest communication are built in, not bolted on." },
  { icon: "layers", title: "Build to last", text: "Clean architecture and documentation so systems stay maintainable for years." },
  { icon: "brain", title: "AI where it helps", text: "Practical AI that is grounded, governed and measurable — not hype." },
  { icon: "users", title: "Adoption matters", text: "Software only creates value when teams actually use it." },
  { icon: "scale", title: "Fair by name", text: "Transparent scope, fair pricing and full ownership of what we build for you." },
];

const timeline = [
  { t: "Idea", d: "Understand the business problem and define what success looks like." },
  { t: "Build", d: "Design the architecture and engineer the product in visible sprints." },
  { t: "Launch", d: "Deploy, migrate data, train teams and go live with confidence." },
  { t: "Scale", d: "Monitor, improve and extend as the business grows." },
];

export default function Page() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "About", path: "/about" }];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), { "@type": "AboutPage", name: "About FairBazaar", url: absoluteUrl("/about"), about: { "@id": `${site.url}/#organization` } })} />
      <PageHero crumbs={crumbs} eyebrow="About FairBazaar" title={<>Technology that <span className="text-gradient">transforms businesses</span></>} intro="We're not just a software development company. We build the technology infrastructure that helps businesses operate, automate and grow." primary={{ label: "Talk to an Expert", href: "/contact?intent=expert" }} secondary={{ label: "Careers", href: "/careers" }} aside={<MediaSlot id="about-hero" className="aspect-[4/3]" priority />} />

      <section className="py-16 sm:py-24" aria-labelledby="who">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow">Who we are</span>
            <h2 id="who" className="mt-4 text-3xl font-bold sm:text-4xl">A product and engineering company built around business problems</h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-slate-600">
              <p>FairBazaar is a technology company based in {site.address.region}, India. We build SaaS products such as FairBazaar HRMS, and we design and engineer custom software, AI solutions, CRM, ERP, web and mobile applications for startups, SMEs and enterprises.</p>
              <p>Because we build and run our own products, we bring product thinking to every client engagement: clear scope, strong architecture, attention to usability and a focus on adoption.</p>
            </div>
          </Reveal>
          <Reveal delay={120}><MediaSlot id="team-collab" className="aspect-[4/3]" /></Reveal>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-24" aria-labelledby="mv">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <Reveal className="card p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Our mission</p>
            <h2 id="mv" className="mt-3 text-2xl font-bold">Make powerful business technology accessible to every growing organisation.</h2>
            <p className="mt-4 text-slate-600">We help businesses replace manual work and disconnected tools with connected, intelligent systems — at a scale and budget that fits them.</p>
          </Reveal>
          <Reveal delay={80} className="card p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mint-600">Our vision</p>
            <h2 className="mt-3 text-2xl font-bold">Businesses that run on connected, AI-native operating systems.</h2>
            <p className="mt-4 text-slate-600">A future where sales, operations, people and decisions share one intelligent backbone — and teams spend their time on work that matters.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24" aria-labelledby="believe">
        <div className="container-x">
          <SectionHeader eyebrow="What we believe" title={<span id="believe">Principles that guide every build</span>} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 60} className="card h-full p-6">
                <IconTile name={b.icon} />
                <h3 className="mt-5 text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark relative overflow-hidden py-16 sm:py-24" aria-labelledby="approach">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div className="container-x relative">
          <SectionHeader dark eyebrow="Our approach" title={<span id="approach">Idea → Build → Launch → Scale</span>} />
          <ol className="relative mt-14 grid gap-6 md:grid-cols-4">
            <span aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-brand-500 via-mint-400 to-brand-500 md:block" />
            {timeline.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 100} className="relative">
                <span className="relative z-10 flex size-10 items-center justify-center rounded-full bg-brand-500 font-display font-bold text-white ring-8 ring-ink-950">{i + 1}</span>
                <h3 className="mt-5 text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-24" aria-labelledby="philosophy">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader align="left" eyebrow="Technology philosophy" title={<span id="philosophy">Proven foundations, modern capabilities</span>} />
            <ul className="mt-8 space-y-3 text-slate-700">
              {["Mainstream, well-supported technologies over fashionable ones", "Security, observability and testing from day one", "AI integrated with guardrails, evaluation and human oversight", "Open standards and APIs to avoid lock-in", "Documentation and handover so you're never dependent on us"].map((t) => (
                <li key={t} className="flex gap-3"><CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-mint-500" />{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader align="left" eyebrow="Why FairBazaar" title="Why organisations choose us" />
            <ul className="mt-8 space-y-3 text-slate-700">
              {["Products and custom engineering under one roof", "AI-native team experienced with LLMs, RAG and agents", "Full source-code and data ownership on custom work", "Transparent sprints with working software every iteration", "Support and maintenance after launch"].map((t) => (
                <li key={t} className="flex gap-3"><CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-500" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-24" aria-labelledby="team">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader align="left" eyebrow="Leadership & team" title={<span id="team">Engineers, designers and product thinkers</span>} intro="Our team combines software engineering, AI, product design and business analysis. Leadership profiles will be published here." />
            <p className="mt-6 text-sm text-slate-500">Innovation at FairBazaar means continuously investing in our own products and in AI capabilities, then bringing those learnings to every client.</p>
          </div>
          <MediaSlot id="software-dev" className="aspect-[16/10]" />
        </div>
        <div className="container-x mt-16"><Stats /></div>
      </section>
      <CTASection />
    </>
  );
}
