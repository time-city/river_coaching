"use client";

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

export default function FeedbackSection() {
  const { t } = useLanguage();
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  // This array defines the feedback images (2 per frame for before/after).
  // Images are sourced from the `public/transform/` directory.
  const feedbacks = [
    { id: 1, img2: '/transform/1/IMG_5823.JPG', img1: '/transform/1/IMG_5822.JPG' },
    { id: 2, img1: '/transform/2/IMG_58.PNG', img2: '/transform/2/IMG_5399.JPG' },
    { id: 3, img1: '/transform/3/IMG_581.PNG', img2: '/transform/3/IMG_5826.PNG' },
    { id: 4, img2: '/transform/4/5624F8F0-D89F-48DF-B222-6382F67A663D%202.JPG', img1: '/transform/4/26F63DA9-7545-4581-B40E-1ADC7500F520%203.JPG' },
    { id: 5, img1: '/transform/5/_DSC7354%202.JPG', img2: '/transform/5/IMG_1645%202.jpg' },
    { id: 6, img1: '/transform/6/IMG_11.jpg', img2: '/transform/6/IMG_1646%202.jpg' },
    { id: 7, img2: '/transform/7/52527C25-F685-475C-AF1A-5928D9501E3B.JPG', img1: '/transform/7/830C0968-19FC-4D62-ADB5-7FB66A93CA77.JPG' },
    { id: 8, img2: '/transform/8/IMG_1789%202.jpg', img1: '/transform/8/IMG_1809%202.jpg' },
    { id: 9, img1: '/transform/9/IMG_5870%203.PNG', img2: '/transform/9/IMG_5872%203.jpg' },
  ];

  return (
    <section id="feedback-section" className="w-full bg-[#0a0a0a] py-24 px-4 md:px-8 border-t border-zinc-900 relative overflow-hidden">
      {/* Background styling for depth */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-600 to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-impact text-5xl md:text-6xl text-white tracking-widest uppercase mb-4">
            {t.feedback.title}
          </h2>
          <p className="text-zinc-400 uppercase tracking-[0.2em] text-sm md:text-base font-bold">
            {t.feedback.subtitle}
          </p>
        </div>

        {/* Feedback Slider */}
        <div
          className="w-full relative group/slider"
          onMouseEnter={() => swiperInstance?.autoplay?.stop()}
          onMouseLeave={() => swiperInstance?.autoplay?.start()}
        >
          <Swiper
            onSwiper={setSwiperInstance}
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            speed={15000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="feedback-swiper w-full pt-4 pb-16 cursor-grab active:cursor-grabbing"
          >
            <style>{`
              .feedback-swiper .swiper-wrapper {
                transition-timing-function: linear !important;
              }
            `}</style>
            {feedbacks.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="py-6 px-1">
                  <div className="grid grid-cols-2 w-full aspect-[14/10] md:aspect-[16/10] rounded-2xl overflow-hidden group border border-zinc-800 bg-zinc-900 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-zinc-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] isolate transform-gpu">

                  {/* Image 1 (Before) */}
                  <div className="relative w-full h-full border-r border-zinc-800 overflow-hidden rounded-l-2xl isolate group/img1">
                    <img
                      src={item.img1}
                      alt={`Client Transformation Before ${item.id}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 text-zinc-600 font-impact text-sm md:text-xl tracking-widest p-2 text-center">
                      {item.img1}
                    </div>
                    {/* BEFORE Badge */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0a0a0a]/70 backdrop-blur-md px-4 py-1 md:px-6 md:py-1.5 rounded-full border border-white/10 z-10 shadow-lg pointer-events-none transition-transform duration-300 group-hover/img1:-translate-y-1">
                      <span className="text-white font-impact tracking-widest text-xs md:text-sm uppercase">BEFORE</span>
                    </div>
                  </div>

                  {/* Image 2 (After) */}
                  <div className="relative w-full h-full overflow-hidden rounded-r-2xl isolate group/img2">
                    <img
                      src={item.img2}
                      alt={`Client Transformation After ${item.id}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 text-zinc-600 font-impact text-sm md:text-xl tracking-widest p-2 text-center">
                      {item.img2}
                    </div>
                    {/* AFTER Badge */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-600/80 backdrop-blur-md px-4 py-1 md:px-6 md:py-1.5 rounded-full border border-red-500/30 z-10 shadow-lg pointer-events-none transition-transform duration-300 group-hover/img2:-translate-y-1">
                      <span className="text-white font-impact tracking-widest text-xs md:text-sm uppercase">AFTER</span>
                    </div>
                  </div>
                  
                  {/* Context Overlay */}
                  <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-sm z-20 shadow-xl pointer-events-none group-hover:-translate-y-2 transition-transform duration-500">
                    <span className="text-white text-xs font-bold uppercase tracking-widest">
                      {item.id % 2 === 0 ? `16 ${(t as any).feedback?.weeks || 'Weeks'} | ${(t as any).feedback?.tagMuscle || 'Muscle Building'}` : `12 ${(t as any).feedback?.weeks || 'Weeks'} | ${(t as any).feedback?.tagFatLoss || 'Fat Loss'}`}
                    </span>
                  </div>
                </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </section>
  );
}
