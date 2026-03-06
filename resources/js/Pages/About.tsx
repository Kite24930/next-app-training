import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function About() {
    const techStack = [
        { category: '学習対象', items: ['Next.js 15 (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS', 'HTML Canvas API'] },
        { category: 'サイト構築', items: ['Laravel 12', 'Inertia.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vite'] },
        { category: '対象読者のスキル', items: ['Laravel (MVC, Eloquent, Blade)', 'React (Hooks, Components, JSX)', 'PHP / JavaScript', 'HTML / CSS'] },
    ];

    const faqs = [
        {
            q: 'Next.jsの経験がなくても大丈夫ですか？',
            a: 'はい。LaravelとReactの基本的な開発経験があれば、Chapter 1から順に学習できるよう設計されています。Laravelとの比較を交えながら解説するので、既存の知識を活かして効率的に理解できます。',
        },
        {
            q: 'ゲーム開発の経験は必要ですか？',
            a: 'いいえ。Canvas APIの基礎からステップバイステップで解説します。ゲーム開発はNext.jsの概念を楽しく学ぶための手段であり、ゲーム開発そのものが主目的ではありません。',
        },
        {
            q: 'なぜインベーダーゲームなのですか？',
            a: 'インベーダーゲームは、状態管理、ユーザー入力処理、アニメーション、コンポーネント設計など、Webアプリ開発に必要な多くの概念を含んでいます。シンプルなルールながら、実装を通じて実践的なスキルが身につきます。',
        },
        {
            q: 'このサイト自体はなぜLaravelで作られていますか？',
            a: '対象読者が普段使い慣れているLaravel + React (Inertia.js)で構築することで、「見慣れた技術で作られたサイト」と「学習するNext.js」の対比を体感していただくためです。',
        },
    ];

    return (
        <MainLayout>
            <Head title="About" />

            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h1 className="text-3xl font-extrabold text-white sm:text-4xl">このサイトについて</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
                        Laravel + React エンジニアが Next.js を効率的に学ぶための
                        ハンズオン学習プラットフォーム
                    </p>
                </div>

                {/* Concept */}
                <section className="mb-16">
                    <h2 className="mb-6 text-2xl font-bold text-white">コンセプト</h2>
                    <div className="rounded-xl border border-dark-lighter bg-dark-light p-8">
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                <strong className="text-white">Next.js Invaders</strong> は、普段の業務で Laravel と React を使っているエンジニアが、
                                新しい技術領域として Next.js を学ぶための教材サイトです。
                            </p>
                            <p>
                                単なるドキュメントの翻訳や座学ではなく、<strong className="text-accent">インベーダーゲームを実際に作りながら</strong>
                                Next.js の App Router、Server Components、ファイルベースルーティングなどの概念を体験的に理解できるよう設計しています。
                            </p>
                            <p>
                                各チャプターでは、Laravelでの実装方法と Next.js での実装方法を並べて比較するセクションを設け、
                                既存の知識と新しい知識を結びつけやすい構成になっています。
                            </p>
                        </div>
                    </div>
                </section>

                {/* Target */}
                <section className="mb-16">
                    <h2 className="mb-6 text-2xl font-bold text-white">対象読者</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-6">
                            <h3 className="mb-3 font-bold text-green-400">こんな方におすすめ</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-start gap-2"><span className="text-green-400">✓</span>Laravel + React で実務経験がある</li>
                                <li className="flex items-start gap-2"><span className="text-green-400">✓</span>Next.js に興味があるが触ったことがない</li>
                                <li className="flex items-start gap-2"><span className="text-green-400">✓</span>フロントエンド技術の幅を広げたい</li>
                                <li className="flex items-start gap-2"><span className="text-green-400">✓</span>座学より手を動かして学びたい</li>
                            </ul>
                        </div>
                        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
                            <h3 className="mb-3 font-bold text-red-400">前提知識</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-start gap-2"><span className="text-red-400">*</span>React の基本（コンポーネント、Hooks、JSX）</li>
                                <li className="flex items-start gap-2"><span className="text-red-400">*</span>JavaScript / TypeScript の基礎文法</li>
                                <li className="flex items-start gap-2"><span className="text-red-400">*</span>HTML / CSS の基礎</li>
                                <li className="flex items-start gap-2"><span className="text-red-400">*</span>ターミナル操作（npm, git）</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="mb-16">
                    <h2 className="mb-6 text-2xl font-bold text-white">技術スタック</h2>
                    <div className="grid gap-6 sm:grid-cols-3">
                        {techStack.map((stack) => (
                            <div key={stack.category} className="rounded-xl border border-dark-lighter bg-dark-light p-6">
                                <h3 className="mb-4 text-sm font-bold text-primary">{stack.category}</h3>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    {stack.items.map((item) => (
                                        <li key={item} className="flex items-center gap-2">
                                            <span className="h-1 w-1 rounded-full bg-accent" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section className="mb-16">
                    <h2 className="mb-6 text-2xl font-bold text-white">よくある質問</h2>
                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <div key={faq.q} className="rounded-xl border border-dark-lighter bg-dark-light p-6">
                                <h3 className="mb-3 font-bold text-white">{faq.q}</h3>
                                <p className="text-sm leading-relaxed text-gray-400">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
