"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function PricingSection() {
  const { t, lang } = useLanguage();
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
    { duration: 1, price: "1.199.000", perMonth: "1.199.000" },
    { duration: 3, price: "3.199.000", perMonth: "1.066.000", popular: true, discount: "11%" },
    { duration: 6, price: "5.899.000", perMonth: "983.000", discount: "18%" },
    { duration: 12, price: "9.999.000", perMonth: "833.000", discount: "30%" },
  ];

  const handleBook = () => {
    window.dispatchEvent(new Event('openConsultModal'));
  };

  const tabs = [
    { id: "onlineCall", label: t.pricing.onlineCall },
    { id: "onlineNoCall", label: t.pricing.onlineNoCall },
    { id: "offline", label: t.pricing.offline },
  ] as const;

  return (
    <section id="pricing-section" className="w-full bg-[#0a0a0a] py-20 md:py-24 px-4 sm:px-6 md:px-8 relative z-10 border-t border-zinc-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-impact uppercase tracking-wider leading-[1.15] md:leading-tight mb-4 md:mb-6">
            {t.pricing.title}
          </h2>
          <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto px-2">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Responsive Custom Tabs - Scrollable Segmented Pill */}
        <div className="w-full flex justify-center mb-12 md:mb-16 px-2">
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-xl overflow-x-auto max-w-full no-scrollbar shadow-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap shrink-0 flex items-center justify-center ${
                  activeTab === tab.id
                    ? "bg-white text-black shadow-lg font-black"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
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
                <div className="text-center mb-6 md:mb-10">
                  <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto">{t.pricing.offlineDesc}</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
                  {offlinePackages.map((pkg, i) => (
                    <PricingCard 
                      key={i} 
                      title={`${pkg.sessions} ${t.pricing.daysWeek}`} 
                      price={pkg.price} 
                      subtitle={`~ ${pkg.perSession}${lang === 'en' ? ' VND' : 'đ'} ${t.pricing.perSession}`}
                      popular={pkg.popular}
                      onClick={handleBook}
                      cta={t.pricing.cta}
                      period={t.pricing.perMonth}
                      currency={lang === 'en' ? 'VND' : 'VNĐ'}
                      mostPopularText={t.pricing.mostPopular}
                      features={(t as any).pricing.featuresOffline || []}
                    />
                  ))}
                </div>
                {/* Mobile Shared Benefits Bar */}
                <div className="md:hidden mt-5 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider block mb-1">
                    {lang === 'en' ? '★ ALL PACKAGES INCLUDE' : '★ MỌI GÓI TẬP ĐỀU BAO GỒM'}
                  </span>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {lang === 'en' 
                      ? 'Personalized nutrition • 1-on-1 form coaching • Weekly check-ins • 24/7 direct Q&A' 
                      : 'Thực đơn dinh dưỡng cá nhân hoá • Kèm sửa form 1:1 • Theo dõi chỉ số hàng tuần • Hỗ trợ trực tiếp từ HLV'}
                  </p>
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
                <div className="text-center mb-6 md:mb-10">
                  <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto">{t.pricing.onlineCallDesc}</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
                  {onlineCallPackages.map((pkg, i) => (
                    <PricingCard 
                      key={i} 
                      title={`${pkg.days} ${t.pricing.daysWeek}`} 
                      price={pkg.price} 
                      subtitle={`~ ${pkg.perSession}${lang === 'en' ? ' VND' : 'đ'} ${t.pricing.perSession}`}
                      popular={pkg.popular}
                      onClick={handleBook}
                      cta={t.pricing.cta}
                      period={t.pricing.perMonth}
                      currency={lang === 'en' ? 'VND' : 'VNĐ'}
                      mostPopularText={t.pricing.mostPopular}
                      features={(t as any).pricing.featuresOnlineCall || []}
                    />
                  ))}
                </div>
                {/* Mobile Shared Benefits Bar */}
                <div className="md:hidden mt-5 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider block mb-1">
                    {lang === 'en' ? '★ ALL PACKAGES INCLUDE' : '★ MỌI GÓI TẬP ĐỀU BAO GỒM'}
                  </span>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {lang === 'en' 
                      ? 'Live workout video call • Custom meal plans • Weekly progress analysis • Continuous adjustments' 
                      : 'Video call trực tiếp buổi tập • Thực đơn ăn uống cá nhân • Đánh giá form hàng tuần • Điều chỉnh giáo án liên tục'}
                  </p>
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
                <div className="text-center mb-6 md:mb-10">
                  <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto">{t.pricing.planOnlyDesc}</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
                  {onlineNoCallPackages.map((pkg, i) => (
                    <PricingCard 
                      key={i} 
                      title={`${pkg.duration} ${pkg.duration === 1 ? t.pricing.month : t.pricing.months}`} 
                      price={pkg.price} 
                      subtitle={pkg.duration > 1 ? `~ ${pkg.perMonth}${lang === 'en' ? ' VND' : 'đ'} ${t.pricing.perMonth}` : ""}
                      discount={pkg.discount ? (lang === "en" ? `Save ~${pkg.discount}` : `Giảm ~${pkg.discount}`) : undefined}
                      popular={pkg.popular}
                      onClick={handleBook}
                      cta={t.pricing.cta}
                      period={pkg.duration === 1 ? t.pricing.perMonth : undefined}
                      currency={lang === 'en' ? 'VND' : 'VNĐ'}
                      mostPopularText={t.pricing.mostPopular}
                      features={(t as any).pricing.featuresOnlineNoCall || []}
                    />
                  ))}
                </div>
                {/* Mobile Shared Benefits Bar */}
                <div className="md:hidden mt-5 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider block mb-1">
                    {lang === 'en' ? '★ ALL PACKAGES INCLUDE' : '★ MỌI GÓI TẬP ĐỀU BAO GỒM'}
                  </span>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {lang === 'en' 
                      ? 'Detailed training split • Macro & nutrition protocol • Video form review • Direct messaging support' 
                      : 'Lịch tập chi tiết độc bản • Phân bổ macro & dinh dưỡng • Chấm sửa form qua video • Nhắn tin hỗ trợ trực tiếp'}
                  </p>
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
  discount,
  period,
  popular, 
  onClick, 
  cta,
  mostPopularText,
  currency,
  features
}: { 
  title: string, 
  price: string, 
  subtitle?: string, 
  discount?: string,
  period?: string,
  popular?: boolean, 
  onClick: () => void, 
  cta: string,
  mostPopularText: string,
  currency?: string,
  features: string[]
}) {
  return (
    <div className={`relative flex flex-col p-3.5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl transition-all duration-300 overflow-hidden group ${
      popular 
        ? "bg-zinc-900 border-2 border-white transform md:-translate-y-4 shadow-2xl" 
        : "bg-transparent border border-zinc-800 hover:border-zinc-600"
    }`}>
      {popular && (
        <div className="absolute top-0 left-0 w-full bg-white py-0.5 sm:py-1 text-center">
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-black">{mostPopularText}</span>
        </div>
      )}
      
      <h3 className={`text-xs sm:text-base md:text-xl font-bold uppercase tracking-wider mb-2 sm:mb-4 text-center ${popular ? 'mt-3 sm:mt-4' : ''}`}>{title}</h3>
      
      <div className="flex flex-col items-center justify-center mb-2 sm:mb-6 min-h-[46px] sm:min-h-[70px]">
        <div className="flex items-baseline justify-center">
          <span className="text-xl sm:text-3xl md:text-5xl font-impact tracking-wider text-white">{price}</span>
          <span className="text-[10px] sm:text-sm md:text-base font-bold text-zinc-400 ml-1">{currency || "VNĐ"}</span>
        </div>
        {period && <div className="text-zinc-400 text-[10px] sm:text-xs md:text-sm font-medium mt-0.5">{period}</div>}
      </div>

      <div className="flex flex-col items-center justify-center gap-1 mb-3 sm:mb-6 min-h-[32px] sm:min-h-[44px]">
        {subtitle ? (
          <div className="text-[10px] sm:text-xs md:text-sm font-medium text-zinc-400 text-center leading-tight line-clamp-1">{subtitle}</div>
        ) : (
          <div className="text-[10px] sm:text-xs md:text-sm font-medium text-transparent text-center select-none">-</div>
        )}
        {discount && (
          <span className="text-[9px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
            {discount}
          </span>
        )}
      </div>

      {/* Detailed checklist visible on desktop, hidden on mobile to keep cards compact & punchy */}
      {features && features.length > 0 && (
        <ul className="hidden md:block mb-8 space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
              <Check className="w-4 h-4 text-white mt-0.5 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-2 sm:pt-4">
        <button 
          onClick={onClick}
          className={`w-full py-2.5 sm:py-3.5 px-2 sm:px-6 rounded-lg font-sans font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1 shadow-sm ${
            popular 
              ? "bg-white text-black hover:bg-zinc-200 font-black" 
              : "bg-zinc-900 border border-zinc-700 text-white hover:bg-white hover:text-black"
          }`}
        >
          {cta}
        </button>
      </div>
    </div>
  );
}
