import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { getFaqs } from "@/lib/repo";
import { getLocale } from "@/lib/locale";
import { getDict } from "@/lib/i18n";
import { FaqList } from "@/components/faq/faq-list";
import { FinalCta } from "@/components/home/final-cta";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDict(locale).meta.faq;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: "/faq" },
    openGraph: { title: t.title, description: t.description },
  };
}

export default async function FaqPage() {
  const [faqs, locale] = await Promise.all([getFaqs(), getLocale()]);
  const isAr = locale === "ar";
  const t = getDict(locale);

  const byCategory = faqs.reduce<Record<string, typeof faqs>>((acc, f) => {
    const key = f.category ?? "General";
    if (!acc[key]) acc[key] = [];
    acc[key].push(f);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow={t.faq.eyebrow}
        title={
          <>
            {t.faq.titleA}{" "}
            <span className="text-gradient">{t.faq.titleHighlight}</span>
            {t.faq.titleC}
          </>
        }
        description={t.faq.description}
      />

      <section className="pb-20">
        <div className="container-app space-y-10 max-w-4xl">
          {Object.entries(byCategory).map(([category, items]) => (
            <div key={category}>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                {isAr && items[0]?.category_ar
                  ? items[0].category_ar
                  : t.faq.categories[category] ?? category}
              </h2>
              <FaqList faqs={items} locale={locale} />
            </div>
          ))}
        </div>
      </section>

      <FinalCta locale={locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: isAr && f.question_ar ? f.question_ar : f.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: isAr && f.answer_ar ? f.answer_ar : f.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
