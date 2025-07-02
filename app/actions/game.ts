"use server";

import { prisma } from "@/lib/prisma";
import { GetMoneyResult } from "@/types/game";

// Get money
export async function getMoney(): Promise<GetMoneyResult> {
  try {
    const gameState = await prisma.gameState.findUnique({
      where: { id: "main" },
      select: { money: true },
    });

    if (!gameState) {
      // Create initial state if it doesn't exist
      const newGameState = await prisma.gameState.create({
        data: { id: "main", money: 5000 },
      });
      return { success: true, money: newGameState.money };
    }

    return { success: true, money: gameState.money };
  } catch (error) {
    console.error("Erreur lors du chargement de l'argent:", error);
    return { success: false, error: "Erreur lors du chargement de l'argent" };
  }
}
