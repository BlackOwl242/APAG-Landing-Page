export const COMBOS: Record<string, string[]> = {
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

export const MAJOR_COMBOS: Record<string, string[]> = {
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

export const BENCHMARKS_2025: Record<string, number> = {
  "Quản trị nhân lực": 18.0,
  "Quản trị văn phòng": 16.0,
  "Luật / C.ngành Thanh tra": 21.0,
  "Quản lý nhà nước": 18.0,
  "Quản trị dịch vụ du lịch và lữ hành": 16.0,
  "Kinh tế": 16.0
};

export const COMBO_BONUS: Record<string, number> = {
  "C00": +1.0
};

export const AREAS: Record<string, number> = {
  "KV3 (0 điểm)": 0,
  "KV2 (0.25 điểm)": 0.25,
  "KV2-NT (0.5 điểm)": 0.5,
  "KV1 (0.75 điểm)": 0.75
};

export const OBJECTS: Record<string, number> = {
  "Không có (0 điểm)": 0,
  "Nhóm UT1 (Đối tượng 1, 2, 3, 4 - 2.0đ)": 2.0,
  "Nhóm UT2 (Đối tượng 5, 6, 7 - 1.0đ)": 1.0
};

export const CERTS: Record<string, number> = {
  "Không có (0 điểm)": 0,
  "IELTS 5.5 / SAT 1200-1230 (+0.5đ)": 0.5,
  "IELTS 6.0 / SAT 1231-1300 / HSG Ba cấp Tỉnh (+0.6đ)": 0.6,
  "IELTS 6.5 / SAT 1301-1350 / HSG Nhì Tỉnh / KK Quốc Gia (+0.7đ)": 0.7,
  "IELTS 7.0 / SAT 1351-1370 / HSG Nhất Tỉnh / Ba Quốc Gia (+0.8đ)": 0.8,
  "IELTS 7.5 / SAT 1371-1400 / HSG Nhì Quốc Gia (+0.9đ)": 0.9,
  "IELTS 8.0+ / SAT 1401+ / HSG Nhất Quốc Gia (+1.0đ)": 1.0
};
