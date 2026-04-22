"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { getDict, type Locale } from "@/lib/i18n";

function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|;\s*)helpers_locale=(en|ar)/);
  return (match?.[1] as Locale) ?? "en";
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [locale, setLocale] = useState<Locale>("en");
  useEffect(() => {
    console.error(error);
    setLocale(readLocaleCookie());
  }, [error]);
  const t = getDict(locale).errorPage;

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-24">
      <div className="container-app max-w-xl text-center">
        <span className="eyebrow text-rose-300">{t.eyebrow}</span>
        <h1 className="mt-3 heading-lg text-white">{t.heading}</h1>
        <p className="mt-3 text-slate-400">{t.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="btn-primary">
            <RotateCcw className="h-4 w-4" /> {t.tryAgain}
          </button>
          <Link href="/" className="btn-secondary">
            {t.backHome}
          </Link>
        </div>
      </div>
    </section>
  );
}
