"use client";

const logos = [
  "Premium Hub",
  "Flixs Store",
  "Belal Store",
  "Driven X",
  "Future Academy",
  "Logistics Now",
  "TechRetail Egypt",
];

export function LogoMarquee() {
  return (
    <section aria-label="Trusted by" className="py-10 border-y border-white/5 bg-ink-900/30">
      <div className="container-app">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          Trusted by ambitious teams in Egypt and beyond
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
