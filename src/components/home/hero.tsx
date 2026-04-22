"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { getDict, type Locale } from "@/lib/i18n";

export function Hero({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-[0.35] mask-fade-b" />
        <div className="absolute -top-40 left-1/2 h-[620px] w-[920px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl" />
        <div className="absolute top-32 right-[12%] h-[320px] w-[320px] rounded-full bg-accent-600/20 blur-3xl" />
      </div>

      <div className="container-app relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="chip mb-6">
            <Sparkles className="h-3.5 w-3.5 text-brand-300" />
            <span>{t.hero.eyebrow}</span>
          </div>

          <h1 className="heading-xl text-white">
            <span className="block">Build digital products</span>
            <span className="text-gradient block">that actually sell.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-slate-300">
            We combine world-class design, robust engineering, and AI automation to
            help ambitious brands in Egypt and beyond grow revenue — not just traffic.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn-primary">
              {t.hero.cta_primary}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <Link href="/projects" className="btn-secondary">
              <PlayCircle className="h-4 w-4" />
              {t.hero.cta_secondary}
            </Link>
          </div>

          <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            {[
              { k: "20+", v: "Projects shipped" },
              { k: "95%", v: "Client retention" },
              { k: "3 wks", v: "Avg. launch time" },
              { k: "24/7", v: "AI automations" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  {s.k}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
