import { BADGES } from '@/lib/gamification';
import { useGamification } from '@/contexts/GamificationContext';

interface Props {
    showAll?: boolean;
}

export default function BadgeGrid({ showAll = true }: Props) {
    const { state } = useGamification();
    const badges = showAll ? BADGES : BADGES.filter((b) => state.unlockedBadges.includes(b.id));

    const categories = [
        { key: 'learning', label: '学習' },
        { key: 'quiz', label: 'クイズ' },
        { key: 'game', label: 'ゲーム' },
        { key: 'meta', label: 'その他' },
    ] as const;

    return (
        <div className="space-y-6">
            {categories.map((cat) => {
                const catBadges = badges.filter((b) => b.category === cat.key);
                if (catBadges.length === 0) return null;
                return (
                    <div key={cat.key}>
                        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                            {cat.label}
                        </h4>
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                            {catBadges.map((badge) => {
                                const unlocked = state.unlockedBadges.includes(badge.id);
                                return (
                                    <div
                                        key={badge.id}
                                        className={`flex flex-col items-center rounded-xl border p-3 text-center transition-all ${
                                            unlocked
                                                ? 'border-primary/30 bg-primary/5'
                                                : 'border-dark-lighter bg-dark opacity-50 grayscale'
                                        }`}
                                    >
                                        <span className="text-2xl">{badge.icon}</span>
                                        <span className="mt-1.5 text-xs font-bold text-white leading-tight">
                                            {badge.name}
                                        </span>
                                        <span className="mt-1 text-[10px] leading-tight text-gray-400">
                                            {badge.description}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
