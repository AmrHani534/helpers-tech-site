import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues.map((i) => i.message).join(", ") },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // Persist to Supabase if configured.
  const supabase = await getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp || null,
      company: data.company || null,
      project_type: data.project_type || null,
      budget: data.budget || null,
      timeline: data.timeline || null,
      message: data.message,
      status: "new",
    });
    if (error) {
      console.error("[contact] supabase insert failed", error);
      // Don't fail the request — the user shouldn't pay for our DB outage.
    }
  }

  // Optional email notification via Resend.
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFICATION_TO;
  const from =
    process.env.CONTACT_NOTIFICATION_FROM ||
    "Helpers Technologies <noreply@helpers-tech.com>";
  if (resendKey && to) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: data.email,
          subject: `New contact: ${data.name} — ${data.project_type || "General"}`,
          html: emailHtml(data),
        }),
      });
    } catch (err) {
      console.error("[contact] resend failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}

function emailHtml(d: {
  name: string;
  email: string;
  whatsapp?: string;
  company?: string;
  project_type?: string;
  budget?: string;
  timeline?: string;
  message: string;
}): string {
  return `
    <div style="font-family: Inter, system-ui, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2>New contact submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(d.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
      ${d.whatsapp ? `<p><strong>WhatsApp:</strong> ${escapeHtml(d.whatsapp)}</p>` : ""}
      ${d.company ? `<p><strong>Company:</strong> ${escapeHtml(d.company)}</p>` : ""}
      ${d.project_type ? `<p><strong>Project type:</strong> ${escapeHtml(d.project_type)}</p>` : ""}
      ${d.budget ? `<p><strong>Budget:</strong> ${escapeHtml(d.budget)}</p>` : ""}
      ${d.timeline ? `<p><strong>Timeline:</strong> ${escapeHtml(d.timeline)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <div style="white-space: pre-wrap; padding: 12px; border: 1px solid #eee; border-radius: 8px;">${escapeHtml(d.message)}</div>
    </div>
  `;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
