import { Save } from "lucide-react";
import { getSupabaseServer } from "@/lib/supabase/server";
import { saveSiteSettings } from "../actions";

const FIELDS: { key: string; label: string; placeholder?: string }[] = [
  { key: "hero_eyebrow", label: "Hero eyebrow" },
  { key: "hero_title", label: "Hero title" },
  { key: "hero_subtitle", label: "Hero subtitle" },
  { key: "email", label: "Contact email" },
  { key: "phone", label: "Phone / WhatsApp" },
  { key: "whatsapp_link", label: "WhatsApp link (https://wa.me/...)" },
  { key: "location", label: "Location" },
  { key: "linkedin_url", label: "LinkedIn URL" },
  { key: "facebook_url", label: "Facebook URL" },
];

export default async function SiteSettingsPage() {
  const supabase = await getSupabaseServer();
  const { data = [] } = supabase
    ? await supabase.from("site_settings").select("key, value")
    : { data: [] };
  const current = Object.fromEntries(
    ((data ?? []) as { key: string; value: string }[]).map((r) => [r.key, r.value]),
  );

  return (
    <div>
      <h1 className="heading-md text-white">Site settings</h1>
      <p className="mt-1 text-sm text-slate-400">
        Global key/value settings. Leave blank to fall back to the defaults in
        <code className="ml-1 text-slate-300">src/lib/site.ts</code>.
      </p>

      <form action={saveSiteSettings} className="mt-8 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="label" htmlFor={f.key}>
                {f.label}
              </label>
              <input
                id={f.key}
                name={`s:${f.key}`}
                defaultValue={current[f.key] ?? ""}
                placeholder={f.placeholder}
                className="input"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn-primary">
            <Save className="h-4 w-4" />
            Save settings
          </button>
        </div>
      </form>
    </div>
  );
}
