"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { industries, companySizes, requiredServices, budgets } from "@/lib/validation";
import { getAttribution, track } from "@/lib/analytics";

const serviceFromSlug: Record<string, (typeof requiredServices)[number]> = {
  "custom-software-development": "Custom Software Development", "saas-development": "SaaS Product Development", "ai-development": "AI Development / AI Agents",
  "web-development": "Web Development", "mobile-app-development": "Mobile App Development", "crm-development": "CRM", "erp-development": "ERP",
  "hrms-development": "HRMS / Payroll", "business-automation": "Business Automation", "cloud-devops": "Cloud & DevOps", "ui-ux-design": "UI/UX Design",
  "digital-transformation": "Digital Transformation", "it-consulting": "IT Consulting",
  hrms: "HRMS / Payroll", crm: "CRM", erp: "ERP", "lead-management": "CRM", "inventory-management": "ERP", "ai-agents": "AI Development / AI Agents", "custom-business-software": "Custom Software Development",
};

type Errors = Partial<Record<string, string[]>>;

const field = "mt-1.5 block h-12 w-full rounded-xl border border-line bg-white px-4 text-[15px] text-ink-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100 aria-[invalid=true]:border-coral-400";

function F({ id, label, children, required, hint, error }: { id: string; label: string; children: React.ReactNode; required?: boolean; hint?: string; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink-900">{label}{required && <span className="text-coral-400" aria-hidden="true"> *</span>}</label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1 text-xs text-slate-500">{hint}</p>}
      {error && <p id={`${id}-err`} className="mt-1 text-xs font-medium text-coral-400">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const sp = useSearchParams();
  const intent = sp.get("intent") ?? "";
  const product = sp.get("product") ?? "";
  const preset = serviceFromSlug[sp.get("service") ?? ""] ?? serviceFromSlug[product] ?? (intent === "demo" ? "Product demo" : intent === "careers" ? "Careers" : "");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [msg, setMsg] = useState("");
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => { startedAt.current = Date.now(); }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"), company: fd.get("company"), email: fd.get("email"), phone: fd.get("phone"),
      industry: fd.get("industry") || "", companySize: fd.get("companySize") || "", service: fd.get("service"), budget: fd.get("budget") || "",
      message: fd.get("message"), consent: fd.get("consent") === "on", website: fd.get("website") || "",
      intent, product, attribution: getAttribution(), startedAt: startedAt.current,
    };
    setState("loading"); setErrors({}); setMsg("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(data.fieldErrors ?? {});
        setMsg(data.error ?? "Something went wrong. Please try again.");
        setState("error");
        requestAnimationFrame(() => (formRef.current?.querySelector("[aria-invalid=true]") as HTMLElement | null)?.focus());
        return;
      }
      setState("ok");
      track(intent === "demo" ? "demo_request" : "contact_submit", { service: payload.service, intent, product });
    } catch {
      setState("error");
      setMsg("Network error. Please check your connection and try again.");
    }
  }

  if (state === "ok") {
    return (
      <div role="status" className="rounded-2xl border border-mint-400/40 bg-mint-400/5 p-8 text-center">
        <CheckCircle2 aria-hidden="true" className="mx-auto size-12 text-mint-500" />
        <h2 className="mt-4 text-2xl font-bold">Thank you — we've received your request</h2>
        <p className="mt-2 text-slate-600">A FairBazaar technology expert will get back to you shortly with next steps.</p>
        <Link href="/case-studies" className="mt-6 inline-block text-sm font-semibold text-brand-600">Meanwhile, explore our solution stories →</Link>
      </div>
    );
  }

  const err = (k: string) => errors[k]?.[0];
  const a = (k: string) => ({ "aria-invalid": Boolean(err(k)), "aria-describedby": err(k) ? `${k}-err` : undefined });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby="form-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <F id="name" error={err("name")} label="Full name" required><input id="name" name="name" autoComplete="name" required className={field} {...a("name")} /></F>
        <F id="company" error={err("company")} label="Company"><input id="company" name="company" autoComplete="organization" className={field} {...a("company")} /></F>
        <F id="email" error={err("email")} label="Work email" required><input id="email" name="email" type="email" autoComplete="email" required className={field} {...a("email")} /></F>
        <F id="phone" error={err("phone")} label="Phone"><input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" className={field} {...a("phone")} /></F>
        <F id="industry" error={err("industry")} label="Industry">
          <select id="industry" name="industry" className={field} defaultValue="" {...a("industry")}><option value="">Select industry</option>{industries.map((o) => <option key={o}>{o}</option>)}</select>
        </F>
        <F id="companySize" error={err("companySize")} label="Company size">
          <select id="companySize" name="companySize" className={field} defaultValue="" {...a("companySize")}><option value="">Select size</option>{companySizes.map((o) => <option key={o}>{o}</option>)}</select>
        </F>
        <F id="service" error={err("service")} label="Required service" required>
          <select id="service" name="service" required className={field} defaultValue={preset} {...a("service")}><option value="" disabled>Select a service</option>{requiredServices.map((o) => <option key={o}>{o}</option>)}</select>
        </F>
        <F id="budget" error={err("budget")} label="Budget range">
          <select id="budget" name="budget" className={field} defaultValue="" {...a("budget")}><option value="">Select budget</option>{budgets.map((o) => <option key={o}>{o}</option>)}</select>
        </F>
      </div>
      <F id="message" error={err("message")} label="Project description" required hint="What problem are you solving? Who will use it? Any timelines or systems to integrate?">
        <textarea id="message" name="message" rows={5} required className={`${field} h-auto py-3`} {...a("message")} aria-describedby={err("message") ? "message-err" : "message-hint"} />
      </F>
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <div>
        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input type="checkbox" name="consent" className="mt-0.5 size-4 accent-brand-500" {...a("consent")} />
          <span>I agree to FairBazaar processing my details to respond to this enquiry, as described in the <Link href="/privacy-policy" className="text-brand-600 underline">Privacy Policy</Link>.</span>
        </label>
        {err("consent") && <p id="consent-err" className="mt-1 text-xs font-medium text-coral-400">{err("consent")}</p>}
      </div>
      <p id="form-status" role="alert" className="text-sm font-medium text-coral-400">{state === "error" ? msg : ""}</p>
      <button type="submit" disabled={state === "loading"} data-track="contact_form_submit" className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-7 font-semibold text-white shadow-[0_8px_24px_-8px_rgb(61_107_255/0.7)] transition hover:bg-brand-600 disabled:opacity-70 sm:w-auto">
        {state === "loading" && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
        {state === "loading" ? "Sending…" : "Talk to a Technology Expert"}
      </button>
    </form>
  );
}
