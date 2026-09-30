import type { IconName } from "./types";

export type TechGroup = { slug: string; name: string; icon: IconName; capability: string; why: string; items: { name: string; use: string }[] };

export const techGroups: TechGroup[] = [
  {
    slug: "frontend", name: "Frontend", icon: "palette",
    capability: "Fast, accessible, SEO-ready interfaces",
    why: "Server rendering and static generation deliver fast first loads and strong search visibility; component systems keep large applications consistent.",
    items: [
      { name: "React", use: "Interactive interfaces and dashboards" },
      { name: "Next.js", use: "SEO-friendly websites and web apps with SSR/SSG" },
      { name: "TypeScript / JavaScript", use: "Type-safe, maintainable frontends" },
      { name: "HTML & CSS", use: "Semantic, accessible markup and responsive layouts" },
    ],
  },
  {
    slug: "backend", name: "Backend", icon: "server",
    capability: "Secure, scalable business logic and APIs",
    why: "We choose the backend by workload: Python for AI and data-heavy services, Django for admin-rich platforms, Java for large enterprise systems, PHP where it fits existing estates.",
    items: [
      { name: "Python", use: "AI, data processing and automation services" },
      { name: "FastAPI", use: "High-performance APIs and AI services" },
      { name: "Django", use: "Admin-rich business platforms" },
      { name: "PHP", use: "Web platforms and legacy modernisation" },
      { name: "Java / Spring Boot", use: "Enterprise-grade services" },
    ],
  },
  {
    slug: "ai", name: "AI", icon: "brain",
    capability: "Grounded, governed AI that takes action",
    why: "Retrieval grounds answers in your data; agent frameworks let AI use tools safely; evaluation and guardrails keep outputs reliable.",
    items: [
      { name: "LLMs", use: "Commercial and open-source models, selected per use case" },
      { name: "RAG", use: "Answers grounded in your documents with citations" },
      { name: "LangChain", use: "LLM application pipelines" },
      { name: "LangGraph", use: "Stateful, multi-step AI agents" },
      { name: "AI Agents", use: "Tool-using agents with approvals" },
      { name: "Vector Databases", use: "Semantic search over documents" },
    ],
  },
  {
    slug: "cloud", name: "Cloud & DevOps", icon: "cloud",
    capability: "Reliable, repeatable delivery",
    why: "Containers and CI/CD make releases predictable; monitoring and backups keep production healthy.",
    items: [
      { name: "AWS", use: "Scalable cloud infrastructure" },
      { name: "Docker", use: "Consistent environments" },
      { name: "CI/CD", use: "Automated testing and deployment" },
      { name: "Cloud infrastructure", use: "Monitoring, backups and security hardening" },
    ],
  },
  {
    slug: "data", name: "Databases", icon: "database",
    capability: "Trustworthy data at the core",
    why: "Relational databases for transactional integrity; vector stores for AI retrieval; managed platforms for speed.",
    items: [
      { name: "PostgreSQL", use: "Primary transactional database" },
      { name: "MySQL", use: "Web and legacy platforms" },
      { name: "Supabase", use: "Managed Postgres, auth and storage" },
      { name: "Vector databases", use: "Embeddings for AI search" },
    ],
  },
  {
    slug: "mobile", name: "Mobile", icon: "smartphone",
    capability: "Apps for customers and field teams",
    why: "Cross-platform frameworks deliver Android and iOS from one codebase; native where performance demands it.",
    items: [
      { name: "React Native", use: "Cross-platform business apps" },
      { name: "Flutter", use: "Cross-platform apps with custom UI" },
      { name: "Kotlin / Swift", use: "Native capabilities" },
    ],
  },
];
