import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { ApplicationForm } from "@/components/careers/application-form";
import { FinalCta } from "@/components/home/final-cta";
import { getLocale } from "@/lib/locale";
import { Rocket, Users, Laptop, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Helpers Technologies — a senior, founders-first team shipping digital products from Giza, Egypt. Apply with your CV and portfolio.",
  alternates: { canonical: "/careers" },
};

const perks = [
  {
    icon: Rocket,
    title: "Real ownership",
    description:
      "Ship product decisions, not tickets. You own the outcome, start to finish.",
  },
  {
    icon: Users,
    title: "Senior-only pod",
    description:
      "Work alongside engineers and designers who actually ship — no juniors to babysit, no filters.",
  },
  {
    icon: Laptop,
    title: "Remote-friendly",
    description:
      "Based in Giza; we work hybrid. Flexible hours, async-first communication.",
  },
  {
    icon: Heart,
    title: "Humans, not resources",
    description:
      "No bureaucracy. Clear expectations, honest feedback, and room to grow fast.",
  },
];

export default async function CareersPage() {
  const locale = await getLocale();

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Build products that <span className="text-gradient">actually ship.</span>
          </>
        }
        description="We hire senior, product-minded people who like moving fast without cutting corners. If that's you, we'd love to hear from you."
      />

      <section className="pb-16">
        <div className="container-app grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="surface surface-hover p-5">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pb-24">
        <div className="container-app">
          <div className="surface mx-auto max-w-3xl p-6 md:p-10">
            <ApplicationForm />
          </div>
        </div>
      </section>

      <FinalCta locale={locale} />
    </>
  );
}
