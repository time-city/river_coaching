"use client";

import React from 'react';
import Link from 'next/link';
import SocialShareBar from '@/components/blog/SocialShareBar';
import { BlogPost, getPostLocalized } from '@/data/blogPosts';
import { useLanguage } from '@/components/LanguageContext';
import {
  Clock,
  Calendar,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Quote,
  Award,
  BookOpen,
  Flame,
} from 'lucide-react';

interface BlogPostDetailViewProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}

export default function BlogPostDetailView({
  post,
  relatedPosts,
  prevPost,
  nextPost,
}: BlogPostDetailViewProps) {
  const { t, lang } = useLanguage();

  const currentPost = getPostLocalized(post, lang);
  const localizedRelated = relatedPosts.map((p) => getPostLocalized(p, lang));
  const localizedPrev = prevPost ? getPostLocalized(prevPost, lang) : null;
  const localizedNext = nextPost ? getPostLocalized(nextPost, lang) : null;

  return (
    <div className="w-full">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6 overflow-x-auto pb-1 scrollbar-none">
        <Link href="/" className="hover:text-white transition-colors">
          {t.blog?.backHome || 'Trang Chủ'}
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-white transition-colors">
          {t.blog?.backToJournal || 'The River Journal'}
        </Link>
        <span>/</span>
        <span className="text-zinc-400 truncate max-w-[200px] sm:max-w-none">
          {currentPost.category}
        </span>
      </nav>

      {/* Article Header (Magazine Style) */}
      <header className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-red-600/10 border border-red-500/30 text-red-400 font-mono text-xs uppercase tracking-widest mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          {currentPost.category}
        </div>

        {/* Headline */}
        <h1 className="font-impact text-3xl sm:text-5xl md:text-6xl text-white tracking-wide uppercase leading-[1.15] md:leading-[1.1] mb-6">
          {currentPost.title}
        </h1>

        {/* Subheader / Deck */}
        <p className="font-serif italic text-zinc-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
          {currentPost.deck}
        </p>

        {/* Author Byline & Date Bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-4 border-y border-zinc-900 text-xs text-zinc-400 font-mono uppercase tracking-wider">
          <div className="flex items-center gap-2.5">
            <img
              src={currentPost.author.avatar}
              alt={currentPost.author.name}
              className="w-8 h-8 rounded-full border border-zinc-700 object-cover bg-zinc-900"
            />
            <span className="font-bold text-white tracking-widest">{currentPost.author.name}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <span>{currentPost.publishedAt}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{currentPost.readTime}</span>
          </div>
        </div>
      </header>

      {/* Top Social Share Bar */}
      <div className="max-w-4xl mx-auto mb-10">
        <SocialShareBar
          title={currentPost.title}
          slug={currentPost.slug}
          description={currentPost.deck}
        />
      </div>

      {/* Hero Cover Image with Newspaper Caption */}
      <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[16/9] sm:aspect-[21/10] shadow-2xl">
          <img
            src={currentPost.coverImage}
            alt={currentPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>
        <p className="text-[11px] font-mono text-zinc-500 text-center mt-2.5 uppercase tracking-wider">
          {lang === 'en'
            ? 'Editorial Photography • River Coaching Sports Science & Athletics'
            : 'Hình ảnh minh họa chuyên san • Huấn Luyện Thể Hình Chuyên Sâu River Coaching'}
        </p>
      </div>

      {/* Main Content & Sidebar Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Main Article Body (Col 8) */}
        <article className="lg:col-span-8 flex flex-col">
          {/* Quick Table of Contents Box */}
          <div className="bg-zinc-950/80 border border-zinc-850 rounded-xl p-5 mb-10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white mb-3 pb-2 border-b border-zinc-900">
              <BookOpen className="w-4 h-4 text-red-500" />
              <span>{t.blog?.tableOfContents || 'Nội Dung Bài Viết (Mục Lục)'}</span>
            </div>
            <ul className="space-y-2">
              {currentPost.sections.map((section, idx) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-xs text-zinc-400 hover:text-white transition-colors flex items-start gap-2"
                  >
                    <span className="font-mono text-red-500/80 shrink-0">{idx + 1}.</span>
                    <span className="line-clamp-1">{section.heading.replace(/^\d+\.\s*/, '')}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Structured Sections */}
          <div className="space-y-12">
            {currentPost.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                {/* Section Title */}
                <h2 className="font-impact text-2xl sm:text-3xl text-white tracking-wide uppercase leading-tight mb-5 pb-2 border-b border-zinc-900">
                  {section.heading}
                </h2>

                {/* Paragraphs */}
                <div className="space-y-4 text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
                  {section.content.map((paragraph, pIdx) => {
                    const isFirst = index === 0 && pIdx === 0;
                    if (isFirst) {
                      const firstLetter = paragraph.charAt(0);
                      const rest = paragraph.slice(1);
                      return (
                        <p
                          key={pIdx}
                          className="text-zinc-200 text-base sm:text-lg leading-relaxed"
                        >
                          <span className="float-left text-4xl sm:text-5xl font-impact text-white leading-none pr-3 pt-1 uppercase">
                            {firstLetter}
                          </span>
                          {rest}
                        </p>
                      );
                    }
                    return <p key={pIdx}>{paragraph}</p>;
                  })}
                </div>

                {/* Editorial Pull Quote */}
                {section.quote && (
                  <div className="my-8 relative pl-6 sm:pl-8 py-3 border-l-2 border-red-600 bg-gradient-to-r from-red-950/20 to-transparent rounded-r-lg">
                    <Quote className="w-6 h-6 text-red-500/40 absolute -top-2 left-2 pointer-events-none" />
                    <p className="font-serif italic text-base sm:text-lg text-white leading-relaxed">
                      &ldquo;{section.quote}&rdquo;
                    </p>
                  </div>
                )}

                {/* Key Takeaways Callout */}
                {section.keyTakeaways && (
                  <div className="my-8 p-5 sm:p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 shadow-xl">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white mb-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{t.blog?.keyTakeaways || 'Điểm Cốt Lõi Cần Nhớ'}</span>
                    </div>
                    <ul className="space-y-2.5">
                      {section.keyTakeaways.map((item, tIdx) => (
                        <li
                          key={tIdx}
                          className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tips Callout */}
                {section.tips && (
                  <div className="my-8 p-5 sm:p-6 rounded-xl bg-zinc-900/60 border border-amber-500/30 shadow-xl">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                      <Lightbulb className="w-4 h-4" />
                      <span>{t.blog?.coachTip || 'Mẹo Thực Hành Từ Mình'}</span>
                    </div>
                    <ul className="space-y-2">
                      {section.tips.map((tip, tipIdx) => (
                        <li
                          key={tipIdx}
                          className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2"
                        >
                          <span className="text-amber-400 font-bold shrink-0">→</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Article Tags */}
          <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase text-zinc-500 mr-2">
              {t.blog?.topics || 'Chủ Đề:'}
            </span>
            {currentPost.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Bottom Social Share Bar */}
          <div className="mt-10">
            <SocialShareBar
              title={currentPost.title}
              slug={currentPost.slug}
              description={currentPost.deck}
            />
          </div>

          {/* Author Signature Box */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-850 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <img
              src={currentPost.author.avatar}
              alt={currentPost.author.name}
              className="w-20 h-20 rounded-full border-2 border-zinc-700 object-cover bg-zinc-900 shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h3 className="font-impact text-xl text-white uppercase tracking-wider">
                  {currentPost.author.name}
                </h3>
                <span className="px-2 py-0.5 rounded-sm bg-red-600/20 text-red-400 text-[10px] font-bold uppercase tracking-wider border border-red-500/30">
                  {t.blog?.author || 'Tác Giả'}
                </span>
              </div>
              <div className="text-xs text-zinc-400 font-medium mb-3">
                {currentPost.author.role}
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                {currentPost.author.bio}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <Link
                  href="/#pricing-section"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>{t.blog?.consultAuthor || 'Tham Gia Huấn Luyện 1:1'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Next / Previous Navigation */}
          <div className="mt-12 pt-8 border-t border-zinc-900 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {localizedPrev ? (
              <Link
                href={`/blog/${localizedPrev.slug}`}
                className="p-4 rounded-xl border border-zinc-850 bg-zinc-950/60 hover:border-zinc-700 transition-all flex flex-col group"
              >
                <span className="text-[10px] font-mono uppercase text-zinc-500 flex items-center gap-1 mb-1">
                  <ArrowLeft className="w-3 h-3" /> {t.blog?.prevArticle || 'Bài Trước Đó'}
                </span>
                <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                  {localizedPrev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {localizedNext && (
              <Link
                href={`/blog/${localizedNext.slug}`}
                className="p-4 rounded-xl border border-zinc-850 bg-zinc-950/60 hover:border-zinc-700 transition-all flex flex-col items-end text-right group"
              >
                <span className="text-[10px] font-mono uppercase text-zinc-500 flex items-center gap-1 mb-1">
                  {t.blog?.nextArticle || 'Bài Kế Tiếp'} <ArrowRight className="w-3 h-3" />
                </span>
                <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                  {localizedNext.title}
                </span>
              </Link>
            )}
          </div>
        </article>

        {/* Sticky Editorial Sidebar (Col 4) */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
          {/* Quick Action Plan Card */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-red-400 uppercase tracking-widest mb-2 font-bold">
                <Flame className="w-3.5 h-3.5 fill-current" />
                {t.blog?.sidebarCtaBadge || 'GIÁO ÁN ĐO NI ĐÓNG GIÀY'}
              </span>
              <h4 className="font-impact text-xl text-white uppercase tracking-wider leading-tight mb-2">
                {t.blog?.sidebarCtaTitle || 'Biến Kiến Thức Thành Cơ Bắp Thực Tế'}
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed mb-5">
                {t.blog?.sidebarCtaDesc ||
                  'Đừng lãng phí thêm nhiều tháng tự mày mò và dậm chân tại chỗ. Đăng ký nhận giáo án 699k hoặc lộ trình 1:1 cùng mình.'}
              </p>
              <Link
                href="/#pricing-section"
                className="block w-full py-3 bg-white text-black hover:bg-zinc-200 text-center text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-lg hover:scale-[1.02]"
              >
                {t.blog?.sidebarCtaBtn || 'Xem Gói 699k & Huấn Luyện 1:1'}
              </Link>
            </div>
          </div>

          {/* River Credentials Box */}
          <div className="p-6 rounded-2xl border border-zinc-850 bg-zinc-950/80 shadow-xl">
            <h4 className="font-impact text-lg text-white uppercase tracking-wider mb-4 pb-2 border-b border-zinc-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-red-500" />
              {t.blog?.aboutAuthor || 'Đôi Nét Về Mình (River)'}
            </h4>
            <div className="space-y-3 text-xs text-zinc-300">
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>
                  <strong>{lang === 'en' ? "Men's Physique Athlete:" : 'Vận động viên Men’s Physique:'}</strong>{' '}
                  {lang === 'en'
                    ? '3x Bronze VCS 2026 (U21, U24, First-timer).'
                    : '3 Huy Chương Đồng VCS 2026 (U21, U24, First-timer).'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>
                  <strong>{lang === 'en' ? 'Practical Experience:' : 'Kinh nghiệm thực chiến:'}</strong>{' '}
                  {lang === 'en'
                    ? '5 years lifting, 2 years designing individualized training & macro blueprints.'
                    : '5 năm tập luyện, 2 năm trực tiếp thiết kế giáo án cho học viên.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>
                  <strong>{lang === 'en' ? 'Coaching Philosophy:' : 'Triết lý:'}</strong>{' '}
                  {lang === 'en'
                    ? 'Biological precision, evidence-based nutrition, and sustainable self-discipline.'
                    : 'Dinh dưỡng chuẩn xác, tôn trọng sinh học cơ thể, kỷ luật tự thân bền vững.'}
                </span>
              </div>
            </div>
          </div>

          {/* Related Posts in Sidebar */}
          {localizedRelated.length > 0 && (
            <div className="p-6 rounded-2xl border border-zinc-850 bg-zinc-950/80 shadow-xl">
              <h4 className="font-impact text-lg text-white uppercase tracking-wider mb-4 pb-2 border-b border-zinc-900">
                {t.blog?.relatedArticles || 'Bài Viết Đáng Đọc Khác'}
              </h4>
              <div className="space-y-4">
                {localizedRelated.map((rPost) => (
                  <Link
                    key={rPost.slug}
                    href={`/blog/${rPost.slug}`}
                    className="group flex gap-3 items-start"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
                      <img
                        src={rPost.coverImage}
                        alt={rPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                        {rPost.category}
                      </span>
                      <h5 className="font-impact text-xs sm:text-sm text-white group-hover:text-red-400 transition-colors uppercase leading-tight line-clamp-2">
                        {rPost.title}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Bottom Related Articles Section */}
      <section className="mt-20 pt-12 border-t border-zinc-900">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-red-500 block mb-1 font-bold">
              THE RIVER JOURNAL
            </span>
            <h3 className="font-impact text-2xl sm:text-3xl text-white uppercase tracking-wider">
              {t.blog?.relatedArticles || 'Bài Viết Cùng Chuyên Mục'}
            </h3>
          </div>
          <Link
            href="/blog"
            className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>{t.blog?.viewAll || 'Xem Tất Cả'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {localizedRelated.map((rPost) => (
            <article
              key={rPost.slug}
              className="group bg-zinc-950/60 rounded-xl border border-zinc-850 hover:border-zinc-700 overflow-hidden transition-all duration-300 shadow-lg"
            >
              <Link
                href={`/blog/${rPost.slug}`}
                className="block relative aspect-[16/10] overflow-hidden bg-zinc-900"
              >
                <img
                  src={rPost.coverImage}
                  alt={rPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md text-white font-mono text-[9px] uppercase tracking-wider rounded-sm border border-white/10">
                    {rPost.category}
                  </span>
                </div>
              </Link>
              <div className="p-4 sm:p-5">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                  {rPost.publishedAt} • {rPost.readTime}
                </div>
                <Link href={`/blog/${rPost.slug}`}>
                  <h4 className="font-impact text-lg text-white group-hover:text-red-400 transition-colors uppercase leading-tight line-clamp-2 mb-2">
                    {rPost.title}
                  </h4>
                </Link>
                <p className="text-xs text-zinc-400 line-clamp-2">{rPost.deck}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
