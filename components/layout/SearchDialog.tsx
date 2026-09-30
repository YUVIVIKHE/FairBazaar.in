"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft, X } from "lucide-react";
import { loadIndex, search, type SearchDoc } from "@/lib/search-client";

const suggestions = [
  { t: "HRMS", u: "/products/hrms" }, { t: "AI Development", u: "/services/ai-development" }, { t: "Custom CRM", u: "/services/crm-development" },
  { t: "ERP", u: "/products/erp" }, { t: "Healthcare", u: "/industries/healthcare" }, { t: "Cost of custom software", u: "/blog/custom-software-development-cost" },
];

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((v) => !v); }
      if (e.key === "/" && !/input|textarea|select/i.test((e.target as HTMLElement).tagName)) { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener("fb:open-search", onOpen);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("fb:open-search", onOpen); window.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => {
    if (!open) { lastFocus.current?.focus(); return; }
    lastFocus.current = document.activeElement as HTMLElement;
    setLoading(true);
    loadIndex().then((d) => { setDocs(d); setLoading(false); });
    setTimeout(() => input.current?.focus(), 10);
  }, [open]);

  const results = q ? search(docs, q) : [];
  useEffect(() => setActive(0), [q]);

  const go = (u: string) => { setOpen(false); setQ(""); router.push(u); };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-ink-950/60 p-3 pt-[10vh] backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div role="dialog" aria-modal="true" aria-label="Search FairBazaar" className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search aria-hidden="true" className="size-5 text-slate-400" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
              if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
              if (e.key === "Enter" && results[active]) go(results[active].u);
              if (e.key === "Enter" && !results.length && q) go(`/search?q=${encodeURIComponent(q)}`);
            }}
            placeholder="Search services, products, industries, articles…"
            aria-label="Search"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-activedescendant={results[active] ? `sr-${active}` : undefined}
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-slate-400"
          />
          <button onClick={() => setOpen(false)} aria-label="Close search" className="rounded-lg p-1.5 text-slate-400 hover:bg-surface"><X className="size-5" aria-hidden="true" /></button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!q && (
            <div className="p-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Popular</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button key={s.u} onClick={() => go(s.u)} className="rounded-full bg-surface px-3 py-1.5 text-sm text-ink-900 hover:bg-brand-50 hover:text-brand-700">{s.t}</button>
                ))}
              </div>
            </div>
          )}
          {q && loading && <p className="p-4 text-sm text-slate-500">Loading…</p>}
          {q && !loading && !results.length && (
            <p className="p-4 text-sm text-slate-500">No results for “{q}”. Try “CRM”, “AI agents” or “payroll”.</p>
          )}
          <ul id="search-results" role="listbox">
            {results.map((r, i) => (
              <li key={r.u + i} id={`sr-${i}`} role="option" aria-selected={i === active}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r.u)}
                  className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left ${i === active ? "bg-brand-50" : ""}`}
                >
                  <span className="mt-0.5 shrink-0 rounded-md bg-surface px-2 py-0.5 text-[11px] font-semibold text-slate-500">{r.k}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-ink-900">{r.t}</span>
                    <span className="mt-0.5 line-clamp-1 block text-sm text-slate-500">{r.d}</span>
                  </span>
                  {i === active && <CornerDownLeft aria-hidden="true" className="mt-1 size-4 text-brand-500" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
