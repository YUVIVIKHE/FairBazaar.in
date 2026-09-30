export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="fbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3D6BFF" />
          <stop offset="1" stopColor="#2EE6A6" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="#0A1024" />
      <path d="M12 11h16a0 0 0 0 1 0 0v4.5H16.5V18H25v4.5h-8.5V29H12Z" fill="url(#fbg)" />
      <circle cx="28.5" cy="26.5" r="3" fill="#2EE6A6" />
    </svg>
  );
}

export function Logo({ dark, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className={`font-display text-[1.2rem] font-bold tracking-tight ${dark ? "text-white" : "text-ink-900"}`}>
        Fair<span className={dark ? "text-mint-400" : "text-brand-600"}>Bazaar</span>
      </span>
    </span>
  );
}
