import {
  triggerMoneyUpdate,
  triggerInventoryUpdate,
  triggerPotionsUpdate,
} from "./utils";

describe("utils.ts - custom DOM events", () => {
  beforeEach(() => {
    jest.spyOn(window, "dispatchEvent");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should dispatch money-updated event with correct detail", () => {
    triggerMoneyUpdate(1234);

    expect(window.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "money-updated",
        detail: { money: 1234 },
      })
    );
  });

  it("should dispatch inventory-updated event", () => {
    triggerInventoryUpdate();

    expect(window.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "inventory-updated",
      })
    );
  });

  it("should dispatch potions-updated event", () => {
    triggerPotionsUpdate();

    expect(window.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "potions-updated",
      })
    );
  });
});
