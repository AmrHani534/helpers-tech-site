import Link from "next/link";
import { Logo } from "./logo";
import { MapPin, Mail, Phone, Linkedin, Facebook } from "lucide-react";
import { formatTemplate, getDict, type Locale } from "@/lib/i18n";
import {
  resolveContactSettings,
  type SiteSettings,
} from "@/lib/site-settings";

// Computed once at module load so server render and the client bundle both
// use the same value — avoids a rare hydration mismatch at year-boundary
// midnights when server and client disagree on getFullYear().
const FOOTER_YEAR = new Date().getFullYear();

export function Footer({
  locale,
  settings,
}: {
  locale: Locale;
  settings?: SiteSettings;
}) {
  const t = getDict(locale);
  const year = FOOTER_YEAR;
  const contact = resolveContactSettings(settings);

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/projects", label: t.nav.projects },
    { href: "/team", label: t.nav.team },
    { href: "/faq", label: t.nav.faq },
    { href: "/contact", label: t.nav.contact },
  ];

  const legalItems = [
    { href: "/privacy", label: t.nav.privacy },
    { href: "/terms", label: t.nav.terms },
  ];

  return (
    <footer className="mt-24 border-t border-white/5 bg-ink-950/70">
      <div className="container-app py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-5">
            <Logo />
            <p className="max-w-sm text-sm text-slate-400">{t.footer.tagline}</p>
            <div className="space-y-2 text-sm text-slate-300">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <Mail className="h-4 w-4 text-brand-300" /> {contact.email}
              </a>
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <Phone className="h-4 w-4 text-brand-300" /> {contact.phone}
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="h-4 w-4 text-brand-300" /> {contact.location}
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={t.a11y.linkedin}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={contact.facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={t.a11y.facebook}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {t.footer.explore}
              </h4>
              <ul className="space-y-2 text-sm">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-slate-300 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {t.footer.servicesTitle}
              </h4>
              <ul className="space-y-2 text-sm">
                {t.footer.servicesLinks.map((label) => (
                  <li key={label}>
                    <Link href="/services" className="text-slate-300 hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {t.footer.legalTitle}
              </h4>
              <ul className="space-y-2 text-sm">
                {legalItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-slate-300 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/careers" className="text-slate-300 hover:text-white">
                    {t.nav.careers}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>{formatTemplate(t.footer.copyright, { year })}</p>
          <p>{t.footer.crafted}</p>
        </div>
      </div>
    </footer>
  );
}
