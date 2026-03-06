"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  createInitialState,
  updateGameState,
  playerShoot,
  render,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  type GameState,
} from "@/game/engine";

interface Props {
  level?: number;
  onGameOver?: (score: number) => void;
  onLevelClear?: (score: number, nextLevel: number) => void;
}

export default function SpaceInvadersGame({
  level = 1,
  onGameOver,
  onLevelClear,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameState>(createInitialState(level));
  const keysRef = useRef<Set<string>>(new Set());
  const animationRef = useRef<number>(0);

  // Throttled UI state
  const [displayScore, setDisplayScore] = useState(0);
  const [displayLives, setDisplayLives] = useState(3);
  const [gameStatus, setGameStatus] = useState<GameState["status"]>("playing");

  const resetGame = useCallback(
    (newLevel: number) => {
      gameStateRef.current = createInitialState(newLevel);
      setDisplayScore(gameStateRef.current.score);
      setDisplayLives(gameStateRef.current.lives);
      setGameStatus("playing");
    },
    []
  );

  useEffect(() => {
    resetGame(level);
  }, [level, resetGame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastUIUpdate = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);

      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        gameStateRef.current = playerShoot(gameStateRef.current);
      }

      if (e.key === "Enter") {
        const status = gameStateRef.current.status;
        if (status === "gameover") {
          resetGame(level);
        } else if (status === "win") {
          const nextLevel = gameStateRef.current.level + 1;
          if (onLevelClear) {
            onLevelClear(gameStateRef.current.score, nextLevel);
          } else {
            resetGame(nextLevel);
          }
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const gameLoop = (time: number) => {
      gameStateRef.current = updateGameState(
        gameStateRef.current,
        keysRef.current,
        Date.now()
      );

      render(ctx, gameStateRef.current, time);

      // Throttle React UI updates to 100ms
      if (time - lastUIUpdate > 100) {
        setDisplayScore(gameStateRef.current.score);
        setDisplayLives(gameStateRef.current.lives);
        setGameStatus(gameStateRef.current.status);
        lastUIUpdate = time;

        if (gameStateRef.current.status === "gameover" && onGameOver) {
          onGameOver(gameStateRef.current.score);
        }
      }

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [level, resetGame, onGameOver, onLevelClear]);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="rounded-lg border border-slate-700"
      />

      <div className="flex gap-8 text-sm font-mono">
        <div className="text-cyan-400">
          SCORE: {String(displayScore).padStart(6, "0")}
        </div>
        <div className="text-white">LEVEL {gameStateRef.current.level}</div>
        <div className="text-red-400">
          LIVES: {"♥".repeat(Math.max(0, displayLives))}
        </div>
      </div>

      {gameStatus === "playing" && (
        <div className="text-slate-500 text-xs font-mono">
          ← → : Move | Space : Shoot | A/D : Move
        </div>
      )}
    </div>
  );
}
