import { TeamForm } from "@/components/admin/team-form";

export default function NewTeamPage() {
  return (
    <div>
      <h1 className="heading-md text-white">Add team member</h1>
      <div className="mt-8">
        <TeamForm />
      </div>
    </div>
  );
}
