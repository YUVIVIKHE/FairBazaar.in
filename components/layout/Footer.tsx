import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { CookieSettingsButton } from "./Analytics";
import { site, hasAddress } from "@/lib/site";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { industries } from "@/content/industries";

const cols = [
  { title: "Products", links: products.map((p) => ({ label: p.shortName, href: `/products/${p.slug}` })) },
  { title: "Services", links: services.slice(0, 9).map((s) => ({ label: s.navLabel, href: `/services/${s.slug}` })).concat([{ label: "All services", href: "/services" }]) },
  { title: "Industries", links: industries.slice(0, 9).map((i) => ({ label: i.name, href: `/industries/${i.slug}` })).concat([{ label: "All industries", href: "/industries" }]) },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" }, { label: "Case Studies", href: "/case-studies" }, { label: "Guides", href: "/blog/category/guides" },
      { label: "FAQs", href: "/faq" }, { label: "Technology", href: "/technology" }, { label: "Solutions", href: "/solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" }, { label: "Careers", href: "/careers" }, { label: "Contact", href: "/contact" },
      { label: "Security", href: "/security" }, { label: "Accessibility", href: "/accessibility" },
      { label: "India", href: "/locations/india" }, { label: "Maharashtra", href: "/locations/maharashtra" },
    ],
  },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy-policy" }, { label: "Terms", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-cancellation-policy" }, { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" }, { label: "Data Processing", href: "/data-processing-policy" },
  { label: "Acceptable Use", href: "/acceptable-use-policy" }, { label: "SLA", href: "/sla" },
  { label: "Subscription Terms", href: "/subscription-terms" }, { label: "Sitemap", href: "/sitemap.xml" },
];

// Social links render only when set in lib/site.ts. Simple monogram marks avoid shipping brand icon packs.
const socials = [
  { key: "linkedin", mark: "in", label: "LinkedIn" }, { key: "x", mark: "X", label: "X" }, { key: "youtube", mark: "YT", label: "YouTube" },
  { key: "instagram", mark: "IG", label: "Instagram" }, { key: "github", mark: "GH", label: "GitHub" },
] as const;

export function Footer() {
  const c = site.contact;
  return (
    <footer className="section-dark relative overflow-hidden" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent" />
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <Logo dark />
            <p className="mt-5 text-sm leading-6 text-slate-400">{site.description}</p>
            <div className="mt-8">
              <p className="font-display text-base font-semibold text-white">Get Technology Insights</p>
              <p className="mb-4 mt-1 text-sm text-slate-400">Practical ideas on AI, SaaS and automation. No spam.</p>
              <NewsletterForm />
            </div>
            <ul className="mt-8 space-y-3 text-sm">
              {c.email && <li><a href={`mailto:${c.email}`} className="inline-flex items-center gap-2 hover:text-white"><Mail aria-hidden="true" className="size-4 text-mint-400" />{c.email}</a></li>}
              {c.phone && <li><a href={`tel:${c.phone}`} className="inline-flex items-center gap-2 hover:text-white"><Phone aria-hidden="true" className="size-4 text-mint-400" />{c.phone}</a></li>}
              {c.whatsapp && <li><a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white"><MessageCircle aria-hidden="true" className="size-4 text-mint-400" />WhatsApp</a></li>}
              <li className="inline-flex items-start gap-2">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-mint-400" />
                <span>{hasAddress ? `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, India` : `${site.address.region}, India · Serving clients across India and worldwide`}</span>
              </li>
            </ul>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {cols.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold text-white">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}><Link href={l.href} className="text-sm text-slate-400 transition hover:text-white">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
            {legal.map((l) => <li key={l.href}><Link href={l.href} className="text-slate-400 hover:text-white">{l.label}</Link></li>)}
            <li><CookieSettingsButton className="text-slate-400 hover:text-white" /></li>
          </ul>
          <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">© {new Date().getFullYear()} {site.legalName ?? site.name}. All rights reserved. · {site.tagline}</p>
            <ul className="flex gap-2">
              {socials.map(({ key, mark, label }) => {
                const href = site.social[key];
                if (!href) return null;
                return (
                  <li key={key}>
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`FairBazaar on ${label}`} className="flex size-9 items-center justify-center rounded-full text-slate-400 ring-1 ring-white/10 hover:text-white hover:ring-white/30">
                      <span aria-hidden="true" className="text-[11px] font-bold">{mark}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
