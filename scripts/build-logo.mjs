// Regenerates /public/brand logo SVGs (wordmark converted to outlines from Plus Jakarta Sans ExtraBold).
// Needs: npm i -D opentype.js, and jakarta-800.ttf / jakarta-700.ttf in the working directory (Google Fonts, OFL).
// Usage: node scripts/build-logo.mjs public/brand
import opentype from "opentype.js";
import fs from "node:fs";
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });
const font = opentype.parse(fs.readFileSync("jakarta-800.ttf").buffer);
const fontSub = opentype.parse(fs.readFileSync("jakarta-700.ttf").buffer);

const C = { ink: "#0A1024", night: "#050816", blue: "#3D6BFF", blueDeep: "#2A52E0", violet: "#6F5BFF", mint: "#2EE6A6", white: "#FFFFFF", slate: "#64748B" };

// ---------- Marks (64×64 grid) ----------
const gradDefs = (id) => `<linearGradient id="${id}" x1="14" y1="12" x2="50" y2="52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${C.blue}"/><stop offset=".55" stop-color="${C.violet}"/><stop offset="1" stop-color="${C.mint}"/></linearGradient>`;

// Concept A (primary): "Flow F" — an F whose middle stroke hands off to a live data node.
const fGlyph = (fill, node) => `<path fill="${fill}" d="M21 14h22a4 4 0 0 1 0 8H25v7h9a4 4 0 0 1 0 8h-9v9a4 4 0 0 1-8 0V18a4 4 0 0 1 4-4Z"/><circle cx="45" cy="33" r="4.5" fill="${node}"/>`;
const markA = ({ badge = true, fill, node, bg = C.ink, id = "fbA", edge = false } = {}) =>
  `${badge ? `<rect width="64" height="64" rx="16" fill="${bg}"/>${edge ? `<rect x=".5" y=".5" width="63" height="63" rx="15.5" fill="none" stroke="#FFFFFF" stroke-opacity=".14"/>` : ""}` : ""}${fill ? "" : `<defs>${gradDefs(id)}</defs>`}${fGlyph(fill ?? `url(#${id})`, node ?? C.mint)}`;

// Concept B: "Network F" — the F drawn as connected nodes (systems linked together).
const markB = ({ bg = C.ink, id = "fbB" } = {}) => `<rect width="64" height="64" rx="16" fill="${bg}"/><defs>${gradDefs(id)}</defs>
<g stroke="url(#${id})" stroke-width="5" stroke-linecap="round"><path d="M21 17v30M21 17h23M21 32h15"/></g>
<g fill="${C.white}"><circle cx="21" cy="17" r="4"/><circle cx="44" cy="17" r="4"/><circle cx="21" cy="47" r="4"/></g><circle cx="36" cy="32" r="4" fill="${C.mint}"/>`;

// Concept C: "Growth F" — the top stroke rises into an arrow (transformation, growth).
const markC = ({ bg = C.ink, id = "fbC" } = {}) => `<rect width="64" height="64" rx="16" fill="${bg}"/><defs>${gradDefs(id)}</defs>
<path fill="url(#${id})" d="M21 22a4 4 0 0 1 4-4h11.3l-2.1-2.1a3.6 3.6 0 0 1 5.1-5.1l8.3 8.3a3.6 3.6 0 0 1 0 5.1l-8.3 8.3a3.6 3.6 0 0 1-5.1-5.1l2.1-2.1H29v4h5a4 4 0 0 1 0 8h-5v9a4 4 0 0 1-8 0Z"/>`;

// ---------- Wordmark as outlines ----------
function word(text, x, y, size, f = font, tracking = -0.02) {
  let cursor = x; const parts = [];
  for (const ch of text) {
    const g = f.charToGlyph(ch);
    parts.push(g.getPath(cursor, y, size).toPathData(2));
    cursor += (g.advanceWidth / f.unitsPerEm) * size + tracking * size;
  }
  return { d: parts.join(""), width: cursor - x - tracking * size };
}
function wordmark(x, baseline, size, fairColor, bazaarColor) {
  const a = word("Fair", x, baseline, size);
  const b = word("Bazaar", x + a.width + (-0.02 * size), baseline, size);
  return { svg: `<path fill="${fairColor}" d="${a.d}"/><path fill="${bazaarColor}" d="${b.d}"/>`, width: a.width + b.width - 0.02 * size };
}

const svg = (w, h, body, title = "FairBazaar") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;
const place = (inner, x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;

// Horizontal lockup: mark 64 high, wordmark cap height aligned.
function horizontal(theme, markFn = markA) {
  const dark = theme === "dark";
  const H = 64, gap = 18, size = 44;
  const wm = wordmark(64 + gap, 47, size, dark ? C.white : C.ink, dark ? C.mint : C.blueDeep);
  const W = Math.ceil(64 + gap + wm.width + 2);
  return svg(W, H, markFn({ id: `h${theme}`, edge: dark }) + wm.svg, "FairBazaar");
}
function stacked(theme) {
  const dark = theme === "dark";
  const size = 40, wmTmp = wordmark(0, 0, size, "", "");
  const tagW = word("TECHNOLOGY THAT TRANSFORMS BUSINESSES", 0, 0, 10.5, fontSub, 0.12).width;
  const W = Math.ceil(Math.max(wmTmp.width, tagW) + 8), mark = 88;
  const wm = wordmark((W - wmTmp.width) / 2, mark + 20 + 30, size, dark ? C.white : C.ink, dark ? C.mint : C.blueDeep);
  const tag = word("TECHNOLOGY THAT TRANSFORMS BUSINESSES", 0, 0, 10.5, fontSub, 0.12);
  const tagX = (W - tag.width) / 2;
  const tagD = word("TECHNOLOGY THAT TRANSFORMS BUSINESSES", tagX, mark + 20 + 58, 10.5, fontSub, 0.12).d;
  const H = mark + 20 + 64;
  return svg(W, H, place(markA({ id: `s${theme}`, edge: dark }), (W - mark) / 2, 0, mark / 64) + wm.svg + `<path fill="${dark ? "#94A3B8" : C.slate}" d="${tagD}"/>`);
}
function mono(color) {
  const wm = wordmark(64 + 18, 47, 44, color, color);
  const glyph = `<path fill="${color}" d="M21 14h22a4 4 0 0 1 0 8H25v7h9a4 4 0 0 1 0 8h-9v9a4 4 0 0 1-8 0V18a4 4 0 0 1 4-4Z"/><circle cx="45" cy="33" r="4.5" fill="${color}"/>`;
  const badge = `<rect x="1.5" y="1.5" width="61" height="61" rx="15" fill="none" stroke="${color}" stroke-width="3"/>`;
  return svg(Math.ceil(82 + wm.width + 2), 64, badge + glyph + wm.svg);
}

const files = {
  "fairbazaar-mark.svg": svg(64, 64, markA()),
  "fairbazaar-mark-light.svg": svg(64, 64, markA({ bg: C.white, id: "ml" }).replace(`fill="${C.white}"/>`, `fill="${C.white}" stroke="#E3E8F2"/>`)),
  "fairbazaar-glyph.svg": svg(64, 64, markA({ badge: false, id: "g" })),
  "fairbazaar-logo.svg": horizontal("light"),
  "fairbazaar-logo-dark.svg": horizontal("dark"),
  "fairbazaar-logo-stacked.svg": stacked("light"),
  "fairbazaar-logo-stacked-dark.svg": stacked("dark"),
  "fairbazaar-logo-mono-black.svg": mono("#0A1024"),
  "fairbazaar-logo-mono-white.svg": mono("#FFFFFF"),
  "concept-b-network.svg": horizontal("light", markB),
  "concept-c-growth.svg": horizontal("light", markC),
};
for (const [n, c] of Object.entries(files)) fs.writeFileSync(`${out}/${n}`, c);
console.log(Object.keys(files).join("\n"));
