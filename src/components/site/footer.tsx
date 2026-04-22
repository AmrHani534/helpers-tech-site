import Link from "next/link";
import { Logo } from "./logo";
import { site } from "@/lib/site";
import { MapPin, Mail, Phone, Linkedin, Facebook } from "lucide-react";
import { getDict, type Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-white/5 bg-ink-950/70">
      <div className="container-app py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-5">
            <Logo />
            <p className="max-w-sm text-sm text-slate-400">{t.footer.tagline}</p>
            <div className="space-y-2 text-sm text-slate-300">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <Mail className="h-4 w-4 text-brand-300" /> {site.email}
              </a>
              <a
                href={site.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <Phone className="h-4 w-4 text-brand-300" /> {site.phone}
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="h-4 w-4 text-brand-300" /> {site.location}
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Explore
              </h4>
              <ul className="space-y-2 text-sm">
                {site.nav.map((item) => (
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
                Services
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/services" className="text-slate-300 hover:text-white">
                    Custom Web Development
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-slate-300 hover:text-white">
                    Mobile Apps
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-slate-300 hover:text-white">
                    AI & Automation
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-slate-300 hover:text-white">
                    Digital Growth
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Legal
              </h4>
              <ul className="space-y-2 text-sm">
                {site.legal.map((item) => (
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
                  <Link href="/admin" className="text-slate-500 hover:text-slate-300">
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>{t.footer.copyright.replace("{year}", String(year))}</p>
          <p>Crafted in Giza · Shipped worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
