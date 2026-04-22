import { NextResponse } from "next/server";
import { careerApplicationSchema } from "@/lib/schemas";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

const MAX_CV_BYTES = 6 * 1024 * 1024; // 6 MB
const ALLOWED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_CV_EXT = /\.(pdf|doc|docx)$/i;

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { ok: false, error: "Expected multipart/form-data" },
      { status: 400 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid form data" },
      { status: 400 },
    );
  }

  const getStr = (k: string) => {
    const v = form.get(k);
    return typeof v === "string" ? v : "";
  };

  const supabase = await getSupabaseAdmin();

  // Optional CV upload
  let cv_url = "";
  let cv_filename = "";
  const cv = form.get("cv");
  if (cv instanceof File && cv.size > 0) {
    if (cv.size > MAX_CV_BYTES) {
      return NextResponse.json(
        { ok: false, error: "CV file is too large (max 6 MB)." },
        { status: 400 },
      );
    }
    const nameOk = ALLOWED_CV_EXT.test(cv.name);
    const typeOk = !cv.type || ALLOWED_CV_TYPES.has(cv.type);
    if (!nameOk || !typeOk) {
      return NextResponse.json(
        { ok: false, error: "Unsupported CV format. Use PDF, DOC, or DOCX." },
        { status: 400 },
      );
    }
    cv_filename = cv.name;
    if (supabase) {
      const ext = (cv.name.match(ALLOWED_CV_EXT)?.[0] ?? ".pdf").toLowerCase();
      const path = `careers/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}${ext}`;
      const buf = Buffer.from(await cv.arrayBuffer());
      const { error: upErr } = await supabase.storage
        .from("public")
        .upload(path, buf, {
          contentType: cv.type || "application/octet-stream",
          upsert: false,
        });
      if (upErr) {
        console.error("[careers] cv upload failed", upErr);
      } else {
        const { data: pub } = supabase.storage.from("public").getPublicUrl(path);
        cv_url = pub.publicUrl;
      }
    }
  }

  const payload = {
    full_name: getStr("full_name"),
    email: getStr("email"),
    phone: getStr("phone"),
    location: getStr("location"),
    role: getStr("role"),
    experience_years: getStr("experience_years"),
    linkedin: getStr("linkedin"),
    portfolio: getStr("portfolio"),
    cover_letter: getStr("cover_letter"),
    cv_url,
    cv_filename,
  };

  const parsed = careerApplicationSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues.map((i) => i.message).join(", ") },
      { status: 400 },
    );
  }
  const data = parsed.data;

  if (supabase) {
    const { error } = await supabase.from("career_applications").insert({
      full_name: data.full_name,
      email: data.email,
      phone: data.phone || null,
      location: data.location || null,
      role: data.role,
      experience_years: data.experience_years || null,
      linkedin: data.linkedin || null,
      portfolio: data.portfolio || null,
      cover_letter: data.cover_letter,
      cv_url: data.cv_url || null,
      cv_filename: data.cv_filename || null,
      status: "new",
    });
    if (error) {
      console.error("[careers] insert failed", error);
      return NextResponse.json(
        { ok: false, error: "Failed to save application. Please try again." },
        { status: 500 },
      );
    }
  }

  // Optional email notification
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
          subject: `New application: ${data.full_name} — ${data.role}`,
          html: emailHtml(data),
        }),
      });
    } catch (err) {
      console.error("[careers] resend failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}

function emailHtml(d: {
  full_name: string;
  email: string;
  phone?: string;
  location?: string;
  role: string;
  experience_years?: string;
  linkedin?: string;
  portfolio?: string;
  cover_letter: string;
  cv_url?: string;
  cv_filename?: string;
}): string {
  return `
    <div style="font-family: Inter, system-ui, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2>New career application</h2>
      <p><strong>Name:</strong> ${esc(d.full_name)}</p>
      <p><strong>Email:</strong> ${esc(d.email)}</p>
      ${d.phone ? `<p><strong>Phone:</strong> ${esc(d.phone)}</p>` : ""}
      ${d.location ? `<p><strong>Location:</strong> ${esc(d.location)}</p>` : ""}
      <p><strong>Role:</strong> ${esc(d.role)}</p>
      ${d.experience_years ? `<p><strong>Experience:</strong> ${esc(d.experience_years)}</p>` : ""}
      ${d.linkedin ? `<p><strong>LinkedIn:</strong> ${esc(d.linkedin)}</p>` : ""}
      ${d.portfolio ? `<p><strong>Portfolio:</strong> ${esc(d.portfolio)}</p>` : ""}
      ${d.cv_url ? `<p><strong>CV:</strong> <a href="${esc(d.cv_url)}">${esc(d.cv_filename || "Download")}</a></p>` : ""}
      <p><strong>Cover letter:</strong></p>
      <div style="white-space: pre-wrap; padding: 12px; border: 1px solid #eee; border-radius: 8px;">${esc(d.cover_letter)}</div>
    </div>
  `;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
