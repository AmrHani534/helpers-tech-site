import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { getTeam } from "@/lib/repo";
import { getLocale } from "@/lib/locale";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the engineers and founders behind Helpers Technologies — a senior, founders-first team shipping products in Giza, Egypt.",
  alternates: { canonical: "/team" },
};

export default async function TeamPage() {
  const [team, locale] = await Promise.all([getTeam(), getLocale()]);
  const isAr = locale === "ar";

  return (
    <>
      <PageHero
        eyebrow="The team"
        title={
          <>
            Senior, founders-first, <span className="text-gradient">and in your corner.</span>
          </>
        }
        description="A tight group of engineers and designers. You'll talk to the people actually building your product — no filters, no handoffs."
      />

      <section className="pb-20">
        <div className="container-app grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <article key={member.slug} className="group surface surface-hover overflow-hidden">
              <div className="relative aspect-[4/5] overflow-hidden bg-ink-800">
                {member.placeholder ? (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-500/25 to-accent-600/25">
                    <span className="font-display text-6xl font-semibold text-white/80">
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
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <h2 className="text-xl font-semibold text-white">
                    {isAr && member.name_ar ? member.name_ar : member.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-300">
                    {isAr && member.role_ar ? member.role_ar : member.role}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed text-slate-400">
                  {isAr && member.bio_ar ? member.bio_ar : member.bio}
                </p>
                <div className="mt-5 flex items-center gap-2">
                  {member.socials?.linkedin ? (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  ) : null}
                  {member.socials?.email ? (
                    <a
                      href={`mailto:${member.socials.email}`}
                      aria-label={`Email ${member.name}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  ) : null}
                  {member.placeholder ? (
                    <span className="ml-auto text-[11px] uppercase tracking-wider text-amber-300/80">
                      Photo & title coming soon
                    </span>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="container-app mt-14">
          <div className="surface p-8 md:p-10 flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="heading-md text-white">Want to join the team?</h3>
              <p className="mt-2 text-slate-400">
                We&apos;re always open to meeting product-minded engineers and designers.
                Drop us a line with your work — we read everything.
              </p>
            </div>
            <Link href="/contact" className="btn-primary">
              Say hello <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <FinalCta locale={locale} />
    </>
  );
}
