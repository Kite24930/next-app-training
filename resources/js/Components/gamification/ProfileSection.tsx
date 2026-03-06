import { useGamification } from '@/contexts/GamificationContext';
import { BADGES } from '@/lib/gamification';

export default function ProfileSection() {
    const { state, currentLevel, xpProgress, nextLevel } = useGamification();

    const completedCount = state.completedChapters.length;
    const badgeCount = state.unlockedBadges.length;
    const totalBadges = BADGES.length;
    const quizCount = Object.keys(state.quizResults).length;

    return (
        <div className="rounded-xl border border-dark-lighter bg-dark-light p-6">
            {/* Level & XP */}
            <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xl font-extrabold text-white shadow-lg shadow-primary/20">
                    {currentLevel.level}
                </div>
                <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-white">{currentLevel.title}</span>
                        <span className="text-xs text-gray-500">Lv.{currentLevel.level}</span>
                    </div>
                    <div className="mt-1.5 h-2 rounded-full bg-dark">
                        <div
                            className="h-2 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
                            style={{ width: `${xpProgress}%` }}
                        />
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                        <span>{state.xp} XP</span>
                        {nextLevel ? (
                            <span>次のレベルまで {nextLevel.requiredXp - state.xp} XP</span>
                        ) : (
                            <span>MAX LEVEL</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-lg bg-dark p-3 text-center">
                    <div className="text-xl font-bold text-accent">{completedCount}/8</div>
                    <div className="text-xs text-gray-400">チャプター</div>
                </div>
                <div className="rounded-lg bg-dark p-3 text-center">
                    <div className="text-xl font-bold text-primary">{quizCount}/8</div>
                    <div className="text-xs text-gray-400">クイズ完了</div>
                </div>
                <div className="rounded-lg bg-dark p-3 text-center">
                    <div className="text-xl font-bold text-yellow-400">{badgeCount}/{totalBadges}</div>
                    <div className="text-xs text-gray-400">バッジ</div>
                </div>
                <div className="rounded-lg bg-dark p-3 text-center">
                    <div className="text-xl font-bold text-pink-400">{state.gameHighScore.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">ハイスコア</div>
                </div>
            </div>

            {/* Recent badges */}
            {badgeCount > 0 && (
                <div className="mt-4">
                    <div className="mb-2 text-xs font-medium text-gray-500">獲得バッジ</div>
                    <div className="flex flex-wrap gap-2">
                        {state.unlockedBadges.slice(-6).map((id) => {
                            const badge = BADGES.find((b) => b.id === id);
                            if (!badge) return null;
                            return (
                                <span
                                    key={id}
                                    title={badge.name}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-lg"
                                >
                                    {badge.icon}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
