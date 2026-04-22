import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Helpers Technologies collects, uses, and protects personal data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const updated = "January 2025";
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${updated}`}
      />
      <section className="pb-20">
        <div className="container-app prose-invert max-w-3xl space-y-6 text-slate-300 leading-relaxed">
          <p>
            This Privacy Policy describes how Helpers Technologies (&quot;we&quot;,
            &quot;us&quot;, &quot;our&quot;) collects, uses, and shares information
            when you interact with our website and services.
          </p>

          <h2 className="heading-md text-white pt-4">Information we collect</h2>
          <p>
            We collect the information you give us directly — for example when you
            submit a contact form — and basic technical data such as your browser,
            device, and pages visited. We use this to reply to your inquiry and to
            improve the site.
          </p>

          <h2 className="heading-md text-white pt-4">How we use your information</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>To respond to your inquiries and send project proposals.</li>
            <li>To operate, maintain, and improve our website.</li>
            <li>To communicate with you about our services (only if you opt in).</li>
          </ul>

          <h2 className="heading-md text-white pt-4">Data storage</h2>
          <p>
            Contact submissions are stored securely in our database. We never sell
            or rent your data to third parties. You can request deletion of your
            data at any time by emailing us.
          </p>

          <h2 className="heading-md text-white pt-4">Contact</h2>
          <p>
            Questions about this policy? Email us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-brand-300 hover:text-white"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
