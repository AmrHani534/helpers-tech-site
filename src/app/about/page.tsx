import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { about, stats } from "@/lib/data/about";
import { getLocale } from "@/lib/locale";
import { FinalCta } from "@/components/home/final-cta";
import { TeamPreview } from "@/components/home/team-preview";
import { ProcessSection } from "@/components/home/process";

export const metadata: Metadata = {
  title: "About",
  description:
    "Helpers Technologies is a Giza-based digital studio combining engineering, design, and AI automation to turn digital products into repeatable revenue.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  return (
    <>
      <PageHero
        eyebrow="About Helpers Technologies"
        title={
          <>
            We build engines, <span className="text-gradient">not just showrooms.</span>
          </>
        }
        description={isAr ? about.story_ar : about.story}
      >
        <div className="grid max-w-3xl grid-cols-2 gap-6 pt-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-semibold text-white">
                {s.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                {isAr ? s.label_ar : s.label}
              </div>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container-app grid gap-8 md:grid-cols-2">
          <div className="surface p-8">
            <span className="eyebrow mb-3">Mission</span>
            <h2 className="heading-md text-white">What we do</h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              {isAr ? about.mission_ar : about.mission}
            </p>
          </div>
          <div className="surface p-8">
            <span className="eyebrow mb-3">Vision</span>
            <h2 className="heading-md text-white">Where we&apos;re going</h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              {isAr ? about.vision_ar : about.vision}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-transparent via-ink-900/40 to-transparent">
        <div className="container-app">
          <div className="mb-12 max-w-2xl">
            <span className="eyebrow mb-3">Our values</span>
            <h2 className="heading-lg text-white">Principles we actually live by.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {about.values.map((v) => (
              <div key={v.title} className="surface p-6">
                <h3 className="text-lg font-semibold text-white">
                  {isAr ? v.title_ar : v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {isAr ? v.description_ar : v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection locale={locale} />
      <TeamPreview locale={locale} />
      <FinalCta locale={locale} />
    </>
  );
}
