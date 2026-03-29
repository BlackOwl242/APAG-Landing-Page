"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Khóa cuộn màn hình khi đang load
    document.body.style.overflow = "hidden";
    
    // Timeline cuộn từ 0 lên 100% độc lập, rất nhạy
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
          delay: 0.2, // Tạm dừng 1 chút ở đỉnh điểm nhìn cho êm
          onComplete: () => {
            if (containerRef.current) containerRef.current.style.display = "none";
          }
        });
      }
    });

    let obj = { p: 0 };
    tl.to(obj, {
      p: 100,
      duration: 2.5,
      ease: "power3.inOut", 
      onUpdate: () => {
        const prog = Math.round(obj.p);
        
        // Cập nhật text phần trăm
        if (counterRef.current) {
          counterRef.current.innerText = `ĐANG TẢI... ${prog}%`;
        }
        
        // Đổ đầy Logo bằng cách cắt mặt nạ từ dưới lên
        if (fillRef.current) {
          fillRef.current.style.clipPath = `inset(${100 - obj.p}% 0 0 0)`;
        }
      }
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // KHÔNG dùng if (!mounted) ở đây để Server side code được render ra HTML sẵn,
  // khi file tải xong CSS tải xong, màn loading sẽ bọc chặt web ngay lập tức không bị chớp giật nội dung ảo!

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[10000] bg-[#FAFAFA] flex items-center justify-center flex-col pointer-events-none"
    >
      <div className="relative w-[250px] sm:w-[350px] md:w-[450px] h-[80px] sm:h-[120px] select-none flex items-center justify-center">
         
         {/* Lớp hiển thị 0% - Mờ xỉn hoặc đen trắng */}
         <div className="absolute inset-0 opacity-15 grayscale">
            <Image 
              src="/logos/Logo1.png" 
              alt="APAG Loading..." 
              fill 
              priority
              className="object-contain" 
            />
         </div>
         
         {/* Lớp đổ đầy (Màu chuẩn logo đỏ - xanh) */}
         <div 
            ref={fillRef}
            className="absolute inset-0"
            style={{ clipPath: "inset(100% 0 0 0)" }}
         >
            <Image 
              src="/logos/Logo1.png" 
              alt="APAG Logo" 
              fill 
              priority
              className="object-contain" 
            />
         </div>

         {/* Bộ đếm phần trăm Loading... */}
         <div 
            ref={counterRef}
            className="absolute -bottom-4 md:-bottom-2 right-4 text-[#2c2b7c] font-sans text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase"
         >
            ĐANG TẢI... 0%
         </div>
      </div>
    </div>
  );
}
