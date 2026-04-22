import { notFound } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { TeamForm } from "@/components/admin/team-form";

export default async function EditTeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await getSupabaseServer();
  if (!supabase) notFound();
  const { data } = await supabase.from("team_members").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  const socials = (data.socials as { linkedin?: string; email?: string }) ?? {};

  return (
    <div>
      <h1 className="heading-md text-white">Edit team member</h1>
      <div className="mt-8">
        <TeamForm
          member={{
            id: data.id as string,
            name: data.name as string,
            name_ar: data.name_ar as string,
            slug: data.slug as string,
            role: data.role as string,
            role_ar: data.role_ar as string,
            bio: data.bio as string,
            bio_ar: data.bio_ar as string,
            photo: data.photo as string,
            featured: data.featured as boolean,
            placeholder: data.placeholder as boolean,
            order_index: data.order_index as number,
            linkedin: socials.linkedin,
            email: socials.email,
          }}
        />
      </div>
    </div>
  );
}
