import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, CalendarDays, RefreshCw, List } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { FAQ } from "@/components/ui/FAQ";
import { JsonLd } from "@/components/ui/JsonLd";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { LogoMark } from "@/components/ui/Logo";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { CTASection } from "@/components/sections/CTASection";
import { RelatedPosts, RelatedEntities } from "@/components/sections/Related";
import { getAllPosts, getPost, getRelatedPosts, slugify, toMeta, type Heading } from "@/lib/blog";
import { getService } from "@/content/services";
import { buildMetadata, articleSchema, breadcrumbSchema, faqSchema, graph } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  const meta = buildMetadata({
    title: `${p.seoTitle} | FairBazaar`,
    description: p.description,
    path: `/blog/${p.slug}`,
    type: "article",
    image: p.imageReady ? p.image : undefined,
    publishedTime: p.publishedAt,
    modifiedTime: p.updatedAt,
    keywords: p.tags,
  });
  if (p.canonical) meta.alternates = { canonical: absoluteUrl(p.canonical) };
  return meta;
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

function TOC({ headings }: { headings: Heading[] }) {
  return (
    <ol className="space-y-1.5 text-sm">
      {headings.map((h) => (
        <li key={h.id} className={h.depth === 3 ? "pl-4" : ""}>
          <a href={`#${h.id}`} className="block rounded-md py-1 text-slate-600 hover:text-brand-600">{h.text}</a>
        </li>
      ))}
      {headings.length > 0 && <li><a href="#faqs" className="block rounded-md py-1 text-slate-600 hover:text-brand-600">FAQs</a></li>}
    </ol>
  );
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const path = `/blog/${p.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: p.category, path: `/blog/category/${slugify(p.category)}` }, { name: p.title, path }];
  const related = getRelatedPosts(p).map(toMeta);
  const pillar = p.pillar ? getService(p.pillar) : undefined;

  return (
    <>
      <ReadingProgress slug={p.slug} />
      <JsonLd
        data={graph(
          breadcrumbSchema(crumbs),
          articleSchema({ title: p.title, description: p.description, path, image: p.imageReady ? p.image : undefined, published: p.publishedAt, modified: p.updatedAt, author: p.author.name, section: p.category, keywords: p.tags }),
          faqSchema(p.faqs),
        )}
      />
      <article>
        <header className="section-dark noise relative overflow-hidden">
          <div aria-hidden="true" className="bg-aurora absolute inset-0" />
          <div className="container-x relative max-w-4xl pb-14 pt-10 sm:pb-20">
            <Breadcrumbs items={crumbs} dark />
            <Link href={`/blog/category/${slugify(p.category)}`} className="eyebrow eyebrow-dark mt-8">{p.category}</Link>
            <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl">{p.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">{p.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2 text-slate-200"><LogoMark className="size-7" />{p.author.name}</span>
              <span className="inline-flex items-center gap-1.5"><CalendarDays aria-hidden="true" className="size-4" />Published <time dateTime={p.publishedAt}>{fmt(p.publishedAt)}</time></span>
              {p.updatedAt !== p.publishedAt && <span className="inline-flex items-center gap-1.5"><RefreshCw aria-hidden="true" className="size-4" />Updated <time dateTime={p.updatedAt}>{fmt(p.updatedAt)}</time></span>}
              <span className="inline-flex items-center gap-1.5"><Clock aria-hidden="true" className="size-4" />{p.readingMinutes} min read</span>
            </div>
          </div>
        </header>

        <div className="container-x -mt-2 max-w-6xl pt-10">
          <MediaSlot id={`blog-${p.slug}`} overrideSrc={p.image} overrideReady={p.imageReady} overrideAlt={p.imageAlt} priority className="aspect-[21/9]" sizes="(min-width:1024px) 1100px, 100vw" />
        </div>

        <div className="container-x grid max-w-6xl gap-12 py-12 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <nav aria-label="Table of contents" className="sticky top-28">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">On this page</p>
              <TOC headings={p.headings} />
            </nav>
          </aside>
          <div className="min-w-0 max-w-3xl">
            <details className="mb-8 rounded-xl border border-line p-4 lg:hidden">
              <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink-900"><List aria-hidden="true" className="size-4" />Table of contents</summary>
              <nav aria-label="Table of contents" className="mt-3"><TOC headings={p.headings} /></nav>
            </details>
            {p.answer && <div className="mb-10"><AnswerBlock question={p.question ?? "The short answer"} answer={p.answer} /></div>}
            <div id="article-body" className="prose-fb" dangerouslySetInnerHTML={{ __html: p.html }} />

            {p.faqs.length > 0 && (
              <section id="faqs" className="mt-16" aria-labelledby="faqs-title">
                <h2 id="faqs-title" className="mb-6 text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
                <FAQ items={p.faqs} />
              </section>
            )}

            {pillar && (
              <aside className="mt-12 rounded-2xl border border-brand-100 bg-brand-50/60 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">Related service</p>
                <p className="mt-2 text-lg font-semibold text-ink-900">{pillar.name}</p>
                <p className="mt-1 text-sm text-slate-600">{pillar.intro}</p>
                <Link href={`/services/${pillar.slug}`} className="mt-4 inline-block text-sm font-semibold text-brand-600">Explore {pillar.name} →</Link>
              </aside>
            )}

            <footer className="mt-12 flex gap-4 border-t border-line pt-8">
              <LogoMark className="size-12 shrink-0" />
              <div>
                <p className="font-semibold text-ink-900">{p.author.name}</p>
                <p className="text-sm text-slate-500">{p.author.role}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{p.author.bio}</p>
              </div>
            </footer>
            {p.tags.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
                {p.tags.map((t) => <li key={t} className="rounded-full bg-surface px-3 py-1 text-xs text-slate-600">#{t}</li>)}
              </ul>
            )}
          </div>
        </div>
      </article>
      <RelatedEntities services={p.relatedServices.filter((s) => s !== p.pillar)} products={p.relatedProducts} title="Put this into practice" />
      <RelatedPosts posts={related} title="Related articles" />
      <CTASection track={`blog_${p.slug}_bottom`} />
    </>
  );
}
