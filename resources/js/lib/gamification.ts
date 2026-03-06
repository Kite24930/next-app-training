// ========================================
// Gamification Logic: Levels, Badges, XP
// ========================================

import type { GamificationState } from './storage';

// ---- Level System ----

export interface LevelInfo {
    level: number;
    title: string;
    requiredXp: number;
}

export const LEVELS: LevelInfo[] = [
    { level: 1, title: 'Recruit', requiredXp: 0 },
    { level: 2, title: 'Cadet', requiredXp: 100 },
    { level: 3, title: 'Pilot', requiredXp: 250 },
    { level: 4, title: 'Captain', requiredXp: 500 },
    { level: 5, title: 'Commander', requiredXp: 800 },
    { level: 6, title: 'Admiral', requiredXp: 1200 },
    { level: 7, title: 'Legend', requiredXp: 1700 },
];

export function getLevelForXp(xp: number): LevelInfo {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (xp >= LEVELS[i].requiredXp) return LEVELS[i];
    }
    return LEVELS[0];
}

export function getNextLevel(currentLevel: number): LevelInfo | null {
    const idx = LEVELS.findIndex((l) => l.level === currentLevel);
    return idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null;
}

export function getXpProgress(xp: number): number {
    const current = getLevelForXp(xp);
    const next = getNextLevel(current.level);
    if (!next) return 100;
    const range = next.requiredXp - current.requiredXp;
    const progress = xp - current.requiredXp;
    return Math.min(100, Math.round((progress / range) * 100));
}

// ---- XP Constants ----

export const XP_CHAPTER_COMPLETE = 50;
export const XP_QUIZ_CORRECT = 20;
export const XP_QUIZ_PERFECT_BONUS = 30;
export const XP_GAME_LEVEL_CLEAR = 30;
export const XP_GAME_SCORE_PER_1000 = 10;
export const XP_GAME_SCORE_CAP = 100;

// ---- Badge System ----

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: 'learning' | 'quiz' | 'game' | 'meta';
}

export const BADGES: Badge[] = [
    { id: 'first-chapter', name: '初陣突破', description: 'Chapter 1 を完了した', icon: '🎯', category: 'learning' },
    { id: 'halfway', name: '折り返し地点', description: '4チャプターを完了した', icon: '🏔️', category: 'learning' },
    { id: 'all-chapters', name: '全章制覇', description: '全8チャプターを完了した', icon: '🏆', category: 'learning' },
    { id: 'quiz-perfect', name: '完全正解', description: 'クイズで満点を取った', icon: '⭐', category: 'quiz' },
    { id: 'quiz-master', name: 'クイズマスター', description: '全クイズで80%以上を達成', icon: '🧠', category: 'quiz' },
    { id: 'first-kill', name: 'ファーストキル', description: 'インベーダーを1体撃破した', icon: '👾', category: 'game' },
    { id: 'game-clear', name: 'ステージクリア', description: 'ゲーム Level 1 をクリアした', icon: '🚀', category: 'game' },
    { id: 'game-lv3', name: 'ベテランパイロット', description: 'ゲーム Level 3 に到達した', icon: '✈️', category: 'game' },
    { id: 'high-scorer', name: 'ハイスコアラー', description: 'ゲームで5000点を達成した', icon: '💎', category: 'game' },
    { id: 'speed-learner', name: '速習の達人', description: '1セッションで3チャプター完了', icon: '⚡', category: 'meta' },
    { id: 'level-5', name: 'コマンダー昇格', description: 'レベル5に到達した', icon: '🎖️', category: 'meta' },
    { id: 'max-level', name: 'レジェンド', description: '最高レベルに到達した', icon: '👑', category: 'meta' },
    { id: 'code-collector', name: 'コードコレクター', description: 'コードブロックを10回コピーした', icon: '📋', category: 'meta' },
    { id: 'explorer', name: '全ページ探索', description: '全ページにアクセスした', icon: '🗺️', category: 'meta' },
    { id: 'no-damage', name: 'ノーダメージ', description: 'Level 1をライフ3で完了', icon: '🛡️', category: 'game' },
];

export function getBadgeById(id: string): Badge | undefined {
    return BADGES.find((b) => b.id === id);
}

const ALL_PAGES = ['/', '/chapters', '/demo', '/about', '/profile'];

export function checkNewBadges(state: GamificationState): string[] {
    const newBadges: string[] = [];
    const has = (id: string) => state.unlockedBadges.includes(id);

    // Learning badges
    if (!has('first-chapter') && state.completedChapters.includes(1)) {
        newBadges.push('first-chapter');
    }
    if (!has('halfway') && state.completedChapters.length >= 4) {
        newBadges.push('halfway');
    }
    if (!has('all-chapters') && state.completedChapters.length >= 8) {
        newBadges.push('all-chapters');
    }

    // Quiz badges
    const quizEntries = Object.values(state.quizResults);
    if (!has('quiz-perfect') && quizEntries.some((r) => r.score === r.total)) {
        newBadges.push('quiz-perfect');
    }
    if (!has('quiz-master') && quizEntries.length >= 8 && quizEntries.every((r) => r.score / r.total >= 0.8)) {
        newBadges.push('quiz-master');
    }

    // Game badges
    if (!has('first-kill') && state.gameHighScore > 0) {
        newBadges.push('first-kill');
    }
    if (!has('game-clear') && state.gameMaxLevel >= 2) {
        newBadges.push('game-clear');
    }
    if (!has('game-lv3') && state.gameMaxLevel >= 3) {
        newBadges.push('game-lv3');
    }
    if (!has('high-scorer') && state.gameHighScore >= 5000) {
        newBadges.push('high-scorer');
    }

    // Meta badges
    if (!has('speed-learner') && state.sessionCompletedChapters.length >= 3) {
        newBadges.push('speed-learner');
    }
    const level = getLevelForXp(state.xp);
    if (!has('level-5') && level.level >= 5) {
        newBadges.push('level-5');
    }
    if (!has('max-level') && level.level >= 7) {
        newBadges.push('max-level');
    }
    if (!has('code-collector') && state.codeCopyCount >= 10) {
        newBadges.push('code-collector');
    }
    if (!has('explorer') && ALL_PAGES.every((p) => state.visitedPages.includes(p))) {
        newBadges.push('explorer');
    }

    return newBadges;
}
