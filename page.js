import Script from 'next/script';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aiplun-studio-site.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Aiplun Studio | 地域企業向けホームページ制作・FAQ型チャットボット・業務改善支援',
    template: '%s'
  },
  description: '地域の中小企業・店舗様向けに、ホームページ制作、FAQ型チャットボット導入、業務改善支援を行っています。',
  icons: {
    icon: '/favicon.svg'
  },
  openGraph: {
    title: 'Aiplun Studio',
    description: '地域の会社に、伝わるホームページと使える仕組みを。',
    url: siteUrl,
    siteName: 'Aiplun Studio',
    locale: 'ja_JP',
    type: 'website'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body suppressHydrationWarning>
        {children}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="/script.js?v=final-qa-mobile-polish-20260605-64" strategy="afterInteractive" />
      </body>
    </html>
  );
}
