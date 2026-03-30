import type { AdmissionMethod } from '@/types/navigation';

export const methodsData: AdmissionMethod[] = [
  {
    id: "01",
    title: "Xét Kết Quả Thi THPT 2026",
    conditions: [
      "Tốt nghiệp THPT; Hạnh kiểm Khá trở lên.",
      "Đạt ngưỡng đảm bảo chất lượng đầu vào của Học viện.",
      "Trọng số tính điểm môn Toán hoặc Ngữ Văn tối thiểu đạt 1/3.",
      "Tổng điểm 3 môn thi THPT (có Toán, Văn) đạt từ 15.0 điểm trở lên."
    ],
    documents: [
      "Đăng ký NV xét tuyển đợt 1 trên hệ thống của Bộ GD&ĐT.",
      "Giấy chứng nhận kết quả thi TN THPT (bản phô tô).",
      "Giấy chứng nhận ưu tiên (nếu có)."
    ],
    timeline: [
      { label: "Đăng ký Nguyện Vọng", time: "02/7 - 17h ngày 14/7/2026" },
      { label: "Công bố Trúng Tuyển", time: "Trước 17h ngày 13/8/2026" }
    ]
  },
  {
    id: "02",
    title: "Xét Kết Quả Học Tập (Học bạ)",
    conditions: [
      "Tốt nghiệp THPT; Hạnh kiểm Khá trở lên.",
      "Tổng điểm TBC 3 môn học (lớp 10, 11, 12) đạt từ 18.0 điểm (chưa gồm ưu tiên).",
      "Trọng số tính điểm môn Toán hoặc Ngữ Văn ≥ 1/3.",
      "Đạt ngưỡng thi THPT: Tổng điểm 3 môn thi ≥ 15.0 điểm."
    ],
    documents: [
      "Phiếu xét tuyển (Mẫu 02-ĐKHB).",
      "Học bạ THPT (phô tô chứng thực).",
      "Giấy CNTN THPT tạm thời / Bằng TN.",
      "Giấy tờ chứng nhận ưu tiên."
    ],
    timeline: [
      { label: "Nộp hồ sơ trực tiếp/Bưu điện", time: "01/6 - 17h ngày 12/7/2026" },
      { label: "Đăng ký NV Bộ GD&ĐT", time: "02/7 - 17h ngày 14/7/2026" },
      { label: "Công bố Trúng Tuyển", time: "Trước 17h ngày 13/8/2026" }
    ]
  },
  {
    id: "03",
    title: "Xét Kết Quả Đánh Giá Năng Lực",
    conditions: [
      "ĐGNL ĐHQG TP.HCM: ≥ 650 điểm hoặc ĐGNL ĐHQG Hà Nội: ≥ 75 điểm.",
      "Điểm TBC học tập cả 3 năm THPT phải ≥ 7.0 điểm (Tiêu chí xét, không cộng vào điểm trúng tuyển).",
      "Đạt ngưỡng thi THPT: Tổng điểm 3 môn ≥ 15.0 điểm."
    ],
    documents: [
      "Phiếu xét tuyển (Mẫu 03-ĐKNL).",
      "Giấy chứng nhận điểm ĐGNL (phô tô chứng thực).",
      "Học bạ THPT và Bằng/Giấy CNTN THPT."
    ],
    timeline: [
      { label: "Nộp hồ sơ về Học viện", time: "01/6 - 17h ngày 12/7/2026" },
      { label: "Đăng ký NV trên Cổng Bộ GD&ĐT", time: "02/7 - 17h ngày 14/7/2026" },
      { label: "Công bố Trúng Tuyển", time: "Trước 17h ngày 13/8/2026" }
    ]
  },
  {
    id: "04",
    title: "Xét Tuyển Thẳng",
    conditions: [
      "Giải Nhất, Nhì, Ba thi HSG Quốc gia, Quốc tế.",
      "Giải KHKT cấp Quốc gia, Quốc tế (TBC 3 năm ≥ 7.0, TBC Tiếng Anh 3 năm ≥ 8.0).",
      "Thí sinh hệ dự bị đại học, dân tộc rất ít người, khuyết tật nặng."
    ],
    documents: [
      "Phiếu 04a/04b-ĐKTT.",
      "Minh chứng giải thưởng / Giấy chứng nhận.",
      "Bằng/Giấy CNTN THPT tạm thời."
    ],
    timeline: [
      { label: "Nộp hồ sơ về Học viện", time: "Trước 17h00 ngày 20/6/2026" },
      { label: "Đăng ký NV hệ thống Bộ GD&ĐT", time: "Đồng thời gian nộp hồ sơ" },
      { label: "Công bố Trúng Tuyển (Dự kiến)", time: "Ngày 30/6/2026" }
    ]
  }
];
