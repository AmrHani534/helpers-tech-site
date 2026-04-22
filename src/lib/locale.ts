import { cookies } from "next/headers";
import { type Locale, locales } from "./i18n";

export const LOCALE_COOKIE = "helpers_locale";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(LOCALE_COOKIE)?.value;
  return (locales as readonly string[]).includes(raw ?? "") ? (raw as Locale) : "en";
}

export function isRtl(locale: Locale) {
  return locale === "ar";
}
