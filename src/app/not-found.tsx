import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getLocale } from "@/lib/locale";
import { getDict } from "@/lib/i18n";

export default async function NotFound() {
  const locale = await getLocale();
  const t = getDict(locale).notFound;
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-24">
      <div className="container-app max-w-xl text-center">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1 className="mt-3 heading-lg text-white">{t.heading}</h1>
        <p className="mt-3 text-slate-400">{t.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t.backHome}
          </Link>
          <Link href="/projects" className="btn-secondary">
            {t.seeProjects}
          </Link>
        </div>
      </div>
    </section>
  );
}
