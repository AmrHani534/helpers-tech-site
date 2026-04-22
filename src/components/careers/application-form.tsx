"use client";

import { useState } from "react";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
  Upload,
} from "lucide-react";

const roles = [
  "Frontend Engineer",
  "Backend Engineer",
  "Full-Stack Engineer",
  "Mobile Engineer",
  "Product Designer",
  "AI / ML Engineer",
  "Growth / Marketing",
  "Project Manager",
  "Internship",
  "Other",
];

const experienceOptions = [
  "Student / Internship",
  "0–1 years",
  "1–3 years",
  "3–5 years",
  "5–8 years",
  "8+ years",
];

type State = "idle" | "loading" | "success" | "error";

export function ApplicationForm() {
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
        setError(data.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }
      setState("success");
      form.reset();
      setFileName("");
    } catch {
      setError("Network error. Please try again.");
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-5 heading-md text-white">Application received.</h3>
        <p className="mt-2 max-w-md text-sm text-slate-400">
          Thanks for applying. We read every application ourselves — if there&apos;s
          a fit, you&apos;ll hear back within a week.
        </p>
        <button
          onClick={() => setState("idle")}
          className="btn-secondary mt-8"
          type="button"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="heading-md text-white">Apply to join the team</h2>
        <span className="text-xs text-slate-500">* required</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full name *" name="full_name" required placeholder="Jane Doe" />
        <Field
          label="Email *"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
        />
        <Field
          label="Phone / WhatsApp"
          name="phone"
          placeholder="+20 111 844 5625"
        />
        <Field label="Location" name="location" placeholder="Cairo, Egypt" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Select label="Role applying for *" name="role" options={roles} required />
        <Select
          label="Years of experience"
          name="experience_years"
          options={experienceOptions}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="LinkedIn"
          name="linkedin"
          placeholder="https://linkedin.com/in/…"
        />
        <Field
          label="Portfolio / GitHub"
          name="portfolio"
          placeholder="https://github.com/…"
        />
      </div>

      <div>
        <label className="label" htmlFor="cover_letter">
          Cover letter / message *
        </label>
        <textarea
          id="cover_letter"
          name="cover_letter"
          required
          rows={6}
          className="input resize-y"
          placeholder="Why do you want to join Helpers Technologies? Link to a project you're proud of."
        />
      </div>

      <div>
        <label className="label" htmlFor="cv">
          CV / Résumé (PDF, DOC, DOCX — max 6 MB)
        </label>
        <label
          htmlFor="cv"
          className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-white/15 bg-ink-900/40 px-4 py-3 text-sm text-slate-300 hover:border-white/30 hover:bg-ink-900/70"
        >
          <span className="flex items-center gap-2 truncate">
            <Upload className="h-4 w-4 text-brand-300" />
            {fileName || "Click to upload your CV"}
          </span>
          <span className="text-xs text-slate-500">Optional</span>
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
        <p className="text-xs text-slate-500">
          We read every application. Expect a reply within a week.
        </p>
        <button
          type="submit"
          disabled={state === "loading"}
          className="btn-primary"
        >
          {state === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Submit application <Send className="h-4 w-4" />
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
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <select id={name} name={name} required={required} className="input" defaultValue="">
        <option value="" disabled>
          Select…
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
