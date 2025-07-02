import React from "react";
import QuantityBadge from "@/components/ui/QuantityBadge";

export default function InventoryIngredientCard({
  ingredient,
  onBuy,
  canBuy,
}: {
  ingredient: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
  onBuy: (name: string, price: number) => void;
  canBuy: boolean;
}) {
  return (
    <li className="p-4 rounded-xl border-2 bg-pink-flashy/10 border-pink-flashy flex flex-col gap-2 relative">
      <QuantityBadge quantity={ingredient.quantity} color="pink" />
      <p className="font-extrabold text-pink-flashy text-lg mb-1 truncate">
        {ingredient.name}
      </p>
      <p className="text-pink-flashy font-bold text-base mb-2">
        Prix : <span className="text-pink-700">{ingredient.price} 💎</span>
      </p>
      <button
        className="py-2 px-2 rounded-lg bg-yellow-flashy hover:bg-yellow-300 text-black font-bold text-base border-2 border-yellow-flashy disabled:opacity-50 disabled:cursor-not-allowed mx-auto block"
        onClick={() => onBuy(ingredient.name, ingredient.price)}
        disabled={!canBuy}
        aria-label={`Acheter ${ingredient.name} pour ${ingredient.price} pièces`}
      >
        Acheter
      </button>
    </li>
  );
}
