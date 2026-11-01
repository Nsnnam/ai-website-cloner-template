import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "📄 NsN_GiayIn - Thiết kế & Tải Mẫu Giấy In Chất Lượng Cao | Custom Paper Templates",
  description:
    "Tự tay thiết kế và tải xuống 50+ mẫu giấy in thông dụng như giấy kẻ ngang, ô ly Seyes, chấm bi dot grid, khuông nhạc, isometric và ghi chú Cornell. Song ngữ, chỉnh kích cỡ mm chuẩn in ấn.",
  icons: {
    icon: [
      { url: `${basePath}/favicon.svg`, type: "image/svg+xml" },
      { url: `${basePath}/sites/cuongpaper/favicon.svg`, type: "image/svg+xml" },
    ],
    shortcut: `${basePath}/favicon.svg`,
    apple: `${basePath}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
