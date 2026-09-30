import "server-only";
import type { ContactInput } from "@/lib/validation";

/**
 * Lead routing. Every step is optional and driven by server-side environment variables,
 * so no secret ever reaches the browser. Failures in one channel never lose the lead:
 * the structured log line is the audit trail of last resort.
 */
export async function routeLead(lead: ContactInput & { ip: string; receivedAt: string }) {
  const { website: _hp, startedAt: _s, ...data } = lead;
  const results: Record<string, string> = {};

  // Audit log (no message body or phone to keep logs low-sensitivity)
  console.info(JSON.stringify({ evt: "lead.received", at: data.receivedAt, service: data.service, intent: data.intent, source: data.attribution?.utm_source ?? data.attribution?.referrer ?? "direct" }));

  const tasks: Promise<void>[] = [];

  if (process.env.CRM_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.CRM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(process.env.CRM_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.CRM_WEBHOOK_SECRET}` } : {}) },
        body: JSON.stringify({ type: "website_lead", ...data }),
        signal: AbortSignal.timeout(8000),
      }).then((r) => { results.crm = r.ok ? "ok" : `http_${r.status}`; }).catch((e) => { results.crm = `error:${(e as Error).name}`; }),
    );
  }

  if (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_TO && process.env.LEAD_NOTIFY_FROM) {
    const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
    const rows = Object.entries({ Name: data.name, Company: data.company, Email: data.email, Phone: data.phone, Industry: data.industry, "Company size": data.companySize, Service: data.service, Budget: data.budget, Intent: data.intent, Product: data.product, ...data.attribution })
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#64748b">${esc(k)}</td><td>${esc(String(v))}</td></tr>`)
      .join("");
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.LEAD_NOTIFY_FROM,
          to: process.env.LEAD_NOTIFY_TO.split(","),
          reply_to: data.email,
          subject: `New lead: ${data.service} — ${data.company || data.name}`,
          html: `<h2>New website lead</h2><table>${rows}</table><p style="white-space:pre-wrap">${esc(data.message)}</p>`,
        }),
        signal: AbortSignal.timeout(8000),
      }).then((r) => { results.email = r.ok ? "ok" : `http_${r.status}`; }).catch((e) => { results.email = `error:${(e as Error).name}`; }),
    );
  }

  await Promise.all(tasks);
  const delivered = Object.values(results).some((v) => v === "ok");
  if (!delivered) {
    // No channel configured or every channel failed: persist the full lead in logs so it is never lost.
    console.warn(JSON.stringify({ evt: "lead.undelivered", results, lead: data }));
  } else if (Object.values(results).some((v) => v !== "ok")) {
    console.warn(JSON.stringify({ evt: "lead.partial_delivery", results }));
  }
  return results;
}

export async function subscribeNewsletter(email: string, source: string) {
  if (!process.env.NEWSLETTER_WEBHOOK_URL) {
    // No provider configured yet: keep the signup in server logs so it is not lost.
    console.info(JSON.stringify({ evt: "newsletter.subscribe", source, email }));
    return "logged";
  }
  console.info(JSON.stringify({ evt: "newsletter.subscribe", source }));
  const r = await fetch(process.env.NEWSLETTER_WEBHOOK_URL, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, source }), signal: AbortSignal.timeout(8000),
  });
  return r.ok ? "ok" : `http_${r.status}`;
}
