export type PaperType = string;

export type PaperGroup =
  | "standard"
  | "homework"
  | "calligraphy"
  | "architect"
  | "drawing"
  | "learning"
  | "notes";

export type PaperSize =
  | "A4"
  | "A5"
  | "A3"
  | "B4"
  | "B5"
  | "Letter"
  | "Legal"
  | "Tabloid"
  | "Executive"
  | "Custom";

export type Orientation = "Portrait" | "Landscape";
export type LineStyle = "solid" | "dashed" | "dotted";
export type Language = "vi" | "en";
export type ThemeMode = "light" | "dark";

export interface PaperMargins {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface PaperTemplateConfig {
  id: string;
  key: string;
  group: PaperGroup;
  icon: string;
  lineSpacing: number;
  lineWidth: number;
  lineColor: string;
  lineStyle: LineStyle;
  margins: PaperMargins;
}

export interface PaperSettings {
  paperType: PaperType;
  paperSize: PaperSize;
  customWidth: number;
  customHeight: number;
  orientation: Orientation;
  lineSpacing: number;
  lineWidth: number;
  lineColor: string;
  lineStyle: LineStyle;
  margins: PaperMargins;
}
