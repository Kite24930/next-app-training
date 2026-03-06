import { useRef, useEffect, useCallback, useState } from 'react';
import {
    createInitialState,
    updateGameState,
    playerShoot,
    render,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    type GameState,
} from '@/game/engine';
import { useGamification } from '@/contexts/GamificationContext';

export default function SpaceInvadersGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameStateRef = useRef<GameState>(createInitialState());
    const keysRef = useRef<Set<string>>(new Set());
    const animFrameRef = useRef<number>(0);
    const reportedRef = useRef(false);
    const [displayScore, setDisplayScore] = useState(0);
    const [displayLives, setDisplayLives] = useState(3);
    const [displayLevel, setDisplayLevel] = useState(1);
    const [gameStatus, setGameStatus] = useState<GameState['status']>('playing');
    const { updateGameScore, state: gamificationState } = useGamification();

    const reportScore = useCallback((gs: GameState) => {
        if (reportedRef.current) return;
        reportedRef.current = true;
        const noDamage = gs.lives === 3 && gs.level >= 2;
        updateGameScore(gs.score, gs.level, noDamage);
    }, [updateGameScore]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        keysRef.current.add(e.key);

        if (e.key === ' ' || e.key === 'ArrowUp') {
            e.preventDefault();
            gameStateRef.current = playerShoot(gameStateRef.current);
        }

        if (e.key === 'Enter') {
            const state = gameStateRef.current;
            if (state.status === 'gameover') {
                reportScore(state);
                gameStateRef.current = createInitialState();
                reportedRef.current = false;
            } else if (state.status === 'win') {
                reportScore(state);
                gameStateRef.current = createInitialState(state.level + 1);
                gameStateRef.current.score = state.score;
                reportedRef.current = false;
            }
        }

        if (e.key === 'p' || e.key === 'P') {
            const state = gameStateRef.current;
            if (state.status === 'playing') {
                gameStateRef.current = { ...state, status: 'paused' };
            } else if (state.status === 'paused') {
                gameStateRef.current = { ...state, status: 'playing' };
            }
        }
    }, [reportScore]);

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        keysRef.current.delete(e.key);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        let lastUIUpdate = 0;

        const gameLoop = (time: number) => {
            const now = Date.now();
            const prevStatus = gameStateRef.current.status;
            gameStateRef.current = updateGameState(gameStateRef.current, keysRef.current, now);
            render(ctx, gameStateRef.current, time);

            // Auto-report on game over or win
            const gs = gameStateRef.current;
            if ((gs.status === 'gameover' || gs.status === 'win') && prevStatus === 'playing') {
                reportScore(gs);
            }

            // Throttle React state updates to every ~100ms
            if (time - lastUIUpdate > 100) {
                setDisplayScore(gs.score);
                setDisplayLives(gs.lives);
                setDisplayLevel(gs.level);
                setGameStatus(gs.status);
                lastUIUpdate = time;
            }

            animFrameRef.current = requestAnimationFrame(gameLoop);
        };

        animFrameRef.current = requestAnimationFrame(gameLoop);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp, reportScore]);

    return (
        <div className="flex flex-col items-center gap-6">
            {/* Game canvas */}
            <div className="relative overflow-hidden rounded-lg border-2 border-dark-lighter shadow-2xl shadow-primary/10">
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="block"
                    tabIndex={0}
                />

                {/* Paused overlay */}
                {gameStatus === 'paused' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-dark/80 backdrop-blur-sm">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">PAUSED</p>
                            <p className="mt-2 text-sm text-gray-400">Press P to resume</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Controls info */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                    <kbd className="rounded bg-dark-lighter px-2 py-0.5 font-mono text-xs text-gray-300">←</kbd>
                    <kbd className="rounded bg-dark-lighter px-2 py-0.5 font-mono text-xs text-gray-300">→</kbd>
                    <span>移動</span>
                </div>
                <div className="flex items-center gap-2">
                    <kbd className="rounded bg-dark-lighter px-2 py-0.5 font-mono text-xs text-gray-300">Space</kbd>
                    <span>発射</span>
                </div>
                <div className="flex items-center gap-2">
                    <kbd className="rounded bg-dark-lighter px-2 py-0.5 font-mono text-xs text-gray-300">P</kbd>
                    <span>一時停止</span>
                </div>
                <div className="flex items-center gap-2">
                    <kbd className="rounded bg-dark-lighter px-2 py-0.5 font-mono text-xs text-gray-300">Enter</kbd>
                    <span>リスタート</span>
                </div>
            </div>

            {/* Score board */}
            <div className="flex gap-6 rounded-lg border border-dark-lighter bg-dark-light p-4">
                <div className="text-center">
                    <div className="text-xs text-gray-500">SCORE</div>
                    <div className="font-mono text-lg font-bold text-accent">{String(displayScore).padStart(6, '0')}</div>
                </div>
                <div className="text-center">
                    <div className="text-xs text-gray-500">LEVEL</div>
                    <div className="font-mono text-lg font-bold text-primary">{displayLevel}</div>
                </div>
                <div className="text-center">
                    <div className="text-xs text-gray-500">LIVES</div>
                    <div className="font-mono text-lg font-bold text-red-400">{'♥'.repeat(Math.max(0, displayLives))}</div>
                </div>
                <div className="border-l border-dark-lighter" />
                <div className="text-center">
                    <div className="text-xs text-gray-500">HIGH SCORE</div>
                    <div className="font-mono text-lg font-bold text-yellow-400">{String(gamificationState.gameHighScore).padStart(6, '0')}</div>
                </div>
            </div>
        </div>
    );
}
