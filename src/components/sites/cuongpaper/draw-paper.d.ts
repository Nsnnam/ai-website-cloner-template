import { PaperSettings } from './types';

export declare function mmToPx(mm: number, dpi: number): number;

export interface PaperDimensions {
  width: number;
  height: number;
  widthMm: number;
  heightMm: number;
}

export declare function calcPaperDimensions(
  paperSize: string,
  orientation: string,
  dpi: number,
  customWidth?: number,
  customHeight?: number
): PaperDimensions;

export interface RenderPaperOptions {
  showMarginsGuide?: boolean;
  hideHeader?: boolean;
  lang?: string;
}

export declare function renderPaper(
  canvas: HTMLCanvasElement,
  settings: PaperSettings,
  dpi?: number,
  options?: RenderPaperOptions
): number;
