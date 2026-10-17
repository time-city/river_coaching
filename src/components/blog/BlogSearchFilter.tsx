"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Clock, ArrowRight, BookOpen, Flame } from 'lucide-react';
import { BlogPost, getPostLocalized } from '@/data/blogPosts';
import { useLanguage } from '@/components/LanguageContext';

interface BlogSearchFilterProps {
  posts: BlogPost[];
}

export default function BlogSearchFilter({ posts }: BlogSearchFilterProps) {
  const { t, lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Localize posts according to current language
  const localizedPosts = useMemo(() => {
    return posts.map((p) => getPostLocalized(p, lang));
  }, [posts, lang]);

  const allLabel = lang === 'en' ? 'All' : 'Tất Cả';

  const categories = useMemo(() => {
    const list = Array.from(new Set(localizedPosts.map((p) => p.category)));
    return ['All', ...list];
  }, [localizedPosts]);

  const filteredPosts = useMemo(() => {
    return localizedPosts.filter((post) => {
      const matchCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.deck.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchCategory && matchQuery;
    });
  }, [localizedPosts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    if (selectedCategory === 'All' && !searchQuery) {
      return localizedPosts.find((p) => p.featured) || localizedPosts[0];
    }
    return null;
  }, [localizedPosts, selectedCategory, searchQuery]);

  const gridPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  return (
    <div className="w-full">
      {/* Search & Category Filter Header Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-zinc-800 mb-10">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? localizedPosts.length
                : localizedPosts.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;
            const displayLabel = cat === 'All' ? allLabel : cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-lg'
                    : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                <span>{displayLabel}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-black/10 text-black' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.blog?.searchPlaceholder || 'Tìm kiếm kiến thức...'}
            className="w-full bg-zinc-900/90 border border-zinc-800 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Featured Cover Story (Báo đinh) */}
      {featuredPost && (
        <article className="mb-14 group">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl transition-all duration-500 hover:border-zinc-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Cover Image */}
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[320px] lg:min-h-[460px] overflow-hidden bg-zinc-900">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0a0a0a]" />

                {/* Badge on Image */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 bg-red-600 text-white font-impact tracking-widest text-xs uppercase rounded-sm shadow-lg flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    {t.blog?.featuredBadge || 'TIÊU ĐIỂM CHUYÊN SAN'}
                  </span>
                  <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-zinc-300 font-mono text-[11px] uppercase tracking-wider rounded-sm border border-white/10">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              {/* Cover Editorial Content */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-[#0a0a0a]">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
                    <span>{featuredPost.publishedAt}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Clock className="w-3 h-3" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="font-impact text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide uppercase leading-tight mb-4 group-hover:text-red-400 transition-colors">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="font-sans text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                    {featuredPost.deck}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {featuredPost.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author & CTA Row */}
                <div className="pt-6 border-t border-zinc-900 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-10 h-10 rounded-full border border-zinc-700 object-cover bg-zinc-900"
                    />
                    <div>
                      <div className="text-xs font-bold text-white tracking-wider uppercase">
                        {featuredPost.author.name}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-medium">
                        {featuredPost.author.role}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-all group/btn"
                  >
                    <span>{t.blog?.readArticle || 'Đọc Bài Viết'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* Grid of Articles (Newspaper Columns) */}
      {gridPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {gridPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between bg-zinc-950/70 rounded-xl border border-zinc-850 hover:border-zinc-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <div>
                {/* Thumbnail */}
                <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-zinc-900">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-0.5 bg-black/80 backdrop-blur-md text-white font-mono text-[10px] uppercase tracking-wider rounded-sm border border-white/10">
                      {post.category}
                    </span>
                  </div>
                </Link>

                {/* Card Content */}
                <div className="p-5 sm:p-6">
                  {/* Metadata */}
                  <div className="flex items-center gap-2.5 text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
                    <span>{post.publishedAt}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Headline */}
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="font-impact text-xl sm:text-2xl text-white tracking-wide uppercase leading-tight mb-3 group-hover:text-red-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Deck */}
                  <p className="font-sans text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.deck}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-zinc-900 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full border border-zinc-800 object-cover bg-zinc-900"
                  />
                  <span className="text-[11px] font-medium text-zinc-400">{post.author.name}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold uppercase tracking-wider text-white group-hover:text-red-400 flex items-center gap-1 text-[11px] transition-colors"
                >
                  <span>{t.blog?.details || 'Chi tiết'}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/40">
          <BookOpen className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <h3 className="font-impact text-xl text-white uppercase tracking-wider mb-2">
            {t.blog?.noArticlesFound || 'Không tìm thấy bài viết phù hợp'}
          </h3>
          <p className="text-zinc-500 text-sm max-w-md mx-auto mb-6">
            {t.blog?.noArticlesDesc || 'Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc để xem toàn bộ ấn phẩm chuyên san.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
          >
            {t.blog?.clearFilters || 'Xem Tất Cả Bài Viết'}
          </button>
        </div>
      )}
    </div>
  );
}
