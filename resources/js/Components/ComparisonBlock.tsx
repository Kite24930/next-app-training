import CodeBlock from './CodeBlock';

interface Props {
    laravelCode: string;
    nextjsCode: string;
    laravelLabel?: string;
    nextjsLabel?: string;
    description?: string;
}

export default function ComparisonBlock({
    laravelCode,
    nextjsCode,
    laravelLabel = 'Laravel + React',
    nextjsLabel = 'Next.js (App Router)',
    description,
}: Props) {
    return (
        <div className="my-6">
            {description && (
                <p className="mb-3 text-sm text-gray-400">{description}</p>
            )}
            <div className="grid gap-4 lg:grid-cols-2">
                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-red-400" />
                        <span className="text-xs font-medium text-gray-400">{laravelLabel}</span>
                    </div>
                    <CodeBlock code={laravelCode} language="php" />
                </div>
                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                        <span className="text-xs font-medium text-gray-400">{nextjsLabel}</span>
                    </div>
                    <CodeBlock code={nextjsCode} language="tsx" />
                </div>
            </div>
        </div>
    );
}
