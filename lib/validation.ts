import { z } from "zod";

const clean = (max: number) => z.string().trim().max(max).transform((s) => s.replace(/[\u0000-\u001F\u007F]/g, " "));

export const industries = ["Healthcare", "Education", "Agriculture", "Retail", "Manufacturing", "Real Estate", "Hospitality", "Finance", "Logistics", "Automotive", "Professional Services", "Startup", "Other"] as const;
export const companySizes = ["1–10", "11–50", "51–200", "201–1000", "1000+"] as const;
export const requiredServices = [
  "Custom Software Development", "SaaS Product Development", "AI Development / AI Agents", "Web Development", "Mobile App Development",
  "CRM", "ERP", "HRMS / Payroll", "Business Automation", "Cloud & DevOps", "UI/UX Design", "Digital Transformation", "IT Consulting", "Product demo", "Careers", "Other",
] as const;
export const budgets = ["Under ₹5 lakh", "₹5–15 lakh", "₹15–50 lakh", "₹50 lakh+", "Not sure yet"] as const;

export const contactSchema = z.object({
  name: clean(100).pipe(z.string().min(2, "Please enter your name")),
  company: clean(120).optional().default(""),
  email: z.string().trim().toLowerCase().email("Please enter a valid email").max(160),
  phone: z.string().trim().max(20).regex(/^[+\d\s()-]*$/, "Please enter a valid phone number").optional().default(""),
  industry: z.enum(industries).or(z.literal("")).optional().default(""),
  companySize: z.enum(companySizes).or(z.literal("")).optional().default(""),
  service: z.enum(requiredServices, { errorMap: () => ({ message: "Please choose a service" }) }),
  budget: z.enum(budgets).or(z.literal("")).optional().default(""),
  message: clean(4000).pipe(z.string().min(10, "Please tell us a little more (10+ characters)")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the privacy policy" }) }),
  intent: clean(40).optional().default(""),
  product: clean(60).optional().default(""),
  attribution: z.record(z.string().max(200)).optional().default({}),
  // spam defences
  website: z.string().max(0, "Spam detected").optional().default(""),
  startedAt: z.number().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email").max(160),
  source: clean(40).optional().default("site"),
  website: z.string().max(0).optional().default(""),
});
