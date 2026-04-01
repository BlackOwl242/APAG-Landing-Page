"use client";

import React, { useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COMBOS: Record<string, string[]> = {
   "A00": ["Toán", "Vật lý", "Hóa học"],
   "A01": ["Toán", "Vật lý", "Tiếng Anh"],
   "A07": ["Toán", "Lịch sử", "Địa lý"],
   "C00": ["Ngữ văn", "Lịch sử", "Địa lý"],
   "C01": ["Ngữ văn", "Toán", "Vật lý"],
   "C03": ["Ngữ văn", "Toán", "Lịch sử"],
   "C04": ["Ngữ văn", "Toán", "Địa lý"],
   "D01": ["Toán", "Ngữ văn", "Tiếng Anh"],
   "D10": ["Toán", "Địa lý", "Tiếng Anh"],
   "D14": ["Ngữ văn", "Lịch sử", "Tiếng Anh"],
   "D15": ["Ngữ văn", "Địa lý", "Tiếng Anh"],
   "X26": ["Chứng chỉ NN", "Môn 1", "Môn 2"]
};

const MAJOR_COMBOS: Record<string, string[]> = {
   "A00": ["Hệ thống thông tin", "Hệ thống thông tin / C.ngành Hệ thống thông tin thương mại điện tử", "Kinh tế", "Luật", "Luật / C.ngành Thanh tra", "Quản lý nhà nước", "Quản trị nhân lực"],
   "A01": ["Hệ thống thông tin", "Hệ thống thông tin / C.ngành Hệ thống thông tin thương mại điện tử", "Kinh tế", "Kinh tế / C.ngành Kinh tế du lịch", "Luật", "Luật / C.ngành Thanh tra", "Quản trị nhân lực", "Quản trị văn phòng"],
   "A07": ["Quản trị văn phòng"],
   "C00": ["Chính trị học", "Kinh tế", "Luật", "Luật / C.ngành Thanh tra", "Lưu trữ học", "Lưu trữ học / C.ngành Văn thư – Lưu trữ", "Quản lý nhà nước", "Quản trị dịch vụ du lịch và lữ hành", "Quản trị nhân lực", "Quản trị văn phòng", "Thông tin – Thư viện", "Xây dựng Đảng và chính quyền nhà nước"],
   "C01": ["Kinh tế", "Kinh tế / C.ngành Kinh tế du lịch", "Quản trị dịch vụ du lịch và lữ hành", "Quản trị nhân lực"],
   "C03": ["Chính trị học", "Luật", "Luật / C.ngành Thanh tra", "Lưu trữ học", "Lưu trữ học / C.ngành Văn thư – Lưu trữ", "Quản lý nhà nước", "Quản trị văn phòng", "Xây dựng Đảng và chính quyền nhà nước"],
   "C04": ["Chính trị học", "Luật", "Luật / C.ngành Thanh tra", "Quản lý nhà nước", "Quản lý nhà nước / C.ngành Quản trị tổ chức", "Quản lý nhà nước / C.ngành Quản trị địa phương", "Quản lý văn hóa", "Quản lý văn hóa / C.ngành Quản lý di sản văn hóa và phát triển du lịch", "Quản trị nhân lực", "Quản trị văn phòng", "Văn hóa học / C.ngành Văn hóa Du lịch", "Văn hóa học / C.ngành Văn hóa Truyền thông", "Xây dựng Đảng và chính quyền nhà nước"],
   "D01": ["Chính trị học", "Hệ thống thông tin", "Hệ thống thông tin / C.ngành Hệ thống thông tin thương mại điện tử", "Kinh tế", "Kinh tế / C.ngành Kinh tế du lịch", "Luật", "Luật / C.ngành Thanh tra", "Lưu trữ học", "Lưu trữ học / C.ngành Văn thư – Lưu trữ", "Quản lý nhà nước", "Quản lý nhà nước (Chương trình đào tạo 50% bằng tiếng Anh)", "Quản lý nhà nước / C.ngành Quản trị tổ chức", "Quản lý nhà nước / C.ngành Quản trị địa phương", "Quản lý văn hóa", "Quản lý văn hóa / C.ngành Quản lý di sản văn hóa và phát triển du lịch", "Quản trị dịch vụ du lịch và lữ hành", "Quản trị nhân lực", "Quản trị văn phòng", "Thông tin – Thư viện", "Văn hóa học / C.ngành Văn hóa Du lịch", "Văn hóa học / C.ngành Văn hóa Truyền thông", "Xây dựng Đảng và chính quyền nhà nước"],
   "D10": ["Kinh tế", "Kinh tế / C.ngành Kinh tế du lịch", "Luật", "Luật / C.ngành Thanh tra", "Quản lý nhà nước", "Quản trị dịch vụ du lịch và lữ hành", "Quản trị nhân lực", "Quản trị văn phòng"],
   "D14": ["Lưu trữ học", "Lưu trữ học / C.ngành Văn thư – Lưu trữ", "Quản lý nhà nước", "Quản lý nhà nước (Chương trình đào tạo 50% bằng tiếng Anh)", "Quản lý nhà nước / C.ngành Quản trị tổ chức", "Quản lý nhà nước / C.ngành Quản trị địa phương", "Quản lý văn hóa", "Quản lý văn hóa / C.ngành Quản lý di sản văn hóa và phát triển du lịch", "Quản trị dịch vụ du lịch và lữ hành", "Quản trị văn phòng", "Thông tin – Thư viện", "Văn hóa học / C.ngành Văn hóa Du lịch", "Văn hóa học / C.ngành Văn hóa Truyền thông", "Xây dựng Đảng và chính quyền nhà nước"],
   "D15": ["Kinh tế", "Quản lý nhà nước", "Quản lý nhà nước (Chương trình đào tạo 50% bằng tiếng Anh)", "Quản lý nhà nước / C.ngành Quản trị tổ chức", "Quản lý nhà nước / C.ngành Quản trị địa phương", "Quản lý văn hóa", "Quản lý văn hóa / C.ngành Quản lý di sản văn hóa và phát triển du lịch", "Quản trị dịch vụ du lịch và lữ hành", "Quản trị văn phòng", "Thông tin – Thư viện", "Văn hóa học / C.ngành Văn hóa Du lịch", "Văn hóa học / C.ngành Văn hóa Truyền thông"],
   "X26": ["Hệ thống thông tin", "Hệ thống thông tin / C.ngành Hệ thống thông tin thương mại điện tử"]
};

const BENCHMARKS_2025: Record<string, number> = {
   "Quản trị nhân lực": 24.2,
   "Quản trị văn phòng": 24.05,
   "Luật": 24.2,
   "Luật / C.ngành Thanh tra": 24.2,
   "Quản lý nhà nước": 23.75,
   "Quản lý nhà nước (Chương trình đào tạo 50% bằng tiếng Anh)": 23.0,
   "Quản lý nhà nước / C.ngành Quản trị tổ chức": 23.75,
   "Quản lý nhà nước / C.ngành Quản trị địa phương": 23.75,
   "Quản trị dịch vụ du lịch và lữ hành": 24.4,
   "Kinh tế": 23.5,
   "Kinh tế / C.ngành Kinh tế du lịch": 23.5,
   "Chính trị học": 23.35,
   "Lưu trữ học": 23.0,
   "Lưu trữ học / C.ngành Văn thư – Lưu trữ": 23.0,
   "Thông tin – Thư viện": 22.35,
   "Xây dựng Đảng và chính quyền nhà nước": 23.35,
   "Quản lý văn hóa": 23.55,
   "Quản lý văn hóa / C.ngành Quản lý di sản văn hóa và phát triển du lịch": 23.55,
   "Văn hóa học / C.ngành Văn hóa Du lịch": 23.9,
   "Văn hóa học / C.ngành Văn hóa Truyền thông": 23.9,
   "Hệ thống thông tin": 19.75,
   "Hệ thống thông tin / C.ngành Hệ thống thông tin thương mại điện tử": 19.75
};

const COMBO_BONUS: Record<string, number> = {
   "C00": +1.0
};

const AREAS: Record<string, number> = {
   "KV3 (0 điểm)": 0,
   "KV2 (0.25 điểm)": 0.25,
   "KV2-NT (0.5 điểm)": 0.5,
   "KV1 (0.75 điểm)": 0.75
};

const OBJECTS: Record<string, number> = {
   "Không có (0 điểm)": 0,
   "Nhóm UT1 (Đối tượng 1, 2, 3, 4 - 2.0đ)": 2.0,
   "Nhóm UT2 (Đối tượng 5, 6, 7 - 1.0đ)": 1.0
};

const CERTS: Record<string, number> = {
   "Không có (0 điểm)": 0,
   "IELTS 5.5 / SAT 1200-1230 (+0.5đ)": 0.5,
   "IELTS 6.0 / SAT 1231-1300 / HSG Ba cấp Tỉnh (+0.6đ)": 0.6,
   "IELTS 6.5 / SAT 1301-1350 / HSG Nhì Tỉnh / KK Quốc Gia (+0.7đ)": 0.7,
   "IELTS 7.0 / SAT 1351-1370 / HSG Nhất Tỉnh / Ba Quốc Gia (+0.8đ)": 0.8,
   "IELTS 7.5 / SAT 1371-1400 / HSG Nhì Quốc Gia (+0.9đ)": 0.9,
   "IELTS 8.0+ / SAT 1401+ / HSG Nhất Quốc Gia (+1.0đ)": 1.0
};

const CustomSelect = ({ value, options, onChange, textSize = "text-lg" }: { value: string, options: string[], onChange: (val: string) => void, textSize?: string }) => {
   const [isOpen, setIsOpen] = useState(false);
   const ref = React.useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsOpen(false);
         }
      };

      // Đóng dropdown khi thao tác lăn chuột bên ngoài trang (tránh lỗi dính màn)
      const handleScroll = () => {
         if (isOpen) setIsOpen(false);
      };

      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("wheel", handleScroll, { passive: true });

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
         window.removeEventListener("wheel", handleScroll);
      };
   }, [isOpen]);

   return (
      <div className="relative w-full" ref={ref}>
         <div
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full h-12 border-b-2 font-heading font-bold ${textSize} text-[#2c2b7c] bg-transparent cursor-pointer flex items-center justify-between pr-2 transition-colors ${isOpen ? 'border-[#ed1c29]' : 'border-black/20 hover:border-black/40'}`}
         >
            <span className="truncate select-none">{value}</span>
            <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-[#ed1c29]' : 'text-[#2c2b7c]/50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
         </div>

         {isOpen && (
            <div
               className="absolute z-40 top-[calc(100%+4px)] left-0 w-full bg-white border border-black/10 shadow-[0_10px_40px_-10px_rgba(44,43,124,0.15)] rounded-sm max-h-[250px] overflow-y-auto animate-fade-in divide-y divide-black/5 overscroll-contain"
               onWheel={(e) => e.stopPropagation()} /* Chặn sự kiện lăn trang khi đang lăn trong menu */
               onTouchMove={(e) => e.stopPropagation()}
            >
               {options.map((opt) => (
                  <div
                     key={opt}
                     onClick={() => { onChange(opt); setIsOpen(false); }}
                     className={`px-4 py-3 cursor-pointer transition-colors text-sm font-bold font-heading border-l-2 ${value === opt ? 'bg-[#FAFAFA] text-[#ed1c29] border-l-[#ed1c29]' : 'text-[#2c2b7c] hover:bg-[#FAFAFA] border-l-transparent'}`}
                  >
                     {opt}
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

type Matrix = {
   [row: number]: { g10: string; g11: string; g12: string; quickAvg: string;[col: string]: string };
};

type HistoryRecord = {
   id: string;
   time: string;
   combo: string;
   major: string;
   rawTotal: number;
   priorityTotal: number;
   finalScore: number;
   benchmark: number;
   status: "PASS" | "FAIL";
};

export default function ScoreCalculator() {
   const [combo, setCombo] = useState("D01");
   const [major, setMajor] = useState(MAJOR_COMBOS["D01"][0]);
   const [area, setArea] = useState("KV3 (0 điểm)");
   const [targetObj, setTargetObj] = useState("Không có (0 điểm)");
   const [cert, setCert] = useState("Không có (0 điểm)");

   const [matrix, setMatrix] = useState<Matrix>({
      0: { g10: "", g11: "", g12: "", quickAvg: "" },
      1: { g10: "", g11: "", g12: "", quickAvg: "" },
      2: { g10: "", g11: "", g12: "", quickAvg: "" }
   });

   const [history, setHistory] = useState<HistoryRecord[]>([]);

   const [result, setResult] = useState<{
      subjectAvgs: number[];
      rawTotal: number;
      priorityTotal: number;
      finalScore: number;
      status: "PASS" | "FAIL" | "IDLE";
      messages: string[];
      benchmark: number;
   }>({
      subjectAvgs: [0, 0, 0],
      rawTotal: 0, priorityTotal: 0, finalScore: 0, status: "IDLE", messages: [], benchmark: 0
   });

   const subjects = COMBOS[combo];
   const availableMajors = MAJOR_COMBOS[combo] || [];

   useEffect(() => {
      const saved = localStorage.getItem("apag_history");
      if (saved) {
         try {
            setHistory(JSON.parse(saved));
         } catch (e) { }
      }
   }, []);

   useEffect(() => {
      setMatrix({
         0: { g10: "", g11: "", g12: "", quickAvg: "" },
         1: { g10: "", g11: "", g12: "", quickAvg: "" },
         2: { g10: "", g11: "", g12: "", quickAvg: "" }
      });
      setMajor(MAJOR_COMBOS[combo][0]);
   }, [combo]);

   const updateMatrix = (row: number, field: string, value: string) => {
      if (value && !/^\d*\.?\d*$/.test(value)) return;
      if (parseFloat(value) > 10) value = "10";

      setMatrix(prev => ({
         ...prev,
         [row]: { ...prev[row], [field]: value }
      }));
   };

   const calculateScore = () => {
      const subjectAvgs = [0, 0, 0];
      let isMissingData = false;

      for (let r = 0; r < 3; r++) {
         const row = matrix[r];
         const quick = parseFloat(row.quickAvg);

         if (!isNaN(quick)) {
            subjectAvgs[r] = Number(quick.toFixed(2));
         } else {
            const g10 = parseFloat(row.g10);
            const g11 = parseFloat(row.g11);
            const g12 = parseFloat(row.g12);

            if (isNaN(g10) || isNaN(g11) || isNaN(g12)) {
               isMissingData = true;
            } else {
               const avg = (g10 + g11 + g12) / 3;
               subjectAvgs[r] = Number(avg.toFixed(2));
            }
         }
      }

      if (isMissingData) {
         alert("Vui lòng nhập đầy đủ điểm 3 năm hoặc nhập trực tiếp điểm TRUNG BÌNH tùy chọn cho mỗi môn!");
         return;
      }

      let rawTotal = subjectAvgs.reduce((a, b) => a + b, 0);
      const comboBonus = COMBO_BONUS[combo] || 0;
      if (comboBonus > 0) {
         rawTotal += comboBonus;
      }

      const basePriority = AREAS[area] + OBJECTS[targetObj] + CERTS[cert];
      let finalPriority = basePriority;
      if (rawTotal > 22.5) {
         finalPriority = basePriority * ((30 - rawTotal) / 7.5);
         finalPriority = Math.max(0, finalPriority);
      }

      const finalScore = Number((rawTotal + finalPriority).toFixed(2));
      const currentBenchmark = BENCHMARKS_2025[major] || 16.0;

      let status: "PASS" | "FAIL" = "PASS";
      const messages: string[] = [];

      if (finalScore < currentBenchmark) {
         status = "FAIL";
         messages.push(`Kết quả chưa đạt mức điểm trúng tuyển năm gần nhất (${currentBenchmark.toFixed(2)} điểm) cho ngành dự khớp.`);
         messages.push(`Bạn vui lòng tham khảo các ngành có mức điểm phù hợp hơn ở cuối trang.`);
      }

      setResult({
         subjectAvgs,
         rawTotal: Number(rawTotal.toFixed(2)),
         priorityTotal: Number(finalPriority.toFixed(2)),
         finalScore,
         status,
         messages,
         benchmark: currentBenchmark
      });

      const newRecord: HistoryRecord = {
         id: Date.now().toString(),
         time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString('vi-VN'),
         combo,
         major,
         rawTotal: Number(rawTotal.toFixed(2)),
         priorityTotal: Number(finalPriority.toFixed(2)),
         finalScore,
         benchmark: currentBenchmark,
         status
      };
      const newHistory = [newRecord, ...history].slice(0, 5);
      setHistory(newHistory);
      localStorage.setItem("apag_history", JSON.stringify(newHistory));

      setTimeout(() => {
         const el = document.getElementById("result-block");
         if (el) {
            // Áp dụng animation trượt mượt mà
            gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });

            // Mấu chốt: Bắn tín hiệu Resize giả lập lên Windows để ép thư viện *Lenis Smooth Scroll* 
            // phải thu thập lại toàn bộ kích thước của các thẻ DO, xóa bỏ lỗi "cuộn lên cực nhanh" hay rào chắn không cuộn được xuống.
            setTimeout(() => {
               window.dispatchEvent(new Event('resize'));
               if (typeof window !== "undefined" && (window as any).ScrollTrigger) {
                  (window as any).ScrollTrigger.refresh();
               }
            }, 100);

            // Đưa tính năng tự cuộn màn hình trở lại, CHỈ DUY NHẤT ko xài behavior='smooth'. 
            // Trình duyệt sẽ chớp xuống ngay lập tức (giữ tương đối 50% tính thẩm mỹ, ko khóa cuộn).
            el.scrollIntoView({ block: "start" });
         }
      }, 50);
   };

   const clearHistory = () => {
      if (confirm("Chắc chắn xóa lịch sử?")) {
         setHistory([]);
         localStorage.removeItem("apag_history");
      }
   };

   const getSuggestedMajors = () => {
      const suggested: string[] = [];
      Object.keys(BENCHMARKS_2025).forEach(m => {
         if (result.finalScore >= BENCHMARKS_2025[m]) {
            suggested.push(m);
         }
      });
      return suggested;
   };

   return (
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-12 sm:gap-16 lg:gap-20 animate-fade-in relative px-4 md:px-12 py-10 md:py-16">

         {/* Corner Borders matching Kurate Design */}
         <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#2c2b7c]/30 hidden md:block"></div>
         <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#2c2b7c]/30 hidden md:block"></div>
         <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#2c2b7c]/30 hidden md:block"></div>
         <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#2c2b7c]/30 hidden md:block"></div>

         {/* Title Section Editorial Style */}
         <div className="flex flex-col items-center justify-center text-center gap-4 border-b border-[#2c2b7c]/10 pb-12">
            <div className="h-[2px] w-12 bg-[#2c2b7c]"></div>
            <h2 className="font-heading font-black text-4xl md:text-5xl text-[#2c2b7c] tracking-tighter uppercase mt-4">
               Tính Điểm Kết Quả Xét Tuyển
            </h2>
         </div>

         {/* Configuration Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full">

            {/* Info Block */}
            <div className="flex flex-col gap-8 bg-[#FAFAFA] p-8 md:p-12 border border-black/10 rounded-sm shadow-sm hover:shadow-md transition-shadow">
               <div className="flex justify-between border-b border-black/10 pb-4">
                  <h3 className="font-heading font-black text-xl uppercase tracking-widest text-[#2c2b7c]">Định hướng Đào tạo</h3>
                  <span className="text-[10px] font-bold text-[#555] uppercase tracking-[0.2em]">(01)</span>
               </div>

               <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555]">Mã Tổ Hợp Môn</label>
                  <CustomSelect value={combo} options={Object.keys(COMBOS)} onChange={setCombo} textSize="text-lg" />
               </div>

               <div className="flex flex-col gap-4 mt-2 relative">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555] flex justify-between">
                     Ngành Dự Khớp
                     <span className="text-[#ed1c29] tracking-normal">*Tự động khớp Tổ hợp</span>
                  </label>
                  <CustomSelect value={major} options={availableMajors} onChange={setMajor} textSize="text-lg" />
               </div>
            </div>

            {/* Priority Block */}
            <div className="flex flex-col gap-8 bg-[#FAFAFA] p-8 md:p-12 border border-black/10 rounded-sm shadow-sm hover:shadow-md transition-shadow">
               <div className="flex justify-between border-b border-black/10 pb-4">
                  <h3 className="font-heading font-black text-xl uppercase tracking-widest text-[#ed1c29]">Khuyến khích Xét tuyển</h3>
                  <span className="text-[10px] font-bold text-[#ed1c29] uppercase tracking-[0.2em]">(02)</span>
               </div>

               <div className="flex flex-col sm:flex-row gap-8 w-full z-10">
                  <div className="w-full sm:w-1/2 flex flex-col gap-4">
                     <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555]">Khu Vực Ưu Tiên</label>
                     <CustomSelect value={area} options={Object.keys(AREAS)} onChange={setArea} textSize="text-sm" />
                  </div>
                  <div className="w-full sm:w-1/2 flex flex-col gap-4">
                     <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555]">Đối Tượng Xét</label>
                     <CustomSelect value={targetObj} options={Object.keys(OBJECTS)} onChange={setTargetObj} textSize="text-sm" />
                  </div>
               </div>

               <div className="flex flex-col gap-4 mt-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555]">Bảo Lưu IELTS / SAT / Học Sinh Giỏi</label>
                  <CustomSelect value={cert} options={Object.keys(CERTS)} onChange={setCert} textSize="text-xs" />
               </div>
            </div>

         </div>

         {/* Grade Matrix Editorial Form */}
         <div className="w-full bg-[#FAFAFA] border border-black/10 rounded-sm shadow-sm overflow-hidden flex flex-col pt-4">

            <div className="hidden md:grid grid-cols-5 bg-white text-[#2c2b7c] text-base font-black uppercase tracking-[0.15em] w-full border-b border-black/10">
               <div className="px-6 py-8 border-r border-black/5 flex items-center justify-center text-center">Tên Học Phần</div>
               <div className="px-6 py-8 border-r border-black/5 text-center flex flex-col items-center justify-center">Năm Lớp 10</div>
               <div className="px-6 py-8 border-r border-black/5 text-center flex flex-col items-center justify-center">Năm Lớp 11</div>
               <div className="px-6 py-8 border-r border-black/5 text-center flex flex-col items-center justify-center">Năm Lớp 12</div>
               <div className="px-6 py-8 text-center flex flex-col items-center justify-center text-[#ed1c29]">Điểm TB Nhanh <span className="text-[11px] font-bold tracking-[0.2em] opacity-70 block mt-1">(Tùy chọn)</span></div>
            </div>

            <div className="md:hidden bg-white text-[#2c2b7c] p-6 font-heading font-black text-lg text-center uppercase tracking-[0.2em] border-b border-black/10">
               Chi tiết Điểm số
            </div>

            <div className="flex flex-col bg-[#FAFAFA]">
               {subjects.map((sub, rIndex) => (
                  <div key={rIndex} className={`w-full flex flex-col md:grid md:grid-cols-5 border-b border-black/5 py-8 md:py-0 transition-colors hover:bg-white`}>

                     <div className="md:hidden font-heading font-black text-2xl text-[#2c2b7c] text-center mb-6 uppercase tracking-widest">
                        {sub}
                     </div>

                     <div className="hidden md:flex items-center justify-start p-6 border-r border-black/5 font-heading font-black text-2xl uppercase tracking-widest text-[#2c2b7c]">
                        {sub}
                     </div>

                     <div className="grid grid-cols-2 md:contents gap-8 px-8 md:px-0">
                        <div className="md:border-r border-black/5 md:p-6 flex flex-col items-center justify-center relative group">
                           <span className="md:hidden text-[10px] font-bold text-[#555] mb-2 uppercase tracking-[0.2em]">Lớp 10</span>
                           <input
                              type="number" max="10" min="0" step="0.1" placeholder="8.5"
                              value={matrix[rIndex].g10} onChange={(e) => updateMatrix(rIndex, 'g10', e.target.value)}
                              className="w-full max-w-[80px] h-14 text-center text-xl font-black font-mono border-b-2 border-black/10 rounded-none bg-transparent focus:border-[#2c2b7c] focus:text-[#2c2b7c] outline-none transition-all placeholder-black/20"
                           />
                        </div>
                        <div className="md:border-r border-black/5 md:p-6 flex flex-col items-center justify-center">
                           <span className="md:hidden text-[10px] font-bold text-[#555] mb-2 uppercase tracking-[0.2em]">Lớp 11</span>
                           <input
                              type="number" max="10" min="0" step="0.1" placeholder="8.5"
                              value={matrix[rIndex].g11} onChange={(e) => updateMatrix(rIndex, 'g11', e.target.value)}
                              className="w-full max-w-[80px] h-14 text-center text-xl font-black font-mono border-b-2 border-black/10 rounded-none bg-transparent focus:border-[#2c2b7c] focus:text-[#2c2b7c] outline-none transition-all placeholder-black/20"
                           />
                        </div>
                        <div className="md:border-r border-black/5 md:p-6 flex flex-col items-center justify-center col-span-2 md:col-span-1">
                           <span className="md:hidden text-[10px] font-bold text-[#555] mb-2 uppercase tracking-[0.2em]">Lớp 12</span>
                           <input
                              type="number" max="10" min="0" step="0.1" placeholder="8.5"
                              value={matrix[rIndex].g12} onChange={(e) => updateMatrix(rIndex, 'g12', e.target.value)}
                              className="w-full max-w-[80px] h-14 text-center text-xl font-black font-mono border-b-2 border-black/10 rounded-none bg-transparent focus:border-[#2c2b7c] focus:text-[#2c2b7c] outline-none transition-all placeholder-black/20"
                           />
                        </div>
                        <div className="md:p-6 flex flex-col items-center justify-center bg-white col-span-2 md:col-span-1 py-8 md:py-0 mt-4 md:mt-0 border-t border-black/5 md:border-none">
                           <span className="md:hidden text-[10px] font-bold text-[#ed1c29] mb-2 uppercase tracking-[0.2em]">TB Nhanh (Ưu Tiên)</span>
                           <input
                              type="number" max="10" min="0" step="0.1" placeholder="TB Môn"
                              value={matrix[rIndex].quickAvg} onChange={(e) => updateMatrix(rIndex, 'quickAvg', e.target.value)}
                              className="w-full max-w-[100px] h-14 text-center text-xl font-black font-mono border-b-2 border-[#ed1c29]/30 text-[#ed1c29] rounded-none bg-transparent focus:border-[#ed1c29] outline-none transition-all placeholder-[#ed1c29]/20"
                           />
                        </div>
                     </div>

                  </div>
               ))}
            </div>
         </div>

         {/* Action CTA Matching Navigation Style */}
         <div className="flex justify-center mt-6 mb-8 relative z-10 w-full">
            <button
               onClick={calculateScore}
               className="bg-[#2c2b7c] text-white px-10 md:px-16 py-4 md:py-5 rounded-lg font-bold text-lg shadow-[0_4px_14px_0_rgba(44,43,124,0.39)] hover:shadow-[0_8px_30px_rgba(237,28,41,0.4)] hover:bg-[#ed1c29] transition-all duration-300 hover:-translate-y-1 whitespace-nowrap uppercase tracking-widest relative overflow-hidden group w-full md:w-auto"
            >
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
               <span className="relative z-10 flex items-center justify-center gap-3">
                  Xuất Báo Cáo KQ
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
               </span>
            </button>
         </div>

         {/* RESULT MODAL */}
         {result.status !== "IDLE" && (
            <div id="result-block" className="relative w-full mt-10 p-8 md:p-14 bg-white rounded-sm border border-black/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">

               <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-black/10 pb-6">
                  <div className="text-center md:text-left">
                     <h2 className="font-heading font-black text-2xl md:text-4xl uppercase tracking-tighter text-[#2c2b7c]">
                        Phân tích Cơ hội Trúng tuyển
                     </h2>
                     <p className="text-[10px] uppercase font-bold text-[#555] mt-2 tracking-[0.3em]">Hệ thống dự báo trực tuyến</p>
                  </div>
               </div>

               <div className="flex flex-col gap-12 w-full">

                  {result.status === "PASS" ? (
                     <div className="w-full py-6 px-8 border-l-4 border-[#2c2b7c] bg-[#FAFAFA] flex flex-col md:flex-row items-start md:items-center gap-6">
                        <span className="w-12 h-12 bg-[#2c2b7c] text-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </span>
                        <div className="flex flex-col">
                           <span className="font-heading font-black text-[#2c2b7c] uppercase tracking-widest text-xl">Đủ Tiêu chuẩn - Cực kỳ khả quan!</span>
                           <span className="text-sm text-[#555] mt-1 font-medium">Hồ sơ đã đạt mức chênh lệch an toàn để cạnh tranh vào đợt 1. Khuyến khích nộp sớm.</span>
                        </div>
                     </div>
                  ) : (
                     <div className="w-full py-6 px-8 border-l-4 border-[#ed1c29] bg-[#FAFAFA] flex flex-col md:flex-row items-start md:items-center gap-6">
                        <span className="w-12 h-12 bg-[#ed1c29] text-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                        </span>
                        <div className="flex flex-col">
                           <span className="font-heading font-black text-[#ed1c29] uppercase tracking-widest text-xl">Cảnh báo Nguy cơ Thiếu Điểm</span>
                           <span className="text-sm text-[#555] mt-1 font-medium">
                              {result.messages.map((m, i) => <span key={i} className="block">{m}</span>)}
                           </span>
                        </div>
                     </div>
                  )}

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                     <div className="flex flex-col gap-2 border-b border-black/10 pb-4">
                        <span className="text-[10px] uppercase font-bold text-[#555] tracking-[0.2em]">Tổ hợp Xét</span>
                        <span className="font-heading font-black text-[#2c2b7c] text-xl">{combo}</span>
                     </div>
                     <div className="flex flex-col gap-2 border-b border-black/10 pb-4">
                        <span className="text-[10px] uppercase font-bold text-[#555] tracking-[0.2em]">Ngành mục tiêu</span>
                        <span className="font-heading font-black text-[#2c2b7c] text-lg leading-tight">{major}</span>
                     </div>
                     <div className="flex flex-col gap-2 border-b border-black/10 pb-4">
                        <span className="text-[10px] uppercase font-bold text-[#555] tracking-[0.2em]">Điểm Thô Cốt lỗi</span>
                        <span className="font-heading font-black text-[#2c2b7c] text-2xl">{result.rawTotal.toFixed(2)}</span>
                     </div>
                     <div className="flex flex-col gap-2 border-b border-black/10 pb-4">
                        <span className="text-[10px] uppercase font-bold text-[#555] tracking-[0.2em]">Cộng dồn UT</span>
                        <span className="font-heading font-black text-[#ed1c29] text-2xl">+{result.priorityTotal.toFixed(2)}</span>
                     </div>
                  </div>

                  {/* Kurate Giant Minimalist Display */}
                  <div className="w-full border-y border-black/10 py-16 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-black/10">
                     <div className="w-full md:w-2/3 flex flex-col items-center justify-center pb-12 md:pb-0 px-8">
                        <p className="text-[10px] font-bold text-[#555] uppercase tracking-[0.3em] mb-4 text-center">TỔNG ĐIỂM CHUẨN XÉT BỘ</p>
                        <span className={`font-heading font-black text-[100px] md:text-[140px] leading-none tracking-tighter mix-blend-multiply ${result.status === "PASS" ? "text-[#2c2b7c]" : "text-gray-300"}`}>{result.finalScore.toFixed(2)}</span>
                     </div>
                     <div className="w-full md:w-1/3 flex flex-col items-center justify-center pt-12 md:pt-0 px-8 bg-[#FAFAFA]/50">
                        <p className="text-[10px] font-bold text-[#555] uppercase tracking-[0.3em] mb-4 text-center">Điểm trúng tuyển 2025</p>
                        <span className="font-heading font-black text-6xl md:text-8xl leading-none tracking-tighter opacity-20">{result.benchmark.toFixed(2)}</span>
                     </div>
                  </div>

                  {/* Bar scale indicator */}
                  <div className="w-full flex flex-col px-4">
                     <div className="flex justify-between text-[10px] font-bold text-[#555] uppercase tracking-[0.2em] mb-4">
                        <span>0</span>
                        <span>30 Điểm Trần</span>
                     </div>
                     <div className="relative w-full h-[2px] bg-black/10 isolate">
                        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white bg-black z-20" style={{ left: `calc(${(result.benchmark / 30) * 100}% - 8px)` }}></div>
                        <div className="absolute top-1/2 -translate-y-1/2 h-[4px] bg-[#2c2b7c] z-10 transition-all duration-1500 ease-out" style={{ width: `${Math.min((result.finalScore / 30) * 100, 100)}%` }}></div>
                     </div>
                     <div className="relative w-full h-8 mt-4 text-[10px] font-bold text-[#555] uppercase tracking-[0.2em]">
                        <div className="absolute flex flex-col items-center -ml-6" style={{ left: `${(result.benchmark / 30) * 100}%` }}>
                           Vạch mốc: {result.benchmark}
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-col gap-6">
                     <h4 className="font-heading font-black text-[#2c2b7c] uppercase tracking-widest flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ed1c29]"></div> Gợi ý Ngành Liên quan Chắc suất
                     </h4>
                     <div className="flex flex-wrap gap-3">
                        {getSuggestedMajors().length > 0 ? getSuggestedMajors().map(s => (
                           <div key={s} className="px-5 py-2.5 border border-black/10 text-xs font-bold text-[#2c2b7c] uppercase tracking-[0.2em] hover:border-[#2c2b7c] transition-colors cursor-pointer bg-[#FAFAFA]">
                              {s} <span className="opacity-40 italic lowercase ml-2">/ chuẩn: {BENCHMARKS_2025[s]}</span>
                           </div>
                        )) : (
                           <span className="text-xs text-[#ed1c29] uppercase font-bold tracking-widest bg-red-50 py-3 px-6 border border-red-100">Báo động: Không có ngành đảm bảo chuẩn.</span>
                        )}
                     </div>
                  </div>

               </div>
            </div>
         )}

         {/* MINIMAL HISTORY */}
         {history.length > 0 && (
            <div className="w-full mt-8 animate-fade-in relative px-4 md:px-0">
               <div className="flex justify-between items-end mb-8 border-b border-[#2c2b7c]/10 pb-4">
                  <h3 className="font-heading font-black text-xl text-[#2c2b7c] uppercase tracking-widest">
                     Lịch sử
                  </h3>
                  <button onClick={clearHistory} className="text-[10px] font-bold text-[#555] hover:text-[#ed1c29] uppercase tracking-[0.2em] transition-colors pb-1">
                     [ Xóa ]
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {history.map(item => (
                     <div key={item.id} className="border border-black/5 bg-[#FAFAFA] p-6 hover:shadow-xl transition-shadow flex flex-col group cursor-pointer relative rounded-sm">
                        <span className="text-[9px] font-bold text-[#555] mb-4 tracking-[0.3em] uppercase">{item.time}</span>
                        <span className="font-heading font-black text-[#2c2b7c] leading-tight mb-6 h-12 flex items-center">{item.major}</span>

                        <div className="flex justify-between gap-4 border-t border-black/5 pt-4 opacity-50 group-hover:opacity-100 transition-opacity">
                           <div className="flex flex-col gap-1">
                              <span className="text-[8px] uppercase tracking-[0.2em] font-bold">Khối</span>
                              <span className="font-bold text-[#2c2b7c] text-sm">{item.combo}</span>
                           </div>
                           <div className="flex flex-col gap-1 items-end">
                              <span className="text-[8px] uppercase tracking-[0.2em] font-bold">Tổng Điểm</span>
                              <span className={`font-black text-lg ${item.status === 'PASS' ? 'text-[#2c2b7c]' : 'text-[#ed1c29]'}`}>{item.finalScore.toFixed(2)}</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}

      </div>
   );
}
