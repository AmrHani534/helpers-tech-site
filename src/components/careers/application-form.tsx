"use client";

import { useState } from "react";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
  Upload,
} from "lucide-react";
import { getDict, type Locale } from "@/lib/i18n";

type State = "idle" | "loading" | "success" | "error";

export function ApplicationForm({ locale }: { locale: Locale }) {
  const t = getDict(locale).careerForm;
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? t.errorGeneric);
        setState("error");
        return;
      }
      setState("success");
      form.reset();
      setFileName("");
    } catch {
      setError(t.errorNetwork);
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-5 heading-md text-white">{t.successHeading}</h3>
        <p className="mt-2 max-w-md text-sm text-slate-400">{t.successBody}</p>
        <button
          onClick={() => setState("idle")}
          className="btn-secondary mt-8"
          type="button"
        >
          {t.submitAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="heading-md text-white">{t.heading}</h2>
        <span className="text-xs text-slate-500">{t.required}</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label={t.fields.fullName}
          name="full_name"
          required
          placeholder={t.placeholders.fullName}
        />
        <Field
          label={t.fields.email}
          name="email"
          type="email"
          required
          placeholder={t.placeholders.email}
        />
        <Field
          label={t.fields.phone}
          name="phone"
          placeholder={t.placeholders.phone}
        />
        <Field
          label={t.fields.location}
          name="location"
          placeholder={t.placeholders.location}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Select
          label={t.fields.role}
          name="role"
          options={t.options.roles}
          required
          placeholder={t.selectPlaceholder}
        />
        <Select
          label={t.fields.experienceYears}
          name="experience_years"
          options={t.options.experience}
          placeholder={t.selectPlaceholder}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label={t.fields.linkedin}
          name="linkedin"
          placeholder={t.placeholders.linkedin}
        />
        <Field
          label={t.fields.portfolio}
          name="portfolio"
          placeholder={t.placeholders.portfolio}
        />
      </div>

      <div>
        <label className="label" htmlFor="cover_letter">
          {t.fields.coverLetter}
        </label>
        <textarea
          id="cover_letter"
          name="cover_letter"
          required
          rows={6}
          className="input resize-y"
          placeholder={t.placeholders.coverLetter}
        />
      </div>

      <div>
        <label className="label" htmlFor="cv">
          {t.cv.label}
        </label>
        <label
          htmlFor="cv"
          className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-white/15 bg-ink-900/40 px-4 py-3 text-sm text-slate-300 hover:border-white/30 hover:bg-ink-900/70"
        >
          <span className="flex items-center gap-2 truncate">
            <Upload className="h-4 w-4 text-brand-300" />
            {fileName || t.cv.click}
          </span>
          <span className="text-xs text-slate-500">{t.cv.optional}</span>
        </label>
        <input
          id="cv"
          name="cv"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        />
      </div>

      {state === "error" && error ? (
        <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-slate-500">{t.replyNote}</p>
        <button
          type="submit"
          disabled={state === "loading"}
          className="btn-primary"
        >
          {state === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t.sending}
            </>
          ) : (
            <>
              {t.cta} <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="input"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  options: readonly string[];
  required?: boolean;
  placeholder: string;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <select id={name} name={name} required={required} className="input" defaultValue="">
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
