"use client";

import React from "react";
import Image from "next/image";
import { createPageTransition } from "@/lib/page-transition";

export default function Footer() {
  const handleExternalNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    createPageTransition(href, { useHardNav: true, idPrefix: 'footer' });
  };

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative bg-[#FAFAFA] pt-24 pb-48 border-t border-[#2c2b7c]/10 z-10 overflow-hidden">

      {/* Corner Brackets */}
      <div className="absolute top-4 left-4 sm:top-10 sm:left-10 md:top-20 md:left-20 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#2c2b7c]/30 block opacity-50 sm:opacity-100"></div>
      <div className="absolute top-4 right-4 sm:top-10 sm:right-10 md:top-20 md:right-20 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[#2c2b7c]/30 block opacity-50 sm:opacity-100"></div>

      <div className="max-w-[90vw] mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8">

        {/* Left Side Logo */}
        <div className="md:w-1/2">
          <div className="relative w-full md:w-[600px] h-[120px] md:h-[180px] mb-8">
            <Image src="/logos/Logo1.png" alt="APAG Logo" fill className="object-contain object-left" />
          </div>
          <div className="flex items-center gap-4 ml-2 mt-4">
            <div className="w-8 h-[2px] bg-[#ed1c29]/80"></div>
            <p className="text-[10px] sm:text-xs text-[#555] font-bold uppercase tracking-[0.3em] font-sans">© 2026 APAG Admissions</p>
          </div>
        </div>

        {/* Right Side Links */}
        <div className="md:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-12 text-[#2c2b7c] pt-4">
          <div>
            <h4 className="text-[10px] text-[#555] font-bold mb-6 uppercase tracking-[0.2em]">Khám phá</h4>
            <ul className="space-y-4 text-sm md:text-base font-bold uppercase tracking-widest">
              <li><a href="https://apag.edu.vn" onClick={(e) => handleExternalNav(e, "https://apag.edu.vn")} className="hover:text-[#ed1c29] transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#ed1c29] after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Trang chủ</a></li>
              <li><a href="#top" onClick={handleScrollToTop} className="hover:text-[#ed1c29] transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#ed1c29] after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Tuyển sinh</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] text-[#555] font-bold mb-6 uppercase tracking-[0.2em]">Mạng xã hội</h4>
            <ul className="space-y-4 text-sm md:text-base font-bold uppercase tracking-widest text-[#2c2b7c]">
              <li><a href="#" className="hover:text-[#ed1c29] transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-[#555] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[#555] transition-colors">Tiktok</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1 border-t border-[#2c2b7c]/10 md:border-none pt-8 md:pt-0">
            <h4 className="text-[10px] text-[#555] font-bold mb-6 uppercase tracking-[0.2em]">Liên hệ</h4>
            <div className="w-8 h-[2px] bg-[#ed1c29]/80 mb-6"></div>
            <ul className="space-y-4 text-xs font-bold text-[#555] tracking-widest uppercase leading-loose">
              <li>77 Nguyễn Chí Thanh, Q. Đống Đa, Hà Nội</li>
              <li>Hotline: 1900.9010</li>
              <li>Zalo: 0867.565.468</li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}
