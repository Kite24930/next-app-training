import { useState } from 'react';

interface Props {
    code: string;
    language?: string;
    filename?: string;
    highlights?: number[];
}

export default function CodeBlock({ code, language = 'tsx', filename, highlights = [] }: Props) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const lines = code.split('\n');

    return (
        <div className="group my-4 overflow-hidden rounded-lg border border-dark-lighter bg-[#0d1117]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-dark-lighter bg-dark-light px-4 py-2">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-accent">{language}</span>
                    {filename && (
                        <span className="text-xs text-gray-500">— {filename}</span>
                    )}
                </div>
                <button
                    onClick={handleCopy}
                    className="rounded px-2 py-1 text-xs text-gray-400 transition-colors hover:bg-dark-lighter hover:text-white"
                >
                    {copied ? '✓ コピー済み' : 'コピー'}
                </button>
            </div>

            {/* Code */}
            <div className="overflow-x-auto">
                <pre className="p-4 text-sm leading-relaxed">
                    <code>
                        {lines.map((line, i) => (
                            <div
                                key={i}
                                className={`flex ${highlights.includes(i + 1) ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}`}
                            >
                                <span className="mr-4 inline-block w-8 shrink-0 text-right text-gray-600 select-none">
                                    {i + 1}
                                </span>
                                <span className="text-gray-200">{line}</span>
                            </div>
                        ))}
                    </code>
                </pre>
            </div>
        </div>
    );
}
