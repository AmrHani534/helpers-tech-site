"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Save } from "lucide-react";

export function SaveSettingsButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Save className="h-4 w-4" />
      )}
      {pending ? "Saving..." : "Save settings"}
    </button>
  );
}
