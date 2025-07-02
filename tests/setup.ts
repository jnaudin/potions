import { prisma } from "../lib/prisma";
import { ingredients } from "../lib/data/ingredients";
import { getEnrichedRecipes } from "../lib/logic/potionLogic";

export async function resetDatabase() {
  // Delete everything in the correct order to avoid foreign key constraints
  await prisma.potionIngredient.deleteMany();
  await prisma.potion.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.gameState.deleteMany();

  // Create ingredients first
  for (const ingredient of ingredients) {
    await prisma.ingredient.create({
      data: {
        name: ingredient.name,
        quantity: 3,
        price: ingredient.price,
      },
    });
  }

  const recipes = getEnrichedRecipes();

  // Create potions without ingredients first, then add ingredients
  for (const recipe of recipes) {
    // Check that all ingredients exist
    const ingredientRecords = await prisma.ingredient.findMany({
      where: { name: { in: recipe.ingredients } },
    });

    if (ingredientRecords.length !== 3) continue;

    // Create potion first
    await prisma.potion.create({
      data: {
        name: recipe.name,
        discovered: false,
        price: recipe.price,
        discoverPrice: recipe.discoverPrice,
      },
    });

    // Then add ingredient relations
    for (const ingredientName of recipe.ingredients) {
      await prisma.potionIngredient.create({
        data: {
          potion: { connect: { name: recipe.name } },
          ingredient: { connect: { name: ingredientName } },
          quantity: 1,
        },
      });
    }
  }

  // Reset game state
  await prisma.gameState.create({
    data: {
      id: "main",
      money: 5000,
    },
  });
}
