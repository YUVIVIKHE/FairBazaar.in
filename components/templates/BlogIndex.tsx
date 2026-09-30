import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { BlogCard } from "@/components/cards/Cards";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { blogCategories, slugify, type PostMeta } from "@/lib/blog";
import type { Crumb } from "@/components/ui/Breadcrumbs";

export function BlogIndex({ posts, crumbs, title, intro, activeCategory, allCounts }: { posts: PostMeta[]; crumbs: Crumb[]; title: React.ReactNode; intro: string; activeCategory?: string; allCounts: Record<string, number> }) {
  const [first, ...rest] = posts;
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Knowledge hub" title={title} intro={intro} compact />
      <section className="sticky top-16 z-30 border-b border-line bg-white/90 backdrop-blur-xl lg:top-[72px]" aria-label="Blog categories">
        <nav className="container-x scrollbar-none flex gap-2 overflow-x-auto py-3">
          <Link href="/blog" aria-current={!activeCategory ? "page" : undefined} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${!activeCategory ? "bg-ink-900 text-white" : "bg-surface text-slate-600 hover:text-ink-900"}`}>All</Link>
          {blogCategories.map((c) => {
            const on = activeCategory === c;
            const n = allCounts[c] ?? 0;
            return (
              <Link key={c} href={`/blog/category/${slugify(c)}`} aria-current={on ? "page" : undefined} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${on ? "bg-ink-900 text-white" : "bg-surface text-slate-600 hover:text-ink-900"}`}>
                {c}{n ? <span className="ml-1.5 opacity-50">{n}</span> : null}
              </Link>
            );
          })}
        </nav>
      </section>
      <section className="py-12 sm:py-16">
        <div className="container-x">
          {!posts.length ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-line p-10 text-center">
              <h2 className="text-xl font-bold">Articles coming soon</h2>
              <p className="mt-2 text-slate-600">We're preparing in-depth guides for this topic. Subscribe to get them first, or browse all articles.</p>
              <div className="mx-auto mt-6 max-w-md"><NewsletterForm dark={false} source="blog-empty" /></div>
              <Link href="/blog" className="mt-6 inline-block text-sm font-semibold text-brand-600">Browse all articles →</Link>
            </div>
          ) : (
            <>
              <BlogCard p={first} featured />
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 60}><BlogCard p={p} /></Reveal>)}
              </div>
            </>
          )}
        </div>
      </section>
      <section className="pb-20">
        <div className="container-x">
          <div className="section-dark relative overflow-hidden rounded-3xl p-8 sm:p-12">
            <div aria-hidden="true" className="bg-aurora absolute inset-0" />
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div><h2 className="text-3xl font-bold">Get Technology Insights</h2><p className="mt-3 text-slate-300">AI, SaaS, software, automation and business technology — practical, not promotional.</p></div>
              <NewsletterForm source="blog" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
