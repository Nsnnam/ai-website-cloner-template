# Lịch sử phiên bản (Changelog)

Toàn bộ các thay đổi đáng chú ý của dự án **CuongPaPer (AI Website Cloner Template)** được lưu trữ chi tiết tại đây. Định dạng tuân thủ quy chuẩn [NSN App Standard](https://github.com/Nsnnam/nsn-app-standard).

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
