import {
  buyIngredient,
  sellPotion,
  resetGame,
  getInventory,
} from "@/app/actions/inventory";
import { getMoney } from "@/app/actions/game";
import { resetDatabase } from "../setup";
import { prisma } from "@/lib/prisma";

describe("Inventory Server Actions Integration", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  describe("buyIngredient", () => {
    it("should buy ingredient and deduct money", async () => {
      const initialMoney = (await getMoney()).money || 0;

      const result = await buyIngredient("Noix de coco");

      expect(result.success).toBe(true);

      const finalMoney = (await getMoney()).money || 0;
      expect(finalMoney).toBeLessThan(initialMoney);
    });

    it("should fail when not enough money", async () => {
      await resetGame();
      await prisma.ingredient.create({
        data: { name: "Diamant magique", price: 999999, quantity: 1 },
      });

      const result = await buyIngredient("Diamant magique");

      expect(result.success).toBe(false);
      expect(result.error).toContain("Pas assez de rubis");
    });

    it("should fail with invalid ingredient name", async () => {
      const result = await buyIngredient("Invalid Ingredient");

      expect(result.success).toBe(false);
      expect(result.error).toContain("Ingrédient introuvable");
    });
  });

  describe("getInventory", () => {
    it("should return all ingredients", async () => {
      const result = await getInventory();

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data?.length).toBeGreaterThan(0);
    });

    it("should return ingredients with correct structure", async () => {
      const result = await getInventory();

      expect(result.success).toBe(true);
      const ingredient = result.data?.[0];
      expect(ingredient).toHaveProperty("id");
      expect(ingredient).toHaveProperty("name");
      expect(ingredient).toHaveProperty("price");
      expect(ingredient).toHaveProperty("quantity");
    });
  });

  describe("resetGame", () => {
    it("should reset the game state", async () => {
      await buyIngredient("Noix de coco");
      await buyIngredient("Yttrium");

      const result = await resetGame();

      expect(result.success).toBe(true);

      const inventory = await getInventory();
      expect(inventory.success).toBe(true);

      const money = await getMoney();
      expect(money.money).toBe(5000);
    });
  });

  describe("sellPotion", () => {
    it("should sell potion and add money", async () => {
      const initialMoney = (await getMoney()).money || 0;

      const result = await sellPotion("Potion d'invisibilité");

      expect(result.success).toBe(false);
      expect(result.error).toContain("Potion non disponible");

      const finalMoney = (await getMoney()).money || 0;
      expect(finalMoney).toBe(initialMoney);
    });
  });
});
