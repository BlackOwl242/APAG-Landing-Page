"use client";

import React, { useState, useEffect } from "react";
import gsap from "gsap";

const COMBOS: Record<string, string[]> = {
  "A00": ["Toán", "Vật lý", "Hóa học"],
  "A01": ["Toán", "Vật lý", "Tiếng Anh"],
  "C00": ["Ngữ văn", "Lịch sử", "Địa lý"],
  "C03": ["Ngữ văn", "Toán", "Lịch sử"],
  "C04": ["Ngữ văn", "Toán", "Địa lý"],
  "D01": ["Toán", "Ngữ văn", "Tiếng Anh"],
  "D10": ["Toán", "Địa lý", "Tiếng Anh"],
  "D14": ["Ngữ văn", "Lịch sử", "Tiếng Anh"],
  "D15": ["Ngữ văn", "Địa lý", "Tiếng Anh"]
};

const MAJOR_COMBOS: Record<string, string[]> = {
  "A00": ["Luật / C.ngành Thanh tra", "Kinh tế"],
  "A01": ["Quản trị nhân lực", "Kinh tế"],
  "C00": ["Quản trị văn phòng", "Luật / C.ngành Thanh tra", "Quản lý nhà nước", "Quản trị dịch vụ du lịch và lữ hành"],
  "C03": ["Luật / C.ngành Thanh tra", "Quản lý nhà nước"],
  "C04": ["Quản trị nhân lực"],
  "D01": ["Quản trị nhân lực", "Quản trị văn phòng", "Luật / C.ngành Thanh tra", "Quản lý nhà nước", "Quản trị dịch vụ du lịch và lữ hành", "Kinh tế"],
  "D10": ["Quản trị nhân lực", "Kinh tế"],
  "D14": ["Quản trị văn phòng", "Quản trị dịch vụ du lịch và lữ hành"],
  "D15": ["Quản trị văn phòng", "Quản lý nhà nước", "Quản trị dịch vụ du lịch và lữ hành"]
};

const BENCHMARKS_2025: Record<string, number> = {
  "Quản trị nhân lực": 18.0,
  "Quản trị văn phòng": 16.0,
  "Luật / C.ngành Thanh tra": 21.0,
  "Quản lý nhà nước": 18.0,
  "Quản trị dịch vụ du lịch và lữ hành": 16.0,
  "Kinh tế": 16.0
};

// Điểm chênh tổ hợp
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

