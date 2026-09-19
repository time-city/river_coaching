"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useLanguage } from "./LanguageContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

type IGPost = {
  id: number;
  type: "image" | "video";
  mediaUrl: string;
  link: string;
  caption: string;
};

const igPosts: IGPost[] = [
  {
    id: 1,
    type: "image",
    mediaUrl: "/post1.jpg", 
    link: "https://www.instagram.com/p/DYwnBbtEsyX/?img_index=2",
    caption: "Hardware secured. Bringing it home. 3x 🥉 from VCS 2026.",
  },
  {
    id: 2,
    type: "video",
    mediaUrl: "/post2.mov",
    link: "https://www.instagram.com/p/DYMwYbHy66j/",
    caption: "12dayouts #danang #vietnamchampionshowdown2026",
  },
  {
    id: 3,
    type: "image",
    mediaUrl: "/post3.png", 
    link: "https://www.instagram.com/p/DYE-JYZEvCN/?img_index=1",
    caption: "15 dayouts - U20 #roadtovcs",
  },
];

export default function IGSlider() {
  const { t } = useLanguage();
  
  return (
    <section className="w-full min-h-[100dvh] flex flex-col justify-center py-16 md:py-0 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12 flex justify-between items-end w-full">
        <div>
          <span className="text-accent text-sm font-bold tracking-widest uppercase block mb-2">{t.igslider.social}</span>
        </div>
        <a 
          href="https://www.instagram.com/_river.nguyen_/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:inline-block border border-zinc-700 px-6 py-3 uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-all duration-500 ease-out"
        >
          {t.igslider.follow}
        </a>
      </div>

      <div className="w-full px-6 md:px-12">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          centerInsufficientSlides={true}
          className="w-full pb-12 cursor-grab active:cursor-grabbing"
        >
          {igPosts.map((post, index) => {
            return (
              <SwiperSlide key={post.id}>
                <a 
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-[#0a0a0a] rounded-xl border border-zinc-800 group transform-gpu"
                >
                  {post.type === 'video' ? (
                    <video 
                      src={post.mediaUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-[opacity,transform] duration-700 ease-out transform-gpu"
                    />
                  ) : (
                    <img 
                      src={post.mediaUrl}
                      alt={`Instagram Post ${post.id}`}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-[opacity,transform] duration-700 ease-out transform-gpu"
                    />
                  )}
                  
                  {/* Hover Overlay with Icon */}
                  <div className="absolute inset-0 bg-[#0a0a0a]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/40 group-hover:scale-110 transition-[background-color,transform] duration-500 transform-gpu">
                      {post.type === 'video' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-white ml-2">
                          <path d="M8 5.14v14l11-7-11-7z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-white">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  {/* Custom Footer */}
                  <div className="absolute bottom-0 left-0 w-full p-6 pt-12 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-white font-medium text-sm leading-tight mb-2 line-clamp-3">{post.caption}</p>
                    <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Xem trên Instagram</p>
                  </div>
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      
      <div className="mt-8 text-center md:hidden px-6">
        <a 
          href="https://www.instagram.com/_river.nguyen_/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block w-full border border-zinc-700 px-6 py-4 uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-all duration-500 ease-out"
        >
          {t.igslider.follow}
        </a>
      </div>
    </section>
  );
}
