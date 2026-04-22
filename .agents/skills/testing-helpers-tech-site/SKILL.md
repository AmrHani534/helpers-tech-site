# Testing the Helpers Technologies site

Next.js 15 App Router + Supabase (Postgres + Auth + Storage). Public site + bilingual EN/AR + admin CMS at `/admin`.

## Run locally
```bash
cd /home/ubuntu/repos/helpers-tech-site
cp .env.example .env.local  # fill in Supabase vars (see Devin Secrets below)
npm install
npm run dev  # http://localhost:3000
```

If Supabase is wired and seeded, use the existing data. If not, run the seed script: `npm run seed` (populates projects, team, testimonials, FAQs).

## Devin Secrets Needed
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL (looks like `https://<ref>.supabase.co`, NOT the `/dashboard/project/...` URL)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon JWT
- `SUPABASE_SERVICE_ROLE_KEY` — service-role JWT (needed for seeding, admin-table introspection, test cleanup)
- `ADMIN_EMAILS` — comma-separated admin sign-in allowlist
- (Optional) the password for the admin user for UI login testing — request it separately; the user creates the auth user in Supabase → Authentication → Users.

## Supabase migrations
They live in `supabase/migrations/`. New migrations (e.g. `0002_careers.sql`) are NOT auto-applied — ask the user to paste the SQL into Supabase SQL Editor. To verify a table is reachable, probe with the service-role client:

```js
const sb = createClient(url, serviceRoleKey);
const { error } = await sb.from('<table>').select('id').limit(1);
// PGRST205 "Could not find the table" → migration not run yet or PostgREST cache stale
```

If the table exists in Table Editor but PostgREST still says missing, run `NOTIFY pgrst, 'reload schema';` in SQL Editor.

## Where features live
- i18n strings: `src/lib/i18n.ts` (one `getDict(locale)` with EN + AR)
- Services data + feature pills: `src/lib/data/services.ts`
- Why-Us cards (shared across home + services): `src/lib/data/differentiators.ts`
- Careers form: `src/components/careers/application-form.tsx`
- Careers API: `src/app/api/careers/route.ts` (uploads to `public` bucket under `careers/…`, inserts into `career_applications`)
- Admin layout (no public chrome): `src/app/admin/(protected)/layout.tsx` — suppresses public navbar/footer/WhatsApp/chat by branching `isAdmin` on `x-pathname` in `src/app/layout.tsx`. Middleware that forwards `x-pathname` lives at `src/middleware.ts` (MUST be inside `src/` in Next.js 15, not repo root).
- Featured projects overlay (home): `src/components/home/featured-projects.tsx`
- Projects listing: `src/app/projects/page.tsx`
- Team grid: `src/app/team/page.tsx`

## Careers end-to-end test recipe
1. Generate a real PDF once: `/home/ubuntu/test-artifacts/devin-test-cv.pdf` via `reportlab` (ImageMagick PDF output is blocked by policy on our VM).
2. Fill the form — textual fields via computer-use or `document.querySelector('[name="…"]').value = …` + `dispatchEvent('input')`.
3. **File upload via Playwright over CDP** — the browser file picker can't be driven by computer-use, so:
   ```js
   import { chromium } from 'playwright';
   const br = await chromium.connectOverCDP('http://localhost:29229');
   const page = br.contexts()[0].pages().find(p => p.url().includes('/careers'));
   await page.setInputFiles('input[name=cv]', '/home/ubuntu/test-artifacts/devin-test-cv.pdf');
   ```
   `playwright` isn't in the site's `node_modules` — install it in `/home/ubuntu/pw-tmp` (or similar) once per machine.
4. Click **Submit application** via computer-use. Success panel `<h3>` must read exactly `Application received.` (not "Thanks!"). Button transitions `Submit application` → `Sending…` → gone.
5. Verify with the service-role client: select from `career_applications` by email; `cv_url` must start with `https://<ref>.supabase.co/storage/v1/object/public/public/careers/`; `curl -I` on `cv_url` must return `200 application/pdf`.
6. **Cleanup (always)** — delete the DB row and the storage object:
   ```js
   await sb.storage.from('public').remove([`careers/${filename}`]);
   await sb.from('career_applications').delete().eq('email', email);
   ```

## Admin chrome regression check (cheap)
Just `curl http://localhost:3000/admin/login` and grep the HTML:
- Should NOT contain `aria-label="Chat on WhatsApp"` or `aria-label="Helpers Technologies"` (public-site logo).
- `curl http://localhost:3000/` should contain both.

## Common gotchas
- Typing into the Chrome address bar via computer-use is flaky — `key Return` sometimes doesn't register. Preferred: `chromium.connectOverCDP('http://localhost:29229')` then `page.goto(url)`.
- React 19 + Dashlane/1Password extensions inject `__processed_<uuid>__` on inputs. The root layout at `src/app/layout.tsx` uses `suppressHydrationWarning` narrowly on `<html>` and `<body>` only (documented escape hatch). Don't widen it.
- `getSupabaseServer()` calls `cookies()` and will throw outside a request scope (e.g. in `generateStaticParams`). Use `getSupabasePublic()` (cookie-less anon client) for public read queries from `generateStaticParams` / seeding.
- Do NOT commit `test-plan.md`, `test-report.md`, or recordings to the PR branch.
