import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section";
import { getProjects } from "@/lib/repo";
import { getDict, type Locale } from "@/lib/i18n";

export async function FeaturedProjects({ locale }: { locale: Locale }) {
  const projects = (await getProjects({ featuredOnly: true })).slice(0, 6);
  const t = getDict(locale).sections;
  const c = getDict(locale).common;
  const isAr = locale === "ar";

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container-app">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t.projects}
            title={t.projectsHeading}
            description="Selected case studies. Each one a story of a business we helped turn a digital idea into repeatable revenue."
            className="mb-0"
          />
          <Link href="/projects" className="btn-ghost">
            {c.viewAllProjects} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-ink-900 transition hover:border-white/15 hover:-translate-y-1 duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2">
                  <span className="chip">{project.category}</span>
                  <span className="chip">{project.industry}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {isAr && project.title_ar ? project.title_ar : project.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-300">
                  {isAr && project.summary_ar ? project.summary_ar : project.summary}
                </p>
              </div>
              <div className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-ink-950/70 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
