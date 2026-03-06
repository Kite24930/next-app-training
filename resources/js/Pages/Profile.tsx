import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import ProfileSection from '@/Components/gamification/ProfileSection';
import BadgeGrid from '@/Components/gamification/BadgeGrid';
import { useGamification } from '@/contexts/GamificationContext';
import { LEVELS } from '@/lib/gamification';

export default function Profile() {
    const { state, currentLevel } = useGamification();

    return (
        <MainLayout>
            <Head title="実績・プロフィール" />

            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="mb-8 text-3xl font-extrabold text-white">実績・プロフィール</h1>

                {/* Progress overview */}
                <ProfileSection />

                {/* Level progression */}
                <section className="mt-10">
                    <h2 className="mb-4 text-xl font-bold text-white">レベル一覧</h2>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        {LEVELS.map((lvl) => {
                            const isReached = currentLevel.level >= lvl.level;
                            return (
                                <div
                                    key={lvl.level}
                                    className={`rounded-lg border p-4 ${
                                        isReached
                                            ? 'border-primary/30 bg-primary/5'
                                            : 'border-dark-lighter bg-dark-light opacity-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                                            isReached ? 'bg-primary text-white' : 'bg-dark-lighter text-gray-500'
                                        }`}>
                                            {lvl.level}
                                        </span>
                                        <div>
                                            <div className="text-sm font-bold text-white">{lvl.title}</div>
                                            <div className="text-xs text-gray-400">{lvl.requiredXp} XP</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Badges */}
                <section className="mt-10">
                    <h2 className="mb-2 text-xl font-bold text-white">バッジ一覧</h2>
                    <p className="mb-6 text-sm text-gray-400">
                        {state.unlockedBadges.length} / 15 獲得済み
                    </p>
                    <BadgeGrid />
                </section>

                {/* Quiz results */}
                {Object.keys(state.quizResults).length > 0 && (
                    <section className="mt-10">
                        <h2 className="mb-4 text-xl font-bold text-white">クイズ成績</h2>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {Object.entries(state.quizResults).map(([chapterId, result]) => (
                                <div key={chapterId} className="rounded-lg border border-dark-lighter bg-dark-light p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-300">
                                            Chapter {String(chapterId).padStart(2, '0')}
                                        </span>
                                        <span className={`text-sm font-bold ${
                                            result.score === result.total ? 'text-green-400' :
                                            result.score / result.total >= 0.8 ? 'text-accent' :
                                            'text-yellow-400'
                                        }`}>
                                            {result.score}/{result.total}
                                            ({Math.round((result.score / result.total) * 100)}%)
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Game stats */}
                <section className="mt-10">
                    <h2 className="mb-4 text-xl font-bold text-white">ゲーム記録</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border border-dark-lighter bg-dark-light p-6 text-center">
                            <div className="text-xs text-gray-500 mb-2">ハイスコア</div>
                            <div className="font-mono text-3xl font-bold text-accent">
                                {state.gameHighScore.toLocaleString()}
                            </div>
                        </div>
                        <div className="rounded-lg border border-dark-lighter bg-dark-light p-6 text-center">
                            <div className="text-xs text-gray-500 mb-2">最高到達レベル</div>
                            <div className="font-mono text-3xl font-bold text-primary">
                                {state.gameMaxLevel > 0 ? `Level ${state.gameMaxLevel}` : '---'}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
