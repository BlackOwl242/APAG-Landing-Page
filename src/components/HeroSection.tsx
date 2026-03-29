"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import InteractiveGrid from "./InteractiveGrid";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations
      gsap.fromTo(
        ".hero-up",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".hero-down",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".hero-left",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out", delay: 0.4 }
      );
      gsap.fromTo(
        ".hero-right",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out", delay: 0.4 }
      );

      // Stacked cards hover spread
      const cards = gsap.utils.toArray(".stacked-card");
      const stackedContainer = document.querySelector(".stacked-container");
      
      if (stackedContainer) {
        stackedContainer.addEventListener("mouseenter", () => {
          gsap.to(cards[0] as Element, { rotation: -15, x: -30, duration: 0.4, ease: "power2.out" });
          gsap.to(cards[2] as Element, { rotation: 15, x: 30, duration: 0.4, ease: "power2.out" });
        });
        stackedContainer.addEventListener("mouseleave", () => {
          gsap.to(cards[0] as Element, { rotation: -5, x: 0, duration: 0.4, ease: "power2.out" });
          gsap.to(cards[2] as Element, { rotation: 5, x: 0, duration: 0.4, ease: "power2.out" });
        });
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6 pt-20 pb-32">
      
      {/* Background shape mimicking subtle WebGL glow for a light theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-gradient-to-tr from-[#E5E5E5] to-[#F5F5F5] blur-[150px] rounded-full pointer-events-none opacity-60 -z-10" />

      <InteractiveGrid />

      {/* Top Left Corner */}
      <div className="absolute top-4 md:top-8 left-4 md:left-8 z-20 flex flex-col justify-center items-start hero-left h-8 md:h-12">
         <div className="relative w-32 md:w-56 h-8 md:h-12">
            <Image src="/logos/Logo2.png" alt="APAG Top Logo" fill className="object-contain object-left" priority />
         </div>
      </div>

      {/* Vertical Text & Portrait Left */}
      <div className="absolute left-4 md:left-10 lg:left-16 top-1/3 -translate-y-1/2 z-20 flex flex-col items-center gap-4 md:gap-8 hero-left">
        <div className="relative w-10 md:w-16 h-12 md:h-20 overflow-hidden bg-[#E5E5E5] shadow-lg rounded-sm grayscale">
          <Image src="/images/portrait.png" alt="Student" fill className="object-cover opacity-90" />
        </div>
        <div className="h-6 md:h-12 w-[1px] md:w-[2px] bg-[#2c2b7c]/20"></div>
        <p className="[writing-mode:vertical-lr] rotate-180 text-[8px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#555]">
          Dành cho Thí sinh 2k8
        </p>
      </div>

      {/* Top Right Corner (Restored) */}
      <div className="absolute top-4 md:top-8 right-4 md:right-8 z-20 flex justify-end items-center hero-right h-8 md:h-12">
        <a href="#admissions" className="flex flex-col items-end justify-center text-[10px] md:text-sm text-[#2c2b7c] font-bold border-b border-md:border-b-2 border-[#2c2b7c]/20 pb-1 hover:border-[#ed1c29] hover:text-[#ed1c29] transition-colors leading-tight">
          Cổng xét tuyển Đợt 1
          <span className="text-[8px] md:text-[10px] text-[#555] font-semibold tracking-widest mt-1">01/06 - 12/07/2026</span>
        </a>
      </div>

      {/* Side Horizontal Image Right */}
      <div className="absolute right-4 md:right-10 lg:right-16 top-1/3 -translate-y-1/2 z-20 flex flex-col items-end gap-3 md:gap-6 hero-right">
        <p className="text-[8px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#555] text-right max-w-[80px] md:max-w-[150px]">
          Chuẩn mực quốc tế
        </p>
        <div className="h-[1px] md:h-[2px] w-6 md:w-12 bg-[#2c2b7c]/20"></div>
        <div className="relative w-20 md:w-32 h-12 md:h-20 overflow-hidden bg-[#E5E5E5] shadow-lg rounded-sm grayscale">
           <Image src="/images/building.png" alt="University" fill className="object-cover opacity-90" />
        </div>
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 w-full flex flex-col items-center text-center mt-[-10vh]">
        <div className="w-full flex justify-center px-4">
          <div className="relative hero-up w-[90vw] md:w-[70vw] max-w-[800px] h-[30vw] md:h-[18vw] max-h-[250px]">
            <Image src="/logos/Logo1.png" alt="APAG Logo" fill className="object-contain" priority />
          </div>
        </div>
      </div>

      {/* Bottom Center - Stacked Cards & Arrow */}
      <div className="absolute bottom-16 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-6 hero-up">
        
        <div className="stacked-container relative w-16 h-20 md:w-24 md:h-32 cursor-pointer flex justify-center">
          {/* Card 3 (Back) */}
          <div className="stacked-card absolute inset-0 bg-black/5 backdrop-blur-sm border border-black/10 rounded-sm -rotate-6 transform transition-transform shadow-md"></div>
          {/* Card 2 (Middle) */}
          <div className="stacked-card absolute inset-0 bg-black/10 backdrop-blur-sm border border-black/15 rounded-sm rotate-3 transform transition-transform shadow-lg"></div>
          {/* Card 1 (Front) */}
          <div className="stacked-card absolute inset-0 bg-[#FAFAFA] border border-black/20 rounded-sm z-10 p-1 flex items-center justify-center transform transition-transform shadow-xl">
            <div className="relative w-full h-full grayscale opacity-90 overflow-hidden">
               <Image src="/images/portrait.png" alt="Student" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Minimal Down Arrow */}
        <div className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity mt-8 md:mt-2">
           <div className="w-[2px] h-12 bg-gradient-to-b from-transparent to-[#ed1c29] mb-2"></div>
           <svg className="w-5 h-5 text-[#ed1c29]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
           </svg>
        </div>
      </div>

    </section>
  );
}
