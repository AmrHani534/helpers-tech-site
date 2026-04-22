import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section";
import { getFaqs } from "@/lib/repo";
import { FaqList } from "@/components/faq/faq-list";
import { getDict, type Locale } from "@/lib/i18n";

export async function FaqPreview({ locale }: { locale: Locale }) {
  const faqs = (await getFaqs()).slice(0, 5);
  const t = getDict(locale);

  return (
    <section className="py-20 md:py-28">
      <div className="container-app grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow={t.sections.faq}
            title={t.sections.faqHeading}
            description={t.sections.faqDescription}
            className="mb-6"
          />
          <Link href="/faq" className="btn-ghost">
            {t.common.seeAllFaqs} <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
        <div className="lg:col-span-7">
          <FaqList faqs={faqs} locale={locale} />
        </div>
      </div>
    </section>
  );
}
