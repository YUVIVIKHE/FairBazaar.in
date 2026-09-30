import { newsletterSchema } from "@/lib/validation";
import { rateLimit, clientIp, isSameOrigin } from "@/lib/rate-limit";
import { subscribeNewsletter } from "@/services/leads";

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  const rl = rateLimit(`nl:${clientIp(req)}`, 5, 10 * 60_000);
  if (!rl.ok) return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  const parsed = newsletterSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Invalid email." }, { status: 422 });
  if (parsed.data.website) return Response.json({ ok: true });
  const r = await subscribeNewsletter(parsed.data.email, parsed.data.source);
  if (r !== "ok" && r !== "logged") return Response.json({ error: "Subscription service unavailable. Please try again." }, { status: 502 });
  return Response.json({ ok: true });
}
