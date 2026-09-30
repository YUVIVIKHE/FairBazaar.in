# FairBazaar — Media Prompt Sheet

Generate each asset (e.g. with Higgsfield), export it to the listed path under `/public`, then activate it:

- **Site images & videos:** set `ready: true` for that id in `content/media.ts`.
- **Blog featured images:** set `imageReady: true` in the article's frontmatter (`content/blog/<slug>.md`).

Until activated, every slot shows an on-brand abstract fallback, so nothing appears broken.

**Export guidance:** images as WebP (quality ~80) at the listed size or 2×; videos as MP4 (H.264, no audio track for loops) plus a WebP poster frame. Keep hero loops under ~3 MB.

**Shared style suffix (already appended to each image prompt below):**

> Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.

---

## 1. Site images

| # | Slot id | File | Size | Used on |
|---|---|---|---|---|
| 1 | `hero-ecosystem` | `public/media/hero/ecosystem.webp` | 1600×1200 | Home hero (background layer behind the interactive ecosystem) |
| 2 | `abstract-grid` | `public/media/backgrounds/abstract-grid.webp` | 2400×1200 | Closing CTA panel background (site-wide) |
| 3 | `tech-objects` | `public/media/backgrounds/tech-objects.webp` | 1600×1000 | Technology page hero |
| 4 | `ai-network` | `public/media/ai/neural-network.webp` | 1600×1200 | Home — AI & Automation section background |
| 5 | `hrms-environment` | `public/media/products/hrms-environment.webp` | 1600×1000 | /products/hrms — How it works background |
| 6 | `crm-environment` | `public/media/products/crm-environment.webp` | 1600×1000 | /products/crm — How it works background |
| 7 | `erp-visual` | `public/media/products/erp-visual.webp` | 1600×1000 | /products/erp — How it works background |
| 8 | `mobile-mockups` | `public/media/mobile/app-devices.webp` | 1400×1200 | Mobile App Development page hero |
| 9 | `cloud-infra` | `public/media/cloud/infrastructure.webp` | 1600×1000 | Cloud & DevOps page hero |
| 10 | `software-dev` | `public/media/company/software-development.webp` | 1600×1000 | About page — Leadership & team |
| 11 | `team-collab` | `public/media/company/team-collaboration.webp` | 1600×1000 | About page — Who We Are |
| 12 | `office-culture` | `public/media/company/workspace.webp` | 1600×1000 | Careers page |
| 13 | `product-launch` | `public/media/products/launch.webp` | 1600×900 | Products page hero |
| 14 | `industry-healthcare` | `public/media/industries/healthcare.webp` | 1200×800 | Industry card and /industries/healthcare hero |
| 15 | `industry-education` | `public/media/industries/education.webp` | 1200×800 | Industry card and /industries/education hero |
| 16 | `industry-agriculture` | `public/media/industries/agriculture.webp` | 1200×800 | Industry card and /industries/agriculture hero |
| 17 | `industry-retail` | `public/media/industries/retail.webp` | 1200×800 | Industry card and /industries/retail hero |
| 18 | `industry-manufacturing` | `public/media/industries/manufacturing.webp` | 1200×800 | Industry card and /industries/manufacturing hero |
| 19 | `industry-real-estate` | `public/media/industries/real-estate.webp` | 1200×800 | Industry card and /industries/real-estate hero |
| 20 | `industry-hospitality` | `public/media/industries/hospitality.webp` | 1200×800 | Industry card and /industries/hospitality hero |
| 21 | `industry-finance` | `public/media/industries/finance.webp` | 1200×800 | Industry card and /industries/finance hero |
| 22 | `industry-logistics` | `public/media/industries/logistics.webp` | 1200×800 | Industry card and /industries/logistics hero |
| 23 | `industry-automotive` | `public/media/industries/automotive.webp` | 1200×800 | Industry card and /industries/automotive hero |
| 24 | `industry-professional-services` | `public/media/industries/professional-services.webp` | 1200×800 | Industry card and /industries/professional-services hero |
| 25 | `industry-startups` | `public/media/industries/startups.webp` | 1200×800 | Industry card and /industries/startups hero |
| 26 | `industry-smes` | `public/media/industries/smes.webp` | 1200×800 | Industry card and /industries/smes hero |
| 27 | `industry-enterprise` | `public/media/industries/enterprise.webp` | 1200×800 | Industry card and /industries/enterprise hero |
| 28 | `about-hero` | `public/media/company/about-hero.webp` | 1600×1000 | About page hero |

