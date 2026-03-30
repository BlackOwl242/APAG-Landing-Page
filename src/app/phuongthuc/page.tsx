"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Nav from "@/components/organisms/Nav";
import TopBar from "@/components/organisms/TopBar";
import Footer from "@/components/organisms/Footer";
import { methodsData } from "@/constants/methods";

gsap.registerPlugin(ScrollTrigger);

export default function PhuongThucPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Khóa cuộn màn hình ngay khi vào để chặn trình duyệt nhớ vị trí cũ
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 50);

    const ctx = gsap.context(() => {
      // Background Marquee chạy vô tận
      gsap.to(".page-marquee", {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });

      gsap.fromTo(
        ".fade-up",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
      );

      gsap.utils.toArray(".method-card").forEach((card: any, i) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative bg-[#FAFAFA] w-full min-h-screen selection:bg-[#ed1c29] selection:text-[#FAFAFA]" ref={containerRef}>
      
      <TopBar />
      <Nav />
      
      {/* Hero Section of Subpage */}
      <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
         {/* Background Marquee */}
         <div className="absolute top-[50%] md:top-[60%] left-0 -translate-y-1/2 w-[400vw] flex opacity-10 blur-[8px] pointer-events-none select-none mix-blend-multiply z-0">
            <div className="page-marquee flex whitespace-nowrap will-change-transform">
               {[...Array(5)].map((_, i) => (
                 <span key={i} className="font-heading text-[15vw] md:text-[200px] font-black uppercase tracking-tighter mx-4 leading-none text-black">
                   PHƯƠNG THỨC XÉT TUYỂN • 2026 • 
                 </span>
               ))}
            </div>
         </div>

         <p className="fade-up relative z-10 text-[#ed1c29] font-bold tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm uppercase mb-3 sm:mb-6">
           Tuyển sinh đại học chính quy 2026
         </p>
         
         <h1 className="fade-up relative z-10 font-heading flex flex-col items-center font-black uppercase tracking-tighter text-[#2c2b7c] leading-[1.1] text-center w-full max-w-full mx-auto gap-2 md:gap-4 px-2">
            <span className="text-[6vw] sm:text-[5vw] md:text-5xl lg:text-[60px] xl:text-[80px] whitespace-nowrap">
              Chi Tiết Phương Thức
            </span>
            <span className="text-[#ed1c29] text-[11vw] sm:text-[9vw] md:text-7xl lg:text-[90px] xl:text-[110px] whitespace-nowrap">
              Xét Tuyển
            </span>
         </h1>
      </section>

      {/* Logic Grid */}
      <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 flex flex-col items-center z-10">
        <div className="w-full max-w-6xl flex flex-col gap-20 md:gap-32">
           {methodsData.map((method, idx) => (
             <div key={method.id} className="method-card w-full flex flex-col lg:flex-row gap-8 lg:gap-16 items-start group">
                
                {/* Number & Title (Left Side) */}
                <div className="w-full lg:w-2/5 flex flex-col self-start relative lg:sticky lg:top-32 bg-[#FAFAFA]/90 backdrop-blur-sm lg:backdrop-blur-none z-20 py-4 lg:py-0 border-b border-[#2c2b7c]/10 lg:border-none">
                  <div className="flex items-end gap-3 sm:gap-4 mb-2 sm:mb-4">
                     <span className="font-heading text-6xl sm:text-7xl md:text-8xl font-black text-[#ed1c29] leading-none">
                       {method.id}
                     </span>
                     <div className="h-1.5 sm:h-2 w-8 sm:w-12 bg-[#2c2b7c] mb-1.5 sm:mb-2 md:mb-4 group-hover:w-16 sm:group-hover:w-24 transition-all duration-500 ease-in-out" />
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#2c2b7c] leading-[1.1] sm:leading-[1.1]">
                    {method.title}
                  </h2>
                </div>

                {/* Details (Right Side) */}
                <div className="w-full lg:w-3/5 bg-white border border-[#2c2b7c]/10 rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl shadow-[#2c2b7c]/5 group-hover:shadow-2xl group-hover:border-[#2c2b7c]/20 transition-all duration-500 flex flex-col gap-8 sm:gap-10">
                   
                   {/* Conditions */}
                   <div>
                     <h3 className="text-lg sm:text-xl md:text-2xl font-black uppercase text-[#2c2b7c] mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                       <span className="w-3 h-3 sm:w-4 sm:h-4 bg-[#ed1c29] rounded-sm inline-block" />
                       Điều kiện bắt buộc
                     </h3>
                     <ul className="flex flex-col gap-3 sm:gap-4">
                       {method.conditions.map((cond, i) => (
                         <li key={i} className="flex gap-3 sm:gap-4 items-start text-[13px] sm:text-sm md:text-base text-[#555] font-medium leading-relaxed">
                            <span className="shrink-0 font-bold text-[#ed1c29] mt-0.5 sm:mt-1">—</span>
                            {cond}
                         </li>
                       ))}
                     </ul>
                   </div>

                   <div className="w-full h-[1px] bg-[#2c2b7c]/10" />

                   {/* Documents */}
                   <div>
                     <h3 className="text-lg sm:text-xl md:text-2xl font-black uppercase text-[#2c2b7c] mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                       <span className="w-3 h-3 sm:w-4 sm:h-4 bg-[#2c2b7c] rounded-sm inline-block" />
                       Hồ sơ cần chuẩn bị
                     </h3>
                     <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                       {method.documents.map((doc, i) => (
                         <li key={i} className="flex gap-2 sm:gap-3 items-start p-3 sm:p-4 bg-[#FAFAFA] rounded-xl border border-[#2c2b7c]/5 text-[13px] sm:text-sm text-[#555] font-medium">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2c2b7c] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {doc}
                         </li>
                       ))}
                     </ul>
                   </div>

                   {/* Timeline */}
                   <div className="bg-[#2c2b7c] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 mt-2 sm:mt-4 text-white">
                     <h3 className="text-base sm:text-lg md:text-xl font-black uppercase mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-white">
                       <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#ed1c29]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                       Timeline Quan Trọng
                     </h3>
                     <div className="flex flex-col gap-3 sm:gap-4">
                       {method.timeline.map((event, i) => (
                         <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 border-b border-white/10 pb-3 sm:pb-4 last:border-0 last:pb-0">
                           <span className="text-[13px] sm:text-sm font-semibold text-white/80">{event.label}</span>
                           <span className="text-[13px] sm:text-sm font-bold text-[#FFD700] uppercase tracking-wide">{event.time}</span>
                         </div>
                       ))}
                     </div>
                   </div>

                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Back to Home CTA */}
      <section className="relative w-full py-16 sm:py-20 flex justify-center border-t border-[#0E0F0F]/10">
         <a href="/" className="inline-flex items-center gap-3 sm:gap-4 text-[#2c2b7c] font-bold uppercase tracking-widest hover:text-[#ed1c29] transition-colors group text-sm sm:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay Lại Trang Chủ
         </a>
      </section>

      <Footer />
    </main>
  );
}
