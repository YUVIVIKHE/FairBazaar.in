import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Particles } from "@/components/visuals/Particles";

export function PageHero({
  eyebrow, title, intro, crumbs, primary, secondary, aside, children, compact,
}: {
  eyebrow?: string; title: React.ReactNode; intro?: React.ReactNode; crumbs?: Crumb[];
  primary?: { label: string; href: string; track?: string }; secondary?: { label: string; href: string; track?: string };
  aside?: React.ReactNode; children?: React.ReactNode; compact?: boolean;
}) {
  return (
    <section className="section-dark noise relative overflow-hidden">
      <div aria-hidden="true" className="bg-aurora absolute inset-0" />
      <div aria-hidden="true" className="bg-grid absolute inset-0" />
      <Particles density={0.00006} />
      <div className={`container-x relative ${compact ? "pb-14 pt-10 sm:pb-16 sm:pt-12" : "pb-16 pt-10 sm:pb-24 sm:pt-14"}`}>
        {crumbs && <Breadcrumbs items={crumbs} dark />}
        <div className={`mt-8 grid gap-12 ${aside ? "lg:grid-cols-[1.05fr_1fr] lg:items-center" : ""}`}>
          <div className="max-w-3xl">
            {eyebrow && <span className="eyebrow eyebrow-dark">{eyebrow}</span>}
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{intro}</p>}
            {(primary || secondary) && (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                {primary && <Magnetic><Button href={primary.href} size="lg" arrow track={primary.track}>{primary.label}</Button></Magnetic>}
                {secondary && <Button href={secondary.href} size="lg" variant="outline-light" track={secondary.track}>{secondary.label}</Button>}
              </div>
            )}
            {children}
          </div>
          {aside && <div className="relative">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
