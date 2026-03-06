import { useEffect, useState } from 'react';
import { useGamification } from '@/contexts/GamificationContext';

export default function LevelUpModal() {
    const { levelUpInfo, dismissLevelUp } = useGamification();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (levelUpInfo) {
            requestAnimationFrame(() => setVisible(true));
        }
    }, [levelUpInfo]);

    if (!levelUpInfo) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
                visible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" onClick={() => {
                setVisible(false);
                setTimeout(dismissLevelUp, 300);
            }} />

            {/* Modal */}
            <div className={`relative rounded-2xl border border-primary/30 bg-dark-light p-8 text-center shadow-2xl shadow-primary/20 transition-all duration-500 ${
                visible ? 'scale-100' : 'scale-90'
            }`}>
                {/* Glow effect */}
                <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-xl" />

                <div className="text-5xl mb-4">🎉</div>
                <div className="text-sm font-medium text-primary mb-1">LEVEL UP!</div>
                <div className="text-4xl font-extrabold text-white mb-2">
                    Level {levelUpInfo.level}
                </div>
                <div className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
                    {levelUpInfo.title}
                </div>
                <button
                    onClick={() => {
                        setVisible(false);
                        setTimeout(dismissLevelUp, 300);
                    }}
                    className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                    OK
                </button>
            </div>
        </div>
    );
}
