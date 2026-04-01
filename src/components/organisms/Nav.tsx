"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createPageTransition } from "@/lib/page-transition";

export default function Nav() {
  const navRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => console.error("Failed to play audio:", err));
      }
    }
  };

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1 }
    );
  }, []);

  useEffect(() => {
    if (menuOpen) {
      // Menu enter animation
      gsap.to(overlayRef.current, {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.6,
        ease: "power3.out"
      });
      // Stagger items
      if (menuItemsRef.current) {
        gsap.fromTo(
          menuItemsRef.current.children,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power3.out", delay: 0.2 }
        );
      }
    } else {
      // Menu exit animation
      gsap.to(overlayRef.current, {
        opacity: 0,
        y: 20,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power2.in"
      });
    }
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    closeMenu();
    if (window.location.pathname !== "/") {
      window.location.href = `/${targetId}`;
      return;
    }
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePageTransition = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMenu();
    createPageTransition(href, { router, idPrefix: 'nav' });
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/sounds/2025.12 Sound Tổng kết năm.mp3" 
        loop 
        preload="none" 
        className="hidden" 
        controlsList="nodownload" 
      />
      <div
        ref={navRef}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-60 bg-white/80 backdrop-blur-md border border-black/10 rounded-full flex items-center p-[6px] shadow-2xl opacity-0"
      >
        <button 
           onClick={toggleMenu}
           className="flex items-center gap-3 px-5 py-2.5 rounded-full hover:bg-black/5 transition-colors"
        >
          <div className="flex flex-col gap-[4px] justify-center items-center opacity-80">
            {menuOpen ? (
               <svg className="w-4 h-4 text-[#2c2b7c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
               </svg>
            ) : (
              <>
                 <span className="w-3.5 h-[1.5px] bg-[#2c2b7c] block"></span>
                 <span className="w-3.5 h-[1.5px] bg-[#2c2b7c] block"></span>
                 <span className="w-3.5 h-[1.5px] bg-[#2c2b7c] block"></span>
              </>
            )}
          </div>
          <span className="text-sm font-bold tracking-wide text-[#2c2b7c] hover:text-[#ed1c29] transition-colors w-10 text-center">
            {menuOpen ? 'Đóng' : 'Menu'}
          </span>
        </button>

        <div className="hidden lg:flex items-center px-4 gap-1">
          <Link href="/#about" onClick={(e) => handleScroll(e, '#about')} className="px-3 py-2 text-sm font-semibold text-[#555555] hover:text-[#ed1c29] transition-colors rounded-full hover:bg-black/5">Về chúng tôi</Link>
          <Link href="/#timeline" onClick={(e) => handleScroll(e, '#timeline')} className="px-3 py-2 text-sm font-semibold text-[#555555] hover:text-[#ed1c29] transition-colors rounded-full hover:bg-black/5">Lịch trình</Link>
          <Link href="/phuongthuc" onClick={(e) => handlePageTransition(e, "/phuongthuc")} className="px-3 py-2 text-sm font-semibold text-[#555555] hover:text-[#ed1c29] transition-colors rounded-full hover:bg-black/5">Phương thức</Link>
          <Link href="/tinhdiem" onClick={(e) => handlePageTransition(e, "/tinhdiem")} className="px-3 py-2 text-sm font-semibold text-[#555555] hover:text-[#ed1c29] transition-colors rounded-full hover:bg-black/5">Tính điểm</Link>
          <Link href="/#contact" onClick={(e) => handleScroll(e, '#contact')} className="px-3 py-2 text-sm font-semibold text-[#555555] hover:text-[#ed1c29] transition-colors rounded-full hover:bg-black/5">Liên hệ</Link>
        </div>

        <div className="pl-4 border-l border-black/10 flex items-center pr-1 ml-1 h-8">
          <button 
             onClick={toggleAudio}
             title={isPlaying ? "Tắt âm thanh" : "Bật âm thanh"}
             className="w-10 h-10 rounded-full bg-[#ed1c29] text-[#FAFAFA] flex items-center justify-center hover:scale-105 transition-transform group overflow-hidden relative border border-[#ed1c29]/20 shadow-lg"
          >
             {isPlaying ? (
                <div className="flex items-center gap-[3px] w-4 h-4 relative z-10 justify-center">
                   <div className="w-[3px] h-full bg-white rounded-full animate-audio-wave" style={{ animationDuration: '0.7s', animationDelay: '0s' }}></div>
                   <div className="w-[3px] h-full bg-white rounded-full animate-audio-wave" style={{ animationDuration: '0.9s', animationDelay: '0.3s' }}></div>
                   <div className="w-[3px] h-full bg-white rounded-full animate-audio-wave" style={{ animationDuration: '0.6s', animationDelay: '0.1s' }}></div>
                </div>
             ) : (
                <svg className="w-4 h-4 ml-0.5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M8 5v14l11-7z" />
                </svg>
             )}
          </button>
        </div>
      </div>

      {/* Full-Screen Menu Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-55 bg-[#FAFAFA]/95 backdrop-blur-xl flex flex-col justify-center items-center opacity-0 pointer-events-none translate-y-4"
      >
        <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-[#2c2b7c]/20"></div>
        <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-[#2c2b7c]/20"></div>
        <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-[#2c2b7c]/20"></div>
        <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-[#2c2b7c]/20"></div>
        
        <div className="w-[80vw] max-w-[600px] mb-12 flex justify-center">
             <div className="relative w-48 h-16">
                 <Image src="/logos/Logo2.png" alt="APAG" fill className="object-contain" />
             </div>
        </div>

        <ul ref={menuItemsRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-5 md:gap-y-8 font-heading text-[22px] sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-[#2c2b7c] w-full max-w-[900px] px-8 text-center md:text-left">
           <li><Link onClick={(e) => handleScroll(e, '#headquarters')} href="/#headquarters" className="hover:text-[#ed1c29] transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[3px] after:bottom-0 after:left-0 after:bg-[#ed1c29] after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Tổng quan</Link></li>
           <li><Link onClick={(e) => handleScroll(e, '#about')} href="/#about" className="hover:text-[#ed1c29] transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[3px] after:bottom-0 after:left-0 after:bg-[#ed1c29] after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Giới thiệu chung</Link></li>
           <li><Link onClick={(e) => handleScroll(e, '#programs')} href="/#programs" className="hover:text-[#ed1c29] transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[3px] after:bottom-0 after:left-0 after:bg-[#ed1c29] after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Ngành đào tạo</Link></li>
           <li><Link onClick={(e) => handlePageTransition(e, "/phuongthuc")} href="/phuongthuc" className="hover:text-[#ed1c29] transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[3px] after:bottom-0 after:left-0 after:bg-[#ed1c29] after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Phương thức XT</Link></li>
           <li><Link onClick={(e) => handlePageTransition(e, "/diemchuan")} href="/diemchuan" className="hover:text-[#ed1c29] transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[3px] after:bottom-0 after:left-0 after:bg-[#ed1c29] after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Điểm chuẩn</Link></li>
           <li><Link onClick={(e) => handlePageTransition(e, "/tinhdiem")} href="/tinhdiem" className="hover:text-[#ed1c29] transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[3px] after:bottom-0 after:left-0 after:bg-[#ed1c29] after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Tính điểm học bạ</Link></li>
           <li><Link onClick={(e) => handleScroll(e, '#timeline')} href="/#timeline" className="hover:text-[#ed1c29] transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[3px] after:bottom-0 after:left-0 after:bg-[#ed1c29] after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Lịch trình TS</Link></li>
           <li><Link onClick={(e) => handleScroll(e, '#financial')} href="/#financial" className="hover:text-[#ed1c29] transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[3px] after:bottom-0 after:left-0 after:bg-[#ed1c29] after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Học phí - KTX</Link></li>
           <li><Link onClick={(e) => handleScroll(e, '#faq')} href="/#faq" className="hover:text-[#ed1c29] transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[3px] after:bottom-0 after:left-0 after:bg-[#ed1c29] after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Hỏi đáp - FAQ</Link></li>
           <li><Link onClick={(e) => handleScroll(e, '#contact')} href="/#contact" className="hover:text-[#ed1c29] transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[3px] after:bottom-0 after:left-0 after:bg-[#ed1c29] after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left">Liên hệ</Link></li>
        </ul>
      </div>
    </>
  );
}
