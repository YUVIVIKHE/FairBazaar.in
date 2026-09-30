import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white shadow-[0_8px_24px_-8px_rgb(61_107_255/0.7)] hover:bg-brand-600 hover:shadow-[0_12px_32px_-8px_rgb(61_107_255/0.8)]",
  secondary: "bg-white text-ink-900 ring-1 ring-line hover:ring-brand-300 hover:text-brand-700",
  ghost: "text-brand-700 hover:bg-brand-50",
  light: "bg-white text-ink-900 hover:bg-mint-300",
  "outline-light": "text-white ring-1 ring-white/25 hover:bg-white/10 hover:ring-white/40",
};
const sizes: Record<Size, string> = { sm: "h-9 px-4 text-sm", md: "h-11 px-5 text-sm", lg: "h-13 px-7 text-base" };

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  track?: string;
  external?: boolean;
  ariaLabel?: string;
};

/** CTAButton — the single button primitive across the site. `track` names the analytics event label. */
export function Button({ href, children, variant = "primary", size = "md", arrow, className = "", track, external, ariaLabel }: Props) {
  const cls = `group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 will-change-transform active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} data-track={track} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-track={track} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}

export function TextLink({ href, children, className = "", dark }: { href: string; children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-sm font-semibold ${dark ? "text-mint-300 hover:text-white" : "text-brand-600 hover:text-brand-700"} ${className}`}
    >
      {children}
      <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
