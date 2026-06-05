import HtmlContent from '@/components/HtmlContent';

export const dynamic = 'force-static';

export const metadata = {
  title: '利用規約 | Aiplun Studio',
  description: 'Aiplun Studioの利用規約です。ホームページ制作、FAQ型チャットボット導入、業務改善支援、保守・更新サポートの利用条件について掲載しています。'
};

export default function TermsPage() {
  return <HtmlContent file="terms.html" />;
}
