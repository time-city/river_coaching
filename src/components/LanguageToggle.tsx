"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="fixed top-3 right-3 sm:top-5 sm:right-6 z-[60] flex items-center bg-black/80 backdrop-blur-md border border-zinc-700/80 p-0.5 rounded-full shadow-2xl">
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
  );
}
