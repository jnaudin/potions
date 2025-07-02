import type { Recipe, Ingredient } from "@/types/game";
import { ingredients, recipes } from "../data";

/**
 * Enriches recipes with calculated prices
 * Selling price = 2x ingredient cost
 * Discovery price = 4x selling price
 */
export function getEnrichedRecipes(): Recipe[] {
  return recipes.map((recipe) => {
    const cost = recipe.ingredients.reduce((total, name) => {
      const ingredient = ingredients.find(
        (ing: Ingredient) => ing.name === name
      );
      return total + (ingredient?.price || 0);
    }, 0);

    const price = cost * 2;
    const discoverPrice = price * 4;

    return {
      ...recipe,
      price,
      discoverPrice,
    };
  });
}
