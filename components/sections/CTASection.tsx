import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { ctas } from "@/lib/site";
import { media } from "@/content/media";
import { MediaSlot } from "@/components/ui/MediaSlot";

export function CTASection({
  title = "Have a Business Problem? Let's Build the Solution.",
  text = "Tell us about your workflow, bottleneck or idea. A FairBazaar technology expert will map a practical path — product, custom build or AI — within one conversation.",
  primary = { label: "Talk to a Technology Expert", href: ctas.primary.href },
  secondary = { label: ctas.consult.label, href: ctas.consult.href },
  track = "cta_bottom",
}: {
  title?: string; text?: string; primary?: { label: string; href: string }; secondary?: { label: string; href: string } | null; track?: string;
}) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Reveal className="section-dark noise relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12 sm:py-20">
        {media["abstract-grid"].ready && <div aria-hidden="true" className="absolute inset-0 opacity-40"><MediaSlot id="abstract-grid" rounded="rounded-none" className="h-full w-full" sizes="100vw" /></div>}
        <div aria-hidden="true" className="bg-aurora absolute inset-0 opacity-90" />
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold leading-tight sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{text}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <Button href={primary.href} size="lg" variant="light" arrow track={track}>{primary.label}</Button>
            </Magnetic>
            {secondary && <Button href={secondary.href} size="lg" variant="outline-light" track={`${track}_secondary`}>{secondary.label}</Button>}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Inline contextual CTA strip used after major sections. */
export function InlineCTA({ text, label, href, dark, track }: { text: string; label: string; href: string; dark?: boolean; track?: string }) {
  return (
    <Reveal className={`mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:p-6 ${dark ? "border-white/10 bg-white/[0.04]" : "border-brand-100 bg-brand-50/50"}`}>
      <p className={`text-base font-medium ${dark ? "text-slate-200" : "text-ink-900"}`}>{text}</p>
      <Button href={href} variant={dark ? "light" : "primary"} arrow track={track}>{label}</Button>
    </Reveal>
  );
}
