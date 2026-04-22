import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { FinalCta } from "@/components/home/final-cta";
import { getProjects } from "@/lib/repo";
import { getLocale } from "@/lib/locale";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies from Helpers Technologies — e-commerce platforms, AI automation, and mobile apps that move the revenue needle.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const [projects, locale] = await Promise.all([getProjects(), getLocale()]);
  const isAr = locale === "ar";

  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title={
          <>
            Work that <span className="text-gradient">shipped revenue</span>.
          </>
        }
        description="Every project on this page launched, got real users, and moved a real business metric. No vanity work."
      />

      <section className="pb-24">
        <div className="container-app grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-ink-900/60 transition hover:border-white/15"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip">{project.category}</span>
                  <span className="chip">{project.industry}</span>
                  <span className="chip">{project.year}</span>
                </div>
                <h2 className="mt-3 heading-md text-white">
                  {isAr && project.title_ar ? project.title_ar : project.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                  {isAr && project.summary_ar ? project.summary_ar : project.summary}
                </p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-300">
                  Read case study
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FinalCta locale={locale} />
    </>
  );
}
