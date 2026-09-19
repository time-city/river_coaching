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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Quick CTA Button */}
      <button 
        onClick={scrollToBooking}
        className="group relative flex items-center justify-center w-14 h-14 bg-white text-black rounded-full shadow-lg hover:scale-110 transition-all duration-500 ease-out"
      >
        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
        <span className="text-2xl">⚡</span>
      </button>

      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={scrollToTop}
            className="flex items-center justify-center w-12 h-12 bg-surface border border-zinc-700 text-white rounded-full shadow-lg hover:bg-zinc-800 hover:border-white transition-all duration-500 ease-out"
          >
            <span>↑</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
