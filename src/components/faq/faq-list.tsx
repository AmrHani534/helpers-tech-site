"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Faq } from "@/lib/data/faqs";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function FaqList({ faqs, locale }: { faqs: Faq[]; locale: Locale }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const isAr = locale === "ar";

  return (
    <ul className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-ink-900/50 backdrop-blur">
      {faqs.map((faq) => {
        const open = openId === faq.id;
        return (
          <li key={faq.id}>
            <button
              type="button"
              onClick={() => setOpenId(open ? null : faq.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              aria-expanded={open}
            >
              <span className="text-[15px] font-medium text-white">
                {isAr && faq.question_ar ? faq.question_ar : faq.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 flex-none text-slate-400 transition-transform duration-300",
                  open && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-sm leading-relaxed text-slate-400">
                    {isAr && faq.answer_ar ? faq.answer_ar : faq.answer}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
