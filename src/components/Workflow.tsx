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
        
        <h2 className="font-impact text-5xl md:text-6xl uppercase tracking-tighter leading-none mb-16">
          {(t as any).workflow?.title || "YOUR ROADMAP TO SUCCESS"}
        </h2>
        
        <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-4 mt-12">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-zinc-800 z-0"></div>

          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
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
