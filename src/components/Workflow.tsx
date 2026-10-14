"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, FileEdit, Activity } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function Workflow() {
  const { t } = useLanguage();
  
  const steps = [
    {
      id: 1,
      icon: <Target className="w-8 h-8 text-[#0a0a0a]" />,
      title: (t as any).workflow?.step1 || "Dial In Strategy",
      desc: (t as any).workflow?.step1Desc || "Comprehensive consultation and assessment."
    },
    {
      id: 2,
      icon: <FileEdit className="w-8 h-8 text-[#0a0a0a]" />,
      title: (t as any).workflow?.step2 || "Custom Blueprint",
      desc: (t as any).workflow?.step2Desc || "Personalized nutrition & training protocol."
    },
    {
      id: 3,
      icon: <Activity className="w-8 h-8 text-[#0a0a0a]" />,
      title: (t as any).workflow?.step3 || "Execution & Check-ins",
      desc: (t as any).workflow?.step3Desc || "Daily tracking and weekly form checks."
    }
  ];

  return (
    <section className="w-full py-24 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-impact text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-[1.15] md:leading-[1.1] mb-12 md:mb-16"
        >
          {(t as any).workflow?.title || "YOUR ROADMAP TO SUCCESS"}
        </motion.h2>
        
        <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-4 mt-12">
          
          {/* Connecting Line (Desktop Only) */}
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-zinc-800 z-0 origin-left"
          />

          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex flex-col items-center w-full max-w-xs mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg mb-6 hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="font-sans font-bold text-xl uppercase tracking-widest text-white mb-3">
                {step.title}
              </h3>
              <p className="font-sans text-zinc-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
