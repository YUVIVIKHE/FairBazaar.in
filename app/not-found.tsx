import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

const popular = [
  { label: "Products", href: "/products" }, { label: "Services", href: "/services" }, { label: "FairBazaar HRMS", href: "/products/hrms" },
  { label: "AI Development", href: "/services/ai-development" }, { label: "Industries", href: "/industries" }, { label: "Blog", href: "/blog" },
];

export default function NotFound() {
  return (
    <section className="section-dark noise relative overflow-hidden">
      <div aria-hidden="true" className="bg-aurora absolute inset-0" />
      <div aria-hidden="true" className="bg-grid absolute inset-0" />
      <div className="container-x relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-display text-8xl font-extrabold text-gradient sm:text-9xl">404</p>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">This page isn't part of the ecosystem</h1>
        <p className="mt-4 max-w-lg text-slate-300">The page you're looking for may have moved. Try one of these destinations or search the site.</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {popular.map((p) => <li key={p.href}><Link href={p.href} className="glass inline-flex rounded-full px-4 py-2 text-sm text-white hover:border-white/30">{p.label}</Link></li>)}
        </ul>
        <div className="mt-10"><Button href="/" variant="light" arrow>Back to home</Button></div>
      </div>
    </section>
  );
}
