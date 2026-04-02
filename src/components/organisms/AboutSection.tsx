"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Custom pointer tracking for mask effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const maskX = useSpring(mouseX, springConfig);
  const maskY = useSpring(mouseY, springConfig);
  const maskSizeVal = useSpring(0, springConfig);

  useEffect(() => {
    // Reveal the massive text line by line
    const ctx = gsap.context(() => {
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

      gsap.fromTo(".about-pill", { width: 0, opacity: 0 }, { width: "120px", opacity: 1, duration: 1.2, ease: "power3.inOut", scrollTrigger: { trigger: sectionRef.current, start: "top 60%" } });
      gsap.fromTo(".new-content-block", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: ".new-content-grid", start: "top 75%" } });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    maskSizeVal.set(isHovered ? 400 : 40);
  }, [isHovered, maskSizeVal]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const maskImage = useMotionTemplate`radial-gradient(${maskSizeVal}px circle at ${maskX}px ${maskY}px, black 25%, transparent 80%)`;

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
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#555]">Giới thiệu chung</span>
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#555]">(01)</span>
        </div>

        {/* Massive Inline Typography with Mask Effect */}
        <div ref={containerRef} className="relative w-full max-w-full font-heading text-[clamp(1.5rem,4.5vw,60px)] lg:text-[70px] font-black leading-[1.3] text-[#2c2b7c] tracking-tighter">
          
          {/* BOTTOM LAYER (Base text) */}
          <div ref={textRef} className="w-full relative z-0">
            {/* KIẾN TẠO */}
            <span 
              className="whitespace-nowrap relative inline-block mr-3 cursor-default"
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="inline-block mr-2 md:mr-3 p-[0.3em] -m-[0.3em] text-[#2c2b7c]">KIẾN</span>
              <span className="inline-block mr-2 md:mr-3 p-[0.3em] -m-[0.3em] text-[#2c2b7c]">TẠO</span>
              <div className="absolute bottom-1 md:bottom-2 left-0 w-full h-[4px] bg-[#ed1c29]/50 -z-10"></div>
            </span>

            {/* TRI THỨC */}
            <span 
              className="whitespace-nowrap inline-block mr-4 md:mr-6 cursor-default"
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="about-word inline-block mr-2 md:mr-3 p-[0.3em] -m-[0.3em] text-[#2c2b7c] transition-opacity duration-500 ease-out max-md:opacity-0!" style={{ opacity: isHovered ? 0.1 : 1 }}>TRI</span>
              <span className="about-word inline-block p-[0.3em] -m-[0.3em] text-[#2c2b7c] transition-opacity duration-500 ease-out max-md:opacity-0!" style={{ opacity: isHovered ? 0.1 : 1 }}>THỨC</span>
            </span>

            {/* ĐỔI MỚI */}
            <span 
              className="whitespace-nowrap inline-block mr-3 cursor-default"
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="inline-block mr-4 md:mr-6 p-[0.3em] -m-[0.3em] text-[#2c2b7c]">—</span>
              <span className="relative inline-block mr-2 md:mr-3">
                <span className="inline-block mr-2 md:mr-3 p-[0.3em] -m-[0.3em] text-[#2c2b7c]">ĐỔI</span>
                <span className="inline-block p-[0.3em] -m-[0.3em] text-[#2c2b7c]">MỚI</span>
                <div className="absolute bottom-1 md:bottom-2 left-0 w-full h-[4px] bg-[#ed1c29]/50 -z-10"></div>
              </span>
            </span>

            {/* SÁNG TẠO */}
            <span 
              className="whitespace-nowrap inline-block mr-4 md:mr-6 cursor-default"
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="about-word inline-block mr-2 md:mr-3 p-[0.3em] -m-[0.3em] text-[#2c2b7c] transition-opacity duration-500 ease-out max-md:opacity-0!" style={{ opacity: isHovered ? 0.1 : 1 }}>SÁNG</span>
              <span className="about-word inline-block p-[0.3em] -m-[0.3em] text-[#2c2b7c] transition-opacity duration-500 ease-out max-md:opacity-0!" style={{ opacity: isHovered ? 0.1 : 1 }}>TẠO</span>
            </span>

            {/* TRÁCH NHIỆM */}
            <span 
              className="whitespace-nowrap inline-block mr-3 cursor-default"
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="inline-block mr-4 md:mr-6 p-[0.3em] -m-[0.3em] text-[#2c2b7c]">—</span>
              <span className="relative inline-block mr-2 md:mr-3">
                <span className="inline-block mr-2 md:mr-3 p-[0.3em] -m-[0.3em] text-[#2c2b7c]">TRÁCH</span>
                <span className="inline-block p-[0.3em] -m-[0.3em] text-[#2c2b7c]">NHIỆM</span>
                <div className="absolute bottom-1 md:bottom-2 left-0 w-full h-[4px] bg-[#ed1c29]/50 -z-10"></div>
              </span>
            </span>

            {/* QUỐC GIA */}
            <span 
              className="whitespace-nowrap inline-flex items-stretch cursor-default"
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="about-word inline-flex items-baseline mr-2 md:mr-3">
                <span className="p-[0.3em] -m-[0.3em] text-[#2c2b7c] transition-opacity duration-500 ease-out max-md:opacity-0!" style={{ opacity: isHovered ? 0.1 : 1 }}>QU</span>
                <span className="relative inline-flex items-center justify-center shrink-0">
                  <span className="p-[0.3em] -m-[0.3em] text-[#2c2b7c] transition-opacity duration-500 ease-out max-md:opacity-0!" style={{ opacity: isHovered ? 0.1 : 1 }}>Ố</span>
                </span>
                <span className="p-[0.3em] -m-[0.3em] text-[#2c2b7c] transition-opacity duration-500 ease-out max-md:opacity-0!" style={{ opacity: isHovered ? 0.1 : 1 }}>C</span>
              </span>
              <span className="about-word inline-block p-[0.3em] -m-[0.3em] text-[#2c2b7c] transition-opacity duration-500 ease-out max-md:opacity-0!" style={{ opacity: isHovered ? 0.1 : 1 }}>GIA</span>
            </span>
          </div>

          {/* TOP LAYER (Masked Glow Overlay) */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 max-md:mask-none! max-md:[-webkit-mask-image:none]!"
            style={{ 
              WebkitMaskImage: maskImage, 
              maskImage: maskImage 
            }}
          >
            {/* KIẾN TẠO */}
            <span className="whitespace-nowrap relative inline-block mr-3 cursor-default">
              <span className="inline-block mr-2 md:mr-3 p-[0.3em] -m-[0.3em] text-[#2c2b7c]">KIẾN</span>
              <span className="inline-block mr-2 md:mr-3 p-[0.3em] -m-[0.3em] text-[#2c2b7c]">TẠO</span>
              <div className="absolute bottom-1 md:bottom-2 left-0 w-full h-[4px] bg-[#ed1c29]/50"></div>
            </span>

            {/* TRI THỨC */}
            <span className="whitespace-nowrap inline-block mr-4 md:mr-6 cursor-default">
              <span className="inline-block mr-2 md:mr-3 p-[0.3em] -m-[0.3em] bg-linear-to-t from-[#ed1c29] from-50% to-[#2c2b7c] to-50% bg-size-[100%_250%] bg-bottom bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(237,28,41,0.5)]">TRI</span>
              <span className="inline-block p-[0.3em] -m-[0.3em] bg-linear-to-t from-[#ed1c29] from-50% to-[#2c2b7c] to-50% bg-size-[100%_250%] bg-bottom bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(237,28,41,0.5)]">THỨC</span>
            </span>

            {/* ĐỔI MỚI */}
            <span className="whitespace-nowrap inline-block mr-3 cursor-default">
              <span className="inline-block mr-4 md:mr-6 p-[0.3em] -m-[0.3em] text-[#2c2b7c]">—</span>
              <span className="relative inline-block mr-2 md:mr-3">
                <span className="inline-block mr-2 md:mr-3 p-[0.3em] -m-[0.3em] text-[#2c2b7c]">ĐỔI</span>
                <span className="inline-block p-[0.3em] -m-[0.3em] text-[#2c2b7c]">MỚI</span>
                <div className="absolute bottom-1 md:bottom-2 left-0 w-full h-[4px] bg-[#ed1c29]/50"></div>
              </span>
            </span>

            {/* SÁNG TẠO */}
            <span className="whitespace-nowrap inline-block mr-4 md:mr-6 cursor-default">
              <span className="inline-block mr-2 md:mr-3 p-[0.3em] -m-[0.3em] bg-linear-to-t from-[#ed1c29] from-50% to-[#2c2b7c] to-50% bg-size-[100%_250%] bg-bottom bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(237,28,41,0.5)]">SÁNG</span>
              <span className="inline-block p-[0.3em] -m-[0.3em] bg-linear-to-t from-[#ed1c29] from-50% to-[#2c2b7c] to-50% bg-size-[100%_250%] bg-bottom bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(237,28,41,0.5)]">TẠO</span>
            </span>

            {/* TRÁCH NHIỆM */}
            <span className="whitespace-nowrap inline-block mr-3 cursor-default">
              <span className="inline-block mr-4 md:mr-6 p-[0.3em] -m-[0.3em] text-[#2c2b7c]">—</span>
              <span className="relative inline-block mr-2 md:mr-3">
                <span className="inline-block mr-2 md:mr-3 p-[0.3em] -m-[0.3em] text-[#2c2b7c]">TRÁCH</span>
                <span className="inline-block p-[0.3em] -m-[0.3em] text-[#2c2b7c]">NHIỆM</span>
                <div className="absolute bottom-1 md:bottom-2 left-0 w-full h-[4px] bg-[#ed1c29]/50"></div>
              </span>
            </span>

            {/* QUỐC GIA */}
            <span className="whitespace-nowrap inline-flex items-stretch cursor-default">
              <span className="inline-flex items-baseline mr-2 md:mr-3">
                <span className="p-[0.3em] -m-[0.3em] bg-linear-to-t from-[#ed1c29] from-50% to-[#2c2b7c] to-50% bg-size-[100%_250%] bg-bottom bg-clip-text text-transparent animate-flag-wave" style={{ animationDelay: '0ms' }}>QU</span>
                <span className="relative inline-flex items-center justify-center shrink-0 animate-flag-wave" style={{ animationDelay: '150ms' }}>
                  <span className="invisible p-[0.3em] -m-[0.3em]">Ố</span>
                  <div className="absolute inset-x-0 top-0 bottom-0 flex items-center justify-center drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] z-10 origin-center scale-[1.15]">
                    <svg viewBox="0 2 22 22" fill="#FFCF00">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                </span>
                <span className="p-[0.3em] -m-[0.3em] bg-linear-to-t from-[#ed1c29] from-50% to-[#2c2b7c] to-50% bg-size-[100%_250%] bg-bottom bg-clip-text text-transparent animate-flag-wave" style={{ animationDelay: '300ms' }}>C</span>
              </span>
              <span className="inline-block p-[0.3em] -m-[0.3em] bg-linear-to-t from-[#ed1c29] from-50% to-[#2c2b7c] to-50% bg-size-[100%_250%] bg-bottom bg-clip-text text-transparent animate-flag-wave" style={{ animationDelay: '450ms' }}>GIA</span>
            </span>
          </motion.div>
        </div>

        {/* NEW CONTENT ADDED BELOW THE OLD ONE */}
        <div className="new-content-grid w-full mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-t-2 border-[#2c2b7c]/10 pt-16 md:pt-24">
          {/* Column 1: Sứ mệnh */}
          <div className="flex flex-col gap-6 new-content-block">
            <h3 className="font-heading text-2xl md:text-3xl font-black uppercase text-[#2c2b7c] tracking-tighter flex items-center gap-4">
              <span className="w-8 h-[3px] bg-[#ed1c29]"></span> Sứ mệnh
            </h3>
            <p className="font-sans text-sm md:text-base text-[#555] leading-[1.8] text-justify font-medium">
              Học viện Hành chính và Quản trị công là cơ sở giáo dục đại học đa ngành, trực thuộc Học viện Chính trị quốc gia Hồ Chí Minh, có sứ mệnh đào tạo, bồi dưỡng nguồn nhân lực chất lượng cao; là trung tâm nghiên cứu khoa học, đổi mới sáng tạo và chuyển giao tri thức, tư vấn chính sách trong việc phát triển năng lực hành chính, quản lý nhà nước, quản trị công, pháp luật và các lĩnh vực có liên quan cho hệ thống chính trị và xã hội, phục vụ sự nghiệp phát triển kinh tế - xã hội và công cuộc phụng sự đất nước theo định hướng của Đảng và Nhà nước.
            </p>
          </div>

          {/* Column 2: Tầm nhìn (Detailed) */}
          <div className="flex flex-col gap-6 new-content-block">
            <h3 className="font-heading text-2xl md:text-3xl font-black uppercase text-[#2c2b7c] tracking-tighter flex items-center gap-4">
              <span className="w-8 h-[3px] bg-[#ed1c29]"></span> Tầm nhìn
            </h3>
            <div className="flex flex-col gap-6">
              <div className="border-l-2 border-[#2c2b7c]/20 pl-5 relative">
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 bg-[#FAFAFA] border-2 border-[#ed1c29] rounded-full"></div>
                <span className="block font-heading text-sm font-bold text-[#ed1c29] uppercase mb-2 tracking-widest">Đến năm 2030</span>
                <p className="font-sans text-sm md:text-base text-[#555] leading-[1.8] text-justify font-medium">
                  Học viện Hành chính và Quản trị công trở thành cơ sở giáo dục đại học trọng điểm quốc gia về đào tạo, nghiên cứu khoa học, hợp tác quốc tế và tư vấn chính sách trong lĩnh vực hành chính công và quản trị công.
                </p>
              </div>
              <div className="border-l-2 border-[#2c2b7c]/20 pl-5 relative">
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 bg-[#FAFAFA] border-2 border-[#ed1c29] rounded-full"></div>
                <span className="block font-heading text-sm font-bold text-[#ed1c29] uppercase mb-2 tracking-widest">Đến năm 2045</span>
                <p className="font-sans text-sm md:text-base text-[#555] leading-[1.8] text-justify font-medium">
                  Học viện Hành chính và Quản trị công đạt chuẩn quốc tế về quản trị đại học trong đào tạo, nghiên cứu khoa học, chuyển giao công nghệ, hợp tác quốc tế và cung cấp dịch vụ công trên các lĩnh vực hành chính, lãnh đạo, quản lý nhà nước, quản trị công và các lĩnh vực liên quan.
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Giá trị cốt lõi */}
          <div className="flex flex-col gap-6 new-content-block">
            <h3 className="font-heading text-2xl md:text-3xl font-black uppercase text-[#2c2b7c] tracking-tighter flex items-center gap-4">
              <span className="w-8 h-[3px] bg-[#ed1c29]"></span> Giá trị cốt lõi
            </h3>
            <div className="flex flex-col gap-0 border-t border-[#2c2b7c]/10 mt-2">
              <div className="flex items-center gap-6 py-5 border-b border-[#2c2b7c]/10 group hover:bg-[#2c2b7c]/5 transition-colors">
                <span className="font-heading text-3xl font-black text-[#ed1c29] md:text-[#2c2b7c]/20 md:group-hover:text-[#ed1c29] transition-colors w-12 text-center">01</span>
                <h4 className="font-heading text-lg md:text-xl font-bold text-[#2c2b7c] uppercase tracking-wide">Trí tuệ</h4>
              </div>
              <div className="flex items-center gap-6 py-5 border-b border-[#2c2b7c]/10 group hover:bg-[#2c2b7c]/5 transition-colors">
                <span className="font-heading text-3xl font-black text-[#ed1c29] md:text-[#2c2b7c]/20 md:group-hover:text-[#ed1c29] transition-colors w-12 text-center">02</span>
                <h4 className="font-heading text-lg md:text-xl font-bold text-[#2c2b7c] uppercase tracking-wide">Chất lượng</h4>
              </div>
              <div className="flex items-center gap-6 py-5 border-b border-[#2c2b7c]/10 group hover:bg-[#2c2b7c]/5 transition-colors">
                <span className="font-heading text-3xl font-black text-[#ed1c29] md:text-[#2c2b7c]/20 md:group-hover:text-[#ed1c29] transition-colors w-12 text-center">03</span>
                <h4 className="font-heading text-lg md:text-xl font-bold text-[#2c2b7c] uppercase tracking-wide">Hiện đại</h4>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
