import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { services } from "@/lib/data/services";
import { getLocale } from "@/lib/locale";
import { formatTemplate, getDict } from "@/lib/i18n";
import { FinalCta } from "@/components/home/final-cta";
import { ProcessSection } from "@/components/home/process";
import { Differentiators } from "@/components/home/differentiators";
import { ArrowRight, Check } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDict(locale).meta.services;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: "/services" },
    openGraph: { title: t.title, description: t.description },
  };
}

export default async function ServicesPage() {
  const locale = await getLocale();
  const isAr = locale === "ar";
  const t = getDict(locale);

  return (
    <>
      <PageHero
        eyebrow={t.services.eyebrow}
        title={
          <>
            {t.services.titleA}{" "}
            <span className="text-gradient">{t.services.titleHighlight}</span>{" "}
            {t.services.titleC}
          </>
        }
        description={t.services.description}
      />

      <section className="pb-16 md:pb-24">
        <div className="container-app space-y-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            const title = isAr ? service.title_ar : service.title;
            const deliverables = isAr ? service.deliverables_ar : service.deliverables;
            const features = isAr ? service.features_ar : service.features;
            return (
              <article
                key={service.slug}
                className="surface grid gap-8 p-8 md:grid-cols-12 md:p-10"
              >
                <div className="md:col-span-5 space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="heading-md text-white">{title}</h2>
                  <p className="text-sm text-brand-300/90">
                    {isAr ? service.tagline_ar : service.tagline}
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    {isAr ? service.description_ar : service.description}
                  </p>
                  <Link href="/contact" className="btn-secondary w-fit">
                    {formatTemplate(t.services.discussProject, { service: title })}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </div>
                <div className="md:col-span-7">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {deliverables.map((d) => (
                      <div
                        key={d}
                        className="rounded-xl border border-white/10 bg-ink-900/50 px-4 py-3 text-sm text-slate-200"
                      >
                        <span className="mr-2 text-brand-300 rtl:ml-2 rtl:mr-0">
                          0{i + 1}.
                        </span>
                        {d}
                      </div>
                    ))}
                  </div>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-3">
                    {features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2.5 text-xs text-slate-200"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-emerald-400" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
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
