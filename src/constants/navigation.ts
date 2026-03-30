import type { NavMenuItem, DropdownMenuItem } from '@/types/navigation';

export const mainNavItems: NavMenuItem[] = [
  { label: "Về chúng tôi", href: "#about", type: "scroll" },
  { label: "Lịch trình", href: "#timeline", type: "scroll" },
  { label: "Phương thức", href: "/phuongthuc", type: "page" },
  { label: "Tính điểm", href: "/tinhdiem", type: "page" },
  { label: "Liên hệ", href: "#contact", type: "scroll" },
];

export const fullMenuItems: NavMenuItem[] = [
  { label: "Tổng quan", href: "#headquarters", type: "scroll" },
  { label: "Giới thiệu chung", href: "#about", type: "scroll" },
  { label: "Ngành đào tạo", href: "#programs", type: "scroll" },
  { label: "Phương thức XT", href: "/phuongthuc", type: "page" },
  { label: "Điểm chuẩn", href: "/diemchuan", type: "page" },
  { label: "Tính điểm học bạ", href: "/tinhdiem", type: "page" },
  { label: "Lịch trình TS", href: "#timeline", type: "scroll" },
  { label: "Học phí - KTX", href: "#financial", type: "scroll" },
  { label: "Hỏi đáp - FAQ", href: "#faq", type: "scroll" },
  { label: "Liên hệ", href: "#contact", type: "scroll" },
];

export const topBarDropdownItems: DropdownMenuItem[] = [
  { label: "Giới thiệu chung", href: "/#about" },
  { label: "Phương thức xét tuyển", href: "/phuongthuc" },
  { label: "Ngành đào tạo", href: "/#programs" },
  { label: "Điểm chuẩn tham khảo", href: "/diemchuan" },
  { label: "Lịch trình tuyển sinh", href: "/#timeline" },
  { label: "Học phí - Ký túc xá", href: "/#financial" },
  { label: "Câu hỏi thường gặp", href: "/#faq" },
];
