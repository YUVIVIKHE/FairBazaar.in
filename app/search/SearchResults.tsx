"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadIndex, search, type SearchDoc } from "@/lib/search-client";

export function SearchResults() {
  const sp = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  useEffect(() => { loadIndex().then(setDocs); }, []);
  const results = docs ? search(docs, q, 40) : [];
  return (
    <>
      <form role="search" onSubmit={(e) => { e.preventDefault(); router.replace(`/search?q=${encodeURIComponent(q)}`); }}>
        <label htmlFor="q" className="sr-only">Search</label>
        <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services, products, articles…" className="h-14 w-full rounded-2xl border border-line px-5 text-base outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100" />
      </form>
      <p className="mt-4 text-sm text-slate-500" aria-live="polite">{!docs ? "Loading…" : q ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Type to search"}</p>
      <ul className="mt-6 space-y-3">
        {results.map((r) => (
          <li key={r.u}><Link href={r.u} className="card card-hover block p-5"><span className="text-xs font-semibold text-brand-600">{r.k}</span><span className="mt-1 block font-semibold text-ink-900">{r.t}</span><span className="mt-1 line-clamp-2 block text-sm text-slate-600">{r.d}</span></Link></li>
        ))}
      </ul>
    </>
  );
}
