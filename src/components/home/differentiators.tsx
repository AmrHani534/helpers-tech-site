"use client";

import { motion } from "framer-motion";
import { differentiators } from "@/lib/data/differentiators";
import { SectionHeading } from "@/components/site/section";
import { getDict, type Locale } from "@/lib/i18n";

const comparisons: { them: string; us: string }[] = [
  { them: "Focus on 'pretty designs'", us: "Focus on conversion rates" },
  { them: "You talk to a salesman", us: "You talk to the founders" },
  { them: "Charges per hour/change", us: "Flat pricing & packages" },
  { them: "Holds your code hostage", us: "100% code ownership, forever" },
];

export function Differentiators({ locale }: { locale: Locale }) {
  const t = getDict(locale).sections;
  const isAr = locale === "ar";

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-transparent via-ink-900/40 to-transparent">
      <div className="container-app">
        <SectionHeading
          eyebrow={t.differentiators}
          title={t.differentiatorsHeading}
          description="We're not the cheapest. We're the team that treats your business like our own — and refuses to ship features that don't move the needle."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="surface surface-hover p-6"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {isAr ? d.title_ar : d.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {isAr ? d.description_ar : d.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 surface p-6 md:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-white">Them vs. Us</h3>
            <span className="chip">Honest comparison</span>
          </div>
          <ul className="divide-y divide-white/5">
            {comparisons.map((c) => (
              <li
                key={c.them}
                className="grid grid-cols-1 gap-2 py-3 text-sm md:grid-cols-2 md:gap-6"
              >
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-400/70" />
                  <span className="line-through">{c.them}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-100">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{c.us}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
