"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineSteps = [
  { id: "01", date: "01/6 - 12/7", title: "Nộp hồ sơ Học bạ", desc: "Thí sinh nộp hồ sơ trực tiếp hoặc bưu điện về Phân hiệu." },
  { id: "02", date: "01/7 - 14/7", title: "Đăng ký Nguyện vọng", desc: "Đăng ký trực tuyến trên hệ thống Bộ GD&ĐT." },
  { id: "03", date: "Tr. 13/8", title: "Công bố Điểm chuẩn", desc: "Học viện công bố danh sách trúng tuyển đợt 1." },
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal each timeline item
      const items = gsap.utils.toArray(".timeline-item");
      items.forEach((item: any, i) => {
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
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={containerRef} className="relative w-full py-32 bg-[#FAFAFA] text-[#2c2b7c] border-t border-[#2c2b7c]/10 z-10 flex flex-col md:flex-row px-6 lg:px-16 gap-12">
      
      {/* Fixed Sticky Header Left */}
      <div className="md:w-1/3 flex flex-col pt-12">
        <div className="sticky top-40 flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#555]">Lịch trình 2026</span>
            <div className="flex-1 h-[2px] bg-[#ed1c29]/50"></div>
          </div>
          <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tighter leading-[1.05] break-words text-[#2c2b7c]">
            Đừng bỏ lỡ<br/><span className="text-[#2c2b7c]">Cơ hội APAG</span>
          </h2>
          <div className="w-12 h-12 rounded-full border-2 border-black/20 flex items-center justify-center -rotate-90">
             <svg className="w-4 h-4 text-[#555]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
             </svg>
          </div>
        </div>
      </div>

      {/* Scrolling Content Right */}
      <div className="md:w-2/3 flex flex-col gap-24 pt-12 md:pl-16 border-l border-[#2c2b7c]/10">
        {timelineSteps.map((step, index) => (
          <div key={index} className="timeline-item flex flex-col relative w-full">
            <span className="text-[#555] font-sans font-bold text-xs uppercase tracking-[0.3em] mb-4">Phase ({step.id})</span>
            <h3 className="font-heading text-[clamp(2.5rem,8vw,90px)] font-black text-transparent font-outline hover:text-[#ed1c29] transition-colors duration-500 uppercase tracking-tighter leading-[1.0] mb-8 cursor-default break-words">
              {step.date}
            </h3>
            <div className="flex flex-col gap-2 pl-4 md:pl-8 border-l-2 border-[#ed1c29]/50">
              <h4 className="text-xl md:text-3xl font-heading font-black tracking-tight text-[#2c2b7c] uppercase">{step.title}</h4>
              <p className="text-sm md:text-base font-semibold text-[#555] max-w-sm text-balance">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
