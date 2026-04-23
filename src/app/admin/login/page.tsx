"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn, Mail, AlertCircle, CheckCircle2 } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const supabase = getSupabaseBrowser();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError("Supabase is not configured. Add your env vars first.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (mode === "password") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/admin");
        router.refresh();
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          },
        });
        if (error) throw error;
        setSent(true);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Sign in failed. Check your credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-20">
      <div className="w-full max-w-md px-5">
        <div className="surface p-8 md:p-10">
          <h1 className="heading-md text-white">Admin sign in</h1>


          <div className="mt-6 flex rounded-full border border-white/10 p-1 text-xs font-medium">
            {(["password", "magic"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError(null);
                  setSent(false);
                }}
                className={`flex-1 rounded-full px-3 py-2 transition ${
                  mode === m
                    ? "bg-brand-500 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {m === "password" ? "Password" : "Magic link"}
              </button>
            ))}
          </div>

          {sent ? (
            <div className="mt-6 flex flex-col items-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-5 text-center">
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              <p className="mt-2 text-sm text-emerald-100">
                Magic link sent. Check your inbox at{" "}
                <span className="font-medium text-white">{email}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="you@helpers-tech.com"
                />
              </div>
              {mode === "password" ? (
                <div>
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    placeholder="••••••••"
                  />
                </div>
              ) : null}

              {error ? (
                <div className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : mode === "password" ? (
                  <>
                    <LogIn className="h-4 w-4" />
                    Sign in
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4" />
                    Email me a magic link
                  </>
                )}
              </button>
            </form>
          )}


        </div>
      </div>
    </div>
  );
}
