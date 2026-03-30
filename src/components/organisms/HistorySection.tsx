"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { historyData } from "@/constants/history";

export default function HistorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal title elements
      gsap.fromTo(
        ".history-title-anim",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Reveal list items
      const items = gsap.utils.toArray(".history-item") as HTMLElement[];
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 150, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="history" ref={sectionRef} className="relative w-full pt-24 md:pt-40 bg-[#FAFAFA] border-t border-[#2c2b7c]/10 z-10 flex flex-col overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#2c2b7c]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="w-full flex flex-col relative z-10 px-6 lg:px-16 mb-16 md:mb-24">
        
        {/* Section Header */}
        <div className="history-title-anim flex w-full justify-between items-end mb-10 md:mb-16 border-b-2 border-[#2c2b7c]/10 pb-4">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#555]">
            Lịch sử hình thành
          </span>
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#555]">
            (01.2)
          </span>
        </div>

        {/* Huge Title */}
        <h2 className="history-title-anim font-heading text-[clamp(2rem,6vw,60px)] font-black tracking-tighter text-[#2c2b7c] leading-[1.1] w-full">
          LỊCH SỬ HÌNH THÀNH,<br/>
          <span className="text-[#ed1c29]">TRUYỀN THỐNG VÀ PHÁT TRIỂN</span>
        </h2>
      </div>

      {/* Massive Brutalist List Container */}
      <div className="w-full flex flex-col border-t border-[#2c2b7c]/10">
        {historyData.map((item, index) => (
          <div key={index} className={`history-item group relative w-full flex flex-col lg:flex-row items-start lg:items-center py-12 lg:py-10 border-b hover:bg-[#2c2b7c]/5 transition-colors duration-500 overflow-hidden px-6 lg:px-16 gap-6 lg:gap-0 ${index === historyData.length - 1 ? 'border-transparent' : 'border-[#2c2b7c]/10'}`}>
            
            {/* Massive Date */}
            <div className="w-full lg:w-[50%] flex items-start lg:items-center gap-6 md:gap-8 relative z-10">
               <span className="text-xs font-sans font-bold text-[#ed1c29] tracking-[0.3em] uppercase shrink-0 mt-3 md:mt-4 lg:mt-0 font-outline-none text-[#ed1c29] md:text-transparent md:font-outline">({index < 9 ? `0${index + 1}` : index + 1})</span>
               <h3 className="font-heading text-[clamp(2.5rem,6vw,85px)] font-bold uppercase tracking-tight text-[#ed1c29] md:text-transparent md:font-outline md:group-hover:text-[#ed1c29] transition-colors duration-500 leading-[1.0] break-words">
                  {item.date.replace('Ngày ', '').replace('Từ tháng ', '')}
               </h3>
            </div>
            
            {/* Description Text */}
            <div className="w-full lg:w-[50%] flex flex-col gap-3 relative z-10 lg:pl-12 lg:border-l-2 border-[#ed1c29]/30 group-hover:border-[#ed1c29] transition-colors duration-500">
               <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#555] flex items-center gap-4">
                 <div className="w-6 h-[2px] bg-[#ed1c29]/50 group-hover:bg-[#ed1c29] transition-colors duration-500"></div> SỰ KIỆN LỊCH SỬ
               </span>
               <p className="font-heading text-lg md:text-2xl lg:text-3xl font-medium text-[#222] leading-[1.5] tracking-tight text-balance group-hover:text-[#2c2b7c] transition-colors duration-500">
                 {item.content}
               </p>
            </div>
            
            {/* Ambient Background Number (Desktop Only) */}
            <div className="absolute right-0 bottom-0 text-[15vw] font-black text-[#2c2b7c]/5 leading-none pointer-events-none translate-y-1/4 translate-x-1/4 hidden lg:block select-none group-hover:text-[#ed1c29]/5 transition-colors duration-700">
               {index < 9 ? `0${index + 1}` : index + 1}
            </div>
            
            {/* Arrow SVG indicator */}
            <div className="absolute top-8 right-8 lg:top-1/2 lg:-translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none -translate-x-4 group-hover:translate-x-0 hidden md:block">
               <svg className="w-10 h-10 text-[#ed1c29]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
               </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
