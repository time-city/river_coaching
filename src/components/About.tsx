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
            <h2 className="font-impact text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-[1.15] md:leading-[1.1] mb-6">
              {(t as any).about?.title || "THE DISCIPLINE BEHIND THE RESULTS"}
            </h2>
            
            <div className="w-16 h-1 bg-white mb-8"></div>
            
            <div className="text-zinc-400 font-sans text-base md:text-lg leading-relaxed mb-8 space-y-4">
              {(((t as any).about?.story || "Từ một cậu bé 1m7 chỉ nặng vỏn vẹn 40kg đến một vận động viên Men's Physique chuyên nghiệp, hành trình lột xác của tôi được xây dựng trên một nguyên tắc cốt lõi: Kỷ luật.\n\nTrải qua 5 năm rèn luyện thực chiến và 2 năm trực tiếp đồng hành cùng các học viên, tôi hiểu rõ cách cơ thể vận hành và những rào cản bạn đang gặp phải. Ở đây không có những lời động viên sáo rỗng hay các bài tập rập khuôn. Từ kinh nghiệm bứt phá giới hạn của chính mình, tôi thiết kế các hệ thống tập luyện và dinh dưỡng cá nhân hóa, giúp bạn biến những phỏng đoán mơ hồ thành khoa học chính xác.\n\nHành trình của bạn, hệ thống của tôi."))
                .split("\n\n")
                .map((paragraph: string, idx: number, arr: string[]) => (
                  <p 
                    key={idx} 
                    className={idx === arr.length - 1 ? "text-white font-semibold italic tracking-wide pt-1" : ""}
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
            
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
