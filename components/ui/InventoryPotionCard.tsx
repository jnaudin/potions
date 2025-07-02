import React from "react";
import QuantityBadge from "@/components/ui/QuantityBadge";

export default function InventoryPotionCard({
  potion,
  onSell,
}: {
  potion: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
  onSell: (name: string, price: number) => void;
}) {
  return (
    <li className="p-4 rounded-xl border-2 bg-yellow-flashy/10 border-yellow-flashy flex flex-col gap-3 relative">
      <QuantityBadge quantity={potion.quantity} color="yellow" />
      <p className="font-extrabold text-yellow-flashy text-lg mb-1 truncate">
        {potion.name}
      </p>
      <p className="text-yellow-flashy text-base mb-2">
        Prix de vente :{" "}
        <span className="text-pink-700 font-bold">{potion.price} 💎</span>
      </p>
      <div className="flex justify-center">
        <button
          className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold text-base border-2 border-green-600 transition-colors"
          onClick={() => onSell(potion.name, potion.price)}
        >
          Vendre
        </button>
      </div>
    </li>
  );
}
