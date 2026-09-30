"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, MapPin, CheckCircle2, Bell, CalendarDays, Wallet, Receipt, BarChart3, LayoutGrid, Smartphone, Users } from "lucide-react";
import { track } from "@/lib/analytics";

const scenes = [
  { t: "HR dashboard", c: "The HR dashboard opens with today's workforce at a glance.", Icon: LayoutGrid },
  { t: "Employee clocks in", c: "An employee taps Check in on the FairBazaar HRMS mobile app.", Icon: Smartphone },
  { t: "Location verified", c: "Their location is verified against the site's geo-fence.", Icon: MapPin },
  { t: "Attendance updates", c: "Attendance is recorded instantly — no registers, no spreadsheets.", Icon: CheckCircle2 },
  { t: "Manager notified", c: "The manager's dashboard updates in real time.", Icon: Bell },
  { t: "Leave requested", c: "An employee submits a leave request from their phone.", Icon: CalendarDays },
  { t: "Leave approved", c: "The manager approves in one tap; balances update automatically.", Icon: CheckCircle2 },
  { t: "Payroll calculated", c: "Payroll is calculated from attendance and leave data.", Icon: Wallet },
  { t: "Expense submitted", c: "Expenses are submitted with receipts and routed for approval.", Icon: Receipt },
  { t: "HR analytics", c: "HR analytics refresh with attendance, cost and trend insights.", Icon: BarChart3 },
  { t: "Complete workforce", c: "FairBazaar HRMS — One Platform. Complete Workforce Management.", Icon: Users },
];

const DURATION = 3800;

/**
 * Interactive HRMS product tour — an in-browser "video" built from real UI with captions.
 * Keyboard accessible, pausable, and static for reduced-motion users (manual stepping).
 */
export function HRMSTour() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const started = useRef(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) { started.current = true; setPlaying(true); }
      if (!e.isIntersecting) setPlaying(false);
    }, { threshold: 0.4 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setI((n) => (n + 1 < scenes.length ? n + 1 : n)), DURATION);
    if (i === scenes.length - 1) setPlaying(false);
    return () => clearTimeout(id);
  }, [playing, i]);

  const toggle = () => {
    if (i === scenes.length - 1 && !playing) setI(0);
    setPlaying((p) => !p);
    track("video_play", { video: "hrms_tour" });
  };

  const s = scenes[i];
  return (
    <div ref={root} className="overflow-hidden rounded-3xl bg-ink-900 ring-1 ring-white/10 shadow-[0_50px_100px_-40px_rgba(5,8,22,.9)]">
      <div className="relative aspect-[16/11] sm:aspect-[16/9]">
        <div aria-hidden="true" className="bg-aurora absolute inset-0 opacity-70" />
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <Stage i={i} />
        {/* captions */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-transparent p-4 pt-10 sm:p-6 sm:pt-14">
          <p aria-live="polite" className="mx-auto max-w-2xl text-center text-sm font-medium text-white sm:text-base">
            <span className="rounded bg-black/40 px-2 py-1 [box-decoration-break:clone]">{s.c}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 border-t border-white/10 px-4 py-3">
        <button onClick={toggle} aria-label={playing ? "Pause product tour" : "Play product tour"} className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-ink-900 hover:bg-mint-300">
          {playing ? <Pause className="size-4" aria-hidden="true" /> : i === scenes.length - 1 ? <RotateCcw className="size-4" aria-hidden="true" /> : <Play className="ml-0.5 size-4" aria-hidden="true" />}
        </button>
        <ol className="flex flex-1 gap-1" aria-label="Tour scenes">
          {scenes.map((sc, n) => (
            <li key={sc.t} className="flex-1">
              <button onClick={() => { setI(n); setPlaying(false); }} aria-label={`Scene ${n + 1}: ${sc.t}`} aria-current={n === i ? "step" : undefined} className="group block w-full py-2">
                <span className="block h-1 overflow-hidden rounded-full bg-white/10">
                  <span className={`block h-full rounded-full bg-mint-400 ${n < i ? "w-full" : n === i ? (playing ? "tour-progress" : "w-full") : "w-0"}`} style={n === i && playing ? { animationDuration: `${DURATION}ms` } : undefined} />
                </span>
              </button>
            </li>
          ))}
        </ol>
        <span className="hidden shrink-0 text-xs tabular-nums text-slate-400 sm:block">{i + 1}/{scenes.length} · {s.t}</span>
      </div>
      <style>{`.tour-progress{animation:tp linear forwards;width:0}@keyframes tp{to{width:100%}}`}</style>
    </div>
  );
}

