import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IconTile } from "@/components/ui/Icon";
import { BlogCard, CaseStudyCard } from "@/components/cards/Cards";
import { Reveal } from "@/components/ui/Reveal";
import { getService } from "@/content/services";
import { getProduct } from "@/content/products";
import { getIndustry } from "@/content/industries";
import type { CaseStudy } from "@/content/types";
import type { PostMeta } from "@/lib/blog";

/** Entity-linking block: connects services ⇄ products ⇄ industries for users and crawlers. */
export function RelatedEntities({ services = [], products = [], industries = [], title = "Explore related solutions" }: { services?: string[]; products?: string[]; industries?: string[]; title?: string }) {
  const items = [
    ...products.map((s) => getProduct(s)).filter(Boolean).map((p) => ({ href: `/products/${p!.slug}`, label: p!.name, kind: "Product", icon: p!.icon })),
    ...services.map((s) => getService(s)).filter(Boolean).map((s) => ({ href: `/services/${s!.slug}`, label: s!.name, kind: "Service", icon: s!.icon })),
    ...industries.map((s) => getIndustry(s)).filter(Boolean).map((i) => ({ href: `/industries/${i!.slug}`, label: `${i!.name} solutions`, kind: "Industry", icon: i!.icon })),
  ];
  if (!items.length) return null;
  return (
    <section className="py-16 sm:py-20" aria-labelledby="related-title">
      <div className="container-x">
        <h2 id="related-title" className="text-2xl font-bold sm:text-3xl">{title}</h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <li key={it.href}>
              <Link href={it.href} className="card card-hover group flex items-center gap-4 p-4">
                <IconTile name={it.icon} className="size-10" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{it.kind}</span>
                  <span className="block truncate font-semibold text-ink-900 group-hover:text-brand-700">{it.label}</span>
                </span>
                <ArrowUpRight aria-hidden="true" className="size-4 text-slate-400 transition group-hover:text-brand-600" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RelatedPosts({ posts, title = "Related insights" }: { posts: PostMeta[]; title?: string }) {
  if (!posts.length) return null;
  return (
    <section className="bg-surface py-16 sm:py-20" aria-labelledby="rp-title">
      <div className="container-x">
        <SectionHeader align="left" title={<span id="rp-title">{title}</span>} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => <Reveal key={p.slug} delay={i * 60}><BlogCard p={p} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

export function RelatedCaseStudies({ items }: { items: CaseStudy[] }) {
  if (!items.length) return null;
  return (
    <section className="py-16 sm:py-20" aria-labelledby="rcs-title">
      <div className="container-x">
        <SectionHeader align="left" eyebrow="Solution stories" title={<span id="rcs-title">See how we approach it</span>} />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.slice(0, 2).map((c) => <CaseStudyCard key={c.slug} c={c} />)}
        </div>
      </div>
    </section>
  );
}
