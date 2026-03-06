"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import SpaceInvadersGame from "@/components/SpaceInvadersGame";

interface Props {
  level: number;
}

export default function LevelClient({ level }: Props) {
  const router = useRouter();

  const handleLevelClear = (score: number, nextLevel: number) => {
    router.push(`/level/${nextLevel}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-slate-500 hover:text-slate-300 transition-colors text-sm font-mono"
        >
          ← HOME
        </Link>
        <h1 className="text-2xl font-bold text-cyan-400 font-mono">
          LEVEL {level}
        </h1>
      </div>

      <SpaceInvadersGame level={level} onLevelClear={handleLevelClear} />
    </main>
  );
}
