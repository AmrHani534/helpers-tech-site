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
        <div className="container-app grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {team.map((member) => (
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
                <h2 className="text-sm font-semibold text-white">
                  {isAr && member.name_ar ? member.name_ar : member.name}
                </h2>
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
                      aria-label={`${member.name} on LinkedIn`}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                  {member.socials?.email ? (
                    <a
                      href={`mailto:${member.socials.email}`}
                      aria-label={`Email ${member.name}`}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                  {member.placeholder ? (
                    <span className="ml-auto text-[10px] uppercase tracking-wider text-amber-300/80">
                      Coming soon
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
                Send us your CV and a short note — we read everything.
              </p>
            </div>
            <Link href="/careers" className="btn-primary">
              Apply now <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <FinalCta locale={locale} />
    </>
  );
}
