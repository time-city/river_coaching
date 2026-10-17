"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Menu, X, ArrowUpRight, Flame } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export default function BlogNavbar() {
  const { t, lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
        ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-zinc-800 shadow-2xl py-3'
        : 'bg-[#0a0a0a] border-b border-zinc-900 py-4'
      }`}>
      {/* Top Editorial Ticker Bar */}
      <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto px-6 pb-2 text-[11px] font-mono tracking-wider text-zinc-500 uppercase border-b border-zinc-900/60 mb-3">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          <span className="text-zinc-400 font-semibold">{t.blog?.theJournal || 'THE RIVER JOURNAL'}</span>
          <span>•</span>
          <span>{t.blog?.mastheadSub || 'CHUYÊN SAN KHOA HỌC THỂ HÌNH & KỶ LUẬT'}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{lang === 'en' ? 'VOL. 01 • ISSUED 2026' : 'TẬP 01 • NĂM 2026'}</span>
          <span>•</span>
          <span className="text-zinc-400">{t.blog?.editorialTag || 'RIVER BLOG'}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-impact text-2xl sm:text-3xl text-white tracking-wider uppercase group-hover:text-red-500 transition-colors">
              RIVER
            </span>
            <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase px-2 py-0.5 rounded-sm bg-zinc-900 border border-zinc-800">
              BLOG
            </span>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t.blog?.nav?.home || 'Trang Chủ'}
          </Link>

          <Link
            href="/blog"
            className="text-xs font-bold uppercase tracking-widest text-white hover:text-red-400 transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-red-500" />
            {t.blog?.nav?.allArticles || 'Tất Cả Bài Viết'}
          </Link>

          <Link
            href="/#pricing-section"
            className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            {t.blog?.nav?.plans || 'Gói Huấn Luyện'}
          </Link>

          <Link
            href="/#feedback-section"
            className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            {t.blog?.nav?.transformations || 'Biến Đổi Khách Hàng'}
          </Link>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new Event('openPromoModal'))}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md hover:scale-105"
          >
            <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600" />
            {t.blog?.nav?.plan699k || 'Giáo Án 699k'}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white border border-zinc-800 rounded-sm bg-zinc-900"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#0d0d0d] px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm font-bold uppercase tracking-wider text-zinc-300 py-2 border-b border-zinc-900"
          >
            <span>{t.blog?.nav?.home || 'Trang Chủ'}</span>
            <ArrowLeft className="w-4 h-4 text-zinc-500" />
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm font-bold uppercase tracking-wider text-white py-2 border-b border-zinc-900"
          >
            <span className="text-red-400">{t.blog?.nav?.allArticles || 'Tất Cả Bài Viết'}</span>
            <ArrowUpRight className="w-4 h-4 text-red-400" />
          </Link>
          <Link
            href="/#pricing-section"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm font-bold uppercase tracking-wider text-zinc-300 py-2 border-b border-zinc-900"
          >
            <span>{t.blog?.nav?.plans || 'Gói Huấn Luyện'}</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-500" />
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              window.dispatchEvent(new Event('openPromoModal'));
            }}
            className="w-full mt-2 py-3 bg-white text-black font-bold uppercase tracking-wider text-xs rounded-sm text-center flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 text-red-600 fill-red-600" />
            {t.blog?.nav?.plan699k || 'Giáo Án 699k'}
          </button>
        </div>
      )}
    </header>
  );
}
