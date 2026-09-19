"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function PricingSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"offline" | "onlineCall" | "onlineNoCall">("onlineCall");

  const offlinePackages = [
    { sessions: 3, price: "2.999.000", perSession: "250.000" },
    { sessions: 4, price: "3.499.000", perSession: "218.000", popular: true },
    { sessions: 5, price: "3.999.000", perSession: "200.000" },
    { sessions: 6, price: "4.499.000", perSession: "187.000" },
  ];

  const onlineCallPackages = [
    { days: 3, price: "1.999.000", perSession: "166.000" },
    { days: 4, price: "2.499.000", perSession: "156.000", popular: true },
    { days: 5, price: "2.999.000", perSession: "150.000" },
    { days: 6, price: "3.499.000", perSession: "145.000" },
  ];

  const onlineNoCallPackages = [
    { duration: 1, price: "999.000", perMonth: "999.000" },
    { duration: 3, price: "2.699.000", perMonth: "899.000", popular: true },
    { duration: 6, price: "4.799.000", perMonth: "799.000" },
    { duration: 12, price: "8.399.000", perMonth: "699.000" },
  ];

  const handleBook = () => {
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const tabs = [
    { id: "onlineCall", label: t.pricing.onlineCall },
    { id: "onlineNoCall", label: t.pricing.onlineNoCall },
    { id: "offline", label: t.pricing.offline },
  ] as const;

  return (
    <section id="pricing-section" className="w-full bg-[#0a0a0a] py-24 px-6 relative z-10 border-t border-zinc-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-impact uppercase tracking-wider mb-6">
            {t.pricing.title}
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-8 py-4 rounded-sm text-sm font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden border ${
                activeTab === tab.id
                  ? "border-white bg-white text-black"
                  : "border-zinc-800 bg-transparent text-zinc-400 hover:text-white hover:border-zinc-600"
              }`}
            >
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Pricing Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === "offline" && (
              <motion.div
                key="offline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div className="text-center mb-10">
                  <p className="text-zinc-400 max-w-2xl mx-auto">{t.pricing.offlineDesc}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {offlinePackages.map((pkg, i) => (
                    <PricingCard 
                      key={i} 
                      title={`${pkg.sessions} ${t.pricing.daysWeek}`} 
                      price={pkg.price} 
                      subtitle={`~ ${pkg.perSession}đ ${t.pricing.perSession}`}
                      popular={pkg.popular}
                      onClick={handleBook}
                      cta={t.pricing.cta}
                      period={t.pricing.perMonth}
                      mostPopularText={t.pricing.mostPopular}
                      features={(t as any).pricing.featuresOffline || []}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "onlineCall" && (
              <motion.div
                key="onlineCall"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div className="text-center mb-10">
                  <p className="text-zinc-400 max-w-2xl mx-auto">{t.pricing.onlineCallDesc}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {onlineCallPackages.map((pkg, i) => (
                    <PricingCard 
                      key={i} 
                      title={`${pkg.days} ${t.pricing.daysWeek}`} 
                      price={pkg.price} 
                      subtitle={`~ ${pkg.perSession}đ ${t.pricing.perSession}`}
                      popular={pkg.popular}
                      onClick={handleBook}
                      cta={t.pricing.cta}
                      period={t.pricing.perMonth}
                      mostPopularText={t.pricing.mostPopular}
                      features={(t as any).pricing.featuresOnlineCall || []}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "onlineNoCall" && (
              <motion.div
                key="onlineNoCall"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div className="text-center mb-10">
                  <p className="text-zinc-400 max-w-2xl mx-auto">{t.pricing.planOnlyDesc}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {onlineNoCallPackages.map((pkg, i) => (
                    <PricingCard 
                      key={i} 
                      title={`${pkg.duration} ${pkg.duration === 1 ? t.pricing.month : t.pricing.months}`} 
                      price={pkg.price} 
                      subtitle={pkg.duration > 1 ? `~ ${pkg.perMonth}đ ${t.pricing.perMonth}` : ""}
                      popular={pkg.popular}
                      onClick={handleBook}
                      cta={t.pricing.cta}
                      period={pkg.duration === 1 ? t.pricing.perMonth : undefined}
                      mostPopularText={t.pricing.mostPopular}
                      features={(t as any).pricing.featuresOnlineNoCall || []}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function PricingCard({ 
  title, 
  price, 
  subtitle, 
  period,
  popular, 
  onClick, 
  cta,
  mostPopularText,
  features
}: { 
  title: string, 
  price: string, 
  subtitle?: string, 
  period?: string,
  popular?: boolean, 
  onClick: () => void, 
  cta: string,
  mostPopularText: string,
  features: string[]
}) {
  return (
    <div className={`relative flex flex-col p-8 rounded-sm transition-all duration-300 overflow-hidden group ${
      popular 
        ? "bg-zinc-900 border-2 border-white transform md:-translate-y-4" 
        : "bg-transparent border border-zinc-800 hover:border-zinc-600"
    }`}>
      {popular && (
        <div className="absolute top-0 left-0 w-full bg-white py-1 text-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-black">{mostPopularText}</span>
        </div>
      )}
      
      <h3 className={`text-xl font-bold uppercase tracking-wider mb-6 text-center ${popular ? 'mt-4' : ''}`}>{title}</h3>
      
      <div className="flex flex-col items-center justify-center mb-6 h-[80px]">
        <div className="flex items-end justify-center">
          <span className="text-4xl md:text-5xl font-impact tracking-widest text-white">{price}</span>
          <span className="text-lg font-bold text-zinc-400 mb-1 ml-2">VNĐ</span>
        </div>
        {period && <div className="text-zinc-400 font-medium mt-1">{period}</div>}
      </div>

      {subtitle ? (
        <div className="text-sm font-medium text-zinc-400 mb-8 text-center h-6">{subtitle}</div>
      ) : (
        <div className="h-6 mb-8"></div>
      )}

      {features && features.length > 0 && (
        <ul className="mb-8 space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
              <Check className="w-4 h-4 text-white mt-0.5 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-4">
        <button 
          onClick={onClick}
          className={`w-full py-4 px-6 rounded-sm font-sans font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
            popular 
              ? "bg-white text-black hover:bg-zinc-200" 
              : "bg-transparent border border-white text-white hover:bg-white hover:text-black"
          }`}
        >
          {cta}
        </button>
      </div>
    </div>
  );
}
