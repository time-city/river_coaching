"use client";

import React, { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";
import { useLanguage } from "./LanguageContext";

export default function Booking() {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="booking-section" className="w-full py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-5xl sm:text-7xl md:text-[9rem] font-impact leading-none uppercase tracking-tighter">
          {t.booking.title1} <br className="hidden md:block" /> {t.booking.title2}
        </h2>
        <h3 className="text-5xl md:text-7xl font-impact uppercase mt-4 text-accent">
          {t.booking.title3}
        </h3>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 w-full h-[700px]">
        {/* We use mounted state to prevent hydration mismatches with external scripts */}
        {mounted && (
          <InlineWidget 
            url="https://calendly.com/your-calendly-link" 
            styles={{
              height: '100%',
              width: '100%',
            }}
            pageSettings={{
              backgroundColor: '0a0a0a',
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: 'ffffff',
              textColor: 'ffffff'
            }}
          />
        )}
      </div>
    </section>
  );
}
