"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en-IN">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#050816", color: "#fff", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0 }}>
        <div style={{ textAlign: "center", padding: 24 }}>
          <h1>Something went wrong</h1>
          <p style={{ color: "#94a3b8" }}>Please refresh the page or try again shortly.</p>
          <button onClick={reset} style={{ marginTop: 16, padding: "12px 24px", borderRadius: 999, border: 0, background: "#3D6BFF", color: "#fff", fontWeight: 600 }}>Try again</button>
        </div>
      </body>
    </html>
  );
}
