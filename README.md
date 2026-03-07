# Next.js Invaders - 学習サイト

スペースインベーダーの開発を通じて **Next.js 15** を学ぶインタラクティブ学習プラットフォームです。

## 概要

Laravel + Inertia.js（React）で構築された学習サイトと、学習コースの完成版となる Next.js アプリケーションの 2 つで構成されています。

### 学習サイト（Laravel）

全 8 チャプターの学習コンテンツ、クイズ、実際に遊べるデモゲームを提供します。

| チャプター | 内容 |
|-----------|------|
| 1. 環境構築 | Next.js 15 プロジェクトの作成・ディレクトリ構成 |
| 2. App Router | レイアウト・ページ・動的ルーティング |
| 3. Client Components | useRef・useEffect・Canvas セットアップ |
| 4. ゲーム描画 | Canvas API でインベーダーとプレイヤーを描画 |
| 5. キーボード入力 | イベントリスナーと Set によるキー管理 |
| 6. 衝突検出 | AABB 衝突判定・スコア・ライフ管理 |
| 7. パフォーマンス最適化 | useRef でゲーム状態管理・UI スロットリング・パーティクル |
| 8. デプロイ | メタデータ・generateStaticParams・Vercel デプロイ |

### 完成版アプリ（`space-invaders/`）

学習コースを通じて完成する Next.js アプリの完成版です。

```
space-invaders/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # ルートレイアウト + メタデータ
│   │   ├── page.tsx             # ホーム画面（レベル選択）
│   │   └── level/[id]/
│   │       ├── page.tsx         # Server Component（動的ルート）
│   │       └── LevelClient.tsx  # Client Component
│   ├── components/
│   │   └── SpaceInvadersGame.tsx # ゲーム本体
│   └── game/
│       └── engine.ts            # ゲームエンジン
├── package.json
├── tsconfig.json
└── next.config.ts
```

## セットアップ

### 学習サイト（Laravel）

```bash
# 依存パッケージのインストール
composer install
npm install

# 環境設定
cp .env.example .env
php artisan key:generate

# データベースのマイグレーション
php artisan migrate

# 開発サーバーの起動
php artisan serve
npm run dev
```

### 完成版アプリ（Next.js）

```bash
cd space-invaders
npm install
npm run dev    # 開発サーバー: http://localhost:3000
npm run build  # プロダクションビルド
```

## 技術スタック

### 学習サイト
- **Backend**: Laravel 12 / PHP 8.2+
- **Frontend**: React 19 / TypeScript / Inertia.js
- **Styling**: Tailwind CSS v4
- **Game Engine**: Canvas API / TypeScript

### 完成版アプリ
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI**: React 19
- **Styling**: Tailwind CSS v4
- **Rendering**: Canvas API

## ゲーム操作

| キー | 操作 |
|------|------|
| ← → / A D | 移動 |
| Space / ↑ | 射撃 |
| Enter | リスタート / 次のレベル |

## ライセンス

MIT
