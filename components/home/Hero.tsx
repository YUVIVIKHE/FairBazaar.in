import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { HeroEcosystem } from "@/components/visuals/HeroEcosystem";
import { Particles } from "@/components/visuals/Particles";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { media, videos } from "@/content/media";
import { ctas } from "@/lib/site";
import { CheckCircle2 } from "lucide-react";

export function Hero() {
  const loop = videos["hero-loop"];
  const bg = media["hero-ecosystem"];
  return (
    <section className="section-dark noise relative overflow-hidden" aria-labelledby="hero-title">
      {/* Optional generated background layers (activate via content/media.ts) */}
      {loop.ready ? (
        <video className="absolute inset-0 h-full w-full object-cover opacity-30" autoPlay muted loop playsInline preload="none" poster={loop.poster} aria-hidden="true">
          <source src={loop.file} type="video/mp4" />
        </video>
      ) : bg.ready ? (
        <MediaSlot id="hero-ecosystem" priority rounded="rounded-none" className="absolute inset-0 opacity-40" sizes="100vw" />
      ) : null}
      <div aria-hidden="true" className="bg-aurora absolute inset-0" />
      <div aria-hidden="true" className="bg-grid absolute inset-0" />
      <Particles />
      <div className="container-x relative grid items-center gap-10 pb-16 pt-10 sm:pb-24 sm:pt-16 lg:grid-cols-[1.02fr_1fr] lg:gap-6 lg:pb-28">
        <div>
          <span className="eyebrow eyebrow-dark">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-mint-400" /> SaaS · Custom Software · AI
          </span>
          <h1 id="hero-title" className="mt-6 text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-[4.4rem]">
            Build Smarter.<br />
            <span className="text-gradient">Automate Faster.</span><br />
            Grow with Technology.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
            FairBazaar builds intelligent SaaS products, custom software, AI solutions and digital platforms that help businesses automate operations, improve productivity and scale faster.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Magnetic><Button href={ctas.primary.href} size="lg" arrow track="hero_talk_to_expert">Talk to an Expert</Button></Magnetic>
            <Button href="/solutions" size="lg" variant="outline-light" track="hero_explore_solutions">Explore Our Solutions</Button>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
            {["Products + custom builds", "AI-native engineering", "Full source & data ownership"].map((t) => (
              <li key={t} className="inline-flex items-center gap-2"><CheckCircle2 aria-hidden="true" className="size-4 text-mint-400" />{t}</li>
            ))}
          </ul>
        </div>
        <HeroEcosystem />
      </div>
    </section>
  );
}
