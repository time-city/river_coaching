import React from 'react';
import type { Metadata } from 'next';
import BlogNavbar from '@/components/blog/BlogNavbar';
import BlogListingView from '@/components/blog/BlogListingView';
import Footer from '@/components/Footer';
import { getAllPosts } from '@/data/blogPosts';

export const metadata: Metadata = {
  title: "THE RIVER JOURNAL | Tạp Chí Khoa Học Thể Hình, Dinh Dưỡng & Kỷ Luật",
  description: "Chuyên san kiến thức thể hình thực chiến bởi River: Khoa học Body Recomposition, tối ưu Hypertrophy, nghệ thuật thâm hụt calo và tư duy vận động viên Men's Physique.",
  openGraph: {
    title: "THE RIVER JOURNAL | Tạp Chí Khoa Học Thể Hình & Kỷ Luật",
    description: "Kho kiến thức thể hình thực chiến chuẩn y khoa & khoa học vận động từ River.",
    url: "https://rivercoaching.vn/blog",
    siteName: "River Coaching",
    images: [
      {
        url: "/discipline.jpeg",
        width: 1200,
        height: 630,
        alt: "The River Journal",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE RIVER JOURNAL | Tạp Chí Khoa Học Thể Hình & Kỷ Luật",
    description: "Kho kiến thức thể hình thực chiến từ River.",
    images: ["/discipline.jpeg"],
  },
};

export default function BlogListingPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-white selection:text-black">
      <BlogNavbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <BlogListingView posts={posts} />
      </main>
      <Footer />
    </div>
  );
}
