"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data/services";
import { SectionHeading } from "@/components/site/section";
import { getDict, type Locale } from "@/lib/i18n";

export function ServicesOverview({ locale }: { locale: Locale }) {
  const t = getDict(locale).sections;
  const isAr = locale === "ar";

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container-app">
        <SectionHeading
          eyebrow={t.services}
          title={t.servicesHeading}
          description="Four deep capabilities, fused into one team. No silos, no hand-offs — every engagement pulls from all four."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group surface surface-hover p-6 md:p-8 relative overflow-hidden"
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-br ${service.accent} blur-3xl opacity-60 group-hover:opacity-100 transition`}
                />
                <div className="relative">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-brand-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 heading-md text-white">
                    {isAr ? service.title_ar : service.title}
                  </h3>
                  <p className="mt-1 text-sm text-brand-300/90">
                    {isAr ? service.tagline_ar : service.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">
                    {isAr ? service.description_ar : service.description}
                  </p>
                  <ul className="mt-5 grid grid-cols-2 gap-1.5 text-xs text-slate-300">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-1.5">
                        <span className="inline-block h-1 w-1 rounded-full bg-brand-400" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10">
          <Link href="/services" className="btn-ghost">
            Explore all services <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
