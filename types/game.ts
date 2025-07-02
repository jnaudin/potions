// Centralized types for the potion game

// ===== TYPES DE BASE =====

export interface Ingredient {
  name: string;
  price: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Potion {
  id: string;
  name: string;
  ingredients: string[];
  discovered: boolean;
  discoverPrice: number;
  price: number;
  quantity: number;
  createdAt?: string | null;
  discoveredAt?: string | null;
}

// ===== TYPES POUR LES SERVER ACTIONS =====

export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface BuyIngredientResult {
  success: boolean;
  error?: string;
}

export interface SellPotionResult {
  success: boolean;
  price?: number;
  error?: string;
}

export interface ResetGameResult {
  success: boolean;
  error?: string;
}

export interface GetMoneyResult {
  success: boolean;
  money?: number;
  error?: string;
}

export interface GetInventoryResult {
  success: boolean;
  data?: InventoryItem[];
  error?: string;
}

export interface GetPotionsResult {
  success: boolean;
  data?: Potion[];
  error?: string;
}

export interface DiscoverPotionResult {
  success: boolean;
  data?: Potion;
  error?: string;
}

// ===== TYPES POUR LES COMPOSANTS =====

export interface InventoryClientProps {
  inventory: InventoryItem[];
  potions: Potion[];
  money: number;
}

export interface BrewClientProps {
  inventory: InventoryItem[];
}

export interface PotionsClientProps {
  potions: Potion[];
  money: number;
}

export interface PotionCardProps {
  potion: Potion;
  money: number;
}

export type ToastType = "success" | "error" | "info";

export interface ToastState {
  message: string;
  type: ToastType;
}

// ===== TYPES POUR LES RECETTES =====

export interface Recipe {
  name: string;
  ingredients: string[];
  price: number;
  discoverPrice: number;
}

// ===== TYPES POUR LES VALIDATIONS =====

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

// ===== TYPES POUR LES COMPOSANTS UI =====

export interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
}

export interface MagicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export interface MagicToastProps {
  message: string;
  type?: ToastType;
  duration?: number; // en ms
}
