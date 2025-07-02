"use client";

import { PotionCard } from "@/components/game/PotionCard";
import { PotionsClientProps } from "@/types/game";

export default function PotionsClient({ potions, money }: PotionsClientProps) {
  return (
    <div className="space-y-4">
      <h1 className="magic-title-h1">📚 Grimoire des potions</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {potions.map((potion) => (
          <PotionCard key={potion.id} potion={potion} money={money} />
        ))}
      </ul>
    </div>
  );
}