### Prompts

#### `hero-ecosystem` → `public/media/hero/ecosystem.webp` (1600×1200)
**Alt text:** Abstract 3D technology core connected to floating software modules

```
A glowing translucent glass core sphere at the centre, emitting soft light, with thin luminous connection lines radiating to eight floating frosted-glass rounded panels arranged in a loose orbit at different depths, tiny floating particles and faint data streams, isometric three-quarter camera angle, generous negative space on the left for headline text. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `abstract-grid` → `public/media/backgrounds/abstract-grid.webp` (2400×1200)
**Alt text:** Abstract perspective grid of light

```
Minimal abstract background: infinite perspective grid of fine light lines fading into darkness, a soft horizon glow, sparse floating light particles, calm and elegant, extremely subtle. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `tech-objects` → `public/media/backgrounds/tech-objects.webp` (1600×1000)
**Alt text:** Floating 3D geometric technology objects

```
Composition of floating premium 3D objects: a frosted glass cube, a brushed aluminium torus, a small server-blade-like slab and glowing spheres, arranged with balance, studio lighting. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `ai-network` → `public/media/ai/neural-network.webp` (1600×1200)
**Alt text:** Neural network visual connecting business modules

```
A luminous abstract neural network made of glowing nodes and fine filaments forming a brain-like cloud, with streams of light flowing out to six small floating glass tiles around it, sense of intelligence and flow, cinematic. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `hrms-environment` → `public/media/products/hrms-environment.webp` (1600×1000)
**Alt text:** 3D environment representing workforce management

```
Floating 3D scene representing workforce management: stylised map pin with a soft geo-fence ring on a translucent map plane, a calendar tile, a clock, and a wallet-like card, all frosted glass, connected by light lines, clean studio lighting. Leave the centre-right area clear for a UI overlay. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `crm-environment` → `public/media/products/crm-environment.webp` (1600×1000)
**Alt text:** 3D environment representing sales pipeline

```
Abstract 3D sales pipeline: a sequence of glass funnel rings and flowing light particles moving left to right through stages, small glowing spheres representing leads, elegant and minimal. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `erp-visual` → `public/media/products/erp-visual.webp` (1600×1000)
**Alt text:** 3D visual of connected operations modules

```
Isometric 3D visualisation of connected operations: miniature glass warehouse shelves with boxes, a factory block, a delivery truck and a finance card, all linked by glowing lines on a dark reflective platform. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `mobile-mockups` → `public/media/mobile/app-devices.webp` (1400×1200)
**Alt text:** Two smartphones floating at an angle with blank glowing screens

```
Two modern bezel-less smartphones floating at a slight angle, screens glowing with soft blue gradient and NO interface or text (UI will be overlaid in HTML), premium product photography lighting, reflections on a dark surface. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `cloud-infra` → `public/media/cloud/infrastructure.webp` (1600×1000)
**Alt text:** Abstract cloud infrastructure visual

```
Abstract cloud infrastructure: stacked translucent server layers floating inside a soft volumetric cloud shape, containers as small glowing cubes moving along rails, calm and precise. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `software-dev` → `public/media/company/software-development.webp` (1600×1000)
**Alt text:** Software engineering workspace at night

```
Modern software engineering workspace at dusk: a large curved monitor with abstract blurred colourful code-like light (not readable), a mechanical keyboard, notebook with sketched architecture boxes, warm desk lamp mixed with cool screen glow, photorealistic, shallow depth of field. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `team-collab` → `public/media/company/team-collaboration.webp` (1600×1000)
**Alt text:** Indian technology team collaborating around a whiteboard

