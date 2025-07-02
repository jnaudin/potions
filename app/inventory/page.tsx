import MagicLayout from "@/components/ui/MagicLayout";
import { getInventory } from "@/app/actions/inventory";
import { getPotions } from "@/app/actions/potions";
import { getMoney } from "@/app/actions/game";
import InventoryClient from "./InventoryClient";

export default async function InventoryPage() {
  const [inventoryResult, potionsResult, moneyResult] = await Promise.all([
    getInventory(),
    getPotions(),
    getMoney(),
  ]);

  return (
    <MagicLayout>
      <h1 className="magic-title-h1">L&apos;échoppe magique</h1>
      <InventoryClient
        inventory={inventoryResult.data || []}
        potions={potionsResult.data || []}
        money={moneyResult.money || 5000}
      />
    </MagicLayout>
  );
}
