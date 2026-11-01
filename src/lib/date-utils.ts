/**
 * Tiện ích thời gian chuẩn GMT+7 (Asia/Ho_Chi_Minh) theo NSN App Standard
 */

export function getGMT7DateString(d: Date = new Date()): string {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = formatter.formatToParts(d);
  const day = parts.find((p) => p.type === 'day')?.value || '01';
  const month = parts.find((p) => p.type === 'month')?.value || '01';
  const year = parts.find((p) => p.type === 'year')?.value || '2026';
  return `${year}${month}${day}`;
}

export function getGMT7TimeString(d: Date = new Date()): string {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const parts = formatter.formatToParts(d);
  const hour = parts.find((p) => p.type === 'hour')?.value || '00';
  const minute = parts.find((p) => p.type === 'minute')?.value || '00';
  const second = parts.find((p) => p.type === 'second')?.value || '00';
  return `${hour}${minute}${second}`;
}

export function getExportFileName(paperType: string, ext: string): string {
  const time = getGMT7TimeString();
  const date = getGMT7DateString();
  return `${time}_NsN_GiayIn_${paperType}_${date}.${ext}`;
}
