import { notFound } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { ProjectForm } from "@/components/admin/project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await getSupabaseServer();
  if (!supabase) notFound();
  const { data } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div>
      <h1 className="heading-md text-white">Edit project</h1>
      <p className="mt-1 text-sm text-slate-400">
        Slug: <code className="text-slate-300">/{data.slug as string}</code>
      </p>
      <div className="mt-8">
        <ProjectForm
          project={{
            id: data.id as string,
            title: data.title as string,
            title_ar: data.title_ar as string,
            slug: data.slug as string,
            category: data.category as string,
            industry: data.industry as string,
            year: data.year as string,
            summary: data.summary as string,
            summary_ar: data.summary_ar as string,
            challenge: data.challenge as string,
            solution: data.solution as string,
            results: (data.results as string[]) ?? [],
            tech_stack: (data.tech_stack as string[]) ?? [],
            cover_image: data.cover_image as string,
            live_url: data.live_url as string,
            featured: data.featured as boolean,
            published: data.published as boolean,
            order_index: data.order_index as number,
            testimonial_quote: data.testimonial_quote as string,
            testimonial_author: data.testimonial_author as string,
            testimonial_role: data.testimonial_role as string,
          }}
        />
      </div>
    </div>
  );
}