type Matrix = {
  [row: number]: { g10: string; g11: string; g12: string; quickAvg: string; [col: string]: string };
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

  // Load History
  useEffect(() => {
    const saved = localStorage.getItem("apag_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch(e) {}
    }
  }, []);

  // Sync Major when Combo changes
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
    let subjectAvgs = [0, 0, 0];
    let isMissingData = false;

    for (let r = 0; r < 3; r++) {
      const row = matrix[r];
      // Ưu tiên Quick Avg nếu có nhập
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
    let messages: string[] = [];

    if (rawTotal < 18.0) {
      status = "FAIL";
      messages.push("Tổng điểm 3 môn chưa đạt ngưỡng sàn 18.0 điểm theo quy chế APAG 2026.");
    }
    
    if (finalScore < currentBenchmark) {
       status = "FAIL";
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

    // Save history
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
        gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 50);
  };

  const clearHistory = () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử tra cứu?")) {
      setHistory([]);
      localStorage.removeItem("apag_history");
    }
  };

  const getSuggestedMajors = () => {
     let suggested: string[] = [];
     Object.keys(BENCHMARKS_2025).forEach(m => {
        if (result.finalScore >= BENCHMARKS_2025[m]) {
           suggested.push(m);
        }
     });
     return suggested;
  };

  return (
    <div className="w-full flex flex-col gap-10 lg:gap-14 animate-fade-in pb-24">
      
      {/* Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        
        {/* Block: Tổ hợp & Ngành */}
        <div className="flex flex-col gap-5 bg-white p-6 md:p-8 border-4 border-[#2c2b7c] shadow-[8px_8px_0px_0px_#2c2b7c] relative overflow-hidden group">
          <h3 className="font-heading font-black text-2xl uppercase tracking-tighter text-[#2c2b7c]">Thông tin đăng ký</h3>
          
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#2c2b7c] text-sm md:text-base">Mã Tổ Hợp Môn:</label>
            <select 
              value={combo} 
              onChange={e => setCombo(e.target.value)}
              className="w-full h-14 border-2 border-[#2c2b7c]/50 px-4 font-bold text-[#2c2b7c] bg-[#FAFAFA] focus:border-[#ed1c29] focus:outline-none transition-colors truncate rounded-none"
            >
              {Object.keys(COMBOS).map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-2 relative">
             <label className="font-bold text-[#2c2b7c] text-sm md:text-base flex items-center justify-between">
                Định Hướng Ngành Đào Tạo:
             </label>
             <select 
                value={major} 
                onChange={e => setMajor(e.target.value)}
                className="w-full h-14 border-2 border-[#2c2b7c]/50 px-4 font-bold text-[#2c2b7c] bg-[#FAFAFA] focus:border-[#ed1c29] focus:outline-none transition-colors truncate rounded-none"
              >
                {availableMajors.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
          </div>
        </div>

        {/* Block: Ưu tiên */}
        <div className="flex flex-col gap-5 bg-white p-6 md:p-8 border-4 border-[#2c2b7c] shadow-[8px_8px_0px_0px_#ed1c29] relative overflow-hidden group">
          <h3 className="font-heading font-black text-2xl uppercase tracking-tighter text-[#ed1c29]">Đối Tượng Xét Điểm Khuyến Khích</h3>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
               <div className="w-full sm:w-1/2 flex flex-col gap-2">
                  <label className="font-bold text-[#2c2b7c] text-sm">Khu Vực UT:</label>
                  <select 
                    value={area} 
                    onChange={e => setArea(e.target.value)}
                    className="w-full h-14 border-2 border-[#2c2b7c]/50 px-2 font-bold text-[#2c2b7c] bg-[#FAFAFA] focus:border-[#ed1c29] focus:outline-none transition-colors truncate rounded-none"
                  >
                    {Object.keys(AREAS).map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
               </div>
               <div className="w-full sm:w-1/2 flex flex-col gap-2">
                  <label className="font-bold text-[#2c2b7c] text-sm">Đối Tượng:</label>
                  <select 
                    value={targetObj} 
                    onChange={e => setTargetObj(e.target.value)}
                    className="w-full h-14 border-2 border-[#2c2b7c]/50 px-2 font-bold text-[#2c2b7c] bg-[#FAFAFA] focus:border-[#ed1c29] focus:outline-none transition-colors truncate rounded-none"
                  >
                    {Object.keys(OBJECTS).map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
               </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
             <label className="font-bold text-[#2c2b7c] text-sm">Chứng chỉ quy đổi / Học Sinh Giỏi (Nếu có):</label>
             <select 
                value={cert} 
                onChange={e => setCert(e.target.value)}
                className="w-full h-14 border-2 border-[#2c2b7c]/50 px-4 font-bold text-[#2c2b7c] bg-[#FAFAFA] focus:border-[#ed1c29] focus:outline-none transition-colors truncate text-sm rounded-none"
              >
                {Object.keys(CERTS).map(k => <option key={k} value={k}>{k}</option>)}
              </select>
          </div>
        </div>

      </div>

      {/* Grade Input Grid */}
      <div className="w-full bg-white border-4 border-black shadow-[12px_12px_0px_0px_#2c2b7c] overflow-hidden flex flex-col mt-4">
         {/* Table Header */}
         <div className="hidden md:grid grid-cols-5 bg-[#2c2b7c] text-white font-heading font-black text-[15px] uppercase tracking-wider w-full border-b-4 border-black">
           <div className="p-4 border-r-2 border-[rgba(255,255,255,0.2)] flex items-center">Tên Môn Học</div>
           <div className="p-4 border-r border-[rgba(255,255,255,0.1)] text-center flex flex-col items-center justify-center">LỚP 10</div>
           <div className="p-4 border-r border-[rgba(255,255,255,0.1)] text-center flex flex-col items-center justify-center">LỚP 11</div>
           <div className="p-4 border-r-2 border-[rgba(255,255,255,0.2)] text-center flex flex-col items-center justify-center">LỚP 12</div>
           <div className="p-4 text-center text-[#ffdd57] flex flex-col items-center justify-center">NHẬP NHANH ĐIỂM <span className="font-sans font-normal text-xs normal-case opacity-90 text-white mt-1">(Tùy chọn nhập TRUNG BÌNH)</span></div>
         </div>
         <div className="md:hidden bg-[#2c2b7c] text-white p-4 font-heading font-black text-lg text-center uppercase tracking-tighter">
           Học Bạ: Tổ hợp {combo} - Ngành {major}
         </div>

         {/* Table Body */}
         <div className="flex flex-col bg-white">
           {subjects.map((sub, rIndex) => (
             <div key={rIndex} className={`w-full flex flex-col md:grid md:grid-cols-5 border-b-2 border-gray-200 py-6 md:py-0 transition-colors hover:bg-gray-50/50`}>
                
                {/* Mobile Title */}
                <div className="md:hidden font-heading font-black text-xl text-[#2c2b7c] text-center mb-4 uppercase">
                  MÔN {sub}
                </div>
                
                {/* Desktop Title */}
                <div className="hidden md:flex items-center justify-start p-6 border-r-2 border-gray-200 font-heading font-black text-xl lg:text-2xl uppercase tracking-tighter text-[#2c2b7c]">
                   {sub}
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-2 md:contents gap-4 px-4 md:px-0">
                  <div className="md:border-r border-gray-200 p-2 md:p-6 flex flex-col items-center justify-center">
                    <span className="md:hidden text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">LỚP 10</span>
                    <input 
                      type="number" max="10" min="0" step="0.1"
                      placeholder="8.5"
                      value={matrix[rIndex].g10}
                      onChange={(e) => updateMatrix(rIndex, 'g10', e.target.value)}
                      className="w-full max-w-[90px] h-12 text-center text-xl font-bold font-mono border-2 border-black rounded-none bg-[#FAFAFA] focus:border-[#ed1c29] focus:outline-none transition-all shadow-[2px_2px_0px_0px_black]"
                    />
                  </div>
                  <div className="md:border-r border-gray-200 p-2 md:p-6 flex flex-col items-center justify-center">
                    <span className="md:hidden text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">LỚP 11</span>
                    <input 
                      type="number" max="10" min="0" step="0.1"
                      placeholder="8.5"
                      value={matrix[rIndex].g11}
                      onChange={(e) => updateMatrix(rIndex, 'g11', e.target.value)}
                      className="w-full max-w-[90px] h-12 text-center text-xl font-bold font-mono border-2 border-black rounded-none bg-[#FAFAFA] focus:border-[#ed1c29] focus:outline-none transition-all shadow-[2px_2px_0px_0px_black]"
                    />
                  </div>
                  <div className="md:border-r-2 border-gray-200 p-2 md:p-6 flex flex-col items-center justify-center">
                    <span className="md:hidden text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">LỚP 12</span>
                    <input 
                      type="number" max="10" min="0" step="0.1"
                      placeholder="8.5"
                      value={matrix[rIndex].g12}
                      onChange={(e) => updateMatrix(rIndex, 'g12', e.target.value)}
                      className="w-full max-w-[90px] h-12 text-center text-xl font-bold font-mono border-2 border-black rounded-none bg-[#FAFAFA] focus:border-[#ed1c29] focus:outline-none transition-all shadow-[2px_2px_0px_0px_black]"
                    />
                  </div>
                  <div className="p-2 md:p-6 flex flex-col items-center justify-center bg-[#fff8e1]">
                    <span className="md:hidden text-[10px] font-bold text-[#ed1c29] mb-2 uppercase tracking-wider">TB (NHẬP NHANH)</span>
                    <input 
                      type="number" max="10" min="0" step="0.1"
                      placeholder="TB"
                      value={matrix[rIndex].quickAvg}
                      onChange={(e) => updateMatrix(rIndex, 'quickAvg', e.target.value)}
                      className="w-full max-w-[90px] h-12 text-center text-xl font-bold font-mono border-2 border-[#ed1c29] text-[#ed1c29] rounded-none bg-white focus:outline-none transition-all shadow-[2px_2px_0px_0px_#ed1c29]"
                    />
                  </div>
                </div>

             </div>
           ))}
         </div>
      </div>

      {/* Action CTA */}
      <div className="flex justify-center mt-6">
         <button 
           onClick={calculateScore}
           className="group flex flex-col items-center justify-center p-6 bg-[#2c2b7c] hover:bg-[#ed1c29] border-4 border-black text-white rounded-none shadow-[8px_8px_0px_0px_black] active:shadow-none active:translate-x-[8px] active:translate-y-[8px] transition-all duration-100 min-w-[300px]"
         >
            <span className="font-heading font-black text-xl uppercase tracking-wider">Phân tích Kết quả Xét tuyển</span>
            <span className="text-xs opacity-70 mt-1 uppercase tracking-widest font-semibold flex items-center gap-1 group-hover:opacity-100 group-hover:tracking-[0.2em] transition-all"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> Kích hoạt AI Đánh giá</span>
         </button>
      </div>

      {/* Result Dynamic Block */}
      {result.status !== "IDLE" && (
        <div id="result-block" className="relative w-full mt-10 p-6 md:p-10 bg-white border-4 border-black shadow-[12px_12px_0px_0px_#ed1c29] overflow-hidden">
           
           <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
               <div>
                   <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tighter text-[#2c2b7c]">
                      BÁO CÁO ĐÁNH GIÁ KHẢ NĂNG TRÚNG TUYỂN
                   </h2>
                   <p className="text-xs uppercase font-bold text-gray-500 mt-1 tracking-widest">HỆ THỐNG TUYỂN SINH APAG ĐÀ NẴNG 2026</p>
               </div>
               <div className="hidden md:block w-16 h-8 relative opacity-50"><img src="/logos/Logo3.png" className="w-full h-full object-contain" /></div>
           </div>

           <div className="flex flex-col gap-8 w-full">

              {/* Status Banner */}
              {result.status === "PASS" ? (
                 <div className="w-full py-4 px-6 border-4 border-emerald-500 bg-emerald-50 flex flex-col items-center text-center shadow-[4px_4px_0px_0px_#10b981]">
                    <span className="font-heading font-black text-emerald-600 uppercase tracking-widest text-lg md:text-xl flex items-center gap-2">
                       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                       ĐỦ ĐIỀU KIỆN - CƠ HỘI TRÚNG TUYỂN RẤT CAO!
                    </span>
                    <span className="text-sm font-semibold text-emerald-700/80 mt-1">Xin chúc mừng! Điểm của bạn đã vượt điểm chuẩn theo ngành tham khảo năm 2025. Vui lòng nộp hồ sơ ngay.</span>
                 </div>
              ) : (
                 <div className="w-full py-4 px-6 border-4 border-[#ed1c29] bg-red-50 flex flex-col items-center text-center shadow-[4px_4px_0px_0px_#ed1c29]">
                    <span className="font-heading font-black text-[#ed1c29] uppercase tracking-widest text-lg md:text-xl flex items-center gap-2">
                       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                       CẢNH BÁO TỪ HỆ THỐNG!
                    </span>
                    <span className="text-sm font-semibold text-red-700 mt-1">
                        {result.messages.map((m, i) => <span key={i} className="block">{m}</span>)}
                    </span>
                 </div>
              )}

              {/* Data Review Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400">TỔ HỢP XÉT TUYỂN</span>
                    <span className="font-bold text-gray-800 text-sm">{combo} ({subjects.join(", ")})</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400">NGÀNH DỰ TUYỂN</span>
                    <span className="font-bold text-[#2c2b7c] text-sm">{major}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400">TỔNG 3 MÔN THÔ</span>
                    <span className="font-mono font-black text-[#2c2b7c] text-lg">{result.rawTotal.toFixed(2)}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400">TỔNG ĐIỂM ƯU TIÊN UT</span>
                    <span className="font-mono font-black text-[#ed1c29] text-lg">+{result.priorityTotal.toFixed(2)}</span>
                 </div>
              </div>

              {/* Gigantic Score Board */}
              <div className="w-full flex flex-col border-4 border-black mt-6 shadow-[8px_8px_0px_0px_black] overflow-hidden">
                 <div className="flex w-full divide-x-4 divide-black">
                    <div className="w-2/3 flex flex-col items-center justify-center p-8 bg-gray-50/50">
                       <span className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-widest">Tổng Điểm Xét Tuyển</span>
                       <span className={`font-heading font-black text-6xl md:text-8xl tracking-tighter leading-none ${result.status === "PASS" ? "text-[#ed1c29]" : "text-gray-500"}`}>{result.finalScore.toFixed(2)}</span>
                    </div>
                    <div className="w-1/3 flex flex-col items-center justify-center p-8 bg-[#ffdd57]">
                       <span className="text-[10px] md:text-xs font-bold text-[#2c2b7c] mb-2 uppercase tracking-widest text-center">ĐIỂM CHUẨN (2025)</span>
                       <span className="font-heading font-black text-3xl md:text-5xl tracking-tighter leading-none text-[#2c2b7c]">{result.benchmark.toFixed(2)}</span>
                    </div>
                 </div>
                 
                 {/* Visual Scale bar */}
                 <div className="w-full px-8 md:px-12 py-8 bg-white border-t-4 border-black flex flex-col">
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
                       <span>0 Điểm</span>
                       <span>Mốc 30 Điểm</span>
                    </div>
                    <div className="relative w-full h-8 border-2 border-black bg-gray-100 overflow-hidden shadow-inner">
                       {/* The benchmark target line */}
                       <div className="absolute top-0 bottom-0 border-l-4 border-[#2c2b7c] z-20" style={{ left: `${(result.benchmark / 30) * 100}%` }}></div>
                       
                       {/* The progress */}
                       <div className={`absolute top-0 left-0 h-full z-10 transition-all duration-1000 ease-out border-r-2 border-black ${result.finalScore >= result.benchmark ? "bg-[#ed1c29]" : "bg-gray-400"}`} style={{ width: `${Math.min((result.finalScore / 30) * 100, 100)}%` }}></div>
                    </div>
                    <div className="relative w-full h-6 mt-1 text-[10px] font-bold">
                       <div className="absolute text-[#2c2b7c] flex flex-col items-center -ml-4" style={{ left: `${(result.benchmark / 30) * 100}%` }}>
                          <span className="-mt-1 font-black">↑</span>
                          <span>Chuẩn: {result.benchmark}</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Suggestions */}
              <div className="mt-4 flex flex-col gap-4">
                 <h4 className="font-heading font-black text-emerald-600 flex items-center gap-2 uppercase tracking-wide text-lg"><svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> Gợi ý ngành phù hợp với mức điểm của bạn</h4>
                 <div className="flex flex-wrap gap-3">
                    {getSuggestedMajors().length > 0 ? getSuggestedMajors().map(s => (
                       <div key={s} className="px-3 py-1.5 border-2 border-black font-bold text-[#2c2b7c] bg-[#ffdd57] uppercase shadow-[2px_2px_0px_0px_black]">
                          {s} <span className="text-black/60 ml-1 text-xs">(Chuẩn: {BENCHMARKS_2025[s]})</span>
                       </div>
                    )) : (
                       <span className="text-xs text-red-500 font-semibold italic">Không có ngành nào đáp ứng điểm chuẩn năm ngoái. Hãy chuyển ngành ưu tiên.</span>
                    )}
                 </div>
              </div>

              {/* Final Warning Note */}
              <div className="bg-[#fffdf0] border-4 border-[#ffdd57] p-6 mt-4 flex gap-4 shadow-[4px_4px_0px_0px_#ffdd57]">
                 <div className="w-12 h-12 bg-[#ed1c29] border-2 border-black rounded-none flex items-center justify-center shrink-0">
                    <span className="text-white font-black text-2xl">!</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <h5 className="font-heading font-black text-amber-600 uppercase tracking-widest text-lg">LƯU Ý CỰC KỲ QUAN TRỌNG</h5>
                    <p className="text-sm font-semibold text-gray-700">Điểm hiển thị ở đây <span className="text-[#ed1c29] font-black underline">CHƯA PHẢI</span> là điểm phân bổ trúng tuyển cuối cùng. Hệ thống công bố chính thức do Bộ Giáo Dục cung cấp sẽ thay đổi vào Tháng 7 tới đây!</p>
                 </div>
              </div>

              <div className="flex justify-center mt-6">
                 <a href="/#admissions" className="group border-4 border-black bg-[#2c2b7c] hover:bg-[#ed1c29] px-8 py-4 flex items-center gap-2 text-white font-black text-sm md:text-base transition-colors shadow-[8px_8px_0px_0px_black] uppercase tracking-wider active:translate-y-2 active:translate-x-2 active:shadow-none">
                    GỬI HỒ SƠ & ĐĂNG KÝ TƯ VẤN NGAY
                 </a>
              </div>
           </div>
        </div>
      )}

      {/* SEARCH HISTORY LOCAL STORAGE */}
      {history.length > 0 && (
         <div className="w-full mt-12 bg-white border-4 border-black shadow-[8px_8px_0px_0px_black] p-6 md:p-8 animate-fade-in relative">
            <div className="w-full h-2 bg-[#ffdd57] absolute top-0 left-0 border-b-4 border-black"></div>
            <div className="flex justify-between items-center mb-6 mt-4">
               <h3 className="font-heading font-black text-2xl text-[#2c2b7c] uppercase tracking-tighter flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#ed1c29]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Lịch sử tra cứu
               </h3>
               <button onClick={clearHistory} className="text-xs font-black text-gray-600 hover:text-white hover:bg-[#ed1c29] border-2 border-black px-3 py-1.5 flex items-center gap-1 transition-colors uppercase">
                 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                 Dọn dẹp
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {history.map(item => (
                  <div key={item.id} className="border-4 border-black bg-[#f4f4f4] p-5 flex flex-col cursor-pointer hover:bg-[#ffdd57] transition-colors shadow-[4px_4px_0px_0px_black]">
                     <span className="text-[10px] font-black text-gray-500 mb-2">{item.time}</span>
                     <span className="font-heading font-black text-[#2c2b7c] text-lg break-words uppercase leading-tight">{item.major}</span>
                     {item.status === "PASS" ? (
                        <span className="mt-2 self-start bg-emerald-400 border border-black text-black text-[10px] font-black uppercase px-2 py-0.5">ĐỦ DỰ KIẾN</span>
                     ) : (
                        <span className="mt-2 self-start bg-[#ed1c29] border border-black text-white text-[10px] font-black uppercase px-2 py-0.5">THÁCH THỨC</span>
                     )}
                     
                     <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] font-bold text-gray-500 bg-white p-2 border-2 border-black">
                        <div className="flex flex-col"><span className="opacity-60 text-black">TỔ HỢP</span> <span className="text-black font-black">{item.combo}</span></div>
                        <div className="flex flex-col"><span className="opacity-60 text-black">THÔ 3 MÔN</span> <span className="text-black font-black">{item.rawTotal.toFixed(2)}</span></div>
                     </div>

                     <div className="flex justify-between items-end mt-4 pt-4 border-t-2 border-black">
                        <div className="flex flex-col">
                           <span className="text-[9px] font-black text-gray-500 uppercase">Quy chuẩn</span>
                           <span className="font-black text-gray-800 text-sm">{item.benchmark.toFixed(2)}</span>
                        </div>
                        <div className="flex flex-col items-end">
                           <span className="text-[10px] font-bold text-[#ed1c29] uppercase">TỔNG XÉT</span>
                           <span className="font-heading font-black text-[#ed1c29] text-2xl leading-none">{item.finalScore.toFixed(2)}</span>
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
