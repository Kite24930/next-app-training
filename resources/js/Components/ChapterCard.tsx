import { Link } from '@inertiajs/react';

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

    return (
        <Link
            href={href}
            className="group block rounded-xl border border-dark-lighter bg-dark-light p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
        >
            <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-bold text-primary">Chapter {String(number).padStart(2, '0')}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${diff.color}`}>
                    {diff.label}
                </span>
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
