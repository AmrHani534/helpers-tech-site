import { redirect } from "next/navigation";
import Link from "next/link";
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
import { getCurrentUser, isAdmin } from "@/lib/auth";
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

/**
 * Wraps every authenticated /admin route with the auth guard + sidebar chrome.
 *
 * Routes outside this (protected) group — /admin/login and /admin/logout —
 * deliberately bypass this layout so that the login page can render even when
 * the user is not yet signed in.
 */
export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }

  if (!(await isAdmin())) {
    return (
      <div className="container-app pt-40 pb-24">
        <div className="surface mx-auto max-w-xl p-10 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/15 text-rose-300">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <p className="mt-5 text-lg text-white">
            Your account <span className="font-semibold">{user?.email}</span> is not admin
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
    <div className="min-h-screen bg-ink-950">
      <header className="sticky top-0 z-30 border-b border-white/5 bg-ink-950/90 backdrop-blur-xl">
        <div className="container-app flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="hidden sm:inline">{user.email}</span>
            <Link
              href="/"
              className="text-slate-400 hover:text-white"
              title="Back to public site"
            >
              View site
            </Link>
            <form action="/admin/logout" method="post">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-200 hover:bg-white/10"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="container-app grid gap-8 py-8 pb-20 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-1">
            <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Sections
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
