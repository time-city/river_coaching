"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, CheckCircle2, Copy } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function ConsultModal() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState<"lose" | "gain" | "other">("lose");
  const [customGoal, setCustomGoal] = useState("");
  
  // Submission & feedback state
  const [submitted, setSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [zaloLink, setZaloLink] = useState("");
  const [fullMessage, setFullMessage] = useState("");
  
  // Zalo phone number of Coach River (synced with Footer 0903536212)
  const ZALO_PHONE = process.env.NEXT_PUBLIC_ZALO_PHONE || "0903536212"; 

  useEffect(() => {
    const handleOpen = () => {
      // Pre-fill from calculator if available
      const savedHeight = sessionStorage.getItem('calc_height');
      const savedWeight = sessionStorage.getItem('calc_weight');
      if (savedHeight) setHeight(savedHeight);
      if (savedWeight) setWeight(savedWeight);
      
      setSubmitted(false);
      setIsCopied(false);
      setIsOpen(true);
    };
    
    window.addEventListener('openConsultModal', handleOpen);
    return () => window.removeEventListener('openConsultModal', handleOpen);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setIsCopied(false);
    }, 300);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) return;
    
    // Resolve goal text: if other, use customGoal if provided, else fallback to "Other" label
    const goalText = goal === 'lose' ? (t.consult as any).goalLose 
                   : goal === 'gain' ? (t.consult as any).goalGain 
                   : (customGoal.trim() ? customGoal.trim() : (t.consult as any).goalOther);
                   
    const isEn = lang === 'en';
    const message = isEn
      ? `Hello Coach River, I would like to book a consultation!\n\n`
        + `- Full Name: ${name.trim()}\n`
        + `- Phone: ${phone.trim()}\n`
        + `- Height: ${height ? height.trim() + ' cm' : 'Not specified'}\n`
        + `- Weight: ${weight ? weight.trim() + ' kg' : 'Not specified'}\n`
        + `- Goal: ${goalText}`
      : `Xin chào HLV River, tôi muốn đăng ký tư vấn!\n\n`
        + `- Họ và tên: ${name.trim()}\n`
        + `- SĐT: ${phone.trim()}\n`
        + `- Chiều cao: ${height ? height.trim() + ' cm' : 'Chưa nhập'}\n`
        + `- Cân nặng: ${weight ? weight.trim() + ' kg' : 'Chưa nhập'}\n`
        + `- Mục tiêu: ${goalText}`;
                   
    const encodedMessage = encodeURIComponent(message);
    const zaloUrl = `https://zalo.me/${ZALO_PHONE}?text=${encodedMessage}`;
    
    setZaloLink(zaloUrl);
    setFullMessage(message);
    
    // 1. Send background notification to Telegram / Server
    try {
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'consult',
          name: name.trim(),
          phone: phone.trim(),
          height: height.trim(),
          weight: weight.trim(),
          goal: goalText,
        }),
      }).catch((err) => console.warn('Notify dispatch error:', err));
    } catch (err) {
      console.warn('Notify call failed:', err);
    }

    // 2. Copy message to clipboard so user can easily paste if Zalo doesn't auto-fill
    try {
      if (navigator?.clipboard) {
        await navigator.clipboard.writeText(message);
        setIsCopied(true);
      }
    } catch (e) {
      console.warn("Clipboard copy failed", e);
    }

    // 3. Open Zalo chat directly
    window.open(zaloUrl, '_blank');
    
    // 3. Show success guidance step
    setSubmitted(true);
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
            className="relative w-full max-w-md bg-[#0a0a0a] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/50 text-zinc-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              /* Success Step: Guidance after opening Zalo */
              <div className="p-6 md:p-8 flex flex-col items-center text-center my-auto overflow-y-auto">
                <div className="w-16 h-16 rounded-full bg-[#0068FF]/20 text-[#0068FF] flex items-center justify-center mb-5 border border-[#0068FF]/30 shadow-[0_0_20px_rgba(0,104,255,0.3)]">
                  <CheckCircle2 className="w-8 h-8 text-[#0068FF]" />
                </div>

                <h3 className="font-impact text-2xl md:text-3xl text-white uppercase tracking-wider mb-2">
                  {(t.consult as any).successTitle}
                </h3>
                
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-sm">
                  {(t.consult as any).successDesc}
                </p>

                {/* Consultation Details Card */}
                <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-left text-xs font-mono text-zinc-300 mb-6 space-y-1.5 shadow-inner">
                  <p><span className="text-zinc-500">{lang === 'en' ? 'Full Name:' : 'Họ và tên:'}</span> <span className="text-white font-bold">{name}</span></p>
                  <p><span className="text-zinc-500">{lang === 'en' ? 'Phone:' : 'Số điện thoại:'}</span> <span className="text-white font-bold">{phone}</span></p>
                  <p><span className="text-zinc-500">{lang === 'en' ? 'Body Stats:' : 'Thể trạng:'}</span> {height ? `${height} cm` : '--'} / {weight ? `${weight} kg` : '--'}</p>
                  <p><span className="text-zinc-500">{lang === 'en' ? 'Goal:' : 'Mục tiêu:'}</span> <span className="text-white">{goal === 'lose' ? (t.consult as any).goalLose : goal === 'gain' ? (t.consult as any).goalGain : (customGoal.trim() || (t.consult as any).goalOther)}</span></p>
                </div>

                <div className="flex flex-col gap-3 w-full">
                  <a
                    href={zaloLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-[#0068FF] hover:bg-[#0055D4] text-white font-bold uppercase tracking-wider text-xs rounded-sm transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {(t.consult as any).btnReopenZalo}
                  </a>

                  <button
                    onClick={() => {
                      if (navigator?.clipboard) {
                        navigator.clipboard.writeText(fullMessage);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                      }
                    }}
                    className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-bold uppercase tracking-wider text-xs rounded-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {isCopied ? (lang === 'en' ? 'COPIED TO CLIPBOARD!' : 'ĐÃ SAO CHÉP!') : (t.consult as any).btnCopyAgain}
                  </button>

                  <button
                    onClick={closeModal}
                    className="w-full py-3 text-zinc-400 hover:text-white font-bold uppercase tracking-widest text-xs transition-colors mt-1"
                  >
                    {(t.consult as any).btnClose}
                  </button>
                </div>
              </div>
            ) : (
              /* Form Content */
              <div className="p-6 md:p-8 flex flex-col h-full overflow-y-auto mt-4">
                <div className="mb-6 text-center">
                  <span className="text-zinc-400 font-bold tracking-widest uppercase text-xs mb-2 block">
                    {(t.consult as any).subtitle}
                  </span>
                  <h3 className="font-impact text-2xl md:text-3xl text-white uppercase tracking-widest">
                    {(t.consult as any).title}
                  </h3>
                </div>

                <div className="flex flex-col gap-4 mb-8">
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
                      {(t.consult as any).formGoal}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        type="button"
                        onClick={() => setGoal('lose')}
                        className={`py-2 px-2 border rounded-sm font-bold text-xs transition-colors ${goal === 'lose' ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-400 border-zinc-800'}`}
                      >
                        {(t.consult as any).goalLose}
                      </button>
                      <button 
                        type="button"
                        onClick={() => setGoal('gain')}
                        className={`py-2 px-2 border rounded-sm font-bold text-xs transition-colors ${goal === 'gain' ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-400 border-zinc-800'}`}
                      >
                        {(t.consult as any).goalGain}
                      </button>
                      <button 
                        type="button"
                        onClick={() => setGoal('other')}
                        className={`py-2 px-2 border rounded-sm font-bold text-xs transition-colors ${goal === 'other' ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-400 border-zinc-800'}`}
                      >
                        {(t.consult as any).goalOther}
                      </button>
                    </div>

                    {/* Custom goal input field when 'Khác' is selected */}
                    <AnimatePresence>
                      {goal === 'other' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <input 
                            type="text"
                            value={customGoal}
                            onChange={(e) => setCustomGoal(e.target.value)}
                            placeholder={(t.consult as any).otherPlaceholder || (lang === 'en' ? "Specify your custom goal..." : "Nhập mục tiêu cụ thể...")}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-sm p-3 text-white text-sm focus:outline-none focus:border-white transition-colors placeholder-zinc-500"
                            autoFocus
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!name.trim() || !phone.trim()}
                  className="mt-auto w-full py-4 bg-[#0068FF] text-white font-bold uppercase tracking-widest rounded-sm hover:bg-[#0055D4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  {(t.consult as any).ctaSubmit}
                </button>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
