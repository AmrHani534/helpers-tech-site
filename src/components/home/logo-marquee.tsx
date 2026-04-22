"use client";

import { getDict, type Locale } from "@/lib/i18n";

const logos = [
  "Premium Hub",
  "Flixs Store",
  "Belal Store",
  "Driven X",
  "Future Academy",
  "Logistics Now",
  "TechRetail Egypt",
];

export function LogoMarquee({ locale }: { locale: Locale }) {
  const t = getDict(locale).trustedBy;
  return (
    <section aria-label={t.aria} className="py-10 border-y border-white/5 bg-ink-900/30">
      <div className="container-app">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          {t.caption}
        </p>
        <div className="mt-6 overflow-hidden">
          <div className="flex w-max items-center gap-14 animate-marquee whitespace-nowrap opacity-70">
            {[...logos, ...logos].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-display text-lg font-semibold tracking-tight text-slate-400"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
