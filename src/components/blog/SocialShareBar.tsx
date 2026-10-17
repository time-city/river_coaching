import React, { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

interface SocialShareBarProps {
  title: string;
  slug: string;
  description?: string;
}

export default function SocialShareBar({ title, slug, description }: SocialShareBarProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const getFullUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/blog/${slug}`;
    }
    return `https://rivercoaching.vn/blog/${slug}`;
  };

  const handleCopyLink = async () => {
    try {
      const url = getFullUrl();
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(getFullUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleShareZalo = () => {
    const url = encodeURIComponent(getFullUrl());
    window.open(`https://sp.zalo.me/plugins/share?url=${url}`, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(getFullUrl());
    const text = encodeURIComponent(`${title} — River`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  return (
    <div className="w-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-xl p-4 sm:p-5 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Title & Status */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500 shrink-0">
          <Share2 className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-white">
            {t.blog?.shareThis || 'Chia Sẻ Kiến Thức Này'}
          </div>
          <div className="text-[11px] text-zinc-400 font-mono truncate max-w-[240px] sm:max-w-[320px]">
            /blog/{slug}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center flex-wrap gap-2">
        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all duration-200 ${
            copied
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
              : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700/80 text-white hover:border-zinc-500'
          }`}
          title="Copy post link"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.blog?.copied || 'Đã sao chép link!'}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
              <span>{t.blog?.copyLink || 'Copy Link'}</span>
            </>
          )}
        </button>

        {/* Facebook Share */}
        <button
          onClick={handleShareFacebook}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/40 text-[#4599FF] transition-all"
          title="Chia sẻ lên Facebook"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span>Facebook</span>
        </button>

        {/* Zalo Share */}
        <button
          onClick={handleShareZalo}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#0068FF]/10 hover:bg-[#0068FF]/20 border border-[#0068FF]/40 text-[#388DFF] transition-all"
          title="Chia sẻ qua Zalo"
        >
          <span className="font-black text-[11px] tracking-tight">Zalo</span>
        </button>

        {/* Twitter/X Share */}
        <button
          onClick={handleShareTwitter}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/20 text-zinc-200 transition-all"
          title="Chia sẻ lên X (Twitter)"
        >
          <span className="font-black text-[11px]">𝕏</span>
        </button>
      </div>
    </div>
  );
}
