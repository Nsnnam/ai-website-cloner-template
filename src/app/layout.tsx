import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--paperme-font",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NsN_GiayIn - Thiết kế & Tải Mẫu Giấy In Chất Lượng Cao | Custom Paper Templates",
  description:
    "Tự tay thiết kế và tải xuống 50+ mẫu giấy in thông dụng như giấy kẻ ngang, ô ly Seyes, chấm bi dot grid, khuông nhạc, isometric và ghi chú Cornell. Song ngữ, chỉnh kích cỡ mm chuẩn in ấn.",
  icons: {
    icon: "/sites/cuongpaper/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${nunito.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
