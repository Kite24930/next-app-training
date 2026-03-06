import { Link } from '@inertiajs/react';
import { ReactNode, useState } from 'react';

interface Props {
    children: ReactNode;
}

export default function MainLayout({ children }: Props) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-dark text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-dark-lighter bg-dark/90 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <span className="text-2xl">👾</span>
                            <span className="text-lg font-bold text-white">
                                Next.js <span className="text-accent">Invaders</span>
                            </span>
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden items-center gap-8 md:flex">
                            <Link
                                href="/"
                                className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
                            >
                                ホーム
                            </Link>
                            <Link
                                href="/chapters"
                                className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
                            >
                                チャプター
                            </Link>
                            <Link
                                href="/demo"
                                className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
                            >
                                デモ
                            </Link>
                            <Link
                                href="/about"
                                className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
                            >
                                About
                            </Link>
                        </nav>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="メニュー"
                        >
                            <svg className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <nav className="border-t border-dark-lighter py-4 md:hidden">
                            <div className="flex flex-col gap-3">
                                <Link href="/" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-dark-lighter hover:text-white">ホーム</Link>
                                <Link href="/chapters" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-dark-lighter hover:text-white">チャプター</Link>
                                <Link href="/demo" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-dark-lighter hover:text-white">デモ</Link>
                                <Link href="/about" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-dark-lighter hover:text-white">About</Link>
                            </div>
                        </nav>
                    )}
                </div>
            </header>

            {/* Main content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="border-t border-dark-lighter bg-dark">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-3">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xl">👾</span>
                                <span className="font-bold text-white">Next.js Invaders</span>
                            </div>
                            <p className="mt-3 text-sm text-gray-400">
                                Laravel + React エンジニアのための<br />
                                Next.js ハンズオン学習サイト
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-3 text-sm font-semibold text-white">コンテンツ</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link href="/chapters" className="hover:text-white">チャプター一覧</Link></li>
                                <li><Link href="/demo" className="hover:text-white">ゲームデモ</Link></li>
                                <li><Link href="/about" className="hover:text-white">このサイトについて</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-3 text-sm font-semibold text-white">技術スタック</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>学習対象: Next.js (App Router)</li>
                                <li>サイト構築: Laravel + Inertia.js + React</li>
                                <li>ゲーム描画: HTML Canvas API</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-dark-lighter pt-8 text-center text-sm text-gray-500">
                        &copy; 2026 Next.js Invaders Learning Site. Built for learning purposes.
                    </div>
                </div>
            </footer>
        </div>
    );
}
