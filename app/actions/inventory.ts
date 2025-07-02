"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { exec } from "child_process";
import { promisify } from "util";
import {
  BuyIngredientResult,
  SellPotionResult,
  ResetGameResult,
  GetInventoryResult,
} from "@/types/game";

const execAsync = promisify(exec);

// Buy an ingredient
export async function buyIngredient(
  name: string
): Promise<BuyIngredientResult> {
  try {
    const ingredient = await prisma.ingredient.findUnique({
      where: { name },
      select: { id: true, name: true, price: true },
    });

    if (!ingredient) {
      return { success: false, error: "Ingrédient introuvable" };
    }

    // Check available money
    const gameState = await prisma.gameState.findUnique({
      where: { id: "main" },
      select: { money: true },
    });

    if (!gameState || gameState.money < ingredient.price) {
      return { success: false, error: "Pas assez de rubis" };
    }

    // Perform purchase
    await prisma.$transaction([
      prisma.ingredient.update({
        where: { id: ingredient.id },
        data: { quantity: { increment: 1 } },
      }),
      prisma.gameState.update({
        where: { id: "main" },
        data: { money: { decrement: ingredient.price } },
      }),
    ]);

    revalidatePath("/inventory");
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de l'achat:", error);
    return { success: false, error: "Erreur lors de l'achat" };
  }
}

// Sell a potion
export async function sellPotion(name: string): Promise<SellPotionResult> {
  try {
    const potion = await prisma.potion.findUnique({
      where: { name },
      select: { id: true, name: true, price: true, quantity: true },
    });

    if (!potion || potion.quantity === 0) {
      return { success: false, error: "Potion non disponible" };
    }

    await prisma.$transaction([
      prisma.potion.update({
        where: { id: potion.id },
        data: { quantity: { decrement: 1 } },
      }),
      prisma.gameState.update({
        where: { id: "main" },
        data: { money: { increment: potion.price } },
      }),
    ]);

    revalidatePath("/inventory");
    return { success: true, price: potion.price };
  } catch (error) {
    console.error("Erreur lors de la vente:", error);
    return { success: false, error: "Erreur lors de la vente" };
  }
}

// Reset the game
export async function resetGame(): Promise<ResetGameResult> {
  try {
    // Delete all existing data
    await prisma.potionIngredient.deleteMany();
    await prisma.potion.deleteMany();
    await prisma.ingredient.deleteMany();
    await prisma.gameState.deleteMany();

    // Re-run the seed
    const { stderr } = await execAsync("npx tsx prisma/seed.ts");

    if (stderr) {
      console.error("Erreur lors du seed:", stderr);
      return { success: false, error: "Erreur lors du seed" };
    }

    // Ensure money is reset to 5000
    await prisma.gameState.upsert({
      where: { id: "main" },
      update: { money: 5000 },
      create: { id: "main", money: 5000 },
    });

    revalidatePath("/");
    revalidatePath("/inventory");
    revalidatePath("/brew");
    revalidatePath("/potions");

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la réinitialisation:", error);
    return { success: false, error: "Erreur lors de la réinitialisation" };
  }
}

// Get inventory
export async function getInventory(): Promise<GetInventoryResult> {
  try {
    const ingredients = await prisma.ingredient.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        quantity: true,
        price: true,
      },
    });
    return { success: true, data: ingredients };
  } catch (error) {
    console.error("❌ Erreur lors du chargement des ingrédients:", error);
    return {
      success: false,
      error: "Erreur lors du chargement des ingrédients",
    };
  }
}
