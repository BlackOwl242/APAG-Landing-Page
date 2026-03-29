"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Program {
  id: string;
  code: string;
  title: string;
  quota: number;
  isSpecialization?: boolean;
  parentMajor?: string;
  combinations: string[];
}

interface Campus {
  label: string;
  name: string;
  totalQuota: number;
  programs: Program[];
}

const campuses: Campus[] = [
  {
    label: "A",
    name: "TRỤ SỞ CHÍNH — HÀ NỘI",
    totalQuota: 2640,
    programs: [
      { id: "1", code: "73444HN", title: "Quản trị nhân lực", quota: 310, combinations: ["A01", "C01", "C04", "D01"] },
      { id: "2", code: "73446HN", title: "Quản trị văn phòng", quota: 310, combinations: ["A01", "A07", "D01", "D14"] },
      { id: "3", code: "73811HN", title: "Luật", quota: 240, combinations: ["A00", "A01", "C04", "D01"] },
      { id: "4", code: "73811-1HN", title: "Chuyên ngành Thanh tra thuộc ngành Luật", quota: 70, isSpecialization: true, parentMajor: "Luật", combinations: ["A00", "A01", "C04", "D01"] },
      { id: "5", code: "73111HN", title: "Kinh tế", quota: 170, combinations: ["A01", "C01", "D01", "D10"] },
      { id: "6", code: "73111-1HN", title: "Chuyên ngành Kinh tế du lịch thuộc ngành Kinh tế", quota: 50, isSpecialization: true, parentMajor: "Kinh tế", combinations: ["A01", "C01", "D01", "D10"] },
      { id: "7", code: "73125-EHN", title: "Quản lý nhà nước (Chương trình đào tạo 50% bằng tiếng Anh)", quota: 40, combinations: ["D01", "D14", "D15"] },
      { id: "8", code: "73125HN", title: "Quản lý nhà nước", quota: 250, combinations: ["C04", "D01", "D14", "D15"] },
      { id: "9", code: "73125-1HN", title: "Chuyên ngành Quản trị tổ chức", quota: 40, isSpecialization: true, parentMajor: "Quản lý nhà nước", combinations: ["C04", "D01", "D14", "D15"] },
      { id: "10", code: "73125-2HN", title: "Chuyên ngành Quản trị địa phương", quota: 40, isSpecialization: true, parentMajor: "Quản lý nhà nước", combinations: ["C04", "D01", "D14", "D15"] },
      { id: "11", code: "73121HN", title: "Chính trị học", quota: 150, combinations: ["C00", "C03", "C04", "D01"] },
      { id: "12", code: "73122HN", title: "Xây dựng Đảng và chính quyền nhà nước", quota: 150, combinations: ["C00", "C03", "D01", "D14"] },
      { id: "13", code: "73233HN", title: "Lưu trữ học", quota: 85, combinations: ["C00", "C03", "D01", "D14"] },
      { id: "14", code: "73233-1HN", title: "Chuyên ngành Văn thư – Lưu trữ thuộc ngành Lưu trữ học", quota: 70, isSpecialization: true, parentMajor: "Lưu trữ học", combinations: ["C00", "C03", "D01", "D14"] },
      { id: "15", code: "73221HN", title: "Thông tin – Thư viện", quota: 75, combinations: ["C00", "D01", "D14", "D15"] },
      { id: "16", code: "78113HN", title: "Quản trị dịch vụ du lịch và lữ hành", quota: 140, combinations: ["C01", "D01", "D10", "D15"] },
      { id: "17", code: "72942HN", title: "Quản lý văn hóa", quota: 70, combinations: ["C04", "D01", "D14", "D15"] },
      { id: "18", code: "72942-1HN", title: "Chuyên ngành Quản lý di sản văn hóa và phát triển du lịch thuộc ngành Quản lý văn hóa", quota: 40, isSpecialization: true, parentMajor: "Quản lý văn hóa", combinations: ["C04", "D01", "D14", "D15"] },
      { id: "19", code: "72940-1HN", title: "Chuyên ngành Văn hóa Du lịch thuộc ngành Văn hóa học", quota: 30, isSpecialization: true, parentMajor: "Văn hóa học", combinations: ["C04", "D01", "D14", "D15"] },
      { id: "20", code: "72940-2HN", title: "Chuyên ngành Văn hóa Truyền thông thuộc ngành Văn hóa học", quota: 140, isSpecialization: true, parentMajor: "Văn hóa học", combinations: ["C04", "D01", "D14", "D15"] },
      { id: "21", code: "74814HN", title: "Hệ thống thông tin", quota: 100, combinations: ["A00", "A01", "D01", "X26"] },
      { id: "22", code: "74814-1HN", title: "Chuyên ngành Hệ thống thông tin thương mại điện tử thuộc ngành Hệ thống thông tin", quota: 70, isSpecialization: true, parentMajor: "Hệ thống thông tin", combinations: ["A00", "A01", "D01", "X26"] },
    ],
  },
  {
    label: "B",
    name: "PHÂN HIỆU — ĐÀ NẴNG",
    totalQuota: 460,
    programs: [
      { id: "1", code: "73444DN", title: "Quản trị nhân lực", quota: 80, combinations: ["A01", "C04", "D01", "D10"] },
      { id: "2", code: "73446DN", title: "Quản trị văn phòng", quota: 70, combinations: ["C00", "D01", "D14", "D15"] },
      { id: "3", code: "73811DN", title: "Luật", quota: 50, combinations: ["A00", "C00", "C03", "D01"] },
      { id: "4", code: "7381-1DN", title: "Chuyên ngành Thanh tra thuộc ngành Luật", quota: 100, isSpecialization: true, parentMajor: "Luật", combinations: ["A00", "C00", "C03", "D01"] },
      { id: "5", code: "73125DN", title: "Quản lý nhà nước", quota: 80, combinations: ["C00", "C03", "D01", "D15"] },
      { id: "6", code: "78113DN", title: "Quản trị dịch vụ du lịch và lữ hành", quota: 40, combinations: ["C00", "D01", "D14", "D15"] },
      { id: "7", code: "73111DN", title: "Kinh tế", quota: 40, combinations: ["A00", "A01", "D01", "D10"] },
    ],
  },
  {
    label: "C",
    name: "PHÂN HIỆU — TP. HỒ CHÍ MINH",
    totalQuota: 860,
    programs: [
      { id: "1", code: "73811HCM", title: "Luật", quota: 70, combinations: ["C03", "C04", "D01", "D10"] },
      { id: "2", code: "7381-1HCM", title: "Chuyên ngành Thanh tra thuộc ngành Luật", quota: 70, isSpecialization: true, parentMajor: "Luật", combinations: ["C03", "C04", "D01", "D10"] },
      { id: "3", code: "73444HCM", title: "Quản trị nhân lực", quota: 105, combinations: ["C01", "C04", "D01", "D10"] },
      { id: "4", code: "73446HCM", title: "Quản trị văn phòng", quota: 150, combinations: ["C03", "C04", "D01", "D10"] },
      { id: "5", code: "73125HCM", title: "Quản lý nhà nước", quota: 160, combinations: ["C03", "C04", "D01", "D10"] },
      { id: "6", code: "73122HCM", title: "Xây dựng Đảng và chính quyền nhà nước", quota: 80, combinations: ["C00", "C03", "C04", "D01"] },
      { id: "7", code: "73233HCM", title: "Lưu trữ học", quota: 35, combinations: ["C00", "C03", "D01", "D14"] },
      { id: "8", code: "7323-1HCM", title: "Chuyên ngành Văn thư – Lưu trữ thuộc ngành Lưu trữ học", quota: 35, isSpecialization: true, parentMajor: "Lưu trữ học", combinations: ["C00", "C03", "D01", "D14"] },
      { id: "9", code: "73111HCM", title: "Kinh tế", quota: 155, combinations: ["A01", "D01", "D10", "D15"] },
    ],
  },
  {
    label: "D",
    name: "PHÂN HIỆU — ĐẮK LẮK",
    totalQuota: 240,
    programs: [
      { id: "1", code: "73125DL", title: "Quản lý nhà nước", quota: 60, combinations: ["A00", "C00", "D01", "D10"] },
      { id: "2", code: "73444DL", title: "Quản trị nhân lực", quota: 60, combinations: ["A00", "A01", "C00", "D01"] },
      { id: "3", code: "73811DL", title: "Luật", quota: 60, combinations: ["A00", "C00", "C04", "D01"] },
      { id: "4", code: "73111DL", title: "Kinh tế", quota: 60, combinations: ["C00", "C01", "D01", "D10"] },
    ],
  },
];

