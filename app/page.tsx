import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CategorySection from "@/components/CategorySection";
import BestSellers from "@/components/BestSellers";
import CustomCakeBanner from "@/components/CustomCakeBanner";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <CategorySection />
        <BestSellers />
        <CustomCakeBanner />
      </main>
      <Footer />
    </>
  );
} 
