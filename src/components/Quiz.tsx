"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export default function Quiz() {
  const { t, lang } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const isTransitioningRef = useRef(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [customAnswers, setCustomAnswers] = useState<Record<number, string>>({});
  const [customValue, setCustomValue] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [phone, setPhone] = useState("");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleConsultNow = () => {
    if (height) sessionStorage.setItem('calc_height', height);
    if (weight) sessionStorage.setItem('calc_weight', weight);
    window.dispatchEvent(new Event('openConsultModal'));
  };

  const baseQuestions = [
    {
      id: 1,
      question: t.quiz.q1,
      options: [t.quiz.q1o1, t.quiz.q1o2, t.quiz.q1o3, t.quiz.q1o4],
    },
    {
      id: 2,
      question: t.quiz.q3,
      options: [t.quiz.q3o1, t.quiz.q3o2, t.quiz.q3o3, t.quiz.q3o4],
    },
    {
      id: 3,
      question: t.quiz.q5,
      options: [t.quiz.q5o1, t.quiz.q5o4],
    },
    {
      id: 4,
      question: t.quiz.q2,
      options: [t.quiz.q2o1, t.quiz.q2o2, t.quiz.q2o3, t.quiz.q2o4],
    },
    {
      id: 5,
      question: t.quiz.q4,
      options: [t.quiz.q4o1, t.quiz.q4o2],
    },
  ];

  const quizQuestions = [...baseQuestions];
  const isOnlineCoaching = answers[4] === 1;

  if (isOnlineCoaching) {
    quizQuestions.push({
      id: 6,
      question: t.quiz.q4_sub,
      options: [t.quiz.q4_sub_o1, t.quiz.q4_sub_o2],
    });
  }

  let finalPrice = "";
  let perSessionPrice = "";
  const daysIndex = answers[3];
  const serviceIndex = answers[4];
  const callIndex = answers[5];

  const sessionWord = (t.quiz as any).sessionsWord || (lang === 'en' ? "Sessions" : "Buổi");
  const singleSessionWord = (t.quiz as any).sessionWord || (lang === 'en' ? "Session" : "Buổi");
  const monthWord = (t.quiz as any).monthWord || (lang === 'en' ? "Month" : "Tháng");
  const currencyUnit = lang === 'en' ? "VND" : "VNĐ";
  const currencySymbol = lang === 'en' ? " VND" : "đ";

  if (serviceIndex === 0) {
    if (daysIndex === 0) { finalPrice = `2.999.000 ${currencyUnit} / 12 ${sessionWord}`; perSessionPrice = `~ 250.000${currencySymbol} / ${singleSessionWord}`; }
    else if (daysIndex === 1) { finalPrice = `3.499.000 ${currencyUnit} / 16 ${sessionWord}`; perSessionPrice = `~ 218.000${currencySymbol} / ${singleSessionWord}`; }
    else if (daysIndex === 2) { finalPrice = `3.999.000 ${currencyUnit} / 20 ${sessionWord}`; perSessionPrice = `~ 200.000${currencySymbol} / ${singleSessionWord}`; }
    else if (daysIndex === 3) { finalPrice = `4.499.000 ${currencyUnit} / 24 ${sessionWord}`; perSessionPrice = `~ 187.000${currencySymbol} / ${singleSessionWord}`; }
  } else if (serviceIndex === 1) {
    if (callIndex === 0) {
      if (daysIndex === 0) { finalPrice = `1.999.000 ${currencyUnit} / ${monthWord}`; perSessionPrice = `~ 166.000${currencySymbol} / ${singleSessionWord}`; }
      else if (daysIndex === 1) { finalPrice = `2.499.000 ${currencyUnit} / ${monthWord}`; perSessionPrice = `~ 156.000${currencySymbol} / ${singleSessionWord}`; }
      else if (daysIndex === 2) { finalPrice = `2.999.000 ${currencyUnit} / ${monthWord}`; perSessionPrice = `~ 150.000${currencySymbol} / ${singleSessionWord}`; }
      else if (daysIndex === 3) { finalPrice = `3.499.000 ${currencyUnit} / ${monthWord}`; perSessionPrice = `~ 145.000${currencySymbol} / ${singleSessionWord}`; }
    } else if (callIndex === 1) {
      finalPrice = `999.000 ${currencyUnit} / ${monthWord}`;
      perSessionPrice = "";
    }
  }

  const handleOptionSelect = (index: number, customVal?: string) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    setAnswers((prev) => ({ ...prev, [currentStep]: index }));
    if (customVal !== undefined) {
      setCustomAnswers((prev) => ({ ...prev, [currentStep]: customVal }));
    }
    if (currentStep < quizQuestions.length) {
      setCurrentStep((prev) => prev + 1);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 500);
    } else {
      isTransitioningRef.current = false;
    }
  };

  const handleBack = () => {
    if (isTransitioningRef.current) return;
    if (currentStep > 0) {
      isTransitioningRef.current = true;
      setCurrentStep((prev) => prev - 1);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 500);
    }
  };

  const progress = (currentStep / quizQuestions.length) * 100;

  return (
    <section id="quiz-section" className="w-full bg-[#0a0a0a] border-y border-zinc-900 py-10 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[12rem] md:text-[25rem] font-impact text-white/[0.02] whitespace-nowrap">RIVER</span>
      </div>
      
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 relative z-10 min-h-[50vh] flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`mb-4 sm:mb-8 md:mb-12 ${currentStep >= quizQuestions.length ? 'hidden sm:block' : ''}`}
        >
          <h2 className="text-3xl sm:text-6xl md:text-8xl font-impact text-center uppercase tracking-tight leading-[1.15] md:leading-tight mb-3 md:mb-8">
            {t.quiz.title}
          </h2>
          
          {/* Progress Bar */}
          <div className="w-full h-1 bg-surface relative overflow-hidden rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full bg-white"
            />
          </div>
          <p className="text-right text-accent mt-2 text-xs sm:text-sm">
            {t.quiz.step} {Math.min(currentStep + 1, quizQuestions.length)} {t.quiz.of} {quizQuestions.length}
          </p>
        </motion.div>

        <div className="relative w-full overflow-hidden min-h-[260px]">
          <AnimatePresence mode="wait">
            {currentStep < quizQuestions.length ? (
              <motion.div
                key={currentStep}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full flex flex-col items-center"
              >
                <div className="flex flex-col items-center mb-6 sm:mb-10 w-full max-w-2xl relative">
                  {currentStep > 0 && (
                    <button 
                      onClick={handleBack}
                      className="mb-4 sm:mb-6 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-zinc-600 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 hover:border-white transition-all duration-300 shadow-md"
                      aria-label="Back"
                    >
                      <span className="text-lg sm:text-xl">←</span>
                    </button>
                  )}
                  <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-center px-2 md:px-12">
                    {quizQuestions[currentStep].question}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full max-w-2xl">
                  {quizQuestions[currentStep].options.map((option, index) => {
                    const isOther = option.startsWith('Khác') || option.startsWith('Other');

                    return isOther ? (
                      <div 
                        key={index} 
                        className="relative col-span-1 md:col-span-2 w-full flex flex-col sm:flex-row items-stretch bg-zinc-900 border border-zinc-800 focus-within:border-white transition-all duration-500 ease-out rounded-none overflow-hidden shadow-lg group focus-within:shadow-[0_0_40px_rgba(255,255,255,0.1)] focus-within:-translate-y-1"
                      >
                        <div className="relative z-10 flex-1 flex items-center px-4 sm:px-6 py-3 sm:py-6 text-base sm:text-lg font-medium">
                          <span className="whitespace-nowrap mr-3 sm:mr-4 text-white">{option.split('(')[0].trim()}:</span>
                          <input
                            type="text"
                            value={customValue}
                            onChange={(e) => setCustomValue(e.target.value)}
                            placeholder={(t.quiz as any).customPlaceholder || (lang === 'en' ? "Please specify details..." : "Ghi rõ cụ thể...")}
                            className="w-full bg-transparent border-none outline-none text-white placeholder-zinc-500 font-normal text-sm sm:text-base"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && customValue.trim() !== '') {
                                handleOptionSelect(index, customValue);
                              }
                            }}
                          />
                        </div>
                        <button
                          onClick={() => {
                            if (customValue.trim() !== '') {
                              handleOptionSelect(index, customValue);
                            }
                          }}
                          disabled={customValue.trim() === ''}
                          className="relative z-10 px-4 sm:px-6 py-3 sm:py-6 bg-zinc-900 border-t sm:border-t-0 sm:border-l border-zinc-800 text-white font-bold hover:bg-white hover:text-black transition-all duration-500 ease-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px] sm:min-w-[120px] text-sm sm:text-base"
                        >
                          {(t.quiz as any).confirm || (lang === 'en' ? "Confirm" : "Xác nhận")}
                        </button>
                      </div>
                    ) : (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        className={`relative w-full py-3.5 sm:py-5 px-4 sm:px-6 bg-zinc-900 border border-zinc-800 text-white text-left text-sm sm:text-lg font-medium hover:bg-white hover:text-black hover:border-white transition-all duration-500 ease-out rounded-none hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-1 flex items-center justify-between group overflow-hidden ${quizQuestions[currentStep].options.length <= 2 ? 'col-span-1 md:col-span-2' : ''}`}
                      >
                        <span className="relative z-10">{option}</span>
                        <span className="relative z-10 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-700 ease-out">
                          →
                        </span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="completion"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full flex flex-col items-center"
              >
                <h3 className="text-2xl sm:text-4xl md:text-6xl font-impact uppercase mb-3 sm:mb-6 text-center tracking-tight">
                  {t.quiz.completeTitle}
                </h3>
                
                <div className="w-full max-w-6xl bg-white/5 backdrop-blur-2xl border border-white/20 p-3.5 sm:p-6 md:p-10 mb-4 sm:mb-8 text-left shadow-[0_0_80px_rgba(220,39,67,0.15)] relative overflow-hidden rounded-2xl md:rounded-3xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 md:gap-16">
                    {/* Column 1: Summary */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold mb-2 sm:mb-6 uppercase tracking-[0.2em] text-white/70">{t.quiz.summaryTitle}</h4>
                      <div className="space-y-0.5 sm:space-y-2 mb-3 lg:mb-0">
                        {quizQuestions.map((q, i) => {
                          const ansIndex = answers[i];
                          const customAns = customAnswers[i];
                          let displayAns = "-";
                          
                          if (ansIndex !== undefined) {
                            const optionText = q.options[ansIndex];
                            if (customAns) {
                              const prefix = optionText.split(/[:(]/)[0].trim();
                              displayAns = `${prefix}: ${customAns}`;
                            } else {
                              displayAns = optionText;
                            }
                          }

                          return (
                            <div key={i} className="py-2 sm:py-3.5 border-b border-zinc-800/60 group hover:border-zinc-500 transition-colors duration-300">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                                <span className="text-xs sm:text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors sm:w-[52%] leading-snug">
                                  {q.question}
                                </span>
                                
                                <div className="relative inline-block sm:w-[48%]">
                                  <div 
                                    onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                                    className="w-full text-xs sm:text-base text-white font-bold bg-transparent outline-none cursor-pointer text-left sm:text-right pr-4 sm:pr-5 border-b border-dashed border-white/30 hover:border-white transition-colors pb-0.5 sm:pb-1 break-words whitespace-normal relative inline-flex items-center justify-between sm:justify-end gap-1.5"
                                  >
                                    <span>
                                      {ansIndex !== undefined ? (
                                        customAns && (q.options[ansIndex].startsWith('Khác') || q.options[ansIndex].startsWith('Other'))
                                          ? `${q.options[ansIndex].split(/[:(]/)[0].trim()}: ${customAns}`
                                          : q.options[ansIndex]
                                      ) : ((t.quiz as any).selectPlaceholder || (lang === 'en' ? "-- Select --" : "-- Chọn --"))}
                                    </span>
                                    <span className={`pointer-events-none text-white/70 text-[9px] sm:text-[10px] transition-transform duration-300 ${openDropdown === i ? 'rotate-180' : ''}`}>▼</span>
                                  </div>
                                  
                                  <AnimatePresence>
                                    {openDropdown === i && (
                                      <>
                                        <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)}></div>
                                        <motion.div 
                                          initial={{ opacity: 0, y: -10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -10 }}
                                          transition={{ duration: 0.2 }}
                                          className="absolute left-0 sm:left-auto sm:right-0 mt-1 w-max max-w-[85vw] sm:max-w-md min-w-full z-50 bg-zinc-900/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden py-1.5"
                                        >
                                          {q.options.map((opt, optIdx) => {
                                            const prefix = opt.split(/[:(]/)[0].trim();
                                            const isSelectedCustom = optIdx === ansIndex && customAns;
                                            return (
                                              <div
                                                key={optIdx}
                                                onClick={() => {
                                                  setAnswers({ ...answers, [i]: optIdx });
                                                  setOpenDropdown(null);
                                                }}
                                                className="px-3.5 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm text-left font-medium text-zinc-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors break-words flex items-center justify-between"
                                              >
                                                <span className="mr-3 break-words">{isSelectedCustom ? `${prefix}: ${customAns}` : prefix}</span>
                                                {ansIndex === optIdx && <span className="text-white text-base">✓</span>}
                                              </div>
                                            );
                                          })}
                                        </motion.div>
                                      </>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Column 2: Pricing & Inputs */}
                    <div className="flex flex-col h-full">
                      {finalPrice && (
                        <div className="mb-3 sm:mb-6 border border-white/20 bg-white/10 backdrop-blur-md p-3 sm:p-5 relative overflow-hidden rounded-xl sm:rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                          <div className="absolute top-0 left-0 w-1 h-full bg-white"></div>
                          <div className="flex items-center justify-between gap-3 sm:block">
                            <div>
                              <h4 className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/70">{t.quiz.pricingTitle}</h4>
                              <p className="text-zinc-400 text-xs mt-0.5 sm:mt-1 sm:mb-4 hidden sm:block">{t.quiz.pricingDesc}</p>
                            </div>
                            <div className="text-right sm:text-left flex-shrink-0">
                              <div className="text-lg sm:text-2xl md:text-3xl font-impact tracking-wider sm:tracking-widest text-white leading-tight">
                                {finalPrice}
                              </div>
                              {perSessionPrice && (
                                <div className="text-zinc-400 text-[11px] sm:text-sm mt-0.5 sm:mt-2 font-medium">
                                  {perSessionPrice}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2.5 sm:gap-6 mb-3 sm:mb-6">
                        <div className="flex flex-col relative group">
                          <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-zinc-400 sm:text-zinc-500 mb-1 sm:mb-3 group-focus-within:text-white transition-colors">{t.quiz.height}</label>
                          <div className="relative flex items-center">
                            <input 
                              type="number" 
                              value={height}
                              onChange={(e) => setHeight(e.target.value)}
                              onKeyDown={(e) => {
                                if (['e', 'E', '+', '-'].includes(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              placeholder="175"
                              className="w-full bg-white/5 border border-white/20 p-2.5 sm:p-4 pr-[64px] sm:pr-[88px] text-white outline-none focus:border-white focus:bg-white/10 transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-base sm:text-xl font-medium rounded-xl"
                            />
                            <div className="absolute right-1.5 sm:right-2 flex items-center bg-white/10 rounded-lg p-0.5 sm:p-1 border border-white/20">
                              <button 
                                onClick={(e) => { 
                                  e.preventDefault(); 
                                  if(heightUnit !== 'cm') {
                                    setHeightUnit('cm');
                                    if (height) setHeight(Math.round(parseFloat(height) * 30.48).toString());
                                  }
                                }}
                                className={`px-1.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300 ${heightUnit === 'cm' ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:text-white'}`}
                              >cm</button>
                              <button 
                                onClick={(e) => { 
                                  e.preventDefault(); 
                                  if(heightUnit !== 'ft') {
                                    setHeightUnit('ft');
                                    if (height) setHeight((parseFloat(height) / 30.48).toFixed(2));
                                  }
                                }}
                                className={`px-1.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300 ${heightUnit === 'ft' ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:text-white'}`}
                              >ft</button>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col relative group">
                          <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-zinc-400 sm:text-zinc-500 mb-1 sm:mb-3 group-focus-within:text-white transition-colors">{t.quiz.weight}</label>
                          <div className="relative flex items-center">
                            <input 
                              type="number" 
                              value={weight}
                              onChange={(e) => setWeight(e.target.value)}
                              onKeyDown={(e) => {
                                if (['e', 'E', '+', '-'].includes(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              placeholder="70"
                              className="w-full bg-white/5 border border-white/20 p-2.5 sm:p-4 pr-[70px] sm:pr-[100px] text-white outline-none focus:border-white focus:bg-white/10 transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-base sm:text-xl font-medium rounded-xl"
                            />
                            <div className="absolute right-1.5 sm:right-2 flex items-center bg-white/10 rounded-lg p-0.5 sm:p-1 border border-white/20">
                              <button 
                                onClick={(e) => { 
                                  e.preventDefault(); 
                                  if(weightUnit !== 'kg') {
                                    setWeightUnit('kg');
                                    if (weight) setWeight((parseFloat(weight) / 2.20462).toFixed(1));
                                  }
                                }}
                                className={`px-1.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300 ${weightUnit === 'kg' ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:text-white'}`}
                              >kg</button>
                              <button 
                                onClick={(e) => { 
                                  e.preventDefault(); 
                                  if(weightUnit !== 'lbs') {
                                    setWeightUnit('lbs');
                                    if (weight) setWeight((parseFloat(weight) * 2.20462).toFixed(1));
                                  }
                                }}
                                className={`px-1.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300 ${weightUnit === 'lbs' ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:text-white'}`}
                              >lbs</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col relative group mb-3 sm:mb-6">
                        <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-zinc-400 sm:text-zinc-500 mb-1 sm:mb-3 group-focus-within:text-white transition-colors">{t.quiz.phone}</label>
                        <input 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="09xx xxx xxx"
                          className="w-full bg-white/5 border border-white/20 p-2.5 sm:p-4 text-white outline-none focus:border-white focus:bg-white/10 transition-all duration-300 text-base sm:text-xl font-medium rounded-xl"
                        />
                      </div>

                      <div className="flex flex-row gap-3 items-center justify-between pt-3 sm:pt-6 border-t border-zinc-800/50 mt-auto">
                        <button 
                          onClick={() => {
                            setCurrentStep(0);
                            setAnswers({});
                            setCustomAnswers({});
                            setHeight("");
                            setWeight("");
                            setPhone("");
                          }}
                          className="text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider sm:tracking-widest transition-colors duration-300 flex items-center gap-1.5 py-2 px-1 whitespace-nowrap"
                        >
                          <span className="text-base sm:text-lg">↺</span> <span>{t.quiz.retake}</span>
                        </button>
                        <button 
                          onClick={handleConsultNow}
                          disabled={!height || !weight || !phone}
                          className="flex-1 sm:flex-initial sm:w-auto px-5 sm:px-10 py-3 sm:py-4 bg-white text-black font-impact text-base sm:text-xl uppercase hover:bg-zinc-200 transition-all duration-500 ease-out disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-white shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] disabled:shadow-none rounded-xl sm:rounded-2xl text-center"
                        >
                          {t.quiz.consultNow}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
