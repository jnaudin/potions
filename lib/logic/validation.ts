// Data validation for Server Actions
import { ValidationResult } from "@/types/game";

export function validatePotionName(name: string): ValidationResult {
  if (!name || typeof name !== "string") {
    return { valid: false, error: "Le nom de la potion est requis" };
  }

  if (name.trim().length === 0) {
    return { valid: false, error: "Le nom de la potion ne peut pas être vide" };
  }

  return { valid: true };
}