```
Photorealistic editorial photo of a diverse Indian technology team of four in a bright modern office in Maharashtra, collaborating around a glass whiteboard with sticky notes and hand-drawn workflow diagrams, natural daylight, candid, professional attire smart casual, no visible text or logos. (Replace with real team photos when available.) Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `office-culture` → `public/media/company/workspace.webp` (1600×1000)
**Alt text:** Modern technology office interior

```
Photorealistic interior of a modern, minimal technology office with plants, warm wood and matte black accents, large windows, a few people working at a distance (not identifiable), soft daylight. No signage or logos. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `product-launch` → `public/media/products/launch.webp` (1600×900)
**Alt text:** Glass product tile emerging from light

```
A single premium frosted glass rounded app tile rising from a pool of blue light with particles, dramatic product-launch lighting, centred composition. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `industry-healthcare` → `public/media/industries/healthcare.webp` (1200×800)
**Alt text:** healthcare industry scene

```
Photorealistic editorial image: clean modern clinic reception with soft daylight, a tablet on the desk, calm healthcare atmosphere, no people faces visible. Photographic realism rather than 3D render, subtle blue-mint colour grade to match the brand. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `industry-education` → `public/media/industries/education.webp` (1200×800)
**Alt text:** education industry scene

```
Photorealistic editorial image: modern classroom and campus library blend, students seen from behind using laptops, bright and hopeful. Photographic realism rather than 3D render, subtle blue-mint colour grade to match the brand. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `industry-agriculture` → `public/media/industries/agriculture.webp` (1200×800)
**Alt text:** agriculture industry scene

```
Photorealistic editorial image: golden-hour farmland in Maharashtra with neat crop rows, a field officer (seen from behind) holding a smartphone, subtle holographic map overlay. Photographic realism rather than 3D render, subtle blue-mint colour grade to match the brand. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `industry-retail` → `public/media/industries/retail.webp` (1200×800)
**Alt text:** retail industry scene

```
Photorealistic editorial image: modern retail store interior with organised shelves and a sleek checkout counter, warm lighting. Photographic realism rather than 3D render, subtle blue-mint colour grade to match the brand. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `industry-manufacturing` → `public/media/industries/manufacturing.webp` (1200×800)
**Alt text:** manufacturing industry scene

```
Photorealistic editorial image: clean modern factory floor with robotic arm and conveyor, a supervisor with a tablet, cool industrial lighting. Photographic realism rather than 3D render, subtle blue-mint colour grade to match the brand. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `industry-real-estate` → `public/media/industries/real-estate.webp` (1200×800)
**Alt text:** real estate industry scene

```
Photorealistic editorial image: contemporary residential towers at dusk with warm window lights, architectural photography. Photographic realism rather than 3D render, subtle blue-mint colour grade to match the brand. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `industry-hospitality` → `public/media/industries/hospitality.webp` (1200×800)
**Alt text:** hospitality industry scene

```
Photorealistic editorial image: boutique hotel lobby with warm ambient lighting, elegant and inviting. Photographic realism rather than 3D render, subtle blue-mint colour grade to match the brand. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `industry-finance` → `public/media/industries/finance.webp` (1200×800)
**Alt text:** finance industry scene

```
Photorealistic editorial image: modern financial office with glass walls and abstract light data lines, calm and trustworthy. Photographic realism rather than 3D render, subtle blue-mint colour grade to match the brand. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `industry-logistics` → `public/media/industries/logistics.webp` (1200×800)
**Alt text:** logistics industry scene

```
Photorealistic editorial image: organised warehouse with pallets and a delivery truck at loading bay, early morning light. Photographic realism rather than 3D render, subtle blue-mint colour grade to match the brand. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `industry-automotive` → `public/media/industries/automotive.webp` (1200×800)
**Alt text:** automotive industry scene

```
Photorealistic editorial image: modern car showroom and service bay, polished floor reflections. Photographic realism rather than 3D render, subtle blue-mint colour grade to match the brand. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `industry-professional-services` → `public/media/industries/professional-services.webp` (1200×800)
**Alt text:** professional services industry scene

```
Photorealistic editorial image: minimal consulting office meeting room with documents and laptop, soft daylight. Photographic realism rather than 3D render, subtle blue-mint colour grade to match the brand. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `industry-startups` → `public/media/industries/startups.webp` (1200×800)
**Alt text:** startups industry scene

