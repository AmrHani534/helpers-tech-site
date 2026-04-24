import { CheckCircle2, AlertTriangle } from "lucide-react";
import { SaveSettingsButton } from "@/components/admin/save-settings-button";
import { getSupabaseServer } from "@/lib/supabase/server";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import { saveSiteSettings } from "../../actions";

const FIELDS: { key: string; label: string; placeholder?: string }[] = [
  { key: "hero_eyebrow", label: "Hero eyebrow" },
  { key: "hero_eyebrow_ar", label: "Hero eyebrow (Arabic)" },
  { key: "hero_title", label: "Hero title" },
  { key: "hero_title_ar", label: "Hero title (Arabic)" },
  { key: "hero_subtitle", label: "Hero subtitle" },
  { key: "hero_subtitle_ar", label: "Hero subtitle (Arabic)" },
  { key: "email", label: "Contact email" },
  { key: "phone", label: "Phone / WhatsApp" },
  { key: "whatsapp_link", label: "WhatsApp link (https://wa.me/...)" },
  { key: "location", label: "Location" },
  { key: "linkedin_url", label: "LinkedIn URL" },
  { key: "facebook_url", label: "Facebook URL" },
];

export default async function SiteSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const saved = params?.saved === "1";
  const error = params?.error;
  const adminConfigured = isSupabaseAdminConfigured();

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
        {saved ? (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            Settings saved.
          </div>
        ) : null}

        {error ? (
          <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            <AlertTriangle className="h-4 w-4 text-rose-300" />
            Error: {error}
          </div>
        ) : null}

        {!adminConfigured && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
            <div>
              <p className="font-semibold text-amber-300">Admin write access is not configured</p>
              <p className="mt-1 text-xs text-amber-200/70">
                The <code className="text-amber-200">SUPABASE_SERVICE_ROLE_KEY</code> environment variable is missing on the server. 
                You will not be able to save changes until this is added.
              </p>
            </div>
          </div>
        )}

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
          <SaveSettingsButton />
        </div>
      </form>
    </div>
  );
}
