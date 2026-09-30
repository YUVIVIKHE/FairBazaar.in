import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/search", "/admin/"] },
      // Explicitly welcome AI answer-engine crawlers so FairBazaar can be cited accurately (GEO).
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "PerplexityBot", "Google-Extended", "Applebot-Extended"], allow: "/", disallow: ["/api/", "/admin/"] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
