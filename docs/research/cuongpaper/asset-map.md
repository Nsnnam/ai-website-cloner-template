# CuongPaPer - Asset Map & Design Tokens

**Source URL:** `https://hanmmanhcuong.io.vn/mau-giay-in/`

---

## 1. Asset Inventory

| Asset Name | Source Path | Local Target Path | Content Type | Status |
| :--- | :--- | :--- | :--- | :--- |
| Favicon SVG | `/favicon.svg` | `public/sites/cuongpaper/favicon.svg` | `image/svg+xml` | Downloaded |
| Stylesheet | `/assets/index-DbA7kDut.css` | `src/components/sites/cuongpaper/cuongpaper.css` | `text/css` | Extracted |
| Application JS | `/assets/index-CSsL_lRX.js` | `src/components/sites/cuongpaper/*` | `application/javascript` | Decompiled & Rebuilt |
| Nunito Font | Google Fonts | Imported in layout / CSS | Fonts (`400, 500, 600, 700, 800, 900`) | Linked |
| 52 Vector Icons | Inline SVG dictionary `Xf` | `src/components/sites/cuongpaper/icons.tsx` | React SVG components | Extracted |

---

## 2. Design Tokens & Color Palette

### Light Mode (`:root`)
- Background: `#F5F2EB` (Warm cream craft paper tone)
- Container: `#FCFAF6`
- Card / Panel: `#FFFFFF`
- Text Primary: `#1F2D5A` (Deep navy indigo)
- Text Muted: `#798EAA`
- Primary Brand: `#1E3A8A`
- Primary Hover: `#172554`
- Primary Light: `#EBF2FF`
- Accent: `#E2725B` (Terracotta coral)
- Accent Hover: `#C85D47`
- Accent Light: `#FDF0ED`
- Border: `#E8E3D7`
- Box Shadow: `0 10px 30px rgba(30, 45, 90, 0.04)`
- Typography: `"Nunito", "Nunito Fallback", sans-serif`

### Dark Mode (`[data-theme="dark"]`)
- Background: `#12121A`
- Container: `#1A1A26`
- Card / Panel: `#20202F`
- Text Primary: `#F3F4F6`
- Text Muted: `#9CA3AF`
- Primary Brand: `#3B82F6`
- Primary Hover: `#60A5FA`
- Primary Light: `#1E293B`
- Accent: `#F43F5E`
- Accent Hover: `#FB7185`
- Accent Light: `#2D1B22`
- Border: `#2D2D3F`
- Box Shadow: `0 10px 30px rgba(0, 0, 0, 0.2)`