function Stage({ i }: { i: number }) {
  const phone = i >= 1 && i <= 3 || i === 5 || i === 8;
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-6 p-4 pb-20 sm:p-10 sm:pb-24">
      {/* dashboard */}
      <div className={`w-full max-w-[520px] rounded-2xl bg-ink-850/90 p-3 ring-1 ring-white/10 transition-all duration-700 sm:p-4 ${phone ? "hidden scale-95 opacity-60 sm:block" : "scale-100 opacity-100"}`}>
        <div className="mb-3 flex items-center justify-between">
          <p className="font-display text-sm font-bold text-white">{i >= 9 ? "HR Analytics" : i === 7 ? "Payroll · October" : "Workforce today"}</p>
          <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold transition ${i >= 4 ? "bg-mint-400/15 text-mint-400" : "bg-white/5 text-slate-500"}`}>
            <span className="size-1.5 animate-pulse-soft rounded-full bg-current" />Live
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[["Present", i >= 3 ? "187" : "186"], ["On leave", i >= 6 ? "10" : "9"], [i === 7 ? "Payroll" : "Pending", i === 7 ? "Calculated" : i >= 6 ? "2" : "3"]].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-white/[0.04] p-2.5 ring-1 ring-white/5">
              <p className="text-[10px] text-slate-500">{k}</p>
              <p className="mt-0.5 font-display text-base font-bold text-white transition-all">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex h-20 items-end gap-1.5">
          {[52, 64, 58, 72, 69, 80, i >= 9 ? 94 : 76].map((h, n) => (
            <span key={n} className={`flex-1 rounded-t-md transition-all duration-700 ${n === 6 ? "bg-mint-400" : "bg-white/10"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        {i === 4 && <Toast text="Ananya R. checked in · Site B (verified)" />}
        {i === 6 && <Toast text="Leave approved · Rahul M. · 2 days" />}
        {i === 7 && <Toast text="Payroll ready for review · 212 employees" />}
        {i === 10 && <p className="mt-3 text-center font-display text-sm font-bold text-mint-300">One Platform. Complete Workforce Management.</p>}
      </div>
      {/* phone */}
      <div className={`shrink-0 transition-all duration-700 ${phone ? "translate-y-0 opacity-100" : "pointer-events-none absolute translate-y-8 opacity-0"}`}>
        <div className="w-[170px] rounded-[1.8rem] bg-slate-800 p-1.5 ring-1 ring-white/10 sm:w-[190px]">
          <div className="flex h-[260px] flex-col rounded-[1.5rem] bg-ink-950 p-3 pt-6 text-[10px] text-slate-300 sm:h-[300px]">
            {i <= 3 && (
              <>
                <p className="font-display text-xs font-bold text-white">Check in</p>
                <div className="relative mt-3 flex h-28 items-center justify-center rounded-xl bg-ink-800">
                  <span className={`absolute size-20 rounded-full border transition-all duration-700 ${i >= 2 ? "border-mint-400 bg-mint-400/10" : "border-white/10"}`} />
                  <MapPin className={`relative size-5 ${i >= 2 ? "text-mint-400" : "text-slate-500"}`} aria-hidden="true" />
                </div>
                <p className={`mt-2 ${i >= 2 ? "text-mint-400" : "text-slate-500"}`}>{i >= 2 ? "✓ Location verified" : "Locating…"}</p>
                <span className={`mt-auto flex h-9 items-center justify-center rounded-full font-semibold text-white ${i >= 3 ? "bg-mint-500" : "bg-brand-500"}`}>{i >= 3 ? "Checked in 09:02" : "Check in"}</span>
              </>
            )}
            {i === 5 && (
              <>
                <p className="font-display text-xs font-bold text-white">Apply leave</p>
                <div className="mt-3 space-y-2">
                  {[["Type", "Casual"], ["From", "14 Oct"], ["To", "15 Oct"]].map(([a, b]) => <div key={a} className="flex justify-between rounded-lg bg-white/5 px-2 py-2"><span className="text-slate-500">{a}</span><span className="text-white">{b}</span></div>)}
                </div>
                <span className="mt-auto flex h-9 items-center justify-center rounded-full bg-brand-500 font-semibold text-white">Submit</span>
              </>
            )}
            {i === 8 && (
              <>
                <p className="font-display text-xs font-bold text-white">New expense</p>
                <div className="mt-3 flex h-20 items-center justify-center rounded-xl border border-dashed border-white/20 text-slate-500"><Receipt className="size-5" aria-hidden="true" /></div>
                <div className="mt-2 flex justify-between rounded-lg bg-white/5 px-2 py-2"><span className="text-slate-500">Category</span><span className="text-white">Travel</span></div>
                <span className="mt-auto flex h-9 items-center justify-center rounded-full bg-brand-500 font-semibold text-white">Submit for approval</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Toast({ text }: { text: string }) {
  return (
    <div className="mt-3 flex animate-[mega_.4s_ease-out] items-center gap-2 rounded-xl bg-mint-400/10 px-3 py-2 text-[11px] text-mint-300 ring-1 ring-mint-400/30">
      <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />{text}
    </div>
  );
}
