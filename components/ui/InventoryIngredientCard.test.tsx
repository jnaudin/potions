import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InventoryIngredientCard from "./InventoryIngredientCard";
import { axe } from "jest-axe";

describe("InventoryIngredientCard", () => {
  const baseIngredient = {
    id: "1",
    name: "Noix de coco",
    price: 100,
    quantity: 3,
  };

  it("renders ingredient info correctly", () => {
    render(
      <InventoryIngredientCard
        ingredient={baseIngredient}
        onBuy={jest.fn()}
        canBuy={true}
      />
    );

    expect(screen.getByText("Noix de coco")).toBeInTheDocument();
    expect(screen.getByText("100 💎")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /acheter/i })).toBeEnabled();
  });

  it("disables the button when canBuy is false", () => {
    render(
      <InventoryIngredientCard
        ingredient={baseIngredient}
        onBuy={jest.fn()}
        canBuy={false}
      />
    );

    expect(screen.getByRole("button", { name: /acheter/i })).toBeDisabled();
  });

  it("calls onBuy with correct arguments on click", () => {
    const onBuyMock = jest.fn();

    render(
      <InventoryIngredientCard
        ingredient={baseIngredient}
        onBuy={onBuyMock}
        canBuy={true}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /acheter/i }));
    expect(onBuyMock).toHaveBeenCalledWith("Noix de coco", 100);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ul>
        <InventoryIngredientCard
          ingredient={baseIngredient}
          onBuy={() => {}}
          canBuy={true}
        />
      </ul>
    );

    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
