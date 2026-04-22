"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { getDict, type Locale } from "@/lib/i18n";

export function WhatsAppButton({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <motion.a
      href={site.whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label={t.a11y.whatsapp}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-2xl shadow-[#25D366]/40 hover:brightness-110 transition rtl:right-auto rtl:left-5"
    >
      <MessageCircle className="h-4 w-4" />
      <span className="hidden sm:inline">{t.whatsapp.label}</span>
    </motion.a>
  );
}
