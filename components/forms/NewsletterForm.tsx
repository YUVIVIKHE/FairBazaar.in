"use client";
import { useState } from "react";
import { track } from "@/lib/analytics";

export function NewsletterForm({ dark = true, source = "footer" }: { dark?: boolean; source?: string }) {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fd.get("email"), website: fd.get("website"), source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setState("ok");
      setMsg("You're subscribed. Watch your inbox for technology insights.");
      track("newsletter_signup", { source });
    } catch (err) {
      setState("error");
      setMsg((err as Error).message);
    }
  }

  if (state === "ok") return <p role="status" className={`text-sm font-medium ${dark ? "text-mint-300" : "text-mint-600"}`}>{msg}</p>;

  return (
    <form onSubmit={onSubmit} className="w-full" noValidate={false}>
      <div className={`flex flex-col gap-2 rounded-2xl p-1.5 sm:flex-row sm:rounded-full ${dark ? "bg-white/5 ring-1 ring-white/10" : "bg-white ring-1 ring-line"}`}>
        <label htmlFor={`nl-${source}`} className="sr-only">Email address</label>
        <input
          id={`nl-${source}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={`h-11 min-w-0 flex-1 rounded-full bg-transparent px-4 text-sm outline-none ${dark ? "text-white placeholder:text-slate-500" : "text-ink-900 placeholder:text-slate-400"}`}
        />
        {/* Honeypot — hidden from humans */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button disabled={state === "loading"} className="h-11 shrink-0 rounded-full bg-brand-500 px-5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60">
          {state === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {state === "error" && <p role="alert" className="mt-2 text-sm text-coral-400">{msg}</p>}
      <p className={`mt-2 text-xs ${dark ? "text-slate-500" : "text-slate-500"}`}>Topics: AI · SaaS · Software · Automation · Business Technology. Unsubscribe anytime.</p>
    </form>
  );
}
