import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import { site } from "./site";

export const legalSlugs = [
  "privacy-policy", "terms-and-conditions", "refund-cancellation-policy", "cookie-policy", "disclaimer", "data-processing-policy",
  "security", "accessibility", "acceptable-use-policy", "sla", "subscription-terms",
] as const;

export type LegalDoc = { slug: string; title: string; description: string; updated: string; html: string; headings: { id: string; text: string }[] };

const DIR = path.join(process.cwd(), "content/legal");

function fill(md: string) {
  return md
    .replaceAll("{{company}}", site.legalName ?? site.name)
    .replaceAll("{{url}}", site.url.replace(/^https?:\/\//, ""))
    .replaceAll("{{contactPath}}", "/contact")
    .replaceAll("{{jurisdiction}}", site.legal.jurisdiction)
    .replaceAll("{{grievance}}", site.contact.email ? `You may also write to our Grievance Officer at ${site.contact.email}.` : "");
}

export function getLegalDoc(slug: string): LegalDoc | null {
  if (!(legalSlugs as readonly string[]).includes(slug)) return null;
  const raw = fs.readFileSync(path.join(DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const headings: { id: string; text: string }[] = [];
  const md = new Marked({ gfm: true });
  md.use({
    renderer: {
      heading({ text, depth }) {
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        if (depth === 2) headings.push({ id, text });
        return `<h${depth} id="${id}">${text}</h${depth}>`;
      },
    },
  });
  const html = md.parse(fill(content), { async: false }) as string;
  return { slug, title: data.title, description: data.description, updated: data.updated, html, headings };
}
