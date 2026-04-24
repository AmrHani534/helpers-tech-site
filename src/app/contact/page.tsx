import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { getLocale } from "@/lib/locale";
import { getDict } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/repo";
import { resolveContactSettings } from "@/lib/site-settings";
import { Mail, MapPin, MessageCircle, Linkedin, Facebook } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDict(locale).meta.contact;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: "/contact" },
    openGraph: { title: t.title, description: t.description },
  };
}

export default async function ContactPage() {
  const [locale, settings] = await Promise.all([getLocale(), getSiteSettings()]);
  const t = getDict(locale);
  const contact = resolveContactSettings(settings);

  return (
    <>
      <PageHero
        eyebrow={t.contact.eyebrow}
        title={
          <>
            {t.contact.titleA}{" "}
            <span className="text-gradient">{t.contact.titleHighlight}</span>
          </>
        }
        description={t.contact.description}
      />

      <section className="pb-24">
        <div className="container-app grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="surface p-7">
              <h2 className="heading-md text-white">{t.contact.reachHeading}</h2>
              <p className="mt-2 text-sm text-slate-400">{t.contact.reachBody}</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand-500/15 text-brand-300">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">
                      {t.contact.emailLabel}
                    </div>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-medium text-white hover:text-brand-300"
                    >
                      {contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">
                      {t.contact.whatsappLabel}
                    </div>
                    <a
                      href={contact.whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-white hover:text-emerald-400"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white/5 text-slate-300">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">
                      {t.contact.locationLabel}
                    </div>
                    <div className="font-medium text-white">{contact.location}</div>
                  </div>
                </li>
              </ul>

              <div className="mt-6 flex items-center gap-2 border-t border-white/5 pt-5">
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                  aria-label={t.a11y.linkedin}
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={contact.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                  aria-label={t.a11y.facebook}
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="surface p-7 bg-gradient-to-br from-emerald-500/10 to-transparent">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                {t.contact.fastestHeading}
              </h3>
              <p className="mt-2 text-sm text-slate-300">{t.contact.fastestBody}</p>
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-110"
              >
                <MessageCircle className="h-4 w-4" /> {t.contact.chatOnWhatsapp}
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="surface p-7 md:p-9" id="quote">
              <ContactForm locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
