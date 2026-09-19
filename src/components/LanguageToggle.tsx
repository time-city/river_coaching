"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center bg-surface border border-zinc-800 p-1 rounded-sm shadow-lg">
      <button
        onClick={() => setLang("vi")}
        className={`px-3 py-1 text-sm font-bold uppercase transition-all duration-500 ease-out ${
          lang === "vi" ? "bg-white text-black" : "text-accent hover:text-white"
        }`}
      >
        VI
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1 text-sm font-bold uppercase transition-all duration-500 ease-out ${
          lang === "en" ? "bg-white text-black" : "text-accent hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
