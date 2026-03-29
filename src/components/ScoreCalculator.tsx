"use client";

import React, { useState, useEffect } from "react";
import gsap from "gsap";

const COMBOS: Record<string, string[]> = {
  "A00": ["Toán", "Vật lý", "Hóa học"],
  "A01": ["Toán", "Vật lý", "Tiếng Anh"],
  "C00": ["Ngữ văn", "Lịch sử", "Địa lý"],
  "D01": ["Toán", "Ngữ văn", "Tiếng Anh"],
  "C14": ["Toán", "Ngữ văn", "GDCD"],
  "C19": ["Ngữ văn", "Lịch sử", "GDCD"]
};

const AREAS: Record<string, number> = {
  "KV3 (0 điểm)": 0,
  "KV2 (0.25 điểm)": 0.25,
  "KV2-NT (0.5 điểm)": 0.5,
  "KV1 (0.75 điểm)": 0.75
};

const OBJECTS: Record<string, number> = {
  "Không có (0 điểm)": 0,
  "Đối tượng 1 (2.0 điểm)": 2.0,
  "Đối tượng 2 (1.0 điểm)": 1.0
};

const MAJORS = [
  "Tất cả các ngành (Trừ Luật)",
  "Chuyên ngành Luật"
];

// Grade Structure
type Matrix = {
  [row: number]: { [col: string]: string };
};

