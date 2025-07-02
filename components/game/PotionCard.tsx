"use client";

import clsx from "clsx";
import { Sparkles } from "lucide-react";
import { discoverPotion } from "@/app/actions/potions";
import { triggerMoneyUpdate } from "@/lib/logic/utils";
import { PotionCardProps } from "@/types/game";
import MagicToast from "@/components/ui/MagicToast";
import { useToast } from "@/hooks/useToast";
import { useMoney } from "@/hooks/useMoney";
import { useServerAction } from "@/hooks/useServerAction";

function formatRelativeDate(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = (now.getTime() - date.getTime()) / 1000; // en secondes
  if (diff < 60) return "il y a quelques secondes";
  if (diff < 3600)
    return `il y a ${Math.floor(diff / 60)} minute${
      Math.floor(diff / 60) > 1 ? "s" : ""
    }`;
  if (diff < 86400)
    return `il y a ${Math.floor(diff / 3600)} heure${
      Math.floor(diff / 3600) > 1 ? "s" : ""
    }`;
  return `il y a ${Math.floor(diff / 86400)} jour${
    Math.floor(diff / 86400) > 1 ? "s" : ""
  }`;
}

export function PotionCard({ potion, money }: PotionCardProps) {
  const { isPending, executeAction } = useServerAction();
  const { money: currentMoney, setMoney } = useMoney(money);
  const { toast, showToast } = useToast();

  const handleDiscover = () => {
    if (currentMoney < potion.discoverPrice) {
      showToast("Pas assez de rubis pour découvrir cette potion !", "error");
      return;
    }

    executeAction(async () => {
      const result = await discoverPotion(potion.name);
      if (result.success) {
        showToast(`Potion découverte : ${potion.name} !`, "success");
        setMoney(currentMoney - potion.discoverPrice);
        triggerMoneyUpdate(currentMoney - potion.discoverPrice);
      } else {
        showToast(result.error || "Erreur lors de la découverte", "error");
      }
    });
  };

  const renderDiscoveredIngredients = () => {
    if (!potion.ingredients) return null;

    return potion.ingredients.map((ing, idx) => (
      <li
        key={idx}
        className="px-3 py-1 bg-sky-flashy text-white rounded-lg font-bold text-sm border border-sky-flashy"
      >
        {ing}
      </li>
    ));
  };

  const renderUnknownIngredients = () => {
    return [...Array(3)].map((_, idx) => (
      <li
        key={idx}
        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg font-bold text-sm border border-gray-500"
      >
        ???
      </li>
    ));
  };

  return (
    <>
      <li
        className={clsx(
          "p-4 rounded-xl border-2 h-56 flex flex-col justify-between items-stretch relative",
          potion.discovered
            ? "bg-yellow-flashy/10 border-yellow-flashy text-yellow-flashy"
            : "bg-gray-900 border-gray-600 text-gray-200"
        )}
      >
        <h3
          className={clsx(
            "text-lg font-bold flex items-center gap-2 mb-2",
            potion.discovered ? "text-yellow-flashy" : "text-gray-200"
          )}
        >
          <Sparkles
            className={clsx(
              "w-5 h-5",
              potion.discovered ? "text-yellow-flashy" : "text-gray-400"
            )}
          />
          <span>{potion.name}</span>
        </h3>

        <ul className="flex gap-2 flex-wrap mb-2">
          {potion.discovered
            ? renderDiscoveredIngredients()
            : renderUnknownIngredients()}
        </ul>

        {potion.discovered && potion.discoveredAt && (
          <p className="text-xs text-gray-500 mb-2 italic">
            Découverte {formatRelativeDate(potion.discoveredAt)}
          </p>
        )}

        {!potion.discovered && (
          <div className="flex flex-col items-end gap-1 mt-auto">
            <span className="text-xs text-pink-flashy font-bold">
              Prix découverte : {potion.discoverPrice} 💎
            </span>
            <button
              disabled={isPending || currentMoney < potion.discoverPrice}
              onClick={handleDiscover}
              aria-label={`Découvrir la potion ${potion.name}`}
              className={clsx(
                "px-4 py-2 bg-pink-flashy text-black font-bold text-sm rounded-lg border border-pink-flashy hover:bg-pink-flashy/80 transition-all duration-150",
                (isPending || currentMoney < potion.discoverPrice) &&
                  "opacity-50 cursor-not-allowed hover:bg-pink-flashy/50"
              )}
            >
              {isPending ? "..." : "Découvrir"}
            </button>
          </div>
        )}
      </li>
      {toast && <MagicToast message={toast.message} type={toast.type} />}
    </>
  );
}
