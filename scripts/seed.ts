/**
 * Seed the Supabase database with the initial Helpers Technologies content.
 *
 * Usage:
 *   cp .env.example .env.local
 *   # fill in NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 *   pnpm seed         # or: npm run seed / yarn seed
 */

import { createClient } from "@supabase/supabase-js";
import { projects } from "../src/lib/data/projects";
import { teamMembers } from "../src/lib/data/team";
import { testimonials } from "../src/lib/data/testimonials";
import { faqs } from "../src/lib/data/faqs";

function loadEnv(): void {
  // Minimal .env.local loader so we don't force the user to install dotenv.
  try {
    const fs = require("node:fs") as typeof import("node:fs");
    const path = require("node:path") as typeof import("node:path");
    for (const file of [".env.local", ".env"]) {
      const p = path.resolve(process.cwd(), file);
      if (!fs.existsSync(p)) continue;
      const content = fs.readFileSync(p, "utf8");
      for (const line of content.split(/\r?\n/)) {
        const match = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/);
        if (!match) continue;
        const [, key, rawValue] = match;
        if (process.env[key]) continue;
        const value = rawValue.replace(/^['"]|['"]$/g, "");
        process.env[key] = value;
      }
    }
  } catch {
    /* ignore */
  }
}

async function main() {
  loadEnv();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error(
      "❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add them to .env.local first.",
    );
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  console.log("→ Seeding projects…");
  for (const p of projects) {
    const { error } = await supabase.from("projects").upsert(
      {
        title: p.title,
        title_ar: p.title_ar ?? null,
        slug: p.slug,
        category: p.category,
        industry: p.industry,
        year: p.year,
        summary: p.summary,
        summary_ar: p.summary_ar ?? null,
        challenge: p.challenge,
        solution: p.solution,
        results: p.results,
        tech_stack: p.techStack,
        cover_image: p.coverImage,
        live_url: p.liveUrl ?? null,
        testimonial_quote: p.testimonial?.quote ?? null,
        testimonial_author: p.testimonial?.author ?? null,
        testimonial_role: p.testimonial?.role ?? null,
        featured: p.featured,
        published: p.published,
        order_index: p.orderIndex,
      },
      { onConflict: "slug" },
    );
    if (error) console.error("  project", p.slug, "→", error.message);
    else console.log("  ✓", p.slug);
  }

  console.log("→ Seeding team members…");
  for (const m of teamMembers) {
    const { error } = await supabase.from("team_members").upsert(
      {
        name: m.name,
        name_ar: m.name_ar ?? null,
        slug: m.slug,
        role: m.role,
        role_ar: m.role_ar ?? null,
        bio: m.bio,
        bio_ar: m.bio_ar ?? null,
        photo: m.photo,
        socials: m.socials ?? {},
        featured: m.featured,
        placeholder: m.placeholder ?? false,
        order_index: m.orderIndex,
      },
      { onConflict: "slug" },
    );
    if (error) console.error("  team", m.slug, "→", error.message);
    else console.log("  ✓", m.slug);
  }

  console.log("→ Seeding testimonials…");
  for (const t of testimonials) {
    const { error } = await supabase.from("testimonials").insert({
      quote: t.quote,
      quote_ar: t.quote_ar ?? null,
      author: t.author,
      role: t.role ?? null,
      company: t.company ?? null,
      avatar: t.avatar ?? null,
      rating: t.rating ?? 5,
      featured: t.featured,
      order_index: t.orderIndex,
    });
    if (error && !`${error.message}`.includes("duplicate"))
      console.error("  testimonial", t.id, "→", error.message);
    else console.log("  ✓", t.id);
  }

  console.log("→ Seeding FAQs…");
  for (const f of faqs) {
    const { error } = await supabase.from("faqs").insert({
      question: f.question,
      question_ar: f.question_ar ?? null,
      answer: f.answer,
      answer_ar: f.answer_ar ?? null,
      category: f.category ?? null,
      order_index: f.orderIndex,
      published: f.published,
    });
    if (error && !`${error.message}`.includes("duplicate"))
      console.error("  faq", f.id, "→", error.message);
    else console.log("  ✓", f.id);
  }

  console.log("\n✅ Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
