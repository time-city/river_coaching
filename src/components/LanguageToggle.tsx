"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const pathname = usePathname();
  const isBlog = pathname?.startsWith("/blog");

  return (
    <div className="fixed top-3 right-3 sm:top-5 sm:right-6 z-[60] flex items-center gap-2">
      {!isBlog && (
        <Link
          href="/blog"
          className="flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-black/80 hover:bg-zinc-900 backdrop-blur-md border border-zinc-700/80 hover:border-white text-zinc-300 hover:text-white rounded-full shadow-2xl transition-all group"
          title="River Blog"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          <span>BLOG</span>
        </Link>
      )}

      <div className="flex items-center bg-black/80 backdrop-blur-md border border-zinc-700/80 p-0.5 rounded-full shadow-2xl">
        <button
          onClick={() => setLang("vi")}
          aria-label="Tiếng Việt"
          className={`px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs font-black uppercase rounded-full transition-all duration-300 ${
            lang === "vi" ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-white"
          }`}
        >
          VI
        </button>
        <button
          onClick={() => setLang("en")}
          aria-label="English"
          className={`px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs font-black uppercase rounded-full transition-all duration-300 ${
            lang === "en" ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-white"
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
}
