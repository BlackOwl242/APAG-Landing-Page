"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the massive text line by line
      gsap.fromTo(
        ".about-word",
        { y: 100, opacity: 0, rotate: 5 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );

      // Expand pill images
      gsap.fromTo(
        ".about-pill",
        { width: 0, opacity: 0 },
        {
          width: "120px", // or whatever the natural width should be, but let's use fixed width for reveal
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen flex flex-col justify-center items-center py-40 px-4 md:px-12 bg-[#FAFAFA]">
      
      {/* Corner Borders */}
      <div className="absolute top-4 left-4 sm:top-10 sm:left-10 md:top-20 md:left-20 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#2c2b7c]/30 block"></div>
      <div className="absolute top-4 right-4 sm:top-10 sm:right-10 md:top-20 md:right-20 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[#2c2b7c]/30 block"></div>
      <div className="absolute bottom-4 left-4 sm:bottom-10 sm:left-10 md:bottom-20 md:left-20 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[#2c2b7c]/30 block"></div>
      <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 md:bottom-20 md:right-20 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[#2c2b7c]/30 block"></div>

      <div className="w-full max-w-[85vw] mx-auto flex flex-col items-center relative z-10">
        
        {/* Subtle top label */}
        <div className="flex w-full justify-between items-end mb-12 border-b-2 border-[#2c2b7c]/10 pb-4">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#555]">Tầm nhìn</span>
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#555]">(01)</span>
        </div>

        {/* Massive Inline Typography */}
        <div ref={textRef} className="font-heading text-[clamp(1.5rem,4.5vw,60px)] lg:text-[70px] font-black leading-[1.3] text-[#2c2b7c] tracking-tighter w-full max-w-full">
          
          <span className="whitespace-nowrap relative inline-block mr-3">
            <span className="about-word inline-block mr-2 md:mr-3 text-[#2c2b7c]">KIẾN</span>
            <span className="about-word inline-block mr-2 md:mr-3 text-[#2c2b7c]">TẠO</span>
            <div className="absolute bottom-1 md:bottom-2 left-0 w-full h-[4px] bg-[#ed1c29]/50 -z-10"></div>
          </span>

          <span className="whitespace-nowrap inline-block mr-4 md:mr-6">
            <span className="about-word inline-block mr-2 md:mr-3 text-[#2c2b7c]">TRI</span>
            <span className="about-word inline-block text-[#2c2b7c]">THỨC</span>
          </span>
          
          <span className="whitespace-nowrap inline-block mr-3">
             <span className="about-word inline-block mr-4 md:mr-6 text-[#2c2b7c]">—</span>
             <span className="relative inline-block mr-2 md:mr-3">
               <span className="about-word inline-block mr-2 md:mr-3 text-[#2c2b7c]">ĐỔI</span>
               <span className="about-word inline-block text-[#2c2b7c]">MỚI</span>
               <div className="absolute bottom-1 md:bottom-2 left-0 w-full h-[4px] bg-[#ed1c29]/50 -z-10"></div>
             </span>
          </span>
          
          <span className="whitespace-nowrap inline-block mr-4 md:mr-6">
            <span className="about-word inline-block mr-2 md:mr-3 text-[#2c2b7c]">SÁNG</span>
            <span className="about-word inline-block text-[#2c2b7c]">TẠO</span>
          </span>
          
          <span className="whitespace-nowrap inline-block mr-3">
             <span className="about-word inline-block mr-4 md:mr-6 text-[#2c2b7c]">—</span>
             <span className="relative inline-block mr-2 md:mr-3">
               <span className="about-word inline-block mr-2 md:mr-3 text-[#2c2b7c]">TRÁCH</span>
               <span className="about-word inline-block text-[#2c2b7c]">NHIỆM</span>
               <div className="absolute bottom-1 md:bottom-2 left-0 w-full h-[4px] bg-[#ed1c29]/50 -z-10"></div>
             </span>
          </span>

          <span className="whitespace-nowrap inline-block">
            <span className="about-word inline-block mr-2 md:mr-3 text-[#2c2b7c]">QUỐC</span>
            <span className="about-word inline-block text-[#2c2b7c]">GIA</span>
          </span>
        </div>

      </div>
    </section>
  );
}
