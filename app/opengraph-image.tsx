import { ImageResponse } from "next/og";

export const alt = "FairBazaar — Technology that transforms businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "radial-gradient(circle at 20% 10%, #2a52e0 0%, #0a1024 45%, #050816 100%)", color: "white", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "#0a1024", border: "2px solid #3d6bff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, fontWeight: 800, color: "#2ee6a6" }}>F</div>
          <div style={{ fontSize: 40, fontWeight: 700, display: "flex" }}><span>Fair</span><span style={{ color: "#2ee6a6" }}>Bazaar</span></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>Build Smarter. Automate Faster.</div>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, color: "#9db3ff", letterSpacing: -2 }}>Grow with Technology.</div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#94a3b8" }}>SaaS products · Custom software · AI & automation · CRM · ERP · HRMS</div>
        </div>
      </div>
    ),
    size,
  );
}
