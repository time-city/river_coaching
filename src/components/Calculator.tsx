"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export default function Calculator() {
  const { t } = useLanguage();
  
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('25');
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('170');
  const [activity, setActivity] = useState<number>(1.2);
  const [bodyFat, setBodyFat] = useState<string>('15');
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');
  
  const [bmr, setBmr] = useState<number | null>(null);
  const [tdee, setTdee] = useState<number | null>(null);
  const [targetCalories, setTargetCalories] = useState<number | null>(null);

  useEffect(() => {
    if (height) sessionStorage.setItem('calc_height', height);
    if (weight) sessionStorage.setItem('calc_weight', weight);
  }, [height, weight]);

  const blockInvalidChars = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['e', 'E', '+', '-'].includes(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const bf = parseFloat(bodyFat);

    if (isNaN(a) || isNaN(w) || isNaN(h)) {
      setBmr(null);
      setTdee(null);
      setTargetCalories(null);
      return;
    }

    let calculatedBmr = 0;
    
    // Mifflin-St Jeor Equation (Base)
    let mifflinBmr = 0;
    if (gender === 'male') {
      mifflinBmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
    } else {
      mifflinBmr = (10 * w) + (6.25 * h) - (5 * a) - 161;
    }

    if (!isNaN(bf) && bf > 0 && bf < 100) {
      // Katch-McArdle Equation
      const leanBodyMass = w * (1 - bf / 100);
      const katchBmr = 370 + (21.6 * leanBodyMass);
      
      // Blend both formulas so both Gender and Body Fat influence the final result
      calculatedBmr = (mifflinBmr + katchBmr) / 2;
    } else {
      calculatedBmr = mifflinBmr;
    }
    
    const calculatedTdee = calculatedBmr * activity;
    setBmr(Math.round(calculatedBmr));
    setTdee(Math.round(calculatedTdee));

    if (goal === 'lose') setTargetCalories(Math.round(calculatedTdee - 500));
    else if (goal === 'gain') setTargetCalories(Math.round(calculatedTdee + 300));
    else setTargetCalories(Math.round(calculatedTdee));

  }, [gender, age, weight, height, activity, bodyFat, goal]);

  const activityOptions = [
    { value: 1.2, label: t.calculator.sedentary },
    { value: 1.375, label: t.calculator.light },
    { value: 1.55, label: t.calculator.moderate },
    { value: 1.725, label: t.calculator.active },
    { value: 1.9, label: t.calculator.extreme },
  ];

  return (
    <section id="calculator-section" className="w-full bg-[#0a0a0a] border-t border-zinc-900 py-24 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[10rem] md:text-[20rem] font-impact text-white/[0.015] whitespace-nowrap">CALCULATE</span>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col">
        <div className="text-center mb-16">
          <h2 className="font-impact text-5xl md:text-7xl text-white tracking-widest uppercase mb-4">
            {t.calculator.title}
          </h2>
          <p className="text-zinc-400 uppercase tracking-[0.2em] text-sm md:text-base font-bold">
            {t.calculator.subtitle}
          </p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Form Column */}
            <div className="flex flex-col gap-6">
              
              {/* Gender */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3 block">
                  {t.calculator.gender}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setGender('male')}
                    className={`py-3 px-4 rounded-xl font-bold uppercase transition-all duration-300 ${gender === 'male' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 border border-zinc-700/50'}`}
                  >
                    {t.calculator.male}
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`py-3 px-4 rounded-xl font-bold uppercase transition-all duration-300 ${gender === 'female' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 border border-zinc-700/50'}`}
                  >
                    {t.calculator.female}
                  </button>
                </div>
              </div>

              {/* Age & Height */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col h-full">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3 block">{t.calculator.age}</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    onKeyDown={blockInvalidChars}
                    className="w-full bg-zinc-800/50 border border-zinc-700/50 p-4 text-white outline-none focus:border-white transition-all duration-300 text-xl font-medium rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 mt-auto"
                  />
                </div>
                <div className="flex flex-col h-full">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3 block">{t.calculator.height}</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    onKeyDown={blockInvalidChars}
                    className="w-full bg-zinc-800/50 border border-zinc-700/50 p-4 text-white outline-none focus:border-white transition-all duration-300 text-xl font-medium rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 mt-auto"
                  />
                </div>
              </div>

              {/* Weight & Body Fat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col h-full">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3 block">{t.calculator.weight}</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    onKeyDown={blockInvalidChars}
                    className="w-full bg-zinc-800/50 border border-zinc-700/50 p-4 text-white outline-none focus:border-white transition-all duration-300 text-xl font-medium rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 mt-auto"
                  />
                </div>
                <div className="flex flex-col h-full">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3 block">{t.calculator.bodyFat}</label>
                  <input
                    type="number"
                    value={bodyFat}
                    onChange={(e) => setBodyFat(e.target.value)}
                    onKeyDown={blockInvalidChars}
                    placeholder="%"
                    className="w-full bg-zinc-800/50 border border-zinc-700/50 p-4 text-white outline-none focus:border-white transition-all duration-300 text-xl font-medium rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 mt-auto"
                  />
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3 block">{t.calculator.activity}</label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(parseFloat(e.target.value))}
                  className="w-full bg-zinc-800/50 border border-zinc-700/50 p-4 text-white outline-none focus:border-white transition-all duration-300 text-sm font-medium rounded-xl appearance-none cursor-pointer"
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                >
                  {activityOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-zinc-900 text-white py-2">{opt.label}</option>
                  ))}
                </select>
              </div>



            </div>

            {/* Results Column */}
            <div className="flex flex-col justify-center relative">
              <AnimatePresence mode="wait">
                {bmr && tdee ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="bg-[#0a0a0a]/80 border border-white/10 p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:border-white/30 transition-all duration-500">
                      <div className="absolute top-0 left-0 w-1 h-full bg-zinc-600 group-hover:bg-white transition-colors duration-500"></div>
                      <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">{t.calculator.yourBmr}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-impact text-4xl sm:text-5xl md:text-6xl text-white">{bmr.toLocaleString()}</span>
                        <span className="text-zinc-500 font-bold uppercase text-xs sm:text-sm">{t.calculator.calories}</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-600/20 to-zinc-900 border border-red-500/30 p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:border-red-500/50 hover:shadow-[0_0_40px_rgba(220,38,38,0.2)] transition-all duration-500">
                      <div className="absolute top-0 left-0 w-1 h-full bg-red-600 group-hover:bg-red-500 transition-colors duration-500"></div>
                      <p className="text-xs font-bold uppercase tracking-widest text-red-500/70 mb-2">{t.calculator.yourTdee}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-impact text-5xl sm:text-6xl md:text-7xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{tdee.toLocaleString()}</span>
                        <span className="text-red-400 font-bold uppercase text-xs sm:text-sm">{t.calculator.calories}</span>
                      </div>
                    </div>

                    <div className="mt-8 p-6 bg-[#0a0a0a] border border-zinc-800 rounded-2xl flex flex-col items-center text-center">
                      <p className="text-sm font-medium text-zinc-300 mb-4">
                        {(t as any).calculator?.ctaText || "Now you know your numbers. Let's build a plan around them."}
                      </p>
                      <button 
                        onClick={() => window.dispatchEvent(new Event('openPromoModal'))}
                        className="w-full py-4 px-6 rounded-sm bg-white text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300 shadow-xl hover:bg-zinc-200"
                      >
                        {(t as any).calculator?.ctaButton || "GET YOUR CUSTOM MEAL PLAN"}
                      </button>
                    </div>

                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-2xl p-8 min-h-[300px]"
                  >
                    <span className="text-zinc-600 font-impact text-2xl tracking-widest uppercase opacity-50">
                      ?
                    </span>
                    <p className="text-zinc-600 uppercase text-xs font-bold mt-2 tracking-widest">Awaiting Input</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
