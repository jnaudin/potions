import {
  createPotion,
  discoverPotion,
  getPotions,
} from "@/app/actions/potions";
import {
  buyIngredient,
  sellPotion as sellPotionInventory,
  resetGame,
} from "@/app/actions/inventory";
import { getMoney } from "@/app/actions/game";
import { resetDatabase } from "../setup";
import { prisma } from "@/lib/prisma";

describe("Potion Server Actions Integration", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  describe("createPotion", () => {
    it("should create a new potion successfully", async () => {
      await buyIngredient("Noix de coco");
      await buyIngredient("Yttrium");
      await buyIngredient("Mandragore");

      const result = await createPotion([
        "Noix de coco",
        "Yttrium",
        "Mandragore",
      ]);

      expect(result.success).toBe(true);
      expect(result.potion?.name).toBe("Potion d'invisibilité");
      expect(result.isNewDiscovery).toBe(true);
    });

    it("should fail when not enough ingredients", async () => {
      await prisma.ingredient.updateMany({ data: { quantity: 0 } });

      const result = await createPotion([
        "Noix de coco",
        "Yttrium",
        "Mandragore",
      ]);

      expect(result.success).toBe(false);
      expect(result.error).toContain("Ingrédient insuffisant");
    });

    it("should fail with invalid ingredient combination", async () => {
      const result = await createPotion(["Noix de coco", "Yttrium", "Invalid"]);

      expect(result.success).toBe(false);
      expect(result.error).toContain("Aucune potion ne correspond");
    });

    it("should fail with wrong number of ingredients", async () => {
      const result = await createPotion(["Noix de coco", "Yttrium"]);

      expect(result.success).toBe(false);
      expect(result.error).toContain("Il faut exactement 3 ingrédients");
    });
  });

  describe("discoverPotion", () => {
    it("should discover a potion and deduct money", async () => {
      await resetGame();
      await prisma.potion.update({
        where: { name: "Potion d'invisibilité" },
        data: { discoverPrice: 1000 },
      });
      const initialMoney = (await getMoney()).money || 0;

      const result = await discoverPotion("Potion d'invisibilité");

      expect(result.success).toBe(true);
      expect(result.data?.name).toBe("Potion d'invisibilité");
      expect(result.data?.discovered).toBe(true);

      const finalMoney = (await getMoney()).money || 0;
      expect(finalMoney).toBeLessThan(initialMoney);
    });

    it("should fail when not enough money", async () => {
      await resetGame();

      const result = await discoverPotion("Potion d'invisibilité");

      expect(result.success).toBe(false);
      expect(result.error).toContain("Pas assez de rubis");
    });

    it("should fail with invalid potion name", async () => {
      const result = await discoverPotion("");

      expect(result.success).toBe(false);
      expect(result.error).toContain("Le nom de la potion");
    });
  });

  describe("sellPotion", () => {
    it("should sell a potion and add money", async () => {
      await buyIngredient("Noix de coco");
      await buyIngredient("Yttrium");
      await buyIngredient("Mandragore");
      await createPotion(["Noix de coco", "Yttrium", "Mandragore"]);

      const initialMoney = (await getMoney()).money || 0;

      const result = await sellPotionInventory("Potion d'invisibilité");

      expect(result.success).toBe(true);
      expect(result.price).toBeGreaterThan(0);

      const finalMoney = (await getMoney()).money || 0;
      expect(finalMoney).toBeGreaterThan(initialMoney);
    });

    it("should fail when no potion to sell", async () => {
      const result = await sellPotionInventory("Non-existent");

      expect(result.success).toBe(false);
      expect(result.error).toContain("Potion non disponible");
    });
  });

  describe("getPotions", () => {
    it("should return all potions", async () => {
      const result = await getPotions();

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data?.length).toBeGreaterThan(0);
    });

    it("should return potions with correct structure", async () => {
      const result = await getPotions();

      expect(result.success).toBe(true);
      const potion = result.data?.[0];
      expect(potion).toHaveProperty("id");
      expect(potion).toHaveProperty("name");
      expect(potion).toHaveProperty("discovered");
      expect(potion).toHaveProperty("price");
      expect(potion).toHaveProperty("quantity");
    });
  });
});
