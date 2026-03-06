import { createContext, useContext, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { createStorage, type GamificationState } from '@/lib/storage';
import {
    getLevelForXp,
    getNextLevel,
    getXpProgress,
    checkNewBadges,
    getBadgeById,
    XP_CHAPTER_COMPLETE,
    XP_QUIZ_CORRECT,
    XP_QUIZ_PERFECT_BONUS,
    XP_GAME_LEVEL_CLEAR,
    XP_GAME_SCORE_PER_1000,
    XP_GAME_SCORE_CAP,
    type LevelInfo,
    type Badge,
} from '@/lib/gamification';

interface GamificationContextValue {
    state: GamificationState;
    currentLevel: LevelInfo;
    xpProgress: number;
    nextLevel: LevelInfo | null;

    completeChapter(chapterId: number): void;
    submitQuiz(chapterId: number, score: number, total: number): void;
    updateGameScore(score: number, level: number, noDamage: boolean): void;
    trackCodeCopy(): void;
    trackPageVisit(page: string): void;

    recentBadge: Badge | null;
    dismissBadge(): void;
    levelUpInfo: LevelInfo | null;
    dismissLevelUp(): void;
}

const GamificationContext = createContext<GamificationContextValue | null>(null);

export function useGamification() {
    const ctx = useContext(GamificationContext);
    if (!ctx) throw new Error('useGamification must be used within GamificationProvider');
    return ctx;
}

interface Props {
    children: ReactNode;
}

export function GamificationProvider({ children }: Props) {
    const storageRef = useRef(createStorage());
    const [state, setState] = useState<GamificationState>(() => storageRef.current.load());
    const [recentBadge, setRecentBadge] = useState<Badge | null>(null);
    const [levelUpInfo, setLevelUpInfo] = useState<LevelInfo | null>(null);
    const badgeQueueRef = useRef<Badge[]>([]);

    // Persist state changes
    useEffect(() => {
        storageRef.current.save(state);
    }, [state]);

    const processNewBadges = useCallback((newState: GamificationState): GamificationState => {
        const newBadgeIds = checkNewBadges(newState);
        if (newBadgeIds.length === 0) return newState;

        const badges = newBadgeIds.map(getBadgeById).filter((b): b is Badge => !!b);
        badgeQueueRef.current.push(...badges);

        // Show first badge immediately if none showing
        if (!recentBadge && badges.length > 0) {
            setRecentBadge(badges[0]);
            badgeQueueRef.current.shift();
        }

        return {
            ...newState,
            unlockedBadges: [...newState.unlockedBadges, ...newBadgeIds],
        };
    }, [recentBadge]);

    const addXp = useCallback((currentState: GamificationState, amount: number): GamificationState => {
        const oldLevel = getLevelForXp(currentState.xp);
        const newXp = currentState.xp + amount;
        const newLevel = getLevelForXp(newXp);

        if (newLevel.level > oldLevel.level) {
            setLevelUpInfo(newLevel);
        }

        return { ...currentState, xp: newXp };
    }, []);

    const completeChapter = useCallback((chapterId: number) => {
        setState((prev) => {
            if (prev.completedChapters.includes(chapterId)) return prev;
            let next = {
                ...prev,
                completedChapters: [...prev.completedChapters, chapterId],
                sessionCompletedChapters: [...prev.sessionCompletedChapters, chapterId],
            };
            next = addXp(next, XP_CHAPTER_COMPLETE);
            return processNewBadges(next);
        });
    }, [addXp, processNewBadges]);

    const submitQuiz = useCallback((chapterId: number, score: number, total: number) => {
        setState((prev) => {
            const xpGain = score * XP_QUIZ_CORRECT + (score === total ? XP_QUIZ_PERFECT_BONUS : 0);
            let next = {
                ...prev,
                quizResults: {
                    ...prev.quizResults,
                    [chapterId]: { score, total, completedAt: new Date().toISOString() },
                },
            };
            next = addXp(next, xpGain);
            return processNewBadges(next);
        });
    }, [addXp, processNewBadges]);

    const updateGameScore = useCallback((score: number, level: number, noDamage: boolean) => {
        setState((prev) => {
            const isNewHighScore = score > prev.gameHighScore;
            const isNewMaxLevel = level > prev.gameMaxLevel;

            let next = {
                ...prev,
                gameHighScore: Math.max(prev.gameHighScore, score),
                gameMaxLevel: Math.max(prev.gameMaxLevel, level),
            };

            // XP for game
            let xpGain = 0;
            if (isNewMaxLevel) {
                xpGain += XP_GAME_LEVEL_CLEAR * (level - prev.gameMaxLevel);
            }
            if (isNewHighScore) {
                const oldTier = Math.floor(prev.gameHighScore / 1000);
                const newTier = Math.floor(score / 1000);
                if (newTier > oldTier) {
                    xpGain += Math.min((newTier - oldTier) * XP_GAME_SCORE_PER_1000, XP_GAME_SCORE_CAP);
                }
            }

            if (xpGain > 0) {
                next = addXp(next, xpGain);
            }

            // no-damage badge check handled via noDamage flag
            if (noDamage && level >= 2) {
                // Level 1 cleared with no damage
                if (!next.unlockedBadges.includes('no-damage')) {
                    next = {
                        ...next,
                        unlockedBadges: [...next.unlockedBadges, 'no-damage'],
                    };
                    const badge = getBadgeById('no-damage');
                    if (badge) {
                        if (recentBadge) {
                            badgeQueueRef.current.push(badge);
                        } else {
                            setRecentBadge(badge);
                        }
                    }
                }
            }

            return processNewBadges(next);
        });
    }, [addXp, processNewBadges, recentBadge]);

    const trackCodeCopy = useCallback(() => {
        setState((prev) => {
            const next = { ...prev, codeCopyCount: prev.codeCopyCount + 1 };
            return processNewBadges(next);
        });
    }, [processNewBadges]);

    const trackPageVisit = useCallback((page: string) => {
        setState((prev) => {
            if (prev.visitedPages.includes(page)) return prev;
            const next = { ...prev, visitedPages: [...prev.visitedPages, page] };
            return processNewBadges(next);
        });
    }, [processNewBadges]);

    const dismissBadge = useCallback(() => {
        setRecentBadge(null);
        // Show next badge in queue after a short delay
        setTimeout(() => {
            const next = badgeQueueRef.current.shift();
            if (next) setRecentBadge(next);
        }, 300);
    }, []);

    const dismissLevelUp = useCallback(() => {
        setLevelUpInfo(null);
    }, []);

    const currentLevel = getLevelForXp(state.xp);
    const xpProgress = getXpProgress(state.xp);
    const nextLevel = getNextLevel(currentLevel.level);

    return (
        <GamificationContext.Provider
            value={{
                state,
                currentLevel,
                xpProgress,
                nextLevel,
                completeChapter,
                submitQuiz,
                updateGameScore,
                trackCodeCopy,
                trackPageVisit,
                recentBadge,
                dismissBadge,
                levelUpInfo,
                dismissLevelUp,
            }}
        >
            {children}
        </GamificationContext.Provider>
    );
}
