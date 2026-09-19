"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader() {
  const [phase, setPhase] = useState<'strike' | 'reveal' | 'done'>('strike');

  useEffect(() => {
    // Phase 1: Tia sét lóe lên (kéo dài 600ms)
    const strikeTimer = setTimeout(() => {
      setPhase('reveal');
    }, 600);

    // Phase 2: Mở màn (kéo dài 800ms) -> kết thúc sau tổng cộng 1.4s
    const revealTimer = setTimeout(() => {
      setPhase('done');
    }, 600 + 800);

    return () => {
      clearTimeout(strikeTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  // Phase 3: Unmount hoàn toàn component để trả lại tương tác cho user
  if (phase === 'done') return null;

  // Custom Easing cực mạnh, cảm giác rạch đôi màn hình dứt khoát
  const easeCurtain: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    // z-[9999] để đảm bảo luôn đè lên mọi thứ trên web
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
      
      {/* 
        MÀN BÊN TRÁI 
        Bình thường nằm im (x: 0), khi sang phase 'reveal' sẽ trượt hoàn toàn sang trái
      */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: phase === 'reveal' ? "-100%" : "0%" }}
        transition={{ duration: 0.8, ease: easeCurtain }}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#0a0a0a] origin-left"
      />

      {/* 
        MÀN BÊN PHẢI 
        Bình thường nằm im (x: 0), khi sang phase 'reveal' sẽ trượt hoàn toàn sang phải
      */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: phase === 'reveal' ? "100%" : "0%" }}
        transition={{ duration: 0.8, ease: easeCurtain }}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#0a0a0a] origin-right"
      />

      {/* TIA SÉT (LIGHTNING STRIKE) */}
      <AnimatePresence>
        {phase === 'strike' && (
          <motion.div
            initial={{ opacity: 0, scale: 5, rotate: 15 }}
            animate={{ 
              opacity: [0, 1, 0.2, 1, 1], // Flash effect
              scale: [5, 1, 1.2, 1, 1],   // Đập mạnh từ to xuống nhỏ
              rotate: [15, 0, -5, 0, 0]   // Rung nhẹ
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: 0.5, 
              times: [0, 0.15, 0.25, 0.35, 1], // Keyframes control sự giật chớp
              ease: "easeOut" 
            }}
            className="absolute z-10 flex items-center justify-center pointer-events-none"
          >
            <svg 
              className="w-40 h-40 md:w-56 md:h-56 text-[#fbbf24] drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]"
              viewBox="-5 -5 110 120" 
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left Arc */}
              <path d="M 36.3 12.4 A 40 40 0 0 0 30 84.6" fill="none" stroke="currentColor" strokeWidth="4" />
              
              {/* Right Arc */}
              <path d="M 78.3 21.7 A 40 40 0 0 1 55 89.6" fill="none" stroke="currentColor" strokeWidth="4" />
              
              {/* Lightning Bolt */}
              <polygon points="46,7 70,-5 60,25 72,19 60,55 72,49 34,109 46,67 34,73 46,37 34,43" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
