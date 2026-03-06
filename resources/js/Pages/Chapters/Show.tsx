import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import CodeBlock from '@/Components/CodeBlock';
import ComparisonBlock from '@/Components/ComparisonBlock';
import QuizSection, { type QuizQuestionData } from '@/Components/gamification/QuizSection';
import ChapterComplete from '@/Components/gamification/ChapterComplete';

interface Section {
    type: 'text' | 'code' | 'comparison' | 'exercise' | 'tip';
    content?: string;
    code?: string;
    language?: string;
    filename?: string;
    highlights?: number[];
    laravelCode?: string;
    nextjsCode?: string;
    description?: string;
    title?: string;
    tasks?: string[];
}

interface ChapterData {
    number: number;
    title: string;
    description: string;
    objectives: string[];
    sections: Section[];
    quiz?: QuizQuestionData[];
    prevChapter: { number: number; title: string } | null;
    nextChapter: { number: number; title: string } | null;
}

interface Props {
    chapter: ChapterData;
}

export default function ChapterShow({ chapter }: Props) {
    return (
        <MainLayout>
            <Head title={`Chapter ${String(chapter.number).padStart(2, '0')}: ${chapter.title}`} />

            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/chapters" className="hover:text-white">チャプター</Link>
                    <span>/</span>
                    <span className="text-gray-300">Chapter {String(chapter.number).padStart(2, '0')}</span>
                </nav>

                {/* Header */}
                <header className="mb-12">
                    <span className="mb-2 inline-block text-sm font-bold text-primary">
                        Chapter {String(chapter.number).padStart(2, '0')}
                    </span>
                    <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{chapter.title}</h1>
                    <p className="mt-4 text-lg text-gray-400">{chapter.description}</p>

                    {/* Learning objectives */}
                    <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
                        <h3 className="mb-3 text-sm font-bold text-primary">このチャプターで学ぶこと</h3>
                        <ul className="space-y-2">
                            {chapter.objectives.map((obj, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                    <span className="mt-0.5 text-primary">▸</span>
                                    {obj}
                                </li>
                            ))}
                        </ul>
                    </div>
                </header>

                {/* Content sections */}
                <article className="space-y-8">
                    {chapter.sections.map((section, i) => {
                        switch (section.type) {
                            case 'text':
                                return (
                                    <div key={i} className="prose-custom">
                                        {section.title && (
                                            <h2 className="mb-4 text-xl font-bold text-white">{section.title}</h2>
                                        )}
                                        <div
                                            className="text-gray-300 leading-relaxed [&>p]:mb-4"
                                            dangerouslySetInnerHTML={{ __html: section.content || '' }}
                                        />
                                    </div>
                                );
                            case 'code':
                                return (
                                    <div key={i}>
                                        {section.title && (
                                            <h3 className="mb-3 text-lg font-bold text-white">{section.title}</h3>
                                        )}
                                        {section.description && (
                                            <p className="mb-3 text-sm text-gray-400">{section.description}</p>
                                        )}
                                        <CodeBlock
                                            code={section.code || ''}
                                            language={section.language}
                                            filename={section.filename}
                                            highlights={section.highlights}
                                        />
                                    </div>
                                );
                            case 'comparison':
                                return (
                                    <div key={i}>
                                        {section.title && (
                                            <h3 className="mb-3 text-lg font-bold text-white">{section.title}</h3>
                                        )}
                                        <ComparisonBlock
                                            laravelCode={section.laravelCode || ''}
                                            nextjsCode={section.nextjsCode || ''}
                                            description={section.description}
                                        />
                                    </div>
                                );
                            case 'exercise':
                                return (
                                    <div key={i} className="rounded-xl border border-accent/20 bg-accent/5 p-6">
                                        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-accent">
                                            <span>🏋️</span>
                                            {section.title || '演習'}
                                        </h3>
                                        {section.description && (
                                            <p className="mb-4 text-sm text-gray-300">{section.description}</p>
                                        )}
                                        {section.tasks && (
                                            <ol className="space-y-2">
                                                {section.tasks.map((task, j) => (
                                                    <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                                                            {j + 1}
                                                        </span>
                                                        {task}
                                                    </li>
                                                ))}
                                            </ol>
                                        )}
                                        {section.code && (
                                            <CodeBlock code={section.code} language={section.language} filename={section.filename} />
                                        )}
                                    </div>
                                );
                            case 'tip':
                                return (
                                    <div key={i} className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6">
                                        <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-yellow-400">
                                            <span>💡</span>
                                            {section.title || 'ヒント'}
                                        </h4>
                                        <p className="text-sm leading-relaxed text-gray-300">{section.content}</p>
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                </article>

                {/* Quiz section */}
                {chapter.quiz && chapter.quiz.length > 0 && (
                    <QuizSection chapterId={chapter.number} questions={chapter.quiz} />
                )}

                {/* Chapter complete button */}
                <ChapterComplete chapterId={chapter.number} />

                {/* Navigation */}
                <nav className="mt-8 flex items-center justify-between border-t border-dark-lighter pt-8">
                    {chapter.prevChapter ? (
                        <Link
                            href={`/chapters/${chapter.prevChapter.number}`}
                            className="group flex items-center gap-3 rounded-lg border border-dark-lighter px-4 py-3 transition-colors hover:border-primary/50"
                        >
                            <svg className="h-5 w-5 text-gray-500 transition-colors group-hover:text-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <div className="text-xs text-gray-500">前のチャプター</div>
                                <div className="text-sm font-medium text-gray-300">{chapter.prevChapter.title}</div>
                            </div>
                        </Link>
                    ) : <div />}

                    {chapter.nextChapter ? (
                        <Link
                            href={`/chapters/${chapter.nextChapter.number}`}
                            className="group flex items-center gap-3 rounded-lg border border-dark-lighter px-4 py-3 transition-colors hover:border-primary/50"
                        >
                            <div className="text-right">
                                <div className="text-xs text-gray-500">次のチャプター</div>
                                <div className="text-sm font-medium text-gray-300">{chapter.nextChapter.title}</div>
                            </div>
                            <svg className="h-5 w-5 text-gray-500 transition-colors group-hover:text-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    ) : (
                        <Link
                            href="/demo"
                            className="group flex items-center gap-3 rounded-lg border border-accent/30 bg-accent/5 px-4 py-3 transition-colors hover:border-accent/50"
                        >
                            <div className="text-right">
                                <div className="text-xs text-accent">完成！</div>
                                <div className="text-sm font-medium text-white">ゲームをプレイする</div>
                            </div>
                            <span className="text-xl">👾</span>
                        </Link>
                    )}
                </nav>
            </div>
        </MainLayout>
    );
}
