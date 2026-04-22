import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { FinalCta } from "@/components/home/final-cta";
import { getProjects } from "@/lib/repo";
import { getLocale } from "@/lib/locale";
import { getDict } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDict(locale).meta.projects;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: "/projects" },
    openGraph: { title: t.title, description: t.description },
  };
}

export default async function ProjectsPage() {
  const [projects, locale] = await Promise.all([getProjects(), getLocale()]);
  const isAr = locale === "ar";
  const t = getDict(locale);

  return (
    <>
      <PageHero
        eyebrow={t.projects.eyebrow}
        title={
          <>
            {t.projects.titleA}{" "}
            <span className="text-gradient">{t.projects.titleHighlight}</span>
            {t.projects.titleC}
          </>
        }
        description={t.projects.description}
      />

      <section className="pb-24">
        <div className="container-app grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const category =
              t.projects.categories[project.category] ?? project.category;
            const industry =
              t.projects.industries[project.industry] ?? project.industry;
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group relative overflow-hidden rounded-xl border border-white/5 bg-ink-900/60 transition hover:border-white/15 hover:-translate-y-0.5 duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/20" />
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="chip !px-2 !py-0.5 !text-[10px]">{category}</span>
                    <span className="chip !px-2 !py-0.5 !text-[10px]">{industry}</span>
                    <span className="chip !px-2 !py-0.5 !text-[10px]">{project.year}</span>
                  </div>
                  <h2 className="mt-2.5 text-base font-semibold text-white">
                    {isAr && project.title_ar ? project.title_ar : project.title}
                  </h2>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-400">
                    {isAr && project.summary_ar ? project.summary_ar : project.summary}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-300">
                    {t.projects.readCaseStudy}
                    <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <FinalCta locale={locale} />
    </>
  );
}
