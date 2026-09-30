import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow, title, intro, align = "center", dark, as: H = "h2", className = "",
}: { eyebrow?: string; title: React.ReactNode; intro?: React.ReactNode; align?: "center" | "left"; dark?: boolean; as?: "h1" | "h2"; className?: string }) {
  const a = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <Reveal className={`flex max-w-3xl flex-col gap-4 ${a} ${className}`}>
      {eyebrow && <span className={`eyebrow ${dark ? "eyebrow-dark" : ""}`}>{eyebrow}</span>}
      <H className={`text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem] ${dark ? "text-white" : ""}`}>{title}</H>
      {intro && <p className={`text-base leading-7 sm:text-lg ${dark ? "text-slate-400" : "text-slate-600"}`}>{intro}</p>}
    </Reveal>
  );
}
