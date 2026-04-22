import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Linkedin, Mail } from "lucide-react";
import { SectionHeading } from "@/components/site/section";
import { getTeam } from "@/lib/repo";
import { formatTemplate, getDict, type Locale } from "@/lib/i18n";

export async function TeamPreview({ locale }: { locale: Locale }) {
  const team = await getTeam();
  const t = getDict(locale);
  const isAr = locale === "ar";

  return (
    <section className="py-20 md:py-28">
      <div className="container-app">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t.sections.team}
            title={t.sections.teamHeading}
            description={t.sections.teamDescription}
            className="mb-0"
          />
          <Link href="/team" className="btn-ghost">
            {t.common.meetTheTeam} <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.slice(0, 4).map((member) => {
            const displayName = isAr && member.name_ar ? member.name_ar : member.name;
            const displayRole = isAr && member.role_ar ? member.role_ar : member.role;
            return (
              <div
                key={member.slug}
                className="group surface surface-hover overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden bg-ink-800">
                  {member.placeholder ? (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-500/20 to-accent-600/20">
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
                      alt={displayName}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-white">{displayName}</h3>
                  <p className="mt-0.5 text-xs text-slate-400">{displayRole}</p>
                  {member.placeholder ? (
                    <p className="mt-3 text-[11px] uppercase tracking-wider text-amber-300/80">
                      {t.team.profileComingSoon}
                    </p>
                  ) : (
                    <div className="mt-3 flex items-center gap-2">
                      {member.socials?.linkedin ? (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={formatTemplate(t.a11y.linkedinPerson, {
                            name: displayName,
                          })}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                        >
                          <Linkedin className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                      {member.socials?.email ? (
                        <a
                          href={`mailto:${member.socials.email}`}
                          aria-label={formatTemplate(t.a11y.emailPerson, {
                            name: displayName,
                          })}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                        >
                          <Mail className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
