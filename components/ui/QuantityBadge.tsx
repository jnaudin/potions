import React from "react";

export default function QuantityBadge({
  quantity,
  color = "yellow",
}: {
  quantity: number;
  color?: "yellow" | "pink";
}) {
  const colorClass =
    color === "pink"
      ? "bg-pink-flashy border-pink-flashy text-black"
      : "bg-yellow-flashy border-yellow-flashy text-black";
  return (
    <span
      className={`absolute bottom-2 right-2 px-2 py-0.5 rounded-lg text-sm font-extrabold border-2 z-10 select-none rotate-12 ${colorClass}`}
    >
      x{quantity}
    </span>
  );
}
