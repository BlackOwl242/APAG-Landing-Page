"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { branches } from "@/constants/branches";

export default function BranchesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".branch-card",
        { y: 100, opacity: 0 },
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
    <section id="branches" ref={sectionRef} className="relative w-full py-24 bg-[#FAFAFA] border-t border-[#2c2b7c]/10 z-10 flex flex-col">
      
      {/* Header aligned Kurate style */}
      <div className="w-full px-6 lg:px-16 mb-16 flex items-end justify-between border-b-2 border-[#2c2b7c]/20 pb-4">
         <h2 className="font-heading text-lg md:text-2xl font-black uppercase tracking-wider text-[#2c2b7c]">
            Các Phân Hiệu
         </h2>
         <span className="text-[10px] md:text-xs tracking-[0.2em] font-sans font-bold uppercase text-[#555]">MẠNG LƯỚI QUỐC GIA</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 w-full border-t border-[#2c2b7c]/10">
        {branches.map((branch, index) => (
          <div key={index} className="branch-card group flex flex-col aspect-square md:aspect-auto md:h-[50vh] p-8 border-b border-[#2c2b7c]/10 md:border-r hover:bg-[#2c2b7c]/5 transition-colors relative cursor-default overflow-hidden">
            
            <div className="flex justify-between items-start w-full relative z-10">
              <span className="font-sans font-bold text-xs text-[#555] tracking-widest uppercase">({branch.id})</span>
            </div>
            
            <div className="mt-auto relative z-10">
              <h3 className="font-heading text-[clamp(1.3rem,4vw,2.5rem)] font-black uppercase tracking-tighter text-[#2c2b7c] leading-[1.05] mb-4 group-hover:text-[#ed1c29] transition-colors duration-300 break-words">
                {branch.name}
              </h3>
              <p className="font-sans text-sm text-[#555] font-semibold group-hover:text-[#333] transition-colors duration-300 max-w-[200px] text-balance">
                {branch.desc}
              </p>
            </div>

            {/* Hover Background Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#ed1c29] opacity-0 group-hover:opacity-100 transition-all duration-500 m-8"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
