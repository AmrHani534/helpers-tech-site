"use server";

import { revalidatePath } from "next/cache";
import { redirect, isRedirectError } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";

async function guarded(): Promise<SupabaseClient> {
  if (!(await isAdmin())) throw new Error("Not authorized");
  const supabase = await getSupabaseAdmin();
  if (!supabase) {
    throw new Error(
      "Admin write access is not configured. Add SUPABASE_SERVICE_ROLE_KEY to the server environment.",
    );
  }
  return supabase;
}

function stringsArray(input: FormDataEntryValue | null): string[] {
  if (typeof input !== "string") return [];
  return input
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function bool(fd: FormData, key: string): boolean {
  return fd.get(key) === "on" || fd.get(key) === "true";
}

function str(fd: FormData, key: string, fallback = ""): string {
  const v = fd.get(key);
  return typeof v === "string" ? v : fallback;
}

function num(fd: FormData, key: string, fallback = 0): number {
  const v = fd.get(key);
  if (typeof v !== "string" || !v) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

// -------- Projects --------

export async function saveProject(formData: FormData) {
  const supabase = await guarded();
  const id = str(formData, "id") || null;
  const title = str(formData, "title").trim();
  const slug = (str(formData, "slug") || slugify(title)).trim();

  const payload = {
    title,
    slug,
    title_ar: str(formData, "title_ar") || null,
    category: str(formData, "category"),
    industry: str(formData, "industry"),
    year: str(formData, "year", String(new Date().getFullYear())),
    summary: str(formData, "summary"),
    summary_ar: str(formData, "summary_ar") || null,
    challenge: str(formData, "challenge"),
    solution: str(formData, "solution"),
    results: stringsArray(formData.get("results")),
    tech_stack: stringsArray(formData.get("tech_stack")),
    cover_image: str(formData, "cover_image") || null,
    live_url: str(formData, "live_url") || null,
    testimonial_quote: str(formData, "testimonial_quote") || null,
    testimonial_author: str(formData, "testimonial_author") || null,
    testimonial_role: str(formData, "testimonial_role") || null,
    featured: bool(formData, "featured"),
    published: bool(formData, "published"),
    order_index: num(formData, "order_index"),
  };

  if (id) {
    const { error } = await supabase.from("projects").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("projects").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const supabase = await guarded();
  const id = str(formData, "id");
  if (!id) return;
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  revalidatePath("/");
}

// -------- Team --------

export async function saveTeam(formData: FormData) {
  const supabase = await guarded();
  const id = str(formData, "id") || null;
  const name = str(formData, "name").trim();
  const slug = (str(formData, "slug") || slugify(name)).trim();

  const payload = {
    name,
    slug,
    name_ar: str(formData, "name_ar") || null,
    role: str(formData, "role"),
    role_ar: str(formData, "role_ar") || null,
    bio: str(formData, "bio"),
    bio_ar: str(formData, "bio_ar") || null,
    photo: str(formData, "photo") || null,
    featured: bool(formData, "featured"),
    placeholder: bool(formData, "placeholder"),
    order_index: num(formData, "order_index"),
    socials: {
      linkedin: str(formData, "linkedin") || undefined,
      email: str(formData, "email") || undefined,
    },
  };

  if (id) {
    const { error } = await supabase.from("team_members").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("team_members").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/team");
  revalidatePath("/");
  revalidatePath("/admin/team");
  redirect("/admin/team");
}

export async function deleteTeam(formData: FormData) {
  const supabase = await guarded();
  const id = str(formData, "id");
  if (!id) return;
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/team");
  revalidatePath("/admin/team");
  revalidatePath("/");
}

// -------- Testimonials --------

export async function saveTestimonial(formData: FormData) {
  const supabase = await guarded();
  const id = str(formData, "id") || null;
  const payload = {
    quote: str(formData, "quote"),
    quote_ar: str(formData, "quote_ar") || null,
    author: str(formData, "author"),
    role: str(formData, "role") || null,
    company: str(formData, "company") || null,
    avatar: str(formData, "avatar") || null,
    rating: num(formData, "rating", 5),
    featured: bool(formData, "featured"),
    order_index: num(formData, "order_index"),
  };
  if (id) {
    const { error } = await supabase.from("testimonials").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("testimonials").insert(payload);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  const supabase = await guarded();
  const id = str(formData, "id");
  if (!id) return;
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

// -------- FAQs --------

export async function saveFaq(formData: FormData) {
  const supabase = await guarded();
  const id = str(formData, "id") || null;
  const payload = {
    question: str(formData, "question"),
    question_ar: str(formData, "question_ar") || null,
    answer: str(formData, "answer"),
    answer_ar: str(formData, "answer_ar") || null,
    category: str(formData, "category") || null,
    category_ar: str(formData, "category_ar") || null,
    order_index: num(formData, "order_index"),
    published: bool(formData, "published"),
  };
  if (id) {
    const { error } = await supabase.from("faqs").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("faqs").insert(payload);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/faq");
  revalidatePath("/");
  revalidatePath("/admin/faqs");
  redirect("/admin/faqs");
}

export async function deleteFaq(formData: FormData) {
  const supabase = await guarded();
  const id = str(formData, "id");
  if (!id) return;
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/faq");
  revalidatePath("/admin/faqs");
}

export async function seedFaqsAction() {
  const supabase = await guarded();
  const { faqs } = await import("@/lib/data/faqs");

  const rows = faqs.map((f) => ({
    question: f.question,
    question_ar: f.question_ar ?? null,
    answer: f.answer,
    answer_ar: f.answer_ar ?? null,
    category: f.category ?? null,
    category_ar: f.category_ar ?? null,
    order_index: f.orderIndex,
    published: f.published,
  }));

  const { error } = await supabase.from("faqs").insert(rows);
  if (error) throw new Error(error.message);

  revalidatePath("/faq");
  revalidatePath("/");
  revalidatePath("/admin/faqs");
}

// -------- Site settings --------

export async function saveSiteSettings(formData: FormData) {
  try {
    const supabase = await guarded();
    const entries = Array.from(formData.entries()).filter(([k]) => k.startsWith("s:"));
    const rows = entries.map(([k, v]) => ({
      key: k.slice(2),
      value: typeof v === "string" ? v : "",
    }));
    if (rows.length === 0) return;
    const { error } = await supabase.from("site_settings").upsert(rows, {
      onConflict: "key",
    });
    if (error) throw new Error(error.message);
    revalidatePath("/");
    revalidatePath("/contact");
    revalidatePath("/admin/site-settings");
    redirect("/admin/site-settings?saved=1");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("saveSiteSettings error:", msg);
    redirect(`/admin/site-settings?error=${encodeURIComponent(msg)}`);
  }
}

// -------- Messages --------

export async function markMessageRead(formData: FormData) {
  const supabase = await guarded();
  const id = str(formData, "id");
  if (!id) return;
  const { error } = await supabase
    .from("contact_messages")
    .update({ status: "read" })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  const supabase = await guarded();
  const id = str(formData, "id");
  if (!id) return;
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
}
