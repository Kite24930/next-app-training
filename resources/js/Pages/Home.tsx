import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import ProfileSection from '@/Components/gamification/ProfileSection';

export default function Home() {
    const features = [
        {
            icon: '🗂️',
            title: 'App Router',
            description: 'ファイルベースルーティング、レイアウト、Server Componentsなど、Next.js 14+の最新アーキテクチャを学習',
        },
        {
            icon: '🎮',
            title: 'Canvas ゲーム開発',
            description: 'HTML Canvas APIを使ったインベーダーゲームの実装を通じて、Reactとブラウザ描画の統合を体験',
        },
        {
            icon: '🔄',
            title: 'Laravel との比較',
            description: 'ルーティング、ミドルウェア、SSRなど、Laravel開発者に馴染みのある概念との対比で理解を深める',
        },
        {
            icon: '🧪',
            title: 'ハンズオン形式',
            description: '各チャプターにコード例と演習を用意。実際に手を動かしながらステップバイステップで学べる',
        },
    ];

    const chapters = [
        { num: 1, title: 'Next.js プロジェクト作成', tag: '環境構築' },
        { num: 2, title: 'App Router と ルーティング', tag: 'ルーティング' },
        { num: 3, title: 'レイアウトとページ構成', tag: 'UI設計' },
        { num: 4, title: 'Canvas でゲーム画面を描く', tag: 'Canvas' },
        { num: 5, title: 'ゲームループと状態管理', tag: 'ゲーム開発' },
        { num: 6, title: '自機・敵・弾の実装', tag: 'ゲーム開発' },
        { num: 7, title: 'スコアとUI統合', tag: 'React連携' },
        { num: 8, title: 'デプロイと最適化', tag: 'デプロイ' },
    ];

    return (
        <MainLayout>
            <Head title="ホーム" />

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.15),transparent_70%)]" />

                <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
                            <span>🚀</span>
                            <span>Laravel + React エンジニア向け</span>
                        </div>

                        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            インベーダーゲームで学ぶ
                            <br />
                            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Next.js 開発入門
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
                            普段 Laravel + React を使っているエンジニアが、
                            <br className="hidden sm:block" />
                            ゲーム開発を通じて Next.js の App Router を実践的に学ぶハンズオン教材
                        </p>

                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href="/chapters"
                                className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
                            >
                                学習を始める
                                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <Link
                                href="/demo"
                                className="inline-flex items-center gap-2 rounded-lg border border-dark-lighter px-8 py-3 font-semibold text-gray-300 transition-colors hover:border-accent hover:text-accent"
                            >
                                👾 デモをプレイ
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Progress Section */}
            <section className="border-t border-dark-lighter bg-dark-light/30">
                <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-center text-lg font-bold text-white">あなたの学習進捗</h2>
                    <ProfileSection />
                </div>
            </section>

            {/* Features Section */}
            <section className="border-t border-dark-lighter bg-dark-light/50">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="text-2xl font-bold text-white sm:text-3xl">この教材の特徴</h2>
                        <p className="mt-3 text-gray-400">実務経験のあるエンジニアが効率的に学べるよう設計</p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="rounded-xl border border-dark-lighter bg-dark p-6 transition-colors hover:border-primary/30"
                            >
                                <span className="text-3xl">{feature.icon}</span>
                                <h3 className="mt-4 text-lg font-bold text-white">{feature.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Chapter Preview */}
            <section className="border-t border-dark-lighter">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="text-2xl font-bold text-white sm:text-3xl">全8チャプター構成</h2>
                        <p className="mt-3 text-gray-400">環境構築からデプロイまで、段階的にNext.jsを学習</p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {chapters.map((ch) => (
                            <Link
                                key={ch.num}
                                href={`/chapters/${ch.num}`}
                                className="group flex items-start gap-4 rounded-lg border border-dark-lighter bg-dark-light p-4 transition-all hover:border-primary/50"
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                                    {String(ch.num).padStart(2, '0')}
                                </span>
                                <div>
                                    <h4 className="text-sm font-bold text-white group-hover:text-accent">{ch.title}</h4>
                                    <span className="mt-1 inline-block rounded bg-dark px-2 py-0.5 text-xs text-gray-500">{ch.tag}</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <Link
                            href="/chapters"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent"
                        >
                            すべてのチャプターを見る
                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="border-t border-dark-lighter bg-gradient-to-b from-dark-light/50 to-dark">
                <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-white sm:text-3xl">
                        Laravel の経験を活かして
                        <br />
                        Next.js をマスターしよう
                    </h2>
                    <p className="mt-4 text-gray-400">
                        MVC、ルーティング、ミドルウェア——馴染みのある概念と対比しながら、
                        Next.js の新しいパラダイムを効率的に習得できます。
                    </p>
                    <Link
                        href="/chapters/1"
                        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
                    >
                        Chapter 01 から始める
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}
