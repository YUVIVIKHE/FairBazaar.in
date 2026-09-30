"use client";
import { useEffect, useRef } from "react";

/** Lightweight canvas particle field. Pauses off-screen and is disabled for reduced motion. */
export function Particles({ density = 0.00012, className = "" }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0, h = 0, raf = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let ps: P[] = [];
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(90, Math.floor(w * h * density));
      ps = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.15, vy: -Math.random() * 0.25 - 0.05, r: Math.random() * 1.4 + 0.3, a: Math.random() * 0.6 + 0.2 }));
    };
    const draw = () => {
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        if (p.x < -4) p.x = w + 4; else if (p.x > w + 4) p.x = -4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(157,179,255,${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); } });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
  }, [density]);
  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
