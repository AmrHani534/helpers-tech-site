import { TestimonialForm } from "@/components/admin/testimonial-form";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="heading-md text-white">New testimonial</h1>
      <div className="mt-8">
        <TestimonialForm />
      </div>
    </div>
  );
}
