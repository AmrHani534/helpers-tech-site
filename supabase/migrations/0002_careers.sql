-- =====================================================================
-- Helpers Technologies — careers table
-- Adds career_applications for the /careers apply flow.
-- Run this in the Supabase SQL editor after 0001_init.sql.
-- =====================================================================

create table if not exists public.career_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  location text,
  role text not null default '',
  experience_years text,
  linkedin text,
  portfolio text,
  cover_letter text not null default '',
  cv_url text,
  cv_filename text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists career_applications_created_idx
  on public.career_applications(created_at desc);

alter table public.career_applications enable row level security;

-- Anonymous visitors can POST applications via the server's service-role
-- key (which bypasses RLS). No anon select/insert policy needed — admin UI
-- reads via service-role too.
