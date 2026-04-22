"use client";

import { motion } from "framer-motion";
import { differentiators } from "@/lib/data/differentiators";
import { SectionHeading } from "@/components/site/section";
import { getDict, type Locale } from "@/lib/i18n";

export function Differentiators({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const isAr = locale === "ar";

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-transparent via-ink-900/40 to-transparent">
      <div className="container-app">
        <SectionHeading
          eyebrow={t.sections.differentiators}
          title={t.sections.differentiatorsHeading}
          description={t.sections.differentiatorsDescription}
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </section>
  );
}
