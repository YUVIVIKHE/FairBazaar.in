/**
 * Media manifest — every generated image/video slot on the website.
 *
 * HOW TO ADD A GENERATED ASSET
 *  1. Generate it with the prompt below (full prompt sheet: docs/MEDIA_PROMPTS.md).
 *  2. Export to the listed `file` path under /public (WebP/AVIF for images, MP4 H.264 + WebM for video).
 *  3. Set `ready: true`. The slot switches from the built-in abstract fallback to your asset.
 *
 * Until `ready` is true the site renders an on-brand abstract fallback (no broken images).
 */
export type MediaSlot = {
  id: string;
  kind: "image" | "video";
  file: string; // path under /public
  poster?: string; // video poster image
  captions?: string; // .vtt captions file under /public
  width: number;
  height: number;
  alt: string;
  usedOn: string;
  prompt: string;
  ready: boolean;
};

export const STYLE =
  "Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.";

const img = (id: string, file: string, w: number, h: number, alt: string, usedOn: string, prompt: string): MediaSlot => ({
  id, kind: "image", file, width: w, height: h, alt, usedOn, prompt: `${prompt} ${STYLE}`, ready: false,
});

export const media: Record<string, MediaSlot> = Object.fromEntries(
  [
    // 1. Hero & brand
    img("hero-ecosystem", "/media/hero/ecosystem.webp", 1600, 1200, "Abstract 3D technology core connected to floating software modules", "Home hero (background layer behind the interactive ecosystem)",
      "A glowing translucent glass core sphere at the centre, emitting soft light, with thin luminous connection lines radiating to eight floating frosted-glass rounded panels arranged in a loose orbit at different depths, tiny floating particles and faint data streams, isometric three-quarter camera angle, generous negative space on the left for headline text."),
    img("abstract-grid", "/media/backgrounds/abstract-grid.webp", 2400, 1200, "Abstract perspective grid of light", "Closing CTA panel background (site-wide)",
      "Minimal abstract background: infinite perspective grid of fine light lines fading into darkness, a soft horizon glow, sparse floating light particles, calm and elegant, extremely subtle."),
    img("tech-objects", "/media/backgrounds/tech-objects.webp", 1600, 1000, "Floating 3D geometric technology objects", "Technology page hero",
      "Composition of floating premium 3D objects: a frosted glass cube, a brushed aluminium torus, a small server-blade-like slab and glowing spheres, arranged with balance, studio lighting."),
    // 2. AI
    img("ai-network", "/media/ai/neural-network.webp", 1600, 1200, "Neural network visual connecting business modules", "Home — AI & Automation section background",
      "A luminous abstract neural network made of glowing nodes and fine filaments forming a brain-like cloud, with streams of light flowing out to six small floating glass tiles around it, sense of intelligence and flow, cinematic."),
    // 3–5. Product environments
    img("hrms-environment", "/media/products/hrms-environment.webp", 1600, 1000, "3D environment representing workforce management", "/products/hrms — How it works background",
      "Floating 3D scene representing workforce management: stylised map pin with a soft geo-fence ring on a translucent map plane, a calendar tile, a clock, and a wallet-like card, all frosted glass, connected by light lines, clean studio lighting. Leave the centre-right area clear for a UI overlay."),
    img("crm-environment", "/media/products/crm-environment.webp", 1600, 1000, "3D environment representing sales pipeline", "/products/crm — How it works background",
      "Abstract 3D sales pipeline: a sequence of glass funnel rings and flowing light particles moving left to right through stages, small glowing spheres representing leads, elegant and minimal."),
    img("erp-visual", "/media/products/erp-visual.webp", 1600, 1000, "3D visual of connected operations modules", "/products/erp — How it works background",
      "Isometric 3D visualisation of connected operations: miniature glass warehouse shelves with boxes, a factory block, a delivery truck and a finance card, all linked by glowing lines on a dark reflective platform."),
    // 6. Mobile
    img("mobile-mockups", "/media/mobile/app-devices.webp", 1400, 1200, "Two smartphones floating at an angle with blank glowing screens", "Mobile App Development page hero",
      "Two modern bezel-less smartphones floating at a slight angle, screens glowing with soft blue gradient and NO interface or text (UI will be overlaid in HTML), premium product photography lighting, reflections on a dark surface."),
    // 7. Cloud
    img("cloud-infra", "/media/cloud/infrastructure.webp", 1600, 1000, "Abstract cloud infrastructure visual", "Cloud & DevOps page hero",
      "Abstract cloud infrastructure: stacked translucent server layers floating inside a soft volumetric cloud shape, containers as small glowing cubes moving along rails, calm and precise."),
    // 8. Software development
    img("software-dev", "/media/company/software-development.webp", 1600, 1000, "Software engineering workspace at night", "About page — Leadership & team",
      "Modern software engineering workspace at dusk: a large curved monitor with abstract blurred colourful code-like light (not readable), a mechanical keyboard, notebook with sketched architecture boxes, warm desk lamp mixed with cool screen glow, photorealistic, shallow depth of field."),
    // 9. Team / company (people)
    img("team-collab", "/media/company/team-collaboration.webp", 1600, 1000, "Indian technology team collaborating around a whiteboard", "About page — Who We Are",
      "Photorealistic editorial photo of a diverse Indian technology team of four in a bright modern office in Maharashtra, collaborating around a glass whiteboard with sticky notes and hand-drawn workflow diagrams, natural daylight, candid, professional attire smart casual, no visible text or logos. (Replace with real team photos when available.)"),
    img("office-culture", "/media/company/workspace.webp", 1600, 1000, "Modern technology office interior", "Careers page",
      "Photorealistic interior of a modern, minimal technology office with plants, warm wood and matte black accents, large windows, a few people working at a distance (not identifiable), soft daylight. No signage or logos."),
    // 12. Product launch
    img("product-launch", "/media/products/launch.webp", 1600, 900, "Glass product tile emerging from light", "Products page hero",
      "A single premium frosted glass rounded app tile rising from a pool of blue light with particles, dramatic product-launch lighting, centred composition."),
    // 10. Industries
    ...[
      ["healthcare", "clean modern clinic reception with soft daylight, a tablet on the desk, calm healthcare atmosphere, no people faces visible"],
      ["education", "modern classroom and campus library blend, students seen from behind using laptops, bright and hopeful"],
      ["agriculture", "golden-hour farmland in Maharashtra with neat crop rows, a field officer (seen from behind) holding a smartphone, subtle holographic map overlay"],
      ["retail", "modern retail store interior with organised shelves and a sleek checkout counter, warm lighting"],
      ["manufacturing", "clean modern factory floor with robotic arm and conveyor, a supervisor with a tablet, cool industrial lighting"],
      ["real-estate", "contemporary residential towers at dusk with warm window lights, architectural photography"],
      ["hospitality", "boutique hotel lobby with warm ambient lighting, elegant and inviting"],
      ["finance", "modern financial office with glass walls and abstract light data lines, calm and trustworthy"],
      ["logistics", "organised warehouse with pallets and a delivery truck at loading bay, early morning light"],
      ["automotive", "modern car showroom and service bay, polished floor reflections"],
      ["professional-services", "minimal consulting office meeting room with documents and laptop, soft daylight"],
      ["startups", "small startup team workspace with laptops and whiteboard, energetic but tidy"],
      ["smes", "small business owner in an Indian trading shop using a tablet, warm natural light"],
      ["enterprise", "enterprise headquarters atrium with glass and steel, a few distant professionals, cool daylight"],
    ].map(([slug, p]) => img(`industry-${slug}`, `/media/industries/${slug}.webp`, 1200, 800, `${slug.replace("-", " ")} industry scene`, `Industry card and /industries/${slug} hero`,
      `Photorealistic editorial image: ${p}. Photographic realism rather than 3D render, subtle blue-mint colour grade to match the brand.`)),
    // 11. Blog featured images (filled in lib/blog.ts via getBlogImage)
    // 13. About page
    img("about-hero", "/media/company/about-hero.webp", 1600, 1000, "Abstract visual of ideas becoming connected systems", "About page hero",
      "Abstract visual metaphor: a single glowing seed of light on the left transforming into an expanding connected network of glass modules on the right, representing idea to scale."),
  ].map((m) => [m.id, m]),
);

