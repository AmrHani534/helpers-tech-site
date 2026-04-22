import { notFound } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { FaqForm } from "@/components/admin/faq-form";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await getSupabaseServer();
  if (!supabase) notFound();
  const { data } = await supabase.from("faqs").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div>
      <h1 className="heading-md text-white">Edit FAQ</h1>
      <div className="mt-8">
        <FaqForm
          faq={{
            id: data.id as string,
            question: data.question as string,
            question_ar: data.question_ar as string,
            answer: data.answer as string,
            answer_ar: data.answer_ar as string,
            category: data.category as string,
            order_index: data.order_index as number,
            published: data.published as boolean,
          }}
        />
      </div>
    </div>
  );
}
