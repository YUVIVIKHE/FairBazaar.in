import { Bell, Search, MapPin, CheckCircle2, Clock, TrendingUp, Bot, Package, Workflow, Users, Wallet, CalendarDays, BarChart3, LayoutGrid, Settings2, FileText } from "lucide-react";
import type { Product } from "@/content/types";

type Variant = Product["mockup"];

const titles: Record<Variant, string> = {
  hrms: "FairBazaar HRMS", crm: "FairBazaar CRM", erp: "FairBazaar ERP", leads: "Lead Management",
  inventory: "Inventory", automation: "Automation", ai: "AI Agents", custom: "Business Platform",
};

/**
 * Product UI mockups rendered in real HTML — crisp, accessible and localisable text.
 * Figures shown are illustrative sample data for interface demonstration only.
 */
export function DashboardMockup({ variant, dark = true, className = "", compact = false }: { variant: Variant; dark?: boolean; className?: string; compact?: boolean }) {
  const shell = dark ? "bg-ink-900/95 ring-white/10 text-slate-300" : "bg-white ring-line text-slate-600";
  return (
    <figure
      className={`overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgba(5,8,22,.6)] ring-1 ${shell} ${className}`}
      aria-label={`Illustrative ${titles[variant]} interface`}
    >
      <div className={`flex items-center gap-2 border-b px-4 py-2.5 ${dark ? "border-white/5 bg-white/[0.02]" : "border-line bg-surface"}`}>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-coral-400/80" /><span className="size-2.5 rounded-full bg-amber-400/80" /><span className="size-2.5 rounded-full bg-mint-400/80" />
        </span>
        <span className={`mx-auto flex h-6 w-1/2 min-w-0 items-center gap-2 rounded-md px-2 text-[10px] ${dark ? "bg-white/5 text-slate-500" : "bg-white text-slate-400 ring-1 ring-line"}`}>
          <Search className="size-3" aria-hidden="true" /> <span className="truncate">app.fairbazaar.in/{variant}</span>
        </span>
        <Bell className="size-3.5 text-slate-500" aria-hidden="true" />
      </div>
      <div className="flex">
        {!compact && <Sidebar dark={dark} variant={variant} />}
        <div className="min-w-0 flex-1 p-3 sm:p-4">{body(variant, dark)}</div>
      </div>
      <figcaption className="sr-only">Sample {titles[variant]} dashboard with illustrative data.</figcaption>
    </figure>
  );
}

function Sidebar({ dark, variant }: { dark: boolean; variant: Variant }) {
  const items = [LayoutGrid, Users, CalendarDays, Wallet, BarChart3, FileText, Settings2];
  return (
    <div className={`hidden w-12 shrink-0 flex-col items-center gap-3 border-r py-4 sm:flex ${dark ? "border-white/5" : "border-line"}`} aria-hidden="true">
      {items.map((I, i) => (
        <span key={i} className={`flex size-8 items-center justify-center rounded-lg ${i === (variant === "hrms" ? 2 : 0) ? "bg-brand-500 text-white" : dark ? "text-slate-500" : "text-slate-400"}`}>
          <I className="size-4" />
        </span>
      ))}
    </div>
  );
}

function Kpi({ label, value, delta, dark, tone = "brand" }: { label: string; value: string; delta?: string; dark: boolean; tone?: "brand" | "mint" | "amber" }) {
  const t = { brand: "text-brand-400", mint: "text-mint-400", amber: "text-amber-400" }[tone];
  return (
    <div className={`rounded-xl p-2.5 sm:p-3 ${dark ? "bg-white/[0.04] ring-1 ring-white/5" : "bg-surface"}`}>
      <p className="truncate text-[10px] text-slate-500">{label}</p>
      <p className={`mt-1 font-display text-base font-bold sm:text-lg ${dark ? "text-white" : "text-ink-900"}`}>{value}</p>
      {delta && <p className={`text-[10px] font-medium ${t}`}>{delta}</p>}
    </div>
  );
}

function Bars({ values, dark, accent = "brand" }: { values: number[]; dark: boolean; accent?: "brand" | "mint" }) {
  return (
    <div className="flex h-20 items-end gap-1.5 sm:h-24" aria-hidden="true">
      {values.map((v, i) => (
        <span
          key={i}
          className={`flex-1 origin-bottom animate-bar rounded-t-md ${i === values.length - 1 ? (accent === "mint" ? "bg-mint-400" : "bg-brand-500") : dark ? "bg-white/10" : "bg-brand-100"}`}
          style={{ height: `${v}%`, animationDelay: `${i * 70}ms` }}
        />
      ))}
    </div>
  );
}

