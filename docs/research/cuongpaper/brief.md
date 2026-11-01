# CuongPaPer - Page Brief & Reverse-Engineering Analysis

**Source URL:** `https://hanmmanhcuong.io.vn/mau-giay-in/`  
**App Name:** CuongPaPer (Thiết kế & Tải Mẫu Giấy In Chất Lượng Cao / Custom Paper Templates)  
**Destination Routes:** `/` (Root homepage) and `/mau-giay-in/`

---

## 1. Overview & Architecture

CuongPaPer is a specialized vector-grade paper generator that allows users to customize, preview in real time, and export 50+ types of printable paper templates (Lined, Seyes grid, Dot grid, Music staff, Cornell notes, 3D Isometric, Perspective, Hexagonal, Pinyin, Calligraphy, Planners, and more) across standard paper sizes (A4, A3, A5, B4, B5, Letter, Legal, Tabloid, Executive, Custom mm).

### Key Features
- **50+ Specialized Templates** organized across 7 categories:
  - Standard (Thông dụng)
  - Homework (Làm bài tập / Luyện chữ học sinh)
  - Calligraphy (Thư pháp / Luyện chữ nghệ thuật)
  - Architect & Design (Kiến trúc & Thiết kế)
  - Drawing & Art (Mỹ thuật & Truyện tranh)
  - Learning & Education (Học tập & Tư duy)
  - Notes & Planning (Ghi chú & Kế hoạch)
- **High-Precision Vector Canvas Engine (96 DPI preview & 300 DPI export):**
  - Millimeter-accurate line rendering with customizable spacing (mm), line thickness (mm), line colors, and line styles (solid, dashed, dotted).
  - Configurable 4-side margins (top, bottom, left, right).
  - Page orientation toggle (Portrait / Landscape).
  - Realistic paper elevation shadow & precision measurement rulers (Thước đo tỉ lệ mm).
- **Multi-Format Export:**
  - **PDF Export:** Vector-crisp 300 DPI PDF using `jsPDF` with exact mm dimensions.
  - **PNG / JPG Export:** 300 DPI high-resolution image downloads.
  - **DOCX Export:** Formatted Microsoft Word document with embedded vector layout.
  - **Direct Print:** Browser native printing.
- **Interactive Experience & Micro-Interactions:**
  - Interactive ink dust cursor trail (`#cursor-trail-canvas`).
  - Web Audio sound effects for UI clicks, paper ruffle, and print actions.
  - Light & Dark theme toggle with custom CSS variable design tokens.
  - Bilingual localization (Tiếng Việt & English).
  - Undo / Redo history state stack.
  - Template search with instant filtering.
  - Zoom controls (Zoom In, Zoom Out, Reset, Fit).

---

## 2. Layout Structure

1. **Header (`.app-header`):**
   - Logo: CuongPaPer with paper template badge.
   - Navigation: Thư viện mẫu (`#templates`), Giấy của tôi (`#mypapers`), Tự thiết kế (`#custom`), Khám phá (`#explore`).
   - Action controls: Theme toggle (Sun/Moon), Lang toggle (VI/EN), Mobile hamburger.
2. **Left Sidebar (`.editor-sidebar`):**
   - Quick export buttons (PDF, PNG, JPG, DOCX).
   - Paper configuration collapsible accordion:
     - Paper Type dropdown.
     - Paper Size dropdown (A4, A5, A3, B4, B5, Letter, Legal, Tabloid, Executive, Custom mm).
     - Custom Width / Height mm inputs.
     - Orientation toggle (Portrait / Landscape).
   - Line properties accordion:
     - Line style (Solid, Dashed, Dotted).
     - Color presets + custom hex color picker.
     - Spacing slider + numeric input (mm).
     - Width / stroke weight slider + numeric input (mm).
     - Margins 4-field grid (Top, Bottom, Left, Right mm).
3. **Center Main Canvas (`.preview-canvas-area`):**
   - Toolbar: Undo, Redo, Template search input, Zoom controls (- / % / + / Reset), Ruler toggle switch.
   - Paper viewer container with realistic drop shadow, millimeter rulers, and HTML5 Canvas.
   - Status bar: Page size label, orientation, template name, and calculated line count.
4. **Right Sidebar (`.template-sidebar-right`):**
   - Interactive template gallery categorized into sections with search filtering.
   - Template cards featuring individual SVG icons, active states, and title labels.
