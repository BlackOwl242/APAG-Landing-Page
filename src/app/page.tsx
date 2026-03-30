import Nav from "@/components/organisms/Nav";
import HeroSection from "@/components/organisms/HeroSection";
import HeadquartersSection from "@/components/organisms/HeadquartersSection";
import BranchesSection from "@/components/organisms/BranchesSection";
import AboutSection from "@/components/organisms/AboutSection";
import HistorySection from "@/components/organisms/HistorySection";
import ServicesSection from "@/components/organisms/ServicesSection";

import TimelineSection from "@/components/organisms/TimelineSection";
import FinancialSection from "@/components/organisms/FinancialSection";
import AdmissionsSection from "@/components/organisms/AdmissionsSection";
import AdmissionsMethodsCTA from "@/components/organisms/AdmissionsMethodsCTA";
import ProgramsGroup1Section from "@/components/organisms/ProgramsGroup1Section";
import Footer from "@/components/organisms/Footer";
import { SectionDivider } from "@/components/atoms";

export default function Home() {
  return (
    <main className="relative bg-[#FAFAFA] w-full min-h-screen selection:bg-[#ed1c29] selection:text-[#FAFAFA]">
      <Nav />
      <HeroSection />
      
      {/* Intro & Setup */}
      <HeadquartersSection />
      <SectionDivider />
      <BranchesSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <HistorySection />

      {/* Functionality */}
      <ServicesSection />
      
      {/* Academic Programs & Target Quotas */}
      <ProgramsGroup1Section />

      {/* Meta & Admissions */}
      <SectionDivider />
      <AdmissionsMethodsCTA />
      <SectionDivider />
      
      <TimelineSection />
      <SectionDivider />
      <FinancialSection />
      <SectionDivider />
      <AdmissionsSection />
      <Footer />
    </main>
  );
}
