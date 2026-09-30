import { Plus } from "lucide-react";
import type { FAQ as FAQItem } from "@/content/types";

/**
 * Accessible accordion built on <details>/<summary>: keyboard operable, works without JS,
 * and every answer is in the HTML for search engines. Pair with faqSchema() on the page.
 */
export const faqId = (q: string) => q.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");

export function FAQ({ items, dark }: { items: FAQItem[]; dark?: boolean }) {
  return (
    <div className={`divide-y rounded-2xl border ${dark ? "divide-white/10 border-white/10 bg-white/[0.02]" : "divide-line border-line bg-white"}`}>
      {items.map((f) => (
        <details key={f.q} id={faqId(f.q)} className="group px-5 sm:px-7 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left">
            <h3 className={`text-base font-semibold sm:text-lg ${dark ? "text-white" : "text-ink-900"}`}>{f.q}</h3>
            <span className={`flex size-8 shrink-0 items-center justify-center rounded-full transition duration-300 group-open:rotate-45 ${dark ? "bg-white/10 text-mint-300" : "bg-brand-50 text-brand-600"}`}>
              <Plus aria-hidden="true" className="size-4" />
            </span>
          </summary>
          <div className="grid grid-rows-[0fr] transition-all duration-300 group-open:grid-rows-[1fr]">
            <p className={`overflow-hidden pb-5 pr-10 leading-7 ${dark ? "text-slate-400" : "text-slate-600"}`}>{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
