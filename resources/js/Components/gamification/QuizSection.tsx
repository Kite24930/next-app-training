import { useState, useCallback } from 'react';
import { useGamification } from '@/contexts/GamificationContext';

export interface QuizQuestionData {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

interface Props {
    chapterId: number;
    questions: QuizQuestionData[];
}

export default function QuizSection({ chapterId, questions }: Props) {
    const { state, submitQuiz } = useGamification();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
    const [quizComplete, setQuizComplete] = useState(false);

    const existingResult = state.quizResults[chapterId];
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedOption === currentQuestion?.correctIndex;

    const handleSelect = useCallback((optionIndex: number) => {
        if (showResult) return;
        setSelectedOption(optionIndex);
    }, [showResult]);

    const handleSubmitAnswer = useCallback(() => {
        if (selectedOption === null) return;
        setShowResult(true);
        setAnswers((prev) => {
            const next = [...prev];
            next[currentIndex] = selectedOption;
            return next;
        });
    }, [selectedOption, currentIndex]);

    const handleNext = useCallback(() => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setSelectedOption(null);
            setShowResult(false);
        } else {
            // Quiz complete
            const correctCount = answers.reduce<number>((acc, ans, i) => {
                const finalAns = i === currentIndex ? selectedOption : ans;
                return acc + (finalAns === questions[i].correctIndex ? 1 : 0);
            }, 0);
            submitQuiz(chapterId, correctCount, questions.length);
            setQuizComplete(true);
        }
    }, [currentIndex, questions, answers, selectedOption, chapterId, submitQuiz]);

    const correctCount = answers.reduce<number>((acc, ans, i) => {
        return acc + (ans === questions[i].correctIndex ? 1 : 0);
    }, 0);

    // Already completed
    if (existingResult && !quizComplete) {
        return (
            <div className="my-8 rounded-xl border border-green-500/20 bg-green-500/5 p-6">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                        <h3 className="font-bold text-white">クイズ完了済み</h3>
                        <p className="text-sm text-gray-400">
                            スコア: {existingResult.score}/{existingResult.total}
                            （{Math.round((existingResult.score / existingResult.total) * 100)}%）
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setCurrentIndex(0);
                        setSelectedOption(null);
                        setShowResult(false);
                        setAnswers(new Array(questions.length).fill(null));
                        setQuizComplete(false);
                    }}
                    className="mt-3 text-sm text-primary hover:text-accent"
                >
                    もう一度チャレンジする →
                </button>
            </div>
        );
    }

    // Quiz complete screen
    if (quizComplete) {
        const score = correctCount + (selectedOption === questions[currentIndex]?.correctIndex ? 1 : 0);
        const isPerfect = score === questions.length;
        return (
            <div className="my-8 rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
                <span className="text-4xl">{isPerfect ? '🎉' : score > questions.length / 2 ? '👍' : '📚'}</span>
                <h3 className="mt-3 text-xl font-bold text-white">クイズ完了！</h3>
                <p className="mt-2 text-3xl font-extrabold">
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {score} / {questions.length}
                    </span>
                </p>
                <p className="mt-2 text-sm text-gray-400">
                    {isPerfect ? '完璧です！ボーナスXPを獲得しました！' :
                        score > questions.length / 2 ? 'よくできました！' : 'もう一度復習してみましょう'}
                </p>
                <div className="mt-4 text-sm text-accent">
                    +{score * 20}{isPerfect ? ' +30 ボーナス' : ''} XP
                </div>
            </div>
        );
    }

    return (
        <div className="my-8 rounded-xl border border-accent/20 bg-accent/5 p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-bold text-accent">
                    <span>📝</span> 理解度チェック
                </h3>
                <span className="text-sm text-gray-400">
                    {currentIndex + 1} / {questions.length}
                </span>
            </div>

            {/* Progress dots */}
            <div className="mb-6 flex gap-1.5">
                {questions.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                            i < currentIndex ? 'bg-accent' :
                            i === currentIndex ? 'bg-primary' :
                            'bg-dark-lighter'
                        }`}
                    />
                ))}
            </div>

            {/* Question */}
            <p className="mb-5 text-base font-medium text-white">{currentQuestion.question}</p>

            {/* Options */}
            <div className="space-y-2">
                {currentQuestion.options.map((option, i) => {
                    let optionStyle = 'border-dark-lighter bg-dark hover:border-primary/50';
                    if (showResult) {
                        if (i === currentQuestion.correctIndex) {
                            optionStyle = 'border-green-500/50 bg-green-500/10';
                        } else if (i === selectedOption && !isCorrect) {
                            optionStyle = 'border-red-500/50 bg-red-500/10';
                        } else {
                            optionStyle = 'border-dark-lighter bg-dark opacity-50';
                        }
                    } else if (i === selectedOption) {
                        optionStyle = 'border-primary bg-primary/10';
                    }

                    return (
                        <button
                            key={i}
                            onClick={() => handleSelect(i)}
                            disabled={showResult}
                            className={`w-full rounded-lg border p-3 text-left text-sm transition-all ${optionStyle}`}
                        >
                            <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-dark-lighter text-xs font-bold text-gray-400">
                                {String.fromCharCode(65 + i)}
                            </span>
                            <span className={showResult && i === currentQuestion.correctIndex ? 'text-green-400' : 'text-gray-300'}>
                                {option}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Explanation */}
            {showResult && (
                <div className={`mt-4 rounded-lg p-4 text-sm ${isCorrect ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300'}`}>
                    <span className="font-bold">{isCorrect ? '正解！ ' : '不正解 '}</span>
                    {currentQuestion.explanation}
                </div>
            )}

            {/* Action button */}
            <div className="mt-5 flex justify-end">
                {!showResult ? (
                    <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedOption === null}
                        className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
                    >
                        回答する
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-dark transition-colors hover:bg-accent/80"
                    >
                        {currentIndex < questions.length - 1 ? '次の問題' : '結果を見る'}
                    </button>
                )}
            </div>
        </div>
    );
}
