"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AdmissionsMethodsCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Marquee
      gsap.to(".methods-marquee", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      gsap.fromTo(
        ".method-text-up",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handlePageTransition = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 z-[99999] bg-[#FAFAFA] flex items-center justify-center pointer-events-auto transform translate-y-[100%]";
    
    const logoContainer = document.createElement("div");
    logoContainer.className = "relative w-48 h-12 sm:h-16 animate-pulse opacity-0";
    logoContainer.innerHTML = `<img src="/logos/Logo2.png" style="width:100%; height:100%; object-fit:contain;" />`;
    
    overlay.appendChild(logoContainer);
    document.body.appendChild(overlay);

    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            window.location.href = href;
          }, 300);
        }
      });

      tl.to(overlay, { y: 0, duration: 0.8, ease: "power4.inOut" })
        .to(logoContainer, { opacity: 1, duration: 0.4 }, "-=0.2");
    });
  };

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center bg-[#FAFAFA] text-[#0E0F0F] overflow-hidden">

      {/* Background Marquee chạy ra giữa, mờ y hệt phần form */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200vw] sm:w-[300vw] flex opacity-10 blur-[8px] pointer-events-none select-none mix-blend-multiply z-0">
         <div className="methods-marquee flex whitespace-nowrap will-change-transform">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="font-heading text-[15vw] md:text-[200px] font-black uppercase tracking-tighter mx-4 leading-none text-black">
                PHƯƠNG THỨC XÉT TUYỂN • 2026 • 
              </span>
            ))}
         </div>
      </div>

      <div className="container mx-auto px-6 flex flex-col items-center text-center max-w-4xl relative z-10">
        
        <h2 className="method-text-up font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-[#2c2b7c] leading-[1.1] mb-6">
          <span className="text-[#ed1c29]">04</span> Phương Thức<br />Xét Tuyển <span className="text-[#ed1c29]">2026</span>
        </h2>
        
        <div className="method-text-up w-20 h-1 md:w-32 md:h-1.5 bg-[#ed1c29] mb-8" />

        <p className="method-text-up text-sm sm:text-base md:text-lg text-[#2c2b7c]/80 font-semibold max-w-2xl mb-12 leading-relaxed">
          Năm 2026, Phân hiệu Học viện Hành chính và Quản trị công tại TP. Đà Nẵng áp dụng 4 phương thức xét tuyển linh hoạt, giúp thí sinh tối đa hóa cơ hội trúng tuyển. Khám phá ngay các điều kiện, hồ sơ và mốc thời gian quan trọng!
        </p>

        <a href="/phuongthuc" onClick={(e) => handlePageTransition(e, "/phuongthuc")} className="method-text-up group relative inline-flex items-center justify-center gap-4 px-8 py-4 md:px-12 md:py-5 bg-[#2c2b7c] text-white rounded-full font-bold uppercase tracking-wider overflow-hidden transition-all duration-500 hover:shadow-2xl border border-[#2c2b7c] hover:border-[#ed1c29]">
          <span className="relative z-10 text-xs md:text-sm">Xem chi tiết các phương thức</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="relative z-10 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          {/* Fill Animation */}
          <div className="absolute inset-0 h-full w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-[#ed1c29] z-0" />
        </a>
        
      </div>
    </section>
  );
}
