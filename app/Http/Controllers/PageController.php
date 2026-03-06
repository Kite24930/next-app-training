<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PageController extends Controller
{
    public function home()
    {
        return Inertia::render('Home');
    }

    public function chapters()
    {
        return Inertia::render('Chapters/Index');
    }

    public function chapter(int $number)
    {
        $chapters = $this->getChapters();

        if (!isset($chapters[$number])) {
            abort(404);
        }

        $chapter = $chapters[$number];
        $chapterTitles = array_map(fn($ch) => ['number' => $ch['number'], 'title' => $ch['title']], $chapters);

        $chapter['prevChapter'] = isset($chapters[$number - 1])
            ? ['number' => $number - 1, 'title' => $chapters[$number - 1]['title']]
            : null;
        $chapter['nextChapter'] = isset($chapters[$number + 1])
            ? ['number' => $number + 1, 'title' => $chapters[$number + 1]['title']]
            : null;

        $quizzes = $this->getQuizzes();
        $chapter['quiz'] = $quizzes[$number] ?? [];

        return Inertia::render('Chapters/Show', [
            'chapter' => $chapter,
        ]);
    }

    public function demo()
    {
        return Inertia::render('Demo');
    }

    public function profile()
    {
        return Inertia::render('Profile');
    }

    public function about()
    {
        return Inertia::render('About');
    }

    private function getChapters(): array
    {
        return [
            1 => [
                'number' => 1,
                'title' => 'Next.js プロジェクト作成と環境構築',
                'description' => 'create-next-appでプロジェクトを作成し、開発環境を整えます。Laravelのcomposer create-projectとの対比で理解します。',
                'objectives' => [
                    'Node.js と npm の基本を理解する',
                    'create-next-app でプロジェクトを作成する',
                    'Next.js のディレクトリ構造を把握する',
                    'LaravelのComposerプロジェクトとの違いを理解する',
                ],
                'sections' => [
                    [
                        'type' => 'text',
                        'title' => 'はじめに',
                        'content' => '<p>このチャプターでは、Next.jsプロジェクトの作成と環境構築を行います。普段Laravelで <code>composer create-project</code> を使うように、Next.jsでは <code>create-next-app</code> を使います。</p><p>Laravelでは PHP + Composer がベースですが、Next.jsでは Node.js + npm（またはyarn/pnpm）がベースになります。Reactの開発経験があれば、Node.jsの環境は既に整っているはずです。</p><p>本教材では <strong>Next.js 15</strong>（App Router）を対象としています。</p>',
                    ],
                    [
                        'type' => 'comparison',
                        'title' => 'プロジェクト作成の比較',
                        'description' => 'Laravel と Next.js でプロジェクトを作成するコマンドを比較してみましょう。',
                        'laravelCode' => "# Laravel プロジェクト作成\ncomposer create-project \\\n  laravel/laravel my-app\n\ncd my-app\nphp artisan serve\n# => http://localhost:8000",
                        'nextjsCode' => "# Next.js プロジェクト作成\nnpx create-next-app@latest \\\n  my-app --typescript --tailwind\n\ncd my-app\nnpm run dev\n# => http://localhost:3000",
                    ],
                    [
                        'type' => 'code',
                        'title' => 'create-next-app の実行',
                        'description' => 'ターミナルで以下のコマンドを実行してプロジェクトを作成します。対話形式でいくつか質問されます。',
                        'code' => "npx create-next-app@latest space-invaders --typescript --tailwind --eslint --app --src-dir --import-alias \"@/*\"\n\n# 各オプションの意味:\n# --typescript   : TypeScript を使用\n# --tailwind     : Tailwind CSS を導入\n# --eslint       : ESLint を導入\n# --app          : App Router を使用\n# --src-dir      : src/ ディレクトリを使用\n# --import-alias : import パスのエイリアス設定",
                        'language' => 'bash',
                        'filename' => 'Terminal',
                    ],
                    [
                        'type' => 'comparison',
                        'title' => 'ディレクトリ構造の比較',
                        'description' => 'Laravel と Next.js のディレクトリ構造を比較します。役割が似ているディレクトリを対応させて理解しましょう。',
                        'laravelCode' => "my-app/\n├── app/           # アプリのコア\n│   ├── Http/      # コントローラー\n│   └── Models/    # モデル\n├── config/        # 設定ファイル\n├── public/        # 公開ファイル\n├── resources/\n│   └── views/     # Blade テンプレート\n├── routes/\n│   └── web.php    # ルーティング\n├── composer.json\n└── .env",
                        'nextjsCode' => "my-app/\n├── src/\n│   └── app/       # App Router (ルーティング)\n│       ├── layout.tsx    # ルートレイアウト\n│       ├── page.tsx      # トップページ\n│       └── globals.css   # グローバルCSS\n├── public/        # 静的ファイル\n├── next.config.ts # Next.js 設定\n├── package.json   # ≒ composer.json\n├── tsconfig.json  # TypeScript 設定\n└── .env.local     # ≒ .env",
                    ],
                    [
                        'type' => 'tip',
                        'title' => 'Laravel開発者向けポイント',
                        'content' => 'Next.jsでは、Laravelの routes/web.php にあたるルーティング定義ファイルは存在しません。代わりに、app/ ディレクトリのフォルダ構造がそのままURLルーティングになります（ファイルベースルーティング）。これは次のチャプターで詳しく学びます。',
                    ],
                    [
                        'type' => 'code',
                        'title' => '開発サーバーの起動',
                        'description' => 'プロジェクトが作成できたら、開発サーバーを起動して動作を確認しましょう。',
                        'code' => "cd space-invaders\nnpm run dev\n\n# ブラウザで http://localhost:3000 を開くと\n# Next.js のウェルカムページが表示されます",
                        'language' => 'bash',
                        'filename' => 'Terminal',
                    ],
                    [
                        'type' => 'code',
                        'title' => 'package.json の確認',
                        'description' => 'Laravelの composer.json に相当する package.json を見てみましょう。',
                        'code' => "{\n  \"name\": \"space-invaders\",\n  \"version\": \"0.1.0\",\n  \"scripts\": {\n    \"dev\": \"next dev\",        // php artisan serve に相当\n    \"build\": \"next build\",    // 本番ビルド\n    \"start\": \"next start\",    // 本番サーバー起動\n    \"lint\": \"next lint\"       // ESLint 実行\n  },\n  \"dependencies\": {\n    \"next\": \"15.x\",\n    \"react\": \"^19\",\n    \"react-dom\": \"^19\"\n  },\n  \"devDependencies\": {\n    \"@types/react\": \"^19\",\n    \"typescript\": \"^5\",\n    \"tailwindcss\": \"^4\"\n  }\n}",
                        'language' => 'json',
                        'filename' => 'package.json',
                        'highlights' => [4, 5, 6, 7],
                    ],
                    [
                        'type' => 'exercise',
                        'title' => '演習: プロジェクトを作成しよう',
                        'description' => '以下の手順に従って、実際にNext.jsプロジェクトを作成し、開発サーバーで動作を確認してみましょう。',
                        'tasks' => [
                            'Node.js (v18以上) がインストールされていることを確認: node --version',
                            'create-next-app でプロジェクトを作成する（上記のコマンドを参考に）',
                            'npm run dev で開発サーバーを起動する',
                            'http://localhost:3000 にアクセスしてウェルカムページが表示されることを確認',
                            'src/app/page.tsx を開いて内容を確認する（これが表示されているページ）',
                            'page.tsx の中身を「Hello, Next.js!」に書き換えて保存し、ブラウザが自動更新されることを確認',
                        ],
                    ],
                ],
            ],
            2 => [
                'number' => 2,
                'title' => 'App Router とファイルベースルーティング',
                'description' => 'Next.jsのApp Routerによるファイルベースルーティングを学びます。Laravelのweb.phpとの違いを理解しましょう。',
                'objectives' => [
                    'ファイルベースルーティングの仕組みを理解する',
                    'page.tsx、layout.tsx の役割を把握する',
                    '動的ルートの作成方法を学ぶ',
                    'Laravelのルーティングとの対比で理解を深める',
                ],
                'sections' => [
                    [
                        'type' => 'text',
                        'title' => 'ファイルベースルーティングとは',
                        'content' => '<p>Laravelでは <code>routes/web.php</code> にルーティングを定義しますが、Next.jsの App Router では<strong>ディレクトリ構造がそのままURLになります</strong>。</p><p>例えば <code>app/about/page.tsx</code> というファイルを作ると、自動的に <code>/about</code> というURLでアクセスできるようになります。Laravelで言えば、ルーティング定義とコントローラーとビューが一体化したイメージです。</p>',
                    ],
                    [
                        'type' => 'comparison',
                        'title' => 'ルーティング定義の比較',
                        'laravelCode' => "// routes/web.php\nuse App\\Http\\Controllers\\GameController;\n\nRoute::get('/', function () {\n    return view('home');\n});\n\nRoute::get('/game', [GameController::class, 'index']);\nRoute::get('/game/{id}', [GameController::class, 'show']);\nRoute::get('/about', function () {\n    return view('about');\n});",
                        'nextjsCode' => "// ファイル構造がルーティングになる\nsrc/app/\n├── page.tsx              → /\n├── game/\n│   ├── page.tsx          → /game\n│   └── [id]/\n│       └── page.tsx      → /game/:id\n└── about/\n    └── page.tsx          → /about\n\n// ルーティング定義ファイルは不要！",
                    ],
                    [
                        'type' => 'code',
                        'title' => '基本的なページの作成',
                        'description' => 'app/about/page.tsx を作成して /about ページを作ります。',
                        'code' => "// src/app/about/page.tsx\nexport default function AboutPage() {\n  return (\n    <div className=\"p-8\">\n      <h1 className=\"text-3xl font-bold\">About</h1>\n      <p className=\"mt-4 text-gray-600\">\n        Space Invaders - Next.jsで作るインベーダーゲーム\n      </p>\n    </div>\n  );\n}\n\n// これだけで /about にアクセスできるようになる！\n// Laravelのように Route::get() を書く必要はない",
                        'language' => 'tsx',
                        'filename' => 'src/app/about/page.tsx',
                        'highlights' => [2],
                    ],
                    [
                        'type' => 'code',
                        'title' => '動的ルーティング',
                        'description' => 'Laravelの {id} パラメータに相当する動的ルートは、[id] というフォルダ名で実現します。',
                        'code' => "// src/app/game/[id]/page.tsx\n// LaravelでいうRoute::get('/game/{id}', ...) に相当\n\n// Next.js 15 では params は Promise になった\ninterface Props {\n  params: Promise<{ id: string }>;\n}\n\nexport default async function GameDetailPage({ params }: Props) {\n  const { id } = await params;\n\n  return (\n    <div className=\"p-8\">\n      <h1 className=\"text-3xl font-bold\">\n        Game #{id}\n      </h1>\n      <p className=\"mt-4\">\n        ゲームID: {id} の詳細ページ\n      </p>\n    </div>\n  );\n}\n\n// /game/1, /game/2, /game/abc などでアクセス可能",
                        'language' => 'tsx',
                        'filename' => 'src/app/game/[id]/page.tsx',
                        'highlights' => [1, 5, 6, 9, 10],
                    ],
                    [
                        'type' => 'tip',
                        'title' => 'Laravel開発者向け: ルートの命名規則',
                        'content' => 'Laravelでは Route::get(\'/users\', ...)->name(\'users.index\') のように名前付きルートが使えますが、Next.jsにはこの概念がありません。代わりに、ファイルパスがそのままルートの「名前」になります。Link コンポーネントで <Link href="/about"> のように直接パスを指定します。',
                    ],
                    [
                        'type' => 'comparison',
                        'title' => 'レイアウトの比較',
                        'description' => 'Laravelの Blade レイアウト (@@extends) と Next.js の layout.tsx を比較します。',
                        'laravelCode' => "{{-- resources/views/layouts/app.blade.php --}}\n<!DOCTYPE html>\n<html>\n<head>\n    <title>@@yield('title')</title>\n</head>\n<body>\n    <nav>ナビゲーション</nav>\n    <main>\n        @@yield('content')\n    </main>\n    <footer>フッター</footer>\n</body>\n</html>\n\n{{-- 子テンプレート --}}\n@@extends('layouts.app')\n@@section('content')\n  <h1>ページ内容</h1>\n@@endsection",
                        'nextjsCode' => "// src/app/layout.tsx\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode;\n}) {\n  return (\n    <html lang=\"ja\">\n      <body>\n        <nav>ナビゲーション</nav>\n        <main>{children}</main>\n        <footer>フッター</footer>\n      </body>\n    </html>\n  );\n}\n\n// page.tsx は自動的にlayoutの\n// {children} に挿入される\n// @@extends は不要！",
                    ],
                    [
                        'type' => 'exercise',
                        'title' => '演習: ルーティングを試そう',
                        'description' => '以下のページを作成して、ファイルベースルーティングを体験しましょう。',
                        'tasks' => [
                            'src/app/about/page.tsx を作成して /about ページを表示する',
                            'src/app/game/page.tsx を作成して /game ページを表示する',
                            'src/app/game/[id]/page.tsx を作成して動的ルートを実装する',
                            '/game/1 と /game/2 にアクセスして、params.id が変わることを確認する',
                            'src/app/layout.tsx にナビゲーションリンクを追加して、各ページ間を移動できるようにする',
                        ],
                    ],
                ],
            ],
            3 => [
                'number' => 3,
                'title' => 'レイアウトとページ構成',
                'description' => 'layout.tsx、loading.tsx、error.tsxなどの特殊ファイルを活用してページ構成を設計します。',
                'objectives' => [
                    'layout.tsx による共通レイアウトの実装',
                    'Server Components と Client Components の違い',
                    'loading.tsx と error.tsx による UX 向上',
                    'metadata の設定方法',
                ],
                'sections' => [
                    [
                        'type' => 'text',
                        'title' => 'Next.js の特殊ファイル',
                        'content' => '<p>Next.js の App Router には、特定の名前のファイルに特別な意味があります。Laravelには直接の対応がない概念ですが、ミドルウェアやエラーハンドリングの仕組みと似た部分もあります。</p>',
                    ],
                    [
                        'type' => 'code',
                        'title' => '特殊ファイルの一覧',
                        'code' => "app/\n├── layout.tsx     # 共通レイアウト（Blade の @@extends に相当）\n├── page.tsx       # ページ本体（コントローラー+ビューに相当）\n├── loading.tsx    # ローディング UI（Laravel にはない概念）\n├── error.tsx      # エラー UI（Laravel の例外ハンドラに相当）\n├── not-found.tsx  # 404 ページ\n└── template.tsx   # テンプレート（再レンダリングされるレイアウト）",
                        'language' => 'text',
                        'filename' => 'ディレクトリ構造',
                    ],
                    [
                        'type' => 'text',
                        'title' => 'Server Components vs Client Components',
                        'content' => '<p>Next.js の App Router では、コンポーネントはデフォルトで <strong>Server Component</strong> です。サーバー上でHTMLにレンダリングされ、JavaScriptバンドルに含まれません。</p><p>ブラウザのAPIやReactのState/Effectを使いたい場合は、ファイルの先頭に <code>"use client"</code> を付けて <strong>Client Component</strong> にします。</p><p>LaravelでいうBladeテンプレート（サーバーサイド）と、Inertia/Reactコンポーネント（クライアントサイド）の使い分けに似ています。</p>',
                    ],
                    [
                        'type' => 'code',
                        'title' => 'Server Component（デフォルト）',
                        'code' => "// src/app/page.tsx\n// \"use client\" がないので Server Component\n\nexport default function HomePage() {\n  // ここで直接DBアクセスやAPI呼び出しが可能\n  // （Laravelのコントローラーのようなイメージ）\n  return (\n    <div>\n      <h1>Space Invaders</h1>\n      <p>サーバーでレンダリングされます</p>\n    </div>\n  );\n}",
                        'language' => 'tsx',
                        'filename' => 'src/app/page.tsx (Server Component)',
                        'highlights' => [2],
                    ],
                    [
                        'type' => 'code',
                        'title' => 'Client Component',
                        'code' => "// src/app/game/GameCanvas.tsx\n\"use client\"; // ← これを付けるとClient Component\n\nimport { useRef, useEffect, useState } from 'react';\n\nexport default function GameCanvas() {\n  const canvasRef = useRef<HTMLCanvasElement>(null);\n  const [score, setScore] = useState(0);\n\n  useEffect(() => {\n    // Canvas API はブラウザのAPIなので\n    // Client Component でしか使えない\n    const ctx = canvasRef.current?.getContext('2d');\n    // ゲームの描画処理...\n  }, []);\n\n  return <canvas ref={canvasRef} width={640} height={480} />;\n}",
                        'language' => 'tsx',
                        'filename' => 'src/app/game/GameCanvas.tsx (Client Component)',
                        'highlights' => [2, 7, 8, 10],
                    ],
                    [
                        'type' => 'tip',
                        'title' => 'インベーダーゲームでの使い分け',
                        'content' => 'ゲームのCanvas描画部分は Client Component にする必要があります（ブラウザAPIを使うため）。一方、ゲームのページ全体のレイアウトやメタデータ設定は Server Component のままにできます。この使い分けがNext.jsの設計の肝になります。',
                    ],
                    [
                        'type' => 'exercise',
                        'title' => '演習: レイアウトを構築しよう',
                        'tasks' => [
                            'src/app/layout.tsx にヘッダー・フッターを含む共通レイアウトを作成する',
                            'src/app/game/layout.tsx にゲーム専用のサブレイアウトを作成する',
                            'loading.tsx を作成してページ遷移時のローディングUIを実装する',
                            '"use client" を使った簡単なカウンターコンポーネントを作成し、Server/Client Componentの違いを体験する',
                        ],
                    ],
                ],
            ],
            4 => [
                'number' => 4,
                'title' => 'Canvas でゲーム画面を描画する',
                'description' => 'HTML Canvas APIの基礎を学び、React ComponentとしてCanvas要素を統合します。',
                'objectives' => [
                    'Canvas API の基本的な描画メソッドを理解する',
                    'React の useRef で Canvas 要素を参照する',
                    'useEffect 内でのCanvas初期化パターン',
                    'ゲーム画面の基本的な描画を実装する',
                ],
                'sections' => [
                    [
                        'type' => 'text',
                        'title' => 'Canvas API とは',
                        'content' => '<p>HTML Canvas は、JavaScriptでピクセル単位の描画ができるブラウザAPIです。ゲーム、グラフ、画像編集など、動的な描画が必要な場面で使われます。</p><p>ReactでCanvasを使う際の基本パターンは、<code>useRef</code> でCanvas要素を参照し、<code>useEffect</code> 内で描画処理を行うことです。</p>',
                    ],
                    [
                        'type' => 'code',
                        'title' => 'React + Canvas の基本パターン',
                        'code' => "\"use client\";\n\nimport { useRef, useEffect } from 'react';\n\nconst CANVAS_WIDTH = 640;\nconst CANVAS_HEIGHT = 480;\n\nexport default function GameCanvas() {\n  const canvasRef = useRef<HTMLCanvasElement>(null);\n\n  useEffect(() => {\n    const canvas = canvasRef.current;\n    if (!canvas) return;\n\n    const ctx = canvas.getContext('2d');\n    if (!ctx) return;\n\n    // 背景を描画\n    ctx.fillStyle = '#0f172a';\n    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);\n\n    // テキストを描画\n    ctx.fillStyle = '#22d3ee';\n    ctx.font = '24px monospace';\n    ctx.textAlign = 'center';\n    ctx.fillText(\n      'Space Invaders',\n      CANVAS_WIDTH / 2,\n      CANVAS_HEIGHT / 2\n    );\n  }, []);\n\n  return (\n    <canvas\n      ref={canvasRef}\n      width={CANVAS_WIDTH}\n      height={CANVAS_HEIGHT}\n      className=\"border border-gray-700 rounded-lg\"\n    />\n  );\n}",
                        'language' => 'tsx',
                        'filename' => 'src/app/game/GameCanvas.tsx',
                        'highlights' => [1, 9, 11, 15],
                    ],
                    [
                        'type' => 'code',
                        'title' => 'Canvas の基本描画メソッド',
                        'description' => 'ゲームで使う主要な描画メソッドを紹介します。',
                        'code' => "// 矩形の描画（インベーダーや弾に使用）\nctx.fillStyle = '#22d3ee';\nctx.fillRect(x, y, width, height);\n\n// 三角形の描画（自機に使用）\nctx.beginPath();\nctx.moveTo(x + width / 2, y);         // 頂点\nctx.lineTo(x + width, y + height);     // 右下\nctx.lineTo(x, y + height);             // 左下\nctx.closePath();\nctx.fill();\n\n// テキストの描画（スコア表示に使用）\nctx.fillStyle = '#ffffff';\nctx.font = '16px monospace';\nctx.textAlign = 'left';\nctx.fillText(`SCORE: ${score}`, 10, 25);\n\n// 画面クリア（毎フレーム最初に実行）\nctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);",
                        'language' => 'tsx',
                        'filename' => 'Canvas 描画メソッド',
                    ],
                    [
                        'type' => 'code',
                        'title' => 'インベーダーの描画',
                        'description' => 'ピクセルアート風のインベーダーをCanvasに描画します。',
                        'code' => "function drawInvader(\n  ctx: CanvasRenderingContext2D,\n  x: number,\n  y: number,\n  color: string\n) {\n  const px = 3; // 1ピクセルのサイズ\n  const pattern = [\n    [0,0,1,0,0,0,0,1,0,0],\n    [0,0,0,1,0,0,1,0,0,0],\n    [0,0,1,1,1,1,1,1,0,0],\n    [0,1,1,0,1,1,0,1,1,0],\n    [1,1,1,1,1,1,1,1,1,1],\n    [1,0,1,1,1,1,1,1,0,1],\n    [1,0,1,0,0,0,0,1,0,1],\n    [0,0,0,1,1,1,1,0,0,0],\n  ];\n\n  ctx.fillStyle = color;\n  for (let row = 0; row < pattern.length; row++) {\n    for (let col = 0; col < pattern[row].length; col++) {\n      if (pattern[row][col]) {\n        ctx.fillRect(\n          x + col * px,\n          y + row * px,\n          px, px\n        );\n      }\n    }\n  }\n}",
                        'language' => 'tsx',
                        'filename' => 'drawInvader 関数',
                    ],
                    [
                        'type' => 'exercise',
                        'title' => '演習: Canvas に描画してみよう',
                        'tasks' => [
                            'GameCanvas コンポーネントを作成し、暗い背景色で塗りつぶす',
                            '画面中央に「Space Invaders」というタイトルを描画する',
                            'drawInvader 関数を実装して、インベーダーを1体描画する',
                            '3種類の色でインベーダーを5×8のグリッドに並べて描画する',
                            '三角形で自機（プレイヤー）を画面下部に描画する',
                        ],
                    ],
                ],
            ],
            5 => [
                'number' => 5,
                'title' => 'ゲームループと状態管理',
                'description' => 'requestAnimationFrameによるゲームループの実装と、ゲーム状態の設計パターンを学びます。',
                'objectives' => [
                    'requestAnimationFrame によるゲームループの構築',
                    'ゲーム状態の型定義と初期化',
                    '状態更新関数のイミュータブルな実装',
                    'React の re-render とゲームループの分離',
                ],
                'sections' => [
                    [
                        'type' => 'text',
                        'title' => 'ゲームループとは',
                        'content' => '<p>ゲームループは「状態の更新 → 画面の描画」を毎フレーム繰り返す仕組みです。Webでは <code>requestAnimationFrame</code> を使い、ブラウザのリフレッシュレート（通常60FPS）に同期してループを回します。</p><p>重要なのは、ゲームの状態管理をReactのstateではなく、<code>useRef</code> で直接管理することです。Reactのstateを毎フレーム更新すると、毎フレーム再レンダリングが発生してパフォーマンスが悪化します。</p>',
                    ],
                    [
                        'type' => 'code',
                        'title' => 'ゲーム状態の型定義',
                        'code' => "// src/game/types.ts\nexport interface Position {\n  x: number;\n  y: number;\n}\n\nexport interface Player {\n  x: number;\n  y: number;\n  width: number;\n  height: number;\n  speed: number;\n}\n\nexport interface Invader {\n  x: number;\n  y: number;\n  width: number;\n  height: number;\n  alive: boolean;\n  type: number; // 0, 1, 2 で見た目を変える\n}\n\nexport interface Bullet {\n  x: number;\n  y: number;\n  speed: number;\n  width: number;\n  height: number;\n}\n\nexport interface GameState {\n  player: Player;\n  invaders: Invader[];\n  playerBullets: Bullet[];\n  invaderBullets: Bullet[];\n  score: number;\n  lives: number;\n  status: 'playing' | 'gameover' | 'win';\n}",
                        'language' => 'tsx',
                        'filename' => 'src/game/types.ts',
                    ],
                    [
                        'type' => 'code',
                        'title' => 'ゲームループの実装',
                        'description' => 'useRefでゲーム状態を管理し、requestAnimationFrameでループを回すパターン。',
                        'code' => "\"use client\";\nimport { useRef, useEffect } from 'react';\nimport { createInitialState, updateGameState } from '@/game/engine';\nimport { render } from '@/game/renderer';\nimport type { GameState } from '@/game/types';\n\nexport default function GameCanvas() {\n  const canvasRef = useRef<HTMLCanvasElement>(null);\n  // ゲーム状態は useRef で管理（re-render を避ける）\n  const gameStateRef = useRef<GameState>(createInitialState());\n  const keysRef = useRef<Set<string>>(new Set());\n  const frameRef = useRef<number>(0);\n\n  useEffect(() => {\n    const canvas = canvasRef.current;\n    const ctx = canvas?.getContext('2d');\n    if (!canvas || !ctx) return;\n\n    const gameLoop = (time: number) => {\n      // 1. 状態を更新\n      gameStateRef.current = updateGameState(\n        gameStateRef.current,\n        keysRef.current,\n        Date.now()\n      );\n\n      // 2. 画面を描画\n      render(ctx, gameStateRef.current, time);\n\n      // 3. 次のフレームを予約\n      frameRef.current = requestAnimationFrame(gameLoop);\n    };\n\n    frameRef.current = requestAnimationFrame(gameLoop);\n\n    return () => cancelAnimationFrame(frameRef.current);\n  }, []);\n\n  return <canvas ref={canvasRef} width={640} height={480} />;\n}",
                        'language' => 'tsx',
                        'filename' => 'GameCanvas.tsx',
                        'highlights' => [9, 10, 11, 20, 21, 28, 31],
                    ],
                    [
                        'type' => 'tip',
                        'title' => 'なぜ useState ではなく useRef？',
                        'content' => 'ゲームは60FPSで状態更新します。useState で管理すると毎秒60回のre-renderが発生し、パフォーマンスが大幅に悪化します。useRef なら値を変更してもre-renderは発生しません。UIに表示したいスコアなどは、スロットリング（100ms間隔など）でuseStateに反映させます。',
                    ],
                    [
                        'type' => 'code',
                        'title' => 'キーボード入力の処理',
                        'code' => "// キーの押下状態を Set で管理\nconst keysRef = useRef<Set<string>>(new Set());\n\nuseEffect(() => {\n  const handleKeyDown = (e: KeyboardEvent) => {\n    keysRef.current.add(e.key);\n    // スペースキーで弾を発射\n    if (e.key === ' ') {\n      e.preventDefault();\n      gameStateRef.current = playerShoot(\n        gameStateRef.current\n      );\n    }\n  };\n\n  const handleKeyUp = (e: KeyboardEvent) => {\n    keysRef.current.delete(e.key);\n  };\n\n  window.addEventListener('keydown', handleKeyDown);\n  window.addEventListener('keyup', handleKeyUp);\n\n  return () => {\n    window.removeEventListener('keydown', handleKeyDown);\n    window.removeEventListener('keyup', handleKeyUp);\n  };\n}, []);",
                        'language' => 'tsx',
                        'filename' => 'キーボード入力処理',
                        'highlights' => [2, 6, 17],
                    ],
                    [
                        'type' => 'exercise',
                        'title' => '演習: ゲームループを実装しよう',
                        'tasks' => [
                            'GameState の型定義を作成する',
                            'createInitialState 関数で初期状態を作成する',
                            'requestAnimationFrame でゲームループを実装する',
                            'キーボードイベントを追加し、←→キーで自機が移動することを確認',
                            'スペースキーで弾が発射されることを確認',
                        ],
                    ],
                ],
            ],
            6 => [
                'number' => 6,
                'title' => '自機・敵・弾の実装',
                'description' => 'プレイヤー、インベーダー、弾のエンティティを実装し、ゲームメカニクスを完成させます。',
                'objectives' => [
                    'プレイヤーの移動とシューティングの実装',
                    'インベーダーの隊列移動パターン',
                    '弾の発射と移動ロジック',
                    '当たり判定（矩形衝突検出）の実装',
                ],
                'sections' => [
                    [
                        'type' => 'text',
                        'title' => 'エンティティの更新ロジック',
                        'content' => '<p>ゲームの各エンティティ（プレイヤー、インベーダー、弾）はイミュータブルな関数で更新します。Reactの状態更新と同じ考え方で、前の状態から新しい状態を作成します。</p>',
                    ],
                    [
                        'type' => 'code',
                        'title' => 'インベーダーの隊列移動',
                        'description' => 'インベーダーは左右に移動し、端に到達したら一段下がって反転します。',
                        'code' => "function moveInvaders(state: GameState): GameState {\n  const alive = state.invaders.filter(inv => inv.alive);\n  if (alive.length === 0) return state;\n\n  const minX = Math.min(...alive.map(inv => inv.x));\n  const maxX = Math.max(...alive.map(inv => inv.x + inv.width));\n\n  // 端に到達したか判定\n  const shouldDescend =\n    (state.invaderDirection > 0 && maxX >= CANVAS_WIDTH - 10) ||\n    (state.invaderDirection < 0 && minX <= 10);\n\n  const newInvaders = state.invaders.map(inv => {\n    if (!inv.alive) return inv;\n    if (shouldDescend) {\n      return { ...inv, y: inv.y + 15 }; // 一段下がる\n    }\n    return {\n      ...inv,\n      x: inv.x + state.invaderSpeed * state.invaderDirection,\n    };\n  });\n\n  return {\n    ...state,\n    invaders: newInvaders,\n    invaderDirection: shouldDescend\n      ? -state.invaderDirection  // 方向反転\n      : state.invaderDirection,\n  };\n}",
                        'language' => 'tsx',
                        'filename' => 'インベーダー移動ロジック',
                        'highlights' => [9, 10, 11, 16, 28],
                    ],
                    [
                        'type' => 'code',
                        'title' => '当たり判定（AABB衝突検出）',
                        'description' => '2つの矩形が重なっているかを判定するシンプルなアルゴリズムです。',
                        'code' => "// AABB (Axis-Aligned Bounding Box) 衝突検出\n// 2つの矩形が重なっていれば true\nfunction isColliding(\n  a: { x: number; y: number; width: number; height: number },\n  b: { x: number; y: number; width: number; height: number }\n): boolean {\n  return (\n    a.x < b.x + b.width &&\n    a.x + a.width > b.x &&\n    a.y < b.y + b.height &&\n    a.y + a.height > b.y\n  );\n}\n\n// 使用例: 弾とインベーダーの当たり判定\n// イミュータブルに新しい配列を作成\nconst newInvaders = state.invaders.map(invader => {\n  if (!invader.alive) return invader;\n  const hit = state.playerBullets.some(\n    bullet => isColliding(bullet, invader)\n  );\n  if (hit) {\n    score += (invader.type + 1) * 10;\n    return { ...invader, alive: false };\n  }\n  return invader;\n});",
                        'language' => 'tsx',
                        'filename' => '当たり判定',
                        'highlights' => [7, 8, 9, 10, 11],
                    ],
                    [
                        'type' => 'tip',
                        'title' => 'パフォーマンスのヒント',
                        'content' => '当たり判定は毎フレーム全組み合わせをチェックするため、エンティティ数が多いとボトルネックになります。インベーダーゲーム程度なら問題ありませんが、大規模なゲームでは空間分割（Quadtree等）でチェック数を減らす最適化が必要です。',
                    ],
                    [
                        'type' => 'exercise',
                        'title' => '演習: ゲームメカニクスを実装しよう',
                        'tasks' => [
                            'インベーダーの隊列移動（左右移動 + 端で下降）を実装する',
                            '自機の弾が画面上部に飛んでいく処理を実装する',
                            'AABB当たり判定を実装し、弾がインベーダーに当たると消えるようにする',
                            'インベーダーからランダムに弾が発射される処理を追加する',
                            'インベーダーの弾が自機に当たったらライフを減らす処理を追加する',
                        ],
                    ],
                ],
            ],
            7 => [
                'number' => 7,
                'title' => 'スコア表示とReact UIの統合',
                'description' => 'CanvasゲームとReact UIコンポーネントを統合し、ゲームUI全体を完成させます。',
                'objectives' => [
                    'Canvas ゲームの状態を React UI に反映する',
                    'ゲームオーバー / ステージクリア画面の実装',
                    'カスタムフックによるゲームロジックの分離',
                    'パフォーマンスを考慮した状態の反映方法',
                ],
                'sections' => [
                    [
                        'type' => 'text',
                        'title' => 'Canvas と React UI の統合',
                        'content' => '<p>ゲームのメイン描画はCanvas内で行いますが、スコア表示やゲームオーバー画面などのUIはReactコンポーネントで実装することもできます。Canvas内に描画する方法とReactで重ねる方法、それぞれにメリットがあります。</p>',
                    ],
                    [
                        'type' => 'code',
                        'title' => 'スロットリングによるUI更新',
                        'description' => 'ゲーム状態のReactへの反映は、パフォーマンスを考慮してスロットリングします。',
                        'code' => "\"use client\";\nimport { useRef, useEffect, useState } from 'react';\n\nexport default function SpaceInvadersGame() {\n  const gameStateRef = useRef(createInitialState());\n  // UI表示用の state（スロットリングで更新）\n  const [displayScore, setDisplayScore] = useState(0);\n  const [displayLives, setDisplayLives] = useState(3);\n  const [gameStatus, setGameStatus] = useState<'playing'|'gameover'|'win'>('playing');\n\n  useEffect(() => {\n    let lastUIUpdate = 0;\n\n    const gameLoop = (time: number) => {\n      // ゲーム状態更新 & 描画...\n\n      // 100ms間隔でReact UIを更新\n      if (time - lastUIUpdate > 100) {\n        setDisplayScore(gameStateRef.current.score);\n        setDisplayLives(gameStateRef.current.lives);\n        setGameStatus(gameStateRef.current.status);\n        lastUIUpdate = time;\n      }\n\n      requestAnimationFrame(gameLoop);\n    };\n    requestAnimationFrame(gameLoop);\n  }, []);\n\n  return (\n    <div className=\"flex flex-col items-center gap-4\">\n      <canvas ref={canvasRef} width={640} height={480} />\n\n      {/* React UIでスコアボードを表示 */}\n      <div className=\"flex gap-6\">\n        <div>SCORE: {displayScore}</div>\n        <div>LIVES: {'♥'.repeat(displayLives)}</div>\n      </div>\n\n      {gameStatus === 'gameover' && (\n        <div>GAME OVER - Press Enter to restart</div>\n      )}\n    </div>\n  );\n}",
                        'language' => 'tsx',
                        'filename' => 'SpaceInvadersGame.tsx',
                        'highlights' => [7, 8, 9, 17, 18, 19, 20, 21],
                    ],
                    [
                        'type' => 'code',
                        'title' => 'パーティクルエフェクト',
                        'description' => 'インベーダー撃破時にパーティクルを生成して視覚効果を追加します。',
                        'code' => "interface Particle {\n  x: number;\n  y: number;\n  vx: number;      // X方向の速度\n  vy: number;      // Y方向の速度\n  life: number;    // 残りライフ (0〜1)\n  color: string;\n  size: number;\n}\n\nfunction createParticles(\n  x: number, y: number, color: string, count = 8\n): Particle[] {\n  return Array.from({ length: count }, () => ({\n    x,\n    y,\n    vx: (Math.random() - 0.5) * 4,  // ランダムな方向\n    vy: (Math.random() - 0.5) * 4,\n    life: 1,\n    color,\n    size: 1 + Math.random() * 3,\n  }));\n}\n\n// 描画時に透明度をlifeに連動させてフェードアウト\nfor (const p of particles) {\n  ctx.globalAlpha = p.life;\n  ctx.fillStyle = p.color;\n  ctx.fillRect(p.x, p.y, p.size, p.size);\n}\nctx.globalAlpha = 1;",
                        'language' => 'tsx',
                        'filename' => 'パーティクルエフェクト',
                    ],
                    [
                        'type' => 'exercise',
                        'title' => '演習: UIを完成させよう',
                        'tasks' => [
                            'スコアボードをReact UIとして Canvas の外側に表示する',
                            'ゲームオーバー画面のオーバーレイを実装する',
                            'ステージクリア時に次のレベルに進む機能を追加する',
                            'パーティクルエフェクトを実装して撃破演出を追加する',
                            'ポーズ機能（Pキー）を実装する',
                        ],
                    ],
                ],
            ],
            8 => [
                'number' => 8,
                'title' => 'ビルドとデプロイ',
                'description' => 'Next.jsアプリケーションの本番ビルドとVercelへのデプロイ方法を学びます。',
                'objectives' => [
                    'next build による本番ビルドの実行',
                    'ビルド成果物の構造を理解する',
                    'Vercel へのデプロイ手順',
                    'Laravelのデプロイフローとの比較',
                ],
                'sections' => [
                    [
                        'type' => 'text',
                        'title' => '本番ビルド',
                        'content' => '<p>Next.jsの本番ビルドは <code>npm run build</code>（= <code>next build</code>）で実行します。Server ComponentsはビルドタイムにHTMLとしてレンダリングされ、Client Componentsは最適化されたJavaScriptバンドルに変換されます。</p>',
                    ],
                    [
                        'type' => 'comparison',
                        'title' => 'デプロイフローの比較',
                        'laravelCode' => "# Laravel デプロイ\ncomposer install --no-dev\nnpm run build\nphp artisan config:cache\nphp artisan route:cache\nphp artisan view:cache\nphp artisan migrate --force\n\n# 必要な環境:\n# - PHP 8.x + Composer\n# - MySQL / PostgreSQL\n# - Nginx / Apache\n# - Node.js (フロントビルド用)",
                        'nextjsCode' => "# Next.js デプロイ (Vercel)\n# GitHubにpushするだけ！\ngit push origin main\n\n# Vercelが自動で:\n# 1. npm install\n# 2. npm run build\n# 3. デプロイ\n# を実行してくれる\n\n# 必要な環境:\n# - Vercel アカウント (無料)\n# - GitHub リポジトリ\n# - 以上！",
                    ],
                    [
                        'type' => 'code',
                        'title' => 'ビルドの実行',
                        'code' => "# 本番ビルド\nnpm run build\n\n# ビルド結果の確認\n# .next/ ディレクトリにビルド成果物が生成される\n# ├── .next/\n# │   ├── static/    # 静的ファイル（JS, CSS）\n# │   ├── server/    # サーバーサイドレンダリング用\n# │   └── cache/     # キャッシュ\n\n# ローカルで本番モードをテスト\nnpm run start\n# => http://localhost:3000 (本番モード)",
                        'language' => 'bash',
                        'filename' => 'Terminal',
                    ],
                    [
                        'type' => 'code',
                        'title' => 'Vercel へのデプロイ手順',
                        'code' => "# 1. Vercel CLI のインストール\nnpm i -g vercel\n\n# 2. Vercel にログイン\nvercel login\n\n# 3. デプロイ（初回）\nvercel\n\n# 4. 本番デプロイ\nvercel --prod\n\n# もしくは GitHub 連携で自動デプロイ:\n# 1. https://vercel.com にアクセス\n# 2. 「New Project」→ GitHub リポジトリを選択\n# 3. 「Deploy」をクリック\n# 4. 以後、git push で自動デプロイ",
                        'language' => 'bash',
                        'filename' => 'Vercel デプロイ',
                    ],
                    [
                        'type' => 'tip',
                        'title' => 'Laravelエンジニアへ: デプロイの違い',
                        'content' => 'LaravelではPHP対応のサーバー、DBサーバー、Webサーバー（Nginx等）のセットアップが必要です。Next.jsはVercelを使えば、git pushだけで自動的にビルド・デプロイされます。インフラの管理コストが大幅に下がるのがメリットです。ただし、Vercelのフリープランには制限があるため、大規模なプロジェクトでは有料プランやセルフホスティングも検討しましょう。',
                    ],
                    [
                        'type' => 'code',
                        'title' => '環境変数の設定',
                        'description' => 'LaravelのENVファイルと同様に、Next.jsにも環境変数の仕組みがあります。',
                        'code' => "// .env.local（Laravelの .env に相当）\nDATABASE_URL=postgresql://...\n\n// NEXT_PUBLIC_ プレフィックスで\n// クライアントサイドでも使える環境変数になる\nNEXT_PUBLIC_API_URL=https://api.example.com\n\n// next.config.ts での設定\nconst nextConfig = {\n  env: {\n    CUSTOM_KEY: 'value',\n  },\n};",
                        'language' => 'bash',
                        'filename' => '.env.local',
                    ],
                    [
                        'type' => 'exercise',
                        'title' => '演習: デプロイしてみよう',
                        'tasks' => [
                            'npm run build を実行して、ビルドが成功することを確認する',
                            'npm run start で本番モードを起動し、ゲームが動作することを確認する',
                            'GitHubにリポジトリを作成してソースコードをpushする',
                            'Vercelアカウントを作成し、GitHubリポジトリを連携する',
                            'デプロイされたURLにアクセスして、公開されたゲームを確認する',
                        ],
                    ],
                    [
                        'type' => 'text',
                        'title' => 'おわりに',
                        'content' => '<p>お疲れさまでした！ 全8チャプターを通じて、Next.jsのApp Routerを使ったWebアプリケーション開発の基礎を学びました。</p><p>インベーダーゲームという題材を通じて、以下の概念を体験的に理解できたはずです：</p><ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style: disc;"><li>ファイルベースルーティング</li><li>Server / Client Components</li><li>レイアウトシステム</li><li>React + Canvas の統合パターン</li><li>Vercel へのデプロイ</li></ul><p style="margin-top: 1rem;">ここで学んだ知識をベースに、APIルート、データフェッチ、認証など、さらに深いNext.jsの機能を探求してみてください。</p>',
                    ],
                ],
            ],
        ];
    }

    private function getQuizzes(): array
    {
        return [
            1 => [
                ['id' => 'q1-1', 'question' => 'Next.jsプロジェクトを作成するコマンドは？', 'options' => ['composer create-project next/app', 'npx create-next-app@latest', 'npm init next-app', 'yarn create next'], 'correctIndex' => 1, 'explanation' => 'Next.jsでは npx create-next-app@latest を使ってプロジェクトを作成します。LaravelのComposerではなくnpmエコシステムを使います。'],
                ['id' => 'q1-2', 'question' => 'Laravelの composer.json に相当するNode.jsのファイルは？', 'options' => ['node.json', 'yarn.lock', 'package.json', 'tsconfig.json'], 'correctIndex' => 2, 'explanation' => 'package.json はプロジェクトの依存関係やスクリプトを定義するファイルで、Laravelの composer.json に相当します。'],
                ['id' => 'q1-3', 'question' => 'Next.jsの開発サーバーを起動するコマンドは？', 'options' => ['php artisan serve', 'npm run dev', 'next start', 'node server.js'], 'correctIndex' => 1, 'explanation' => 'npm run dev で開発サーバーが起動し、http://localhost:3000 でアクセスできます。Laravelの php artisan serve に相当します。'],
            ],
            2 => [
                ['id' => 'q2-1', 'question' => '/about ページを作るために必要なファイルパスは？', 'options' => ['routes/about.php', 'pages/about.js', 'src/app/about/page.tsx', 'views/about.blade.php'], 'correctIndex' => 2, 'explanation' => 'App Routerではディレクトリ構造がそのままURLになります。src/app/about/page.tsx を作成すると /about でアクセスできます。'],
                ['id' => 'q2-2', 'question' => '動的ルート（例: /game/:id）を作るフォルダ名の書き方は？', 'options' => ['{id}', ':id', '[id]', '$id'], 'correctIndex' => 2, 'explanation' => 'Next.jsの動的ルートは [id] のように角括弧で囲みます。Laravelの {id} とは書き方が異なります。Next.js 15ではparamsはPromiseになり、awaitして値を取り出します。'],
                ['id' => 'q2-3', 'question' => 'LaravelのRoute::get()に相当するNext.jsの仕組みは？', 'options' => ['next.config.js のルート定義', 'ファイルベースルーティング', 'express.jsのルーター', 'APIルート定義ファイル'], 'correctIndex' => 1, 'explanation' => 'Next.js App Routerではルーティング定義ファイルは不要で、ファイル/フォルダの構造がそのままURLルーティングになります。'],
            ],
            3 => [
                ['id' => 'q3-1', 'question' => 'Client Componentにするために必要な宣言は？', 'options' => ['export client', '"use client"', '@client', 'client: true'], 'correctIndex' => 1, 'explanation' => 'ファイルの先頭に "use client" と宣言することで、そのコンポーネントはClient Componentとして扱われます。'],
                ['id' => 'q3-2', 'question' => 'Next.js App Routerでコンポーネントのデフォルトはどちら？', 'options' => ['Client Component', 'Server Component', 'Hybrid Component', 'Static Component'], 'correctIndex' => 1, 'explanation' => 'App RouterではすべてのコンポーネントはデフォルトでServer Componentです。"use client"を付けない限りサーバーで実行されます。'],
                ['id' => 'q3-3', 'question' => 'layout.tsx の {children} に入るのは？', 'options' => ['props として渡されたデータ', '同階層以下の page.tsx の内容', 'グローバルなCSS', 'ヘッダーコンポーネント'], 'correctIndex' => 1, 'explanation' => 'layout.tsx の children には、同じディレクトリまたはサブディレクトリの page.tsx がレンダリングされて挿入されます。'],
            ],
            4 => [
                ['id' => 'q4-1', 'question' => 'ReactでCanvas要素を参照するために使うフックは？', 'options' => ['useState', 'useEffect', 'useRef', 'useContext'], 'correctIndex' => 2, 'explanation' => 'useRef を使ってCanvas要素のDOM参照を取得します。useRef は再レンダリングを引き起こさずに値を保持できます。'],
                ['id' => 'q4-2', 'question' => 'Canvas描画の初期化に適切なフックは？', 'options' => ['useState', 'useEffect', 'useMemo', 'useCallback'], 'correctIndex' => 1, 'explanation' => 'useEffect はコンポーネントのマウント後に副作用を実行するフックで、Canvas描画の初期化に最適です。'],
                ['id' => 'q4-3', 'question' => 'Canvasに矩形を塗りつぶして描画するメソッドは？', 'options' => ['drawRect()', 'fillRect()', 'strokeRect()', 'paintRect()'], 'correctIndex' => 1, 'explanation' => 'fillRect(x, y, width, height) は指定した座標とサイズで塗りつぶされた矩形を描画します。'],
            ],
            5 => [
                ['id' => 'q5-1', 'question' => '60FPSのゲームループを実現するためのブラウザAPIは？', 'options' => ['setInterval', 'setTimeout', 'requestAnimationFrame', 'setImmediate'], 'correctIndex' => 2, 'explanation' => 'requestAnimationFrame はブラウザのリフレッシュレートに同期してコールバックを実行するAPIで、滑らかなアニメーションを実現できます。'],
                ['id' => 'q5-2', 'question' => 'ゲーム状態を毎フレームuseStateで更新しない理由は？', 'options' => ['useStateは非同期だから', 're-renderが毎秒60回発生するから', 'useStateはオブジェクトを保存できないから', 'useStateはCanvas内で使えないから'], 'correctIndex' => 1, 'explanation' => 'useStateを毎フレーム更新すると毎秒60回のre-renderが発生し、パフォーマンスが大幅に悪化します。代わりにuseRefで管理します。'],
                ['id' => 'q5-3', 'question' => 'キーボードの同時押しを管理するのに適したデータ構造は？', 'options' => ['配列 (Array)', 'オブジェクト (Object)', 'Set', 'Map'], 'correctIndex' => 2, 'explanation' => 'Setはユニークな値のコレクションで、キーの押下状態をadd/deleteで管理するのに最適です。重複も防げます。'],
            ],
            6 => [
                ['id' => 'q6-1', 'question' => '矩形同士の衝突検出アルゴリズムの名前は？', 'options' => ['SAT (Separating Axis Theorem)', 'AABB (Axis-Aligned Bounding Box)', 'BFS (Breadth-First Search)', 'Ray Casting'], 'correctIndex' => 1, 'explanation' => 'AABB（軸平行バウンディングボックス）は、2つの矩形が重なっているかを4つの条件で判定するシンプルなアルゴリズムです。'],
                ['id' => 'q6-2', 'question' => 'イミュータブルな状態更新でよく使うJavaScriptの構文は？', 'options' => ['Object.assign()', 'スプレッド構文 (...)', 'JSON.parse(JSON.stringify())', 'structuredClone()'], 'correctIndex' => 1, 'explanation' => 'スプレッド構文 {...state, key: newValue} を使うと、元のオブジェクトを変更せずに新しいオブジェクトを作成できます。Reactの状態更新の基本パターンです。'],
                ['id' => 'q6-3', 'question' => 'インベーダーが画面端に到達したときの動きは？', 'options' => ['消滅する', '反対側から出てくる', '一段下がって方向を反転する', '速度が上がる'], 'correctIndex' => 2, 'explanation' => 'クラシックなインベーダーゲームでは、隊列が画面端に到達すると一段下がって移動方向を反転します。これによりプレイヤーに近づいていきます。'],
            ],
            7 => [
                ['id' => 'q7-1', 'question' => 'Canvasのゲーム状態をReact UIに反映する際のパフォーマンス対策は？', 'options' => ['useMemoで計算をキャッシュ', 'React.memoでコンポーネントをメモ化', 'スロットリングで更新頻度を制限', 'Web Workerで別スレッド処理'], 'correctIndex' => 2, 'explanation' => 'ゲームは60FPSで動作しますが、React UIの更新は100ms間隔程度にスロットリングすることで、不要なre-renderを防ぎます。'],
                ['id' => 'q7-2', 'question' => 'パーティクルのフェードアウトに使うCanvasのプロパティは？', 'options' => ['ctx.opacity', 'ctx.globalAlpha', 'ctx.transparency', 'ctx.fadeLevel'], 'correctIndex' => 1, 'explanation' => 'ctx.globalAlpha は描画の透明度を0〜1で設定するプロパティです。パーティクルのライフに連動させてフェードアウトを表現します。'],
                ['id' => 'q7-3', 'question' => 'ゲーム状態をuseRefで管理する最大の理由は？', 'options' => ['DOMの参照が必要だから', 're-renderを避けてパフォーマンスを維持するため', 'useStateよりメモリ効率が良いから', 'TypeScriptの型推論が効きやすいから'], 'correctIndex' => 1, 'explanation' => 'useRefは値が変更されてもre-renderを発生させません。60FPSで状態更新するゲームでは、この特性が不可欠です。'],
            ],
            8 => [
                ['id' => 'q8-1', 'question' => 'Next.jsの本番ビルドを実行するコマンドは？', 'options' => ['npm run build', 'next compile', 'npm run production', 'next export'], 'correctIndex' => 0, 'explanation' => 'npm run build（= next build）で本番用の最適化されたビルドが生成されます。.next/ ディレクトリにビルド成果物が出力されます。'],
                ['id' => 'q8-2', 'question' => 'Next.jsアプリケーションの推奨デプロイ先は？', 'options' => ['AWS EC2', 'Heroku', 'Vercel', 'Firebase'], 'correctIndex' => 2, 'explanation' => 'VercelはNext.jsの開発元が提供するホスティングサービスで、Git連携による自動デプロイ、エッジ関数など最適化された環境を提供します。'],
                ['id' => 'q8-3', 'question' => 'クライアントサイドで使える環境変数のプレフィックスは？', 'options' => ['PUBLIC_', 'CLIENT_', 'NEXT_PUBLIC_', 'BROWSER_'], 'correctIndex' => 2, 'explanation' => 'NEXT_PUBLIC_ プレフィックスを付けた環境変数はクライアントサイドのJavaScriptバンドルに含まれ、ブラウザからアクセスできます。'],
            ],
        ];
    }
}
