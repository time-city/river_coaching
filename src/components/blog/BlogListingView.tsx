"use client";

import React from 'react';
import Link from 'next/link';
import BlogSearchFilter from '@/components/blog/BlogSearchFilter';
import { BlogPost } from '@/data/blogPosts';
import { Flame, ShieldCheck, Dumbbell, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

interface BlogListingViewProps {
  posts: BlogPost[];
}

export default function BlogListingView({ posts }: BlogListingViewProps) {
  const { t, lang } = useLanguage();

  return (
    <div className="w-full">
      {/* Newspaper Masthead */}
      <section className="text-center pb-10 border-b border-zinc-800 mb-10">
        <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 pb-3 border-b border-zinc-900/80 mb-6">
          <span>{t.blog?.mastheadDate || 'XUẤT BẢN ĐỊNH KỲ'}</span>
          <span className="hidden sm:inline">
            {t.blog?.mastheadSub || 'KHOA HỌC • DINH DƯỠNG • KỶ LUẬT THỰC HÀNH'}
          </span>
          <span>{t.blog?.editorialTag || 'RIVER BLOG'}</span>
        </div>

        <h1 className="font-impact text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase text-white leading-none mb-3">
          {t.blog?.theJournal || 'THE RIVER JOURNAL'}
        </h1>

        <p className="font-serif italic text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
          &ldquo;{t.blog?.tagline || 'Không có đường tắt, không có chiêu trò. Chỉ có khoa học chuyển hóa chính xác và kỷ luật thực thi bền bỉ.'}&rdquo;
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-400 uppercase tracking-wider pt-4 border-t border-zinc-900/80">
          <span className="flex items-center gap-1.5 text-red-500">
            <Award className="w-3.5 h-3.5" /> {t.blog?.bronzeVcs || '3x Bronze VCS 2026'}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Dumbbell className="w-3.5 h-3.5 text-zinc-500" /> {t.blog?.experience || '5+ Năm Thực Chiến'}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" /> {t.blog?.scienceBacked || 'Dinh Dưỡng Khoa Học'}
          </span>
        </div>
      </section>

      {/* Blog Search & Grid */}
      <BlogSearchFilter posts={posts} />

      {/* Editorial Consultation Callout Banner */}
      <section className="mt-20 p-8 sm:p-12 rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900/60 to-black relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-widest rounded-sm mb-4">
            <Flame className="w-3.5 h-3.5 fill-current" />
            {t.blog?.ctaBadge || 'LỘ TRÌNH HUẤN LUYỆN 1:1 ĐỘC BẢN'}
          </span>
          <h2 className="font-impact text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-wide leading-tight mb-4">
            {t.blog?.ctaTitle || 'Áp Dụng Khoa Học Này Vào Chính Thể Trạng Của Bạn'}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">
            {t.blog?.ctaDesc ||
              'Mỗi cơ thể có tỉ lệ chuyển hóa, cấu trúc xương và lối sống khác nhau. Hãy để mình trực tiếp phân tích chỉ số, đo ni đóng giày giáo án tập luyện và thực đơn cá nhân hóa cho bạn.'}
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/#pricing-section"
              className="px-6 py-3.5 bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-widest rounded-sm text-center transition-all shadow-xl hover:scale-105"
            >
              {t.blog?.ctaBtn || 'Xem Các Gói Huấn Luyện'}
            </Link>
            <Link
              href="/"
              className="px-6 py-3.5 bg-transparent border border-zinc-700 hover:border-white text-white text-xs font-bold uppercase tracking-widest rounded-sm text-center transition-all flex items-center justify-center gap-2"
            >
              <span>{t.blog?.homeCta || 'Về Trang Chủ'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
