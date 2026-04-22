import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { site } from "@/lib/site";
import { getLocale, isRtl } from "@/lib/locale";
import { getDict } from "@/lib/i18n";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { ChatWidget } from "@/components/site/chat-widget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDict(locale);
  const title = t.meta.home.title;
  const description = t.meta.home.description;
  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `%s · ${site.name}`,
    },
    description,
    keywords: [
      "web development Egypt",
      "mobile app development Cairo",
      "AI automation",
      "Next.js agency",
      "Helpers Technologies",
      "digital agency Giza",
    ],
    authors: [{ name: site.name, url: site.url }],
    openGraph: {
      type: "website",
      url: site.url,
      title,
      description,
      siteName: site.name,
      locale: locale === "ar" ? "ar_EG" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    icons: {
      icon: "/images/logo.png",
      apple: "/images/logo.png",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05070d",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const rtl = isRtl(locale);
  const t = getDict(locale);
  const hasChatKey = Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

  // Admin routes use their own clean chrome — suppress the public navbar,
  // footer, WhatsApp, and chat widget. The pathname is forwarded by
  // middleware via the `x-pathname` request header.
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    // suppressHydrationWarning is applied narrowly to <html> and <body> only.
    // It silences attribute-level mismatches on those two specific elements
    // (it does NOT cascade to descendants — React still enforces hydration
    // everywhere else). This is the React-documented escape hatch for
    // browser-extension DOM mutations such as Dashlane's `__processed_<uuid>__`
    // attribute, ColorZilla's `cz-shortcut-listen`, Grammarly's
    // `data-new-gr-c-s-check-loaded`, or dark-reader class injections, which
    // are attached to <html>/<body> before React hydrates and cannot be
    // controlled from application code.
    <html
      lang={locale}
      dir={rtl ? "rtl" : "ltr"}
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-brand-500 focus:px-3 focus:py-2 focus:text-white"
        >
          {t.a11y.skipToContent}
        </a>
        {!isAdmin ? <Navbar locale={locale} /> : null}
        <main id="main" className="flex-1">
          {children}
        </main>
        {!isAdmin ? <Footer locale={locale} /> : null}
        {!isAdmin ? <WhatsAppButton locale={locale} /> : null}
        {!isAdmin && hasChatKey ? <ChatWidget locale={locale} /> : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              url: site.url,
              logo: `${site.url}/images/logo.png`,
              email: site.email,
              telephone: site.phone,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Giza",
                addressCountry: "EG",
              },
              sameAs: [site.social.linkedin, site.social.facebook],
            }),
          }}
        />
      </body>
    </html>
  );
}
