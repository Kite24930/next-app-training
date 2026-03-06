import { useState } from 'react';
import { useGamification } from '@/contexts/GamificationContext';

interface Props {
    chapterId: number;
}

export default function ChapterComplete({ chapterId }: Props) {
    const { state, completeChapter } = useGamification();
    const isCompleted = state.completedChapters.includes(chapterId);
    const [justCompleted, setJustCompleted] = useState(false);

    const handleComplete = () => {
        if (isCompleted) return;
        completeChapter(chapterId);
        setJustCompleted(true);
    };

    if (isCompleted && !justCompleted) {
        return (
            <div className="my-8 flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/5 p-5">
                <span className="text-2xl">✅</span>
                <div>
                    <p className="font-bold text-green-400">このチャプターは完了済みです</p>
                    <p className="text-xs text-gray-400">+50 XP 獲得済み</p>
                </div>
            </div>
        );
    }

    if (justCompleted) {
        return (
            <div className="my-8 rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 p-6 text-center">
                <span className="text-4xl">🎉</span>
                <p className="mt-2 text-lg font-bold text-white">チャプター完了！</p>
                <p className="mt-1 text-sm text-accent">+50 XP 獲得</p>
            </div>
        );
    }

    return (
        <div className="my-8 text-center">
            <button
                onClick={handleComplete}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-8 py-3 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110"
            >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                このチャプターを完了する
            </button>
            <p className="mt-2 text-xs text-gray-500">完了すると +50 XP を獲得できます</p>
        </div>
    );
}
