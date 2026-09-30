"use client";
import { useEffect, useRef } from "react";
import { Bot, Users, Boxes, Briefcase, BarChart3, Smartphone, Cloud, Workflow, Globe } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";

const nodes = [
  { label: "AI Agent", Icon: Bot, meta: "Resolving 3 tasks", tone: "mint" },
  { label: "CRM", Icon: Users, meta: "12 new leads", tone: "brand" },
  { label: "ERP", Icon: Boxes, meta: "Stock synced", tone: "brand" },
  { label: "HRMS", Icon: Briefcase, meta: "Check-in verified", tone: "mint" },
  { label: "Analytics", Icon: BarChart3, meta: "Live", tone: "brand", spark: true },
  { label: "Mobile App", Icon: Smartphone, meta: "Android · iOS", tone: "brand" },
  { label: "Cloud", Icon: Cloud, meta: "All systems healthy", tone: "mint" },
  { label: "Automation", Icon: Workflow, meta: "Approval routed", tone: "brand" },
  { label: "Website", Icon: Globe, meta: "Enquiry captured", tone: "brand" },
] as const;

const pos = nodes.map((_, i) => {
  const a = (-90 + (360 / nodes.length) * i) * (Math.PI / 180);
  return { x: 50 + Math.cos(a) * 41, y: 50 + Math.sin(a) * 38 };
});

/**
 * Hero visual: an interactive SaaS ecosystem around a FairBazaar core.
 * Built in HTML/SVG (real, crisp UI text) with CSS animations and cursor parallax.
 * All labels are exposed to assistive tech as a single list description.
 */
export function HeroEcosystem() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        el.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="FairBazaar technology core connecting AI Agent, CRM, ERP, HRMS, Analytics, Mobile App, Cloud, Automation and Website into one ecosystem"
      className="relative mx-auto aspect-square w-full max-w-[620px] select-none [--px:0] [--py:0]"
    >
      {/* depth layer: glow */}
      <div aria-hidden="true" className="absolute inset-[18%] rounded-full bg-brand-500/30 blur-3xl" style={{ transform: "translate3d(calc(var(--px) * -20px), calc(var(--py) * -20px), 0)" }} />

      {/* connection lines + data pulses */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true" style={{ transform: "translate3d(calc(var(--px) * 8px), calc(var(--py) * 8px), 0)" }}>
        <defs>
          <linearGradient id="hl" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6A8CFF" stopOpacity=".8" />
            <stop offset="1" stopColor="#2EE6A6" stopOpacity=".5" />
          </linearGradient>
          <radialGradient id="core" cx="50%" cy="45%" r="60%">
            <stop offset="0" stopColor="#9DB3FF" />
            <stop offset=".45" stopColor="#3D6BFF" />
            <stop offset="1" stopColor="#121B3A" />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="50" rx="41" ry="38" fill="none" stroke="rgba(157,179,255,.12)" strokeWidth=".25" strokeDasharray=".6 1.4" />
        <ellipse cx="50" cy="50" rx="27" ry="25.5" fill="none" stroke="rgba(157,179,255,.08)" strokeWidth=".2" />
        {pos.map((p, i) => (
          <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} stroke="url(#hl)" strokeWidth=".22" strokeDasharray="1 1.2" className="animate-dash" style={{ animationDuration: `${2.5 + (i % 3)}s` }} />
        ))}
        <ellipse cx="50" cy="50" rx="15" ry="15" fill="none" stroke="rgba(46,230,166,.12)" strokeWidth=".2" />
      </svg>

      {/* travelling data packets (CSS offset-path; honours reduced motion) */}
      <div aria-hidden="true" className="absolute inset-0">
        {pos.map((p, i) => (
          <span
            key={i}
            className="packet absolute left-0 top-0 size-1.5 rounded-full bg-mint-400 shadow-[0_0_10px_2px_rgba(46,230,166,.7)]"
            style={{ ["--x" as string]: `${p.x}%`, ["--y" as string]: `${p.y}%`, animationDelay: `${i * 0.45}s`, animationDuration: `${3 + (i % 4) * 0.6}s` } as React.CSSProperties}
          />
        ))}
      </div>

      {/* core */}
      <div aria-hidden="true" className="absolute left-1/2 top-1/2" style={{ transform: "translate3d(calc(-50% + var(--px) * 14px), calc(-50% + var(--py) * 14px), 0)" }}>
        <div className="relative flex size-28 items-center justify-center sm:size-36">
          <span className="absolute inset-0 animate-[spin_24s_linear_infinite] rounded-full border border-dashed border-brand-300/30" />
          <span className="absolute -inset-4 animate-[spin_36s_linear_infinite_reverse] rounded-full border border-mint-400/15" />
          <span className="absolute inset-3 animate-pulse-soft rounded-full bg-brand-500/25 blur-md" />
          <svg viewBox="0 0 100 100" className="absolute inset-4"><circle cx="50" cy="50" r="48" fill="url(#core)" /></svg>
          <span className="glass relative flex size-14 items-center justify-center rounded-2xl sm:size-16">
            <LogoMark className="size-9 sm:size-10" />
          </span>
        </div>
      </div>

      {/* nodes */}
      <ul aria-hidden="true">
        {nodes.map((n, i) => {
          const p = pos[i];
          const depth = 10 + (i % 3) * 8;
          return (
            <li
              key={n.label}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%`, transform: `translate3d(calc(-50% + var(--px) * ${depth}px), calc(-50% + var(--py) * ${depth}px), 0)` }}
            >
              <div className="animate-float" style={{ animationDelay: `${i * -0.8}s`, animationDuration: `${6 + (i % 3)}s` }}>
                <div className="glass group flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 sm:flex-row sm:gap-2.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,.6)] transition duration-300 hover:border-mint-400/40 sm:rounded-2xl sm:px-3 sm:py-2.5">
                  <span className={`flex size-7 items-center justify-center rounded-lg sm:size-9 sm:rounded-xl ${n.tone === "mint" ? "bg-mint-400/15 text-mint-300" : "bg-brand-500/20 text-brand-300"}`}>
                    <n.Icon className="size-3.5 sm:size-4.5" strokeWidth={1.75} />
                  </span>
                  <span className="sm:pr-1">
                    <span className="block whitespace-nowrap text-[10px] font-semibold text-white sm:text-[13px]">{n.label}</span>
                    <span className="hidden items-center gap-1 whitespace-nowrap text-[10.5px] text-slate-400 sm:flex">
                      <span className="size-1.5 animate-pulse-soft rounded-full bg-mint-400" />
                      {n.meta}
                    </span>
                  </span>
                  {"spark" in n && (
                    <svg viewBox="0 0 40 16" className="hidden h-4 w-10 sm:block"><polyline points="0,13 7,10 13,11 20,6 27,8 33,3 40,4" fill="none" stroke="#2EE6A6" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <style>{`
        .packet { offset-path: none; animation-name: packet; animation-timing-function: cubic-bezier(.45,0,.55,1); animation-iteration-count: infinite; opacity: 0; }
        @keyframes packet {
          0% { left: 50%; top: 50%; opacity: 0; transform: translate(-50%,-50%) scale(.6); }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { left: var(--x); top: var(--y); opacity: 0; transform: translate(-50%,-50%) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) { .packet { display: none; } }
      `}</style>
    </div>
  );
}
