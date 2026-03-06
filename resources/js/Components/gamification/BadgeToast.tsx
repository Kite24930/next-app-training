import { useEffect, useState } from 'react';
import { useGamification } from '@/contexts/GamificationContext';

export default function BadgeToast() {
    const { recentBadge, dismissBadge } = useGamification();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (recentBadge) {
            // Small delay for enter animation
            requestAnimationFrame(() => setVisible(true));
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(dismissBadge, 300);
            }, 4000);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }
    }, [recentBadge, dismissBadge]);

    if (!recentBadge) return null;

    return (
        <div
            className={`fixed right-4 bottom-4 z-50 transition-all duration-300 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
        >
            <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-dark-light px-5 py-4 shadow-xl shadow-primary/10">
                <span className="text-3xl">{recentBadge.icon}</span>
                <div>
                    <div className="text-xs font-medium text-primary">バッジ獲得！</div>
                    <div className="text-sm font-bold text-white">{recentBadge.name}</div>
                    <div className="text-xs text-gray-400">{recentBadge.description}</div>
                </div>
                <button
                    onClick={() => {
                        setVisible(false);
                        setTimeout(dismissBadge, 300);
                    }}
                    className="ml-2 text-gray-500 hover:text-white"
                >
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
