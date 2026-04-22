import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  MessageSquare,
  Quote,
  HelpCircle,
  Settings,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getCurrentUser, isAdmin, getAdminEmails } from "@/lib/auth";
import { Logo } from "@/components/site/logo";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/site-settings", label: "Site settings", icon: Settings },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="container-app pt-40 pb-24">
        <div className="surface mx-auto max-w-xl p-10 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/15 text-amber-300">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h1 className="mt-5 heading-md text-white">Admin is not configured</h1>
          <p className="mt-3 text-sm text-slate-400">
            Set <code className="text-amber-300">NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
            <code className="text-amber-300">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>,
            and <code className="text-amber-300">SUPABASE_SERVICE_ROLE_KEY</code> in
            your environment, run the SQL migration, then come back here to log in.
          </p>
          <Link href="/" className="btn-secondary mt-6">
            Back to site
          </Link>
        </div>
      </div>
    );
  }

  // If the request is on /admin/login we short-circuit — the login page itself
  // handles auth redirects.
  const path = (await cookies()).get("__next_path")?.value ?? "";
  const onLogin = path.startsWith("/admin/login");

  const user = await getCurrentUser();
  if (!user && !onLogin) {
    redirect("/admin/login");
  }

  if (user && !(await isAdmin())) {
    return (
      <div className="container-app pt-40 pb-24">
        <div className="surface mx-auto max-w-xl p-10 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/15 text-rose-300">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h1 className="mt-5 heading-md text-white">Not authorized</h1>
          <p className="mt-3 text-sm text-slate-400">
            Your account <span className="text-white">{user?.email}</span> is not in
            the admin allowlist. Add it to <code className="text-amber-300">ADMIN_EMAILS</code>{" "}
            to gain access.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Current allowlist: {getAdminEmails().join(", ") || "(empty)"}
          </p>
          <form action="/admin/logout" method="post">
            <button className="btn-secondary mt-6" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-950 pt-20">
      <div className="container-app grid gap-8 pb-20 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-1">
            <div className="mb-5 flex items-center gap-2">
              <Logo className="" />
            </div>
            <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Admin
            </p>
            {nav.map((n) => {
              const Icon = n.icon;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  <Icon className="h-4 w-4 text-slate-500" />
                  {n.label}
                </Link>
              );
            })}
            <form action="/admin/logout" method="post" className="pt-4">
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>
        </aside>
        <section className="min-w-0">
          <div className="mb-6 flex items-center gap-2 overflow-x-auto lg:hidden">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/10"
              >
                {n.label}
              </Link>
            ))}
          </div>
          {children}
        </section>
      </div>
    </div>
  );
}
