import Link from "next/link";
import { Plus } from "lucide-react";
import { getSupabaseServer } from "@/lib/supabase/server";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteFaq, seedFaqsAction } from "../../actions";

export default async function AdminFaqsPage() {
  const supabase = await getSupabaseServer();
  const { data } = supabase
    ? await supabase
        .from("faqs")
        .select("id, question, category, category_ar, published, order_index")
        .order("order_index")
    : { data: [] };
  const faqs = data ?? [];

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
        {faqs.length === 0 ? (
          <div className="surface flex flex-col items-center justify-center py-16 text-center">
            <p className="text-slate-400">Nothing here yet.</p>
            <p className="mt-2 max-w-xs text-sm text-slate-500">
              The questions you see on the public site are currently hardcoded in
              the source code.
            </p>
            <form action={async () => {
              "use server";
              const { seedFaqsAction } = await import("../../actions");
              await seedFaqsAction();
            }}>
              <button type="submit" className="btn-secondary mt-6">
                Import questions from source code
              </button>
            </form>
          </div>
        ) : (
          <AdminTable
            rows={faqs.map((f) => ({
              id: f.id as string,
              title: f.question as string,
              subtitle: [f.category, f.category_ar].filter(Boolean).join(" / "),
              href: `/admin/faqs/${f.id}`,
              published: f.published as boolean,
            }))}
            onDeleteAction={deleteFaq}
            deleteLabel="delete FAQ"
          />
        )}
      </div>
    </div>
  );
}
