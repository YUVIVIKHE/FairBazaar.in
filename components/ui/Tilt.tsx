"use client";
import { useRef } from "react";

/** Subtle 3D tilt on hover (fine pointers only). */
export function Tilt({ children, className = "", max = 6 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-py * max}deg) rotateY(${px * max}deg)`;
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={`transition-transform duration-300 ease-out [transform-style:preserve-3d] ${className}`}>
      {children}
    </div>
  );
}
