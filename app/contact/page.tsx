import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Phone, MessageCircle, MapPin, Clock, ShieldCheck, CalendarDays } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { FAQ } from "@/components/ui/FAQ";
import { buildMetadata, breadcrumbSchema, faqSchema, graph } from "@/lib/seo";
import { site, hasAddress, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact FairBazaar | Talk to a Technology Expert",
  description: "Talk to a FairBazaar technology expert about custom software, SaaS, AI, CRM, ERP, HRMS, web or mobile development. Book a free consultation or request a product demo.",
  path: "/contact",
});

const faqs = [
  { q: "What happens after I submit the form?", a: "A FairBazaar expert reviews your requirements and contacts you to schedule a discovery call, usually focusing on your goals, current process and constraints." },
  { q: "Is the first consultation free?", a: "Yes. The initial consultation to understand your needs and suggest an approach is free." },
  { q: "Can you sign an NDA?", a: "Yes. We're happy to sign a mutual NDA before you share confidential details." },
];

export default function Page() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }];
  const c = site.contact;
  const booking = process.env.NEXT_PUBLIC_BOOKING_URL;
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), faqSchema(faqs), { "@type": "ContactPage", name: "Contact FairBazaar", url: absoluteUrl("/contact"), about: { "@id": `${site.url}/#organization` } })} />
      <PageHero crumbs={crumbs} eyebrow="Contact" title={<>Talk to a <span className="text-gradient">Technology Expert</span></>} intro="Tell us about your business challenge. We'll respond with clear next steps — no hard sell." compact />
      <section className="py-14 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="card p-6 sm:p-10">
            <h2 className="text-2xl font-bold">Tell us about your project</h2>
            <p className="mt-2 text-slate-600">Fields marked * are required.</p>
            <div className="mt-8">
              <Suspense fallback={<div className="h-[640px] animate-pulse rounded-2xl bg-surface" aria-label="Loading form" />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="section-dark relative overflow-hidden rounded-2xl p-6">
              <div aria-hidden="true" className="bg-aurora absolute inset-0" />
              <div className="relative">
                <h2 className="text-lg font-bold">What to expect</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  <li className="flex gap-3"><Clock aria-hidden="true" className="size-4 shrink-0 text-mint-400" />A response from a technology expert, not a sales script</li>
                  <li className="flex gap-3"><CalendarDays aria-hidden="true" className="size-4 shrink-0 text-mint-400" />A free discovery call at a time that suits you</li>
                  <li className="flex gap-3"><ShieldCheck aria-hidden="true" className="size-4 shrink-0 text-mint-400" />Confidentiality — NDA available on request</li>
                </ul>
              </div>
            </div>
            <div className="card p-6">
              <h2 className="text-lg font-bold">Reach us directly</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {c.email && <li><a href={`mailto:${c.email}`} className="flex items-center gap-3 hover:text-brand-600"><Mail aria-hidden="true" className="size-4 text-brand-500" />{c.email}</a></li>}
                {c.phone && <li><a href={`tel:${c.phone}`} className="flex items-center gap-3 hover:text-brand-600"><Phone aria-hidden="true" className="size-4 text-brand-500" />{c.phone}</a></li>}
                {c.whatsapp && <li><a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-brand-600"><MessageCircle aria-hidden="true" className="size-4 text-brand-500" />Chat on WhatsApp</a></li>}
                <li className="flex items-start gap-3"><MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-500" />{hasAddress ? `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, India` : `${site.address.region}, India — serving clients across India and worldwide`}</li>
              </ul>
              {!c.email && !c.phone && <p className="mt-4 text-xs text-slate-500">The fastest way to reach us is the form — it goes straight to our team.</p>}
            </div>
            {booking && (
              <div className="card overflow-hidden">
                <h2 className="p-6 pb-0 text-lg font-bold">Book a free consultation</h2>
                <iframe src={booking} title="Book a consultation with FairBazaar" loading="lazy" className="mt-4 h-[640px] w-full border-0" />
              </div>
            )}
          </aside>
        </div>
      </section>
      <section className="bg-surface py-16 sm:py-20">
        <div className="container-x max-w-4xl"><h2 className="mb-6 text-2xl font-bold">Before you get in touch</h2><FAQ items={faqs} /></div>
      </section>
    </>
  );
}
