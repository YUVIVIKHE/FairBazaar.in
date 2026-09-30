"use client";
import { useState } from "react";
import { Smartphone, Globe, Shield, Server, Database, Brain, Cloud, Link2 } from "lucide-react";

const layers = [
  { id: "clients", name: "Experience layer", Icon: Globe, items: ["Web app", "Mobile app", "Customer portal", "Admin console"], text: "Role-based interfaces for employees, managers, customers and administrators — responsive, accessible and fast." },
  { id: "security", name: "Security & identity", Icon: Shield, items: ["SSO / OAuth", "Role-based access", "Audit logs", "Rate limiting"], text: "Every request is authenticated, authorised and logged. Permissions follow least privilege." },
  { id: "services", name: "Business services", Icon: Server, items: ["Workflow engine", "Domain modules", "Notifications", "Reporting"], text: "Your business rules as modular, tested services — easy to extend without breaking what works." },
  { id: "ai", name: "AI layer", Icon: Brain, items: ["RAG", "Agents", "Document AI", "Guardrails"], text: "AI capabilities with retrieval, tool use and human-in-the-loop approvals built in." },
  { id: "integrations", name: "Integrations", Icon: Link2, items: ["Payments", "Accounting", "WhatsApp / Email", "Legacy systems"], text: "APIs and webhooks connect the platform to the tools you already rely on." },
  { id: "data", name: "Data", Icon: Database, items: ["PostgreSQL", "Object storage", "Vector store", "Backups"], text: "A single source of truth with backups, retention policies and encryption." },
  { id: "cloud", name: "Cloud & DevOps", Icon: Cloud, items: ["Containers", "CI/CD", "Monitoring", "Autoscaling"], text: "Automated delivery and monitored infrastructure that scales with usage." },
];

/** Interactive architecture stack for custom software. */
export function ArchitectureViz() {
  const [active, setActive] = useState("services");
  const cur = layers.find((l) => l.id === active)!;
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="space-y-2" role="list" aria-label="Architecture layers">
        {layers.map((l, i) => {
          const on = l.id === active;
          return (
            <button
              key={l.id}
              role="listitem"
              type="button"
              onClick={() => setActive(l.id)}
              onMouseEnter={() => setActive(l.id)}
              onFocus={() => setActive(l.id)}
              aria-current={on}
              className={`flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition duration-300 sm:p-4 ${on ? "border-brand-300 bg-white shadow-[var(--shadow-lift)]" : "border-line bg-white/60 hover:border-brand-200"}`}
              style={{ marginLeft: `${Math.abs(3 - i) * 0}px` }}
            >
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${on ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-600"}`}><l.Icon className="size-5" aria-hidden="true" /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-ink-900">{l.name}</span>
                <span className="mt-1 hidden flex-wrap gap-1.5 sm:flex">
                  {l.items.map((it) => <span key={it} className="rounded-md bg-surface px-2 py-0.5 text-xs text-slate-600">{it}</span>)}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="section-dark relative overflow-hidden rounded-3xl p-7 lg:sticky lg:top-28 lg:self-start">
        <div aria-hidden="true" className="bg-aurora absolute inset-0" />
        <div className="relative" aria-live="polite">
          <cur.Icon className="size-8 text-mint-300" aria-hidden="true" />
          <h3 className="mt-4 text-2xl font-bold">{cur.name}</h3>
          <p className="mt-3 leading-7 text-slate-300">{cur.text}</p>
          <ul className="mt-5 grid grid-cols-2 gap-2">
            {cur.items.map((it) => <li key={it} className="glass rounded-xl px-3 py-2 text-sm text-white">{it}</li>)}
          </ul>
          <p className="mt-6 flex items-center gap-2 text-xs text-slate-400"><Smartphone className="size-3.5" aria-hidden="true" /> Same architecture powers web and mobile clients.</p>
        </div>
      </div>
    </div>
  );
}
