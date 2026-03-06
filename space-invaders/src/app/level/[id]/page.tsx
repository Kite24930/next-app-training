import type { Metadata } from "next";
import LevelClient from "./LevelClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Level ${id} - Space Invaders`,
    description: `スペースインベーダー レベル${id}に挑戦！`,
  };
}

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];
}

export default async function LevelPage({ params }: Props) {
  const { id } = await params;
  const level = Math.max(1, Math.min(99, parseInt(id, 10) || 1));

  return <LevelClient level={level} />;
}
