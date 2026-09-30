import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const alt = "FairBazaar — Technology that transforms businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  // Plus Jakarta Sans (SIL Open Font License) — the brand display face.
  const jakarta = readFileSync(join(process.cwd(), "assets/fonts/PlusJakartaSans-ExtraBold.ttf"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "radial-gradient(circle at 20% 10%, #2a52e0 0%, #0a1024 45%, #050816 100%)", color: "white", fontFamily: "Jakarta" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="72" height="72" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="14" y1="12" x2="50" y2="52" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#3D6BFF" /><stop offset=".55" stopColor="#6F5BFF" /><stop offset="1" stopColor="#2EE6A6" /></linearGradient></defs><rect width="64" height="64" rx="16" fill="#0A1024" /><rect x=".5" y=".5" width="63" height="63" rx="15.5" fill="none" stroke="#fff" strokeOpacity=".14" /><path fill="url(#g)" d="M21 14h22a4 4 0 0 1 0 8H25v7h9a4 4 0 0 1 0 8h-9v9a4 4 0 0 1-8 0V18a4 4 0 0 1 4-4Z" /><circle cx="45" cy="33" r="4.5" fill="#2EE6A6" /></svg>
          <div style={{ fontSize: 40, fontWeight: 700, display: "flex" }}><span>Fair</span><span style={{ color: "#2ee6a6" }}>Bazaar</span></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5 }}>Build Smarter. Automate Faster.</div>
          <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.08, color: "#9db3ff", letterSpacing: -1.5 }}>Grow with Technology.</div>
          <div style={{ marginTop: 28, fontSize: 26, color: "#94a3b8", letterSpacing: 0 }}>SaaS products · Custom software · AI & automation · CRM · ERP · HRMS</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Jakarta", data: jakarta, weight: 800, style: "normal" }] },
  );
}
