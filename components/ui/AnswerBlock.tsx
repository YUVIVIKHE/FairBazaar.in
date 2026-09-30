import { Sparkles } from "lucide-react";

/** AEO answer block: a question heading with a direct 40–60 word answer, placed near the top of a page. */
export function AnswerBlock({ question, answer, dark }: { question: string; answer: string; dark?: boolean }) {
  return (
    <section
      aria-labelledby="quick-answer"
      className={`relative overflow-hidden rounded-2xl border p-6 sm:p-8 ${dark ? "border-white/10 bg-white/[0.04]" : "border-brand-100 bg-gradient-to-br from-brand-50/80 via-white to-mint-300/10"}`}
    >
      <p className={`mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] ${dark ? "text-mint-300" : "text-brand-600"}`}>
        <Sparkles aria-hidden="true" className="size-3.5" /> Quick answer
      </p>
      <h2 id="quick-answer" className={`text-xl font-bold sm:text-2xl ${dark ? "text-white" : ""}`}>{question}</h2>
      <p className={`mt-3 text-base leading-7 sm:text-lg ${dark ? "text-slate-300" : "text-slate-700"}`}>{answer}</p>
    </section>
  );
}
