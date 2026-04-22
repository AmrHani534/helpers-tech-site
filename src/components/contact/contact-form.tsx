"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { getDict, type Locale } from "@/lib/i18n";

type State = "idle" | "loading" | "success" | "error";

export function ContactForm({ locale }: { locale: Locale }) {
  const t = getDict(locale).contactForm;
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");
    setError(null);
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? t.errorGeneric);
        setState("error");
        return;
      }
      setState("success");
      (e.target as HTMLFormElement).reset();
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
          {t.sendAnother}
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
          label={t.fields.name}
          name="name"
          required
          placeholder={t.placeholders.name}
        />
        <Field
          label={t.fields.email}
          name="email"
          type="email"
          required
          placeholder={t.placeholders.email}
        />
        <Field
          label={t.fields.whatsapp}
          name="whatsapp"
          placeholder={t.placeholders.whatsapp}
        />
        <Field
          label={t.fields.company}
          name="company"
          placeholder={t.placeholders.company}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Select
          label={t.fields.projectType}
          name="project_type"
          options={t.options.projectTypes}
          placeholder={t.selectPlaceholder}
        />
        <Select
          label={t.fields.budget}
          name="budget"
          options={t.options.budgets}
          placeholder={t.selectPlaceholder}
        />
        <Select
          label={t.fields.timeline}
          name="timeline"
          options={t.options.timelines}
          placeholder={t.selectPlaceholder}
        />
      </div>

      <div>
        <label className="label" htmlFor="message">
          {t.fields.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="input resize-y"
          placeholder={t.placeholders.message}
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
  placeholder,
}: {
  label: string;
  name: string;
  options: readonly string[];
  placeholder: string;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <select id={name} name={name} className="input" defaultValue="">
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
