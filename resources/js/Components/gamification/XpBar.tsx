import { useGamification } from '@/contexts/GamificationContext';

export default function XpBar() {
    const { state, currentLevel, xpProgress, nextLevel } = useGamification();

    return (
        <div className="flex items-center gap-3">
            {/* Level badge */}
            <div className="flex items-center gap-1.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {currentLevel.level}
                </span>
                <span className="hidden text-xs font-medium text-gray-400 sm:block">
                    {currentLevel.title}
                </span>
            </div>

            {/* XP progress bar */}
            <div className="hidden w-24 sm:block">
                <div className="h-1.5 rounded-full bg-dark-lighter">
                    <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                        style={{ width: `${xpProgress}%` }}
                    />
                </div>
                <div className="mt-0.5 flex justify-between text-[10px] text-gray-500">
                    <span>{state.xp} XP</span>
                    {nextLevel && <span>{nextLevel.requiredXp}</span>}
                </div>
            </div>
        </div>
    );
}