```
Photorealistic editorial image: small startup team workspace with laptops and whiteboard, energetic but tidy. Photographic realism rather than 3D render, subtle blue-mint colour grade to match the brand. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `industry-smes` → `public/media/industries/smes.webp` (1200×800)
**Alt text:** smes industry scene

```
Photorealistic editorial image: small business owner in an Indian trading shop using a tablet, warm natural light. Photographic realism rather than 3D render, subtle blue-mint colour grade to match the brand. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `industry-enterprise` → `public/media/industries/enterprise.webp` (1200×800)
**Alt text:** enterprise industry scene

```
Photorealistic editorial image: enterprise headquarters atrium with glass and steel, a few distant professionals, cool daylight. Photographic realism rather than 3D render, subtle blue-mint colour grade to match the brand. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `about-hero` → `public/media/company/about-hero.webp` (1600×1000)
**Alt text:** Abstract visual of ideas becoming connected systems

```
Abstract visual metaphor: a single glowing seed of light on the left transforming into an expanding connected network of glass modules on the right, representing idea to scale. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

---

## 2. Blog featured images (1600×686, 21:9)

Append the shared style suffix to each prompt.

#### `ai-business-automation` → `public/media/blog/ai-business-automation.webp`
**Alt text:** AI core routing work between business systems

```
Abstract 3D glowing AI core in the centre routing streams of light between floating glass modules representing CRM, ERP and HR. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `business-process-automation-guide` → `public/media/blog/business-process-automation-guide.webp`
**Alt text:** Workflow nodes connected in sequence

```
Abstract 3D: sequence of glass workflow nodes connected by glowing arrows on a dark grid, one node branching. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `cloud-migration-checklist` → `public/media/blog/cloud-migration-checklist.webp`
**Alt text:** Servers moving into a cloud

```
Abstract 3D: translucent server layers lifting upward into a soft volumetric cloud with small glowing container cubes. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `custom-crm-vs-ready-made-crm` → `public/media/blog/custom-crm-vs-ready-made-crm.webp`
**Alt text:** Sales pipeline visual with tailored stages

```
Abstract 3D sales pipeline of glass rings with glowing spheres moving through, one ring custom-shaped. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `custom-erp-vs-ready-made-erp` → `public/media/blog/custom-erp-vs-ready-made-erp.webp`
**Alt text:** Connected operations modules visual

```
Isometric 3D: glass warehouse, factory and finance modules connected by glowing lines on a dark reflective platform. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `custom-software-development-cost` → `public/media/blog/custom-software-development-cost.webp`
**Alt text:** Abstract building blocks representing software scope and cost

```
Abstract 3D stacked translucent building blocks of different sizes forming a rising structure, with a soft glowing measuring grid. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `custom-software-vs-saas` → `public/media/blog/custom-software-vs-saas.webp`
**Alt text:** Two paths diverging, one modular and one tailored

```
Abstract 3D split composition: left side standardized identical glass blocks on a conveyor, right side a single bespoke glass structure fitted precisely, glowing path choosing between them. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `digital-transformation-for-smes` → `public/media/blog/digital-transformation-for-smes.webp`
**Alt text:** Small business growing into a connected system

```
Abstract 3D: a small glass shop block with glowing lines growing outward into a connected network of modules. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `how-to-choose-a-software-development-company` → `public/media/blog/how-to-choose-a-software-development-company.webp`
**Alt text:** Checklist visual with connected technology modules

```
Abstract 3D glass clipboard with glowing check marks floating above a connected network of modules. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `location-based-attendance-guide` → `public/media/blog/location-based-attendance-guide.webp`
**Alt text:** Map pin with geo-fence ring

```
Abstract 3D: glowing map pin inside a soft circular geofence ring on a translucent map plane, a smartphone silhouette nearby. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `native-vs-cross-platform-apps` → `public/media/blog/native-vs-cross-platform-apps.webp`
**Alt text:** Two smartphones sharing one glowing codebase

