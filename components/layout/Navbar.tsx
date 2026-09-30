"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X, ArrowRight } from "lucide-react";
import { mainNav } from "@/content/navigation";
import { Logo } from "@/components/ui/Logo";
import { ctas } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [drawerTop, setDrawerTop] = useState(104);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpenMenu(null); setMobile(false); }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpenMenu(null); setMobile(false); } };
    const onDown = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const solid = scrolled || openMenu !== null || mobile;
  const enter = (label: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpenMenu(label); };
  const leave = () => { closeTimer.current = setTimeout(() => setOpenMenu(null), 140); };
  const openSearch = () => window.dispatchEvent(new Event("fb:open-search"));

  return (
    <>
    <header
      ref={navRef}
      className={`sticky top-0 z-40 transition-all duration-300 ${solid ? "border-b border-line/80 bg-white/85 shadow-[0_1px_0_rgb(10_16_36/0.02)] backdrop-blur-xl" : "border-b border-white/5 bg-ink-950"}`}
    >
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link href="/" aria-label="FairBazaar home" className="shrink-0">
          <Logo dark={!solid} />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((g) => {
            const isOpen = openMenu === g.label;
            const active = pathname?.startsWith(g.href) && g.href !== "/";
            return (
              <li key={g.label} className="relative" onMouseEnter={() => enter(g.label)} onMouseLeave={leave}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`mega-${g.label}`}
                  onClick={() => setOpenMenu(isOpen ? null : g.label)}
                  className={`inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-sm font-medium transition ${
                    solid ? (active ? "text-brand-700" : "text-slate-700 hover:bg-surface hover:text-ink-900") : "text-slate-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {g.label}
                  <ChevronDown aria-hidden="true" className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  id={`mega-${g.label}`}
                  hidden={!isOpen}
                  className="absolute left-1/2 top-full z-50 w-max max-w-[min(92vw,760px)] -translate-x-1/2 pt-3"
                >
                  <div className="animate-[mega_.25s_ease-out] overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-lift)]">
                    <div className="flex">
                      <div className="grid gap-x-8 gap-y-2 p-6" style={{ gridTemplateColumns: `repeat(${g.columns.length}, minmax(190px, 1fr))` }}>
                        {g.columns.map((col) => (
                          <div key={col.title}>
                            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{col.title}</p>
                            <ul className="space-y-0.5">
                              {col.links.map((l) => (
                                <li key={l.href}>
                                  <Link href={l.href} className="group block rounded-xl px-3 py-2.5 transition hover:bg-surface">
                                    <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-900 group-hover:text-brand-700">
                                      {l.label}
                                      <ArrowRight aria-hidden="true" className="size-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                                    </span>
                                    {l.description && <span className="mt-0.5 block text-xs text-slate-500">{l.description}</span>}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {g.feature && (
                        <Link href={g.feature.href} className="section-dark relative hidden w-60 shrink-0 overflow-hidden p-6 md:block" data-track={`mega_${g.label}`}>
                          <div aria-hidden="true" className="bg-aurora absolute inset-0" />
                          <div className="relative">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mint-300">Featured</p>
                            <p className="mt-3 font-display text-lg font-bold text-white">{g.feature.title}</p>
                            <p className="mt-2 text-sm text-slate-300">{g.feature.text}</p>
                            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-mint-300">{g.feature.cta}<ArrowRight aria-hidden="true" className="size-4" /></span>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search the site"
            className={`inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm transition ${solid ? "text-slate-600 ring-1 ring-line hover:ring-brand-300" : "text-slate-300 ring-1 ring-white/15 hover:ring-white/40"}`}
          >
            <Search aria-hidden="true" className="size-4" />
            <span className="hidden xl:inline">Search</span>
            <kbd className="hidden rounded border border-current/20 px-1.5 font-sans text-[10px] opacity-60 xl:inline">⌘K</kbd>
          </button>
          <Link
            href={ctas.primary.href}
            data-track="nav_talk_to_expert"
            className="hidden h-10 items-center rounded-full bg-brand-500 px-5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgb(61_107_255/0.7)] transition hover:bg-brand-600 sm:inline-flex"
          >
            {ctas.primary.label}
          </Link>
          <button
            type="button"
            className={`inline-flex size-10 items-center justify-center rounded-full lg:hidden ${solid ? "text-ink-900 ring-1 ring-line" : "text-white ring-1 ring-white/20"}`}
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            aria-controls="mobile-nav"
            onClick={() => { setDrawerTop(navRef.current?.getBoundingClientRect().bottom ?? 64); setMobile((v) => !v); }}
          >
            {mobile ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

    </header>
      {/* Mobile navigation — designed as a full-height sheet with thumb-reachable CTA */}
      <div id="mobile-nav" hidden={!mobile} className="fixed inset-x-0 bottom-0 z-40 flex flex-col bg-white lg:hidden" style={{ top: drawerTop }}>
        <div className="flex-1 overflow-y-auto px-4 pb-6 pt-2">
          <ul className="divide-y divide-line">
            {mainNav.map((g) => {
              const open = mobileGroup === g.label;
              return (
                <li key={g.label}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setMobileGroup(open ? null : g.label)}
                    className="flex w-full items-center justify-between py-4 text-left font-display text-lg font-semibold text-ink-900"
                  >
                    {g.label}
                    <ChevronDown aria-hidden="true" className={`size-5 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && (
                    <div className="grid grid-cols-2 gap-1 pb-4">
                      {g.columns.flatMap((c) => c.links).map((l) => (
                        <Link key={l.href} href={l.href} className="rounded-xl bg-surface px-3 py-3 text-sm font-medium text-ink-900 active:bg-brand-50">
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Link href={ctas.primary.href} data-track="mobile_nav_expert" className="flex h-12 w-full items-center justify-center rounded-full bg-brand-500 font-semibold text-white">
            {ctas.primary.label}
          </Link>
        </div>
      </div>
    </>
  );
}
