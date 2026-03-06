// ========================================
// Gamification Storage Abstraction Layer
// ========================================

export interface QuizResult {
    score: number;
    total: number;
    completedAt: string;
}

export interface GamificationState {
    xp: number;
    completedChapters: number[];
    quizResults: Record<number, QuizResult>;
    unlockedBadges: string[];
    gameHighScore: number;
    gameMaxLevel: number;
    codeCopyCount: number;
    visitedPages: string[];
    sessionCompletedChapters: number[];
}

const STORAGE_KEY = 'nextjs-invaders-progress';

const DEFAULT_STATE: GamificationState = {
    xp: 0,
    completedChapters: [],
    quizResults: {},
    unlockedBadges: [],
    gameHighScore: 0,
    gameMaxLevel: 0,
    codeCopyCount: 0,
    visitedPages: [],
    sessionCompletedChapters: [],
};

export interface GamificationStorage {
    load(): GamificationState;
    save(state: GamificationState): void;
}

export class LocalStorageAdapter implements GamificationStorage {
    load(): GamificationState {
        if (typeof window === 'undefined') return { ...DEFAULT_STATE };
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return { ...DEFAULT_STATE };
            const parsed = JSON.parse(raw);
            return { ...DEFAULT_STATE, ...parsed };
        } catch {
            return { ...DEFAULT_STATE };
        }
    }

    save(state: GamificationState): void {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch {
            // Storage full or unavailable
        }
    }
}

export function createStorage(): GamificationStorage {
    return new LocalStorageAdapter();
}
