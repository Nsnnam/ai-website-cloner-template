'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import {
  PaperSettings,
  PaperTemplateConfig,
  PaperSize,
  LineStyle,
  Language,
  ThemeMode,
} from './types';
import {
  paperTemplates,
  translations,
  defaultPaperSettings,
  standardPaperSizes,
} from './templates-data';
import { renderPaper, calcPaperDimensions } from './draw-paper';
import { Icon } from './icons';
import { NsNLogo } from './logo';
import { CursorTrail } from './cursor-trail';
import { playClickSound, playRustleSound, playPrintSound } from './audio';
import { NSN_APP_META } from '@/lib/meta';
import { getExportFileName } from '@/lib/date-utils';
import './cuongpaper.css';

const COLOR_PRESETS = [
  '#2B2B2B',
  '#1E3A8A',
  '#3B82F6',
  '#4A7C59',
  '#E2725B',
  '#EC4899',
  '#6B7280',
  '#D1D5DB',
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const CuongPaperApp: React.FC = () => {
  const [settings, setSettings] = useState<PaperSettings>(defaultPaperSettings);
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [lang, setLang] = useState<Language>('vi');
  const [zoom, setZoom] = useState<number>(75);
  const [showRulers, setShowRulers] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [historyStack, setHistoryStack] = useState<PaperSettings[]>([]);
  const [redoStack, setRedoStack] = useState<PaperSettings[]>([]);
  const [activeTab, setActiveTab] = useState<'custom' | 'templates' | 'guide' | 'about' | 'coffee'>('custom');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [linesCount, setLinesCount] = useState<number>(0);
  const [canvasDims, setCanvasDims] = useState<{ width: number; height: number }>({ width: 794, height: 1123 });
  const [copiedStk, setCopiedStk] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize client state with NSN standard keys
  useEffect(() => {
    setIsClient(true);
    const savedTheme =
      (localStorage.getItem('nsn-giayin-theme') as ThemeMode) ||
      (localStorage.getItem('nsn-cuongpaper-theme') as ThemeMode) ||
      (localStorage.getItem('paperme_theme') as ThemeMode) ||
      'light';
    const savedLang =
      (localStorage.getItem('nsn-giayin-lang') as Language) ||
      (localStorage.getItem('nsn-cuongpaper-lang') as Language) ||
      (localStorage.getItem('paperme_lang') as Language) ||
      'vi';
    setTheme(savedTheme);
    setLang(savedLang);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedSettings =
      localStorage.getItem('nsn-giayin-settings') ||
      localStorage.getItem('nsn-cuongpaper-settings') ||
      localStorage.getItem('paperme_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch {
        setSettings(defaultPaperSettings);
      }
    }

    if (window.innerWidth < 768) {
      setZoom(45);
    } else if (window.innerWidth < 1200) {
      setZoom(60);
    } else {
      setZoom(75);
    }
  }, []);

  // Update theme on document
  useEffect(() => {
    if (!isClient) return;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nsn-giayin-theme', theme);
  }, [theme, isClient]);

  // Update lang in localStorage
  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem('nsn-giayin-lang', lang);
  }, [lang, isClient]);

  // Push history and update settings
  const updateSettings = useCallback(
    (newSettings: Partial<PaperSettings> | ((prev: PaperSettings) => PaperSettings)) => {
      setSettings((prev) => {
        const next = typeof newSettings === 'function' ? newSettings(prev) : { ...prev, ...newSettings };
        setHistoryStack((stack) => [...stack.slice(-20), prev]);
        setRedoStack([]);
        if (typeof window !== 'undefined') {
          localStorage.setItem('nsn-giayin-settings', JSON.stringify(next));
        }
        return next;
      });
    },
    []
  );

  // Undo / Redo
  const handleUndo = useCallback(() => {
    if (historyStack.length === 0) return;
    playClickSound();
    const prev = historyStack[historyStack.length - 1];
    setHistoryStack((s) => s.slice(0, -1));
    setRedoStack((r) => [...r, settings]);
    setSettings(prev);
    localStorage.setItem('nsn-giayin-settings', JSON.stringify(prev));
  }, [historyStack, settings]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;
    playClickSound();
    const next = redoStack[redoStack.length - 1];
    setRedoStack((r) => r.slice(0, -1));
    setHistoryStack((s) => [...s, settings]);
    setSettings(next);
    localStorage.setItem('nsn-giayin-settings', JSON.stringify(next));
  }, [redoStack, settings]);

  // Redraw paper canvas helper
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const count = renderPaper(canvas, settings, 96, {
        showMarginsGuide: showRulers,
        hideHeader: false,
        lang,
      });
      setLinesCount(count);
      setCanvasDims({ width: canvas.width, height: canvas.height });
    } catch (e) {
      console.error('Error rendering paper canvas:', e);
    }
  }, [settings, lang, showRulers]);

  // Canvas render effect
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Font readiness redraw to ensure crisp Vietnamese typography
  useEffect(() => {
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        drawCanvas();
      });
    }
  }, [drawCanvas]);

  const t = translations[lang] || translations.vi;

  // Format Status Label
  let sizeLabel: string = settings.paperSize;
  if (sizeLabel === 'Custom') {
    sizeLabel = `${t.customPaperSize || 'Khổ tùy chọn'} (${settings.customWidth} × ${settings.customHeight} mm)`;
  } else {
    sizeLabel = `${sizeLabel} (${standardPaperSizes[sizeLabel] || ''})`;
  }
  const orientationLabel = t[settings.orientation === 'Portrait' ? 'portraitLabel' : 'landscapeLabel'];
  const templateNameLabel = t[settings.paperType] || settings.paperType;

  // Change paper template
  const selectTemplate = (template: PaperTemplateConfig) => {
    playRustleSound();
    updateSettings({
      paperType: template.id,
      lineSpacing: template.lineSpacing > 0 ? template.lineSpacing : settings.lineSpacing,
      lineWidth: template.lineWidth > 0 ? template.lineWidth : settings.lineWidth,
      lineColor: template.lineColor !== 'transparent' ? template.lineColor : settings.lineColor,
      lineStyle: template.lineStyle || 'solid',
      margins: template.margins ? { ...template.margins } : settings.margins,
    });
    if (activeTab === 'templates') {
      setActiveTab('custom');
    }
  };

  // Export handling with GMT+7 filenames
  const handleExport = async (format: 'pdf' | 'png' | 'jpg' | 'docx') => {
    playPrintSound();
    setStatusMessage(format === 'pdf' ? t.preparingPdf || 'Đang tạo PDF...' : t.preparingImage || 'Đang xuất ảnh...');

    setTimeout(() => {
      try {
        const offscreenCanvas = document.createElement('canvas');
        renderPaper(offscreenCanvas, settings, 300, {
          showMarginsGuide: false,
          hideHeader: false,
          lang,
        });

        const dims = calcPaperDimensions(
          settings.paperSize,
          settings.orientation,
          300,
          settings.customWidth,
          settings.customHeight
        );

        const filename = getExportFileName(settings.paperType, format === 'docx' ? 'doc' : format);

        if (format === 'pdf') {
          const pdfFormat =
            settings.paperSize === 'Custom'
              ? [settings.customWidth, settings.customHeight]
              : settings.paperSize.toLowerCase();

          const pdf = new jsPDF({
            orientation: settings.orientation.toLowerCase() as 'portrait' | 'landscape',
            unit: 'mm',
            format: pdfFormat,
            compress: true,
          });

          const imgData = offscreenCanvas.toDataURL('image/jpeg', 0.92);
          pdf.addImage(imgData, 'JPEG', 0, 0, dims.widthMm, dims.heightMm, undefined, 'FAST');
          pdf.save(filename);
        } else if (format === 'png') {
          const link = document.createElement('a');
          link.download = filename;
          link.href = offscreenCanvas.toDataURL('image/png');
          link.click();
        } else if (format === 'jpg') {
          const link = document.createElement('a');
          link.download = filename;
          link.href = offscreenCanvas.toDataURL('image/jpeg', 0.9);
          link.click();
        } else if (format === 'docx') {
          const imgData = offscreenCanvas.toDataURL('image/jpeg', 0.9);
          const docHtml = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<title>NsN_GiayIn Template</title>
<!--[if gte mso 9]>
<xml>
  <w:WordDocument>
    <w:View>Print</w:View>
    <w:Zoom>100</w:Zoom>
    <w:DoNotOptimizeForBrowser/>
  </w:WordDocument>
</xml>
<![endif]-->
<style>
@page Section1 {
  size: ${dims.widthMm}mm ${dims.heightMm}mm;
  margin: 0in;
  mso-header-margin: 0in;
  mso-footer-margin: 0in;
}
div.Section1 { page: Section1; }
body { margin: 0; padding: 0; }
img { width: ${dims.widthMm}mm; height: ${dims.heightMm}mm; }
</style>
</head>
<body>
<div class="Section1">
  <img src="${imgData}" />
</div>
</body>
</html>`;
          const blob = new Blob([docHtml], { type: 'application/msword' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = filename;
          link.click();
        }
      } catch (err) {
        console.error('Export error:', err);
      } finally {
        setStatusMessage('');
      }
    }, 400);
  };

  // Direct Print
  const handlePrint = () => {
    playPrintSound();
    window.print();
  };

  // Copy STK
  const copyAccountNumber = () => {
    navigator.clipboard.writeText(NSN_APP_META.coffee.accountNumber);
    setCopiedStk(true);
    playClickSound();
    setTimeout(() => setCopiedStk(false), 2000);
  };

  // Filter templates for search
  const filteredTemplates = paperTemplates.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const viTitle = (translations.vi[item.key] || '').toLowerCase();
    const enTitle = (translations.en[item.key] || '').toLowerCase();
    return viTitle.includes(q) || enTitle.includes(q) || item.id.toLowerCase().includes(q);
  });

  // Group templates
  const templateGroups: Record<string, PaperTemplateConfig[]> = {};
  filteredTemplates.forEach((item) => {
    const grp = item.group || 'standard';
    if (!templateGroups[grp]) templateGroups[grp] = [];
    templateGroups[grp].push(item);
  });

  // Calculated wrapper dimensions to fix paper centering and avoid bottom drop
  const scale = zoom / 100;
  const wrapperWidth = Math.max(100, Math.round(canvasDims.width * scale));
  const wrapperHeight = Math.max(100, Math.round(canvasDims.height * scale));

  return (
    <div id="app" className="h-screen max-h-screen overflow-hidden flex flex-col bg-[var(--paperme-bg)] text-[var(--paperme-text)]">
      <CursorTrail theme={theme} />

      {/* App Header */}
      <header className="app-header flex-shrink-0">
        <div
          className="header-logo-section cursor-pointer group"
          onClick={() => {
            playClickSound();
            setActiveTab('custom');
          }}
        >
          <div className="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
            <NsNLogo className="w-9 h-9 drop-shadow-sm" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold tracking-tight flex items-center gap-1 leading-tight">
              <span className="text-[var(--paperme-accent)]">NsN</span>
              <span className="text-[var(--paperme-primary)]">_GiayIn</span>
            </h1>
            <span className="text-[10px] text-[var(--paperme-text-muted)] font-bold -mt-0.5 hidden sm:inline-block tracking-wide">
              Thiết kế & Tải Mẫu Giấy In
            </span>
          </div>
          <span className="hidden md:inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--paperme-primary-light)] text-[var(--paperme-primary)] ml-1 border border-[var(--paperme-primary)]/15">
            v{NSN_APP_META.version}
          </span>
        </div>

        <nav className="header-nav">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('templates');
            }}
            className={`nav-item ${activeTab === 'templates' ? 'active' : ''}`}
          >
            {t.templatesMenu || 'Thư viện mẫu'}
          </button>
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('custom');
            }}
            className={`nav-item ${activeTab === 'custom' ? 'active' : ''}`}
          >
            {t.customDesignMenu || 'Tự thiết kế'}
          </button>
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('guide');
            }}
            className={`nav-item ${activeTab === 'guide' ? 'active' : ''}`}
          >
            Hướng dẫn
          </button>
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('about');
            }}
            className={`nav-item ${activeTab === 'about' ? 'active' : ''}`}
          >
            Phiên bản
          </button>
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('coffee');
            }}
            className={`nav-item ${activeTab === 'coffee' ? 'active' : ''} text-[#B45309] font-bold`}
          >
            ☕ Mời cà phê
          </button>
        </nav>

        <div className="header-actions">
          <button
            className="action-btn theme-toggle-btn"
            onClick={() => {
              playClickSound();
              setTheme(theme === 'light' ? 'dark' : 'light');
            }}
            title="Đổi giao diện Sáng / Tối"
          >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} />
          </button>

          <button
            className="action-btn lang-toggle-btn"
            onClick={() => {
              playClickSound();
              setLang(lang === 'vi' ? 'en' : 'vi');
            }}
            title="Switch Language (VI/EN)"
          >
            {lang.toUpperCase()}
          </button>

          <button
            className="action-btn mobile-menu-btn md:hidden"
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
          >
            <Icon name="menu" />
          </button>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <button
            onClick={() => {
              setActiveTab('templates');
              setMobileMenuOpen(false);
            }}
            className={`mobile-nav-item ${activeTab === 'templates' ? 'active' : ''}`}
          >
            {t.templatesMenu || 'Thư viện mẫu'}
          </button>
          <button
            onClick={() => {
              setActiveTab('custom');
              setMobileMenuOpen(false);
            }}
            className={`mobile-nav-item ${activeTab === 'custom' ? 'active' : ''}`}
          >
            {t.customDesignMenu || 'Tự thiết kế'}
          </button>
          <button
            onClick={() => {
              setActiveTab('guide');
              setMobileMenuOpen(false);
            }}
            className={`mobile-nav-item ${activeTab === 'guide' ? 'active' : ''}`}
          >
            Hướng dẫn
          </button>
          <button
            onClick={() => {
              setActiveTab('about');
              setMobileMenuOpen(false);
            }}
            className={`mobile-nav-item ${activeTab === 'about' ? 'active' : ''}`}
          >
            Phiên bản
          </button>
          <button
            onClick={() => {
              setActiveTab('coffee');
              setMobileMenuOpen(false);
            }}
            className={`mobile-nav-item ${activeTab === 'coffee' ? 'active' : ''} text-[#B45309] font-bold`}
          >
            ☕ Mời cà phê
          </button>
        </div>
      )}

      {/* TAB CONTENT: HƯỚNG DẪN (GUIDE) */}
      {activeTab === 'guide' && (
        <div className="flex-1 overflow-auto p-6 bg-[var(--paperme-bg)]">
          <div className="max-w-4xl mx-auto w-full p-6 bg-[var(--paperme-card)] rounded-xl border border-[var(--paperme-border)] shadow-sm">
            <div className="flex justify-between items-center mb-6 border-b border-[var(--paperme-border)] pb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                📖 Hướng dẫn sử dụng NsN_GiayIn
              </h2>
              <button
                onClick={() => setActiveTab('custom')}
                className="text-sm px-3 py-1.5 rounded bg-[var(--paperme-primary)] text-white font-medium hover:opacity-90"
              >
                Vào Tự thiết kế &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[var(--paperme-bg)] border border-[var(--paperme-border)]">
                  <h3 className="font-bold text-base mb-2 text-[var(--paperme-primary)]">
                    1. Chọn loại mẫu giấy
                  </h3>
                  <p className="text-[var(--paperme-text-muted)]">
                    Khám phá hơn 50 mẫu giấy phong phú: kẻ ngang, ô ly tiểu học Seyes, chấm bi Dot grid,
                    khuông nhạc TAB, lưới vẽ 3D Isometric, phối cảnh, sơ đồ tư duy Mindmap, giấy Cornell notes,
                    luyện chữ Calligraphy, thời khóa biểu và sổ tay To-Do.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[var(--paperme-bg)] border border-[var(--paperme-border)]">
                  <h3 className="font-bold text-base mb-2 text-[var(--paperme-primary)]">
                    2. Khổ giấy & Tùy biến kích thước
                  </h3>
                  <p className="text-[var(--paperme-text-muted)]">
                    Hỗ trợ đầy đủ các khổ giấy tiêu chuẩn: <strong>A4, A5, A3, B4, B5, Letter, Legal</strong> hoặc
                    nhập kích thước tùy chọn theo chuẩn milimet (mm) chính xác tuyệt đối.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[var(--paperme-bg)] border border-[var(--paperme-border)]">
                  <h3 className="font-bold text-base mb-2 text-[var(--paperme-primary)]">
                    3. Căn chỉnh lề & Đường kẻ
                  </h3>
                  <p className="text-[var(--paperme-text-muted)]">
                    Tùy chỉnh khoảng cách dòng (spacing mm), độ đậm nét vẽ (lineWidth mm), màu sắc nét vẽ theo
                    bảng màu hoặc mã hex cá nhân. Tùy biến lề Trên, Dưới, Trái, Phải thuận tiện cho đóng gáy sổ.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[var(--paperme-bg)] border border-[var(--paperme-border)]">
                  <h3 className="font-bold text-base mb-2 text-[var(--paperme-primary)]">
                    4. Xuất file & In ấn chuẩn 100%
                  </h3>
                  <p className="text-[var(--paperme-text-muted)]">
                    - <strong>Xuất PDF (300 DPI):</strong> Vector sắc nét, phù hợp in ấn công nghiệp.<br />
                    - <strong>Xuất PNG / JPG:</strong> Lưu ảnh độ nét cao.<br />
                    - <strong>Xuất DOCX:</strong> Nhúng trực tiếp vào Microsoft Word.<br />
                    - <strong>Lưu ý khi in:</strong> Trong hộp thoại in của máy tính, chọn <em>Actual Size (100%)</em> để kích thước milimet in ra giấy chính xác 100%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PHIÊN BẢN & TÁC GIẢ (ABOUT) */}
      {activeTab === 'about' && (
        <div className="flex-1 overflow-auto p-6 bg-[var(--paperme-bg)]">
          <div className="max-w-3xl mx-auto w-full p-6 bg-[var(--paperme-card)] rounded-xl border border-[var(--paperme-border)] shadow-sm text-sm">
            <div className="flex justify-between items-center mb-6 border-b border-[var(--paperme-border)] pb-4">
              <h2 className="text-xl font-bold flex items-center gap-2.5">
                <NsNLogo className="w-6 h-6 inline-block" />
                Thông tin phiên bản & Tác giả
              </h2>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--paperme-primary-light)] text-[var(--paperme-primary)] font-bold">
                v{NSN_APP_META.version}
              </span>
            </div>

            <table className="w-full mb-6 text-sm border-collapse">
              <tbody>
                <tr className="border-b border-[var(--paperme-border)]">
                  <td className="py-2.5 font-bold w-1/3 text-[var(--paperme-text-muted)]">Ứng dụng</td>
                  <td className="py-2.5 font-bold">{NSN_APP_META.name}</td>
                </tr>
                <tr className="border-b border-[var(--paperme-border)]">
                  <td className="py-2.5 font-bold text-[var(--paperme-text-muted)]">Mã ứng dụng</td>
                  <td className="py-2.5 font-mono font-bold text-[var(--paperme-primary)]">{NSN_APP_META.appCode}</td>
                </tr>
                <tr className="border-b border-[var(--paperme-border)]">
                  <td className="py-2.5 font-bold text-[var(--paperme-text-muted)]">Tác giả</td>
                  <td className="py-2.5 font-semibold text-[var(--paperme-primary)]">
                    {NSN_APP_META.author}
                  </td>
                </tr>
                <tr className="border-b border-[var(--paperme-border)]">
                  <td className="py-2.5 font-bold text-[var(--paperme-text-muted)]">Múi giờ phát hành</td>
                  <td className="py-2.5">GMT+7 ({NSN_APP_META.timezone})</td>
                </tr>
                <tr className="border-b border-[var(--paperme-border)]">
                  <td className="py-2.5 font-bold text-[var(--paperme-text-muted)]">GitHub Repository</td>
                  <td className="py-2.5">
                    <a
                      href={NSN_APP_META.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--paperme-primary)] underline"
                    >
                      {NSN_APP_META.github}
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-[var(--paperme-border)]">
                  <td className="py-2.5 font-bold text-[var(--paperme-text-muted)]">Địa chỉ Web Online</td>
                  <td className="py-2.5">
                    <a
                      href={NSN_APP_META.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--paperme-accent)] underline font-semibold"
                    >
                      {NSN_APP_META.liveUrl}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mb-6">
              <h3 className="font-bold text-base mb-3">Lịch sử thay đổi (Changelog)</h3>
              <div className="space-y-4">
                {NSN_APP_META.changelog.map((log) => (
                  <div key={log.version} className="p-4 rounded-lg bg-[var(--paperme-bg)] border border-[var(--paperme-border)]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-[var(--paperme-primary)]">Phiên bản {log.version}</span>
                      <span className="text-xs text-[var(--paperme-text-muted)]">{log.date}</span>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--paperme-text-muted)]">
                      {log.changes.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: MỜI CÀ PHÊ (COFFEE) */}
      {activeTab === 'coffee' && (
        <div className="flex-1 overflow-auto p-6 bg-[var(--paperme-bg)] flex items-center justify-center">
          <div className="max-w-md mx-auto w-full p-6 bg-[var(--paperme-card)] rounded-2xl border border-[var(--paperme-border)] shadow-md text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-2xl">
              ☕
            </div>
            <h2 className="text-xl font-bold mb-2">{NSN_APP_META.coffee.title}</h2>
            <p className="text-xs text-[var(--paperme-text-muted)] mb-5 px-4">
              {NSN_APP_META.coffee.blurb}
            </p>

            <div className="p-4 rounded-xl bg-[var(--paperme-bg)] border border-[var(--paperme-border)] mb-5">
              <div className="flex justify-center mb-4">
                <img
                  src={`${basePath}/docs/coffee-qr.jpg`}
                  alt={NSN_APP_META.coffee.qrAlt}
                  width={180}
                  height={180}
                  className="rounded-lg shadow-sm border border-slate-200"
                />
              </div>

              <table className="w-full text-xs text-left border-collapse">
                <tbody>
                  <tr className="border-b border-[var(--paperme-border)]">
                    <td className="py-2.5 font-bold text-[var(--paperme-text-muted)]">Chủ TK</td>
                    <td className="py-2.5 font-bold text-right text-[var(--paperme-primary)]">
                      {NSN_APP_META.coffee.accountName}
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--paperme-border)]">
                    <td className="py-2.5 font-bold text-[var(--paperme-text-muted)]">Số TK</td>
                    <td className="py-2.5 font-mono font-bold text-right flex items-center justify-end gap-2">
                      <span className="text-sm">{NSN_APP_META.coffee.accountNumber}</span>
                      <button
                        onClick={copyAccountNumber}
                        className="px-2 py-0.5 rounded text-[10px] bg-[var(--paperme-primary)] text-white hover:opacity-90 transition"
                      >
                        {copiedStk ? 'Đã sao chép!' : 'Sao chép'}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-[var(--paperme-text-muted)]">Ngân hàng</td>
                    <td className="py-2.5 text-right">{NSN_APP_META.coffee.bank}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              {NSN_APP_META.coffee.thanks}
            </p>
          </div>
        </div>
      )}

      {/* TAB CONTENT: THƯ VIỆN MẪU (TEMPLATES OVERVIEW) */}
      {activeTab === 'templates' && (
        <div className="flex-1 overflow-auto p-6 bg-[var(--paperme-bg)]">
          <div className="max-w-5xl mx-auto w-full p-6 bg-[var(--paperme-card)] rounded-xl border border-[var(--paperme-border)] shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-[var(--paperme-border)] pb-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  📚 Thư viện 50+ Mẫu Giấy In Chất Lượng Cao
                </h2>
                <p className="text-xs text-[var(--paperme-text-muted)] mt-1">
                  Nhấp vào mẫu bất kỳ để tải vào bàn thiết kế và tùy biến thông số mm
                </p>
              </div>
              <div className="search-container !w-64 !m-0">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Tìm mẫu nhanh..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="search-icon-box">
                  <Icon name="search" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {Object.keys(templateGroups).map((grp) => {
                const grpLabel = t[`group${grp.charAt(0).toUpperCase() + grp.slice(1)}`] || grp;
                return (
                  <div key={grp}>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-[var(--paperme-primary)] mb-3 pb-1 border-b border-[var(--paperme-border)]">
                      {grpLabel} ({templateGroups[grp].length})
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {templateGroups[grp].map((tpl) => (
                        <button
                          key={tpl.id}
                          className={`p-3 rounded-xl border text-left transition flex flex-col items-center justify-center gap-2.5 hover:border-[var(--paperme-primary)] hover:shadow-sm ${
                            settings.paperType === tpl.id
                              ? 'border-[var(--paperme-primary)] bg-[var(--paperme-primary-light)]'
                              : 'border-[var(--paperme-border)] bg-[var(--paperme-bg)]'
                          }`}
                          onClick={() => selectTemplate(tpl)}
                        >
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--paperme-card)] border border-[var(--paperme-border)] text-[var(--paperme-primary)]">
                            <Icon name={tpl.icon} className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-semibold text-center line-clamp-2">
                            {t[tpl.key] || tpl.key}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: MAIN CUSTOM DESIGNER */}
      {activeTab === 'custom' && (
        <div className="app-container flex-1 min-h-0 overflow-hidden">
          {/* Left Sidebar: Controls & Settings */}
          <aside className="editor-sidebar flex-shrink-0 h-full overflow-hidden flex flex-col">
            <div className="sidebar-scroll-content flex-1 overflow-y-auto">
              {/* Quick Export Cards */}
              <section className="sidebar-group">
                <div className="sidebar-group-header">
                  <span>{t.exportSection || 'Định dạng xuất file'}</span>
                </div>
                <div className="sidebar-group-content">
                  <div className="export-formats-grid">
                    <button className="export-card pdf-card" onClick={() => handleExport('pdf')}>
                      <Icon name="pdf" />
                      PDF
                    </button>
                    <button className="export-card png-card" onClick={() => handleExport('png')}>
                      <Icon name="png" />
                      PNG
                    </button>
                    <button className="export-card jpg-card" onClick={() => handleExport('jpg')}>
                      <Icon name="jpg" />
                      JPG
                    </button>
                    <button className="export-card docx-card" onClick={() => handleExport('docx')}>
                      <Icon name="docx" />
                      DOCX
                    </button>
                  </div>
                  <button
                    className="w-full mt-2 py-2 px-3 rounded-lg border border-[var(--paperme-border)] bg-[var(--paperme-card)] hover:bg-[var(--paperme-primary-light)] font-bold text-xs flex items-center justify-center gap-2 transition"
                    onClick={handlePrint}
                  >
                    🖨️ In trực tiếp (Print)
                  </button>
                </div>
              </section>

              {/* Paper Properties Group */}
              <section className="sidebar-group">
                <div className="sidebar-group-header">
                  <span>{t.settingsTab || 'Cấu hình giấy'}</span>
                  <Icon name="chevronDown" />
                </div>
                <div className="sidebar-group-content">
                  {/* Paper Type */}
                  <div>
                    <label className="control-label">{t.paperTypeSection || 'Loại mẫu giấy'}</label>
                    <div className="custom-select-wrapper">
                      <select
                        className="custom-select select-paper-type"
                        value={settings.paperType}
                        onChange={(e) => {
                          const found = paperTemplates.find((p) => p.id === e.target.value);
                          if (found) selectTemplate(found);
                        }}
                      >
                        {Object.keys(templateGroups).map((grp) => {
                          const grpLabel = t[`group${grp.charAt(0).toUpperCase() + grp.slice(1)}`] || grp;
                          return (
                            <optgroup key={grp} label={grpLabel}>
                              {templateGroups[grp].map((p) => (
                                <option key={p.id} value={p.id}>
                                  {t[p.key] || p.key}
                                </option>
                              ))}
                            </optgroup>
                          );
                        })}
                      </select>
                      <Icon name="chevronDown" />
                    </div>
                  </div>

                  {/* Paper Size */}
                  <div>
                    <label className="control-label">{t.paperSizeSection || 'Khổ giấy'}</label>
                    <div className="custom-select-wrapper">
                      <select
                        className="custom-select select-paper-size"
                        value={settings.paperSize}
                        onChange={(e) => {
                          playClickSound();
                          updateSettings({ paperSize: e.target.value as PaperSize });
                        }}
                      >
                        <option value="A4">A4 (210 × 297 mm)</option>
                        <option value="A5">A5 (148 × 210 mm)</option>
                        <option value="A3">A3 (297 × 420 mm)</option>
                        <option value="B4">B4 (250 × 353 mm)</option>
                        <option value="B5">B5 (176 × 250 mm)</option>
                        <option value="Letter">Letter (8.5 × 11 in)</option>
                        <option value="Legal">Legal (8.5 × 14 in)</option>
                        <option value="Tabloid">Tabloid (11 × 17 in)</option>
                        <option value="Executive">Executive (7.25 × 10.5 in)</option>
                        <option value="Custom">{t.customPaperSize || 'Khổ tùy chọn (mm)'}</option>
                      </select>
                      <Icon name="chevronDown" />
                    </div>
                  </div>

                  {/* Custom Dimensions */}
                  {settings.paperSize === 'Custom' && (
                    <div className="custom-size-fields-wrapper mt-2">
                      <div className="margins-grid">
                        <div className="margin-input-box">
                          <span className="control-label text-xs">{t.customWidthLabel || 'Rộng (mm)'}</span>
                          <div className="margin-input-wrapper">
                            <input
                              type="number"
                              className="margin-input"
                              min="50"
                              max="600"
                              value={settings.customWidth}
                              onChange={(e) =>
                                updateSettings({ customWidth: parseFloat(e.target.value) || 210 })
                              }
                            />
                            <span className="margin-unit">mm</span>
                          </div>
                        </div>
                        <div className="margin-input-box">
                          <span className="control-label text-xs">{t.customHeightLabel || 'Cao (mm)'}</span>
                          <div className="margin-input-wrapper">
                            <input
                              type="number"
                              className="margin-input"
                              min="50"
                              max="600"
                              value={settings.customHeight}
                              onChange={(e) =>
                                updateSettings({ customHeight: parseFloat(e.target.value) || 297 })
                              }
                            />
                            <span className="margin-unit">mm</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Orientation Toggle */}
                  <div>
                    <label className="control-label">{t.orientationSection || 'Hướng giấy'}</label>
                    <div className="orientation-toggle">
                      <button
                        className={`orientation-btn ${settings.orientation === 'Portrait' ? 'active' : ''}`}
                        onClick={() => {
                          playClickSound();
                          updateSettings({ orientation: 'Portrait' });
                        }}
                      >
                        <Icon name="ruler" />
                        <span>{t.portraitLabel || 'Dọc'}</span>
                      </button>
                      <button
                        className={`orientation-btn ${settings.orientation === 'Landscape' ? 'active' : ''}`}
                        onClick={() => {
                          playClickSound();
                          updateSettings({ orientation: 'Landscape' });
                        }}
                      >
                        <Icon name="blank" />
                        <span>{t.landscapeLabel || 'Ngang'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Line Properties Group */}
              <section className="sidebar-group">
                <div className="sidebar-group-header">
                  <span>{t.lineStyleSection || 'Kiểu & Màu nét kẻ'}</span>
                  <Icon name="chevronDown" />
                </div>
                <div className="sidebar-group-content">
                  {/* Line Style */}
                  <div>
                    <label className="control-label">{t.lineStyleSection || 'Kiểu nét'}</label>
                    <div className="custom-select-wrapper">
                      <select
                        className="custom-select select-line-style"
                        value={settings.lineStyle}
                        onChange={(e) => {
                          playClickSound();
                          updateSettings({ lineStyle: e.target.value as LineStyle });
                        }}
                      >
                        <option value="solid">Solid (Nét liền)</option>
                        <option value="dashed">Dashed (Nét đứt)</option>
                        <option value="dotted">Dotted (Chấm bi)</option>
                      </select>
                      <Icon name="chevronDown" />
                    </div>
                  </div>

                  {/* Line Color Presets & Picker */}
                  <div>
                    <label className="control-label">{t.lineColorSection || 'Màu sắc dòng kẻ'}</label>
                    <div className="color-picker-grid">
                      {COLOR_PRESETS.map((c) => (
                        <button
                          key={c}
                          className={`color-dot ${settings.lineColor === c ? 'active' : ''}`}
                          style={{ backgroundColor: c }}
                          onClick={() => {
                            playClickSound();
                            updateSettings({ lineColor: c });
                          }}
                        />
                      ))}
                      <div className="relative inline-block">
                        <input
                          type="color"
                          value={settings.lineColor}
                          onChange={(e) => updateSettings({ lineColor: e.target.value })}
                          className="w-7 h-7 rounded-full border border-[var(--paperme-border)] cursor-pointer"
                          title={t.customColor || 'Tùy chọn màu...'}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Line Spacing */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="control-label">{t.spacingSection || 'Khoảng cách dòng'}</label>
                      <span className="text-xs font-bold text-[var(--paperme-primary)]">
                        {settings.lineSpacing} mm
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="0.5"
                      value={settings.lineSpacing}
                      onChange={(e) =>
                        updateSettings({ lineSpacing: parseFloat(e.target.value) || 8 })
                      }
                      className="w-full accent-[var(--paperme-primary)] cursor-pointer"
                    />
                  </div>

                  {/* Line Thickness */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="control-label">{t.widthSection || 'Độ đậm nét vẽ'}</label>
                      <span className="text-xs font-bold text-[var(--paperme-primary)]">
                        {settings.lineWidth} mm
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="2.5"
                      step="0.05"
                      value={settings.lineWidth}
                      onChange={(e) =>
                        updateSettings({ lineWidth: parseFloat(e.target.value) || 0.5 })
                      }
                      className="w-full accent-[var(--paperme-primary)] cursor-pointer"
                    />
                  </div>

                  {/* Margins */}
                  <div>
                    <label className="control-label">{t.marginsSection || 'Kích thước lề (mm)'}</label>
                    <div className="margins-grid">
                      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
                        <div key={side} className="margin-input-box">
                          <span className="control-label text-xs">
                            {t[`${side}Label`] || side}
                          </span>
                          <div className="margin-input-wrapper">
                            <input
                              type="number"
                              min="0"
                              max="80"
                              value={settings.margins[side]}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                updateSettings((prev) => ({
                                  ...prev,
                                  margins: { ...prev.margins, [side]: val },
                                }));
                              }}
                              className="margin-input"
                            />
                            <span className="margin-unit">mm</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reset Button */}
                  <div className="pt-2">
                    <button
                      className="w-full py-2 px-4 rounded border border-[var(--paperme-border)] bg-[var(--paperme-card)] hover:bg-[var(--paperme-primary-light)] font-semibold text-sm transition"
                      onClick={() => {
                        playClickSound();
                        updateSettings(defaultPaperSettings);
                      }}
                    >
                      {t.btnReset || 'Đặt lại mặc định'}
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </aside>

          {/* Center: Canvas Workspace Preview */}
          <main className="preview-canvas-area relative flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Floating background decorative icons */}
            <div className="bg-deco bg-deco-1">
              <Icon name="ruler" />
            </div>
            <div className="bg-deco bg-deco-2">
              <Icon name="edit" />
            </div>
            <div className="bg-deco bg-deco-3">
              <Icon name="templates" />
            </div>
            <div className="bg-deco bg-deco-4">
              <Icon name="folder" />
            </div>

            {/* Canvas Control Header */}
            <div className="canvas-control-header flex-shrink-0">
              {/* Undo / Redo */}
              <div className="history-controls">
                <button
                  className="canvas-header-btn undo-btn"
                  disabled={historyStack.length === 0}
                  onClick={handleUndo}
                  title="Hoàn tác (Undo)"
                >
                  <Icon name="undo" />
                </button>
                <button
                  className="canvas-header-btn redo-btn"
                  disabled={redoStack.length === 0}
                  onClick={handleRedo}
                  title="Làm lại (Redo)"
                >
                  <Icon name="redo" />
                </button>
              </div>

              {/* Smart Search */}
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder={lang === 'vi' ? 'Tìm mẫu giấy...' : 'Search templates...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="search-icon-box">
                  <Icon name="search" />
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="zoom-controls">
                <button
                  className="canvas-header-btn zoom-out-btn"
                  onClick={() => {
                    playClickSound();
                    setZoom((z) => Math.max(30, z - 10));
                  }}
                  title="Thu nhỏ"
                >
                  <Icon name="minus" />
                </button>
                <span className="zoom-indicator font-bold">{zoom}%</span>
                <button
                  className="canvas-header-btn zoom-in-btn"
                  onClick={() => {
                    playClickSound();
                    setZoom((z) => Math.min(200, z + 10));
                  }}
                  title="Phóng to"
                >
                  <Icon name="plus" />
                </button>
                <button
                  className="canvas-header-btn zoom-reset-btn"
                  onClick={() => {
                    playClickSound();
                    setZoom(75);
                  }}
                  title="Đặt lại zoom 75%"
                >
                  <Icon name="zoomReset" />
                </button>
              </div>

              {/* Rulers Switch */}
              <div className="ruler-toggle-container">
                <span>{t.rulersLabel || 'Thước đo'}</span>
                <label className="switch-control">
                  <input
                    type="checkbox"
                    className="ruler-checkbox"
                    checked={showRulers}
                    onChange={(e) => {
                      playClickSound();
                      setShowRulers(e.target.checked);
                    }}
                  />
                  <span className="switch-slider" />
                </label>
              </div>
            </div>

            {/* Paper Canvas Scroll Area with Centered Bounding Box */}
            <div className="paper-scroll-wrapper flex-1 min-h-0 overflow-auto p-8 relative flex items-center justify-center">
              <div
                className="ruler-wrapper"
                id="paper-ruler-wrapper"
                style={{
                  width: `${wrapperWidth}px`,
                  height: `${wrapperHeight}px`,
                  minWidth: `${wrapperWidth}px`,
                  minHeight: `${wrapperHeight}px`,
                  margin: 'auto',
                  position: 'relative',
                  flexShrink: 0,
                  display: 'block',
                }}
              >
                <div
                  className="ruler-container"
                  id="paper-ruler-container"
                  style={{
                    width: `${canvasDims.width}px`,
                    height: `${canvasDims.height}px`,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    transformOrigin: 'center center',
                    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.12)',
                    borderRadius: '4px',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <canvas ref={canvasRef} id="design-canvas" className="preview-canvas-element block" />
                </div>
              </div>
            </div>

            {/* Canvas Bottom Status Bar with NSN metadata */}
            <div className="canvas-status-bar flex-shrink-0 flex items-center justify-between px-6 py-2 border-t border-[var(--paperme-border)] bg-[var(--paperme-card)] text-xs text-[var(--paperme-text-muted)]">
              <div className="flex items-center gap-3">
                <span className="status-size-info font-medium" style={{ color: statusMessage ? 'var(--paperme-accent)' : undefined }}>
                  {statusMessage || `${sizeLabel} · ${orientationLabel} · ${templateNameLabel}`}
                </span>
                <span className="status-lines-info font-medium border-l border-[var(--paperme-border)] pl-3">
                  {t.linesCount || 'Số dòng'}: {linesCount} {t.lines || 'dòng'}
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-4">
                <span>
                  <strong>NsN_GiayIn</strong> · v{NSN_APP_META.version} · {NSN_APP_META.authorShort}
                </span>
                <button
                  onClick={() => setActiveTab('guide')}
                  className="hover:text-[var(--paperme-primary)] underline"
                >
                  Hướng dẫn
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-[var(--paperme-primary)] underline"
                >
                  Phiên bản
                </button>
                <button
                  onClick={() => setActiveTab('coffee')}
                  className="hover:text-amber-600 font-bold"
                >
                  ☕ Mời cà phê
                </button>
              </div>
            </div>
          </main>

          {/* Right Sidebar: Categorised Template Gallery */}
          <aside className="template-sidebar-right flex-shrink-0 h-full overflow-hidden flex flex-col">
            <div className="sidebar-right-header flex-shrink-0">
              <span className="font-bold text-sm tracking-wide">{t.templatesMenu || 'Thư viện mẫu'}</span>
            </div>
            <div className="template-grid-wrapper flex-1 overflow-y-auto p-3">
              {Object.keys(templateGroups).map((grp) => {
                const grpLabel = t[`group${grp.charAt(0).toUpperCase() + grp.slice(1)}`] || grp;
                return (
                  <div key={grp} className="template-group-section mb-4">
                    <div className="template-group-title text-xs font-extrabold uppercase tracking-wider text-[var(--paperme-text-muted)] mb-2">
                      {grpLabel}
                    </div>
                    <div className="template-grid-2col">
                      {templateGroups[grp].map((tpl) => (
                        <button
                          key={tpl.id}
                          className={`template-card ${settings.paperType === tpl.id ? 'active' : ''}`}
                          onClick={() => selectTemplate(tpl)}
                        >
                          <div className="template-card-icon">
                            <Icon name={tpl.icon} />
                          </div>
                          <span className="template-card-title text-xs">
                            {t[tpl.key] || tpl.key}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};
