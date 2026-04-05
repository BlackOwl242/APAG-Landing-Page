"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const FAQ_DATA = [
  {
    id: "q1",
    question: "Học phí đại học năm 2026 tại Trụ sở Hà Nội là bao nhiêu một tín chỉ?",
    answer: "Học phí dự kiến: Các ngành Quản lý nhà nước, Văn hóa học, Quản lý văn hóa, Quản trị dịch vụ du lịch và lữ hành, Lưu trữ học, Chính trị học, Xây dựng Đảng và CQNN, Kinh tế là 602.000 VNĐ/tín chỉ. Các ngành Quản trị nhân lực, Quản trị văn phòng, Luật là 564.000 VNĐ/tín chỉ. Ngành Hệ thống thông tin là 659.000 VNĐ/tín chỉ."
  },
  {
    id: "q2",
    question: "Địa chỉ và số điện thoại liên hệ của Trụ sở Hà Nội là gì?",
    answer: "Trụ sở chính tại Hà Nội: Số 77 Nguyễn Chí Thanh, phường Giảng Võ, thành phố Hà Nội. Các cơ sở khác: Số 36 Xuân La và Số 371 Nguyễn Hoàng Tôn, phường Xuân Đỉnh. Số điện thoại: 024.37533659. Hotline: 1900.099.996."
  },
  {
    id: "q3",
    question: "Điểm chuẩn năm 2025 của các ngành tại Trụ sở Hà Nội như thế nào?",
    answer: "Điểm trúng tuyển (thang 30): Quản trị nhân lực (24.2), Quản trị văn phòng (24.05), Luật và Thanh tra (24.2), Kinh tế (23.5), Quản lý nhà nước (23.75), Chính trị học (23.35), Xây dựng Đảng và CQNN (23.35), Lưu trữ học (23.0), Thông tin - thư viện (22.35)."
  },
  {
    id: "q4",
    question: "Trụ sở Hà Nội đào tạo những ngành nào?",
    answer: "Năm 2026, Trụ sở Hà Nội tuyển sinh 12 ngành và 6 chuyên ngành bao gồm: Quản trị nhân lực, Quản trị văn phòng, Luật (và CN Thanh tra), Kinh tế (và CN Kinh tế du lịch), Quản lý nhà nước (CT 50% TA, CN Quản trị tổ chức, CN Quản trị địa phương), Chính trị học, Xây dựng Đảng và chính quyền nhà nước, Lưu trữ học (CN Văn thư - Lưu trữ), Thông tin - thư viện, Quản trị dịch vụ du lịch và lữ hành, Quản lý văn hóa (CN Quản lý di sản văn hóa và phát triển du lịch), Văn hóa học (CN Văn hóa Du lịch, CN Văn hóa Truyền thông), Hệ thống thông tin (CN Hệ thống thông tin thương mại điện tử)."
  },
  {
    id: "q5",
    question: "Sinh viên thủ khoa và xét tuyển thẳng có được học bổng không?",
    answer: "Có. Thủ khoa toàn khóa (xét theo điểm thi tốt nghiệp THPT) và Thí sinh trúng tuyển theo phương thức xét tuyển thẳng nhận học bổng 2.000.000 VNĐ. Thủ khoa đầu vào các ngành nhận học bổng 1.000.000 VNĐ."
  },
  {
    id: "q6",
    question: "Có những phương thức xét tuyển Đại học nào và điều kiện xét học bạ ra sao?",
    answer: "Học viện sử dụng 4 phương thức: (1) Kết quả thi TN THPT năm 2026; (2) Kết quả học tập THPT (Học bạ) kết hợp thi TN THPT; (3) Kết quả bài thi ĐGNL của ĐHQGHN/ĐHQG TPHCM; (4) Xét tuyển thẳng.\nĐối với xét học bạ: Thí sinh phải đạt tổng điểm trung bình chung 3 môn thuộc tổ hợp xét tuyển của 3 năm (lớp 10, 11, 12) từ 18.0 điểm trở lên."
  }
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-element",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter FAQs based on search
  const filteredFaqs = FAQ_DATA.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" ref={sectionRef} className="w-full relative bg-[#FAFAFA] pt-16 pb-8 overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-[850px] px-6 z-10">
        
        {/* Section Header */}
        <div className="faq-element flex flex-col items-center mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase text-[#2c2b7c] tracking-tight text-center whitespace-nowrap mb-6">
            CÂU HỎI THƯỜNG GẶP (FAQ)
          </h2>
          <div className="w-24 h-1 bg-[#ed1c29] mb-6"></div>
          <p className="text-base sm:text-lg text-[#0a0f29]/70 font-medium text-center max-w-2xl px-4">
            Giải đáp nhanh các thắc mắc về kỳ tuyển sinh 2026 tại APAG Hà Nội.
          </p>
        </div>

        {/* Search Bar */}
        <div className="faq-element relative mb-10 w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-[#2c2b7c]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#2c2b7c]/10 bg-white placeholder-[#2c2b7c]/40 text-[#2c2b7c] font-medium text-lg outline-none focus:ring-2 focus:ring-[#ed1c29]/20 focus:border-[#ed1c29] transition-all shadow-sm"
            placeholder="Tìm kiếm câu hỏi... (VD: Học phí, Ký túc xá)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Accordion List */}
        <div className="faq-element w-full flex flex-col gap-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openItems.includes(faq.id);
              
              return (
                <div 
                  key={faq.id}
                  className={`w-full bg-white border border-[#2c2b7c]/10 rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "shadow-md border-[#ed1c29]/30" : "shadow-sm hover:shadow-md hover:border-[#2c2b7c]/20"}`}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none group"
                  >
                    <span className={`font-sans font-bold text-lg pr-8 transition-colors ${isOpen ? "text-[#ed1c29]" : "text-[#2c2b7c] group-hover:text-[#ed1c29]"}`}>
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "bg-[#ed1c29]/10 text-[#ed1c29] rotate-180" : "bg-[#2c2b7c]/5 text-[#2c2b7c]/50 group-hover:bg-[#ed1c29]/10 group-hover:text-[#ed1c29]"}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </button>
                  
                  <div 
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-0">
                        <div className="w-full h-px bg-[#2c2b7c]/5 mb-4"></div>
                        <p className="text-[#2c2b7c]/80 font-medium leading-relaxed whitespace-pre-line text-[15px] md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full py-12 flex flex-col items-center justify-center bg-white border border-dashed border-[#2c2b7c]/20 rounded-xl">
              <svg className="w-12 h-12 text-[#2c2b7c]/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-[#2c2b7c]/60 font-medium">Không tìm thấy câu hỏi phù hợp.</p>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="faq-element mt-12 flex justify-center w-full">
          <button
            type="button"
            onClick={() => {
              const form = document.querySelector(".form-container");
              if (form) {
                const y = form.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="group px-6 sm:px-8 py-3.5 bg-transparent border-[3px] border-[#2c2b7c] text-[#2c2b7c] rounded-xl text-sm sm:text-base font-bold uppercase tracking-widest hover:bg-[#2c2b7c] hover:text-white transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
          >
            <span>Không tìm thấy câu trả lời? Đặt câu hỏi ngay</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
