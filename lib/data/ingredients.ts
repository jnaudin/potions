import type { Ingredient } from "@/types/game";

export const ingredients: Ingredient[] = [
  { name: "Argent", price: 10 },
  { name: "Bave de lama", price: 100 },
  { name: "Épine de hérisson", price: 5 },
  { name: "Plume de griffon", price: 1000 },
  { name: "Hélium liquide", price: 60 },
  { name: "Poil de yéti", price: 500 },
  { name: "Or", price: 130 },
  { name: "Azote liquide", price: 55 },
  { name: "Queue d'écureuil", price: 30 },
  { name: "Crin de licorne", price: 666 },
  { name: "Jus de Horglup", price: 499 },
  { name: "Noix de coco", price: 1 },
  { name: "Yttrium", price: 7 },
  { name: "Mandragore", price: 999 },
];

// For compatibility with old code
export const ingredientsPrix = Object.fromEntries(
  ingredients.map((ing) => [ing.name, ing.price])
);
