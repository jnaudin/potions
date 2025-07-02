import { getPotions } from "@/app/actions/potions";
import { getMoney } from "@/app/actions/game";
import { getInventory } from "@/app/actions/inventory";
import { resetDatabase } from "../setup";

describe("Simple Server Actions Integration", () => {
  beforeEach(async () => {
    await resetDatabase();
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
      if (potion) {
        expect(potion).toHaveProperty("id");
        expect(potion).toHaveProperty("name");
        expect(potion).toHaveProperty("discovered");
        expect(potion).toHaveProperty("price");
        expect(potion).toHaveProperty("quantity");
      }
    });
  });

  describe("getMoney", () => {
    it("should return money amount", async () => {
      const result = await getMoney();

      expect(result.success).toBe(true);
      expect(typeof result.money).toBe("number");
      expect(result.money).toBeGreaterThan(0);
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
      if (ingredient) {
        expect(ingredient).toHaveProperty("id");
        expect(ingredient).toHaveProperty("name");
        expect(ingredient).toHaveProperty("price");
        expect(ingredient).toHaveProperty("quantity");
      }
    });
  });

  describe("Database State", () => {
    it("should have initial game state", async () => {
      const moneyResult = await getMoney();
      expect(moneyResult.success).toBe(true);
      expect(moneyResult.money).toBe(5000);

      const inventoryResult = await getInventory();
      expect(inventoryResult.success).toBe(true);
      expect(inventoryResult.data?.length).toBeGreaterThan(0);

      const potionsResult = await getPotions();
      expect(potionsResult.success).toBe(true);
      expect(potionsResult.data?.length).toBeGreaterThan(0);
    });
  });
});
