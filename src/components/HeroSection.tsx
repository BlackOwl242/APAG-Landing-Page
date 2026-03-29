"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import InteractiveGrid from "./InteractiveGrid";
import LiquidLogo from "./LiquidLogo";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Countdown to 12/07/2026 17:00:00 GMT+7 (Hạn nộp hồ sơ xét tuyển Đợt 1)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-07-12T17:00:00+07:00").getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

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

      // Stacked cards hover spread (Kurate style - fan out from bottom)
      const cards = gsap.utils.toArray(".stacked-card");
      const stackedContainer = document.querySelector(".stacked-container");
      
      if (stackedContainer) {
        stackedContainer.addEventListener("mouseenter", () => {
          gsap.to(cards[0] as Element, { rotation: -18, xPercent: -35, yPercent: 5, duration: 0.8, ease: "power3.out" });
          gsap.to(cards[1] as Element, { rotation: 18, xPercent: 35, yPercent: 5, duration: 0.8, ease: "power3.out" });
          gsap.to(cards[2] as Element, { yPercent: -2, scale: 1.02, duration: 0.8, ease: "power3.out" });
        });
        stackedContainer.addEventListener("mouseleave", () => {
          gsap.to(cards[0] as Element, { rotation: -6, xPercent: 0, yPercent: 0, duration: 0.8, ease: "power3.out" });
          gsap.to(cards[1] as Element, { rotation: 3, xPercent: 0, yPercent: 0, duration: 0.8, ease: "power3.out" });
          gsap.to(cards[2] as Element, { yPercent: 0, scale: 1, duration: 0.8, ease: "power3.out" });
        });
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center overflow-x-hidden px-6 pt-[25vh] md:pt-[15vh] pb-[20vh] w-full">
      
      {/* Background shape mimicking subtle WebGL glow for a light theme */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-gradient-to-tr from-[#E5E5E5] to-[#F5F5F5] blur-[150px] rounded-full pointer-events-none opacity-60 -z-10" />

      <InteractiveGrid />

      {/* Top Left Corner */}
      <div className="absolute top-4 md:top-8 left-4 md:left-8 z-20 flex flex-col justify-center items-start hero-left h-8 md:h-12">
         <div className="relative w-32 md:w-56 h-8 md:h-12">
            <Image src="/logos/Logo2.png" alt="APAG Top Logo" fill className="object-contain object-left" priority />
         </div>
      </div>

      {/* Vertical Text & Portrait Left */}
      <div className="absolute left-4 md:left-10 lg:left-16 top-[30vh] sm:top-[35vh] md:top-[40vh] lg:top-[35vh] -translate-y-1/2 z-20 flex flex-col items-center gap-4 md:gap-8 hero-left">
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
      <div className="absolute right-4 md:right-10 lg:right-16 top-[15vh] md:top-[25vh] lg:top-[30vh] -translate-y-1/2 z-20 flex flex-col items-end gap-3 md:gap-6 hero-right">
        <p className="text-[8px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#555] text-right max-w-[80px] md:max-w-[150px]">
          Chuẩn mực quốc tế
        </p>
        <div className="h-[1px] md:h-[2px] w-6 md:w-12 bg-[#2c2b7c]/20"></div>
        <div className="relative w-20 md:w-32 h-12 md:h-20 overflow-hidden bg-[#E5E5E5] shadow-lg rounded-sm grayscale">
           <Image src="/images/building.png" alt="University" fill className="object-cover opacity-90" />
        </div>
      </div>

      {/* Main Center Content (Logo) — Kurate-style WebGL Liquid Distortion */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center mx-auto">
        <div className="w-full flex justify-center px-4">
          <LiquidLogo
            src="/logos/Logo1.png"
            alt="APAG Logo"
            className="hero-up w-[90vw] md:w-[70vw] max-w-[800px] h-[30vw] md:h-[18vw] max-h-[250px] mx-auto"
          />
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="relative z-10 w-full flex flex-col items-center mt-10 md:mt-14 hero-up">
        <p className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] md:tracking-[0.35em] text-[#555] mb-4 md:mb-6">
          Hạn nộp hồ sơ xét tuyển đợt 1
        </p>
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {[
            { value: countdown.days, label: "Ngày" },
            { value: countdown.hours, label: "Giờ" },
            { value: countdown.minutes, label: "Phút" },
            { value: countdown.seconds, label: "Giây" },
          ].map((unit, i) => (
            <div key={unit.label} className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              <div className="flex flex-col items-center">
                <span className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tabular-nums tracking-tight text-[#2c2b7c] leading-none">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#999] mt-1.5 md:mt-2">
                  {unit.label}
                </span>
              </div>
              {i < 3 && (
                <span className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-[#ed1c29] leading-none -mt-3 md:-mt-4 select-none">:</span>
              )}
            </div>
          ))}
        </div>
        <div className="w-16 md:w-24 h-[2px] bg-[#ed1c29]/40 mt-5 md:mt-7" />
      </div>

      {/* Bottom Center - Stacked Cards */}
      <div className="w-full flex justify-center items-center relative mt-12 sm:mt-16 md:mt-20 z-30 hero-up pointer-events-auto">
        <div className="flex flex-col items-center justify-center w-full max-w-[1000px] mx-auto">
          
          {/* Massive Card Container */}
          <div className="stacked-container relative w-[60vw] h-[85vw] sm:w-[350px] sm:h-[480px] lg:w-[450px] lg:h-[620px] cursor-pointer flex justify-center perspective-[1000px] group">
            {/* Card 3 (Back) */}
            <div className="stacked-card absolute inset-0 bg-[#FAFAFA] border border-black/20 rounded-sm p-1 -rotate-6 shadow-md z-0 flex items-center justify-center origin-bottom will-change-transform">
               <div className="relative w-full h-full grayscale opacity-60 overflow-hidden">
                  <Image src="/images/building.png" alt="Building" fill className="object-cover" />
               </div>
            </div>
            {/* Card 2 (Middle) */}
            <div className="stacked-card absolute inset-0 bg-[#FAFAFA] border border-black/20 rounded-sm p-1 rotate-3 shadow-lg z-[5] flex items-center justify-center origin-bottom will-change-transform">
               <div className="relative w-full h-full grayscale opacity-70 overflow-hidden">
                  <Image src="/images/portrait.png" alt="Portrait" fill className="object-cover" />
               </div>
            </div>
            {/* Card 1 (Front) */}
            <div className="stacked-card absolute inset-0 bg-[#FAFAFA] border border-black/20 rounded-sm z-10 p-2 flex items-center justify-center shadow-2xl origin-bottom will-change-transform">
              <div className="relative w-full h-full grayscale-[0.2] overflow-hidden">
                 <Image src="/images/portrait.png" alt="Student" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Minimal Down Arrow */}
          <div className="flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity mt-10 md:mt-16 w-full">
             <div className="w-[2px] h-12 bg-gradient-to-b from-transparent to-[#ed1c29] mb-2"></div>
             <svg className="w-5 h-5 text-[#ed1c29]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
             </svg>
          </div>

        </div>
      </div>

    </section>
  );
}
