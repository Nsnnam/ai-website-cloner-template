/**
 * NSN App Standard — Meta Object
 * Ứng dụng: CuongPaPer - Thiết kế & In Mẫu Giấy Chất Lượng Cao
 */

export interface ChangelogItem {
  version: string;
  date: string;
  changes: string[];
}

export interface CoffeeInfo {
  title: string;
  blurb: string;
  accountName: string;
  accountNumber: string;
  bank: string;
  method: string;
  thanks: string;
  qrAlt: string;
  qrPath: string;
}

export interface AppMeta {
  name: string;
  appCode: string;
  version: string;
  date: string;
  author: string;
  authorShort: string;
  role: string;
  github: string;
  liveUrl: string;
  timezone: string;
  coffee: CoffeeInfo;
  changelog: ChangelogItem[];
}

export const NSN_APP_META: AppMeta = {
  name: "CuongPaPer - Thiết kế & Tải Mẫu Giấy In Chất Lượng Cao",
  appCode: "CUONGPAPER",
  version: "1.0.0",
  date: "2026-11-01",
  author: "Nguyễn Sơn Nam (Nsnnam)",
  authorShort: "NSN",
  role: "Tác giả · Hệ thống ứng dụng NSN Standard",
  github: "https://github.com/Nsnnam/ai-website-cloner-template",
  liveUrl: "https://nsnnam.github.io/ai-website-cloner-template/",
  timezone: "Asia/Ho_Chi_Minh",
  coffee: {
    title: "Mời cà phê ☕",
    blurb:
      "Nếu ứng dụng giúp bạn tiết kiệm thời gian và phục vụ tốt nhu cầu in ấn, hãy ủng hộ tác giả một tách cà phê nhé!",
    accountName: "NGUYEN SON NAM",
    accountNumber: "8855989777",
    bank: "BIDV — PGD Nguyễn Tất Thành",
    method: "Quét mã VietQR bên dưới để chuyển khoản nhanh",
    thanks: "Cảm ơn bạn đã ủng hộ!",
    qrAlt: "QR VietQR ủng hộ - BIDV 8855989777",
    qrPath: "/docs/coffee-qr.jpg",
  },
  changelog: [
    {
      version: "1.0.0",
      date: "2026-11-01",
      changes: [
        "Khởi tạo ứng dụng theo chuẩn NSN App Standard",
        "Clone và tái lập 1:1 hơn 50 mẫu giấy in từ hanmmanhcuong.io.vn/mau-giay-in",
        "Tích hợp xuất file PDF vector 300 DPI, ảnh PNG/JPG sắc nét, xuất Word DOCX và In trực tiếp",
        "Tích hợp thước đo milimet, công cụ phóng to/thu nhỏ, hoàn tác/làm lại và tìm kiếm mẫu giấy",
        "Bổ sung Tab Hướng dẫn, Phiên bản, Tác giả và Mời cà phê BIDV Nguyễn Sơn Nam",
        "Cấu hình tự động triển khai GitHub Pages trực tiếp tại nsnnam.github.io/ai-website-cloner-template",
      ],
    },
  ],
};
