import Link from "next/link";
import { Plus } from "lucide-react";
import { getSupabaseServer } from "@/lib/supabase/server";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteProject } from "../../actions";

export default async function AdminProjectsPage() {
  const supabase = await getSupabaseServer();
  const { data: projects = [] } = supabase
    ? await supabase
        .from("projects")
        .select("id, title, slug, category, featured, published, order_index")
        .order("order_index")
    : { data: [] };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="heading-md text-white">Projects</h1>
          <p className="mt-1 text-sm text-slate-400">
            Create case-study pages. Published projects appear on the portfolio
            automatically.
          </p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          New project
        </Link>
      </div>

      <div className="mt-8">
        <AdminTable
          rows={(projects ?? []).map((p) => ({
            id: p.id as string,
            title: p.title as string,
            subtitle: `/${p.slug} · ${p.category ?? ""}`,
            href: `/admin/projects/${p.id}`,
            featured: p.featured as boolean,
            published: p.published as boolean,
          }))}
          onDeleteAction={deleteProject}
          deleteLabel="delete project"
        />
      </div>
    </div>
  );
}
