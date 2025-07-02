import MagicLayout from "@/components/ui/MagicLayout";
import { getPotions } from "@/app/actions/potions";
import { getMoney } from "@/app/actions/game";
import PotionsClient from "./PotionsClient";

export default async function PotionsPage() {
  const [potionsResult, moneyResult] = await Promise.all([
    getPotions(),
    getMoney(),
  ]);

  return (
    <MagicLayout>
      <PotionsClient
        potions={potionsResult.data || []}
        money={moneyResult.money || 5000}
      />
    </MagicLayout>
  );
}
