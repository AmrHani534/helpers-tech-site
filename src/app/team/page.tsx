import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { getTeam } from "@/lib/repo";
import { getLocale } from "@/lib/locale";
import { formatTemplate, getDict } from "@/lib/i18n";
import { FinalCta } from "@/components/home/final-cta";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDict(locale).meta.team;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: "/team" },
    openGraph: { title: t.title, description: t.description },
  };
}

export default async function TeamPage() {
  const [team, locale] = await Promise.all([getTeam(), getLocale()]);
  const isAr = locale === "ar";
  const t = getDict(locale);

  return (
    <>
      <PageHero
        eyebrow={t.team.eyebrow}
        title={
          <>
            {t.team.titleA}{" "}
            <span className="text-gradient">{t.team.titleHighlight}</span>
          </>
        }
        description={t.team.description}
      />

      <section className="pb-20">
        <div className="container-app grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {team.map((member) => {
            const displayName = isAr && member.name_ar ? member.name_ar : member.name;
            return (
              <article key={member.slug} className="group surface surface-hover overflow-hidden">
                <div className="relative aspect-square overflow-hidden bg-ink-800">
                  {member.placeholder ? (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-500/25 to-accent-600/25">
                      <span className="font-display text-5xl font-semibold text-white/80">
                        {member.name
                          .split(" ")
                          .map((p) => p[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-sm font-semibold text-white">{displayName}</h2>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {isAr && member.role_ar ? member.role_ar : member.role}
                  </p>
                  <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-slate-400">
                    {isAr && member.bio_ar ? member.bio_ar : member.bio}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5">
                    {member.socials?.linkedin ? (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={formatTemplate(t.a11y.linkedinPerson, { name: displayName })}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                    {member.socials?.email ? (
                      <a
                        href={`mailto:${member.socials.email}`}
                        aria-label={formatTemplate(t.a11y.emailPerson, { name: displayName })}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                      >
                        <Mail className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                    {member.placeholder ? (
                      <span className="ml-auto text-[10px] uppercase tracking-wider text-amber-300/80 rtl:ml-0 rtl:mr-auto">
                        {t.team.comingSoon}
                      </span>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="container-app mt-14">
          <div className="surface p-8 md:p-10 flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="heading-md text-white">{t.team.joinHeading}</h3>
              <p className="mt-2 text-slate-400">{t.team.joinBody}</p>
            </div>
            <Link href="/careers" className="btn-primary">
              {t.team.applyNow}{" "}
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </section>

      <FinalCta locale={locale} />
    </>
  );
}
