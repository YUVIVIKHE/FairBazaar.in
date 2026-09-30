import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

export function AnnouncementBar() {
  const a = site.announcement;
  if (!a?.text) return null;
  return (
    <div className="relative z-50 bg-ink-950 text-slate-200">
      <div className="container-x flex h-10 items-center justify-center gap-3 text-center text-xs sm:text-sm">
        <span className="hidden size-1.5 rounded-full bg-mint-400 shadow-[0_0_12px_#2EE6A6] sm:inline-block" aria-hidden="true" />
        <span className="truncate">{a.text}</span>
        <Link href={a.href} className="group inline-flex shrink-0 items-center gap-1 font-semibold text-mint-300 hover:text-white" data-track="announcement">
          {a.cta}<ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
