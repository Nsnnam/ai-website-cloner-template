import { PaperTemplateConfig, PaperSettings } from './types';

export const paperTemplates: PaperTemplateConfig[] = [
  {
    "id": "linedPaper",
    "key": "linedPaper",
    "group": "standard",
    "icon": "lined",
    "lineSpacing": 8,
    "lineWidth": 0.5,
    "lineColor": "#4A7C59",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "verticalLined",
    "key": "verticalLined",
    "group": "standard",
    "icon": "vertical-lined",
    "lineSpacing": 8,
    "lineWidth": 0.5,
    "lineColor": "#4B5563",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 30,
      "right": 20
    }
  },
  {
    "id": "gridPaper",
    "key": "gridPaper",
    "group": "standard",
    "icon": "grid",
    "lineSpacing": 5,
    "lineWidth": 0.4,
    "lineColor": "#A5C4D4",
    "lineStyle": "solid",
    "margins": {
      "top": 15,
      "bottom": 15,
      "left": 15,
      "right": 15
    }
  },
  {
    "id": "dotPaper",
    "key": "dotPaper",
    "group": "standard",
    "icon": "dot",
    "lineSpacing": 5,
    "lineWidth": 0.8,
    "lineColor": "#6B7280",
    "lineStyle": "dotted",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "pinkMillimeter",
    "key": "pinkMillimeter",
    "group": "standard",
    "icon": "pink-grid",
    "lineSpacing": 1,
    "lineWidth": 0.3,
    "lineColor": "#EC4899",
    "lineStyle": "solid",
    "margins": {
      "top": 10,
      "bottom": 10,
      "left": 10,
      "right": 10
    }
  },
  {
    "id": "blankPaper",
    "key": "blankPaper",
    "group": "standard",
    "icon": "blank",
    "lineSpacing": 0,
    "lineWidth": 0,
    "lineColor": "transparent",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "musicPaper",
    "key": "musicPaper",
    "group": "standard",
    "icon": "music",
    "lineSpacing": 2,
    "lineWidth": 0.5,
    "lineColor": "#1F2937",
    "lineStyle": "solid",
    "margins": {
      "top": 25,
      "bottom": 25,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "guitarTab",
    "key": "guitarTab",
    "group": "standard",
    "icon": "guitar",
    "lineSpacing": 2.5,
    "lineWidth": 0.5,
    "lineColor": "#1F2937",
    "lineStyle": "solid",
    "margins": {
      "top": 25,
      "bottom": 25,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "ukuleleTab",
    "key": "ukuleleTab",
    "group": "standard",
    "icon": "ukulele",
    "lineSpacing": 3,
    "lineWidth": 0.5,
    "lineColor": "#1F2937",
    "lineStyle": "solid",
    "margins": {
      "top": 25,
      "bottom": 25,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "guitarChord",
    "key": "guitarChord",
    "group": "standard",
    "icon": "guitar-chord",
    "lineSpacing": 2,
    "lineWidth": 0.5,
    "lineColor": "#1F2937",
    "lineStyle": "solid",
    "margins": {
      "top": 30,
      "bottom": 30,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "calligraphy",
    "key": "calligraphy",
    "group": "standard",
    "icon": "calligraphy",
    "lineSpacing": 8,
    "lineWidth": 0.4,
    "lineColor": "#D1D5DB",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "hexagonalGrid",
    "key": "hexagonalGrid",
    "group": "standard",
    "icon": "hexagonal",
    "lineSpacing": 6,
    "lineWidth": 0.4,
    "lineColor": "#D1D5DB",
    "lineStyle": "solid",
    "margins": {
      "top": 15,
      "bottom": 15,
      "left": 15,
      "right": 15
    }
  },
  {
    "id": "seyesGrid",
    "key": "seyesGrid",
    "group": "standard",
    "icon": "seyes",
    "lineSpacing": 8,
    "lineWidth": 0.5,
    "lineColor": "#7B68EE",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 30,
      "right": 20
    }
  },
  {
    "id": "pinyinPractice",
    "key": "pinyinPractice",
    "group": "homework",
    "icon": "pinyin",
    "lineSpacing": 16,
    "lineWidth": 0.4,
    "lineColor": "#EF4444",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "pinyinTianzi",
    "key": "pinyinTianzi",
    "group": "homework",
    "icon": "pinyin",
    "lineSpacing": 16,
    "lineWidth": 0.4,
    "lineColor": "#EF4444",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "compositionPaper",
    "key": "compositionPaper",
    "group": "homework",
    "icon": "lined",
    "lineSpacing": 8,
    "lineWidth": 0.5,
    "lineColor": "#3B82F6",
    "lineStyle": "solid",
    "margins": {
      "top": 30,
      "bottom": 20,
      "left": 30,
      "right": 20
    }
  },
  {
    "id": "japaneseManuscript",
    "key": "japaneseManuscript",
    "group": "homework",
    "icon": "grid",
    "lineSpacing": 6,
    "lineWidth": 0.4,
    "lineColor": "#10B981",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "arithmeticPaper",
    "key": "arithmeticPaper",
    "group": "homework",
    "icon": "grid",
    "lineSpacing": 7,
    "lineWidth": 0.4,
    "lineColor": "#4B5563",
    "lineStyle": "solid",
    "margins": {
      "top": 15,
      "bottom": 15,
      "left": 15,
      "right": 15
    }
  },
  {
    "id": "englishPractice",
    "key": "englishPractice",
    "group": "homework",
    "icon": "lined",
    "lineSpacing": 4,
    "lineWidth": 0.4,
    "lineColor": "#3B82F6",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "englishHandwriting",
    "key": "englishHandwriting",
    "group": "homework",
    "icon": "lined",
    "lineSpacing": 5,
    "lineWidth": 0.4,
    "lineColor": "#3B82F6",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "usChildrenHandwriting",
    "key": "usChildrenHandwriting",
    "group": "homework",
    "icon": "lined",
    "lineSpacing": 6,
    "lineWidth": 0.4,
    "lineColor": "#3B82F6",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "germanThreeLine",
    "key": "germanThreeLine",
    "group": "homework",
    "icon": "lined",
    "lineSpacing": 5,
    "lineWidth": 0.4,
    "lineColor": "#4B5563",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "germanThreeLineBorder",
    "key": "germanThreeLineBorder",
    "group": "homework",
    "icon": "lined",
    "lineSpacing": 5,
    "lineWidth": 0.4,
    "lineColor": "#4B5563",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "lineatur3",
    "key": "lineatur3",
    "group": "homework",
    "icon": "lined",
    "lineSpacing": 5,
    "lineWidth": 0.4,
    "lineColor": "#4B5563",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "brazilianCalligraphy",
    "key": "brazilianCalligraphy",
    "group": "homework",
    "icon": "calligraphy",
    "lineSpacing": 6,
    "lineWidth": 0.4,
    "lineColor": "#9CA3AF",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "practicePaper",
    "key": "practicePaper",
    "group": "homework",
    "icon": "lined",
    "lineSpacing": 8,
    "lineWidth": 0.5,
    "lineColor": "#4B5563",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "miZiGe",
    "key": "miZiGe",
    "group": "calligraphy",
    "icon": "pinyin",
    "lineSpacing": 18,
    "lineWidth": 0.4,
    "lineColor": "#EF4444",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "huiGongGe",
    "key": "huiGongGe",
    "group": "calligraphy",
    "icon": "grid",
    "lineSpacing": 18,
    "lineWidth": 0.4,
    "lineColor": "#EF4444",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "jiuGongGe",
    "key": "jiuGongGe",
    "group": "calligraphy",
    "icon": "grid",
    "lineSpacing": 18,
    "lineWidth": 0.4,
    "lineColor": "#EF4444",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "chineseTianzi",
    "key": "chineseTianzi",
    "group": "calligraphy",
    "icon": "pinyin",
    "lineSpacing": 18,
    "lineWidth": 0.4,
    "lineColor": "#EF4444",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "crossGrid",
    "key": "crossGrid",
    "group": "calligraphy",
    "icon": "grid",
    "lineSpacing": 10,
    "lineWidth": 0.4,
    "lineColor": "#D1D5DB",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "knittingGraph",
    "key": "knittingGraph",
    "group": "calligraphy",
    "icon": "grid",
    "lineSpacing": 5,
    "lineWidth": 0.4,
    "lineColor": "#A5C4D4",
    "lineStyle": "solid",
    "margins": {
      "top": 15,
      "bottom": 15,
      "left": 15,
      "right": 15
    }
  },
  {
    "id": "hardpenHuiGong",
    "key": "hardpenHuiGong",
    "group": "calligraphy",
    "icon": "grid",
    "lineSpacing": 12,
    "lineWidth": 0.4,
    "lineColor": "#4B5563",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "architectGrid",
    "key": "architectGrid",
    "group": "architect",
    "icon": "architect",
    "lineSpacing": 10,
    "lineWidth": 0.4,
    "lineColor": "#2B2B2B",
    "lineStyle": "solid",
    "margins": {
      "top": 10,
      "bottom": 10,
      "left": 10,
      "right": 10
    }
  },
  {
    "id": "interiorLayout",
    "key": "interiorLayout",
    "group": "architect",
    "icon": "interior",
    "lineSpacing": 5,
    "lineWidth": 0.4,
    "lineColor": "#1E3A8A",
    "lineStyle": "solid",
    "margins": {
      "top": 12,
      "bottom": 12,
      "left": 12,
      "right": 12
    }
  },
  {
    "id": "isometricGrid",
    "key": "isometricGrid",
    "group": "architect",
    "icon": "isometric",
    "lineSpacing": 5,
    "lineWidth": 0.4,
    "lineColor": "#A5C4D4",
    "lineStyle": "solid",
    "margins": {
      "top": 15,
      "bottom": 15,
      "left": 15,
      "right": 15
    }
  },
  {
    "id": "perspectiveGrid",
    "key": "perspectiveGrid",
    "group": "architect",
    "icon": "perspective",
    "lineSpacing": 8,
    "lineWidth": 0.4,
    "lineColor": "#93C5FD",
    "lineStyle": "solid",
    "margins": {
      "top": 15,
      "bottom": 15,
      "left": 15,
      "right": 15
    }
  },
  {
    "id": "comicStoryboard",
    "key": "comicStoryboard",
    "group": "drawing",
    "icon": "comic",
    "lineSpacing": 5,
    "lineWidth": 0.8,
    "lineColor": "#111827",
    "lineStyle": "solid",
    "margins": {
      "top": 15,
      "bottom": 15,
      "left": 15,
      "right": 15
    }
  },
  {
    "id": "goldenRatioSketch",
    "key": "goldenRatioSketch",
    "group": "drawing",
    "icon": "golden-ratio",
    "lineSpacing": 6,
    "lineWidth": 0.3,
    "lineColor": "#9CA3AF",
    "lineStyle": "solid",
    "margins": {
      "top": 15,
      "bottom": 15,
      "left": 15,
      "right": 15
    }
  },
  {
    "id": "storyboard",
    "key": "storyboard",
    "group": "drawing",
    "icon": "storyboard",
    "lineSpacing": 6,
    "lineWidth": 0.5,
    "lineColor": "#374151",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "sketchPaper",
    "key": "sketchPaper",
    "group": "drawing",
    "icon": "blank",
    "lineSpacing": 10,
    "lineWidth": 0.3,
    "lineColor": "#D1D5DB",
    "lineStyle": "solid",
    "margins": {
      "top": 15,
      "bottom": 15,
      "left": 15,
      "right": 15
    }
  },
  {
    "id": "childrenDrawing",
    "key": "childrenDrawing",
    "group": "drawing",
    "icon": "storyboard",
    "lineSpacing": 8,
    "lineWidth": 0.5,
    "lineColor": "#4B5563",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "vocabularyStudy",
    "key": "vocabularyStudy",
    "group": "learning",
    "icon": "vocab",
    "lineSpacing": 7,
    "lineWidth": 0.4,
    "lineColor": "#4B5563",
    "lineStyle": "solid",
    "margins": {
      "top": 15,
      "bottom": 15,
      "left": 15,
      "right": 15
    }
  },
  {
    "id": "mindMapGrid",
    "key": "mindMapGrid",
    "group": "learning",
    "icon": "mind-map",
    "lineSpacing": 8,
    "lineWidth": 0.4,
    "lineColor": "#A5C4D4",
    "lineStyle": "solid",
    "margins": {
      "top": 15,
      "bottom": 15,
      "left": 15,
      "right": 15
    }
  },
  {
    "id": "cornellNotes",
    "key": "cornellNotes",
    "group": "learning",
    "icon": "cornell",
    "lineSpacing": 7,
    "lineWidth": 0.5,
    "lineColor": "#4A7C59",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "studentNote",
    "key": "studentNote",
    "group": "learning",
    "icon": "split-column",
    "lineSpacing": 8,
    "lineWidth": 0.5,
    "lineColor": "#4B5563",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 25,
      "right": 20
    }
  },
  {
    "id": "errorCorrection",
    "key": "errorCorrection",
    "group": "learning",
    "icon": "split-column",
    "lineSpacing": 7,
    "lineWidth": 0.5,
    "lineColor": "#EF4444",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "braillePractice",
    "key": "braillePractice",
    "group": "learning",
    "icon": "dot",
    "lineSpacing": 6,
    "lineWidth": 0.8,
    "lineColor": "#D1D5DB",
    "lineStyle": "dotted",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "chronodexPlanner",
    "key": "chronodexPlanner",
    "group": "notes",
    "icon": "chronodex",
    "lineSpacing": 6,
    "lineWidth": 0.4,
    "lineColor": "#2B2B2B",
    "lineStyle": "solid",
    "margins": {
      "top": 15,
      "bottom": 15,
      "left": 15,
      "right": 15
    }
  },
  {
    "id": "weeklyPlanner",
    "key": "weeklyPlanner",
    "group": "notes",
    "icon": "weekly",
    "lineSpacing": 6,
    "lineWidth": 0.4,
    "lineColor": "#374151",
    "lineStyle": "solid",
    "margins": {
      "top": 15,
      "bottom": 15,
      "left": 15,
      "right": 15
    }
  },
  {
    "id": "habitTracker",
    "key": "habitTracker",
    "group": "notes",
    "icon": "habit",
    "lineSpacing": 5,
    "lineWidth": 0.4,
    "lineColor": "#4B5563",
    "lineStyle": "solid",
    "margins": {
      "top": 15,
      "bottom": 15,
      "left": 15,
      "right": 15
    }
  },
  {
    "id": "vintageNote",
    "key": "vintageNote",
    "group": "notes",
    "icon": "lined",
    "lineSpacing": 8,
    "lineWidth": 0.5,
    "lineColor": "#B45309",
    "lineStyle": "solid",
    "margins": {
      "top": 25,
      "bottom": 25,
      "left": 25,
      "right": 25
    }
  },
  {
    "id": "minimalJournal",
    "key": "minimalJournal",
    "group": "notes",
    "icon": "cornell",
    "lineSpacing": 6,
    "lineWidth": 0.4,
    "lineColor": "#9CA3AF",
    "lineStyle": "solid",
    "margins": {
      "top": 25,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "meetingNote",
    "key": "meetingNote",
    "group": "notes",
    "icon": "cornell",
    "lineSpacing": 7,
    "lineWidth": 0.5,
    "lineColor": "#374151",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "projectPlanning",
    "key": "projectPlanning",
    "group": "notes",
    "icon": "storyboard",
    "lineSpacing": 6,
    "lineWidth": 0.5,
    "lineColor": "#374151",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "taskPlanning",
    "key": "taskPlanning",
    "group": "notes",
    "icon": "split-column",
    "lineSpacing": 7,
    "lineWidth": 0.5,
    "lineColor": "#4B5563",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "creativeLog",
    "key": "creativeLog",
    "group": "notes",
    "icon": "cornell",
    "lineSpacing": 7,
    "lineWidth": 0.4,
    "lineColor": "#4B5563",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "brandedPaper",
    "key": "brandedPaper",
    "group": "notes",
    "icon": "lined",
    "lineSpacing": 8,
    "lineWidth": 0.5,
    "lineColor": "#1E3A8A",
    "lineStyle": "solid",
    "margins": {
      "top": 25,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  },
  {
    "id": "splitColumn",
    "key": "splitColumn",
    "group": "notes",
    "icon": "split-column",
    "lineSpacing": 7,
    "lineWidth": 0.5,
    "lineColor": "#4B5563",
    "lineStyle": "solid",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    }
  }
];

export const translations: Record<'vi' | 'en', Record<string, string>> = {
  vi: {
  "appName": "CuongPaPer",
  "appSubtitle": "Thiết kế & tải mẫu giấy in trong vài giây",
  "templatesMenu": "Thư viện mẫu",
  "myPapersMenu": "Giấy của tôi",
  "customDesignMenu": "Tự thiết kế",
  "exploreMenu": "Khám phá",
  "proLabel": "Bản Pro",
  "settingsTab": "Cấu hình",
  "backgroundTab": "Hình nền",
  "exportSection": "Định dạng xuất file",
  "paperTypeSection": "Loại mẫu giấy",
  "paperSizeSection": "Khổ giấy",
  "orientationSection": "Chiều giấy",
  "portraitLabel": "Chiều dọc",
  "landscapeLabel": "Chiều ngang",
  "lineStyleSection": "Kiểu dòng kẻ",
  "lineColorSection": "Màu dòng kẻ",
  "spacingSection": "Khoảng cách dòng",
  "widthSection": "Độ đậm dòng kẻ",
  "marginsSection": "Kích thước lề (mm)",
  "topLabel": "Trên",
  "bottomLabel": "Dưới",
  "leftLabel": "Trái",
  "rightLabel": "Phải",
  "btnReset": "Đặt lại",
  "btnApply": "Áp dụng",
  "rulersLabel": "Thước đo",
  "linesCount": "Số dòng",
  "customColor": "Tùy chọn màu...",
  "preparingPdf": "Đang tạo bản in PDF...",
  "preparingImage": "Đang xuất file ảnh chất lượng cao...",
  "viewAll": "Xem tất cả",
  "lines": "dòng",
  "dateLabel": "Ngày:",
  "groupStandard": "Giấy thông dụng",
  "groupHomework": "Giấy làm bài tập",
  "groupCalligraphy": "Giấy luyện chữ",
  "groupArchitect": "Thiết kế & Kiến trúc",
  "groupDrawing": "Hội họa & Mỹ thuật",
  "groupLearning": "Học tập & Tư duy",
  "groupNotes": "Ghi chú & Kế hoạch",
  "customWidthLabel": "Chiều rộng (mm)",
  "customHeightLabel": "Chiều cao (mm)",
  "customPaperSize": "Khổ giấy tùy chọn",
  "linedPaper": "Giấy kẻ ngang",
  "verticalLined": "Giấy kẻ ngang lề dọc",
  "gridPaper": "Giấy kẻ ô vuông (Caro)",
  "dotPaper": "Giấy chấm bi (Dot Grid)",
  "pinkMillimeter": "Lưới milimet hồng",
  "splitColumn": "Giấy ghi chú chia cột",
  "blankPaper": "Giấy trắng tinh",
  "musicPaper": "Giấy chép nhạc (Ngũ tuyến)",
  "guitarTab": "Khuông nhạc Guitar TAB",
  "ukuleleTab": "Khuông nhạc Ukulele TAB",
  "guitarChord": "Sơ đồ hợp âm + Khuông nhạc",
  "calligraphy": "Giấy luyện chữ nghệ thuật",
  "cornellNotes": "Mẫu ghi chú Cornell",
  "isometricGrid": "Lưới vẽ 3D Isometric",
  "perspectiveGrid": "Lưới vẽ phối cảnh",
  "hexagonalGrid": "Lưới ô lục giác (Tổ ong)",
  "seyesGrid": "Giấy ô ly Seyes (Pháp)",
  "storyboard": "Khung phân cảnh Storyboard",
  "pinyinPractice": "Giấy ô Pinyin",
  "pinyinTianzi": "Giấy ô Tianzi Pinyin",
  "compositionPaper": "Giấy Tập viết (Composition)",
  "japaneseManuscript": "Bản thảo Nhật (Genkō yōshi)",
  "arithmeticPaper": "Giấy kẻ ô toán học",
  "englishPractice": "Tập viết Tiếng Anh",
  "englishHandwriting": "Luyện chữ Tiếng Anh",
  "usChildrenHandwriting": "Giấy viết trẻ em Mỹ",
  "germanThreeLine": "Giấy 3 dòng Đức (German)",
  "germanThreeLineBorder": "Giấy 3 dòng Đức (có viền)",
  "lineatur3": "Giấy Lineatur 3 (Đức)",
  "brazilianCalligraphy": "Calligraphy Brazil",
  "practicePaper": "Giấy Tập viết chung",
  "braillePractice": "Giấy chữ nổi Braille",
  "miZiGe": "Giấy ô chữ Mễ (Mi Zi Ge)",
  "huiGongGe": "Giấy ô chữ Hồi (Hui Gong Ge)",
  "jiuGongGe": "Giấy ô Cửu Cung (Jiu Gong)",
  "chineseTianzi": "Giấy ô chữ Điền (Tianzi)",
  "crossGrid": "Lưới ô chữ thập",
  "knittingGraph": "Giấy vẽ đan len",
  "hardpenHuiGong": "Giấy ô chữ Hồi bút mực",
  "vintageNote": "Sổ tay Vintage",
  "childrenDrawing": "Giấy vẽ & viết trẻ em",
  "minimalJournal": "Nhật ký tối giản",
  "studentNote": "Ghi chép học sinh",
  "meetingNote": "Ghi chép cuộc họp",
  "projectPlanning": "Lập kế hoạch dự án",
  "taskPlanning": "Phân chia công việc",
  "sketchPaper": "Giấy vẽ phác thảo",
  "creativeLog": "Nhật ký sáng tạo",
  "brandedPaper": "Giấy in thương hiệu",
  "errorCorrection": "Bảng sửa lỗi sai",
  "chronodexPlanner": "Lập kế hoạch vòng tròn (Chronodex)",
  "weeklyPlanner": "Kế hoạch tuần (Weekly Planner)",
  "habitTracker": "Theo dõi thói quen (Habit Tracker)",
  "architectGrid": "Bản vẽ thiết kế & kỹ thuật",
  "interiorLayout": "Mặt bằng nội thất 2D",
  "comicStoryboard": "Khung truyện tranh (Manga)",
  "goldenRatioSketch": "Phác thảo Tỷ lệ vàng",
  "mindMapGrid": "Sơ đồ tư duy (Mind Map)",
  "vocabularyStudy": "Sổ học từ vựng (Vocabulary)"
},
  en: {
  "appName": "CuongPaPer",
  "appSubtitle": "Create beautiful papers in seconds",
  "templatesMenu": "Templates",
  "myPapersMenu": "My Papers",
  "customDesignMenu": "Custom Design",
  "exploreMenu": "Explore",
  "proLabel": "Pro",
  "settingsTab": "Settings",
  "backgroundTab": "Background",
  "exportSection": "Export Formats",
  "paperTypeSection": "Paper Type",
  "paperSizeSection": "Paper Size",
  "orientationSection": "Orientation",
  "portraitLabel": "Portrait",
  "landscapeLabel": "Landscape",
  "lineStyleSection": "Line Style",
  "lineColorSection": "Line Color",
  "spacingSection": "Line Spacing",
  "widthSection": "Line Width",
  "marginsSection": "Margins (mm)",
  "topLabel": "Top",
  "bottomLabel": "Bottom",
  "leftLabel": "Left",
  "rightLabel": "Right",
  "btnReset": "Reset",
  "btnApply": "Apply Changes",
  "rulersLabel": "Rulers",
  "linesCount": "Lines",
  "customColor": "Custom Color...",
  "preparingPdf": "Preparing vector PDF...",
  "preparingImage": "Generating high-DPI image...",
  "viewAll": "View all",
  "lines": "lines",
  "dateLabel": "Date:",
  "groupStandard": "Standard Papers",
  "groupHomework": "Homework Papers",
  "groupCalligraphy": "Calligraphy Practice Papers",
  "groupArchitect": "Architecture & Design",
  "groupDrawing": "Drawing & Art",
  "groupLearning": "Learning & Education",
  "groupNotes": "Notes & Planning",
  "customWidthLabel": "Width (mm)",
  "customHeightLabel": "Height (mm)",
  "customPaperSize": "Custom Size",
  "linedPaper": "Lined Paper",
  "verticalLined": "Vertical Lined Paper",
  "gridPaper": "Grid Paper",
  "dotPaper": "Dot Paper",
  "pinkMillimeter": "Pink Millimeter Grid",
  "splitColumn": "Split-Column Note Paper",
  "blankPaper": "Blank Paper",
  "musicPaper": "Music Paper",
  "guitarTab": "Guitar Tab",
  "ukuleleTab": "Staff + Ukulele TAB",
  "guitarChord": "Treble Staff + Guitar Chord",
  "calligraphy": "Calligraphy Paper",
  "cornellNotes": "Cornell Notes",
  "isometricGrid": "Isometric Grid",
  "perspectiveGrid": "Perspective Sketch Grid",
  "hexagonalGrid": "Hexagonal Grid",
  "seyesGrid": "Seyes Grid",
  "storyboard": "Storyboard",
  "pinyinPractice": "Pinyin Practice Paper",
  "pinyinTianzi": "Pinyin Tianzi Grid",
  "compositionPaper": "Composition Paper",
  "japaneseManuscript": "Japanese manuscript (Genkō yōshi)",
  "arithmeticPaper": "Arithmetic Paper",
  "englishPractice": "English Practice Paper",
  "englishHandwriting": "English handwriting practice paper",
  "usChildrenHandwriting": "US children's handwriting paper",
  "germanThreeLine": "German Three-Line Practice Paper",
  "germanThreeLineBorder": "German Three-Line (with border)",
  "lineatur3": "Lineatur 3 (Grade 3, Germany)",
  "brazilianCalligraphy": "Brazilian Calligraphy (Caderno de Caligrafia)",
  "practicePaper": "Practice Paper",
  "braillePractice": "Braille Practice Paper",
  "miZiGe": "Mi Zi Ge",
  "huiGongGe": "Hui Gong Ge",
  "jiuGongGe": "Jiu Gong Ge",
  "chineseTianzi": "Chinese Tianzi Grid",
  "crossGrid": "Cross Grid",
  "knittingGraph": "Knitting Graph Paper",
  "hardpenHuiGong": "Hardpen Hui Gong Ge",
  "vintageNote": "Vintage Note",
  "childrenDrawing": "Children Drawing",
  "minimalJournal": "Minimal Journal",
  "studentNote": "Student Note",
  "meetingNote": "Meeting Note",
  "projectPlanning": "Project Planning",
  "taskPlanning": "Task Planning Sheet",
  "sketchPaper": "Sketch Paper",
  "creativeLog": "Creative Log",
  "brandedPaper": "Branded Paper",
  "errorCorrection": "Error Correction",
  "chronodexPlanner": "Chronodex Daily Planner",
  "weeklyPlanner": "Weekly Planner Sheet",
  "habitTracker": "Habit Tracker",
  "architectGrid": "Architectural Engineering Grid",
  "interiorLayout": "2D Interior Layout Board",
  "comicStoryboard": "Comic Book Storyboard Grid",
  "goldenRatioSketch": "Golden Ratio Sketch Sheet",
  "mindMapGrid": "Mind Map Concept Grid",
  "vocabularyStudy": "Vocabulary Learning Tracker"
},
};

export const defaultPaperSettings: PaperSettings = {
  paperType: "linedPaper",
  paperSize: "A4",
  customWidth: 210,
  customHeight: 297,
  orientation: "Portrait",
  lineSpacing: 8,
  lineWidth: 0.5,
  lineColor: "#4A7C59",
  lineStyle: "solid",
  margins: { top: 20, bottom: 20, left: 20, right: 20 },
};

export const standardPaperSizes: Record<string, string> = {
  A4: "210 × 297 mm",
  A5: "148 × 210 mm",
  A3: "297 × 420 mm",
  B4: "250 × 353 mm",
  B5: "176 × 250 mm",
  Letter: "8.5 × 11 in",
  Legal: "8.5 × 14 in",
  Tabloid: "11 × 17 in",
  Executive: "7.25 × 10.5 in",
};
