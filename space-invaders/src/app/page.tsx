import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-cyan-400 mb-2">
          SPACE INVADERS
        </h1>
        <p className="text-slate-400 text-lg">
          Built with Next.js 15 &amp; TypeScript
        </p>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <Link
          href="/level/1"
          className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-lg rounded-lg transition-colors"
        >
          START GAME
        </Link>

        <div className="flex gap-4 mt-4">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <Link
              key={lvl}
              href={`/level/${lvl}`}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors text-sm font-mono"
            >
              LV.{lvl}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 text-slate-500 text-sm font-mono text-center space-y-1">
        <p>← → or A/D : Move</p>
        <p>Space or ↑ : Shoot</p>
        <p>Enter : Restart / Next Level</p>
      </div>
    </main>
  );
}
