export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { label: string; href: string; columns: { title: string; links: NavLink[] }[]; feature?: { title: string; text: string; href: string; cta: string } };

export const mainNav: NavGroup[] = [
  {
    label: "Products", href: "/products",
    columns: [
      { title: "Platforms", links: [
        { label: "HRMS", href: "/products/hrms", description: "Attendance, payroll & workforce" },
        { label: "CRM", href: "/products/crm", description: "Leads, deals & follow-ups" },
        { label: "ERP", href: "/products/erp", description: "Inventory, purchasing & finance" },
      ] },
      { title: "Growth & AI", links: [
        { label: "Lead Management", href: "/products/lead-management", description: "Capture and convert every enquiry" },
        { label: "AI Agents", href: "/products/ai-agents", description: "AI that acts inside your systems" },
        { label: "Business Automation", href: "/products/business-automation", description: "Workflows & approvals" },
      ] },
    ],
    feature: { title: "FairBazaar HRMS", text: "Location-verified attendance connected to payroll.", href: "/products/hrms", cta: "Request an HRMS demo" },
  },
  {
    label: "Solutions", href: "/solutions",
    columns: [
      { title: "Industries", links: [
        { label: "Healthcare", href: "/industries/healthcare" },
        { label: "Education", href: "/industries/education" },
        { label: "Agriculture", href: "/industries/agriculture" },
        { label: "Retail", href: "/industries/retail" },
        { label: "Manufacturing", href: "/industries/manufacturing" },
        { label: "Enterprise", href: "/industries/enterprise" },
      ] },
      { title: "By need", links: [
        { label: "Business Solutions", href: "/solutions#business-solutions" },
        { label: "AI Solutions", href: "/solutions#ai-solutions" },
        { label: "Automation Solutions", href: "/solutions#automation-solutions" },
        { label: "All industries", href: "/industries" },
      ] },
    ],
  },
  {
    label: "Services", href: "/services",
    columns: [
      { title: "Build", links: [
        { label: "Custom Software", href: "/services/custom-software-development" },
        { label: "SaaS Development", href: "/services/saas-development" },
        { label: "Web Development", href: "/services/web-development" },
        { label: "Mobile Apps", href: "/services/mobile-app-development" },
      ] },
      { title: "Transform", links: [
        { label: "AI Development", href: "/services/ai-development" },
        { label: "Cloud & DevOps", href: "/services/cloud-devops" },
        { label: "Digital Transformation", href: "/services/digital-transformation" },
        { label: "All services", href: "/services" },
      ] },
    ],
    feature: { title: "Have a project in mind?", text: "Get a scoped plan after a free discovery call.", href: "/contact?intent=project", cta: "Start your project" },
  },
  {
    label: "Resources", href: "/blog",
    columns: [
      { title: "Learn", links: [
        { label: "Blog", href: "/blog", description: "Insights on AI, SaaS and software" },
        { label: "Case Studies", href: "/case-studies", description: "How we solve business problems" },
        { label: "Guides", href: "/blog/category/guides", description: "Practical how-to guides" },
        { label: "FAQs", href: "/faq", description: "Answers to common questions" },
      ] },
      { title: "Explore", links: [{ label: "Technology", href: "/technology" }, { label: "Solutions", href: "/solutions" }] },
    ],
  },
  {
    label: "Company", href: "/about",
    columns: [
      { title: "Company", links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
        { label: "Security", href: "/security" },
      ] },
    ],
  },
];
