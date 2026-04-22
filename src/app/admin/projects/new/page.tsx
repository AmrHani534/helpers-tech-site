import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="heading-md text-white">New project</h1>
      <p className="mt-1 text-sm text-slate-400">
        Fill in the details, upload a cover image, and publish. The project
        will appear on the portfolio automatically.
      </p>
      <div className="mt-8">
        <ProjectForm />
      </div>
    </div>
  );
}