export default function ProgramsGroup1Section() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCampus, setActiveCampus] = useState(0);
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".programs-header",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate program rows when campus changes
  useEffect(() => {
    gsap.fromTo(
      ".program-row",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.03,
        ease: "power2.out",
      }
    );
  }, [activeCampus]);

  const currentCampus = campuses[activeCampus];
  const mainPrograms = currentCampus.programs.filter((p) => !p.isSpecialization);
  const specializations = currentCampus.programs.filter((p) => p.isSpecialization);

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="relative w-full bg-[#FAFAFA] border-t border-[#2c2b7c]/10 z-10"
      style={{ paddingTop: "clamp(4rem, 10vw, 8rem)", paddingBottom: "clamp(4rem, 10vw, 8rem)" }}
    >
      {/* Header */}
      <div className="programs-header w-full px-6 md:px-12 lg:px-24 mb-16">
        <div className="flex items-end justify-between border-b-2 border-[#2c2b7c]/20 pb-4">
          <h2 className="font-heading text-lg md:text-2xl font-black uppercase tracking-wider text-[#2c2b7c]">
            Các Ngành & Chuyên Ngành Đào Tạo
          </h2>
          <span className="text-[10px] md:text-xs tracking-[0.2em] font-sans font-bold uppercase text-[#555]">
            TỔNG CHỈ TIÊU: 4.200
          </span>
        </div>
      </div>

      {/* Campus Tabs */}
      <div className="w-full px-6 md:px-12 lg:px-24 mb-12">
        <div className="flex flex-wrap gap-2 md:gap-0">
          {campuses.map((campus, index) => (
            <button
              key={campus.label}
              onClick={() => {
                setActiveCampus(index);
                setExpandedProgram(null);
              }}
              className={`
                group relative px-5 md:px-8 py-4 font-sans font-bold text-xs md:text-sm uppercase tracking-[0.15em]
                transition-all duration-300 border border-[#2c2b7c]/10
                ${index === activeCampus
                  ? "bg-[#2c2b7c] text-[#FAFAFA] border-[#2c2b7c]"
                  : "bg-transparent text-[#555] hover:text-[#ed1c29] hover:border-[#ed1c29]/50"
                }
              `}
            >
              <span className="mr-2 opacity-40">({campus.label})</span>
              {campus.name.split("—")[1]?.trim() || campus.name}
              <span className={`ml-3 text-[10px] ${index === activeCampus ? "text-white/60" : "text-[#999]"}`}>
                {campus.totalQuota}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Campus Info Bar */}
      <div className="w-full px-6 md:px-12 lg:px-24 mb-8">
        <div className="flex items-center justify-between py-3 border-b border-[#2c2b7c]/10">
          <span className="font-sans text-[#999] text-xs uppercase tracking-[0.2em] font-bold">
            {currentCampus.name}
          </span>
          <span className="font-heading text-[#2c2b7c] text-sm font-black">
            {currentCampus.totalQuota} CHỈ TIÊU
          </span>
        </div>
      </div>

      {/* Programs Table */}
      <div className="w-full px-6 md:px-12 lg:px-24">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 py-3 border-b border-black/10 mb-2">
          <span className="col-span-1 font-sans text-[10px] uppercase tracking-[0.2em] text-[#999] font-bold">TT</span>
          <span className="col-span-2 font-sans text-[10px] uppercase tracking-[0.2em] text-[#999] font-bold">MÃ XÉT TUYỂN</span>
          <span className="col-span-5 font-sans text-[10px] uppercase tracking-[0.2em] text-[#999] font-bold">TÊN NGÀNH / CHUYÊN NGÀNH</span>
          <span className="col-span-2 font-sans text-[10px] uppercase tracking-[0.2em] text-[#999] font-bold text-right">CHỈ TIÊU</span>
          <span className="col-span-2 font-sans text-[10px] uppercase tracking-[0.2em] text-[#999] font-bold text-right">TỔ HỢP</span>
        </div>

        {/* Main Majors */}
        {mainPrograms.length > 0 && (
          <div className="mb-4">
            <div className="py-2 mb-1">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#bbb] font-bold">
                ─── NGÀNH ĐÀO TẠO
              </span>
            </div>
            {mainPrograms.map((prog, idx) => {
              const relatedSpecs = specializations.filter((s) => s.parentMajor === prog.title);
              const isExpanded = expandedProgram === prog.code;

              return (
                <div key={prog.code} className="program-row">
                  <div
                    className={`
                      grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-4 px-4 md:px-0
                      border-b border-[#2c2b7c]/5 cursor-pointer
                      transition-all duration-300 group
                      ${isExpanded ? "bg-[#2c2b7c]/[0.05]" : "hover:bg-[#2c2b7c]/[0.03]"}
                    `}
                    onClick={() => setExpandedProgram(isExpanded ? null : prog.code)}
                  >
                    <span className="hidden md:block col-span-1 font-sans text-[#999] text-sm font-bold tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="md:col-span-2 flex items-center gap-2">
                      <span className="md:hidden font-sans text-[#999] text-xs font-bold">{String(idx + 1).padStart(2, "0")}.</span>
                      <span className="font-mono text-xs text-[#555] bg-black/5 px-2 py-1 rounded tracking-wider">{prog.code}</span>
                    </div>
                    <div className="md:col-span-5 flex items-center gap-3">
                      <h3 className="font-heading text-[clamp(0.85rem,1.8vw,1.05rem)] font-black uppercase tracking-tight text-[#2c2b7c] group-hover:text-[#ed1c29] transition-colors duration-300">
                        {prog.title}
                      </h3>
                      {relatedSpecs.length > 0 && (
                        <span className="text-[9px] font-bold text-[#888] bg-black/5 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                          +{relatedSpecs.length} CN
                        </span>
                      )}
                    </div>
                    <span className="hidden md:block col-span-2 font-heading text-sm font-black text-[#333] text-right tabular-nums">
                      {prog.quota}
                    </span>
                    <div className="md:col-span-2 flex flex-wrap gap-1.5 justify-start md:justify-end">
                      {prog.combinations.map((c) => (
                        <span key={c} className="text-[10px] font-mono text-[#777] border border-black/10 px-1.5 py-0.5 rounded">
                          {c}
                        </span>
                      ))}
                    </div>
                    <div className="md:hidden flex items-center gap-3 mt-1">
                      <span className="font-heading text-sm font-black text-[#333]">Chỉ tiêu: {prog.quota}</span>
                    </div>
                  </div>

                  {/* Expanded Specializations */}
                  {isExpanded && relatedSpecs.length > 0 && (
                    <div className="bg-black/[0.02] border-b border-black/5">
                      {relatedSpecs.map((spec) => (
                        <div key={spec.code} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-3 px-4 md:px-0 md:pl-12 border-t border-black/[0.03]">
                          <span className="hidden md:block col-span-1"></span>
                          <div className="md:col-span-2 flex items-center gap-2">
                            <span className="w-3 h-[1px] bg-black/20 hidden md:block"></span>
                            <span className="font-mono text-[11px] text-[#777] bg-black/[0.03] px-2 py-0.5 rounded tracking-wider">{spec.code}</span>
                          </div>
                          <div className="md:col-span-5">
                            <h4 className="font-sans text-sm font-semibold text-[#555] leading-snug">
                              {spec.title}
                            </h4>
                          </div>
                          <span className="hidden md:block col-span-2 font-sans text-sm font-semibold text-[#666] text-right tabular-nums">
                            {spec.quota}
                          </span>
                          <div className="md:col-span-2 flex flex-wrap gap-1 justify-start md:justify-end">
                            {spec.combinations.map((c) => (
                              <span key={c} className="text-[10px] font-mono text-[#999] border border-black/5 px-1.5 py-0.5 rounded">
                                {c}
                              </span>
                            ))}
                          </div>
                          <div className="md:hidden">
                            <span className="font-sans text-xs font-semibold text-[#666]">Chỉ tiêu: {spec.quota}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Specializations (standalone) */}
        {specializations.length > 0 && (
          <div className="mt-8">
            <div className="py-2 mb-1">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#bbb] font-bold">
                ─── CHUYÊN NGÀNH ĐÀO TẠO
              </span>
            </div>
            {specializations.map((spec, idx) => (
              <div key={spec.code} className="program-row">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-4 px-4 md:px-0 border-b border-black/5 hover:bg-black/[0.02] transition-all duration-300 group">
                  <span className="hidden md:block col-span-1 font-sans text-[#bbb] text-sm font-bold tabular-nums">
                    {String(mainPrograms.length + idx + 1).padStart(2, "0")}
                  </span>
                  <div className="md:col-span-2 flex items-center gap-2">
                    <span className="md:hidden font-sans text-[#bbb] text-xs font-bold">{String(mainPrograms.length + idx + 1).padStart(2, "0")}.</span>
                    <span className="font-mono text-xs text-[#777] bg-black/[0.03] px-2 py-1 rounded tracking-wider">{spec.code}</span>
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="font-sans text-sm font-semibold text-[#555] group-hover:text-[#222] transition-colors duration-300 leading-snug">
                      {spec.title}
                    </h3>
                  </div>
                  <span className="hidden md:block col-span-2 font-sans text-sm font-semibold text-[#666] text-right tabular-nums">
                    {spec.quota}
                  </span>
                  <div className="md:col-span-2 flex flex-wrap gap-1 justify-start md:justify-end">
                    {spec.combinations.map((c) => (
                      <span key={c} className="text-[10px] font-mono text-[#999] border border-black/5 px-1.5 py-0.5 rounded">
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="md:hidden">
                    <span className="font-sans text-xs font-semibold text-[#666]">Chỉ tiêu: {spec.quota}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Footer */}
        <div className="flex items-center justify-between py-6 mt-4 border-t-2 border-[#2c2b7c]/20">
          <span className="font-sans text-xs text-[#999] uppercase tracking-[0.2em] font-bold">
            TỔNG SỐ: {currentCampus.programs.length} NGÀNH & CHUYÊN NGÀNH
          </span>
          <span className="font-heading text-lg font-black text-[#2c2b7c]">
            {currentCampus.totalQuota} CHỈ TIÊU
          </span>
        </div>
      </div>
    </section>
  );
}
