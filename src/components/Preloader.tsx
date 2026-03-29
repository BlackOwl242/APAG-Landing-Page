"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Lock scroll
    document.body.style.overflow = "hidden";
    
    const tl = gsap.timeline({
      onComplete: () => {
        // Unlock scroll instantly before hiding text
        document.body.style.overflow = "";
        
        // Slide the entire screen up like a curtain
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
          delay: 0.3,
          onComplete: () => {
            if (containerRef.current) containerRef.current.style.display = "none";
          }
        });
      }
    });

    let obj = { p: 0 };
    tl.to(obj, {
      p: 100,
      duration: 3,
      ease: "power3.inOut", // Smooth ease that mimics liquid accumulation
      onUpdate: () => {
        const prog = Math.round(obj.p);
        
        // Update the percentage
        if (counterRef.current) {
          counterRef.current.innerText = `loading... ${prog}%`;
        }
        
        // Fill the text by adjusting the inset clip-path from bottom to top
        if (fillRef.current) {
          fillRef.current.style.clipPath = `inset(${100 - obj.p}% 0 0 0)`;
        }
      }
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[10000] bg-black flex items-center justify-center flex-col pointer-events-none"
    >
      <div className="relative inline-block select-none">
         
         {/* Background Empty Text (Dark Grey) */}
         <h1 className="font-heading text-8xl sm:text-[140px] md:text-[200px] lg:text-[280px] leading-none font-black uppercase tracking-tighter text-[#1f1f1f] text-center">
            APAG
         </h1>
         
         {/* Foreground Filled Text (White) Masked */}
         <h1 
            ref={fillRef}
            className="font-heading text-8xl sm:text-[140px] md:text-[200px] lg:text-[280px] leading-none font-black uppercase tracking-tighter text-white absolute top-0 left-0 text-center w-full"
            style={{ clipPath: "inset(100% 0 0 0)" }}
         >
            APAG
         </h1>

         {/* Counter Text */}
         <div 
            ref={counterRef}
            className="absolute -bottom-8 right-2 text-white/50 font-sans text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase"
         >
            loading... 0%
         </div>
      </div>
    </div>
  );
}
