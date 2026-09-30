import { useId } from "react";

/** FairBazaar mark — the "Flow F": an F whose middle stroke hands off to a live data node. Master files: /public/brand. */
export function LogoMark({ className = "size-8", edge = false }: { className?: string; edge?: boolean }) {
  const id = `fb${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="14" y1="12" x2="50" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3D6BFF" />
          <stop offset=".55" stopColor="#6F5BFF" />
          <stop offset="1" stopColor="#2EE6A6" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#0A1024" />
      {edge && <rect x=".5" y=".5" width="63" height="63" rx="15.5" fill="none" stroke="#fff" strokeOpacity=".14" />}
      <path fill={`url(#${id})`} d="M21 14h22a4 4 0 0 1 0 8H25v7h9a4 4 0 0 1 0 8h-9v9a4 4 0 0 1-8 0V18a4 4 0 0 1 4-4Z" />
      <circle cx="45" cy="33" r="4.5" fill="#2EE6A6" />
    </svg>
  );
}

export function Logo({ dark, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark edge={dark} />
      <span className={`font-display text-[1.2rem] font-extrabold tracking-[-0.02em] ${dark ? "text-white" : "text-ink-900"}`}>
        Fair<span className={dark ? "text-mint-400" : "text-brand-600"}>Bazaar</span>
      </span>
    </span>
  );
}
