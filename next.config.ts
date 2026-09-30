import type { NextConfig } from "next";

const industrySlugs = [
  "healthcare", "education", "agriculture", "retail", "manufacturing", "real-estate", "hospitality",
  "finance", "logistics", "automotive", "professional-services", "startups", "smes", "enterprise",
];

// A static CSP. Inline scripts are required for JSON-LD and Next.js bootstrapping on statically
// generated pages; third-party origins are restricted to the analytics vendors we explicitly support.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://www.facebook.com",
  "frame-src 'self' https://calendly.com https://www.googletagmanager.com https://www.youtube-nocookie.com",
  "media-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      { source: "/((?!admin).*)", headers: securityHeaders },
      {
        // Decap CMS editor: needs its CDN script and GitHub API. Not indexed.
        source: "/admin/:path*",
        headers: [
          ...securityHeaders.filter((h) => h.key !== "Content-Security-Policy"),
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; connect-src 'self' https://api.github.com https://unpkg.com; frame-ancestors 'none'" },
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|woff2|mp4|webm)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return [
      // /solutions/<industry> is a common entry URL; the canonical industry page lives under /industries.
      ...industrySlugs.map((slug) => ({
        source: `/solutions/${slug}`,
        destination: `/industries/${slug}`,
        permanent: true,
      })),
      { source: "/services/custom-software", destination: "/services/custom-software-development", permanent: true },
      { source: "/services/mobile-apps", destination: "/services/mobile-app-development", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/refund-policy", destination: "/refund-cancellation-policy", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/admin", destination: "/admin/index.html", permanent: false },
    ];
  },
};

export default nextConfig;
