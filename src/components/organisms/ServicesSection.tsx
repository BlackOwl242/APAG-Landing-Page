"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { services } from "@/constants/services";
import { createPageTransition } from "@/lib/page-transition";

import { useRouter } from "next/navigation";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
  
  const handleAction = (e: React.MouseEvent<HTMLAnchorElement>, service: typeof services[0]) => {
     e.preventDefault();
     if (service.isScroll) {
       const target = document.querySelector(service.link);
       if (target) {
         target.scrollIntoView({ behavior: 'smooth' });
       }
     } else {
       createPageTransition(service.link, { router, idPrefix: 'service' });
     }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative w-full py-0 bg-[#FAFAFA] border-t border-[#2c2b7c]/10 z-10 flex flex-col">
      <div className="w-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#2c2b7c]/10 border-b border-[#2c2b7c]/10">
        
        {services.map((service, index) => (
          <a key={index} href={service.link} onClick={(e) => handleAction(e, service)} className="service-card group flex-1 aspect-square md:aspect-auto md:h-[60vh] flex flex-col justify-between p-8 hover:bg-[#2c2b7c]/5 transition-colors relative overflow-hidden">
            
            <div className="flex justify-between items-start w-full relative z-10">
              <span className="font-sans text-xs font-bold text-[#555] tracking-widest uppercase">({service.id})</span>
              <svg className="w-6 h-6 text-[#ed1c29] md:text-[#2c2b7c] md:opacity-50 md:group-hover:text-[#ed1c29] md:group-hover:opacity-100 md:group-hover:rotate-45 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col gap-1 md:gap-2">
                <h3 className="font-heading text-[clamp(1.8rem,7vw,4rem)] font-black uppercase tracking-tighter text-[#2c2b7c] leading-[1.1] break-words">
                  {service.title}
                </h3>
                <span className="font-heading text-[clamp(1.8rem,7vw,4rem)] font-black uppercase tracking-tighter text-[#ed1c29] md:text-[#888] leading-[1.1] md:group-hover:text-[#ed1c29] transition-colors duration-500">
                  {service.subtitle}
                </span>
              </div>
            </div>

            {/* Hover Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#ed1c29]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </a>
        ))}

      </div>
    </section>
  );
}
