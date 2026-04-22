import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { site } from "@/lib/site";
import { getLocale } from "@/lib/locale";
import { formatTemplate, getDict } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDict(locale).meta.terms;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: "/terms" },
    openGraph: { title: t.title, description: t.description },
  };
}

export default async function TermsPage() {
  const locale = await getLocale();
  const t = getDict(locale);
  const updatedStr = formatTemplate(t.legal.updated, { date: t.legal.lastUpdatedDate });

  return (
    <>
      <PageHero
        eyebrow={t.legal.legalEyebrow}
        title={t.legal.termsTitle}
        description={updatedStr}
      />
      <section className="pb-20">
        <div className="container-app max-w-3xl space-y-6 text-slate-300 leading-relaxed">
          <p>{t.legal.terms.intro}</p>

          <h2 className="heading-md text-white pt-4">{t.legal.terms.useHeading}</h2>
          <p>{t.legal.terms.useBody}</p>

          <h2 className="heading-md text-white pt-4">{t.legal.terms.engagementsHeading}</h2>
          <p>{t.legal.terms.engagementsBody}</p>

          <h2 className="heading-md text-white pt-4">{t.legal.terms.liabilityHeading}</h2>
          <p>{t.legal.terms.liabilityBody}</p>

          <h2 className="heading-md text-white pt-4">{t.legal.terms.lawHeading}</h2>
          <p>{t.legal.terms.lawBody}</p>

          <h2 className="heading-md text-white pt-4">{t.legal.terms.contactHeading}</h2>
          <p>
            {t.legal.terms.contactBody}{" "}
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
