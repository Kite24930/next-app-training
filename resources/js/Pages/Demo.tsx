import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import SpaceInvadersGame from '@/Components/SpaceInvadersGame';

export default function Demo() {
    return (
        <MainLayout>
            <Head title="ゲームデモ" />

            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                        👾 Space Invaders Demo
                    </h1>
                    <p className="mt-3 text-gray-400">
                        このゲームは全8チャプターを通じて Next.js + Canvas で構築する完成版です
                    </p>
                </div>

                <SpaceInvadersGame />

                <div className="mt-12 rounded-xl border border-dark-lighter bg-dark-light p-8">
                    <h2 className="mb-4 text-lg font-bold text-white">このゲームで使われている技術</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-dark p-4">
                            <h3 className="mb-2 text-sm font-bold text-primary">React + Canvas</h3>
                            <p className="text-xs leading-relaxed text-gray-400">
                                useRef でCanvas要素を参照し、useEffect内でゲームループを実行。
                                Reactのライフサイクルとブラウザ描画APIの統合パターンを学べます。
                            </p>
                        </div>
                        <div className="rounded-lg bg-dark p-4">
                            <h3 className="mb-2 text-sm font-bold text-primary">ゲームループ設計</h3>
                            <p className="text-xs leading-relaxed text-gray-400">
                                requestAnimationFrame による60FPSゲームループ。
                                状態更新と描画を分離した設計で、パフォーマンスを最適化しています。
                            </p>
                        </div>
                        <div className="rounded-lg bg-dark p-4">
                            <h3 className="mb-2 text-sm font-bold text-primary">エンティティ管理</h3>
                            <p className="text-xs leading-relaxed text-gray-400">
                                プレイヤー、インベーダー、弾、パーティクルなどの
                                エンティティをイミュータブルなデータ構造で管理するパターン。
                            </p>
                        </div>
                        <div className="rounded-lg bg-dark p-4">
                            <h3 className="mb-2 text-sm font-bold text-primary">React UI統合</h3>
                            <p className="text-xs leading-relaxed text-gray-400">
                                Canvas内のゲーム状態をReact UIに反映。
                                パフォーマンスを考慮したスロットリング付きのstate更新を実装。
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            href="/chapters/1"
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                        >
                            Chapter 01 から作り方を学ぶ
                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