/** Videos. Captions (.vtt) and posters are required for accessibility. */
export const videos: Record<string, MediaSlot> = {
  "hero-loop": {
    id: "hero-loop", kind: "video", file: "/media/video/hero-loop.mp4", poster: "/media/video/hero-loop-poster.webp",
    width: 1920, height: 1080, alt: "Looping animation of a technology core connecting software modules", usedOn: "Home hero (optional background loop, muted)",
    prompt: `8–10 second seamless loop, muted. Slow orbiting camera around a glowing glass technology core; eight frosted panels float and gently bob; light pulses travel along connection lines from the core to each panel; particles drift. First and last frame identical for a perfect loop. ${STYLE}`,
    ready: false,
  },
  "hrms-product": {
    id: "hrms-product", kind: "video", file: "/media/video/hrms-product.mp4", poster: "/media/video/hrms-product-poster.webp", captions: "/media/video/hrms-product.en.vtt",
    width: 1920, height: 1080, alt: "FairBazaar HRMS product video", usedOn: "HRMS showcase, /products/hrms",
    prompt: "See docs/MEDIA_PROMPTS.md — 11-scene HRMS product video script with narration.",
    ready: false,
  },
  "crm-product": {
    id: "crm-product", kind: "video", file: "/media/video/crm-product.mp4", poster: "/media/video/crm-product-poster.webp", captions: "/media/video/crm-product.en.vtt",
    width: 1920, height: 1080, alt: "FairBazaar CRM product video", usedOn: "/products/crm",
    prompt: "See docs/MEDIA_PROMPTS.md — CRM 45-second script.",
    ready: false,
  },
  "ai-explainer": {
    id: "ai-explainer", kind: "video", file: "/media/video/ai-explainer.mp4", poster: "/media/video/ai-explainer-poster.webp", captions: "/media/video/ai-explainer.en.vtt",
    width: 1920, height: 1080, alt: "How FairBazaar AI agents work", usedOn: "Home video section, /products/ai-agents",
    prompt: "See docs/MEDIA_PROMPTS.md — AI explainer 45-second script.",
    ready: false,
  },
  "company-film": {
    id: "company-film", kind: "video", file: "/media/video/company.mp4", poster: "/media/video/company-poster.webp", captions: "/media/video/company.en.vtt",
    width: 1920, height: 1080, alt: "FairBazaar company film", usedOn: "Home video section",
    prompt: "See docs/MEDIA_PROMPTS.md — Company film 45-second script.",
    ready: false,
  },
};

export function getMedia(id: string): MediaSlot | undefined {
  return media[id] ?? videos[id];
}
