"use server";

import { prisma } from "@/lib/prisma";
import { recipes } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { validatePotionName } from "@/lib/logic/validation";
import { GetPotionsResult, DiscoverPotionResult } from "@/types/game";
// Get all potions
export async function getPotions(): Promise<GetPotionsResult> {
  try {
    const potions = await prisma.potion.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        ingredients: {
          include: { ingredient: true },
        },
      },
    });

    const frontendPotions = potions.map((potion) => {
      const base = {
        id: potion.id,
        name: potion.name,
        discovered: potion.discovered,
        discoverPrice: potion.discoverPrice,
        price: potion.price,
        quantity: potion.quantity,
        createdAt: potion.createdAt.toISOString(),
        discoveredAt: potion.discovered ? potion.updatedAt.toISOString() : null,
      };

      if (potion.discovered) {
        return {
          ...base,
          ingredients: potion.ingredients.map((pi) => pi.ingredient.name),
        };
      } else {
        return {
          ...base,
          ingredients: [],
        };
      }
    });

    return { success: true, data: frontendPotions };
  } catch (error) {
    console.error("Erreur lors du chargement des potions:", error);
    return { success: false, error: "Erreur lors du chargement des potions" };
  }
}

// Discover a potion (API version)
export async function discoverPotion(
  name: string
): Promise<DiscoverPotionResult> {
  try {
    const validation = validatePotionName(name);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Get potion to obtain discovery price
    const potion = await prisma.potion.findUnique({
      where: { name },
      select: { discoverPrice: true },
    });

    if (!potion) {
      return { success: false, error: "Potion introuvable" };
    }

    // Check money balance
    const gameState = await prisma.gameState.findUnique({
      where: { id: "main" },
      select: { money: true },
    });

    if (!gameState || gameState.money < potion.discoverPrice) {
      return {
        success: false,
        error: "Pas assez de rubis pour découvrir cette potion",
      };
    }

    // Check if potion exists with ingredients
    const existingPotion = await prisma.potion.findUnique({
      where: { name },
      include: {
        ingredients: {
          include: { ingredient: true },
        },
      },
    });

    let updatedPotion;

    if (!existingPotion) {
      // Create potion if it doesn't exist
      const recipe = recipes.find((r) => r.name === name);
      if (!recipe) {
        return { success: false, error: "Recette inconnue" };
      }

      updatedPotion = await prisma.potion.create({
        data: {
          name: recipe.name,
          discovered: true,
          ingredients: {
            create: recipe.ingredients.map((ingName) => ({
              ingredient: {
                connect: { name: ingName },
              },
              quantity: 1,
            })),
          },
        },
        include: {
          ingredients: {
            include: { ingredient: true },
          },
        },
      });
    } else {
      // Update existing potion
      updatedPotion = await prisma.potion.update({
        where: { name },
        data: {
          discovered: true,
          updatedAt: new Date(),
        },
        include: {
          ingredients: {
            include: { ingredient: true },
          },
        },
      });
    }

    // Deduct money from database
    await prisma.gameState.update({
      where: { id: "main" },
      data: { money: { decrement: potion.discoverPrice } },
    });

    // Return updated potion
    const frontendPotion = {
      id: updatedPotion.id,
      name: updatedPotion.name,
      discovered: updatedPotion.discovered,
      discoverPrice: updatedPotion.discoverPrice,
      price: updatedPotion.price,
      quantity: updatedPotion.quantity,
      createdAt: updatedPotion.createdAt.toISOString(),
      discoveredAt: updatedPotion.updatedAt.toISOString(),
      ingredients: updatedPotion.ingredients.map((pi) => pi.ingredient.name),
    };

    revalidatePath("/potions");
    return { success: true, data: frontendPotion };
  } catch (error) {
    console.error("Erreur lors de la découverte de la potion:", error);
    return {
      success: false,
      error: "Erreur lors de la découverte de la potion",
    };
  }
}

// Create a potion
export async function createPotion(ingredients: string[]) {
  // 1. Check that exactly 3 ingredients are provided
  if (!Array.isArray(ingredients) || ingredients.length !== 3) {
    return { success: false, error: "Il faut exactement 3 ingrédients." };
  }

  const sorted = [...ingredients].sort();

  // 2. Find corresponding recipe
  const recipe = recipes.find(
    (r) => JSON.stringify(r.ingredients.sort()) === JSON.stringify(sorted)
  );

  if (!recipe) {
    return {
      success: false,
      error: "Aucune potion ne correspond à cette combinaison.",
    };
  }

  // 3. Check ingredient availability in stock
  const stock = await prisma.ingredient.findMany({
    where: { name: { in: ingredients } },
  });

  const missing = stock.find((ing) => ing.quantity < 1);
  if (missing) {
    return {
      success: false,
      error: `Ingrédient insuffisant : ${missing.name}`,
    };
  }

  // 4. Decrement quantities
  await Promise.all(
    stock.map((ing) =>
      prisma.ingredient.update({
        where: { id: ing.id },
        data: { quantity: ing.quantity - 1 },
      })
    )
  );

  // 5. Check if potion exists and create/discover if necessary
  const existingPotion = await prisma.potion.findUnique({
    where: { name: recipe.name },
    select: { discovered: true },
  });

  let isNewDiscovery = false;

  if (!existingPotion) {
    // Create potion with ingredient relations
    await prisma.potion.create({
      data: {
        name: recipe.name,
        discovered: true,
        ingredients: {
          create: recipe.ingredients.map((ingName) => ({
            ingredient: {
              connect: { name: ingName },
            },
            quantity: 1,
          })),
        },
      },
    });
    isNewDiscovery = true;
  } else if (!existingPotion.discovered) {
    // Mark as discovered if it exists but is not discovered
    await prisma.potion.update({
      where: { name: recipe.name },
      data: { discovered: true },
    });
    isNewDiscovery = true;
  }

  // 6. Increment quantity and get final potion
  const potion = await prisma.potion.update({
    where: { name: recipe.name },
    data: { quantity: { increment: 1 } },
    include: {
      ingredients: {
        include: { ingredient: true },
      },
    },
  });

  // 7. Transform for frontend
  const frontendPotion = {
    id: potion.id,
    name: potion.name,
    discovered: potion.discovered,
    createdAt: potion.createdAt.toISOString(),
    updatedAt: potion.updatedAt.toISOString(),
    ingredients: potion.ingredients.map((pi) => pi.ingredient.name),
    quantity: potion.quantity,
  };

  revalidatePath("/potions");

  return {
    success: true,
    potion: frontendPotion,
    isNewDiscovery,
  };
}

// Sell a potion (internal version)
export async function sellPotion(name: string, price: number) {
  // Check quantity
  const potion = await prisma.potion.findUnique({ where: { name } });
  if (!potion || potion.quantity <= 0) {
    return { success: false, error: "Aucune potion à vendre." };
  }
  // Decrement quantity
  await prisma.potion.update({
    where: { name },
    data: { quantity: { decrement: 1 } },
  });
  return { success: true, price };
}
