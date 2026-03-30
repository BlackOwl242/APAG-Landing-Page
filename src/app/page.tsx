import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import HeadquartersSection from "@/components/HeadquartersSection";
import BranchesSection from "@/components/BranchesSection";
import AboutSection from "@/components/AboutSection";
import HistorySection from "@/components/HistorySection";
import ServicesSection from "@/components/ServicesSection";

import TimelineSection from "@/components/TimelineSection";
import FinancialSection from "@/components/FinancialSection";
import AdmissionsSection from "@/components/AdmissionsSection";
import AdmissionsMethodsCTA from "@/components/AdmissionsMethodsCTA";
import ProgramsGroup1Section from "@/components/ProgramsGroup1Section";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#FAFAFA] w-full min-h-screen selection:bg-[#ed1c29] selection:text-[#FAFAFA]">
      <Nav />
      <HeroSection />
      
      {/* Intro & Setup */}
      <HeadquartersSection />
      <div className="w-full h-[clamp(2rem,6vw,5rem)] bg-[#FAFAFA]" />
      <BranchesSection />
      <div className="w-full h-[clamp(2rem,6vw,5rem)] bg-[#FAFAFA]" />
      <AboutSection />
      <div className="w-full h-[clamp(2rem,6vw,5rem)] bg-[#FAFAFA]" />
      <HistorySection />

      {/* Functionality */}
      <ServicesSection />
      
      {/* Academic Programs & Target Quotas */}
      <ProgramsGroup1Section />

      {/* Meta & Admissions */}
      <div className="w-full h-[clamp(2rem,6vw,5rem)] bg-[#FAFAFA]" />
      <AdmissionsMethodsCTA />
      <div className="w-full h-[clamp(2rem,6vw,5rem)] bg-[#FAFAFA]" />
      
      <TimelineSection />
      <div className="w-full h-[clamp(2rem,6vw,5rem)] bg-[#FAFAFA]" />
      <FinancialSection />
      <div className="w-full h-[clamp(2rem,6vw,5rem)] bg-[#FAFAFA]" />
      <AdmissionsSection />
      <Footer />
    </main>
  );
}
