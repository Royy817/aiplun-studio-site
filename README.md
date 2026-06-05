# Aiplun Studio Site

Aiplun Studioの公式サービスサイトです。地域の中小企業・店舗様向けに、ホームページ制作、FAQ型チャットボット導入、業務改善支援、保守・更新サポートを案内するNext.jsサイトとして整理しています。

## 技術構成

- Next.js
- React
- CSS Modulesではなく、既存デザインを活かしたグローバルCSS
- GSAP CDNによるオープニング / スクロールアニメーション
- Vercel公開想定

## 主なファイル構成

```text
app/
  layout.js          # 共通メタ情報、フォント、GSAP、共通JS読み込み
  globals.css        # 既存デザインを移植した共通CSS
  page.js            # トップページ
  plans/page.js      # プラン比較
  privacy/page.js    # プライバシーポリシー
  legal/page.js      # 特定商取引法に基づく表記
  terms/page.js      # 利用規約
components/
  HtmlContent.js     # content内のHTML本文をNext.jsページに表示
content/
  home.html
  plans.html
  privacy.html
  legal.html
  terms.html
public/
  favicon.svg
  script.js
next.config.mjs      # 旧 .html URL からNext.jsルートへのリダイレクト
package.json
.gitignore
.env.example
```

## ローカルで確認する方法

```bash
npm install
npm run dev
```

起動後、以下を開いてください。

```text
http://localhost:3000
```

## 本番ビルド確認

```bash
npm run build
npm run start
```

## Vercelで公開する方法

1. GitHubに `aiplun-studio-site` リポジトリを作成します。
2. このフォルダの内容をリポジトリにpushします。
3. Vercelで `Add New Project` から `aiplun-studio-site` を選択します。
4. Framework Preset は `Next.js` を選択します。
5. 必要に応じて環境変数を設定します。

```text
NEXT_PUBLIC_SITE_URL=https://公開後のドメイン
```

6. `Deploy` を実行します。

## GitHubへ保存するコマンド例

```bash
git init
git branch -M main
git add .
git commit -m "Initial Next.js site"
git remote add origin https://github.com/YOUR_ACCOUNT/aiplun-studio-site.git
git push -u origin main
```

## 注意

- ルート直下の旧HTMLファイルやローカル公開用ログ、`cloudflared.exe` は `.gitignore` で除外しています。
- Next.js本番サイトでは `app/`、`content/`、`public/` のファイルを使用します。
- お問い合わせ導線はGmail作成画面に接続しています。
