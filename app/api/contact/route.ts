import { contactSchema } from "@/lib/validation";
import { rateLimit, clientIp, isSameOrigin } from "@/lib/rate-limit";
import { routeLead } from "@/services/leads";

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (!req.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Unsupported content type." }, { status: 415 });

  const ip = clientIp(req);
  const rl = rateLimit(`contact:${ip}`, 5, 10 * 60_000);
  if (!rl.ok) return Response.json({ error: "Too many requests. Please try again later." }, { status: 429, headers: { "Retry-After": String(rl.retryAfter ?? 600) } });

  let body: unknown;
  try {
    const text = await req.text();
    if (text.length > 20_000) return Response.json({ error: "Request too large." }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    if (fieldErrors.website) return Response.json({ ok: true }); // honeypot: pretend success
    return Response.json({ error: "Please check the highlighted fields.", fieldErrors }, { status: 422 });
  }
  // Time-trap: humans take more than 3 seconds to fill the form.
  if (parsed.data.startedAt && Date.now() - parsed.data.startedAt < 3000) return Response.json({ ok: true });

  await routeLead({ ...parsed.data, ip, receivedAt: new Date().toISOString() });
  return Response.json({ ok: true });
}
