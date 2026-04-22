import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { saveFaq } from "@/app/admin/actions";

type Faq = {
  id?: string;
  question?: string;
  question_ar?: string;
  answer?: string;
  answer_ar?: string;
  category?: string;
  order_index?: number;
  published?: boolean;
};

export function FaqForm({ faq }: { faq?: Faq }) {
  const isEdit = Boolean(faq?.id);
  return (
    <form action={saveFaq} className="space-y-5">
      <div className="flex items-center justify-between">
        <Link href="/admin/faqs" className="btn-ghost">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> Back
        </Link>
        <button type="submit" className="btn-primary">
          <Save className="h-4 w-4" />
          {isEdit ? "Save changes" : "Add FAQ"}
        </button>
      </div>
      {faq?.id ? <input type="hidden" name="id" value={faq.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Question *" name="question" defaultValue={faq?.question} required />
        <Field label="Question (Arabic)" name="question_ar" defaultValue={faq?.question_ar} />
      </div>

      <Textarea label="Answer *" name="answer" defaultValue={faq?.answer} required />
      <Textarea label="Answer (Arabic)" name="answer_ar" defaultValue={faq?.answer_ar} />

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Category" name="category" defaultValue={faq?.category} placeholder="Pricing / Timeline / ..." />
        <Field
          label="Order index"
          name="order_index"
          type="number"
          defaultValue={String(faq?.order_index ?? 0)}
        />
      </div>

      <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-200">
        <input
          type="checkbox"
          name="published"
          defaultChecked={faq?.published ?? true}
          className="h-4 w-4 rounded border-white/20 bg-ink-900 text-brand-500 focus:ring-brand-500"
        />
        Published
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
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
        placeholder={placeholder}
        className="input"
      />
    </div>
  );
}

function Textarea({
  label,
  name,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        rows={5}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="input resize-y"
      />
    </div>
  );
}
