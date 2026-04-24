alter table public.faqs
  add column if not exists category_ar text;

update public.faqs
set category_ar = case category
  when 'Process' then 'المنهجية'
  when 'Pricing' then 'الأسعار'
  when 'Timeline' then 'الجداول الزمنية'
  when 'Ownership' then 'الملكية'
  when 'Capabilities' then 'القدرات'
  when 'Support' then 'الدعم'
  when 'General' then 'عام'
  else category_ar
end
where category_ar is null or category_ar = '';
