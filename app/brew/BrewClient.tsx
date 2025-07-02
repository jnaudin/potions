"use client";

import { useState } from "react";
import clsx from "clsx";
import { createPotion } from "@/app/actions/potions";
import Link from "next/link";
import { BrewClientProps } from "@/types/game";
import MagicButton from "@/components/ui/MagicButton";
import MagicCard from "@/components/ui/MagicCard";
import MagicToast from "@/components/ui/MagicToast";
import { useToast } from "@/hooks/useToast";
import { useServerAction } from "@/hooks/useServerAction";

export default function BrewClient({ inventory }: BrewClientProps) {
  const { loading, executeAction } = useServerAction();
  const [selection, setSelection] = useState<string[]>([]);
  const { toast, showToast } = useToast();

  const handleBrew = async () => {
    await executeAction(async () => {
      const result = await createPotion(selection);

      if (result.success) {
        if (result.isNewDiscovery) {
          showToast(
            `NOUVELLE RECETTE DÉCOUVERTE !\nTu viens d'inventer la potion : ${result.potion?.name}`,
            "success"
          );
        } else {
          showToast(`Potion créée : ${result.potion?.name}`, "info");
        }
        setSelection([]);
      } else {
        showToast(
          result.error || "Erreur lors de la création de la potion",
          "error"
        );
      }
    });
  };

  const handleSelect = (name: string) => {
    if (selection.includes(name)) {
      // Deselect ingredient
      setSelection(selection.filter((item) => item !== name));
    } else {
      // Add ingredient only if we don't already have 3 ingredients
      if (selection.length < 3) {
        setSelection([...selection, name]);
      }
    }
  };

  return (
    <>
      <div className="space-y-6">
        <h2 className="magic-title-h2">🧪 Choisis 3 ingrédients</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {inventory.map((ing) => {
            const isSelected = selection.includes(ing.name);
            const isDisabled = ing.quantity === 0;
            const isMaxReached = selection.length >= 3 && !isSelected;
            return (
              <button
                key={ing.id}
                onClick={() => handleSelect(ing.name)}
                disabled={isDisabled || isMaxReached}
                className="text-left relative"
                aria-label={`Ajouter ${ing.name} à la potion`}
              >
                <MagicCard
                  className={clsx(
                    "relative",
                    (isDisabled || isMaxReached) &&
                      "opacity-40 cursor-not-allowed",
                    isSelected &&
                      "border-yellow-flashy bg-yellow-flashy/20 scale-105"
                  )}
                >
                  <p className="font-bold text-yellow-flashy">{ing.name}</p>
                  <p className="text-sm text-sky-flashy">
                    Quantité : {ing.quantity}
                  </p>

                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-yellow-flashy text-black text-xs px-2 py-0.5 rounded-full shadow font-bold">
                      ✔️
                    </div>
                  )}
                </MagicCard>
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          <h3 className="magic-title-h3">Sélection ({selection.length}/3)</h3>
          <ul className="flex flex-wrap gap-2">
            {selection.map((name) => (
              <span
                key={name}
                className="px-3 py-1 rounded-full bg-yellow-flashy text-black font-bold"
              >
                {name}
              </span>
            ))}
          </ul>
          {selection.length === 0 && (
            <p className="text-sm text-gray-500 italic">
              Sélectionne 3 ingrédients pour créer une potion
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <MagicButton
            onClick={handleBrew}
            disabled={selection.length !== 3 || loading}
          >
            {loading ? "Préparation…" : "Préparer la potion"}
          </MagicButton>
        </div>

        <div className="flex justify-center">
          <Link
            href="/potions"
            className="text-sky-flashy hover:text-yellow-flashy transition-colors font-bold text-lg"
          >
            <span aria-hidden="true">📚</span> Voir toutes les recettes
          </Link>
        </div>
      </div>

      {toast && <MagicToast message={toast.message} type={toast.type} />}
    </>
  );
}
