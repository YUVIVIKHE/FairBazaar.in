import Image from "next/image";
import { getMedia } from "@/content/media";

/**
 * Renders a generated asset from content/media.ts once it is marked `ready`.
 * Until then it renders an on-brand abstract fallback (never a broken image).
 * In development, the slot id is shown so editors can find the matching prompt.
 */
export function MediaSlot({
  id, className = "", priority, sizes = "(min-width: 1024px) 50vw, 100vw", fallback, rounded = "rounded-2xl", overrideSrc, overrideReady, overrideAlt,
}: {
  id: string; className?: string; priority?: boolean; sizes?: string; fallback?: React.ReactNode; rounded?: string;
  overrideSrc?: string; overrideReady?: boolean; overrideAlt?: string;
}) {
  const m = getMedia(id);
  const ready = overrideReady ?? m?.ready ?? false;
  const src = overrideSrc ?? m?.file;
  const alt = overrideAlt ?? m?.alt ?? "";

  if (ready && src) {
    if (m?.kind === "video") {
      return (
        <video
          className={`${rounded} h-full w-full object-cover ${className}`}
          poster={m.poster}
          preload="none"
          controls
          playsInline
          aria-label={alt}
        >
          <source src={src} type="video/mp4" />
          {m.captions && <track kind="captions" src={m.captions} srcLang="en" label="English" default />}
        </video>
      );
    }
    return (
      <div className={`relative overflow-hidden ${rounded} ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${rounded} bg-ink-900 ${className}`}
      role={fallback ? undefined : "img"}
      aria-label={fallback ? undefined : alt}
      data-media-slot={id}
    >
      {fallback ?? <AbstractArt seed={id} />}
      {process.env.NODE_ENV === "development" && (
        <span className="absolute left-2 top-2 z-10 rounded-md bg-black/60 px-2 py-1 font-mono text-[10px] text-mint-300">media: {id}</span>
      )}
    </div>
  );
}

/** Deterministic abstract art so each placeholder looks distinct yet on-brand. */
export function AbstractArt({ seed }: { seed: string }) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const r = (n: number) => ((h >> n) & 0xff) / 255;
  const cx = 20 + r(0) * 60, cy = 20 + r(8) * 60;
  const rings = [0, 1, 2, 3];
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id={`ag-${h}`} cx={`${cx}%`} cy={`${cy}%`} r="70%">
          <stop offset="0" stopColor="#3D6BFF" stopOpacity=".55" />
          <stop offset=".5" stopColor="#6F5BFF" stopOpacity=".18" />
          <stop offset="1" stopColor="#0A1024" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`al-${h}`} x1="0" x2="1">
          <stop offset="0" stopColor="#6A8CFF" stopOpacity="0" />
          <stop offset=".5" stopColor="#2EE6A6" stopOpacity=".6" />
          <stop offset="1" stopColor="#6A8CFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="#0A1024" />
      <rect width="400" height="260" fill={`url(#ag-${h})`} />
      <g stroke="rgba(255,255,255,.05)">
        {Array.from({ length: 12 }).map((_, i) => <line key={`v${i}`} x1={i * 36} y1="0" x2={i * 36} y2="260" />)}
        {Array.from({ length: 8 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 36} x2="400" y2={i * 36} />)}
      </g>
      {rings.map((i) => (
        <circle key={i} cx={cx * 4} cy={cy * 2.6} r={30 + i * 26 + r(16) * 10} fill="none" stroke="rgba(157,179,255,.16)" strokeDasharray={i % 2 ? "2 6" : undefined} />
      ))}
      <path d={`M0 ${140 + r(4) * 60} C 120 ${80 + r(12) * 80}, 260 ${200 - r(20) * 80}, 400 ${100 + r(2) * 60}`} stroke={`url(#al-${h})`} strokeWidth="1.5" fill="none" />
      <circle cx={cx * 4} cy={cy * 2.6} r="6" fill="#2EE6A6" opacity=".85" />
    </svg>
  );
}
