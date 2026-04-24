import { site } from "./site";

export type SiteSettings = Record<string, string>;

export function setting(
  settings: SiteSettings | undefined,
  key: string,
  fallback: string,
): string {
  const value = settings?.[key]?.trim();
  return value || fallback;
}

export function resolveContactSettings(settings?: SiteSettings) {
  return {
    email: setting(settings, "email", site.email),
    phone: setting(settings, "phone", site.phone),
    whatsappLink: setting(settings, "whatsapp_link", site.whatsappLink),
    location: setting(settings, "location", site.location),
    linkedinUrl: setting(settings, "linkedin_url", site.social.linkedin),
    facebookUrl: setting(settings, "facebook_url", site.social.facebook),
  };
}
