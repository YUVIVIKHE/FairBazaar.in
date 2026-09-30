import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { IconTile, Icon } from "@/components/ui/Icon";
import { MediaSlot, AbstractArt } from "@/components/ui/MediaSlot";
import type { Product, Service, Industry, CaseStudy, IconName } from "@/content/types";
import type { PostMeta } from "@/lib/blog";

export function ServiceCard({ s, dark }: { s: Service; dark?: boolean }) {
  return (
    <Link
      href={`/services/${s.slug}`}
      className={`group flex h-full flex-col rounded-2xl p-6 transition duration-300 ${dark ? "glass hover:border-white/25" : "card card-hover"}`}
    >
      <IconTile name={s.icon} tone={dark ? "dark" : "light"} />
      <h3 className={`mt-5 text-lg font-semibold ${dark ? "text-white" : ""}`}>{s.name}</h3>
      <p className={`mt-2 flex-1 text-sm leading-6 ${dark ? "text-slate-400" : "text-slate-600"}`}>{s.intro.split(". ")[0]}.</p>
      <span className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold ${dark ? "text-mint-300" : "text-brand-600"}`}>
        Learn more <ArrowUpRight aria-hidden="true" className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="flex items-start justify-between p-6 pb-0">
        <IconTile name={p.icon} />
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${p.status === "available" ? "bg-mint-400/15 text-mint-600" : "bg-brand-50 text-brand-700"}`}>
          {p.status === "available" ? "Available now" : "Deployed per client"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{p.category}</p>
        <h3 className="mt-1 text-lg font-semibold"><Link href={`/products/${p.slug}`} className="after:absolute after:inset-0">{p.name}</Link></h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{p.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {p.highlights.slice(0, 3).map((h) => <li key={h} className="rounded-md bg-surface px-2 py-1 text-xs text-slate-600">{h}</li>)}
        </ul>
        <div className="relative z-10 mt-auto flex items-center gap-4 pt-6">
          <Link href={`/products/${p.slug}`} className="text-sm font-semibold text-brand-600 hover:text-brand-700">Explore Product</Link>
          <Link href={`/contact?intent=demo&product=${p.slug}`} data-track={`demo_${p.slug}`} className="text-sm font-semibold text-slate-500 hover:text-ink-900">Request Demo</Link>
        </div>
      </div>
    </article>
  );
}

export function IndustryCard({ i, withImage }: { i: Industry; withImage?: boolean }) {
  return (
    <Link href={`/industries/${i.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
      {withImage && (
        <MediaSlot
          id={`industry-${i.slug}`}
          rounded="rounded-none"
          className="aspect-[16/9]"
          sizes="(min-width:1024px) 33vw, 100vw"
          fallback={
            <>
              <AbstractArt seed={i.slug} />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="glass flex size-16 items-center justify-center rounded-2xl text-mint-300 transition duration-500 group-hover:scale-110"><Icon name={i.icon} className="size-7" /></span>
              </span>
            </>
          }
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <IconTile name={i.icon} className="size-10" />
          <h3 className="text-base font-semibold">{i.name}</h3>
        </div>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">{i.headline}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
          View solutions <ArrowUpRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function FeatureCard({ icon, title, text, dark }: { icon: IconName; title: string; text: string; dark?: boolean }) {
  return (
    <div className={`h-full rounded-2xl p-5 ${dark ? "glass" : "card"}`}>
      <IconTile name={icon} tone={dark ? "dark" : "light"} className="size-10" />
      <h3 className={`mt-4 text-base font-semibold ${dark ? "text-white" : ""}`}>{title}</h3>
      <p className={`mt-1.5 text-sm leading-6 ${dark ? "text-slate-400" : "text-slate-600"}`}>{text}</p>
    </div>
  );
}

export function CaseStudyCard({ c }: { c: CaseStudy }) {
  return (
    <Link href={`/case-studies/${c.slug}`} className="card card-hover group flex h-full flex-col p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700">{c.kind}</span>
        <span className="text-xs text-slate-500">{c.industry}</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-snug group-hover:text-brand-700">{c.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{c.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {c.technology.slice(0, 4).map((t) => <li key={t} className="rounded-md bg-surface px-2 py-1 text-xs text-slate-600">{t}</li>)}
      </ul>
    </Link>
  );
}

export function BlogCard({ p, featured }: { p: PostMeta; featured?: boolean }) {
  const date = new Date(p.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  return (
    <article className={`card card-hover group flex h-full flex-col overflow-hidden ${featured ? "lg:flex-row" : ""}`}>
      <MediaSlot
        id={`blog-${p.slug}`}
        overrideSrc={p.image}
        overrideReady={p.imageReady}
        overrideAlt={p.imageAlt}
        rounded="rounded-none"
        className={featured ? "aspect-[16/9] lg:aspect-auto lg:w-1/2" : "aspect-[16/9]"}
        sizes="(min-width:1024px) 33vw, 100vw"
      />
      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:p-10" : ""}`}>
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700">{p.category}</span>
          <span className="inline-flex items-center gap-1 text-slate-500"><Clock aria-hidden="true" className="size-3.5" />{p.readingMinutes} min read</span>
        </div>
        <h3 className={`mt-4 font-semibold leading-snug group-hover:text-brand-700 ${featured ? "text-2xl lg:text-3xl" : "text-lg"}`}>
          <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">{p.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">{p.description}</p>
        <p className="mt-5 text-xs text-slate-500">{p.author.name} · <time dateTime={p.publishedAt}>{date}</time></p>
      </div>
    </article>
  );
}

export function LinkCard({ href, title, text, icon }: { href: string; title: string; text?: string; icon?: IconName }) {
  return (
    <Link href={href} className="card card-hover group flex items-center gap-4 p-4">
      {icon && <IconTile name={icon} className="size-10" />}
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-ink-900 group-hover:text-brand-700">{title}</span>
        {text && <span className="mt-0.5 line-clamp-1 block text-sm text-slate-500">{text}</span>}
      </span>
      <Icon name="link" className="size-4 text-slate-400" />
    </Link>
  );
}
