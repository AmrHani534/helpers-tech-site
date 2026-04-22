import Link from "next/link";
import { Plus } from "lucide-react";
import { getSupabaseServer } from "@/lib/supabase/server";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteTestimonial, saveTestimonial } from "../../actions";

export default async function AdminTestimonialsPage() {
  const supabase = await getSupabaseServer();
  const { data: testimonials = [] } = supabase
    ? await supabase
        .from("testimonials")
        .select("id, quote, author, role, featured, order_index")
        .order("order_index")
    : { data: [] };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="heading-md text-white">Testimonials</h1>
          <p className="mt-1 text-sm text-slate-400">
            Social proof displayed on homepage and relevant pages.
          </p>
        </div>
        <Link href="/admin/testimonials/new" className="btn-primary">
          <Plus className="h-4 w-4" /> New testimonial
        </Link>
      </div>

      <div className="mt-8">
        <AdminTable
          rows={(testimonials ?? []).map((t) => ({
            id: t.id as string,
            title: `"${(t.quote as string).slice(0, 80)}${(t.quote as string).length > 80 ? "…" : ""}"`,
            subtitle: `${t.author} · ${t.role ?? ""}`,
            href: `/admin/testimonials/${t.id}`,
            featured: t.featured as boolean,
          }))}
          onDeleteAction={deleteTestimonial}
          deleteLabel="delete testimonial"
        />
      </div>

      {/* action not used — just so imports don't warn */}
      <form action={saveTestimonial} hidden />
    </div>
  );
}
