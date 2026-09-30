import { MapPin, CheckCircle2, ShoppingBag, Bell, Truck, Star } from "lucide-react";

/** Realistic smartphone frames with live-looking FairBazaar app screens (HTML, not images). */
export function PhoneMockup({ screen, className = "" }: { screen: "attendance" | "orders" | "field"; className?: string }) {
  return (
    <div className={`relative w-[230px] shrink-0 rounded-[2.4rem] bg-gradient-to-b from-slate-700 to-slate-900 p-[7px] shadow-[0_40px_70px_-25px_rgba(5,8,22,.7)] ring-1 ring-white/10 ${className}`} role="img" aria-label={`Illustrative FairBazaar mobile app: ${screen} screen`}>
      <div className="relative overflow-hidden rounded-[2rem] bg-ink-950">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
        <div className="flex h-[440px] flex-col px-4 pb-4 pt-10 text-[11px] text-slate-300" aria-hidden="true">
          {screen === "attendance" && <Attendance />}
          {screen === "orders" && <Orders />}
          {screen === "field" && <Field />}
        </div>
      </div>
    </div>
  );
}

function Attendance() {
  return (
    <>
      <p className="text-slate-500">Good morning,</p>
      <p className="font-display text-base font-bold text-white">Ananya</p>
      <div className="relative mt-4 flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-ink-800 ring-1 ring-white/5">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)", backgroundSize: "18px 18px" }} />
        <span className="absolute size-28 animate-pulse-soft rounded-full border border-mint-400/40 bg-mint-400/10" />
        <span className="absolute size-16 rounded-full border border-mint-400/60" />
        <MapPin className="relative size-6 text-mint-400" />
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-mint-400"><CheckCircle2 className="size-3.5" /> Inside Site B geo-fence</p>
      <button className="mt-4 h-11 rounded-full bg-brand-500 font-semibold text-white" tabIndex={-1}>Check in · 09:02</button>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[["Leave", "8"], ["Present", "21"], ["Late", "1"]].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-white/5 py-2"><p className="font-bold text-white">{v}</p><p className="text-[10px] text-slate-500">{k}</p></div>
        ))}
      </div>
    </>
  );
}

function Orders() {
  return (
    <>
      <div className="flex items-center justify-between"><p className="font-display text-base font-bold text-white">My Orders</p><Bell className="size-4 text-slate-400" /></div>
      <div className="mt-4 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-4 text-white">
        <p className="text-[10px] opacity-80">Out for delivery</p>
        <p className="mt-1 font-display text-sm font-bold">Order #FB-2041</p>
        <div className="mt-3 h-1.5 rounded-full bg-white/20"><div className="h-full w-3/4 rounded-full bg-mint-400" /></div>
        <p className="mt-2 flex items-center gap-1 text-[10px]"><Truck className="size-3" /> Arriving today</p>
      </div>
      {["Organic seeds · 2 kg", "Drip kit · Standard", "Fertiliser · 25 kg"].map((t, i) => (
        <div key={t} className="mt-2.5 flex items-center gap-3 rounded-xl bg-white/5 p-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-white/10"><ShoppingBag className="size-4 text-brand-300" /></span>
          <span className="flex-1"><span className="block text-white">{t}</span><span className="text-[10px] text-slate-500">{i === 0 ? "Delivered" : "Processing"}</span></span>
        </div>
      ))}
      <div className="mt-auto flex items-center gap-1 text-amber-400"><Star className="size-3 fill-current" /><span className="text-slate-400">Rate your last order</span></div>
    </>
  );
}

function Field() {
  return (
    <>
      <p className="font-display text-base font-bold text-white">Today's visits</p>
      <p className="text-slate-500">4 of 6 completed · synced</p>
      <div className="mt-3 h-1.5 rounded-full bg-white/10"><div className="h-full w-2/3 rounded-full bg-mint-400" /></div>
      {[["Farmer visit · Nashik", "Done", "mint"], ["Dealer meeting · Sinnar", "Done", "mint"], ["Demo plot · Niphad", "Next", "brand"], ["Stock audit · Depot", "Later", "slate"]].map(([t, s, c]) => (
        <div key={t} className="mt-2.5 flex items-center gap-3 rounded-xl bg-white/5 p-2.5">
          <MapPin className={`size-4 ${c === "mint" ? "text-mint-400" : c === "brand" ? "text-brand-300" : "text-slate-500"}`} />
          <span className="flex-1 text-white">{t}</span>
          <span className="text-[10px] text-slate-500">{s}</span>
        </div>
      ))}
      <button className="mt-auto h-11 rounded-full bg-white/10 font-semibold text-white" tabIndex={-1}>+ Log visit (works offline)</button>
    </>
  );
}
