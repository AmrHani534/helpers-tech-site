import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { site } from "@/lib/site";
import { getLocale } from "@/lib/locale";
import { formatTemplate, getDict } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDict(locale).meta.privacy;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: "/privacy" },
    openGraph: { title: t.title, description: t.description },
  };
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const t = getDict(locale);
  const updatedStr = formatTemplate(t.legal.updated, { date: t.legal.lastUpdatedDate });
  return (
    <>
      <PageHero
        eyebrow={t.legal.legalEyebrow}
        title={t.legal.privacyTitle}
        description={updatedStr}
      />
      <section className="pb-20">
        <div className="container-app prose-invert max-w-3xl space-y-6 text-slate-300 leading-relaxed">
          <p>{t.legal.privacy.intro}</p>

          <h2 className="heading-md text-white pt-4">{t.legal.privacy.infoHeading}</h2>
          <p>{t.legal.privacy.infoBody}</p>

          <h2 className="heading-md text-white pt-4">{t.legal.privacy.useHeading}</h2>
          <ul className="list-disc space-y-2 pl-6 rtl:pl-0 rtl:pr-6">
            {t.legal.privacy.useItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="heading-md text-white pt-4">{t.legal.privacy.storageHeading}</h2>
          <p>{t.legal.privacy.storageBody}</p>

          <h2 className="heading-md text-white pt-4">{t.legal.privacy.contactHeading}</h2>
          <p>
            {t.legal.privacy.contactBody}{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-brand-300 hover:text-white"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
