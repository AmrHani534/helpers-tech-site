/**
 * Repository layer.
 * If Supabase is configured, reads live data from Postgres.
 * Otherwise falls back to the static seed data so the site renders
 * fully even before the DB is wired up.
 */

import { getSupabasePublic } from "./supabase/server";
import { projects as seedProjects, type Project } from "./data/projects";
import { teamMembers as seedTeam, type TeamMember } from "./data/team";
import {
  testimonials as seedTestimonials,
  type Testimonial,
} from "./data/testimonials";
import { faqs as seedFaqs, type Faq } from "./data/faqs";

type Row = Record<string, unknown>;

function safeString(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}
function safeBool(v: unknown, fallback = false): boolean {
  return typeof v === "boolean" ? v : fallback;
}
function safeNum(v: unknown, fallback = 0): number {
  return typeof v === "number" ? v : fallback;
}
function safeStringArr(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}

function rowToProject(row: Row, images: Row[] = []): Project {
  const slug = safeString(row.slug);
  // Fallback to seed-file _ar fields when DB has no localized columns populated yet.
  const seed = seedProjects.find((p) => p.slug === slug);

  const testimonialQuote = safeString(row.testimonial_quote);
  const testimonial = testimonialQuote
    ? {
        quote: testimonialQuote,
        quote_ar:
          safeString(row.testimonial_quote_ar) ||
          seed?.testimonial?.quote_ar ||
          undefined,
        author: safeString(row.testimonial_author),
        author_ar:
          safeString(row.testimonial_author_ar) ||
          seed?.testimonial?.author_ar ||
          undefined,
        role: safeString(row.testimonial_role),
        role_ar:
          safeString(row.testimonial_role_ar) ||
          seed?.testimonial?.role_ar ||
          undefined,
      }
    : undefined;

  const dbResultsAr = safeStringArr(row.results_ar);

  return {
    slug,
    title: safeString(row.title),
    title_ar: safeString(row.title_ar) || undefined,
    category: safeString(row.category),
    industry: safeString(row.industry),
    year: safeString(row.year) || new Date().getFullYear().toString(),
    summary: safeString(row.summary),
    summary_ar: safeString(row.summary_ar) || undefined,
    challenge: safeString(row.challenge),
    challenge_ar: safeString(row.challenge_ar) || seed?.challenge_ar || undefined,
    solution: safeString(row.solution),
    solution_ar: safeString(row.solution_ar) || seed?.solution_ar || undefined,
    results: safeStringArr(row.results),
    results_ar: dbResultsAr.length ? dbResultsAr : seed?.results_ar,
    testimonial,
    techStack: safeStringArr(row.tech_stack),
    coverImage: safeString(row.cover_image, "/images/placeholder-project.svg"),
    gallery: images.map((img) => ({
      url: safeString(img.url),
      alt: safeString(img.alt),
    })),
    featured: safeBool(row.featured),
    published: safeBool(row.published, true),
    orderIndex: safeNum(row.order_index),
    liveUrl: safeString(row.live_url) || undefined,
  };
}

export async function getProjects({ featuredOnly = false } = {}): Promise<Project[]> {
  const supabase = await getSupabasePublic();
  if (!supabase) {
    const list = seedProjects.filter((p) => p.published && (!featuredOnly || p.featured));
    return [...list].sort((a, b) => a.orderIndex - b.orderIndex);
  }

  const query = supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("order_index", { ascending: true });

  const { data, error } = featuredOnly ? await query.eq("featured", true) : await query;
  if (error || !data) return seedProjects;

  const { data: images } = await supabase.from("project_images").select("*");
  const imagesByProject = new Map<string, Row[]>();
  (images ?? []).forEach((img: Row) => {
    const id = safeString(img.project_id);
    if (!imagesByProject.has(id)) imagesByProject.set(id, []);
    imagesByProject.get(id)!.push(img);
  });

  return (data as Row[]).map((row) =>
    rowToProject(row, imagesByProject.get(safeString(row.id)) ?? []),
  );
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await getSupabasePublic();
  if (!supabase) {
    return seedProjects.find((p) => p.slug === slug && p.published) ?? null;
  }
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error || !data) return seedProjects.find((p) => p.slug === slug) ?? null;
  const { data: images } = await supabase
    .from("project_images")
    .select("*")
    .eq("project_id", (data as Row).id as string)
    .order("order_index");
  return rowToProject(data as Row, (images as Row[]) ?? []);
}

export async function getTeam(): Promise<TeamMember[]> {
  const supabase = await getSupabasePublic();
  if (!supabase) return [...seedTeam].sort((a, b) => a.orderIndex - b.orderIndex);
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("order_index");
  if (error || !data) return seedTeam;
  return (data as Row[]).map((r) => ({
    slug: safeString(r.slug),
    name: safeString(r.name),
    name_ar: safeString(r.name_ar) || undefined,
    role: safeString(r.role),
    role_ar: safeString(r.role_ar) || undefined,
    bio: safeString(r.bio),
    bio_ar: safeString(r.bio_ar) || undefined,
    photo: safeString(r.photo, "/images/placeholder-avatar.svg"),
    featured: safeBool(r.featured),
    orderIndex: safeNum(r.order_index),
    placeholder: safeBool(r.placeholder),
    socials: (r.socials as TeamMember["socials"]) ?? undefined,
  }));
}

export async function getTestimonials({ featuredOnly = false } = {}): Promise<Testimonial[]> {
  const supabase = await getSupabasePublic();
  if (!supabase) {
    const list = featuredOnly ? seedTestimonials.filter((t) => t.featured) : seedTestimonials;
    return [...list].sort((a, b) => a.orderIndex - b.orderIndex);
  }
  const q = supabase.from("testimonials").select("*").order("order_index");
  const { data, error } = featuredOnly ? await q.eq("featured", true) : await q;
  if (error || !data) return seedTestimonials;
  return (data as Row[]).map((r) => ({
    id: safeString(r.id),
    quote: safeString(r.quote),
    quote_ar: safeString(r.quote_ar) || undefined,
    author: safeString(r.author),
    author_ar: safeString(r.author_ar) || undefined,
    role: safeString(r.role),
    role_ar: safeString(r.role_ar) || undefined,
    company: safeString(r.company) || undefined,
    avatar: safeString(r.avatar) || undefined,
    rating: safeNum(r.rating, 5),
    featured: safeBool(r.featured),
    orderIndex: safeNum(r.order_index),
  }));
}

export async function getFaqs(): Promise<Faq[]> {
  const supabase = await getSupabasePublic();
  if (!supabase) return seedFaqs.filter((f) => f.published);
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("published", true)
    .order("order_index");
  if (error || !data) return seedFaqs;
  return (data as Row[]).map((r) => ({
    id: safeString(r.id),
    question: safeString(r.question),
    question_ar: safeString(r.question_ar) || undefined,
    answer: safeString(r.answer),
    answer_ar: safeString(r.answer_ar) || undefined,
    category: safeString(r.category) || undefined,
    orderIndex: safeNum(r.order_index),
    published: safeBool(r.published, true),
  }));
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  const supabase = await getSupabasePublic();
  if (!supabase) return {};
  const { data, error } = await supabase.from("site_settings").select("key, value");
  if (error || !data) return {};
  return Object.fromEntries(
    (data as Row[]).map((r) => [safeString(r.key), safeString(r.value)]),
  );
}
