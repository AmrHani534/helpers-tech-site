import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/site/section";
import { getTestimonials } from "@/lib/repo";
import { getDict, type Locale } from "@/lib/i18n";

export async function Testimonials({ locale }: { locale: Locale }) {
  const testimonials = await getTestimonials({ featuredOnly: true });
  const t = getDict(locale).sections;
  const isAr = locale === "ar";

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-transparent via-ink-900/40 to-transparent">
      <div className="container-app">
        <SectionHeading
          eyebrow={t.testimonials}
          title={t.testimonialsHeading}
          description={t.testimonialsDescription}
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((item) => (
            <figure
              key={item.id}
              className="relative surface p-6"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-brand-500/20 rtl:right-auto rtl:left-5" />
              <div className="flex items-center gap-1 text-amber-300">
                {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-[15px] leading-relaxed text-slate-200">
                “{isAr && item.quote_ar ? item.quote_ar : item.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-600 text-sm font-semibold text-white">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">
                    {isAr && item.author_ar ? item.author_ar : item.author}
                  </div>
                  <div className="text-xs text-slate-500">
                    {isAr && item.role_ar ? item.role_ar : item.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
