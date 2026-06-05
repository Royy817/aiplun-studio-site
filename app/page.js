import HtmlContent from '@/components/HtmlContent';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Aiplun Studio | 地域企業向けホームページ制作・FAQ型チャットボット・業務改善支援',
  description: 'Aiplun Studioは地域の中小企業・店舗様向けに、ホームページ制作、FAQ型チャットボット導入、業務改善支援を行っています。初回相談無料、土日を含む48時間以内に返信。'
};

export default function HomePage() {
  return <HtmlContent file="home.html" />;
}
