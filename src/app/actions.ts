"use server";

import type { FormState } from "@/types/admissions-form";

const PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitAdmissionForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Extract fields
  const fullName = (formData.get("fullName") as string)?.trim() ?? "";
  const highSchool = (formData.get("highSchool") as string)?.trim() ?? "";
  const province = (formData.get("province") as string)?.trim() ?? "";
  const phone = (formData.get("phone") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim() ?? "";
  const programCode = (formData.get("programCode") as string)?.trim() ?? "";
  const programName = (formData.get("programName") as string)?.trim() ?? "";
  const question = (formData.get("question") as string)?.trim() ?? "";

  // 2. Server-side validation
  const errors: Partial<Record<string, string>> = {};

  if (!fullName) errors.fullName = "Vui lòng nhập họ và tên.";
  if (!highSchool) errors.highSchool = "Vui lòng nhập tên trường THPT.";
  if (!province) errors.province = "Vui lòng chọn Tỉnh/Thành phố.";

  if (!phone) {
    errors.phone = "Vui lòng nhập số điện thoại.";
  } else if (!PHONE_REGEX.test(phone.replace(/\s|-/g, ""))) {
    errors.phone = "Số điện thoại không hợp lệ.";
  }

  if (!email) {
    errors.email = "Vui lòng nhập email.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Địa chỉ email không hợp lệ.";
  }

  if (!programCode) errors.programCode = "Vui lòng chọn ngành/chuyên ngành.";

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Vui lòng kiểm tra lại thông tin.",
      errors,
    };
  }

  // 3. Submit to Google Apps Script
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!scriptUrl) {
    console.error("GOOGLE_APPS_SCRIPT_URL is not configured.");
    return {
      success: false,
      message: "Hệ thống đang bảo trì. Vui lòng thử lại sau.",
    };
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        highSchool,
        province,
        phone,
        email,
        programCode,
        programName,
        question,
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script responded with ${response.status}`);
    }

    return {
      success: true,
      message: "Đăng ký thành công! Bộ phận Tuyển sinh sẽ liên hệ bạn sớm nhất.",
    };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: "Đã xảy ra lỗi khi gửi biểu mẫu. Vui lòng thử lại.",
    };
  }
}
