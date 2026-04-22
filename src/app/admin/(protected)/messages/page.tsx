import { getSupabaseServer } from "@/lib/supabase/server";
import { deleteMessage, markMessageRead } from "../../actions";
import { CheckCircle2, Trash2, Clock, Mail, MessageCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

type Row = Record<string, unknown>;

export default async function AdminMessagesPage() {
  const supabase = await getSupabaseServer();
  const { data: messages = [] } = supabase
    ? await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div>
      <h1 className="heading-md text-white">Contact messages</h1>
      <p className="mt-1 text-sm text-slate-400">
        Incoming leads from the contact form. Newest first.
      </p>

      <div className="mt-8 space-y-4">
        {(messages ?? []).length === 0 ? (
          <div className="surface p-10 text-center text-slate-400">
            No messages yet.
          </div>
        ) : null}

        {((messages ?? []) as Row[]).map((m) => {
          const status = (m.status as string) ?? "new";
          const createdAt = (m.created_at as string) ?? "";
          return (
            <article key={m.id as string} className="surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-base font-semibold text-white">
                      {m.name as string}
                    </h2>
                    {status === "new" ? (
                      <span className="chip text-brand-300">New</span>
                    ) : (
                      <span className="chip">Read</span>
                    )}
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                    <a
                      href={`mailto:${m.email as string}`}
                      className="inline-flex items-center gap-1 hover:text-white"
                    >
                      <Mail className="h-3 w-3" />
                      {m.email as string}
                    </a>
                    {m.whatsapp ? (
                      <a
                        href={`https://wa.me/${(m.whatsapp as string).replace(/[^\d]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 hover:text-white"
                      >
                        <MessageCircle className="h-3 w-3" />
                        {m.whatsapp as string}
                      </a>
                    ) : null}
                    {createdAt ? (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(createdAt)}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {status === "new" ? (
                    <form action={markMessageRead}>
                      <input type="hidden" name="id" value={m.id as string} />
                      <button className="btn-secondary px-3 py-2 text-xs">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Mark read
                      </button>
                    </form>
                  ) : null}
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={m.id as string} />
                    <button className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200 hover:bg-rose-500/20">
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </form>
                </div>
              </div>

              <div className="mt-4 grid gap-2 text-xs text-slate-400 md:grid-cols-4">
                {m.company ? <Meta label="Company" value={m.company as string} /> : null}
                {m.project_type ? <Meta label="Project" value={m.project_type as string} /> : null}
                {m.budget ? <Meta label="Budget" value={m.budget as string} /> : null}
                {m.timeline ? <Meta label="Timeline" value={m.timeline as string} /> : null}
              </div>

              <p className="mt-4 whitespace-pre-wrap rounded-xl border border-white/5 bg-ink-900/50 p-4 text-sm text-slate-200">
                {m.message as string}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="mt-0.5 text-slate-200">{value}</div>
    </div>
  );
}
