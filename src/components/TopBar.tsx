import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
     if (dropdownOpen) {
       if (dropdownMenuRef.current) {
         gsap.killTweensOf(dropdownMenuRef.current);
         gsap.killTweensOf(dropdownMenuRef.current.children);
         
         gsap.fromTo(dropdownMenuRef.current, 
           { opacity: 0, y: 15, display: "none" }, 
           { opacity: 1, y: 0, display: "flex", duration: 0.3, ease: "power3.out" }
         );
         
         // Lấy các mục Liên kết (Bỏ qua thẻ đầu tiên là cầu nối chặn mất dấu hover)
         const items = Array.from(dropdownMenuRef.current.children).slice(1);
         gsap.fromTo(items,
           { opacity: 0, x: -10 },
           { opacity: 1, x: 0, duration: 0.3, stagger: 0.04, ease: "power3.out", delay: 0.05 }
         );
       }
     } else {
       if (dropdownMenuRef.current) {
         gsap.killTweensOf(dropdownMenuRef.current);
         gsap.killTweensOf(dropdownMenuRef.current.children);
         gsap.to(dropdownMenuRef.current, {
            opacity: 0,
            y: 10,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
              if (dropdownMenuRef.current) dropdownMenuRef.current.style.display = "none";
            }
         });
       }
     }
  }, [dropdownOpen]);

  const handleMenuTransition = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setDropdownOpen(false);
    handlePageTransition(e, href);
  };

  const handlePageTransition = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 z-[100000] bg-[#FAFAFA] flex items-center justify-center flex-col pointer-events-auto origin-bottom";
    overlay.style.transform = "scaleY(0)";
    overlay.innerHTML = `
      <div class="relative w-[80vw] md:w-[60vw] max-w-[800px] aspect-[4/1] select-none flex items-center justify-center">
         <div class="absolute inset-0 opacity-15 grayscale">
            <img src="/logos/Logo1.png" style="width:100%; height:100%; object-fit:contain;" />
         </div>
         <div class="absolute inset-0" id="topbar-fill-logo" style="clip-path: inset(100% 0 0 0)">
            <img src="/logos/Logo1.png" style="width:100%; height:100%; object-fit:contain;" />
         </div>
      </div>
      <div id="topbar-counter" class="absolute bottom-6 right-8 md:bottom-12 md:right-16 text-[#2c2b7c] font-heading text-4xl sm:text-6xl md:text-8xl lg:text-[120px] font-black tracking-tighter">0%</div>
    `;
    document.body.appendChild(overlay);

    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      const tl = gsap.timeline({
        onComplete: () => {
          router.push(href);
          gsap.to(overlay, {
             scaleY: 0,
             duration: 0.7,
             ease: "power4.inOut",
             delay: 0.2,
             onComplete: () => overlay.remove()
          });
        }
      });
      tl.to(overlay, { scaleY: 1, duration: 0.6, ease: "power4.inOut" });
      let obj = { p: 0 };
      tl.to(obj, {
        p: 100,
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate: () => {
          const counter = document.getElementById("topbar-counter");
          const fill = document.getElementById("topbar-fill-logo");
          if (counter) counter.innerText = `${Math.round(obj.p)}%`;
          if (fill) fill.style.clipPath = `inset(${100 - obj.p}% 0 0 0)`;
        }
      });
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-[0_4px_20px_0_rgba(44,43,124,0.05)] border-t-[4px] border-[#ed1c29] transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-6 xl:px-10 py-3 w-full flex items-center justify-between">
         
         {/* Left Side: Back Button & Logo */}
         <div className="flex items-center gap-4 md:gap-6">
            <a href="/" onClick={(e) => handlePageTransition(e, "/")} className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#FAFAFA] border border-black/10 hover:bg-black/5 hover:-translate-x-1 transition-all group shadow-sm cursor-pointer" title="Quay lại Trang chủ">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-[#2c2b7c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <a href="/" onClick={(e) => handlePageTransition(e, "/")} className="flex items-center hover:-translate-y-1 transition-transform group cursor-pointer">
               <div className="relative w-28 sm:w-36 md:w-44 lg:w-56 h-8 sm:h-10 md:h-12 flex-shrink-0">
                  <img src="/logos/Logo2.png" alt="APAG Logo" className="object-contain object-left w-full h-full" />
               </div>
            </a>
         </div>

         {/* Right Side: Navigation & Actions */}
         <div className="flex items-center gap-4 xl:gap-8">
            
            {/* Links */}
            <nav className="hidden md:flex items-center gap-6 xl:gap-8 mr-2" ref={dropdownRef}>
               <div onClick={() => setDropdownOpen(!dropdownOpen)} className="relative flex items-center gap-1 cursor-pointer text-[#2c2b7c] font-bold text-sm xl:text-[15px] hover:text-[#ed1c29] transition-colors py-2 select-none">
                  Thông tin tuyển sinh
                  <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? '-rotate-180 text-[#ed1c29]' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>

                  {/* Dropdown Menu */}
                  <div ref={dropdownMenuRef} style={{ display: "none", opacity: 0 }} className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-[0_10px_40px_-10px_rgba(44,43,124,0.15)] border border-black/5 flex flex-col pt-2 pb-2 overflow-hidden z-50">
                     <div className="absolute -top-4 left-6 w-8 h-8 bg-transparent"></div> {/* Bridge space */}
                     
                     <a href="/#about" onClick={(e) => handleMenuTransition(e, "/#about")} className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#FAFAFA] transition-colors border-b border-black/5 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ed1c29] opacity-80 group-hover/item:scale-125 transition-transform"></div>
                        <span className="text-[#2c2b7c] font-bold text-sm group-hover/item:text-[#ed1c29] transition-colors">Giới thiệu chung</span>
                     </a>
                     <a href="/phuongthuc" onClick={(e) => handleMenuTransition(e, "/phuongthuc")} className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#FAFAFA] transition-colors border-b border-black/5 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ed1c29] opacity-80 group-hover/item:scale-125 transition-transform"></div>
                        <span className="text-[#2c2b7c] font-bold text-sm group-hover/item:text-[#ed1c29] transition-colors">Phương thức xét tuyển</span>
                     </a>
                     <a href="/#programs" onClick={(e) => handleMenuTransition(e, "/#programs")} className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#FAFAFA] transition-colors border-b border-black/5 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ed1c29] opacity-80 group-hover/item:scale-125 transition-transform"></div>
                        <span className="text-[#2c2b7c] font-bold text-sm group-hover/item:text-[#ed1c29] transition-colors">Ngành đào tạo</span>
                     </a>
                     <a href="/diemchuan" onClick={(e) => handleMenuTransition(e, "/diemchuan")} className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#FAFAFA] transition-colors border-b border-black/5 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ed1c29] opacity-80 group-hover/item:scale-125 transition-transform"></div>
                        <span className="text-[#2c2b7c] font-bold text-sm group-hover/item:text-[#ed1c29] transition-colors">Điểm chuẩn tham khảo</span>
                     </a>
                     <a href="/#timeline" onClick={(e) => handleMenuTransition(e, "/#timeline")} className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#FAFAFA] transition-colors border-b border-black/5 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ed1c29] opacity-80 group-hover/item:scale-125 transition-transform"></div>
                        <span className="text-[#2c2b7c] font-bold text-sm group-hover/item:text-[#ed1c29] transition-colors">Lịch trình tuyển sinh</span>
                     </a>
                     <a href="/#financial" onClick={(e) => handleMenuTransition(e, "/#financial")} className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#FAFAFA] transition-colors border-b border-black/5 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ed1c29] opacity-80 group-hover/item:scale-125 transition-transform"></div>
                        <span className="text-[#2c2b7c] font-bold text-sm group-hover/item:text-[#ed1c29] transition-colors">Học phí - Ký túc xá</span>
                     </a>
                     <a href="/#faq" onClick={(e) => handleMenuTransition(e, "/#faq")} className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#FAFAFA] transition-colors group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ed1c29] opacity-80 group-hover/item:scale-125 transition-transform"></div>
                        <span className="text-[#2c2b7c] font-bold text-sm group-hover/item:text-[#ed1c29] transition-colors">Câu hỏi thường gặp</span>
                     </a>
                  </div>
               </div>
               <a href="/tracuu" onClick={(e) => handlePageTransition(e, "/tracuu")} className="text-[#2c2b7c] font-bold text-sm xl:text-[15px] hover:text-[#ed1c29] transition-colors whitespace-nowrap cursor-pointer">
                  Tra cứu hồ sơ
               </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
               <Link href="/tinhdiem" className="group flex items-center gap-2 px-4 xl:px-5 py-2.5 bg-[#ed1c29]/10 rounded-lg hover:bg-[#ed1c29] transition-all duration-300 relative overflow-hidden">
                <svg className="w-5 h-5 text-[#ed1c29] group-hover:text-white transition-colors relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-bold text-[#ed1c29] group-hover:text-white transition-colors relative z-10 whitespace-nowrap hidden sm:block">
                  Tính điểm học bạ
                </span>
              </Link> <a href="/#admissions" className="bg-[#ed1c29] text-white px-5 xl:px-8 py-2.5 rounded-lg font-bold text-sm shadow-[0_4px_14px_0_rgba(237,28,41,0.39)] hover:shadow-[0_6px_20px_rgba(237,28,41,0.23)] hover:bg-[#d61723] transition-all hover:-translate-y-0.5 whitespace-nowrap">
                  Đăng ký tư vấn
               </a>
            </div>
         </div>

      </div>
    </header>
  );
}
