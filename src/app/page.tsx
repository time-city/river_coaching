import Hero from "@/components/Hero";
import IntroLoader from "@/components/IntroLoader";
import About from "@/components/About";
import Workflow from "@/components/Workflow";
import Quiz from "@/components/Quiz";
import Calculator from "@/components/Calculator";
import PricingSection from "@/components/PricingSection";
import InstagramSection from "@/components/InstagramSection";
import FeedbackSection from "@/components/FeedbackSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] relative">
      <IntroLoader />
      <Hero />
      <About />
      <Workflow />
      <PricingSection />
      <FeedbackSection />
      <Calculator />
      <Quiz />
      <InstagramSection />
      <FAQ />
      <Footer />
    </main>
  );
}
