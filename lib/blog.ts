import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";
import { authors, type Author } from "@/content/authors";
import type { FAQ } from "@/content/types";

export const blogCategories = [
  "AI", "SaaS", "Software Development", "CRM", "ERP", "HRMS", "Business Automation", "Digital Transformation",
  "Cloud", "Cybersecurity", "Web Development", "Mobile Development", "Technology", "Startup Technology", "Business Growth", "Guides",
] as const;

export const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const categoryName = (slug: string) => blogCategories.find((c) => slugify(c) === slug);

export type Heading = { id: string; text: string; depth: 2 | 3 };

export type PostMeta = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt: string;
  image: string;
  imageAlt: string;
  imagePrompt: string;
  imageReady: boolean;
  canonical?: string;
  pillar?: string;
  relatedServices: string[];
  relatedProducts: string[];
  question?: string;
  answer?: string;
  faqs: FAQ[];
  readingMinutes: number;
  status: "draft" | "published";
};

export type Post = PostMeta & { html: string; headings: Heading[] };

const DIR = path.join(process.cwd(), "content/blog");

function render(markdown: string) {
  const headings: Heading[] = [];
  const used = new Map<string, number>();
  const md = new Marked({ gfm: true });
  md.use({
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { tokens, depth, text }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        let id = slugify(text);
        const n = used.get(id) ?? 0;
        used.set(id, n + 1);
        if (n) id = `${id}-${n}`;
        if (depth === 2 || depth === 3) headings.push({ id, text: text.replace(/[*_`]/g, ""), depth });
        return `<h${depth} id="${id}">${inner}</h${depth}>`;
      },
      link({ href, text }: Tokens.Link) {
        const external = /^https?:\/\//.test(href);
        return `<a href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${text}</a>`;
      },
      table(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Table) {
        const head = token.header.map((c) => `<th scope="col">${this.parser.parseInline(c.tokens)}</th>`).join("");
        const body = token.rows.map((r) => `<tr>${r.map((c) => `<td>${this.parser.parseInline(c.tokens)}</td>`).join("")}</tr>`).join("");
        return `<div class="table-wrap" role="region" aria-label="Comparison table" tabindex="0"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
      },
    },
  });
  const html = md.parse(markdown, { async: false }) as string;
  return { html, headings };
}

function load(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const { html, headings } = render(content);
  const words = content.split(/\s+/).length;
  return {
    slug,
    title: data.title,
    seoTitle: data.seoTitle ?? data.title,
    description: data.description,
    category: data.category ?? "Technology",
    tags: data.tags ?? [],
    author: authors[data.author] ?? authors["fairbazaar-editorial"],
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt ?? data.publishedAt,
    image: data.image ?? "",
    imageAlt: data.imageAlt ?? data.title,
    imagePrompt: data.imagePrompt ?? "",
    imageReady: Boolean(data.imageReady),
    canonical: data.canonical,
    pillar: data.pillar,
    relatedServices: data.relatedServices ?? [],
    relatedProducts: data.relatedProducts ?? [],
    question: data.question,
    answer: data.answer,
    faqs: data.faqs ?? [],
    readingMinutes: Math.max(3, Math.round(words / 200)),
    status: data.status === "draft" ? "draft" : "published",
    html,
    headings,
  };
}

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (!cache) {
    cache = fs
      .readdirSync(DIR)
      .filter((f) => f.endsWith(".md"))
      .map(load)
      .filter((p) => p.status === "published")
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }
  return cache;
}

export const getPost = (slug: string) => getAllPosts().find((p) => p.slug === slug);

export function getPostsBySlugs(slugs: string[]) {
  const all = getAllPosts();
  return slugs.map((s) => all.find((p) => p.slug === s)).filter((p): p is Post => Boolean(p));
}

export function getRelatedPosts(post: Post, limit = 3) {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score: (p.category === post.category ? 3 : 0) + (p.pillar && p.pillar === post.pillar ? 3 : 0) + p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export const toMeta = ({ html: _h, headings: _hd, ...meta }: Post): PostMeta => meta;
