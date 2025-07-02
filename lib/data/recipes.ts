import type { Recipe } from "@/types/game";

export const recipes: Omit<Recipe, "price" | "discoverPrice">[] = [
  {
    name: "Potion d'invisibilité",
    ingredients: ["Noix de coco", "Yttrium", "Mandragore"],
  },
  {
    name: "Potion d'amour",
    ingredients: ["Bave de lama", "Plume de griffon", "Hélium liquide"],
  },
  {
    name: "Potion de jeunesse",
    ingredients: ["Or", "Crin de licorne", "Azote liquide"],
  },
  {
    name: "Potion d'immortalité",
    ingredients: ["Poil de yéti", "Jus de Horglup", "Argent"],
  },
  {
    name: "Potion de Clairvoyance",
    ingredients: ["Épine de hérisson", "Jus de Horglup", "Noix de coco"],
  },
  {
    name: "Potion de Force",
    ingredients: ["Poil de yéti", "Or", "Argent"],
  },
  {
    name: "Potion de Vitesse",
    ingredients: ["Hélium liquide", "Plume de griffon", "Azote liquide"],
  },
  {
    name: "Potion de Guérison",
    ingredients: ["Crin de licorne", "Mandragore", "Bave de lama"],
  },
  {
    name: "Potion de Transformation",
    ingredients: ["Queue d'écureuil", "Yttrium", "Épine de hérisson"],
  },
];
