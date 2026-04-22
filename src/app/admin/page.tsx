import Link from "next/link";
import {
  FolderKanban,
  Users,
  MessageSquare,
  Quote,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { getSupabaseServer } from "@/lib/supabase/server";

async function count(table: string): Promise<number | null> {
  const supabase = await getSupabaseServer();
  if (!supabase) return null;
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  if (error) return null;
  return count ?? 0;
}

export default async function AdminDashboardPage() {
  const [projects, team, testimonials, faqs, messages] = await Promise.all([
    count("projects"),
    count("team_members"),
    count("testimonials"),
    count("faqs"),
    count("contact_messages"),
  ]);

  const stats = [
    {
      label: "Projects",
      value: projects,
      href: "/admin/projects",
      icon: FolderKanban,
    },
    { label: "Team members", value: team, href: "/admin/team", icon: Users },
    {
      label: "Testimonials",
      value: testimonials,
      href: "/admin/testimonials",
      icon: Quote,
    },
    { label: "FAQs", value: faqs, href: "/admin/faqs", icon: HelpCircle },
    {
      label: "Contact messages",
      value: messages,
      href: "/admin/messages",
      icon: MessageSquare,
    },
  ];

  return (
    <div>
      <h1 className="heading-md text-white">Welcome back</h1>
      <p className="mt-1 text-sm text-slate-400">
        Manage content, review incoming messages, and keep the site fresh.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group surface surface-hover p-5"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/15 text-brand-300">
                  <Icon className="h-4 w-4" />
                </span>
                <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-white" />
              </div>
              <div className="mt-4 font-display text-3xl font-semibold text-white">
                {s.value ?? "—"}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                {s.label}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="surface p-6">
          <h2 className="text-lg font-semibold text-white">Add a new project</h2>
          <p className="mt-2 text-sm text-slate-400">
            Create a case-study page in minutes: add the project info, upload cover
            + gallery images, and publish. It appears on the portfolio
            automatically.
          </p>
          <Link href="/admin/projects/new" className="btn-primary mt-5 w-fit">
            New project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="surface p-6">
          <h2 className="text-lg font-semibold text-white">Manage team</h2>
          <p className="mt-2 text-sm text-slate-400">
            Replace placeholder bios and photos for Ahmed Reda and Ahmed Eid. Add
            new engineers any time.
          </p>
          <Link href="/admin/team" className="btn-secondary mt-5 w-fit">
            Team members <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
