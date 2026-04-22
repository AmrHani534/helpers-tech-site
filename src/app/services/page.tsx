import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { services } from "@/lib/data/services";
import { getLocale } from "@/lib/locale";
import { FinalCta } from "@/components/home/final-cta";
import { ProcessSection } from "@/components/home/process";
import { Differentiators } from "@/components/home/differentiators";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom web development, mobile apps, AI automation, and digital growth strategy — from a team that treats your business like its own.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Every capability you need to ship{" "}
            <span className="text-gradient">revenue-ready</span> products.
          </>
        }
        description="Four deeply-practiced capabilities, fused into one team. Choose one, or stack them for an end-to-end growth engine."
      />

      <section className="pb-16 md:pb-24">
        <div className="container-app space-y-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <article
                key={service.slug}
                className="surface grid gap-8 p-8 md:grid-cols-12 md:p-10"
              >
                <div className="md:col-span-5 space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="heading-md text-white">
                    {isAr ? service.title_ar : service.title}
                  </h2>
                  <p className="text-sm text-brand-300/90">
                    {isAr ? service.tagline_ar : service.tagline}
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    {isAr ? service.description_ar : service.description}
                  </p>
                  <Link href="/contact" className="btn-secondary w-fit">
                    Discuss a {service.title.toLowerCase()} project
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </div>
                <div className="md:col-span-7">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {service.deliverables.map((d) => (
                      <div
                        key={d}
                        className="rounded-xl border border-white/10 bg-ink-900/50 px-4 py-3 text-sm text-slate-200"
                      >
                        <span className="mr-2 text-brand-300">0{i + 1}.</span>
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                    <div className="surface p-4">
                      <div className="font-display text-xl text-white">1–6 wk</div>
                      <div className="mt-0.5 text-[11px] uppercase tracking-wider text-slate-500">
                        Typical delivery
                      </div>
                    </div>
                    <div className="surface p-4">
                      <div className="font-display text-xl text-white">Fixed</div>
                      <div className="mt-0.5 text-[11px] uppercase tracking-wider text-slate-500">
                        Flat pricing
                      </div>
                    </div>
                    <div className="surface p-4">
                      <div className="font-display text-xl text-white">100%</div>
                      <div className="mt-0.5 text-[11px] uppercase tracking-wider text-slate-500">
                        Code ownership
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Differentiators locale={locale} />
      <ProcessSection locale={locale} />
      <FinalCta locale={locale} />
    </>
  );
}
