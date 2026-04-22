import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { ImageUploader } from "./image-uploader";
import { saveProject } from "@/app/admin/actions";

type Project = {
  id?: string;
  title?: string;
  title_ar?: string;
  slug?: string;
  category?: string;
  industry?: string;
  year?: string;
  summary?: string;
  summary_ar?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  tech_stack?: string[];
  cover_image?: string;
  live_url?: string;
  featured?: boolean;
  published?: boolean;
  order_index?: number;
  testimonial_quote?: string;
  testimonial_author?: string;
  testimonial_role?: string;
};

export function ProjectForm({ project }: { project?: Project }) {
  const isEdit = Boolean(project?.id);
  return (
    <form action={saveProject} className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/projects" className="btn-ghost">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          Back to projects
        </Link>
        <div className="flex items-center gap-2">
          <button type="submit" className="btn-primary">
            <Save className="h-4 w-4" />
            {isEdit ? "Save changes" : "Create project"}
          </button>
        </div>
      </div>

      {project?.id ? <input type="hidden" name="id" value={project.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title *" name="title" defaultValue={project?.title} required />
        <Field label="Title (Arabic)" name="title_ar" defaultValue={project?.title_ar} />
        <Field label="Slug (leave empty to auto-generate)" name="slug" defaultValue={project?.slug} />
        <Field label="Category" name="category" defaultValue={project?.category} placeholder="E-Commerce" />
        <Field label="Industry" name="industry" defaultValue={project?.industry} placeholder="Retail" />
        <Field label="Year" name="year" defaultValue={project?.year ?? String(new Date().getFullYear())} />
        <Field label="Live URL" name="live_url" defaultValue={project?.live_url} placeholder="https://..." />
        <Field
          label="Order index"
          name="order_index"
          defaultValue={String(project?.order_index ?? 0)}
          type="number"
        />
      </div>

      <ImageUploader
        name="cover_image"
        initialUrl={project?.cover_image}
        label="Cover image"
        folder="projects"
      />

      <Textarea
        label="Short summary *"
        name="summary"
        defaultValue={project?.summary}
        rows={3}
        required
      />
      <Textarea
        label="Summary (Arabic)"
        name="summary_ar"
        defaultValue={project?.summary_ar}
        rows={3}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Textarea
          label="Challenge"
          name="challenge"
          defaultValue={project?.challenge}
          rows={5}
        />
        <Textarea
          label="Solution"
          name="solution"
          defaultValue={project?.solution}
          rows={5}
        />
      </div>

      <Textarea
        label="Results (one per line)"
        name="results"
        defaultValue={project?.results?.join("\n")}
        rows={5}
      />
      <Textarea
        label="Tech stack (one per line)"
        name="tech_stack"
        defaultValue={project?.tech_stack?.join("\n")}
        rows={4}
      />

      <fieldset className="surface p-5 space-y-4">
        <legend className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Testimonial (optional)
        </legend>
        <Textarea
          label="Quote"
          name="testimonial_quote"
          defaultValue={project?.testimonial_quote}
          rows={3}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Author" name="testimonial_author" defaultValue={project?.testimonial_author} />
          <Field label="Role" name="testimonial_role" defaultValue={project?.testimonial_role} />
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-6">
        <Toggle name="featured" label="Featured" defaultChecked={project?.featured} />
        <Toggle name="published" label="Published" defaultChecked={project?.published ?? true} />
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
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
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        required={required}
        className="input"
      />
    </div>
  );
}

function Textarea({
  label,
  name,
  defaultValue,
  rows = 4,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue ?? ""}
        rows={rows}
        required={required}
        className="input resize-y"
      />
    </div>
  );
}

function Toggle({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-200">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-white/20 bg-ink-900 text-brand-500 focus:ring-brand-500"
      />
      {label}
    </label>
  );
}
