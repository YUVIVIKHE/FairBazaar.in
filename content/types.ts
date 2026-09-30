export type FAQ = { q: string; a: string };

export type IconName =
  | "code" | "layers" | "brain" | "bot" | "users" | "briefcase" | "globe" | "smartphone" | "cloud"
  | "workflow" | "sparkles" | "compass" | "palette" | "boxes" | "chart" | "target" | "package"
  | "cpu" | "shield" | "heart" | "graduation" | "sprout" | "store" | "factory" | "building"
  | "hotel" | "landmark" | "truck" | "car" | "scale" | "rocket" | "trending" | "server" | "database"
  | "zap" | "file" | "message" | "calendar" | "map" | "wallet" | "receipt" | "clipboard" | "bell"
  | "lock" | "search" | "link" | "settings" | "gauge";

export type Service = {
  slug: string;
  name: string;
  navLabel: string;
  icon: IconName;
  seoTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  /** Direct 40–60 word answer for AEO. */
  answer: { question: string; text: string };
  problems: string[];
  offerings: { title: string; text: string }[];
  process: { title: string; text: string }[];
  outcomes: string[];
  technologies: string[];
  faqs: FAQ[];
  relatedProducts: string[];
  relatedIndustries: string[];
  relatedPosts: string[];
  keywords: string[];
  pillar?: boolean;
};

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  icon: IconName;
  category: string;
  seoTitle: string;
  metaDescription: string;
  tagline: string;
  headline: string;
  intro: string;
  answer: { question: string; text: string };
  highlights: string[];
  modules: { title: string; text: string; icon: IconName }[];
  workflow: string[];
  roles: { role: string; text: string }[];
  deployment: string[];
  mockup: "hrms" | "crm" | "erp" | "leads" | "inventory" | "automation" | "ai" | "custom";
  faqs: FAQ[];
  relatedServices: string[];
  relatedIndustries: string[];
  relatedPosts: string[];
  status: "available" | "custom-deployment";
};

export type Industry = {
  slug: string;
  name: string;
  icon: IconName;
  seoTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  answer: { question: string; text: string };
  challenges: { title: string; text: string }[];
  solutions: { title: string; text: string; href?: string }[];
  features: string[];
  technology: string[];
  useCases: { title: string; text: string }[];
  benefits: string[];
  workflow: string[];
  faqs: FAQ[];
  relatedServices: string[];
  relatedProducts: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  kind: string;
  industry: string;
  summary: string;
  metaDescription: string;
  problem: string;
  challenge: string[];
  solution: string;
  technology: string[];
  implementation: { phase: string; text: string }[];
  features: string[];
  before: string[];
  after: string[];
  outcomes: string[];
  architecture: { layer: string; items: string[] }[];
  mockup: Product["mockup"];
  relatedServices: string[];
  relatedProducts: string[];
};
