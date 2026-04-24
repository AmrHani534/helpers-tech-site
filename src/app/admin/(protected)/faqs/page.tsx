import Link from "next/link";
import { Plus } from "lucide-react";
import { getSupabaseServer } from "@/lib/supabase/server";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteFaq } from "../../actions";

export default async function AdminFaqsPage() {
  const supabase = await getSupabaseServer();
  const { data: faqs = [] } = supabase
    ? await supabase
        .from("faqs")
        .select("id, question, category, category_ar, published, order_index")
        .order("order_index")
    : { data: [] };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="heading-md text-white">FAQs</h1>
          <p className="mt-1 text-sm text-slate-400">
            Answers shown on the FAQ page and homepage.
          </p>
        </div>
        <Link href="/admin/faqs/new" className="btn-primary">
          <Plus className="h-4 w-4" /> New FAQ
        </Link>
      </div>

      <div className="mt-8">
        <AdminTable
          rows={(faqs ?? []).map((f) => ({
            id: f.id as string,
            title: f.question as string,
            subtitle: [f.category, f.category_ar].filter(Boolean).join(" / "),
            href: `/admin/faqs/${f.id}`,
            published: f.published as boolean,
          }))}
          onDeleteAction={deleteFaq}
          deleteLabel="delete FAQ"
        />
      </div>
    </div>
  );
}
