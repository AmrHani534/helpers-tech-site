import { Hero } from "@/components/home/hero";
import { LogoMarquee } from "@/components/home/logo-marquee";
import { ServicesOverview } from "@/components/home/services-overview";
import { Differentiators } from "@/components/home/differentiators";
import { ProcessSection } from "@/components/home/process";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Testimonials } from "@/components/home/testimonials";
import { TeamPreview } from "@/components/home/team-preview";
import { FaqPreview } from "@/components/home/faq-preview";
import { FinalCta } from "@/components/home/final-cta";
import { getLocale } from "@/lib/locale";

export const metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const locale = await getLocale();
  return (
    <>
      <Hero locale={locale} />
      <LogoMarquee locale={locale} />
      <ServicesOverview locale={locale} />
      <Differentiators locale={locale} />
      <ProcessSection locale={locale} />
      <FeaturedProjects locale={locale} />
      <Testimonials locale={locale} />
      <TeamPreview locale={locale} />
      <FaqPreview locale={locale} />
      <FinalCta locale={locale} />
    </>
  );
}
