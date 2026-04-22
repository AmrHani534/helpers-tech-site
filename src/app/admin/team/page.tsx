import Link from "next/link";
import { Plus } from "lucide-react";
import { getSupabaseServer } from "@/lib/supabase/server";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteTeam } from "../actions";

export default async function AdminTeamPage() {
  const supabase = await getSupabaseServer();
  const { data: team = [] } = supabase
    ? await supabase
        .from("team_members")
        .select("id, name, slug, role, featured, placeholder, order_index")
        .order("order_index")
    : { data: [] };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="heading-md text-white">Team</h1>
          <p className="mt-1 text-sm text-slate-400">
            Add engineers, replace placeholders, reorder at will.
          </p>
        </div>
        <Link href="/admin/team/new" className="btn-primary">
          <Plus className="h-4 w-4" /> New member
        </Link>
      </div>

      <div className="mt-8">
        <AdminTable
          rows={(team ?? []).map((m) => ({
            id: m.id as string,
            title: m.name as string,
            subtitle: m.role as string,
            href: `/admin/team/${m.id}`,
            featured: m.featured as boolean,
            badge: m.placeholder ? "Placeholder" : undefined,
          }))}
          onDeleteAction={deleteTeam}
          deleteLabel="delete member"
        />
      </div>
    </div>
  );
}
