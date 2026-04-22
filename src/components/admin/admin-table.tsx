import Link from "next/link";
import { Edit3, Eye, EyeOff, Star, StarOff, Trash2 } from "lucide-react";

export type AdminRow = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  featured?: boolean;
  published?: boolean;
  badge?: string;
};

export function AdminTable({
  rows,
  onDeleteAction,
  deleteLabel = "delete",
}: {
  rows: AdminRow[];
  onDeleteAction?: (formData: FormData) => Promise<void>;
  deleteLabel?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="surface p-10 text-center">
        <p className="text-slate-400">Nothing here yet.</p>
      </div>
    );
  }
  return (
    <ul className="surface divide-y divide-white/5">
      {rows.map((row) => (
        <li
          key={row.id}
          className="flex flex-wrap items-center gap-3 px-5 py-4"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Link
                href={row.href}
                className="truncate text-sm font-medium text-white hover:text-brand-300"
              >
                {row.title}
              </Link>
              {row.featured ? (
                <Star className="h-3.5 w-3.5 text-amber-300" />
              ) : (
                <StarOff className="h-3.5 w-3.5 text-slate-600" />
              )}
              {row.published === false ? (
                <EyeOff className="h-3.5 w-3.5 text-slate-500" />
              ) : row.published === true ? (
                <Eye className="h-3.5 w-3.5 text-emerald-400" />
              ) : null}
              {row.badge ? <span className="chip">{row.badge}</span> : null}
            </div>
            {row.subtitle ? (
              <p className="truncate text-xs text-slate-500">{row.subtitle}</p>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={row.href}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
              aria-label="Edit"
            >
              <Edit3 className="h-3.5 w-3.5" />
            </Link>
            {onDeleteAction ? (
              <form action={onDeleteAction}>
                <input type="hidden" name="id" value={row.id} />
                <button
                  type="submit"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                  aria-label={`Confirm ${deleteLabel}`}
                  title={`Click to ${deleteLabel}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </form>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
