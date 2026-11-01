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
import { CursorTrail } from './cursor-trail';
import { playClickSound, playRustleSound, playPrintSound } from './audio';
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

export const CuongPaperApp: React.FC = () => {
  const [settings, setSettings] = useState<PaperSettings>(defaultPaperSettings);
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [lang, setLang] = useState<Language>('vi');
  const [zoom, setZoom] = useState<number>(75);
  const [showRulers, setShowRulers] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [historyStack, setHistoryStack] = useState<PaperSettings[]>([]);
  const [redoStack, setRedoStack] = useState<PaperSettings[]>([]);
  const [activeTab, setActiveTab] = useState<'custom' | 'templates' | 'mypapers' | 'explore'>('custom');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [linesCount, setLinesCount] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize client state
  useEffect(() => {
    setIsClient(true);
    const savedTheme = (localStorage.getItem('paperme_theme') as ThemeMode) || 'light';
    const savedLang = (localStorage.getItem('paperme_lang') as Language) || 'vi';
    setTheme(savedTheme);
    setLang(savedLang);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedSettings = localStorage.getItem('paperme_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch {
        setSettings(defaultPaperSettings);
      }
    }

    // Auto zoom based on window width
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
    localStorage.setItem('paperme_theme', theme);
  }, [theme, isClient]);

  // Update lang in localStorage
  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem('paperme_lang', lang);
  }, [lang, isClient]);

  // Push history and update settings
  const updateSettings = useCallback(
    (newSettings: Partial<PaperSettings> | ((prev: PaperSettings) => PaperSettings)) => {
      setSettings((prev) => {
        const next = typeof newSettings === 'function' ? newSettings(prev) : { ...prev, ...newSettings };
        setHistoryStack((stack) => [...stack.slice(-20), prev]);
        setRedoStack([]);
        if (typeof window !== 'undefined') {
          localStorage.setItem('paperme_settings', JSON.stringify(next));
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
    localStorage.setItem('paperme_settings', JSON.stringify(prev));
  }, [historyStack, settings]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;
    playClickSound();
    const next = redoStack[redoStack.length - 1];
    setRedoStack((r) => r.slice(0, -1));
    setHistoryStack((s) => [...s, settings]);
    setSettings(next);
    localStorage.setItem('paperme_settings', JSON.stringify(next));
  }, [redoStack, settings]);

  // Canvas render effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const count = renderPaper(canvas, settings, 96, {
        showMarginsGuide: true,
        hideHeader: false,
        lang,
      });
      setLinesCount(count);
    } catch (e) {
      console.error('Error rendering paper canvas:', e);
    }
  }, [settings, lang, showRulers]);

  const t = translations[lang] || translations.vi;

  // Format Status Label
  let sizeLabel: string = settings.paperSize;
  if (sizeLabel === 'Custom') {
    sizeLabel = `${t.customPaperSize || 'Custom'} (${settings.customWidth} × ${settings.customHeight} mm)`;
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
  };

  // Export handling
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

        const filenameBase = `paperme_${settings.paperType}_${settings.paperSize.toLowerCase()}`;

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
          pdf.save(`${filenameBase}.pdf`);
        } else if (format === 'png') {
          const link = document.createElement('a');
          link.download = `${filenameBase}.png`;
          link.href = offscreenCanvas.toDataURL('image/png');
          link.click();
        } else if (format === 'jpg') {
          const link = document.createElement('a');
          link.download = `${filenameBase}.jpg`;
          link.href = offscreenCanvas.toDataURL('image/jpeg', 0.9);
          link.click();
        } else if (format === 'docx') {
          const imgData = offscreenCanvas.toDataURL('image/jpeg', 0.9);
          const docHtml = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<title>PaperMe Template</title>
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
          link.download = `${filenameBase}.doc`;
          link.click();
        }
      } catch (err) {
        console.error('Export error:', err);
      } finally {
        setStatusMessage('');
      }
    }, 400);
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

  return (
    <div className="min-h-screen bg-[var(--paperme-bg)] text-[var(--paperme-text)]">
      <CursorTrail theme={theme} />

      {/* App Header */}
      <header className="app-header">
        <div className="header-logo-section">
          <Icon name="templates" className="logo-icon" />
          <h1>
            <span>Cuong</span>PaPer
          </h1>
        </div>

        <nav className="header-nav">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('templates');
            }}
            className={`nav-item ${activeTab === 'templates' ? 'active' : ''}`}
          >
            {t.templatesMenu}
          </button>
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('mypapers');
            }}
            className={`nav-item ${activeTab === 'mypapers' ? 'active' : ''}`}
          >
            {t.myPapersMenu}
          </button>
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('custom');
            }}
            className={`nav-item ${activeTab === 'custom' ? 'active' : ''}`}
          >
            {t.customDesignMenu}
          </button>
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('explore');
            }}
            className={`nav-item ${activeTab === 'explore' ? 'active' : ''}`}
          >
            {t.exploreMenu}
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
            title="Switch Language"
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
            {t.templatesMenu}
          </button>
          <button
            onClick={() => {
              setActiveTab('mypapers');
              setMobileMenuOpen(false);
            }}
            className={`mobile-nav-item ${activeTab === 'mypapers' ? 'active' : ''}`}
          >
            {t.myPapersMenu}
          </button>
          <button
            onClick={() => {
              setActiveTab('custom');
              setMobileMenuOpen(false);
            }}
            className={`mobile-nav-item ${activeTab === 'custom' ? 'active' : ''}`}
          >
            {t.customDesignMenu}
          </button>
          <button
            onClick={() => {
              setActiveTab('explore');
              setMobileMenuOpen(false);
            }}
            className={`mobile-nav-item ${activeTab === 'explore' ? 'active' : ''}`}
          >
            {t.exploreMenu}
          </button>
        </div>
      )}

      {/* App Body Container */}
      <div className="app-container">
        {/* Left Sidebar: Controls & Settings */}
        <aside className="editor-sidebar">
          <div className="sidebar-scroll-content">
            {/* Quick Export Cards */}
            <section className="sidebar-group">
              <div className="sidebar-group-header">
                <span>{t.exportSection}</span>
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
              </div>
            </section>

            {/* Paper Properties Group */}
            <section className="sidebar-group">
              <div className="sidebar-group-header">
                <span>{t.settingsTab}</span>
                <Icon name="chevronDown" />
              </div>
              <div className="sidebar-group-content">
                {/* Paper Type */}
                <div>
                  <label className="control-label">{t.paperTypeSection}</label>
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
                  <label className="control-label">{t.paperSizeSection}</label>
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
                      <option value="Custom">{t.customPaperSize || 'Khổ tùy chọn'}</option>
                    </select>
                    <Icon name="chevronDown" />
                  </div>
                </div>

                {/* Custom Dimensions */}
                {settings.paperSize === 'Custom' && (
                  <div className="custom-size-fields-wrapper mt-2">
                    <div className="margins-grid">
                      <div className="margin-input-box">
                        <span className="control-label text-xs">{t.customWidthLabel}</span>
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
                        <span className="control-label text-xs">{t.customHeightLabel}</span>
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
                  <label className="control-label">{t.orientationSection}</label>
                  <div className="orientation-toggle">
                    <button
                      className={`orientation-btn ${settings.orientation === 'Portrait' ? 'active' : ''}`}
                      onClick={() => {
                        playClickSound();
                        updateSettings({ orientation: 'Portrait' });
                      }}
                    >
                      <Icon name="ruler" />
                      <span>{t.portraitLabel}</span>
                    </button>
                    <button
                      className={`orientation-btn ${settings.orientation === 'Landscape' ? 'active' : ''}`}
                      onClick={() => {
                        playClickSound();
                        updateSettings({ orientation: 'Landscape' });
                      }}
                    >
                      <Icon name="blank" />
                      <span>{t.landscapeLabel}</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Line Properties Group */}
            <section className="sidebar-group">
              <div className="sidebar-group-header">
                <span>{t.lineStyleSection}</span>
                <Icon name="chevronDown" />
              </div>
              <div className="sidebar-group-content">
                {/* Line Style */}
                <div>
                  <label className="control-label">{t.lineStyleSection}</label>
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
                  <label className="control-label">{t.lineColorSection}</label>
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
                    <label className="control-label">{t.spacingSection}</label>
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
                    <label className="control-label">{t.widthSection}</label>
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
                  <label className="control-label">{t.marginsSection}</label>
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
        <main className="preview-canvas-area relative flex flex-col flex-1 overflow-hidden">
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
          <div className="canvas-control-header">
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
              <span>{t.rulersLabel}</span>
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

          {/* Paper Canvas Scroll Area */}
          <div className="paper-scroll-wrapper relative flex-1 flex items-center justify-center p-8 overflow-auto">
            <div
              className="ruler-wrapper relative"
              id="paper-ruler-wrapper"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'center center',
                transition: 'transform 0.15s ease-out',
              }}
            >
              <div className="ruler-container relative" id="paper-ruler-container">
                <canvas ref={canvasRef} id="design-canvas" className="preview-canvas-element" />
              </div>
            </div>
          </div>

          {/* Canvas Bottom Status Bar */}
          <div className="canvas-status-bar">
            <span className="status-size-info font-medium" style={{ color: statusMessage ? 'var(--paperme-accent)' : undefined }}>
              {statusMessage || `${sizeLabel} · ${orientationLabel} · ${templateNameLabel}`}
            </span>
            <span className="status-lines-info font-medium">
              {t.linesCount}: {linesCount} {t.lines}
            </span>
          </div>
        </main>

        {/* Right Sidebar: Categorised Template Gallery */}
        <aside className="template-sidebar-right">
          <div className="sidebar-right-header">
            <span className="font-bold text-sm tracking-wide">{t.templatesMenu}</span>
          </div>
          <div className="template-grid-wrapper p-3">
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
    </div>
  );
};
