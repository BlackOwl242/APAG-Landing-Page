"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

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
      
      {/* Corner Brackets */}
      <div className="absolute top-10 left-10 md:top-20 md:left-20 w-8 h-8 border-t-2 border-l-2 border-[#2c2b7c]/30 hidden md:block"></div>
      <div className="absolute top-10 right-10 md:top-20 md:right-20 w-8 h-8 border-t-2 border-r-2 border-[#2c2b7c]/30 hidden md:block"></div>
      <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 w-8 h-8 border-b-2 border-l-2 border-[#2c2b7c]/30 hidden md:block"></div>
      <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-8 h-8 border-b-2 border-r-2 border-[#2c2b7c]/30 hidden md:block"></div>

      <div className="w-full max-w-[85vw] mx-auto flex flex-col items-center relative z-10">
        
        {/* Subtle top label */}
        <div className="flex w-full justify-between items-end mb-12 border-b-2 border-[#2c2b7c]/10 pb-4">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#555]">Tầm nhìn</span>
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#555]">(01)</span>
        </div>

        {/* Massive Inline Typography */}
        <div ref={textRef} className="font-heading text-[clamp(1.6rem,5vw,70px)] font-black leading-[1.45] text-[#2c2b7c] tracking-tighter w-full break-words">
          <span className="about-word inline-block mr-3 text-[#2c2b7c]">KIẾN</span>
          <span className="about-word inline-block mr-3 text-[#2c2b7c]">TẠO</span>
          <span className="about-word inline-block mr-3 text-[#2c2b7c]">TRI</span>
          <span className="about-word inline-block mr-6 text-[#2c2b7c]">THỨC</span>
          
          <span className="about-word inline-block mr-3 text-[#2c2b7c]">—</span>
          
          <span className="about-word inline-block mr-3 text-[#2c2b7c]">ĐỔI</span>
          <span className="about-word inline-block mr-3 text-[#2c2b7c]">MỚI</span>
          <span className="about-word inline-block mr-3 text-[#2c2b7c]">SÁNG</span>
          <span className="about-word inline-block mr-6 text-[#2c2b7c]">TẠO</span>
          
          <br className="hidden lg:block" />

          <span className="about-word inline-block mr-3 text-[#2c2b7c]">—</span>

          {/* Underlined Word */}
          <span className="about-word inline-block mr-3 text-[#2c2b7c] relative">
            TRÁCH NHIỆM
            <div className="absolute bottom-1 md:bottom-2 left-0 w-full h-[4px] bg-[#ed1c29]/50"></div>
          </span>

          <span className="about-word inline-block mr-3 text-[#2c2b7c]">QUỐC</span>
          <span className="about-word inline-block text-[#2c2b7c]">GIA</span>
        </div>

      </div>
    </section>
  );
}
