"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const vietnameseNames = [
  "Thành C.", "Minh T.", "Hoàng L.", "Duy K.", "Nhật P.",
  "Đức M.", "Hải Đ.", "Long V.", "Tuấn A.", "Khoa N.",
  "Sang B.", "Thái S.", "Việt H."
];

const timeAgoVi = ["Vừa xong", "1 phút trước", "2 phút trước", "5 phút trước", "10 phút trước"];
const timeAgoEn = ["Just now", "1 min ago", "2 mins ago", "5 mins ago", "10 mins ago"];

export default function SalesPopup() {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSale, setCurrentSale] = useState({ name: "", time: "" });
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    let hideTimer: NodeJS.Timeout;
    let loopTimer: NodeJS.Timeout;

    const showNextSale = () => {
      const randomName = vietnameseNames[Math.floor(Math.random() * vietnameseNames.length)];
      const randomTimeVi = timeAgoVi[Math.floor(Math.random() * timeAgoVi.length)];
      const randomTimeEn = timeAgoEn[Math.floor(Math.random() * timeAgoEn.length)];
      
      setCurrentSale({ 
        name: randomName, 
        time: lang === 'vi' ? randomTimeVi : randomTimeEn 
      });
      setIsVisible(true);

      // Hide after 5 seconds
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Initial delay before first popup
    const initialTimer = setTimeout(() => {
      showNextSale();
      
      // After first popup, loop every 15-20 seconds
      loopTimer = setInterval(() => {
        if (!isDismissed) {
          showNextSale();
        }
      }, Math.floor(Math.random() * 10000) + 15000);

    }, 3000);


    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearInterval(loopTimer);
    };
  }, [lang, isDismissed]);

  const message = lang === 'vi' 
    ? "vừa đăng ký Giáo án Online 699k" 
    : "just bought the 699k Online Plan";

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-6 z-50 max-w-sm w-[90%] md:w-auto"
        >
          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4 shadow-2xl flex gap-4 items-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-white"></div>
            
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              <ShoppingBag className="w-5 h-5 text-black" />
            </div>
            
            <div className="flex-1 pr-4">
              <p className="text-sm text-zinc-300 leading-tight">
                <span className="font-bold text-white">{currentSale.name}</span> {message}
              </p>
              <p className="text-xs text-zinc-500 mt-1 font-medium">{currentSale.time}</p>
            </div>

            <button 
              onClick={() => {
                setIsVisible(false);
                setIsDismissed(true);
              }}
              className="absolute top-2 right-2 text-zinc-500 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
