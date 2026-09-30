# FairBazaar.in — Website

Enterprise SaaS + IT solutions website for **FairBazaar** — *Technology that transforms businesses.*

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4**, statically generated (108 pages), with no heavy 3D libraries: every visual — hero ecosystem, dashboards, phone mockups, HRMS product tour — is real HTML/SVG, so UI text is crisp, accessible and translatable.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything is optional
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run typecheck
```

## Before going live — fill in real company data

Everything company-specific lives in **`lib/site.ts`**. Fields set to `null` are hidden everywhere (footer, contact page, schema, llms.txt), so nothing unverified is published.

| What | Where |
|---|---|
| Legal name, founding year, email, phone, WhatsApp, address, socials | `lib/site.ts` |
| Verified statistics (otherwise capability statements show) | `site.verifiedStats` in `lib/site.ts` |
| Mark legal pages as reviewed by counsel (removes draft notice) | `site.legal.reviewed` in `lib/site.ts` |
| Client logos, testimonials, partners, certifications, awards (hidden while empty) | `socialProof` in `components/sections/Shared.tsx` |
| Job openings (emits JobPosting schema) | `openings` in `app/careers/page.tsx` |
| Product availability badges | `status` in `content/products.ts` |

**Never add fabricated clients, metrics, awards or testimonials.** Case studies are labelled *Reference implementation* until client-approved versions exist.

## Images & videos (Higgsfield or any generator)

All media slots are listed in **`content/media.ts`**; full prompts, filenames, sizes and the 11-scene HRMS video script are in **`docs/MEDIA_PROMPTS.md`**.

1. Generate the asset from the prompt.
2. Save it to the path shown (under `public/media/...`).
3. Set `ready: true` (or `imageReady: true` in a blog post's frontmatter).

Until then each slot renders an on-brand abstract fallback — no broken images. The HRMS section plays an interactive, captioned product tour until `hrms-product` video is ready. Regenerate the prompt sheet after editing the manifest: `node --experimental-strip-types scripts/media-prompts.mjs`.

## Content & CMS

- Blog: Markdown files in `content/blog/*.md` (frontmatter = SEO title, description, category, tags, author, dates, featured image, FAQs, AEO answer, pillar links, draft/published).
- No-code editing: **Decap CMS** at `/admin` (`public/admin/config.yml`) with an editorial draft → publish workflow. Connect GitHub OAuth to enable.
- Services, products, industries, solutions, case studies, FAQs, technology: typed data in `content/*.ts`.
- Legal pages: `content/legal/*.md` — drafts for Indian context; **must be reviewed by qualified legal counsel**.

## Architecture

```
app/          routes (App Router), sitemap.ts, robots.ts, llms.txt, rss, search index, API routes
components/   ui/ (design system) · layout/ · sections/ · cards/ · visuals/ · templates/ · forms/ · home/
content/      typed content + markdown (blog, legal) + media manifest
lib/          site config, SEO/schema builders, blog loader, analytics, validation, rate limiting
services/     server-side lead + newsletter routing
docs/         media prompts & video scripts
```

## SEO / AEO / GEO

- Unique title, description, canonical, Open Graph and Twitter tags on every page (auto-trimmed to safe lengths).
- JSON-LD: Organization, WebSite (+SearchAction), BreadcrumbList, Service, SoftwareApplication, Article, FAQPage, HowTo, ItemList, AboutPage, ContactPage, JobPosting; LocalBusiness only once a verified address is set.
- `/sitemap.xml`, `/robots.txt` (AI crawlers explicitly allowed), `/llms.txt`, `/blog/rss.xml`.
- "Quick answer" blocks (40–60 words) on service, product, industry and article pages; question-based headings.
- Topic clusters: pillar services ⇄ supporting articles ⇄ products ⇄ industries ⇄ case studies.
- `/solutions/<industry>` 301-redirects to canonical `/industries/<industry>`.

## Lead generation

`/contact` form → `POST /api/contact`:
- Zod validation, same-origin (CSRF) check, rate limiting, honeypot + time-trap spam protection, body-size limit.
- Routes to `CRM_WEBHOOK_URL` and emails via Resend (`RESEND_API_KEY`, `LEAD_NOTIFY_TO`, `LEAD_NOTIFY_FROM`).
- UTM/referrer/landing page captured automatically. If no channel is configured, the lead is written to server logs so it is never lost.
- Booking embed appears when `NEXT_PUBLIC_BOOKING_URL` (e.g. Calendly) is set.

The in-memory rate limiter works per instance; use a shared store (e.g. Upstash Redis) on multi-instance/serverless hosting.

## Analytics & privacy

GTM / GA4 / Meta Pixel load **only after consent** (banner + "Cookie settings" in footer). Tracked events: `cta_click`, `contact_submit`, `demo_request`, `product_view`, `video_play`, `blog_view`, `blog_engagement`, `newsletter_signup`, `phone_click`, `whatsapp_click`, `email_click`. Add any element to CTA tracking with `data-track="label"`.

## Security

Strict security headers (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP), no secrets in client code (only `NEXT_PUBLIC_*` IDs are public), escaped JSON-LD, validated inputs.

## Accessibility & performance

Semantic landmarks, skip link, one H1 per page, keyboard-operable mega menu/search (⌘K or /)/accordions, visible focus, `prefers-reduced-motion` honoured globally, content visible without JavaScript. Static generation, `next/font`, AVIF/WebP images, lazy video, particle canvas paused off-screen.