```
Abstract 3D: two floating smartphones with blank glowing screens connected underneath to a single luminous crystal block. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `rag-explained-for-business` → `public/media/blog/rag-explained-for-business.webp`
**Alt text:** Documents feeding into an AI answer

```
Abstract 3D: floating translucent document sheets dissolving into light particles that flow into a glowing sphere which emits a single clean beam. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `website-vs-web-application` → `public/media/blog/website-vs-web-application.webp`
**Alt text:** Browser window transforming into an application dashboard

```
Abstract 3D: a simple glass browser frame on the left morphing into a layered interactive dashboard of glass panels on the right. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `what-are-ai-agents` → `public/media/blog/what-are-ai-agents.webp`
**Alt text:** AI agent orchestrating tools

```
Abstract 3D: a luminous orb (the agent) extending light threads to floating glass tool icons shaped like a calendar, database cylinder, envelope and document. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `what-is-custom-software-development` → `public/media/blog/what-is-custom-software-development.webp`
**Alt text:** Architecture sketch turning into a connected software system

```
Abstract 3D visual: a hand-drawn architecture sketch on paper transforming into glowing connected glass software modules. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

#### `what-is-hrms-software` → `public/media/blog/what-is-hrms-software.webp`
**Alt text:** Workforce management visual

```
Abstract 3D: frosted glass calendar, clock, map pin with geofence ring and wallet card floating and connected by light. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

---

## 3. Videos

| Slot id | File | Poster | Captions | Used on |
|---|---|---|---|---|
| `hero-loop` | `public/media/video/hero-loop.mp4` | `public/media/video/hero-loop-poster.webp` | — (muted loop) | Home hero (optional background loop, muted) |
| `hrms-product` | `public/media/video/hrms-product.mp4` | `public/media/video/hrms-product-poster.webp` | `public/media/video/hrms-product.en.vtt` | HRMS showcase, /products/hrms |
| `crm-product` | `public/media/video/crm-product.mp4` | `public/media/video/crm-product-poster.webp` | `public/media/video/crm-product.en.vtt` | /products/crm |
| `ai-explainer` | `public/media/video/ai-explainer.mp4` | `public/media/video/ai-explainer-poster.webp` | `public/media/video/ai-explainer.en.vtt` | Home video section, /products/ai-agents |
| `company-film` | `public/media/video/company.mp4` | `public/media/video/company-poster.webp` | `public/media/video/company.en.vtt` | Home video section |

### 3.1 Hero loop (`hero-loop`) — 8–10 s, muted, seamless

```
8–10 second seamless loop, muted. Slow orbiting camera around a glowing glass technology core; eight frosted panels float and gently bob; light pulses travel along connection lines from the core to each panel; particles drift. First and last frame identical for a perfect loop. Premium enterprise technology aesthetic, realistic 3D render, clean composition, deep navy (#060A1A) background with electric blue (#3D6BFF) and mint (#2EE6A6) accent lighting, soft volumetric light, subtle glass and brushed-metal materials, shallow depth of field, high-end SaaS brand imagery. No text, no letters, no logos, no numbers, no watermarks, no distorted UI, no people unless specified.
```

### 3.2 FairBazaar HRMS product video (`hrms-product`) — 75–90 s, 16:9

**Production notes:** Use real HTML UI captured from the site's HRMS mockups/tour (not AI-generated UI text) for screen scenes; use AI/3D generation only for transitions and environments. Calm, confident narration (Indian English), soft corporate electronic music at −20 dB under voice, subtle UI clicks/whooshes. Burn in or deliver `.vtt` captions (English).

