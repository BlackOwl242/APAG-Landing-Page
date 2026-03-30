import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/utilities/SmoothScroll";
import CustomCursor from "@/components/utilities/CustomCursor";
import Preloader from "@/components/utilities/Preloader";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Tư vấn tuyển sinh - Học viện Hành chính và Quản trị công (APAG)",
  description:
    "Trang thông tin tuyển sinh chính thức của Học viện Hành chính và Quản trị công (APAG). Khám phá chương trình đào tạo, cơ hội nghề nghiệp và đăng ký xét tuyển ngay hôm nay.",
  keywords: [
    "Học viện Hành chính và Quản trị công",
    "APAG",
    "tuyển sinh",
    "quản trị công",
    "hành chính",
    "đại học",
    "chính sách công",
    "đào tạo lãnh đạo",
  ],
  authors: [{ name: "Học viện Hành chính và Quản trị công (APAG)" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Tư vấn tuyển sinh - Học viện Hành chính và Quản trị công (APAG)",
    description:
      "Khám phá các chương trình đào tạo chất lượng cao tại APAG. Kiến tạo tương lai lãnh đạo của bạn ngay hôm nay.",
    type: "website",
    locale: "vi_VN",
    siteName: "APAG Admissions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tư vấn tuyển sinh - Học viện Hành chính và Quản trị công (APAG)",
    description:
      "Khám phá các chương trình đào tạo chất lượng cao tại APAG. Kiến tạo tương lai lãnh đạo của bạn ngay hôm nay.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${montserrat.variable} h-full antialiased cursor-none`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-[#0E0F0F] selection:bg-[#0E0F0F] selection:text-[#FAFAFA] cursor-none overflow-x-hidden">
        <CustomCursor />
        <div className="kurate-noise pointer-events-none mix-blend-overlay"></div>
        <div className="kurate-grid">
          <div className="kurate-grid-line"></div>
          <div className="kurate-grid-line"></div>
          <div className="kurate-grid-line"></div>
          <div className="kurate-grid-line"></div>
        </div>
        <SmoothScroll>
          <Preloader />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
