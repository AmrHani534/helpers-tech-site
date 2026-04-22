import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { site } from "@/lib/site";
import { Mail, MapPin, MessageCircle, Linkedin, Facebook } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project. Helpers Technologies replies on WhatsApp within hours with a straight-talking plan.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something <span className="text-gradient">great together.</span>
          </>
        }
        description="Fill in the form and we'll reply with honest next steps — usually within a few hours. Or WhatsApp us directly for the fastest response."
      />

      <section className="pb-24">
        <div className="container-app grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="surface p-7">
              <h2 className="heading-md text-white">Reach out</h2>
              <p className="mt-2 text-sm text-slate-400">
                We reply fast. Pick whichever is easiest for you.
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand-500/15 text-brand-300">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">
                      Email
                    </div>
                    <a
                      href={`mailto:${site.email}`}
                      className="font-medium text-white hover:text-brand-300"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">
                      WhatsApp
                    </div>
                    <a
                      href={site.whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-white hover:text-emerald-400"
                    >
                      {site.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white/5 text-slate-300">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">
                      Location
                    </div>
                    <div className="font-medium text-white">{site.location}</div>
                  </div>
                </li>
              </ul>

              <div className="mt-6 flex items-center gap-2 border-t border-white/5 pt-5">
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="surface p-7 bg-gradient-to-br from-emerald-500/10 to-transparent">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Fastest reply
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Need an answer today? WhatsApp is the quickest way to get one of the
                founders in a conversation.
              </p>
              <a
                href={site.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-110"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="surface p-7 md:p-9" id="quote">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
