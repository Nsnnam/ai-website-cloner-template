import { Metadata } from 'next';
import { CuongPaperApp } from '@/components/sites/cuongpaper/cuongpaper-app';

export const metadata: Metadata = {
  title: 'NsN_GiayIn - Thiết kế & Tải Mẫu Giấy In Chất Lượng Cao | Custom Paper Templates',
  description:
    'Tự tay thiết kế và tải xuống 50+ mẫu giấy in thông dụng như giấy kẻ ngang, ô ly Seyes, chấm bi dot grid, khuông nhạc, isometric và ghi chú Cornell. Song ngữ, chỉnh kích cỡ mm chuẩn in ấn.',
  icons: {
    icon: '/sites/cuongpaper/favicon.svg',
  },
};

export default function MauGiayInPage() {
  return <CuongPaperApp />;
}
