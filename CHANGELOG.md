# Lịch sử phiên bản (Changelog)

Toàn bộ các thay đổi đáng chú ý của dự án **NsN_GiayIn (AI Website Cloner Template)** được lưu trữ chi tiết tại đây. Định dạng tuân thủ quy chuẩn [NSN App Standard](https://github.com/Nsnnam/nsn-app-standard).

---

## [1.0.2] - 2026-11-01 (GMT+7)

### Đã thêm & Cải tiến
- **Thiết kế lại Logo NsN_GiayIn:**
  - Biểu tượng squircle cao cấp chuyển sắc xanh sapphire (`#1E3A8A` -> `#3B82F6`) với trang giấy gấp góc origami, đường kẻ căn lề đỏ coral và con dấu chữ **N** (Nguyễn Sơn Nam) độc quyền.
  - Component vector [`NsNLogo`](file:///C:/Users/Admin/Projects/ai-website-cloner-template/src/components/sites/cuongpaper/logo.tsx) sắc nét trên mọi độ phân giải.
- **Thêm icon vào tiêu đề trang (Document Title):**
  - Thêm biểu tượng `📄` vào tiêu đề tab trình duyệt: `📄 NsN_GiayIn - Thiết kế & Tải Mẫu Giấy In Chất Lượng Cao | Custom Paper Templates`.
  - Cập nhật favicon SVG đồng bộ tại `src/app/icon.svg` và `public/favicon.svg` tương thích tự động với base path GitHub Pages.

---

## [1.0.1] - 2026-11-01 (GMT+7)

### Đã sửa & Cải tiến
- **Đổi tên thương hiệu:** Đổi tên toàn bộ sản phẩm thành **NsN_GiayIn** (logo, header, tab phiên bản, tên file tải về, định danh `localStorage`).
- **Sửa lỗi hiển thị tiếng Việt trên Canvas:** Khắc phục triệt để lỗi mã hóa ký tự (mojibake) trên 22 mẫu giấy vẽ canvas (`draw-paper.js`), đảm bảo hiển thị đúng dấu tiếng Việt (*Ngày, Ý tưởng trung tâm, Lỗi sai, Bài học rút ra, Tranh vẽ...*).
- **Sửa lỗi giấy canvas bị lùi xuống đáy màn hình:**
  - Khóa chiều cao `#app` vừa khớp viewport (`h-screen max-h-screen overflow-hidden`).
  - Cố định kích thước pixel tính toán (`wrapperWidth`, `wrapperHeight`) cho khung bọc thước đo `paper-ruler-wrapper` dựa trên kích thước thật của canvas và tỷ lệ zoom.
  - Căn giữa trang giấy tuyệt đối bằng `left: 50%; top: 50%; transform: translate(-50%, -50%)`.
- **Tối ưu font chữ:** Bổ sung cơ chế `document.fonts.ready` để kích hoạt vẽ lại canvas ngay khi font chữ 'Nunito' tải xong, tránh hiện tượng rơi về font hệ thống gây biến dạng chữ.

---

## [1.0.0] - 2026-11-01 (GMT+7)

### Đã thêm
- Khởi tạo dự án theo chuẩn **NSN App Standard** từ template `JCodesMore/ai-website-cloner-template`.
- Clone và tái hiện hoàn chỉnh ứng dụng thiết kế mẫu giấy in từ `https://hanmmanhcuong.io.vn/mau-giay-in/`.
- Thư viện hơn 50 mẫu giấy in chất lượng cao thuộc 7 nhóm danh mục:
  - Giấy thông dụng (Kẻ ngang, Lề dọc, Kẻ ô vuông Caro, Chấm bi Dot grid, Lưới hồng milimet, Trắng tinh, Khuông nhạc ngũ tuyến, Guitar TAB, Ukulele TAB, Guitar Chord, Luyện chữ, Lục giác tổ ong, Ô ly Seyes Pháp).
  - Giấy làm bài tập (Pinyin, Tianzi Pinyin, Composition paper, Bản thảo Nhật Bản, Giấy số học, Tiếng Anh tiểu học, Mẫu chữ Đức Lineatur).
  - Giấy luyện chữ nghệ thuật (Mễ tự cách MiZiGe, Hồi cung cách HuiGongGe, Cửu cung cách JiuGongGe, Điền tự cách Chinese Tianzi, Lưới thêu chữ thập).
  - Thiết kế & Kiến trúc (Lưới kiến trúc khổ lớn, Bố trí nội thất, Lưới 3D Isometric, Lưới vẽ phối cảnh 2 điểm tụ).
  - Hội họa & Mỹ thuật (Khung phân cảnh Storyboard, Phác thảo tỷ lệ vàng Golden ratio, Tranh vẽ thiếu nhi).
  - Học tập & Tư duy (Sơ đồ tư duy Mindmap, Ghi chú Cornell, Thẻ học từ vựng Vocabulary word cards, Ghi chép lỗi sai).
  - Ghi chú & Kế hoạch (Đồng hồ Chronodex 24h, Kế hoạch tuần Weekly planner, Theo dõi thói quen Habit tracker, Sổ họp Meeting minutes, Bảng kế hoạch dự án Project planner, Danh sách việc cần làm To-do list).
- Engine vẽ Vector Canvas chính xác từng milimet với tùy biến khoảng cách dòng, độ đậm nét vẽ, màu sắc, kiểu nét (*Solid, Dashed, Dotted*).
- Hỗ trợ xuất file đa định dạng:
  - PDF Vector 300 DPI (`jsPDF`).
  - Ảnh PNG và JPG độ phân giải cao.
  - File Microsoft Word (DOCX).
  - In trực tiếp qua trình duyệt (Print).
- Tích hợp chuẩn **NSN App Standard**:
  - Tên file xuất chuẩn GMT+7: `HHmmss_<paperType>_yyyyMMdd.ext`.
  - Bộ tab chuẩn: *Thư viện mẫu, Tự thiết kế, Hướng dẫn, Phiên bản, ☕ Mời cà phê*.
  - Khối thông tin tác giả **Nguyễn Sơn Nam** và số tài khoản BIDV `8855989777` kèm mã VietQR chuẩn.
  - Lưu trữ cấu hình client với khóa `nsn-cuongpaper-...` bền vững trong `localStorage`.
- Tự động hóa CI/CD triển khai trực tiếp lên GitHub Pages: `https://nsnnam.github.io/ai-website-cloner-template/`.
