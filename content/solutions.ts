import type { IconName } from "./types";

export type SolutionCategory = {
  slug: string;
  name: string;
  icon: IconName;
  summary: string;
  bestFor: string;
  includes: string[];
  timeline: string;
  links: { label: string; href: string }[];
};

export const solutionCategories: SolutionCategory[] = [
  {
    slug: "business-solutions", name: "Business Solutions", icon: "briefcase",
    summary: "Ready platforms for sales, workforce and operations — configured to your processes.",
    bestFor: "SMEs and growing companies replacing spreadsheets",
    includes: ["FairBazaar CRM", "FairBazaar HRMS", "FairBazaar ERP", "Lead Management", "Inventory"],
    timeline: "Weeks to configure",
    links: [{ label: "HRMS", href: "/products/hrms" }, { label: "CRM", href: "/products/crm" }, { label: "ERP", href: "/products/erp" }],
  },
  {
    slug: "ai-solutions", name: "AI Solutions", icon: "brain",
    summary: "AI agents, RAG knowledge assistants and document intelligence connected to your systems.",
    bestFor: "Teams with repetitive knowledge, support or document work",
    includes: ["AI Agents", "RAG systems", "Document intelligence", "AI support & sales assistants", "AI analytics"],
    timeline: "Prototype in weeks",
    links: [{ label: "AI Development", href: "/services/ai-development" }, { label: "AI Agents", href: "/products/ai-agents" }],
  },
  {
    slug: "enterprise-solutions", name: "Enterprise Solutions", icon: "building",
    summary: "Custom enterprise applications, integrations and modernisation with governance built in.",
    bestFor: "Enterprises with complex, multi-system processes",
    includes: ["Custom enterprise apps", "Integration layer", "Legacy modernisation", "SSO & audit", "SLA support"],
    timeline: "Phased, multi-quarter",
    links: [{ label: "Enterprise", href: "/industries/enterprise" }, { label: "Custom Software", href: "/services/custom-software-development" }],
  },
  {
    slug: "industry-solutions", name: "Industry Solutions", icon: "factory",
    summary: "Solutions shaped for healthcare, education, agriculture, retail, manufacturing and more.",
    bestFor: "Organisations with industry-specific workflows",
    includes: ["Healthcare", "Education", "Agriculture", "Retail", "Manufacturing", "Logistics"],
    timeline: "Depends on scope",
    links: [{ label: "All industries", href: "/industries" }],
  },
  {
    slug: "automation-solutions", name: "Automation Solutions", icon: "workflow",
    summary: "Workflows, approvals, notifications and integrations that remove manual steps.",
    bestFor: "Operations teams with repetitive, rule-based work",
    includes: ["Workflow automation", "Approvals", "Notifications", "Integrations", "AI automation"],
    timeline: "Quick wins in weeks",
    links: [{ label: "Business Automation", href: "/services/business-automation" }, { label: "Automation platform", href: "/products/business-automation" }],
  },
  {
    slug: "digital-transformation", name: "Digital Transformation", icon: "compass",
    summary: "A phased roadmap from manual operations to a connected, data-driven business.",
    bestFor: "Leadership planning a structured modernisation",
    includes: ["Process mapping", "Technology roadmap", "System implementation", "Change management", "Analytics"],
    timeline: "Roadmap in weeks, delivery in phases",
    links: [{ label: "Digital Transformation", href: "/services/digital-transformation" }, { label: "IT Consulting", href: "/services/it-consulting" }],
  },
];
