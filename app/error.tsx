"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="mt-4 text-3xl font-bold">We hit an unexpected error</h1>
      <p className="mt-3 max-w-md text-slate-600">Please try again. If the problem continues, let us know through the contact page.</p>
      <div className="mt-8 flex gap-3">
        <button onClick={reset} className="h-11 rounded-full bg-brand-500 px-6 font-semibold text-white hover:bg-brand-600">Try again</button>
        <Link href="/contact" className="inline-flex h-11 items-center rounded-full px-6 font-semibold text-ink-900 ring-1 ring-line">Contact us</Link>
      </div>
    </section>
  );
}
