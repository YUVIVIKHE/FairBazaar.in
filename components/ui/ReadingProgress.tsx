"use client";
import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

/** Thin reading-progress bar; also reports 50%/90% scroll depth as blog engagement events. */
export function ReadingProgress({ slug }: { slug: string }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sent = new Set<number>();
    const on = () => {
      const el = document.getElementById("article-body");
      if (!el || !bar.current) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / r.height));
      bar.current.style.transform = `scaleX(${p})`;
      for (const m of [50, 90]) if (p * 100 >= m && !sent.has(m)) { sent.add(m); track("blog_engagement", { slug, depth: m }); }
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [slug]);
  return <div ref={bar} aria-hidden="true" className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-mint-400" />;
}