function Panel({ title, children, dark, right }: { title: string; children: React.ReactNode; dark: boolean; right?: React.ReactNode }) {
  return (
    <div className={`rounded-xl p-3 ${dark ? "bg-white/[0.03] ring-1 ring-white/5" : "bg-white ring-1 ring-line"}`}>
      <div className="mb-2.5 flex items-center justify-between">
        <p className={`text-[11px] font-semibold ${dark ? "text-slate-200" : "text-ink-900"}`}>{title}</p>
        {right}
      </div>
      {children}
    </div>
  );
}

const Row = ({ a, b, c, dark, tone }: { a: string; b: string; c: string; dark: boolean; tone: "mint" | "amber" | "brand" }) => (
  <div className={`flex items-center justify-between gap-2 border-t py-1.5 text-[10.5px] first:border-0 ${dark ? "border-white/5" : "border-line"}`}>
    <span className={`truncate font-medium ${dark ? "text-slate-200" : "text-ink-900"}`}>{a}</span>
    <span className="hidden truncate text-slate-500 sm:block">{b}</span>
    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-semibold ${{ mint: "bg-mint-400/15 text-mint-400", amber: "bg-amber-400/15 text-amber-400", brand: "bg-brand-500/15 text-brand-400" }[tone]}`}>{c}</span>
  </div>
);

function body(v: Variant, dark: boolean) {
  switch (v) {
    case "hrms":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Kpi dark={dark} label="Present today" value="186" delta="94% attendance" tone="mint" />
            <Kpi dark={dark} label="On leave" value="9" delta="3 pending" tone="amber" />
            <Kpi dark={dark} label="Field check-ins" value="42" delta="All verified" tone="mint" />
            <Kpi dark={dark} label="Payroll run" value="Ready" delta="Oct cycle" />
          </div>
          <div className="grid gap-3 sm:grid-cols-5">
            <div className="sm:col-span-3">
              <Panel dark={dark} title="Attendance this week" right={<TrendingUp className="size-3.5 text-mint-400" aria-hidden="true" />}>
                <Bars dark={dark} values={[62, 78, 71, 88, 84, 92, 95]} accent="mint" />
              </Panel>
            </div>
            <div className="sm:col-span-2">
              <Panel dark={dark} title="Live check-ins">
                {[["Ananya R.", "Site B · Pune"], ["Rahul M.", "Head office"], ["Sneha K.", "Client visit"]].map(([n, l]) => (
                  <div key={n} className="flex items-center gap-2 py-1 text-[10.5px]">
                    <MapPin className="size-3 text-mint-400" aria-hidden="true" />
                    <span className={`flex-1 truncate ${dark ? "text-slate-200" : "text-ink-900"}`}>{n}</span>
                    <span className="truncate text-slate-500">{l}</span>
                  </div>
                ))}
              </Panel>
            </div>
          </div>
          <Panel dark={dark} title="Approvals">
            <Row dark={dark} a="Leave · 2 days" b="Casual leave" c="Approved" tone="mint" />
            <Row dark={dark} a="Expense · Travel" b="Receipt attached" c="Pending" tone="amber" />
          </Panel>
        </div>
      );
    case "crm":
    case "leads":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <Kpi dark={dark} label="New leads" value="128" delta="This week" />
            <Kpi dark={dark} label="Follow-ups due" value="23" delta="Today" tone="amber" />
            <Kpi dark={dark} label="Won" value="17" delta="This month" tone="mint" />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[["New", 5, "brand"], ["Contacted", 4, "brand"], ["Proposal", 3, "amber"], ["Won", 2, "mint"]].map(([stage, n, t]) => (
              <div key={stage as string} className={`rounded-xl p-2 ${dark ? "bg-white/[0.03] ring-1 ring-white/5" : "bg-surface"}`}>
                <p className="mb-2 flex items-center justify-between text-[10px] font-semibold text-slate-500">{stage as string}<span>{n as number}</span></p>
                {Array.from({ length: Math.min(3, n as number) }).map((_, i) => (
                  <div key={i} className={`mb-1.5 rounded-lg p-2 ${dark ? "bg-ink-800" : "bg-white ring-1 ring-line"}`}>
                    <span className={`block h-1.5 w-3/4 rounded ${dark ? "bg-white/20" : "bg-slate-200"}`} />
                    <span className={`mt-1.5 block h-1 w-1/2 rounded ${t === "mint" ? "bg-mint-400/60" : t === "amber" ? "bg-amber-400/60" : "bg-brand-400/60"}`} />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Panel dark={dark} title="Lead sources">
            <Row dark={dark} a="Website form" b="utm: google / cpc" c="Assigned" tone="brand" />
            <Row dark={dark} a="WhatsApp" b="Auto-routed · West" c="Follow-up" tone="amber" />
          </Panel>
        </div>
      );
    case "erp":
    case "inventory":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Kpi dark={dark} label="Open orders" value="64" delta="12 dispatching" />
            <Kpi dark={dark} label="Low stock" value="7" delta="Reorder suggested" tone="amber" />
            <Kpi dark={dark} label="Invoices due" value="18" delta="Updated live" tone="mint" />
            <Kpi dark={dark} label="Locations" value="4" delta="Synced" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Panel dark={dark} title="Stock movement" right={<Package className="size-3.5 text-brand-400" aria-hidden="true" />}>
              <Bars dark={dark} values={[40, 55, 48, 70, 62, 80, 74]} />
            </Panel>
            <Panel dark={dark} title="Purchase orders">
              <Row dark={dark} a="PO · Raw material" b="Vendor A" c="Approved" tone="mint" />
              <Row dark={dark} a="PO · Packaging" b="Vendor C" c="Pending" tone="amber" />
              <Row dark={dark} a="GRN · Batch 21" b="Warehouse 2" c="Received" tone="brand" />
            </Panel>
          </div>
        </div>
      );
    case "automation":
      return (
        <div className="space-y-3">
          <Panel dark={dark} title="Workflow · Purchase approval" right={<Workflow className="size-3.5 text-mint-400" aria-hidden="true" />}>
            <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
              {["Request created", "Amount > limit?", "Manager approves", "Finance approves", "PO issued", "Vendor notified"].map((s, i) => (
                <span key={s} className="flex items-center gap-1.5">
                  <span className={`rounded-lg px-2 py-1.5 font-medium ${i < 4 ? "bg-mint-400/15 text-mint-400" : dark ? "bg-white/5 text-slate-400" : "bg-surface text-slate-500"}`}>{s}</span>
                  {i < 5 && <span className="text-slate-600">→</span>}
                </span>
              ))}
            </div>
          </Panel>
          <div className="grid grid-cols-3 gap-2">
            <Kpi dark={dark} label="Runs today" value="342" tone="mint" delta="0 failed" />
            <Kpi dark={dark} label="Avg. cycle" value="Faster" delta="vs manual" />
            <Kpi dark={dark} label="Integrations" value="9" delta="Healthy" tone="mint" />
          </div>
        </div>
      );
    case "ai":
      return (
        <div className="space-y-2.5 text-[11px]">
          <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-brand-500 px-3 py-2 text-white">What is the leave policy for field staff?</div>
          <div className={`flex max-w-[90%] gap-2 rounded-2xl rounded-bl-sm px-3 py-2 ${dark ? "bg-white/5 text-slate-200" : "bg-surface text-ink-900"}`}>
            <Bot className="mt-0.5 size-4 shrink-0 text-mint-400" aria-hidden="true" />
            <span>Field staff receive the standard leave allocation plus regional holidays. Requests need manager approval 3 days ahead. <span className="text-mint-400">[HR Policy §4.2]</span></span>
          </div>
          <div className={`flex flex-wrap gap-1.5 ${dark ? "text-slate-400" : "text-slate-500"}`}>
            {["Searched 3 documents", "Checked permissions", "Cited source"].map((t) => (
              <span key={t} className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9.5px] ${dark ? "bg-white/5" : "bg-surface"}`}><CheckCircle2 className="size-3 text-mint-400" aria-hidden="true" />{t}</span>
            ))}
          </div>
          <div className={`flex items-center gap-2 rounded-xl px-3 py-2 ${dark ? "bg-white/[0.03] ring-1 ring-white/5" : "bg-white ring-1 ring-line"}`}>
            <span className="size-1.5 animate-pulse-soft rounded-full bg-mint-400" />
            <span className="text-slate-500">Agent action: create leave request draft</span>
            <span className="ml-auto rounded-full bg-amber-400/15 px-2 py-0.5 text-[9.5px] font-semibold text-amber-400">Needs approval</span>
          </div>
        </div>
      );
    default:
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <Kpi dark={dark} label="Active users" value="Roles: 5" />
            <Kpi dark={dark} label="Workflows" value="12" tone="mint" delta="Running" />
            <Kpi dark={dark} label="Audit events" value="Logged" tone="mint" />
          </div>
          <Panel dark={dark} title="Recent activity" right={<Clock className="size-3.5 text-slate-500" aria-hidden="true" />}>
            <Row dark={dark} a="Order #1042 approved" b="Operations" c="Done" tone="mint" />
            <Row dark={dark} a="Invoice generated" b="Finance" c="Sent" tone="brand" />
            <Row dark={dark} a="Stock alert" b="Warehouse" c="Review" tone="amber" />
          </Panel>
        </div>
      );
  }
}
