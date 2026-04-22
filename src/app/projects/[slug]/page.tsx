import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Quote } from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/repo";
import { getLocale } from "@/lib/locale";
import { getDict } from "@/lib/i18n";
import { FinalCta } from "@/components/home/final-cta";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Params },
): Promise<Metadata> {
  const { slug } = await params;
  const [project, locale] = await Promise.all([
    getProjectBySlug(slug),
    getLocale(),
  ]);
  if (!project) return { title: "Project not found" };
  const isAr = locale === "ar";
  const title = isAr && project.title_ar ? project.title_ar : project.title;
  const description = isAr && project.summary_ar ? project.summary_ar : project.summary;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description,
      images: [{ url: project.coverImage }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [project, locale] = await Promise.all([
    getProjectBySlug(slug),
    getLocale(),
  ]);
  if (!project) notFound();

  const isAr = locale === "ar";
  const t = getDict(locale);
  const related = (await getProjects()).filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10">
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-20 mask-fade-b" />
        <div className="container-app relative">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t.projects.allProjects}
          </Link>
          <div className="mt-6 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip">
                  {t.projects.categories[project.category] ?? project.category}
                </span>
                <span className="chip">
                  {t.projects.industries[project.industry] ?? project.industry}
                </span>
                <span className="chip">{project.year}</span>
              </div>
              <h1 className="mt-5 heading-xl text-white">
                {isAr && project.title_ar ? project.title_ar : project.title}
              </h1>
              <p className="mt-5 text-lg text-slate-300 leading-relaxed">
                {isAr && project.summary_ar ? project.summary_ar : project.summary}
              </p>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary mt-6 w-fit"
                >
                  {t.projects.visitLiveSite}{" "}
                  <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                </a>
              ) : null}
            </div>
            <div className="md:col-span-5">
              <div className="surface overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-app grid gap-8 md:grid-cols-3">
          <div className="surface p-7">
            <span className="eyebrow mb-3">{t.projects.challenge}</span>
            <p className="text-slate-300 leading-relaxed">
              {isAr && project.challenge_ar ? project.challenge_ar : project.challenge}
            </p>
          </div>
          <div className="surface p-7">
            <span className="eyebrow mb-3">{t.projects.solution}</span>
            <p className="text-slate-300 leading-relaxed">
              {isAr && project.solution_ar ? project.solution_ar : project.solution}
            </p>
          </div>
          <div className="surface p-7">
            <span className="eyebrow mb-3">{t.projects.techStack}</span>
            <ul className="mt-1 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container-app">
          <div className="surface p-8">
            <span className="eyebrow mb-4">{t.projects.results}</span>
            <ul className="grid gap-3 sm:grid-cols-2">
              {(isAr && project.results_ar ? project.results_ar : project.results).map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-400" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {project.gallery.length > 1 ? (
        <section className="py-10">
          <div className="container-app">
            <div className="grid gap-4 md:grid-cols-2">
              {project.gallery.map((img) => (
                <div
                  key={img.url}
                  className="relative overflow-hidden rounded-2xl border border-white/10 aspect-video"
                >
                  <Image
                    src={img.url}
                    alt={img.alt ?? project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {project.testimonial ? (
        <section className="py-14">
          <div className="container-app">
            <figure className="relative surface p-10">
              <Quote className="absolute right-6 top-6 h-10 w-10 text-brand-500/30 rtl:right-auto rtl:left-6" />
              <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed max-w-3xl">
                “{isAr && project.testimonial.quote_ar ? project.testimonial.quote_ar : project.testimonial.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm text-slate-400">
                <span className="text-white font-medium">
                  {isAr && project.testimonial.author_ar ? project.testimonial.author_ar : project.testimonial.author}
                </span>
                {" · "}
                {isAr && project.testimonial.role_ar ? project.testimonial.role_ar : project.testimonial.role}
              </figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="py-14">
          <div className="container-app">
            <h3 className="heading-md mb-6 text-white">{t.projects.moreCaseStudies}</h3>
            <div className="grid gap-5 md:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group surface surface-hover overflow-hidden"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-5">
                    <span className="chip">
                      {t.projects.categories[p.category] ?? p.category}
                    </span>
                    <h4 className="mt-2 text-lg font-semibold text-white">
                      {isAr && p.title_ar ? p.title_ar : p.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FinalCta locale={locale} />
    </>
  );
}
