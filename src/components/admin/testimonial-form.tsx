import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { saveTestimonial } from "@/app/admin/actions";

type Testimonial = {
  id?: string;
  quote?: string;
  quote_ar?: string;
  author?: string;
  role?: string;
  company?: string;
  rating?: number;
  featured?: boolean;
  order_index?: number;
};

export function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const isEdit = Boolean(testimonial?.id);
  return (
    <form action={saveTestimonial} className="space-y-5">
      <div className="flex items-center justify-between">
        <Link href="/admin/testimonials" className="btn-ghost">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> Back
        </Link>
        <button type="submit" className="btn-primary">
          <Save className="h-4 w-4" />
          {isEdit ? "Save changes" : "Add testimonial"}
        </button>
      </div>
      {testimonial?.id ? <input type="hidden" name="id" value={testimonial.id} /> : null}

      <div>
        <label className="label" htmlFor="quote">Quote *</label>
        <textarea
          id="quote"
          name="quote"
          rows={4}
          defaultValue={testimonial?.quote ?? ""}
          required
          className="input resize-y"
        />
      </div>
      <div>
        <label className="label" htmlFor="quote_ar">Quote (Arabic)</label>
        <textarea
          id="quote_ar"
          name="quote_ar"
          rows={4}
          defaultValue={testimonial?.quote_ar ?? ""}
          className="input resize-y"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Author *" name="author" defaultValue={testimonial?.author} required />
        <Field label="Role" name="role" defaultValue={testimonial?.role} />
        <Field label="Company" name="company" defaultValue={testimonial?.company} />
        <Field
          label="Rating (1–5)"
          name="rating"
          type="number"
          defaultValue={String(testimonial?.rating ?? 5)}
        />
        <Field
          label="Order index"
          name="order_index"
          type="number"
          defaultValue={String(testimonial?.order_index ?? 0)}
        />
      </div>

      <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-200">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={testimonial?.featured}
          className="h-4 w-4 rounded border-white/20 bg-ink-900 text-brand-500 focus:ring-brand-500"
        />
        Featured
      </label>
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
      <label className="label" htmlFor={name}>{label}</label>
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
