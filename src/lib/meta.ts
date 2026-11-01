/**
 * NSN App Standard — Meta Object
 * Ứng dụng: NsN_GiayIn - Thiết Kế & Tải Mẫu Giấy In Chất Lượng Cao
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
  name: "NsN_GiayIn - Thiết kế & Tải Mẫu Giấy In Chất Lượng Cao",
  appCode: "NSN_GIAYIN",
  version: "1.0.1",
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
      version: "1.0.1",
      date: "2026-11-01",
      changes: [
        "Đổi tên nhận diện thương hiệu thành NsN_GiayIn",
        "Khắc phục triệt để lỗi hiển thị giấy bị lùi xuống đáy trang (sửa cấu trúc layout wrapper & canvas transform)",
        "Sửa toàn bộ lỗi font tiếng Việt và lỗi hiển thị ký tự có dấu trên bản vẽ Canvas",
        "Tối ưu giao diện toàn màn hình máy tính và thiết bị di động, loại bỏ thanh cuộn dọc ngoài ý muốn",
        "Cập nhật tên file xuất chuẩn GMT+7: HHmmss_NsN_GiayIn_yyyyMMdd.ext",
      ],
    },
    {
      version: "1.0.0",
      date: "2026-11-01",
      changes: [
        "Khởi tạo ứng dụng theo chuẩn NSN App Standard",
        "Tích hợp hơn 50 mẫu giấy in chất lượng cao",
        "Hỗ trợ xuất PDF vector 300 DPI, ảnh PNG/JPG, xuất Word DOCX và In trực tiếp",
      ],
    },
  ],
};
