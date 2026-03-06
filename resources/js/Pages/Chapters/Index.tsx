import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import ChapterCard from '@/Components/ChapterCard';
import { useGamification } from '@/contexts/GamificationContext';

const chapters = [
    {
        number: 1,
        title: 'Next.js プロジェクト作成と環境構築',
        description: 'create-next-appでプロジェクトを作成し、TypeScript・Tailwind CSS・ESLintの設定を行います。LaravelのComposerと比較しながらNode.jsエコシステムを理解します。',
        tags: ['create-next-app', 'TypeScript', 'Tailwind CSS', 'npm'],
        difficulty: 'beginner' as const,
    },
    {
        number: 2,
        title: 'App Router とファイルベースルーティング',
        description: 'Next.jsのApp Routerによるファイルベースルーティングを学びます。Laravelのweb.phpとの違い、動的ルーティング、ルートグループを解説します。',
        tags: ['App Router', 'page.tsx', '動的ルート', 'route groups'],
        difficulty: 'beginner' as const,
    },
    {
        number: 3,
        title: 'レイアウトとページ構成',
        description: 'layout.tsx、template.tsx、loading.tsx、error.tsxなどの特殊ファイルを活用してページ構成を設計します。LaravelのBladeレイアウトとの比較も行います。',
        tags: ['layout.tsx', 'Server Components', 'Client Components', 'Suspense'],
        difficulty: 'beginner' as const,
    },
    {
        number: 4,
        title: 'Canvas でゲーム画面を描画する',
        description: 'HTML Canvas APIの基礎を学び、React ComponentとしてCanvas要素をマウント。useRefとuseEffectを活用してゲームの描画基盤を構築します。',
        tags: ['Canvas API', 'useRef', 'useEffect', '描画基礎'],
        difficulty: 'intermediate' as const,
    },
    {
        number: 5,
        title: 'ゲームループと状態管理',
        description: 'requestAnimationFrameによるゲームループの実装と、ゲーム状態の設計パターンを学びます。Reactのステート管理との使い分けを解説します。',
        tags: ['requestAnimationFrame', 'ゲームループ', 'useReducer', 'パフォーマンス'],
        difficulty: 'intermediate' as const,
    },
    {
        number: 6,
        title: '自機・敵・弾の実装',
        description: 'プレイヤー、インベーダー、弾のエンティティを実装し、キーボード入力、移動ロジック、当たり判定を追加してゲームを完成させます。',
        tags: ['エンティティ設計', 'キーボード入力', '当たり判定', 'クラス設計'],
        difficulty: 'intermediate' as const,
    },
    {
        number: 7,
        title: 'スコア表示とReact UIの統合',
        description: 'CanvasゲームとReact UIコンポーネントを統合し、スコア表示、ゲームオーバー画面、リスタート機能などを実装します。',
        tags: ['React統合', 'イベント連携', 'UIオーバーレイ', 'カスタムフック'],
        difficulty: 'advanced' as const,
    },
    {
        number: 8,
        title: 'ビルドとデプロイ',
        description: 'Next.jsアプリケーションの本番ビルド、パフォーマンス最適化、Vercelへのデプロイ方法を学びます。LaravelのデプロイフローとCI/CDの比較も行います。',
        tags: ['next build', 'Vercel', '最適化', 'CI/CD'],
        difficulty: 'advanced' as const,
    },
];

export default function ChaptersIndex() {
    const { state } = useGamification();
    const completedCount = state.completedChapters.length;
    const progressPercent = Math.round((completedCount / 8) * 100);

    return (
        <MainLayout>
            <Head title="チャプター一覧" />

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-3xl font-extrabold text-white sm:text-4xl">チャプター一覧</h1>
                    <p className="mt-3 max-w-2xl text-lg text-gray-400">
                        全8チャプターで、環境構築からデプロイまでを段階的に学習します。
                        各チャプターにはコード例と演習課題が含まれています。
                    </p>
                </div>

                {/* Progress bar */}
                <div className="mb-10 rounded-lg border border-dark-lighter bg-dark-light p-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-gray-400">学習進捗</span>
                        <span className="text-gray-500">{completedCount} / 8 チャプター完了</span>
                    </div>
                    <div className="h-2 rounded-full bg-dark">
                        <div
                            className="h-2 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                {/* Difficulty legend */}
                <div className="mb-8 flex flex-wrap gap-4 text-xs">
                    <span className="flex items-center gap-1.5">
                        <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                        入門：React / Laravel の基礎知識があればOK
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="inline-block h-2 w-2 rounded-full bg-yellow-400" />
                        中級：Canvas API やゲームプログラミングの基礎
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="inline-block h-2 w-2 rounded-full bg-red-400" />
                        上級：React との統合やデプロイの最適化
                    </span>
                </div>

                {/* Chapter grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {chapters.map((chapter) => (
                        <ChapterCard
                            key={chapter.number}
                            number={chapter.number}
                            title={chapter.title}
                            description={chapter.description}
                            tags={chapter.tags}
                            href={`/chapters/${chapter.number}`}
                            difficulty={chapter.difficulty}
                        />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
