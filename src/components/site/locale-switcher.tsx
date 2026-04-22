"use client";

import { useTransition } from "react";
import { Globe } from "lucide-react";
import { getDict, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({
  current,
  className = "",
}: {
  current: Locale;
  className?: string;
}) {
  const [pending, startTransition] = useTransition();
  const t = getDict(current).a11y;

  const swap = () => {
    const next: Locale = current === "en" ? "ar" : "en";
    document.cookie = `helpers_locale=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    startTransition(() => {
      window.location.reload();
    });
  };

  return (
    <button
      onClick={swap}
      disabled={pending}
      aria-label={t.switchLang}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-white/10 transition",
        className,
      )}
    >
      <Globe className="h-3.5 w-3.5" />
      <span>{current === "en" ? "AR" : "EN"}</span>
    </button>
  );
}
