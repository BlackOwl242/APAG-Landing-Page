"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const programsList = [
  { code: "73444", title: "Quản trị nhân lực", isSpecialization: false },
  { code: "73446", title: "Quản trị văn phòng", isSpecialization: false },
  { code: "73811", title: "Luật", isSpecialization: false },
  { code: "73811-1", title: "Chuyên ngành Thanh tra (Ngành Luật)", isSpecialization: true },
  { code: "73111", title: "Kinh tế", isSpecialization: false },
  { code: "73111-1", title: "Chuyên ngành Kinh tế du lịch (Ngành Kinh tế)", isSpecialization: true },
  { code: "73125-E", title: "Quản lý nhà nước (Đào tạo 50% bằng tiếng Anh)", isSpecialization: false },
  { code: "73125", title: "Quản lý nhà nước", isSpecialization: false },
  { code: "73125-1", title: "Chuyên ngành Quản trị tổ chức", isSpecialization: true },
  { code: "73125-2", title: "Chuyên ngành Quản trị địa phương", isSpecialization: true },
  { code: "73121", title: "Chính trị học", isSpecialization: false },
  { code: "73122", title: "Xây dựng Đảng và chính quyền nhà nước", isSpecialization: false },
  { code: "73233", title: "Lưu trữ học", isSpecialization: false },
  { code: "73233-1", title: "Chuyên ngành Văn thư - Lưu trữ (Lưu trữ học)", isSpecialization: true },
  { code: "73221", title: "Thông tin - Thư viện", isSpecialization: false },
  { code: "78113", title: "Quản trị dịch vụ du lịch và lữ hành", isSpecialization: false },
  { code: "72942", title: "Quản lý văn hóa", isSpecialization: false },
  { code: "72942-1", title: "Chuyên ngành Quản lý di sản văn hóa và phát triển du lịch", isSpecialization: true },
  { code: "72940-1", title: "Chuyên ngành Văn hóa Du lịch (Văn hóa học)", isSpecialization: true },
  { code: "72940-2", title: "Chuyên ngành Văn hóa Truyền thông (Văn hóa học)", isSpecialization: true },
  { code: "74814", title: "Hệ thống thông tin", isSpecialization: false },
  { code: "74814-1", title: "Chuyên ngành Hệ thống thông tin thương mại điện tử", isSpecialization: true },
];

const provincesList = [
  "Thành phố Cần Thơ", "Thành phố Đà Nẵng", "Thành phố Hà Nội", "Thành phố Hải Phòng", "Thành phố Hồ Chí Minh", "Thành phố Huế", "Tỉnh An Giang", "Tỉnh Bắc Ninh", "Tỉnh Cà Mau", "Tỉnh Cao Bằng", "Tỉnh Điện Biên", "Tỉnh Đồng Nai", "Tỉnh Đồng Tháp", "Tỉnh Gia Lai", "Tỉnh Hà Tĩnh", "Tỉnh Hưng Yên", "Tỉnh Khánh Hoà", "Tỉnh Lai Châu", "Tỉnh Lạng Sơn", "Tỉnh Lào Cai", "Tỉnh Lâm Đồng", "Tỉnh Nghệ An", "Tỉnh Ninh Bình", "Tỉnh Phú Thọ", "Tỉnh Quảng Ngãi", "Tỉnh Quảng Ninh", "Tỉnh Quảng Trị", "Tỉnh Sơn La", "Tỉnh Tây Ninh", "Tỉnh Thái Nguyên", "Tỉnh Thanh Hoá", "Tỉnh Tuyên Quang", "Tỉnh Vĩnh Long", "Tỉnh Đắk Lắk"
];

