import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { ImageUploader } from "./image-uploader";
import { saveTeam } from "@/app/admin/actions";

type TeamMember = {
  id?: string;
  name?: string;
  name_ar?: string;
  slug?: string;
  role?: string;
  role_ar?: string;
  bio?: string;
  bio_ar?: string;
  photo?: string;
  featured?: boolean;
  placeholder?: boolean;
  order_index?: number;
  linkedin?: string;
  email?: string;
};

export function TeamForm({ member }: { member?: TeamMember }) {
  const isEdit = Boolean(member?.id);
  return (
    <form action={saveTeam} className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/team" className="btn-ghost">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          Back to team
        </Link>
        <button type="submit" className="btn-primary">
          <Save className="h-4 w-4" />
          {isEdit ? "Save changes" : "Add team member"}
        </button>
      </div>
      {member?.id ? <input type="hidden" name="id" value={member.id} /> : null}

      <ImageUploader
        name="photo"
        initialUrl={member?.photo}
        label="Photo"
        folder="team"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name *" name="name" defaultValue={member?.name} required />
        <Field label="Name (Arabic)" name="name_ar" defaultValue={member?.name_ar} />
        <Field label="Slug" name="slug" defaultValue={member?.slug} />
        <Field label="Role" name="role" defaultValue={member?.role} />
        <Field label="Role (Arabic)" name="role_ar" defaultValue={member?.role_ar} />
        <Field
          label="Order index"
          name="order_index"
          type="number"
          defaultValue={String(member?.order_index ?? 0)}
        />
        <Field label="LinkedIn URL" name="linkedin" defaultValue={member?.linkedin} />
        <Field label="Email" name="email" type="email" defaultValue={member?.email} />
      </div>

      <Textarea label="Bio" name="bio" defaultValue={member?.bio} rows={5} />
      <Textarea label="Bio (Arabic)" name="bio_ar" defaultValue={member?.bio_ar} rows={5} />

      <div className="flex flex-wrap items-center gap-6">
        <Toggle name="featured" label="Featured on homepage" defaultChecked={member?.featured} />
        <Toggle
          name="placeholder"
          label="Show as placeholder (photo/title coming soon)"
          defaultChecked={member?.placeholder}
        />
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
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
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
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
