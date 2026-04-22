-- Add Arabic author/role fields to testimonials so the public site can render
-- natural Arabic attributions without falling back to English.
alter table public.testimonials
  add column if not exists author_ar text,
  add column if not exists role_ar text;
