"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AdmissionsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Blurred Background Marquee
      gsap.to(".blurred-marquee", {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });

      // Squiggle Animation
      gsap.to(".squiggle-path", {
        x: -400,
        ease: "none",
        duration: 8,
        repeat: -1,
      });

      // Reveal oval
      gsap.fromTo(
        ".oval-container",
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="admissions" ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center items-center py-32 bg-[#FAFAFA] text-[#0E0F0F] overflow-hidden">
      
      {/* Background Blurred Marquee */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200vw] sm:w-[300vw] flex opacity-10 blur-[8px] pointer-events-none select-none mix-blend-multiply z-0">
         <div className="blurred-marquee flex whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="font-heading text-[15vw] md:text-[200px] font-black uppercase tracking-tighter mx-4 leading-none text-black">
                TUYỂN SINH MỞ • GHI DANH NGAY • 
              </span>
            ))}
         </div>
      </div>

      {/* SVG Squiggle Line Background Effect */}
      <div className="absolute top-1/4 left-0 w-full h-[200px] opacity-30 pointer-events-none overflow-hidden mix-blend-multiply z-0">
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" className="w-[800px] sm:w-[1200px] h-[200px] opacity-30 relative">
           <path className="squiggle-path" stroke="#000000" strokeWidth="2" d="M0 100 Q 100 0 200 100 T 400 100 T 600 100 T 800 100 T 1000 100 T 1200 100" />
           <path className="squiggle-path" stroke="#000000" strokeWidth="1" opacity="0.5" d="M0 80 Q 100 -20 200 80 T 400 80 T 600 80 T 800 80 T 1000 80 T 1200 80" />
        </svg>
      </div>

      {/* Foreground Form Container (Restored Frosted Glass) */}
      <div className="form-container relative z-10 w-[95vw] md:w-[70vw] max-w-[850px] bg-white/40 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_32px_0_rgba(44,43,124,0.15)] border border-white/50 border-t-[6px] border-t-[#ed1c29] p-8 sm:p-10 md:py-12 md:px-16 flex flex-col items-center">
        
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-center uppercase mb-3 text-[#2c2b7c]">
          Đăng ký tư vấn tuyển sinh
        </h2>
        <p className="text-sm md:text-base text-[#2c2b7c]/70 text-center mb-10 w-full max-w-[600px] font-medium">
          Hoàn tất biểu mẫu dưới đây, Bộ phận Tuyển sinh sẽ gửi tài liệu và liên hệ hỗ trợ bạn trong thời gian sớm nhất.
        </p>

        <form className="w-full flex flex-col gap-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
             {/* Name */}
             <div className="flex flex-col gap-2">
               <label className="text-xs font-bold text-[#2c2b7c] uppercase tracking-wide">
                 Họ và tên <span className="text-[#ed1c29]">*</span>
               </label>
               <input 
                 type="text" 
                 placeholder="Nhập họ và tên" 
                 className="w-full bg-white/50 border border-[#2c2b7c]/20 rounded-xl px-4 py-3 text-sm text-[#2c2b7c] placeholder-[#2c2b7c]/40 focus:outline-none focus:border-[#2c2b7c] focus:ring-1 focus:ring-[#2c2b7c] focus:bg-white transition-all shadow-sm"
               />
             </div>
             
             {/* High School */}
             <div className="flex flex-col gap-2">
               <label className="text-xs font-bold text-[#2c2b7c] uppercase tracking-wide">
                 Trường THPT <span className="text-[#ed1c29]">*</span>
               </label>
               <input 
                 type="text" 
                 placeholder="Tên trường THPT" 
                 className="w-full bg-white/50 border border-[#2c2b7c]/20 rounded-xl px-4 py-3 text-sm text-[#2c2b7c] placeholder-[#2c2b7c]/40 focus:outline-none focus:border-[#2c2b7c] focus:ring-1 focus:ring-[#2c2b7c] focus:bg-white transition-all shadow-sm"
               />
             </div>

             {/* City/Province */}
             <div className="flex flex-col gap-2">
               <label className="text-xs font-bold text-[#2c2b7c] uppercase tracking-wide">
                 Tỉnh/Thành phố <span className="text-[#ed1c29]">*</span>
               </label>
               <select className="w-full bg-white/50 border border-[#2c2b7c]/20 rounded-xl px-4 py-3 text-sm text-[#2c2b7c]/80 focus:outline-none focus:border-[#2c2b7c] focus:ring-1 focus:ring-[#2c2b7c] focus:bg-white transition-all appearance-none cursor-pointer shadow-sm">
                 <option value="">-- Chọn Tỉnh/Thành phố --</option>
                 <option value="HN">Hà Nội</option>
                 <option value="HCM">TP. Hồ Chí Minh</option>
                 <option value="DN">Đà Nẵng</option>
                 <option value="OTHER">Tỉnh/Thành phố khác</option>
               </select>
             </div>

             {/* Phone */}
             <div className="flex flex-col gap-2">
               <label className="text-xs font-bold text-[#2c2b7c] uppercase tracking-wide">
                 Số điện thoại (Zalo) <span className="text-[#ed1c29]">*</span>
               </label>
               <input 
                 type="tel" 
                 placeholder="09xx xxx xxx" 
                 className="w-full bg-white/50 border border-[#2c2b7c]/20 rounded-xl px-4 py-3 text-sm text-[#2c2b7c] placeholder-[#2c2b7c]/40 focus:outline-none focus:border-[#2c2b7c] focus:ring-1 focus:ring-[#2c2b7c] focus:bg-white transition-all shadow-sm"
               />
             </div>

             {/* Email (Full Width) */}
             <div className="flex flex-col gap-2 md:col-span-2">
               <label className="text-xs font-bold text-[#2c2b7c] uppercase tracking-wide">
                 Địa chỉ Email <span className="text-[#ed1c29]">*</span>
               </label>
               <input 
                 type="email" 
                 placeholder="email@gmail.com" 
                 className="w-full bg-white/50 border border-[#2c2b7c]/20 rounded-xl px-4 py-3 text-sm text-[#2c2b7c] placeholder-[#2c2b7c]/40 focus:outline-none focus:border-[#2c2b7c] focus:ring-1 focus:ring-[#2c2b7c] focus:bg-white transition-all shadow-sm"
               />
             </div>

             {/* Major/Specialization (Full Width) */}
             <div className="flex flex-col gap-2 md:col-span-2">
               <label className="text-xs font-bold text-[#2c2b7c] uppercase tracking-wide">
                 Ngành/Chuyên ngành quan tâm <span className="text-[#ed1c29]">*</span>
               </label>
               <select className="w-full bg-white/50 border border-[#2c2b7c]/20 rounded-xl px-4 py-3 text-sm text-[#2c2b7c]/80 focus:outline-none focus:border-[#2c2b7c] focus:ring-1 focus:ring-[#2c2b7c] focus:bg-white transition-all appearance-none cursor-pointer shadow-sm">
                 <option value="">-- Lựa chọn ngành/chuyên ngành đào tạo --</option>
                 <option value="LT">Lưu trữ học</option>
                 <option value="QLNN">Quản lý nhà nước</option>
                 <option value="QLNN_ANQP">Quản lý nhà nước về An ninh trật tự</option>
                 <option value="QLCC">Quản lý công</option>
                 <option value="XDDC">Xây dựng Đảng và chính quyền nhà nước</option>
                 <option value="KT">Kinh tế</option>
                 <option value="L">Luật</option>
                 <option value="NN">Ngôn ngữ Anh</option>
               </select>
             </div>
           </div>

           {/* Submit Button */}
           <button 
              type="button" 
              className="mt-6 w-full px-8 py-5 bg-[#2c2b7c] text-white rounded-xl uppercase text-sm font-bold tracking-[0.05em] hover:bg-[#ed1c29] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-[#ed1c29]/30"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
             </svg>
             Đăng ký tư vấn ngay
           </button>
        </form>
      </div>

    </section>
  );
}
