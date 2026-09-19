"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ChevronRight, QrCode } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function PromoModal() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("lose");

  useEffect(() => {
    // Pre-fill from calculator if available
    const savedHeight = sessionStorage.getItem('calc_height');
    const savedWeight = sessionStorage.getItem('calc_weight');
    if (savedHeight) setHeight(savedHeight);
    if (savedWeight) setWeight(savedWeight);
    
    // Check if the user has already seen or closed it recently
    const hasSeenPromo = sessionStorage.getItem('promoSeen');
    
    if (!hasSeenPromo) {
      // Show popup after 3.5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStep(1); // Reset to first step if opened manually
    };
    window.addEventListener('openPromoModal', handleOpen);
    return () => window.removeEventListener('openPromoModal', handleOpen);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    sessionStorage.setItem('promoSeen', 'true');
  };

  const handleNextStep = () => {
    if (step === 2) {
      // Validate basic form before moving to payment
      if (!name || !phone) return;
    }
    setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/50 text-zinc-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Step 1: Promo / Ad */}
            {step === 1 && (
              <div className="flex flex-col h-full overflow-y-auto">
                <div className="relative w-full h-48 md:h-64 bg-zinc-900 shrink-0">
                  <img
                    src="/discipline.jpeg"
                    alt="Promo"
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                </div>
                
                <div className="p-6 md:p-8 flex flex-col grow">
                  <span className="text-zinc-400 font-bold tracking-widest uppercase text-xs mb-2">
                    {(t.promo as any).subtitle}
                  </span>
                  <h3 className="font-impact text-3xl md:text-4xl text-white uppercase tracking-tighter leading-none mb-6">
                    {(t.promo as any).title}
                  </h3>
                  
                  <div className="flex flex-col gap-3 mb-8">
                    {((t.promo as any).features as string[]).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                        <span className="text-zinc-300 text-sm md:text-base font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="mt-auto w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                  >
                    {(t.promo as any).cta1} <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Information Form */}
            {step === 2 && (
              <div className="p-6 md:p-8 flex flex-col h-full overflow-y-auto">
                <h3 className="font-impact text-2xl md:text-3xl text-white uppercase tracking-widest mb-6">
                  {(t.promo as any).formTitle}
                </h3>

                <div className="flex flex-col gap-5 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                      {(t.promo as any).formName} *
                    </label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-sm p-3 text-white focus:outline-none focus:border-white transition-colors"
                      placeholder="e.g. Nguyen Van A"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                      {(t.promo as any).formPhone} *
                    </label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-sm p-3 text-white focus:outline-none focus:border-white transition-colors"
                      placeholder="0912 345 678"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                        {(t.promo as any).formHeight}
                      </label>
                      <input 
                        type="number" 
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-sm p-3 text-white focus:outline-none focus:border-white transition-colors"
                        placeholder="cm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                        {(t.promo as any).formWeight}
                      </label>
                      <input 
                        type="number" 
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-sm p-3 text-white focus:outline-none focus:border-white transition-colors"
                        placeholder="kg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                      {(t.promo as any).formGoal}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setGoal('lose')}
                        className={`py-3 px-4 border rounded-sm font-bold text-sm transition-colors ${goal === 'lose' ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-400 border-zinc-800'}`}
                      >
                        {(t.promo as any).goalLose}
                      </button>
                      <button 
                        onClick={() => setGoal('gain')}
                        className={`py-3 px-4 border rounded-sm font-bold text-sm transition-colors ${goal === 'gain' ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-400 border-zinc-800'}`}
                      >
                        {(t.promo as any).goalGain}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  disabled={!name || !phone}
                  className="mt-auto w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {(t.promo as any).cta2}
                </button>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="p-6 md:p-8 flex flex-col items-center h-full overflow-y-auto text-center">
                <h3 className="font-impact text-2xl md:text-3xl text-white uppercase tracking-widest mb-2">
                  {(t.promo as any).payTitle}
                </h3>
                <p className="text-zinc-400 text-sm mb-6">{(t.promo as any).payDesc}</p>

                {/* QR Code Placeholder */}
                <div className="w-48 h-48 bg-white p-2 rounded-xl mb-6 flex items-center justify-center flex-col gap-2">
                  <QrCode className="w-16 h-16 text-black" />
                  <span className="text-black font-bold text-xs">QR MÃ NGÂN HÀNG</span>
                  {/* <img src="/qr-code.png" alt="QR Code" className="w-full h-full object-cover" /> */}
                </div>

                <div className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-lg mb-8 text-left">
                  <p className="text-white font-bold mb-2">{(t.promo as any).payAmount}</p>
                  <p className="text-zinc-400 text-sm">{(t.promo as any).payContent}</p>
                  <p className="text-white font-mono bg-black p-2 mt-1 rounded border border-zinc-800 break-all text-sm">
                    {name} {phone}
                  </p>
                </div>

                <button
                  onClick={handleNextStep}
                  className="mt-auto w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-sm hover:bg-zinc-200 transition-colors"
                >
                  {(t.promo as any).cta3}
                </button>
              </div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="p-6 md:p-12 flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                
                <h3 className="font-impact text-2xl md:text-3xl text-white uppercase tracking-widest mb-4">
                  {(t.promo as any).successTitle}
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-8">
                  {(t.promo as any).successDesc}
                </p>

                <button
                  onClick={closeModal}
                  className="w-full py-4 border border-zinc-700 text-white font-bold uppercase tracking-widest rounded-sm hover:bg-zinc-800 transition-colors"
                >
                  {(t.promo as any).ctaClose}
                </button>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