export default function ScoreCalculator() {
  const [combo, setCombo] = useState("D01");
  const [major, setMajor] = useState(MAJORS[0]);
  const [area, setArea] = useState("KV3 (0 điểm)");
  const [targetObj, setTargetObj] = useState("Không có (0 điểm)");
  
  const [matrix, setMatrix] = useState<Matrix>({
    0: { g10: "", g11: "", g12: "" },
    1: { g10: "", g11: "", g12: "" },
    2: { g10: "", g11: "", g12: "" }
  });

  const [result, setResult] = useState<{
    subjectAvgs: number[];
    rawTotal: number;
    priorityTotal: number;
    finalScore: number;
    status: "PASS" | "FAIL" | "IDLE";
    messages: string[];
  }>({
    subjectAvgs: [0, 0, 0],
    rawTotal: 0, priorityTotal: 0, finalScore: 0, status: "IDLE", messages: []
  });

  const subjects = COMBOS[combo];

  const updateMatrix = (row: number, field: string, value: string) => {
    // Chỉ cho phép nhập số thập phân
    if (value && !/^\d*\.?\d*$/.test(value)) return;
    
    // Giới hạn max 10
    if (parseFloat(value) > 10) value = "10";

    setMatrix(prev => ({
      ...prev,
      [row]: { ...prev[row], [field]: value }
    }));
  };

  const calculateScore = () => {
    let subjectAvgs = [0, 0, 0];
    let isMissingData = false;
    let mathOrLitGrade = 0; // Điểm Toán/Văn trong tổ hợp

    for (let r = 0; r < 3; r++) {
      const row = matrix[r];
      const g10 = parseFloat(row.g10);
      const g11 = parseFloat(row.g11);
      const g12 = parseFloat(row.g12);
      
      if (isNaN(g10) || isNaN(g11) || isNaN(g12)) {
        isMissingData = true;
      } else {
        const avg = (g10 + g11 + g12) / 3;
        subjectAvgs[r] = Number(avg.toFixed(2));
        
        // Theo dõi điểm Toán/Văn nếu ngành Luật yêu cầu
        if (subjects[r] === "Toán" || subjects[r] === "Ngữ văn") {
          mathOrLitGrade = Math.max(mathOrLitGrade, subjectAvgs[r]);
        }
      }
    }

    if (isMissingData) {
      alert("Vui lòng nhập đầy đủ các điểm rèn luyện!");
      return;
    }

    const rawTotal = subjectAvgs.reduce((a, b) => a + b, 0);
    const basePriority = AREAS[area] + OBJECTS[targetObj];
    
    // Giảm dần điểm ưu tiên nếu tổng điểm > 22.5
    let finalPriority = basePriority;
    if (rawTotal > 22.5) {
      finalPriority = basePriority * ((30 - rawTotal) / 7.5);
      finalPriority = Math.max(0, finalPriority); // Không âm
    }

    const finalScore = Number((rawTotal + finalPriority).toFixed(2));
    
    // Rule Logic
    let status: "PASS" | "FAIL" = "PASS";
    let messages: string[] = [];

    // Rule 1: Ngưỡng 18.0
    if (rawTotal < 18.0) {
      status = "FAIL";
      messages.push("Cảnh báo: Tổng điểm 3 môn chưa đạt ngưỡng sàn 18.0 theo quy chế APAG 2026.");
    }

    // Rule 2: Chuyên ngành Luật
    if (major === "Chuyên ngành Luật") {
      if (mathOrLitGrade < 6.0) {
        status = "FAIL";
        messages.push("Cảnh báo Luật: Bạn phải đạt từ 6.0 trở lên ở môn Toán hoặc Ngữ văn.");
      }
    }

    if (status === "PASS") {
      messages.push("ĐỦ ĐIỀU KIỆN ỨNG TUYỂN! Chúc mừng bạn đã thỏa mãn điều kiện cốt lõi.");
    }

    setResult({
      subjectAvgs,
      rawTotal: Number(rawTotal.toFixed(2)),
      priorityTotal: Number(finalPriority.toFixed(2)),
      finalScore,
      status,
      messages
    });

    // Animate Result Block
    setTimeout(() => {
      const el = document.getElementById("result-block");
      if (el) {
        gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 50);
  };

  return (
    <div className="w-full flex flex-col gap-10 lg:gap-14 animate-fade-in pb-24">
      
      {/* Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        
        {/* Block: Tổ hợp & Ngành */}
        <div className="flex flex-col gap-5 bg-white p-6 md:p-8 border-4 border-[#2c2b7c] shadow-[8px_8px_0px_0px_#2c2b7c]">
          <h3 className="font-heading font-black text-2xl uppercase tracking-tighter text-[#ed1c29]">Cấu hình khối xét tuyển</h3>
          
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#2c2b7c] text-sm md:text-base">Mã Tổ Hợp Môn:</label>
            <select 
              value={combo} 
              onChange={e => setCombo(e.target.value)}
              className="w-full h-14 border-2 border-[#2c2b7c]/50 px-4 font-bold text-[#2c2b7c] bg-[#FAFAFA] focus:border-[#ed1c29] focus:outline-none transition-colors"
            >
              {Object.keys(COMBOS).map(k => <option key={k} value={k}>{k} ({COMBOS[k].join(", ")})</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-2 relative">
             <label className="font-bold text-[#2c2b7c] text-sm md:text-base">Định Hướng Ngành Đào Tạo:</label>
             <select 
                value={major} 
                onChange={e => setMajor(e.target.value)}
                className="w-full h-14 border-2 border-[#2c2b7c]/50 px-4 font-bold text-[#2c2b7c] bg-[#FAFAFA] focus:border-[#ed1c29] focus:outline-none transition-colors"
              >
                {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
          </div>
        </div>

        {/* Block: Ưu tiên */}
        <div className="flex flex-col gap-5 bg-white p-6 md:p-8 border-4 border-[#2c2b7c] shadow-[8px_8px_0px_0px_#ed1c29]">
          <h3 className="font-heading font-black text-2xl uppercase tracking-tighter text-[#2c2b7c]">Quyền Lợi Ưu Tiên</h3>
          <p className="text-xs text-[#555] font-semibold -mt-3">APAG áp dụng công thức triệt tiêu điểm UT tịnh tiến nếu tổng điểm trên 22.5.</p>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#2c2b7c] text-sm md:text-base">Khu Vực Ưu Tiên:</label>
            <select 
              value={area} 
              onChange={e => setArea(e.target.value)}
              className="w-full h-14 border-2 border-[#2c2b7c]/50 px-4 font-bold text-[#2c2b7c] bg-[#FAFAFA] focus:border-[#ed1c29] focus:outline-none transition-colors"
            >
              {Object.keys(AREAS).map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-2">
             <label className="font-bold text-[#2c2b7c] text-sm md:text-base">Đối Tượng Khuyến Khích:</label>
             <select 
                value={targetObj} 
                onChange={e => setTargetObj(e.target.value)}
                className="w-full h-14 border-2 border-[#2c2b7c]/50 px-4 font-bold text-[#2c2b7c] bg-[#FAFAFA] focus:border-[#ed1c29] focus:outline-none transition-colors"
              >
                {Object.keys(OBJECTS).map(k => <option key={k} value={k}>{k}</option>)}
              </select>
          </div>
        </div>

      </div>

      {/* Grade Input Grid */}
      <div className="w-full bg-white border-4 border-[black] shadow-[12px_12px_0px_0px_#2c2b7c] overflow-hidden flex flex-col">
         {/* Table Header */}
         <div className="hidden md:grid grid-cols-4 bg-[#2c2b7c] text-white font-heading font-black text-xl uppercase tracking-tighter w-full border-b-4 border-black">
           <div className="p-5 border-r border-[rgba(255,255,255,0.2)]">Tên Môn Học</div>
           <div className="p-5 border-r border-[rgba(255,255,255,0.2)] text-center">Điểm Học Kỳ 1 & 2<br className="hidden lg:block"/><span className="text-sm opacity-60 ml-2">LỚP 10</span></div>
           <div className="p-5 border-r border-[rgba(255,255,255,0.2)] text-center">Điểm Học Kỳ 1 & 2<br className="hidden lg:block"/><span className="text-sm opacity-60 ml-2">LỚP 11</span></div>
           <div className="p-5 text-center">Điểm Học Kỳ 1 & 2<br className="hidden lg:block"/><span className="text-sm opacity-60 ml-2">LỚP 12</span></div>
         </div>
         <div className="md:hidden bg-[#2c2b7c] text-white p-5 font-heading font-black text-xl text-center uppercase border-b-4 border-black">
           Bảng Nhập Liệu Học Bạ Khối {combo}
         </div>

         {/* Table Body */}
         <div className="flex flex-col bg-white">
           {subjects.map((sub, rIndex) => (
             <div key={rIndex} className={`w-full flex flex-col md:grid md:grid-cols-4 border-b-4 border-black/10 last:border-b-0 py-6 md:py-0`}>
                
                {/* Mobile Title */}
                <div className="md:hidden font-heading font-black text-2xl text-[#ed1c29] text-center mb-4 uppercase">
                  MÔN {sub}
                </div>
                
                {/* Desktop Title */}
                <div className="hidden md:flex items-center justify-start p-6 border-r border-black/10 font-heading font-black text-2xl lg:text-3xl uppercase tracking-tighter text-[#ed1c29]">
                   {sub}
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-3 md:contents gap-2 px-4 md:px-0">
                  <div className="md:border-r border-black/10 p-2 md:p-6 flex flex-col md:justify-center items-center">
                    <span className="md:hidden text-xs font-bold text-[#555] mb-2">LỚP 10</span>
                    <input 
                      type="number" max="10" min="0" step="0.1"
                      placeholder="8.5"
                      value={matrix[rIndex].g10}
                      onChange={(e) => updateMatrix(rIndex, 'g10', e.target.value)}
                      className="w-full max-w-[120px] h-14 md:h-16 text-center text-xl md:text-3xl font-black font-mono border-4 border-[#2c2b7c] bg-[#FAFAFA] focus:border-[#ed1c29] focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                  <div className="md:border-r border-black/10 p-2 md:p-6 flex flex-col md:justify-center items-center">
                    <span className="md:hidden text-xs font-bold text-[#555] mb-2">LỚP 11</span>
                    <input 
                      type="number" max="10" min="0" step="0.1"
                      placeholder="8.5"
                      value={matrix[rIndex].g11}
                      onChange={(e) => updateMatrix(rIndex, 'g11', e.target.value)}
                      className="w-full max-w-[120px] h-14 md:h-16 text-center text-xl md:text-3xl font-black font-mono border-4 border-[#2c2b7c] bg-[#FAFAFA] focus:border-[#ed1c29] focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                  <div className="p-2 md:p-6 flex flex-col md:justify-center items-center">
                    <span className="md:hidden text-xs font-bold text-[#555] mb-2">LỚP 12</span>
                    <input 
                      type="number" max="10" min="0" step="0.1"
                      placeholder="8.5"
                      value={matrix[rIndex].g12}
                      onChange={(e) => updateMatrix(rIndex, 'g12', e.target.value)}
                      className="w-full max-w-[120px] h-14 md:h-16 text-center text-xl md:text-3xl font-black font-mono border-4 border-[#2c2b7c] bg-[#FAFAFA] focus:border-[#ed1c29] focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

             </div>
           ))}
         </div>
      </div>

      {/* Action CTA */}
      <div className="flex justify-center mt-2">
         <button 
           onClick={calculateScore}
           className="group relative inline-flex items-center justify-center px-12 py-5 lg:py-6 bg-[#ed1c29] text-white font-heading font-black text-2xl md:text-3xl uppercase tracking-tighter border-4 border-[#2c2b7c] shadow-[10px_10px_0px_0px_#2c2b7c] hover:shadow-[14px_14px_0px_0px_#2c2b7c] hover:-translate-y-1 hover:-translate-x-1 transition-all overflow-hidden"
         >
            <span className="relative z-10 w-full text-center">PHÂN TÍCH KẾT QUẢ</span>
            <div className="absolute top-0 right-full w-full h-full bg-[#2c2b7c] group-hover:translate-x-full transition-transform duration-500 ease-in-out z-0"></div>
            <div className="absolute top-0 right-full w-full h-full bg-[black] group-hover:translate-x-full transition-transform duration-700 ease-in-out z-0 delay-[50ms]"></div>
            <span className="relative z-10 hidden md:block text-2xl ml-4 opacity-70 group-hover:text-white transition-colors duration-500 delay-100">→</span>
         </button>
      </div>

      {/* Result Dynamic Block */}
      {result.status !== "IDLE" && (
        <div id="result-block" className={`relative w-full mt-10 p-8 md:p-12 border-4 overflow-hidden ${result.status === "PASS" ? "border-[#2c2b7c] shadow-[12px_12px_0px_0px_#2c2b7c]" : "border-[#ed1c29] shadow-[12px_12px_0px_0px_#ed1c29]"}`}>
           
           {/* Background Overlay based on status */}
           <div className={`absolute inset-0 bg-white z-0`}></div>
           
           <div className="relative z-10 flex flex-col gap-6 w-full">
              <h2 className={`font-heading font-black text-3xl md:text-5xl uppercase tracking-tighter ${result.status === "PASS" ? "text-[#2c2b7c]" : "text-[#ed1c29]"}`}>
                Báo cáo Năng lực Xét tuyển
              </h2>

              {/* Status Banner */}
              <div className={`w-full py-4 px-6 md:text-xl font-bold text-white uppercase tracking-widest ${result.status === "PASS" ? "bg-[#2c2b7c]" : "bg-[#ed1c29]"}`}>
                TRẠNG THÁI: {result.status === "PASS" ? "🔴 ĐỦ ĐIỀU KIỆN" : "⚠️ KHÔNG ĐỦ ĐIỀU KIỆN"}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono font-black text-black">
                
                {/* Math breakdown */}
                <div className="flex flex-col bg-gray-100 p-5 border-l-4 border-[#2c2b7c]">
                   <span className="text-sm font-sans font-bold text-gray-500 mb-2 uppercase">Trung bình Môn 1 ({subjects[0]})</span>
                   <span className="text-4xl text-[#2c2b7c]">{result.subjectAvgs[0] || '0.00'}</span>
                </div>
                <div className="flex flex-col bg-gray-100 p-5 border-l-4 border-[#2c2b7c]">
                   <span className="text-sm font-sans font-bold text-gray-500 mb-2 uppercase">Trung bình Môn 2 ({subjects[1]})</span>
                   <span className="text-4xl text-[#2c2b7c]">{result.subjectAvgs[1] || '0.00'}</span>
                </div>
                <div className="flex flex-col bg-gray-100 p-5 border-l-4 border-[#2c2b7c]">
                   <span className="text-sm font-sans font-bold text-gray-500 mb-2 uppercase">Trung bình Môn 3 ({subjects[2]})</span>
                   <span className="text-4xl text-[#2c2b7c]">{result.subjectAvgs[2] || '0.00'}</span>
                </div>

              </div>

              {/* Advanced Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4 border-t-2 border-dashed border-gray-300 pt-8">
                 
                 <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-end border-b-2 border-gray-200 pb-2">
                       <span className="font-bold text-xl uppercase text-gray-600">Tổng điểm gốc:</span>
                       <span className="font-mono text-3xl font-black">{result.rawTotal}</span>
                    </div>
                    <div className="flex justify-between items-end border-b-2 border-gray-200 pb-2">
                       <span className="font-bold text-xl uppercase text-gray-600">Điểm ưu tiên quy đổi:</span>
                       <span className="font-mono text-3xl font-black text-[#ed1c29]">+{result.priorityTotal}</span>
                    </div>
                 </div>

                 <div className="flex justify-center lg:justify-end items-center">
                    <div className="flex flex-col items-center lg:items-end">
                       <span className="font-bold text-gray-500 text-sm mb-1 uppercase tracking-widest">TỔNG XÉT TUYỂN CUỐI CÙNG</span>
                       <span className={`font-mono text-7xl md:text-[100px] leading-none tracking-tighter font-black ${result.status === "PASS" ? "text-[#2c2b7c]" : "text-[#ed1c29]"}`}>{result.finalScore}</span>
                    </div>
                 </div>

              </div>

              {/* Messages Details */}
              <div className="w-full flex flex-col gap-2 mt-4">
                 {result.messages.map((msg, idx) => (
                    <div key={idx} className="flex gap-4 items-center bg-gray-100 p-4 border-l-4 border-[#ed1c29]">
                       <span className="w-2 h-2 rounded-full bg-[#ed1c29]"></span>
                       <p className="font-bold text-gray-700">{msg}</p>
                    </div>
                 ))}
                 <p className="text-sm font-semibold text-gray-500 mt-2 italic">Lưu ý: Bảng đánh giá này dựa trên Khung điều kiện đảm bảo chất lượng của Đề án Tuyển sinh 2026. Điểm chuẩn chính thức sẽ do Hội đồng thi quyết định khi công bố.</p>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
