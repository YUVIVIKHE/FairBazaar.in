import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { IconTile } from "@/components/ui/Icon";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { JsonLd } from "@/components/ui/JsonLd";
import { Button } from "@/components/ui/Button";
import { buildMetadata, breadcrumbSchema, graph } from "@/lib/seo";
import { site } from "@/lib/site";
import type { IconName } from "@/content/types";

export const metadata: Metadata = buildMetadata({
  title: "Careers at FairBazaar | Software, AI & Product Roles",
  description: "Build SaaS products, AI solutions and custom software that transform businesses. Explore careers at FairBazaar in engineering, AI, design and product.",
  path: "/careers",
});

/** Add real openings here. JobPosting schema is emitted automatically for each role. */
const openings: { title: string; team: string; location: string; type: string; description: string; posted: string }[] = [];

const perks: { icon: IconName; title: string; text: string }[] = [
  { icon: "rocket", title: "Real products", text: "Work on SaaS products and client platforms used every day." },
  { icon: "brain", title: "AI-native work", text: "Build with LLMs, RAG and agents in production settings." },
  { icon: "trending", title: "Grow fast", text: "Ownership, mentorship and exposure to the full product lifecycle." },
  { icon: "users", title: "Collaborative team", text: "Engineers, designers and business analysts working side by side." },
];

export default function Page() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }];
  const jobs = openings.map((o) => ({ "@type": "JobPosting", title: o.title, description: o.description, datePosted: o.posted, employmentType: o.type, hiringOrganization: { "@id": `${site.url}/#organization` }, jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressRegion: site.address.region, addressCountry: "IN" } } }));
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), ...jobs)} />
      <PageHero crumbs={crumbs} eyebrow="Careers" title={<>Build technology that <span className="text-gradient">transforms businesses</span></>} intro="Join a team building SaaS products, AI solutions and custom platforms for organisations across India and beyond." aside={<MediaSlot id="office-culture" className="aspect-[4/3]" priority />} />
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHeader eyebrow="Why join" title="Do the best work of your career" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 60} className="card h-full p-6"><IconTile name={p.icon} /><h3 className="mt-5 text-lg font-semibold">{p.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{p.text}</p></Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-surface py-16 sm:py-24" aria-labelledby="open">
        <div className="container-x max-w-4xl">
          <h2 id="open" className="text-3xl font-bold">Open positions</h2>
          {openings.length ? (
            <ul className="mt-8 space-y-3">
              {openings.map((o) => (
                <li key={o.title} className="card flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
                  <div><h3 className="text-lg font-semibold">{o.title}</h3><p className="text-sm text-slate-500">{o.team} · {o.location} · {o.type}</p></div>
                  <Button href={`/contact?intent=careers&role=${encodeURIComponent(o.title)}`} variant="secondary">Apply</Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-line bg-white p-8 text-center">
              <p className="text-lg font-semibold text-ink-900">No open positions right now</p>
              <p className="mt-2 text-slate-600">We're always glad to hear from talented engineers, AI specialists and designers. Introduce yourself and we'll reach out when a suitable role opens.</p>
              <div className="mt-6"><Button href="/contact?intent=careers" arrow>Send an introduction</Button></div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
