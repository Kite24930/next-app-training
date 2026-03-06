import { Link } from '@inertiajs/react';
import { useGamification } from '@/contexts/GamificationContext';

interface Props {
    number: number;
    title: string;
    description: string;
    tags: string[];
    href: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const difficultyConfig = {
    beginner: { label: '入門', color: 'bg-green-500/20 text-green-400' },
    intermediate: { label: '中級', color: 'bg-yellow-500/20 text-yellow-400' },
    advanced: { label: '上級', color: 'bg-red-500/20 text-red-400' },
};

export default function ChapterCard({ number, title, description, tags, href, difficulty }: Props) {
    const diff = difficultyConfig[difficulty];
    const { state } = useGamification();
    const isCompleted = state.completedChapters.includes(number);
    const quizResult = state.quizResults[number];

    return (
        <Link
            href={href}
            className={`group relative block rounded-xl border p-6 transition-all hover:shadow-lg hover:shadow-primary/5 ${
                isCompleted
                    ? 'border-green-500/30 bg-green-500/5 hover:border-green-500/50'
                    : 'border-dark-lighter bg-dark-light hover:border-primary/50'
            }`}
        >
            {/* Completed badge */}
            {isCompleted && (
                <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs text-white shadow-lg">
                    ✓
                </div>
            )}

            <div className="mb-3 flex items-center justify-between">
                <span className={`text-sm font-bold ${isCompleted ? 'text-green-400' : 'text-primary'}`}>
                    Chapter {String(number).padStart(2, '0')}
                </span>
                <div className="flex items-center gap-2">
                    {quizResult && (
                        <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent">
                            {quizResult.score}/{quizResult.total}
                        </span>
                    )}
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${diff.color}`}>
                        {diff.label}
                    </span>
                </div>
            </div>
            <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-accent">
                {title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-gray-400">
                {description}
            </p>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-dark px-2 py-1 text-xs text-gray-400">
                        {tag}
                    </span>
                ))}
            </div>
        </Link>
    );
}
