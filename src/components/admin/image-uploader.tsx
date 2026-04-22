"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Loader2, X } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase/client";

type Props = {
  name: string;
  initialUrl?: string;
  bucket?: string;
  label?: string;
  folder?: string;
};

export function ImageUploader({
  name,
  initialUrl,
  bucket = "public",
  label = "Image",
  folder = "uploads",
}: Props) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = getSupabaseBrowser();

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    if (!supabase) {
      setError("Supabase not configured.");
      return;
    }
    setLoading(true);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from(bucket)
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      setUrl(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="label">{label}</label>
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-3">
        {url ? (
          <div className="relative h-20 w-28 overflow-hidden rounded-lg border border-white/10">
            <Image
              src={url}
              alt="preview"
              fill
              className="object-cover"
              sizes="112px"
              unoptimized
            />
            <button
              type="button"
              onClick={() => setUrl("")}
              className="absolute right-1 top-1 rounded-full bg-ink-950/80 p-1 text-white/80 hover:text-white"
              aria-label="Remove image"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="flex h-20 w-28 items-center justify-center rounded-lg border border-dashed border-white/15 bg-ink-900/40 text-slate-500">
            <span className="text-[10px]">No image</span>
          </div>
        )}
        <label className="btn-secondary cursor-pointer">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          Upload
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onFile}
            disabled={loading}
          />
        </label>
        <input
          type="url"
          placeholder="or paste an image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input flex-1 min-w-0"
        />
      </div>
      {error ? (
        <p className="mt-2 text-xs text-rose-300">{error}</p>
      ) : (
        <p className="mt-2 text-xs text-slate-500">
          Uploads to Supabase Storage bucket{" "}
          <code className="text-slate-300">{bucket}</code>.
        </p>
      )}
    </div>
  );
}
