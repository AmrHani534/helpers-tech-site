# Helpers Technologies — Website

Production-grade marketing site for [Helpers Technologies](https://helpers-tech.com), built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion and Supabase.

- Premium dark theme, mobile-first, server-rendered
- Bilingual ready (English + Arabic, RTL), switchable from the navbar
- Full case-study system (list, detail, featured) powered by Supabase
- Admin dashboard at `/admin` with CRUD for projects, team, testimonials, FAQs, contact messages, and site settings
- Contact form persists to Supabase and can email you via Resend
- Optional floating AI assistant (Google Gemini) that degrades gracefully if no key is present

## 1. Local setup

```bash
# 1. Install dependencies
npm install   # or: pnpm install / yarn

# 2. Environment
cp .env.example .env.local
# Fill in the NEXT_PUBLIC_SUPABASE_* and SUPABASE_SERVICE_ROLE_KEY values.
# Leave RESEND_API_KEY / GOOGLE_GENERATIVE_AI_API_KEY blank if you don't need
# email notifications or the AI chat widget — the site works without them.

# 3. Start the dev server
npm run dev
# open http://localhost:3000
```

The public site will render from the built-in seed data **even without a Supabase connection** — every page degrades gracefully. Admin, contact submissions and the CMS workflow require Supabase.

## 2. Connecting Supabase

1. Create a new project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste the contents of `supabase/migrations/0001_init.sql`, and run it. This creates every table, index, RLS policy, and the public storage bucket used for image uploads.
3. In **Project Settings → API**, copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (**server-only — never expose**)
4. Paste these into `.env.local`.
5. Run the seed:
   ```bash
   npm run seed
   ```
   This uploads the current Helpers content (3 projects, 4 team members, testimonials, FAQs). Re-run any time — it upserts by slug.

## 3. Admin access

1. In Supabase **Authentication → Users → Add user**, create a user with the email you want to use for admin (e.g. `info@helpers-tech.com`). Either set a password or send a magic link.
2. Add that email (comma-separated if multiple) to `ADMIN_EMAILS` in `.env.local`.
3. Visit `/admin/login` and sign in. You'll land on the dashboard at `/admin`.

> **Security note:** the service-role key is only read by server actions. The public site only ever uses the anon key. Admin operations are gated by `isAdmin()` which checks the logged-in email against `ADMIN_EMAILS`.

## 4. Uploading a new project (non-technical workflow)

1. Sign in at `/admin/login`.
2. Click **Projects → New project**.
3. Fill in the title, category, industry, year.
4. Upload a cover image (drag & drop or click Upload — stored in the Supabase `public` bucket).
5. Fill in summary, challenge, solution, results (one per line), tech stack (one per line).
6. Optionally add a testimonial for the project.
7. Toggle **Published** on. Toggle **Featured** to show it on the homepage.
8. Click **Create project**. It appears on `/projects` and `/projects/<slug>` immediately.

Reorder projects by changing `Order index` on each one (lower numbers appear first).

## 5. Managing team members

Team is fully managed from `/admin/team`:

- **Add a member** → fills the card on `/team`. Toggle **Featured** to also show them on the homepage preview.
- **Edit a member** → click their row.
- **Replace placeholders** → Ahmed Reda and Ahmed Eid ship as placeholder cards. Open each in the admin, upload a real photo, set their correct title, write their bio, uncheck **Show as placeholder**, save. The placeholder badge disappears.
- **Reorder** → change `Order index`.

## 6. Site settings, testimonials, FAQs, messages

- `/admin/site-settings` — global key/value overrides (hero copy, contact info, socials).
- `/admin/testimonials` — add/remove social proof.
- `/admin/faqs` — manage the FAQ page and homepage preview.
- `/admin/messages` — incoming contact-form submissions. Reply via email or WhatsApp with one click, mark as read or delete.

## 7. Bilingual (EN / AR)

Every page has an EN/AR toggle in the navbar. The site supports RTL layouts automatically when Arabic is active. Every database table has matching `_ar` columns, so you can fill in Arabic translations from the admin and they appear automatically when users switch locale.

The locale is stored in the `helpers_locale` cookie. The server reads it on every request and sets `<html lang dir>` accordingly.

## 8. Optional: Email notifications

Add to `.env.local`:
```
RESEND_API_KEY=re_...
CONTACT_NOTIFICATION_TO=info@helpers-tech.com
CONTACT_NOTIFICATION_FROM="Helpers Technologies <noreply@helpers-tech.com>"
```
Contact-form submissions will email you in addition to being stored in Supabase.

## 9. Optional: Floating AI assistant

Set `GOOGLE_GENERATIVE_AI_API_KEY` (Gemini key) to enable the floating chat widget. Without the key, the widget is hidden — the site never breaks.

## 10. Deploying to Hostinger

Hostinger supports Next.js on its managed Node.js Apps product. For this repo, the smoothest path is:

1. Push this repo to GitHub.
2. In Hostinger hPanel, go to `Websites -> Add Website -> Node.js Apps -> Import Git Repository`.
3. Select this repository and the branch you want to deploy.
4. Use Node.js `20.x`. This repo declares it in `package.json` via `engines.node`, which helps Hostinger auto-detect the correct version.
5. Confirm the detected commands:
   Build command: `npm run build`
   Start command: `npm run start`
6. Add your environment variables before deploying:
   Required: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAILS`
   Optional: `RESEND_API_KEY`, `CONTACT_NOTIFICATION_TO`, `CONTACT_NOTIFICATION_FROM`, `GOOGLE_GENERATIVE_AI_API_KEY`
7. Deploy, test the temporary Hostinger URL, then connect your custom domain.

Set `NEXT_PUBLIC_SITE_URL` to your final Hostinger domain so metadata, canonical URLs, and the sitemap point to the right origin.

If you prefer ZIP upload instead of GitHub, upload the project files without `node_modules` and let Hostinger build the app on the server.

## 11. Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Set the env vars from your `.env.local` (Supabase URL, anon key, service-role key, admin emails — plus Resend / Gemini if you use them).
4. Deploy. Subsequent pushes to `main` (or your production branch) redeploy automatically.

Set your custom domain in **Vercel → Project → Domains** and update `NEXT_PUBLIC_SITE_URL` so metadata and sitemap point to the right origin.

## 12. Scripts

| Command            | Purpose                                 |
|--------------------|-----------------------------------------|
| `npm run dev`      | Start the local dev server              |
| `npm run build`    | Production build                        |
| `npm run start`    | Start the production server             |
| `npm run lint`     | ESLint                                  |
| `npm run typecheck`| TypeScript strict check                 |
| `npm run seed`     | Seed Supabase with Helpers content      |

## 13. Tech

- Next.js 15 (App Router, Server Components, server actions)
- TypeScript strict mode
- Tailwind CSS + a small custom design system (`globals.css`)
- Framer Motion for tasteful motion
- Supabase (Postgres + Auth + Storage)
- Zod for server-side validation
- Lucide for icons

## 14. Placeholders to replace

When you're ready, replace:

1. **Ahmed Reda** and **Ahmed Eid** — placeholder cards on `/team`. Replace photo + title + bio from `/admin/team` (see §5 above).
2. Any client logo beyond the current three projects — add them via `/admin/projects/new`.

Everything else is powered by real content or real Helpers data.

---

Crafted in Giza. Shipped worldwide.
