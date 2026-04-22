import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { getFaqs } from "@/lib/repo";
import { getLocale } from "@/lib/locale";
import { FaqList } from "@/components/faq/faq-list";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Straight answers on pricing, timelines, ownership, support and bilingual delivery — everything founders ask before signing with Helpers Technologies.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const [faqs, locale] = await Promise.all([getFaqs(), getLocale()]);

  const byCategory = faqs.reduce<Record<string, typeof faqs>>((acc, f) => {
    const key = f.category ?? "General";
    if (!acc[key]) acc[key] = [];
    acc[key].push(f);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow="Frequently asked"
        title={
          <>
            Answers <span className="text-gradient">before you ask</span>.
          </>
        }
        description="Pricing, timelines, ownership — written plainly, no fluff."
      />

      <section className="pb-20">
        <div className="container-app space-y-10 max-w-4xl">
          {Object.entries(byCategory).map(([category, items]) => (
            <div key={category}>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                {category}
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
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
    </>
  );
}
