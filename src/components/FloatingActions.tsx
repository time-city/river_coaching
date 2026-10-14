"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-2.5 md:gap-4 pointer-events-auto">
      {/* Quick CTA Button */}
      <button 
        onClick={scrollToBooking}
        aria-label="Book Consultation"
        className="group relative flex items-center justify-center w-11 h-11 md:w-14 md:h-14 bg-white text-black rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ease-out"
      >
        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20 group-hover:opacity-40 pointer-events-none"></div>
        <span className="text-xl md:text-2xl leading-none">⚡</span>
      </button>

      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex items-center justify-center w-9 h-9 md:w-12 md:h-12 bg-zinc-900/90 backdrop-blur border border-zinc-700 text-white rounded-full shadow-xl hover:bg-zinc-800 hover:border-white transition-all duration-300"
          >
            <span className="text-xs md:text-sm font-bold">↑</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
