import { notFound } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await getSupabaseServer();
  if (!supabase) notFound();
  const { data } = await supabase.from("testimonials").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div>
      <h1 className="heading-md text-white">Edit testimonial</h1>
      <div className="mt-8">
        <TestimonialForm
          testimonial={{
            id: data.id as string,
            quote: data.quote as string,
            quote_ar: data.quote_ar as string,
            author: data.author as string,
            role: data.role as string,
            company: data.company as string,
            rating: data.rating as number,
            featured: data.featured as boolean,
            order_index: data.order_index as number,
          }}
        />
      </div>
    </div>
  );
}
