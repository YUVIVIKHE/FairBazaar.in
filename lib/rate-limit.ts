import "server-only";

/**
 * Fixed-window in-memory rate limiter. Suitable for a single instance.
 * For multi-instance/serverless deployments swap for a shared store (e.g. Upstash Redis)
 * with the same interface.
 */
const buckets = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60_000) {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    if (buckets.size > 10_000) for (const [k, v] of buckets) if (v.reset < now) buckets.delete(k);
    return { ok: true, remaining: limit - 1 };
  }
  b.count++;
  return { ok: b.count <= limit, remaining: Math.max(0, limit - b.count), retryAfter: Math.ceil((b.reset - now) / 1000) };
}

export function clientIp(req: Request) {
  return (req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim();
}

/** CSRF defence for JSON endpoints: require same-origin requests. */
export function isSameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (!origin || !host) return false;
  try { return new URL(origin).host === host; } catch { return false; }
}
