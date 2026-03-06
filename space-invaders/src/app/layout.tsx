import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Space Invaders - Next.js",
  description:
    "Next.js 15とTypeScriptで作るスペースインベーダー。Canvas APIとReact Hooksを活用したブラウザゲーム。",
  keywords: ["Next.js", "Space Invaders", "TypeScript", "Canvas API", "React"],
  openGraph: {
    title: "Space Invaders - Next.js",
    description: "Next.js 15で作るスペースインベーダー",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-slate-900 antialiased">{children}</body>
    </html>
  );
}
