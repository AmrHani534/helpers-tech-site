import { FaqForm } from "@/components/admin/faq-form";

export default function NewFaqPage() {
  return (
    <div>
      <h1 className="heading-md text-white">New FAQ</h1>
      <div className="mt-8">
        <FaqForm />
      </div>
    </div>
  );
}
