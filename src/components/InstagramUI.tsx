"use client";

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

type Post = {
  id: number;
  img: string;
  link: string;
  caption: string;
};


export default function InstagramUI({ 
  followerCount, 
  posts 
}: { 
  followerCount: string;
  posts: Post[];
}) {
  const { t } = useLanguage();
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  return (
    <section className="w-full bg-[#0a0a0a] py-24 px-4 md:px-8 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Layout */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          {/* Left Side: Heading */}
          <h2 className="font-impact text-4xl md:text-5xl text-[#a1a1aa] tracking-widest uppercase text-center md:text-left">
            {t.igsection.title}
          </h2>

          {/* Right Side: Mini Profile Banner */}
          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-full p-2 pr-2 md:pr-4 flex items-center justify-between gap-3 shadow-lg max-w-full overflow-hidden hover:border-zinc-500 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-zinc-700 shrink-0 bg-zinc-900 flex items-center justify-center relative">
                <img
                  src="/IMG_2089-Photoroom.png"
                  alt="Instagram Profile"
                  className="w-full h-full object-cover object-[center_30%] scale-[1.15]"
                />
              </div>

              {/* IG Handle & Followers */}
              <div className="flex flex-col">
                <span className="font-bold text-white leading-tight text-sm md:text-base">@_river.nguyen_</span>
                <span className="text-xs text-zinc-400">{followerCount} {t.igsection.followers}</span>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="https://www.instagram.com/_river.nguyen_/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black rounded-full px-4 py-2 font-bold text-xs md:text-sm flex items-center gap-2 hover:bg-zinc-200 transition-colors shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 hidden sm:block">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span>{t.igsection.follow}</span>
            </a>
          </div>
        </div>

        {/* Swiper Slider */}
        <div 
          className="w-full relative group/slider"
          onMouseEnter={() => swiperInstance?.autoplay?.stop()}
          onMouseLeave={() => swiperInstance?.autoplay?.start()}
        >
          <Swiper
            onSwiper={setSwiperInstance}
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: {
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
            navigation={{ nextEl: '.ig-next', prevEl: '.ig-prev' }}
            className="ig-swiper w-full pt-4 pb-16 cursor-grab active:cursor-grabbing"
          >
            <style>{`
              .ig-swiper .swiper-wrapper {
                transition-timing-function: linear !important;
              }
            `}</style>
            {posts.map((post) => (
              <SwiperSlide key={post.id}>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative w-full aspect-[4/5] rounded-xl overflow-hidden group border border-zinc-800 bg-[#0a0a0a]"
                >
                  {post.img.endsWith('.mov') || post.img.endsWith('.mp4') ? (
                    <video
                      src={post.img}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
                    />
                  ) : (
                    <img
                      src={post.img}
                      alt={`Instagram Post ${post.id}`}
                      className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
                    />
                  )}

                  {/* Subtle overlay to enhance hover effect */}
                  <div className="absolute inset-0 bg-[#0a0a0a]/10 group-hover:bg-transparent transition-colors duration-500" />

                  {/* Custom Footer for Captions */}
                  <div className="absolute bottom-0 left-0 w-full p-6 pt-12 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white font-medium text-sm leading-tight mb-2 line-clamp-3">{post.caption}</p>
                    <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider">{t.igsection.viewOnIg}</p>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons (Placed OUTSIDE Swiper to avoid overflow:hidden clipping) */}
          <button 
            onClick={() => swiperInstance?.slidePrev()} 
            className="ig-prev absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-[#0a0a0a]/70 hover:bg-[#0a0a0a] text-white rounded-full hidden md:flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-300 shadow-xl backdrop-blur-sm border border-white/20 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button 
            onClick={() => swiperInstance?.slideNext()} 
            className="ig-next absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-[#0a0a0a]/70 hover:bg-[#0a0a0a] text-white rounded-full hidden md:flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-300 shadow-xl backdrop-blur-sm border border-white/20 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
      </div>
      </div>
    </section>
  );
}
