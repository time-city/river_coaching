import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import FloatingActions from "@/components/FloatingActions";
import SalesPopup from "@/components/SalesPopup";
import PromoModal from "@/components/PromoModal";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

const oswald = Oswald({
  weight: ["500", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "RIVER | Coaching Profile",
  description: "Magazine High-Impact Athletic Coaching Profile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-sans bg-background text-text antialiased selection:bg-white selection:text-black">
        <LanguageProvider>
          <LanguageToggle />
          <FloatingActions />
          <SalesPopup />
          <PromoModal />
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
