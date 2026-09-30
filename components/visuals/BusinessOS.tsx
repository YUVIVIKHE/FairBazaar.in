"use client";
import { useState } from "react";
import { Users, Boxes, Workflow, ArrowRight } from "lucide-react";
import Link from "next/link";

const systems = {
  CRM: { Icon: Users, href: "/products/crm", color: "brand", items: ["Leads", "Customers", "Deals", "Follow-ups", "Sales Pipeline", "Communication", "Reports"], text: "Every customer interaction, from first enquiry to repeat order." },
  ERP: { Icon: Boxes, href: "/products/erp", color: "mint", items: ["Inventory", "Purchasing", "Sales", "Finance", "Operations", "Employees", "Reports"], text: "Stock, orders, purchasing and finance on one ledger." },
  Automation: { Icon: Workflow, href: "/products/business-automation", color: "violet", items: ["Workflows", "Notifications", "Approvals", "Integrations", "Analytics"], text: "The connective layer that moves work between systems." },
} as const;
type Key = keyof typeof systems;

const links: { from: Key; to: Key; text: string }[] = [
  { from: "CRM", to: "ERP", text: "Won deal creates a sales order" },
  { from: "ERP", to: "Automation", text: "Low stock triggers purchase approval" },
  { from: "Automation", to: "CRM", text: "Customer notified on dispatch" },
];

/** Interactive "business operating system" — select a system to see its modules and connections. */
export function BusinessOS() {
  const [active, setActive] = useState<Key>("CRM");
  const s = systems[active];
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
      <div className="relative mx-auto aspect-square w-full max-w-[520px]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(157,179,255,.15)" strokeWidth=".3" strokeDasharray="1 1.5" className="animate-dash" />
          <path d="M50 16 L20.6 67 L79.4 67 Z" fill="rgba(61,107,255,.05)" stroke="rgba(157,179,255,.25)" strokeWidth=".3" />
        </svg>
        <div className="absolute left-1/2 top-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-ink-800 text-center ring-1 ring-white/15 shadow-[0_0_80px_-10px_rgba(61,107,255,.7)]">
          <span className="text-[10px] uppercase tracking-[0.2em] text-mint-300">One</span>
          <span className="font-display text-sm font-bold text-white">Business OS</span>
        </div>
        {(Object.keys(systems) as Key[]).map((k, i) => {
          const p = [{ x: 50, y: 16 }, { x: 20.6, y: 67 }, { x: 79.4, y: 67 }][i];
          const S = systems[k];
          const on = active === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => setActive(k)}
              aria-pressed={on}
              className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl px-4 py-3 transition duration-300 ${on ? "glass scale-105 ring-2 ring-mint-400/60" : "glass opacity-80 hover:opacity-100"}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <S.Icon className={`size-6 ${on ? "text-mint-300" : "text-brand-300"}`} aria-hidden="true" />
              <span className="font-display text-sm font-semibold text-white">{k}</span>
            </button>
          );
        })}
      </div>

      <div>
        <div role="tablist" aria-label="Business systems" className="mb-6 inline-flex rounded-full bg-white/5 p-1 ring-1 ring-white/10">
          {(Object.keys(systems) as Key[]).map((k) => (
            <button key={k} role="tab" aria-selected={active === k} onClick={() => setActive(k)} className={`h-9 rounded-full px-4 text-sm font-semibold transition ${active === k ? "bg-white text-ink-900" : "text-slate-300 hover:text-white"}`}>{k}</button>
          ))}
        </div>
        <div role="tabpanel" aria-label={active}>
          <p className="text-lg text-slate-300">{s.text}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {s.items.map((it) => <li key={it} className="rounded-full bg-white/5 px-3 py-1.5 text-sm text-slate-200 ring-1 ring-white/10">{it}</li>)}
          </ul>
          <ul className="mt-7 space-y-2.5">
            {links.filter((l) => l.from === active || l.to === active).map((l) => (
              <li key={l.text} className="flex items-center gap-3 text-sm text-slate-400">
                <span className="rounded-md bg-brand-500/15 px-2 py-0.5 text-xs font-semibold text-brand-300">{l.from}</span>
                <ArrowRight className="size-3.5 text-mint-400" aria-hidden="true" />
                <span className="rounded-md bg-mint-400/10 px-2 py-0.5 text-xs font-semibold text-mint-300">{l.to}</span>
                <span>{l.text}</span>
              </li>
            ))}
          </ul>
          <Link href={s.href} className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-mint-300 hover:text-white">
            Explore {active}<ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
