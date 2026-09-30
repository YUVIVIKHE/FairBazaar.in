import { services } from "@/content/services";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { caseStudies } from "@/content/case-studies";
import { generalFaqs } from "@/content/faqs";
import { techGroups } from "@/content/technology";
import { getAllPosts } from "@/lib/blog";
import { site, absoluteUrl, hasAddress } from "@/lib/site";

export const dynamic = "force-static";

/** /llms.txt — concise, machine-readable overview for AI answer engines (llmstxt.org format). */
export function GET() {
  const L = (name: string, path: string, desc?: string) => `- [${name}](${absoluteUrl(path)})${desc ? `: ${desc}` : ""}`;
  const contact = [site.contact.email && `Email: ${site.contact.email}`, site.contact.phone && `Phone: ${site.contact.phone}`].filter(Boolean).join(" · ");
  const body = `# ${site.name}

> ${site.description}

Key facts:
- Name: ${site.name}${site.legalName ? ` (${site.legalName})` : ""}
- Tagline: ${site.tagline}
- Type: Technology company — SaaS products, custom software development, AI solutions and IT services
- Location: ${hasAddress ? `${site.address.locality}, ${site.address.region}, India` : `${site.address.region}, India`}
- Serves: ${site.areaServed.join("; ")}
- Customers: startups, SMEs, enterprises, educational institutions, healthcare organisations, retailers, manufacturers, agriculture businesses, dealers/distributors and service businesses
- Contact: ${absoluteUrl("/contact")}${contact ? ` · ${contact}` : ""}

## Products
${products.map((p) => L(p.name, `/products/${p.slug}`, p.answer.text)).join("\n")}

## Services
${services.map((s) => L(s.name, `/services/${s.slug}`, s.answer.text)).join("\n")}

## Industries
${industries.map((i) => L(i.name, `/industries/${i.slug}`, i.headline)).join("\n")}

## Technology
${techGroups.map((g) => `- ${g.name}: ${g.items.map((i) => i.name).join(", ")}`).join("\n")}

## Case studies (reference implementations; no client names or metrics claimed)
${caseStudies.map((c) => L(c.title, `/case-studies/${c.slug}`)).join("\n")}

## Knowledge hub
${getAllPosts().map((p) => L(p.title, `/blog/${p.slug}`, p.answer ?? p.description)).join("\n")}

## FAQs
${generalFaqs.map((f) => `- Q: ${f.q}\n  A: ${f.a}`).join("\n")}

## Optional
${L("About", "/about")}
${L("Technology", "/technology")}
${L("Solutions", "/solutions")}
${L("Security", "/security")}
${L("Privacy Policy", "/privacy-policy")}
${L("Sitemap", "/sitemap.xml")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
