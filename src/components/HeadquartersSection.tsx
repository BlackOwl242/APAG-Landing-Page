"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HeadquartersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hq-text",
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );
      
      gsap.fromTo(
        ".hq-image",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="headquarters" ref={sectionRef} className="relative min-h-screen py-32 bg-[#FAFAFA] border-t border-[#2c2b7c]/10 flex flex-col items-center justify-center overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[#2c2b7c]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="w-full max-w-[90vw] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Left Side Typography */}
        <div className="lg:w-1/2 flex flex-col justify-center gap-8">
          <div className="flex items-center gap-4">
             <div className="w-12 h-[2px] bg-[#ed1c29]/80"></div>
             <span className="text-sm font-bold tracking-[0.4em] uppercase text-[#2c2b7c]">Trụ sở chính</span>
          </div>
          
          <div className="flex flex-col w-full px-2 pb-4">
             <h2 className="hq-text font-heading text-[clamp(3rem,12vw,120px)] font-black uppercase tracking-tighter text-[#2c2b7c] leading-[1.05] break-words">
               HÀ NỘI
             </h2>
             <h3 className="hq-text font-heading text-[clamp(1.8rem,7vw,70px)] font-bold uppercase tracking-tighter text-[#ed1c29] leading-[1.05] mt-2 break-words">
               VIỆT NAM
             </h3>
          </div>
          
          <div className="hq-text border-l-2 border-[#ed1c29]/50 pl-6 mt-4">
             <p className="font-sans text-base md:text-lg lg:text-xl font-semibold text-[#555] leading-relaxed max-w-lg">
               Trung tâm đầu não của Học viện Hành chính và Quản trị công, nơi kiến tạo chuẩn mực đào tạo và phát triển nhân lực cấp cao quốc gia.
             </p>
             <p className="font-sans text-sm md:text-base font-bold text-[#2c2b7c] tracking-wide mt-6 uppercase">
               77 Nguyễn Chí Thanh, Q. Đống Đa, TP. Hà Nội
             </p>
          </div>
        </div>

        {/* Right Side Image Block */}
        <div className="lg:w-1/2 flex justify-center w-full relative hq-image">
           <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[3/4] max-w-[600px] bg-[#E5E5E5] rounded-sm overflow-hidden shadow-2xl group">
             <Image src="/images/building.png" alt="APAG Headquarters" fill className="object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" />
             <div className="absolute inset-0 border-[0.5rem] border-[#FAFAFA]/50 pointer-events-none"></div>
             
             {/* Corner Accents */}
             <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#ed1c29]"></div>
             <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#ed1c29]"></div>
           </div>
        </div>

      </div>
    </section>
  );
}
