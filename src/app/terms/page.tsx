import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions for using the Helpers Technologies website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="Last updated: January 2025"
      />
      <section className="pb-20">
        <div className="container-app max-w-3xl space-y-6 text-slate-300 leading-relaxed">
          <p>
            By accessing this website you agree to these Terms of Service. If you
            do not agree, please do not use the site.
          </p>

          <h2 className="heading-md text-white pt-4">Use of the site</h2>
          <p>
            The content on this website is provided for general information. You may
            not copy, reproduce, or republish our content without our written
            permission.
          </p>

          <h2 className="heading-md text-white pt-4">Engagements & ownership</h2>
          <p>
            All engagements begin with a signed scope document. Upon final payment,
            you own 100% of the code, designs, and assets we produce for you — no
            vendor lock-in, no hidden licenses.
          </p>

          <h2 className="heading-md text-white pt-4">Limitation of liability</h2>
          <p>
            The website is provided &quot;as is&quot;. We are not liable for any
            damages arising from use of the site or reliance on its content.
          </p>

          <h2 className="heading-md text-white pt-4">Governing law</h2>
          <p>This agreement is governed by the laws of the Arab Republic of Egypt.</p>

          <h2 className="heading-md text-white pt-4">Contact</h2>
          <p>
            Questions about these terms? Email us at{" "}
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
