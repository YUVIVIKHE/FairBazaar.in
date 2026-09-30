// Regenerates docs/MEDIA_PROMPTS.md from content/media.ts and blog frontmatter.
// Usage: node --experimental-strip-types scripts/media-prompts.mjs
import fs from "node:fs";
import path from "node:path";
const { media, videos, STYLE } = await import("../content/media.ts");

const blogDir = "content/blog";
const blog = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md")).map((f) => {
  const fm = fs.readFileSync(path.join(blogDir, f), "utf8").split("---")[1];
  const get = (k) => fm.match(new RegExp(`^${k}: "?(.*?)"?$`, "m"))?.[1] ?? "";
  return { slug: f.replace(".md", ""), image: get("image"), alt: get("imageAlt"), prompt: get("imagePrompt") };
});

let out = `# FairBazaar — Media Prompt Sheet

Generate each asset (e.g. with Higgsfield), export it to the listed path under \`/public\`, then activate it:

- **Site images & videos:** set \`ready: true\` for that id in \`content/media.ts\`.
- **Blog featured images:** set \`imageReady: true\` in the article's frontmatter (\`content/blog/<slug>.md\`).

Until activated, every slot shows an on-brand abstract fallback, so nothing appears broken.

**Export guidance:** images as WebP (quality ~80) at the listed size or 2×; videos as MP4 (H.264, no audio track for loops) plus a WebP poster frame. Keep hero loops under ~3 MB.

**Shared style suffix (already appended to each image prompt below):**

> ${STYLE}

---

## 1. Site images

| # | Slot id | File | Size | Used on |
|---|---|---|---|---|
`;
Object.values(media).forEach((m, i) => { out += `| ${i + 1} | \`${m.id}\` | \`public${m.file}\` | ${m.width}×${m.height} | ${m.usedOn} |\n`; });
out += `\n### Prompts\n\n`;
Object.values(media).forEach((m) => { out += `#### \`${m.id}\` → \`public${m.file}\` (${m.width}×${m.height})\n**Alt text:** ${m.alt}\n\n\`\`\`\n${m.prompt}\n\`\`\`\n\n`; });

out += `---\n\n## 2. Blog featured images (1600×686, 21:9)\n\nAppend the shared style suffix to each prompt.\n\n`;
blog.forEach((b) => { out += `#### \`${b.slug}\` → \`public${b.image}\`\n**Alt text:** ${b.alt}\n\n\`\`\`\n${b.prompt}. ${STYLE}\n\`\`\`\n\n`; });

out += `---\n\n## 3. Videos\n\n| Slot id | File | Poster | Captions | Used on |\n|---|---|---|---|---|\n`;
Object.values(videos).forEach((v) => { out += `| \`${v.id}\` | \`public${v.file}\` | \`public${v.poster}\` | ${v.captions ? `\`public${v.captions}\`` : "— (muted loop)"} | ${v.usedOn} |\n`; });
out += `\n### 3.1 Hero loop (\`hero-loop\`) — 8–10 s, muted, seamless\n\n\`\`\`\n${videos["hero-loop"].prompt}\n\`\`\`\n\n`;
out += fs.readFileSync("docs/video-scripts.md", "utf8");
fs.writeFileSync("docs/MEDIA_PROMPTS.md", out);
console.log("wrote docs/MEDIA_PROMPTS.md");
