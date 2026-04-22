"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/data/process";
import { SectionHeading } from "@/components/site/section";
import { formatTemplate, getDict, type Locale } from "@/lib/i18n";

export function ProcessSection({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const isAr = locale === "ar";

  return (
    <section className="py-20 md:py-28">
      <div className="container-app">
        <SectionHeading
          eyebrow={t.sections.process}
          title={t.sections.processHeading}
          description={t.sections.processDescription}
        />

        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="relative surface p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display text-3xl font-semibold text-brand-300/70">
                  {step.number}
                </span>
                <span className="chip">
                  {formatTemplate(t.process.stepLabel, {
                    n: i + 1,
                    total: processSteps.length,
                  })}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white">
                {isAr ? step.title_ar : step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {isAr ? step.description_ar : step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
