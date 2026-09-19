"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-24 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[4/5] bg-zinc-900 rounded-sm overflow-hidden"
          >
            {/* Replace src with a real training image. Using placeholder logic for high-res images */}
            <img 
              src="/discipline.jpeg" 
              alt="Coach Training" 
              className="w-full h-full object-cover object-[80%_30%]"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
          </motion.div>

          {/* Right Column - Text */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-impact text-5xl md:text-6xl uppercase tracking-tighter leading-none mb-6">
              {(t as any).about?.title || "THE DISCIPLINE BEHIND THE RESULTS"}
            </h2>
            
            <div className="w-16 h-1 bg-white mb-8"></div>
            
            <p className="text-zinc-400 font-sans text-base md:text-lg leading-relaxed mb-8">
              {(t as any).about?.story || "From a desk-bound IT professional to a competitive Men's Physique athlete, my journey is built on one core principle: Discipline. I understand the struggles of balancing a demanding career with fitness goals because I've lived it. Now, I engineer high-performance systems for your body, turning guesswork into science."}
            </p>
            
            <div className="mt-4 border-l-4 border-white pl-4 py-2">
              <p className="font-impact text-xl md:text-2xl text-white tracking-widest uppercase">
                {(t as any).about?.signature || "— River, Elite Coach"}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
