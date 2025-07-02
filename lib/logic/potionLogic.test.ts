import { getEnrichedRecipes } from "./potionLogic";
import { ingredients, recipes } from "../data";

describe("getEnrichedRecipes", () => {
  it("should return enriched recipes with correct price and discoverPrice", () => {
    const enriched = getEnrichedRecipes();

    expect(enriched).toHaveLength(recipes.length);

    const enrichedRecipe = enriched.find(
      (r) => r.name === "Potion de Guérison"
    );

    expect(enrichedRecipe).toBeDefined();
    expect(enrichedRecipe!.price).toBeGreaterThan(0);
    expect(enrichedRecipe!.discoverPrice).toBe(enrichedRecipe!.price * 4);
  });

  it("should calculate price based on ingredient prices", () => {
    const enriched = getEnrichedRecipes();

    enriched.forEach((recipe) => {
      const expectedCost = recipe.ingredients.reduce((total, name) => {
        const ing = ingredients.find((i) => i.name === name);
        return total + (ing?.price || 0);
      }, 0);

      expect(recipe.price).toBe(expectedCost * 2);
    });
  });

  it("should handle missing ingredients by ignoring their cost", () => {
    const spy = jest
      .spyOn(require("../data"), "recipes", "get")
      .mockReturnValue([
        { name: "Mystery Potion", ingredients: ["Unknown Herb"] },
      ]);

    const result = getEnrichedRecipes();

    expect(result[0].price).toBe(0);
    expect(result[0].discoverPrice).toBe(0);

    spy.mockRestore();
  });
});
