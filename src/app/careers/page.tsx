import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { ApplicationForm } from "@/components/careers/application-form";
import { FinalCta } from "@/components/home/final-cta";
import { getLocale } from "@/lib/locale";
import { getDict } from "@/lib/i18n";
import { Rocket, Users, Laptop, Heart } from "lucide-react";

const perkIcons = [Rocket, Users, Laptop, Heart];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDict(locale).meta.careers;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: "/careers" },
    openGraph: { title: t.title, description: t.description },
  };
}

export default async function CareersPage() {
  const locale = await getLocale();
  const t = getDict(locale);

  return (
    <>
      <PageHero
        eyebrow={t.careers.eyebrow}
        title={
          <>
            {t.careers.titleA}{" "}
            <span className="text-gradient">{t.careers.titleHighlight}</span>
          </>
        }
        description={t.careers.description}
      />

      <section className="pb-16">
        <div className="container-app grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.careers.perks.map((perk, i) => {
            const Icon = perkIcons[i] ?? Rocket;
            return (
              <div key={perk.title} className="surface surface-hover p-5">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {perk.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pb-24">
        <div className="container-app">
          <div className="surface mx-auto max-w-3xl p-6 md:p-10">
            <ApplicationForm locale={locale} />
          </div>
        </div>
      </section>

      <FinalCta locale={locale} />
    </>
  );
}
