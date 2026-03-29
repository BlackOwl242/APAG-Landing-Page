"use client";

import React, { useEffect } from "react";
import Preloader from "@/components/Preloader";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ScoreCalculator from "@/components/ScoreCalculator";

export default function TinhDiemPage() {
  useEffect(() => {
    // Scroll to top to bypass browser scroll restoration issues
    document.documentElement.style.scrollBehavior = "auto";
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = "";
    }, 50);
  }, []);

  return (
    <main className="relative bg-[#FAFAFA] w-full min-h-screen selection:bg-[#ed1c29] selection:text-[#FAFAFA]">
      <Preloader />
      <TopBar />

      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 relative w-full overflow-hidden bg-[#FAFAFA]">
        <div className="container mx-auto max-w-7xl flex flex-col items-center">
            <h1 className="font-heading text-[clamp(2.5rem,6vw,80px)] font-black uppercase tracking-tighter text-[#2c2b7c] leading-[1.1] text-center mb-6 origin-bottom">
              <span className="text-[#ed1c29]">TÍNH ĐIỂM</span> <br className="hidden md:block"/>XÉT TUYỂN 2026
            </h1>
            <div className="w-16 h-1.5 bg-[#ed1c29] mb-10 mx-auto"></div>
            <p className="text-center font-semibold text-[#2c2b7c]/80 max-w-3xl text-sm md:text-base lg:text-lg mb-12">
               Hệ thống chuyên môn dành riêng cho việc phân tích, lọc và xếp hạng tự động khả năng trúng tuyển dựa trên hồ sơ học bạ THPT. Xin lưu ý mọi phân tích chỉ mang tính chất tham khảo trước khi APAG công bố công thức chính thức.
            </p>

            {/* Core Calculator Module */}
            <div className="w-full">
              <ScoreCalculator />
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
