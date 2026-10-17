import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogNavbar from '@/components/blog/BlogNavbar';
import BlogPostDetailView from '@/components/blog/BlogPostDetailView';
import Footer from '@/components/Footer';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/data/blogPosts';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate Static Paths for blazing fast performance
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic SEO & OpenGraph Metadata for clean social sharing
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Không Tìm Thấy Bài Viết | The River Journal',
    };
  }

  const localized = post.vi;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rivercoaching.vn';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const fullCoverImage = post.coverImage.startsWith('http')
    ? post.coverImage
    : `${siteUrl}${post.coverImage}`;

  return {
    title: `${localized.title} | The River Journal`,
    description: localized.deck || localized.excerpt,
    keywords: localized.tags,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: localized.title,
      description: localized.deck || localized.excerpt,
      url: postUrl,
      siteName: 'The River Journal — River Coaching',
      images: [
        {
          url: fullCoverImage,
          width: 1200,
          height: 630,
          alt: localized.title,
        },
      ],
      type: 'article',
      publishedTime: localized.publishedAt,
      authors: [post.author.name],
      tags: localized.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: localized.title,
      description: localized.deck || localized.excerpt,
      images: [fullCoverImage],
      creator: '@rivercoaching',
    },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.vi.category, 3);
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-white selection:text-black">
      <BlogNavbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <BlogPostDetailView
          post={post}
          relatedPosts={relatedPosts}
          prevPost={prevPost}
          nextPost={nextPost}
        />
      </main>
      <Footer />
    </div>
  );
}
