"use client";

import InventoryPotionCard from "@/components/ui/InventoryPotionCard";
import InventoryIngredientCard from "@/components/ui/InventoryIngredientCard";
import MagicButton from "@/components/ui/MagicButton";
import { buyIngredient, sellPotion, resetGame } from "@/app/actions/inventory";
import { triggerMoneyUpdate } from "@/lib/logic/utils";
import { InventoryClientProps } from "@/types/game";
import MagicToast from "@/components/ui/MagicToast";
import { useToast } from "@/hooks/useToast";
import { useMoney } from "@/hooks/useMoney";
import { useServerAction } from "@/hooks/useServerAction";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function InventoryClient({
  inventory,
  potions,
  money,
}: InventoryClientProps) {
  const { money: currentMoney, setMoney } = useMoney(money);
  const { toast, showToast } = useToast();
  const { executeAction } = useServerAction();
  const router = useRouter();

  const handleReset = async () => {
    await executeAction(async () => {
      const result = await resetGame();
      if (result.success) {
        showToast("Nouvelle partie commencée !", "success");
        startTransition(() => {
          router.refresh();
        });
      } else {
        showToast("Erreur lors du redémarrage", "error");
      }
    });
  };

  const handleBuy = async (name: string, price: number) => {
    if (currentMoney < price) {
      showToast("Pas assez de rubis !", "error");
      return;
    }
    await executeAction(async () => {
      const result = await buyIngredient(name);
      if (result.success) {
        setMoney(currentMoney - price);
        triggerMoneyUpdate(currentMoney - price);
        showToast(`+1 ${name} acheté !`, "success");
        startTransition(() => {
          router.refresh();
        });
      } else {
        showToast(result.error || "Erreur lors de l'achat", "error");
      }
    });
  };

  const handleSell = async (name: string, price: number) => {
    await executeAction(async () => {
      const result = await sellPotion(name);
      if (result.success) {
        setMoney(currentMoney + (result.price || price));
        triggerMoneyUpdate(currentMoney + (result.price || price));
        showToast(
          `Potion vendue pour ${result.price || price} rubis !`,
          "success"
        );
        startTransition(() => {
          router.refresh();
        });
      } else {
        showToast(result.error || "Erreur lors de la vente", "error");
      }
    });
  };

  return (
    <>
      <div className="space-y-6">
        <section>
          <h2 className="magic-title-h2">🧂 Acheter des ingrédients</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {inventory.map((ingredient) => (
              <InventoryIngredientCard
                key={ingredient.id}
                ingredient={ingredient}
                onBuy={handleBuy}
                canBuy={currentMoney >= ingredient.price}
              />
            ))}
          </ul>
        </section>

        <section>
          <h2 className="magic-title-h2">🧪 Vendre des potions</h2>
          {!Array.isArray(potions) || potions.length === 0 ? (
            <p className="text-sm text-gray-500">
              Aucune potion pour l&apos;instant.
            </p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {potions
                .filter((p) => p.quantity > 0)
                .map((potion) => (
                  <InventoryPotionCard
                    key={potion.id}
                    potion={potion}
                    onSell={handleSell}
                  />
                ))}
            </ul>
          )}
        </section>

        <div className="flex gap-4 justify-center">
          <MagicButton onClick={handleReset}>Recommencer le jeu</MagicButton>
        </div>
      </div>
      {toast && <MagicToast message={toast.message} type={toast.type} />}
    </>
  );
}
