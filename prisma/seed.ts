// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { ingredients } from "../lib/data";
import { getEnrichedRecipes } from "../lib/logic/potionLogic";

const prisma = new PrismaClient();

async function main() {
  // Delete in order to respect foreign key constraints
  await prisma.potionIngredient.deleteMany();
  await prisma.potion.deleteMany();
  await prisma.ingredient.deleteMany();

  // Create ingredients with their prices
  for (const ingredient of ingredients) {
    await prisma.ingredient.create({
      data: {
        name: ingredient.name,
        quantity: Math.floor(Math.random() * 5) + 1, // Random quantity between 1 and 5
        price: ingredient.price,
      },
    });
  }

  const recipes = getEnrichedRecipes();

  // Create potions with their prices
  for (const recipe of recipes) {
    await prisma.potion.create({
      data: {
        name: recipe.name,
        discovered: false,
        discoverPrice: recipe.discoverPrice,
        price: recipe.price,
        quantity: 0,
        ingredients: {
          create: recipe.ingredients.map((ingredientName) => ({
            ingredient: { connect: { name: ingredientName } },
            quantity: 1,
          })),
        },
      },
    });
  }

  // Create initial game state
  await prisma.gameState.upsert({
    where: { id: "main" },
    update: { money: 5000 },
    create: { id: "main", money: 5000 },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
