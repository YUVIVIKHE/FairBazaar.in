import type { CaseStudy } from "./types";

/**
 * Solution stories.
 *
 * These are REFERENCE IMPLEMENTATIONS: they describe how FairBazaar approaches a common business
 * problem, the architecture and the expected qualitative outcomes. They do not name clients or
 * claim measured results. When a real, client-approved case study is available, add it here with
 * `kind: "Client case study"` and only verified metrics.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "field-workforce-attendance-payroll",
    title: "Location-verified attendance and payroll for a distributed workforce",
    kind: "Reference implementation",
    industry: "Multi-site operations",
    summary: "How FairBazaar HRMS connects geo-fenced mobile check-ins, approvals and payroll for teams spread across sites.",
    metaDescription: "Reference implementation: location-based attendance, leave, expenses and attendance-linked payroll for distributed teams using FairBazaar HRMS.",
    problem: "Organisations with staff across multiple sites or in the field often rely on paper registers, phone calls and spreadsheets to track attendance, then calculate payroll manually.",
    challenge: ["Attendance can't be verified for field staff", "Leave and expense approvals happen over messages", "Payroll takes days of manual reconciliation", "Managers lack a real-time view of their teams"],
    solution: "Deploy FairBazaar HRMS with geo-fenced mobile attendance, configurable approval chains, and payroll that reads directly from attendance and leave data.",
    technology: ["Next.js web app", "React Native mobile app", "FastAPI services", "PostgreSQL", "Geo-fencing", "Cloud hosting"],
    implementation: [
      { phase: "Week 1–2", text: "Policy mapping: shifts, leave types, pay components, sites and geo-fences." },
      { phase: "Week 3–4", text: "Configuration, employee data import and role setup." },
      { phase: "Week 5–6", text: "Pilot with one site, feedback and adjustments." },
      { phase: "Week 7+", text: "Organisation-wide rollout and first parallel payroll run." },
    ],
    features: ["Geo-fenced check-in", "Selfie/photo verification (optional)", "Leave & holiday calendars", "Expense claims with receipts", "Attendance-linked payroll", "Manager dashboard"],
    before: ["Paper or spreadsheet attendance", "Approvals over messages", "Manual payroll calculation", "No real-time visibility"],
    after: ["Verified mobile check-in", "Structured approvals with history", "Payroll computed from attendance", "Live manager and HR dashboards"],
    outcomes: ["Attendance that can be trusted for payroll", "Faster month-end processing", "Transparent approvals for employees", "Workforce data available for decisions"],
    architecture: [
      { layer: "Clients", items: ["Employee mobile app", "Manager & admin web"] },
      { layer: "Services", items: ["Attendance", "Leave", "Payroll", "Expenses", "Notifications"] },
      { layer: "Data", items: ["PostgreSQL", "Document storage", "Audit log"] },
    ],
    mockup: "hrms",
    relatedServices: ["hrms-development", "mobile-app-development"],
    relatedProducts: ["hrms"],
  },
  {
    slug: "dealer-crm-lead-automation",
    title: "Unified lead capture and follow-up automation for a dealer network",
    kind: "Reference implementation",
    industry: "Dealers & distributors",
    summary: "Capturing leads from every channel, routing them to the right dealer or salesperson and tracking follow-ups to conversion.",
    metaDescription: "Reference implementation: multi-channel lead capture, automatic assignment and follow-up automation for dealer and distributor networks.",
    problem: "Businesses selling through dealers or field sales teams receive enquiries from websites, ads, calls and WhatsApp, but leads get lost between channels and follow-ups depend on individual memory.",
    challenge: ["Leads scattered across channels", "No rule for who follows up", "Unknown marketing ROI", "Management can't see pipeline"],
    solution: "Deploy FairBazaar Lead Management and CRM with source tracking, territory-based assignment, automated reminders and a management dashboard.",
    technology: ["Next.js", "FastAPI", "PostgreSQL", "WhatsApp Business API", "Webhooks"],
    implementation: [
      { phase: "Discovery", text: "Map lead sources, territories, stages and dealer structure." },
      { phase: "Build", text: "Configure pipeline, assignment rules and integrations." },
      { phase: "Launch", text: "Train sales and dealers; migrate open leads." },
      { phase: "Optimise", text: "Review source-wise conversion and refine rules." },
    ],
    features: ["Web, ad and WhatsApp capture", "UTM attribution", "Territory routing", "Follow-up reminders", "Dealer logins", "Pipeline reports"],
    before: ["Leads in inboxes and phones", "Manual distribution", "No follow-up tracking", "Guesswork on marketing spend"],
    after: ["All leads in one system", "Instant, rule-based assignment", "Reminders and overdue alerts", "Source-wise conversion reports"],
    outcomes: ["Fewer lost enquiries", "Faster first response", "Accountability across the network", "Data-driven marketing decisions"],
    architecture: [
      { layer: "Sources", items: ["Website", "Ads", "WhatsApp", "Walk-in"] },
      { layer: "Platform", items: ["Lead intake API", "Assignment engine", "CRM", "Notifications"] },
      { layer: "Insight", items: ["Pipeline dashboard", "Attribution reports"] },
    ],
    mockup: "crm",
    relatedServices: ["crm-development", "business-automation"],
    relatedProducts: ["crm", "lead-management"],
  },
  {
    slug: "rag-knowledge-assistant",
    title: "AI knowledge assistant grounded in company documents",
    kind: "Reference implementation",
    industry: "Knowledge-intensive teams",
    summary: "A retrieval-augmented AI assistant that answers staff and customer questions from approved documents, with citations and access control.",
    metaDescription: "Reference implementation: a RAG-based AI assistant that answers questions from company documents with citations, permissions and evaluation.",
    problem: "Policies, product information and procedures live across PDFs, drives and wikis. Teams spend time searching or asking colleagues, and answers are inconsistent.",
    challenge: ["Knowledge spread across formats", "Inconsistent answers", "Sensitive documents need access control", "Risk of AI hallucination"],
    solution: "Build a RAG pipeline that ingests approved documents, retrieves relevant passages per question and generates cited answers, restricted by user permissions and evaluated against test questions.",
    technology: ["Python", "FastAPI", "LangChain / LangGraph", "Vector database", "LLM provider (model-agnostic)", "PostgreSQL"],
    implementation: [
      { phase: "Scope", text: "Select document sets, users and evaluation questions." },
      { phase: "Ingest", text: "Parse, chunk and embed documents with metadata and permissions." },
      { phase: "Evaluate", text: "Measure answer accuracy and citation quality; tune retrieval." },
      { phase: "Deploy", text: "Web and chat interfaces with logging and feedback." },
    ],
    features: ["Cited answers", "Permission-aware retrieval", "Feedback on answers", "Admin document management", "Usage analytics"],
    before: ["Manual searching", "Repeated questions to experts", "Inconsistent answers"],
    after: ["Instant answers with sources", "Experts freed for complex issues", "Consistent, auditable responses"],
    outcomes: ["Faster access to knowledge", "Reduced repetitive queries", "Answers traceable to sources"],
    architecture: [
      { layer: "Ingestion", items: ["Document parsers", "Chunking", "Embeddings"] },
      { layer: "Retrieval", items: ["Vector search", "Permission filter", "Re-ranking"] },
      { layer: "Generation", items: ["LLM", "Citation formatter", "Guardrails"] },
    ],
    mockup: "ai",
    relatedServices: ["ai-development"],
    relatedProducts: ["ai-agents"],
  },
  {
    slug: "manufacturing-erp-inventory",
    title: "Connected inventory, purchasing and dispatch for a manufacturing unit",
    kind: "Reference implementation",
    industry: "Manufacturing",
    summary: "Replacing spreadsheet-based stock and order tracking with a modular ERP that connects purchasing, production and dispatch.",
    metaDescription: "Reference implementation: modular ERP connecting inventory, purchasing, production and dispatch for manufacturing SMEs.",
    problem: "Small and mid-sized manufacturers often track raw materials, work in progress and orders across spreadsheets, making it hard to promise delivery dates or control material costs.",
    challenge: ["Stock figures don't match reality", "Purchases triggered late", "Order status unclear", "Month-end reports assembled manually"],
    solution: "Deploy FairBazaar ERP modules for inventory, purchasing, work orders and dispatch in phases, with reorder alerts and management dashboards.",
    technology: ["Next.js", "Django", "PostgreSQL", "Docker", "Cloud hosting"],
    implementation: [
      { phase: "Phase 1", text: "Inventory and item master with opening stock." },
      { phase: "Phase 2", text: "Purchasing and goods receipt with approvals." },
      { phase: "Phase 3", text: "Work orders and production tracking." },
      { phase: "Phase 4", text: "Dispatch, invoicing and dashboards." },
    ],
    features: ["Item master & BOM", "Reorder alerts", "Purchase approvals", "Work orders", "Dispatch & invoicing", "Management dashboard"],
    before: ["Spreadsheet stock", "Late purchasing", "Unclear order status", "Manual reports"],
    after: ["Real-time stock ledger", "Automated reorder suggestions", "Live order tracking", "Instant reports"],
    outcomes: ["Reliable stock data", "Better delivery commitments", "Tighter material control"],
    architecture: [
      { layer: "Modules", items: ["Inventory", "Purchasing", "Production", "Sales & dispatch"] },
      { layer: "Core", items: ["Workflow engine", "Roles", "Audit log"] },
      { layer: "Data", items: ["PostgreSQL", "Reporting views"] },
    ],
    mockup: "erp",
    relatedServices: ["erp-development", "digital-transformation"],
    relatedProducts: ["erp", "inventory-management"],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