| # | Scene | Visual | Narration (VO) | On-screen caption |
|---|---|---|---|---|
| 1 | HR dashboard appears | Camera glides onto a glowing 3D glass dashboard that resolves into the HRMS workforce dashboard | "Managing a growing workforce shouldn't mean juggling registers, spreadsheets and messages." | Your entire workforce. One platform. |
| 2 | Employee clocks in | Close-up of a phone; employee taps **Check in** | "With FairBazaar HRMS, employees check in from their phone." | Mobile check-in |
| 3 | Location verification | Map plane with pulsing geo-fence ring; pin settles inside | "Their location is verified against the site's geo-fence — in seconds." | Location verified |
| 4 | Attendance updates | "Present" counter ticks up; row appears in live check-ins | "Attendance is recorded instantly. No paper. No guesswork." | Attendance recorded in real time |
| 5 | Manager notified | Manager dashboard toast slides in | "Managers see their team's status the moment it changes." | Manager dashboard updates |
| 6 | Leave request submitted | Phone form: leave type, dates, Submit | "Need time off? Employees apply in a few taps." | Leave request submitted |
| 7 | Manager approves leave | Approve button pressed; balance updates | "Managers approve from anywhere, and balances update automatically." | Leave approved |
| 8 | Payroll calculation | Payroll screen assembles from attendance + leave data streams | "At month end, payroll is calculated directly from attendance and leave." | Payroll calculated |
| 9 | Expense management | Receipt photo → claim → routed for approval | "Expenses are submitted with receipts and routed for approval." | Expense submitted |
| 10 | HR analytics | Charts animate: attendance trend, headcount, cost | "And HR gets analytics that turn everyday data into decisions." | HR analytics updated |
| 11 | Complete workforce dashboard | Pull back to full dashboard floating in 3D space with module tiles orbiting | "FairBazaar HRMS. One platform. Complete workforce management." | FairBazaar HRMS — One Platform. Complete Workforce Management. |
| End | CTA card | Logo + button | "Request your demo today." | Request a Demo · fairbazaar.in/products/hrms |

**Transition prompt (AI-generated B-roll between scenes, 2–3 s each):**
```
Smooth camera move through a dark navy space with frosted glass UI panels floating at different depths, electric blue and mint light trails connecting them, soft particles, premium SaaS aesthetic, no text, no logos.
```

### 3.3 CRM product video (`crm-product`) — 45 s

| # | Visual | Narration |
|---|---|---|
| 1 | Leads streaming in as light particles from web, WhatsApp and ads icons into a glass funnel | "Every enquiry matters — wherever it comes from." |
| 2 | CRM screen: lead auto-assigned, salesperson notified | "FairBazaar CRM captures each lead and assigns it instantly." |
| 3 | Follow-up reminder pops; call logged | "Automatic reminders mean no follow-up is forgotten." |
| 4 | Kanban card moves New → Proposal → Won | "Track every deal through a pipeline shaped around how you sell." |
| 5 | Reports: source-wise conversion chart | "And see which channels actually bring customers." |
| 6 | Logo + CTA | "FairBazaar CRM. Close more deals. Request a demo." |

### 3.4 AI explainer (`ai-explainer`) — 45 s

| # | Visual | Narration |
|---|---|---|
| 1 | Customer message appears on phone (WhatsApp-style, generic UI) | "A customer asks a question at 11 pm." |
| 2 | Neural network visual lights up; documents fly in | "A FairBazaar AI agent understands the request and searches your approved documents." |
| 3 | Answer with citation badge | "It answers accurately — and shows where the answer came from." |
| 4 | Agent action card "Create CRM ticket → Needs approval" | "When action is needed, it updates your CRM or ERP — with human approval for sensitive steps." |
| 5 | Flow: Customer → AI → CRM → ERP → HRMS → Analytics | "Every system stays in sync." |
| 6 | Logo + CTA | "AI that works with your business. Build your AI solution with FairBazaar." |

### 3.5 Company film (`company-film`) — 45 s

| # | Visual | Narration |
|---|---|---|
| 1 | Sunrise over a Maharashtra cityscape → modern office (generated or real footage) | "Every business runs on processes." |
| 2 | Hands sketching workflow on whiteboard | "At FairBazaar, we start by understanding yours." |
| 3 | Sketch morphs into glass architecture diagram | "Then we design the technology around it…" |
| 4 | Code-like light (unreadable) + UI assembling | "…and build it — SaaS products, custom software and AI." |
| 5 | Montage: HRMS, CRM, ERP, mobile app screens (real HTML UI) | "Connected platforms that help teams operate, automate and grow." |
| 6 | Logo + tagline | "FairBazaar. Technology that transforms businesses." |

> Use real team footage for people shots when available; AI-generated people should not be presented as FairBazaar employees.
