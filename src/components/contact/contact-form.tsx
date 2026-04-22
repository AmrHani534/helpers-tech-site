"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";

const projectTypes = [
  "New Website / Redesign",
  "E-Commerce Store",
  "Mobile App (iOS/Android)",
  "AI & Automation",
  "Digital Marketing / Branding",
  "Other / Custom Project",
];

const budgets = [
  "Under $500 (Launch Pack)",
  "$500 – $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Flexible / Researching",
];

const timelines = [
  "ASAP (Next 2 weeks)",
  "Within 1 month",
  "1–3 months",
  "Flexible",
];

type State = "idle" | "loading" | "success" | "error";

export function ContactForm() {
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
        setError(data.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }
      setState("success");
      (e.target as HTMLFormElement).reset();
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
        <h3 className="mt-5 heading-md text-white">Message received.</h3>
        <p className="mt-2 max-w-md text-sm text-slate-400">
          Thanks for reaching out. One of the founders will get back to you shortly
          — usually within a few hours during business hours.
        </p>
        <button
          onClick={() => setState("idle")}
          className="btn-secondary mt-8"
          type="button"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="heading-md text-white">Tell us about your project</h2>
        <span className="text-xs text-slate-500">* required</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Your name *" name="name" required placeholder="Jane Doe" />
        <Field
          label="Email *"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
        />
        <Field
          label="WhatsApp / Phone"
          name="whatsapp"
          placeholder="+20 111 844 5625"
        />
        <Field label="Company" name="company" placeholder="Acme Inc." />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Select label="Project type *" name="project_type" options={projectTypes} />
        <Select label="Budget" name="budget" options={budgets} />
        <Select label="Timeline" name="timeline" options={timelines} />
      </div>

      <div>
        <label className="label" htmlFor="message">
          What are you trying to build? *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="input resize-y"
          placeholder="Goals, audience, known constraints, links to anything relevant…"
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
          We reply within a few hours on business days.
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
              Send message <Send className="h-4 w-4" />
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
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="input"
        autoComplete="off"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <select id={name} name={name} className="input">
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
