import { User, Brain, Users, Boxes, Briefcase, BarChart3 } from "lucide-react";

const steps = [
  { label: "Customer", sub: "Request via web / WhatsApp", Icon: User },
  { label: "AI", sub: "Understands · retrieves · decides", Icon: Brain, core: true },
  { label: "CRM", sub: "Lead & ticket updated", Icon: Users },
  { label: "ERP", sub: "Order & stock checked", Icon: Boxes },
  { label: "HRMS", sub: "Right team assigned", Icon: Briefcase },
  { label: "Analytics", sub: "Insights refreshed", Icon: BarChart3 },
];

/** Animated data flow: Customer → AI → CRM → ERP → HRMS → Analytics. Horizontal on desktop, vertical on mobile. */
export function AIFlow() {
  return (
    <div role="img" aria-label="Data flows from Customer to AI, then to CRM, ERP, HRMS and Analytics" className="relative">
      <ol className="relative grid gap-3 md:grid-cols-6 md:gap-2" aria-hidden="true">
        {steps.map((s, i) => (
          <li key={s.label} className="relative flex items-center gap-4 md:flex-col md:text-center">
            <div className={`relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl md:size-16 ${s.core ? "bg-gradient-to-br from-brand-500 to-mint-500 text-white shadow-[0_0_40px_-4px_rgba(61,107,255,.8)]" : "glass text-brand-300"}`}>
              {s.core && <span className="absolute -inset-2 animate-pulse-soft rounded-3xl border border-mint-400/40" />}
              <s.Icon className="size-6" strokeWidth={1.75} />
            </div>
            <div className="md:mt-3">
              <p className="font-display text-sm font-semibold text-white">{s.label}</p>
              <p className="text-xs text-slate-400">{s.sub}</p>
            </div>
            {i < steps.length - 1 && (
              <>
                <span className="absolute left-7 top-14 h-3 w-px bg-gradient-to-b from-brand-400/60 to-transparent md:hidden" />
                <span className="absolute left-[calc(50%+2.25rem)] top-8 hidden h-px w-[calc(100%-4.5rem)] overflow-hidden bg-white/10 md:block">
                  <span className="flow-dot absolute top-1/2 h-[3px] w-8 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-mint-400 to-transparent" style={{ animationDelay: `${i * 0.35}s` }} />
                </span>
              </>
            )}
          </li>
        ))}
      </ol>
      <style>{`.flow-dot{animation:flow 2.1s linear infinite;left:-2rem}@keyframes flow{to{left:100%}}@media (prefers-reduced-motion: reduce){.flow-dot{display:none}}`}</style>
    </div>
  );
}
