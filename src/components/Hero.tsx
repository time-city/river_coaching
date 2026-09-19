"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Dumbbell, ClipboardList, CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-screen md:h-screen bg-[#0a0a0a] flex flex-col md:block overflow-hidden font-sans pt-24 md:pt-0">

      {/* Deep Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[22vw] md:text-[20vw] font-impact tracking-widest leading-none text-white opacity-5 select-none whitespace-nowrap">
          {t.hero.background}
        </h1>
      </div>

      {/* Vignette Shadow from edges */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#050505_100%)]"></div>

      {/* Container */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 h-full flex flex-col md:block">

        {/* Left Content Panel */}
        <div className="flex flex-col items-start md:absolute md:left-6 lg:left-12 md:top-1/2 md:-translate-y-1/2 z-20 mt-4 md:mt-0 w-full md:w-[35%] lg:w-[30%]">
          <h2 className="font-impact text-5xl lg:text-6xl xl:text-7xl tracking-tighter leading-[1.1] uppercase text-white">
            {t.hero.title1}<br />
            {t.hero.title2}
          </h2>
          <p className="font-sans text-zinc-400 mt-6 text-sm md:text-base leading-relaxed max-w-sm">
            {t.hero.description}
          </p>
          
          {/* CTAs moved to Left Panel */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full">
            <button
              onClick={() => window.dispatchEvent(new Event('openPromoModal'))}
              className="w-full sm:w-auto font-sans font-bold text-black uppercase px-6 py-4 bg-white border border-white hover:bg-zinc-200 hover:border-zinc-200 transition-all duration-300 hover:scale-105 rounded-sm tracking-widest shadow-2xl whitespace-nowrap text-sm"
            >
              {t.hero.cta1}
            </button>
            <button
              onClick={() => document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto font-sans font-bold text-white uppercase px-6 py-4 bg-transparent border border-white hover:bg-zinc-900 transition-all duration-300 rounded-sm tracking-widest whitespace-nowrap text-sm"
            >
              {t.hero.cta3}
            </button>
          </div>
        </div>

        {/* Center Portrait */}
        <div className="relative w-full flex justify-center md:absolute md:left-[52%] md:-translate-x-1/2 md:bottom-0 md:h-screen z-10 mt-16 md:mt-0 pointer-events-none">
          <div className="relative w-full max-w-[350px] md:max-w-none md:w-auto h-full aspect-[3/4] md:aspect-auto flex justify-center pointer-events-auto transform lg:scale-[1.15] origin-bottom">
            <img
              src="/IMG_2089-Photoroom.png"
              alt="Coach River"
              className="w-full md:w-auto h-full object-cover object-bottom"
            />
            {/* Fade at bottom */}
            <div className="absolute inset-x-0 bottom-[-2px] h-[40%] bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right Content Panel (Badges Showcase) */}
        <div className="flex flex-col items-center md:items-end justify-center gap-6 mt-8 pb-24 md:pb-0 md:mt-0 md:absolute md:right-6 lg:right-12 md:top-1/2 md:-translate-y-1/2 z-20 w-full md:w-[35%] lg:w-[30%]">
          
          <div className="flex flex-col gap-4 w-full max-w-[280px]">
            <div className="p-4 border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm rounded-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Laptop className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-widest uppercase">{t.hero.badge1}</p>
                <p className="text-zinc-500 text-xs mt-1 font-medium">{(t.hero as any).badge1Sub}</p>
              </div>
            </div>

            <div className="p-4 border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm rounded-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-widest uppercase">{t.hero.badge2}</p>
                <p className="text-zinc-500 text-xs mt-1 font-medium">{(t.hero as any).badge2Sub}</p>
              </div>
            </div>

            <div className="p-4 border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm rounded-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-widest uppercase">{t.hero.badge3}</p>
                <p className="text-zinc-500 text-xs mt-1 font-medium">{(t.hero as any).badge3Sub}</p>
              </div>
            </div>
            
            <div className="mt-6 border-l-2 border-white pl-5 py-2 hidden md:flex flex-col gap-3">
              <p className="text-white text-base font-bold tracking-wide flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" /> 
                <span>{t.hero.role}</span>
              </p>
              <p className="text-white text-base font-bold tracking-wide flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" /> 
                <span>{t.hero.awards}</span>
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Marquee Banner at the bottom */}
      <div className="absolute bottom-0 left-0 w-full bg-[#0a0a0a] border-t border-zinc-800 z-40 overflow-hidden py-3">
        <motion.div
          className="flex whitespace-nowrap gap-12 items-center w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {/* Repeat content for smooth infinite scrolling */}
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-2 text-zinc-300 text-sm uppercase tracking-widest font-sans font-medium">
                <Laptop className="w-4 h-4 text-white" />
                <span>{t.hero.badge1}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div>

              <div className="flex items-center gap-2 text-zinc-300 text-sm uppercase tracking-widest font-sans font-medium">
                <Dumbbell className="w-4 h-4 text-white" />
                <span>{t.hero.badge2}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div>

              <div className="flex items-center gap-2 text-zinc-300 text-sm uppercase tracking-widest font-sans font-medium">
                <ClipboardList className="w-4 h-4 text-white" />
                <span>{t.hero.badge3}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
