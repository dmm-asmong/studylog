import type { Metadata } from 'next';
import { Bebas_Neue, Noto_Sans_KR } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'StudyLog — 오늘 배운 것을 내 것으로',
  description: '하루 5분, 파인만 기법으로 메타인지를 키우는 학습일지',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${bebasNeue.variable} ${notoSansKR.variable}`}>
      <body style={{ fontFamily: 'var(--font-noto), sans-serif' }}>{children}</body>
    </html>
  );
}
