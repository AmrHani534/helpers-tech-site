import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { getDict, type Locale } from "@/lib/i18n";

export function FinalCta({ locale }: { locale: Locale }) {
  const t = getDict(locale).sections;

  return (
    <section className="py-20 md:py-28">
      <div className="container-app">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-900/50 via-ink-900 to-accent-700/30 p-10 md:p-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
          <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-brand-500/40 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-accent-600/30 blur-3xl" />

          <div className="relative max-w-2xl">
            <h2 className="heading-lg text-white">{t.cta}</h2>
            <p className="mt-4 text-base md:text-lg text-slate-300">{t.ctaBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Start a project <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <a
                href={site.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
