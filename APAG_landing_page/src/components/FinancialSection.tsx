"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function FinancialSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal huge texts
      gsap.fromTo(
        ".fin-reveal",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="financial" ref={sectionRef} className="relative w-full py-32 bg-[#FAFAFA] border-t border-[#2c2b7c]/10 z-10 flex flex-col justify-center px-6 lg:px-16 overflow-hidden">
      
      {/* Decorative Grid Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-[#2c2b7c]/5 pointer-events-none"></div>

      <div className="w-full flex flex-col md:flex-row items-center gap-16 md:gap-8">
        
        {/* Left Side - Scholarship Stats */}
        <div className="md:w-1/2 flex flex-col relative z-10">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#555] mb-8">(CHÍNH SÁCH)</span>
          
          <div className="mb-2">
            <h2 className="fin-reveal font-heading text-[clamp(2rem,7vw,80px)] font-black leading-[1.05] text-[#2c2b7c] tracking-tighter uppercase break-words">
              HỌC BỔNG
            </h2>
          </div>
          <div className="mb-12">
            <h2 className="fin-reveal font-heading text-[clamp(2rem,7vw,80px)] font-black leading-[1.05] text-[#2c2b7c] tracking-tighter uppercase break-words">
              THỦ KHOA
            </h2>
          </div>

          <div className="flex flex-col gap-6 pl-6 border-l-2 border-[#ed1c29]/50 fin-reveal">
            <div>
              <p className="font-heading text-3xl md:text-4xl text-[#ed1c29] font-black">2.000.000<span className="text-xl md:text-2xl text-[#2c2b7c] ml-2 font-sans font-bold">VNĐ</span></p>
              <p className="text-sm font-semibold text-[#555] mt-2 max-w-sm text-balance">Thủ khoa toàn khóa hoặc trúng tuyển theo diện xét tuyển thẳng.</p>
            </div>
            <div>
              <p className="font-heading text-3xl md:text-4xl text-[#ed1c29] font-black">1.000.000<span className="text-xl md:text-2xl text-[#2c2b7c] ml-2 font-sans font-bold">VNĐ</span></p>
              <p className="text-sm font-semibold text-[#555] mt-2 max-w-sm text-balance">Thủ khoa đầu vào của từng khối ngành đào tạo.</p>
            </div>
          </div>
        </div>

        {/* Right Side - Tuition & Dormitory */}
        <div className="md:w-1/2 flex flex-col pt-12 md:pt-0 relative z-10 gap-16">
          
          <div className="flex flex-col fin-reveal pl-0 md:pl-16">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-8 h-[2px] bg-[#ed1c29]/50"></div>
               <span className="text-xs font-bold tracking-[0.2em] font-sans uppercase text-[#555]">Ký túc xá</span>
            </div>
            <h3 className="font-heading text-[clamp(3rem,12vw,120px)] font-black text-transparent font-outline uppercase tracking-tighter leading-[1.0] cursor-default mb-6 break-words">
              FREE
            </h3>
            <ul className="text-sm md:text-base font-semibold text-[#555] space-y-4 max-w-md list-disc list-inside text-balance">
              <li><strong className="text-[#ed1c29] font-black">Miễn phí KTX toàn khóa</strong> cho SV thuộc hộ nghèo, đặc biệt khó khăn.</li>
              <li><strong className="text-[#ed1c29] font-black">Miễn phí KTX 01 năm</strong> cho thí sinh điểm &gt;= 26, tuyển thẳng ngành Du Lịch hoặc Kinh Tế.</li>
            </ul>
          </div>
          
          <div className="flex flex-col fin-reveal pl-0 md:pl-16 pt-8 border-t border-[#2c2b7c]/10">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-8 h-[2px] bg-[#ed1c29]/50"></div>
               <span className="text-xs font-bold tracking-[0.2em] font-sans uppercase text-[#555]">Học phí</span>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-baseline border-b border-[#2c2b7c]/10 pb-4">
                <span className="text-lg md:text-2xl font-black tracking-tight uppercase text-[#2c2b7c]">564k <span className="text-xs font-bold text-[#888]">/ tín chỉ</span></span>
                <span className="text-xs md:text-sm font-semibold text-[#555] text-right max-w-[200px] text-balance">Quản trị nhân lực, Luật, Thanh tra</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-[#2c2b7c]/10 pb-4">
                <span className="text-lg md:text-2xl font-black tracking-tight uppercase text-[#2c2b7c]">602k <span className="text-xs font-bold text-[#888]">/ tín chỉ</span></span>
                <span className="text-xs md:text-sm font-semibold text-[#555] text-right max-w-[200px] text-balance">Quản lý nhà nước, Kinh tế, Du lịch</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