export default function AdmissionsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownProvinceRef = useRef<HTMLDivElement>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const [isOpenProvince, setIsOpenProvince] = useState(false);
  const [searchProvinceQuery, setSearchProvinceQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (dropdownProvinceRef.current && !dropdownProvinceRef.current.contains(event.target as Node)) {
        setIsOpenProvince(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPrograms = programsList.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProvinces = provincesList.filter(p =>
    p.toLowerCase().includes(searchProvinceQuery.toLowerCase())
  );

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
    <section id="admissions" ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center items-center py-32 bg-[#FAFAFA] text-[#0E0F0F] z-20">
      
      {/* Background Elements Wrapped to Prevent Overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Background Blurred Marquee */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200vw] sm:w-[300vw] flex opacity-10 blur-[8px] pointer-events-none select-none mix-blend-multiply">
           <div className="blurred-marquee flex whitespace-nowrap">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="font-heading text-[15vw] md:text-[200px] font-black uppercase tracking-tighter mx-4 leading-none text-black">
                  TUYỂN SINH MỞ • GHI DANH NGAY • 
                </span>
              ))}
           </div>
        </div>

        {/* SVG Squiggle Line Background Effect */}
        <div className="absolute top-1/4 left-0 w-full h-[200px] opacity-30 pointer-events-none mix-blend-multiply">
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" className="w-[800px] sm:w-[1200px] h-[200px] opacity-30 relative">
             <path className="squiggle-path" stroke="#000000" strokeWidth="2" d="M0 100 Q 100 0 200 100 T 400 100 T 600 100 T 800 100 T 1000 100 T 1200 100" />
             <path className="squiggle-path" stroke="#000000" strokeWidth="1" opacity="0.5" d="M0 80 Q 100 -20 200 80 T 400 80 T 600 80 T 800 80 T 1000 80 T 1200 80" />
          </svg>
        </div>
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

             {/* City/Province Custom Dropdown */}
             <div className="flex flex-col gap-2 relative" ref={dropdownProvinceRef}>
               <label className="text-xs font-bold text-[#2c2b7c] uppercase tracking-wide">
                 Tỉnh/Thành phố <span className="text-[#ed1c29]">*</span>
               </label>
               
               <div 
                 className={`w-full bg-white/50 border ${isOpenProvince ? 'border-[#2c2b7c] ring-1 ring-[#2c2b7c]' : 'border-[#2c2b7c]/20'} rounded-xl px-4 py-3 text-sm transition-all shadow-sm flex items-center justify-between cursor-pointer select-none`}
                 onClick={() => setIsOpenProvince(!isOpenProvince)}
               >
                 <span className={selectedProvince ? "text-[#2c2b7c] font-semibold" : "text-[#2c2b7c]/60"}>
                   {selectedProvince || "-- Chọn Tỉnh/Thành phố --"}
                 </span>
                 <svg className={`w-4 h-4 text-[#2c2b7c] transition-transform duration-300 ${isOpenProvince ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                 </svg>
               </div>

               {isOpenProvince && (
                 <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white/95 backdrop-blur-xl border border-[#2c2b7c]/10 rounded-xl shadow-2xl z-[100] flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                   
                   <div className="p-3 border-b border-[#2c2b7c]/10 bg-[#FAFAFA]">
                     <div className="relative">
                       <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2c2b7c]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                       </svg>
                       <input
                         type="text"
                         autoFocus
                         placeholder="Tìm kiếm tỉnh/thành phố..."
                         value={searchProvinceQuery}
                         onChange={(e) => setSearchProvinceQuery(e.target.value)}
                         className="w-full bg-white border border-[#2c2b7c]/20 rounded-lg pl-9 pr-4 py-2 text-sm text-[#2c2b7c] placeholder-[#2c2b7c]/40 outline-none focus:border-[#2c2b7c] focus:ring-1 focus:ring-[#2c2b7c] transition-all"
                       />
                     </div>
                   </div>

                   <div className="max-h-[250px] overflow-y-auto w-full flex flex-col py-1 custom-scrollbar" data-lenis-prevent="true">
                     {filteredProvinces.length > 0 ? (
                       filteredProvinces.map((prov) => (
                         <div
                           key={prov}
                           onClick={() => {
                             setSelectedProvince(prov);
                             setIsOpenProvince(false);
                             setSearchProvinceQuery("");
                           }}
                           className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors ${selectedProvince === prov ? 'bg-[#2c2b7c]/5 border-l-2 border-[#ed1c29]' : 'hover:bg-[#2c2b7c]/5 border-l-2 border-transparent'}`}
                         >
                           <span className="text-sm text-[#2c2b7c] font-semibold leading-snug">
                             {prov}
                           </span>
                         </div>
                       ))
                     ) : (
                       <div className="py-8 text-center text-sm text-[#555] italic">
                         Không tìm thấy tỉnh/thành phố!
                       </div>
                     )}
                   </div>
                 </div>
               )}
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

             {/* Major/Specialization (Full Width) Custom Dropdown */}
             <div className="flex flex-col gap-2 md:col-span-2 relative" ref={dropdownRef}>
                <label className="text-xs font-bold text-[#2c2b7c] uppercase tracking-wide">
                  Ngành/Chuyên ngành quan tâm <span className="text-[#ed1c29]">*</span>
                </label>
                
                <div 
                  className={`w-full bg-white/50 border ${isOpen ? 'border-[#2c2b7c] ring-1 ring-[#2c2b7c]' : 'border-[#2c2b7c]/20'} rounded-xl px-4 py-3 text-sm transition-all shadow-sm flex items-center justify-between cursor-pointer select-none`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className={selectedProgram ? "text-[#2c2b7c] font-semibold" : "text-[#2c2b7c]/60"}>
                    {selectedProgram ? programsList.find(p => p.code === selectedProgram)?.title : "-- Lựa chọn ngành/chuyên ngành đào tạo --"}
                  </span>
                  <svg className={`w-4 h-4 text-[#2c2b7c] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {isOpen && (
                  <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white/95 backdrop-blur-xl border border-[#2c2b7c]/10 rounded-xl shadow-2xl z-[100] flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    
                    <div className="p-3 border-b border-[#2c2b7c]/10 bg-[#FAFAFA]">
                      <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2c2b7c]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                          type="text"
                          autoFocus
                          placeholder="Nhập mã ngành hoặc tên ngành để tìm kiếm..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-white border border-[#2c2b7c]/20 rounded-lg pl-9 pr-4 py-2 text-sm text-[#2c2b7c] placeholder-[#2c2b7c]/40 outline-none focus:border-[#2c2b7c] focus:ring-1 focus:ring-[#2c2b7c] transition-all"
                        />
                      </div>
                    </div>

                    <div className="max-h-[250px] overflow-y-auto w-full flex flex-col py-1 custom-scrollbar" data-lenis-prevent="true">
                      {filteredPrograms.length > 0 ? (
                        filteredPrograms.map((prog) => (
                          <div
                            key={prog.code}
                            onClick={() => {
                              setSelectedProgram(prog.code);
                              setIsOpen(false);
                              setSearchQuery("");
                            }}
                            className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors ${selectedProgram === prog.code ? 'bg-[#2c2b7c]/5 border-l-2 border-[#ed1c29]' : 'hover:bg-[#2c2b7c]/5 border-l-2 border-transparent'}`}
                          >
                            <span className="shrink-0 bg-[#FAFAFA] border border-[#2c2b7c]/10 rounded px-2 py-0.5 text-[10px] font-mono text-[#555] font-bold">
                              {prog.code}
                            </span>
                            
                            <span className={`text-sm ${prog.isSpecialization ? 'text-[#555] font-medium pl-2 border-l border-[#2c2b7c]/10' : 'text-[#2c2b7c] font-semibold'} leading-snug`}>
                              {prog.title}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="py-8 text-center text-sm text-[#555] italic">
                          Không tìm thấy kết quả hợp lệ!
                        </div>
                      )}
                    </div>
                  </div>
                )}
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
