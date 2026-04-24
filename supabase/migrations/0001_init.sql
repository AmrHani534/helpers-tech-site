-- =====================================================================
-- Helpers Technologies — initial schema
-- Run this in the Supabase SQL editor (or `supabase db push`) after
-- creating a new project.
-- =====================================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- --------------------------------------------------------------------
-- Projects
-- --------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_ar text,
  slug text not null unique,
  category text not null default '',
  industry text not null default '',
  year text not null default to_char(now(), 'YYYY'),
  summary text not null default '',
  summary_ar text,
  challenge text not null default '',
  solution text not null default '',
  results text[] not null default '{}',
  tech_stack text[] not null default '{}',
  cover_image text,
  live_url text,
  testimonial_quote text,
  testimonial_author text,
  testimonial_role text,
  featured boolean not null default false,
  published boolean not null default true,
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists projects_published_idx on public.projects(published);
create index if not exists projects_order_idx on public.projects(order_index);

-- --------------------------------------------------------------------
-- Project gallery images
-- --------------------------------------------------------------------
create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  url text not null,
  alt text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists project_images_project_idx on public.project_images(project_id);

-- --------------------------------------------------------------------
-- Team members
-- --------------------------------------------------------------------
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_ar text,
  slug text not null unique,
  role text not null default '',
  role_ar text,
  bio text not null default '',
  bio_ar text,
  photo text,
  socials jsonb not null default '{}'::jsonb,
  featured boolean not null default false,
  placeholder boolean not null default false,
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- --------------------------------------------------------------------
-- Testimonials
-- --------------------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  quote_ar text,
  author text not null,
  role text,
  company text,
  avatar text,
  rating int not null default 5 check (rating between 1 and 5),
  featured boolean not null default false,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- --------------------------------------------------------------------
-- FAQs
-- --------------------------------------------------------------------
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  question_ar text,
  answer text not null,
  answer_ar text,
  category text,
  category_ar text,
  order_index int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- --------------------------------------------------------------------
-- Site settings (key/value)
-- --------------------------------------------------------------------
create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

-- --------------------------------------------------------------------
-- Contact messages
-- --------------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  whatsapp text,
  company text,
  project_type text,
  budget text,
  timeline text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
create index if not exists contact_messages_created_idx on public.contact_messages(created_at desc);

-- =====================================================================
-- Row-level security
-- =====================================================================
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.team_members enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.site_settings enable row level security;
alter table public.contact_messages enable row level security;

-- Public (anon) can read published content
drop policy if exists "public read projects" on public.projects;
create policy "public read projects" on public.projects
  for select to anon, authenticated using (published = true);

drop policy if exists "public read project_images" on public.project_images;
create policy "public read project_images" on public.project_images
  for select to anon, authenticated using (true);

drop policy if exists "public read team" on public.team_members;
create policy "public read team" on public.team_members
  for select to anon, authenticated using (true);

drop policy if exists "public read testimonials" on public.testimonials;
create policy "public read testimonials" on public.testimonials
  for select to anon, authenticated using (true);

drop policy if exists "public read faqs" on public.faqs;
create policy "public read faqs" on public.faqs
  for select to anon, authenticated using (published = true);

drop policy if exists "public read site_settings" on public.site_settings;
create policy "public read site_settings" on public.site_settings
  for select to anon, authenticated using (true);

-- Writes are performed by the server using the service_role key, which
-- bypasses RLS automatically. No policies needed for writes.

-- Storage bucket for admin uploads (cover images, team photos, etc.)
insert into storage.buckets (id, name, public)
values ('public', 'public', true)
on conflict (id) do nothing;

-- Allow anyone to read files in the public bucket; writes go through
-- the service-role from our server actions.
drop policy if exists "public read public bucket" on storage.objects;
create policy "public read public bucket" on storage.objects
  for select using (bucket_id = 'public');

drop policy if exists "authenticated upload public bucket" on storage.objects;
create policy "authenticated upload public bucket" on storage.objects
  for insert to authenticated with check (bucket_id = 'public');

drop policy if exists "authenticated update public bucket" on storage.objects;
create policy "authenticated update public bucket" on storage.objects
  for update to authenticated using (bucket_id = 'public');

drop policy if exists "authenticated delete public bucket" on storage.objects;
create policy "authenticated delete public bucket" on storage.objects
  for delete to authenticated using (bucket_id = 'public');
