import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, dark }: { items: Crumb[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className={dark ? "text-slate-300" : "text-slate-700"}>{c.name}</span>
              ) : (
                <>
                  <Link href={c.path} className={dark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-brand-600"}>{c.name}</Link>
                  <ChevronRight aria-hidden="true" className={`size-3.5 ${dark ? "text-slate-600" : "text-slate-400"}`} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
