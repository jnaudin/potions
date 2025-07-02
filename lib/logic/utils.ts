// Trigger money updates
export function triggerMoneyUpdate(money: number) {
  window.dispatchEvent(new CustomEvent("money-updated", { detail: { money } }));
}

// Trigger inventory updates
export function triggerInventoryUpdate() {
  window.dispatchEvent(new CustomEvent("inventory-updated"));
}

// Trigger potions updates
export function triggerPotionsUpdate() {
  window.dispatchEvent(new CustomEvent("potions-updated"));
}
