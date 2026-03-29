import Link from "next/link";
import React from "react";

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-[0_4px_20px_0_rgba(44,43,124,0.05)] border-t-[4px] border-[#ed1c29] transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-6 xl:px-10 py-3 w-full flex items-center justify-between">
         
         {/* Left Side: Logo & Brand Name */}
         <Link href="/" className="flex items-center hover:-translate-y-1 transition-transform group">
            {/* Logo Image directly mimicking homepage */}
            <div className="relative w-28 sm:w-36 md:w-44 lg:w-56 h-8 sm:h-10 md:h-12 flex-shrink-0">
               <img src="/logos/Logo2.png" alt="APAG Logo" className="object-contain object-left w-full h-full" />
            </div>
         </Link>

         {/* Right Side: Navigation & Actions */}
         <div className="flex items-center gap-4 xl:gap-8">
            
            {/* Links */}
            <nav className="hidden md:flex items-center gap-6 xl:gap-8 mr-2">
               <div className="relative group/nav flex items-center gap-1 cursor-pointer text-[#2c2b7c] font-bold text-sm xl:text-[15px] hover:text-[#ed1c29] transition-colors">
                  Thông tin tuyển sinh
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover/nav:-rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
               </div>
               <Link href="/tracuu" className="text-[#2c2b7c] font-bold text-sm xl:text-[15px] hover:text-[#ed1c29] transition-colors whitespace-nowrap">
                  Tra cứu hồ sơ
               </Link>
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
