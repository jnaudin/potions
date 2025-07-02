import { validatePotionName } from "./validation";

describe("validatePotionName", () => {
  it("should reject empty string or whitespace", () => {
    expect(validatePotionName("")).toEqual({
      valid: false,
      error: "Le nom de la potion est requis",
    });

    expect(validatePotionName("     ")).toEqual({
      valid: false,
      error: "Le nom de la potion ne peut pas être vide",
    });
  });

  it("should accept a valid non-empty string", () => {
    expect(validatePotionName("Potion de feu")).toEqual({
      valid: true,
    });
  });
});
