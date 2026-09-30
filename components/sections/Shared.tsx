import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { site } from "@/lib/site";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { services } from "@/content/services";

/** Statistics: shows verified numbers from lib/site.ts if present, otherwise capability statements. */
export function Stats({ dark }: { dark?: boolean }) {
  const verified = site.verifiedStats;
  const capability = [
    { big: String(products.length), label: "Business platforms", sub: "HRMS, CRM, ERP, AI agents & more" },
    { big: String(industries.length), label: "Industry blueprints", sub: "Dedicated solution blueprints" },
    { big: String(services.length), label: "Service disciplines", sub: "From AI to cloud & UX" },
    { big: "AI", label: "Native by design", sub: "Agents, RAG & automation" },
  ];
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line/60 lg:grid-cols-4">
      {(verified.length ? verified.map((v) => ({ big: v.value, suffix: v.suffix, label: v.label, sub: "" })) : capability).map((s, i) => (
        <Reveal key={s.label} delay={i * 80} className={`p-6 sm:p-8 ${dark ? "bg-ink-900" : "bg-white"}`}>
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span className={`block font-display text-4xl font-bold sm:text-5xl ${dark ? "text-white" : "text-ink-900"}`}>
              {typeof s.big === "number" ? <Counter value={s.big} suffix={"suffix" in s ? (s.suffix as string) : ""} /> : /^\d+$/.test(s.big) ? <Counter value={Number(s.big)} /> : <span className="text-gradient">{s.big}</span>}
            </span>
            <span className={`mt-2 block text-sm font-semibold ${dark ? "text-slate-200" : "text-ink-900"}`}>{s.label}</span>
            {s.sub && <span className="mt-1 block text-xs text-slate-500">{s.sub}</span>}
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}

export function ProcessSteps({ steps, dark }: { steps: { title: string; text: string }[]; dark?: boolean }) {
  return (
    <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 60} className={`relative rounded-2xl p-5 ${dark ? "glass" : "card"}`}>
          <span className={`font-display text-xs font-bold tracking-[0.2em] ${dark ? "text-mint-300" : "text-brand-500"}`}>{String(i + 1).padStart(2, "0")}</span>
          <h3 className={`mt-2 text-base font-semibold ${dark ? "text-white" : ""}`}>{s.title}</h3>
          <p className={`mt-1.5 text-sm leading-6 ${dark ? "text-slate-400" : "text-slate-600"}`}>{s.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/**
 * Social-proof infrastructure. Each list is EMPTY by default and the section renders nothing
 * until verified, client-approved entries are added. Never add fabricated logos or quotes.
 */
export const socialProof = {
  clientLogos: [] as { name: string; src: string; href?: string }[],
  testimonials: [] as { quote: string; name: string; role: string; company: string; verified: true }[],
  partners: [] as { name: string; src: string }[],
  certifications: [] as { name: string; issuer: string; year: number; url?: string }[],
  awards: [] as { name: string; issuer: string; year: number }[],
};

export function LogoCloud() {
  if (!socialProof.clientLogos.length) return null;
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70 grayscale">
      {socialProof.clientLogos.map((l) => (
        // eslint-disable-next-line @next/next/no-img-element
        <li key={l.name}><img src={l.src} alt={l.name} className="h-8 w-auto" loading="lazy" /></li>
      ))}
    </ul>
  );
}

export function Testimonials() {
  if (!socialProof.testimonials.length) return null;
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {socialProof.testimonials.map((t) => (
        <figure key={t.name} className="card p-6">
          <blockquote className="text-base leading-7 text-ink-900">“{t.quote}”</blockquote>
          <figcaption className="mt-4 text-sm text-slate-500">{t.name}, {t.role} — {t.company}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/** Capability marquee — an honest "trusted-by" alternative until verified client logos exist. */
export function CapabilityStrip() {
  const items = ["SaaS Products", "Custom Software", "AI Agents", "RAG Systems", "CRM", "ERP", "HRMS & Payroll", "Business Automation", "Web Applications", "Mobile Apps", "Cloud & DevOps", "Digital Transformation"];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]" aria-label="FairBazaar capabilities">
      <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        {[...items, ...items].map((t, i) => (
          <li key={i} aria-hidden={i >= items.length} className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-slate-600">
            <span className="size-1.5 rounded-full bg-gradient-to-r from-brand-500 to-mint-400" />{t}
          </li>
        ))}
      </ul>
    </div>
  );
}
