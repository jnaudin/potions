import { renderHook, act } from "@testing-library/react";
import { useMoney } from "./useMoney"; // adapte le chemin si besoin

describe("useMoney", () => {
  it("should initialize with default money value", () => {
    const { result } = renderHook(() => useMoney());

    expect(result.current.money).toBe(5000);
  });

  it("should initialize with custom money value", () => {
    const { result } = renderHook(() => useMoney(1234));

    expect(result.current.money).toBe(1234);
  });

  it("should update money via setMoney", () => {
    const { result } = renderHook(() => useMoney());

    act(() => {
      result.current.setMoney(2000);
    });

    expect(result.current.money).toBe(2000);
  });

  it("should update money when custom event is dispatched", () => {
    const { result } = renderHook(() => useMoney());

    act(() => {
      window.dispatchEvent(
        new CustomEvent("money-updated", {
          detail: { money: 9999 },
        })
      );
    });

    expect(result.current.money).toBe(9999);
  });

  it("should clean up event listener on unmount", () => {
    const spy = jest.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useMoney());

    unmount();

    expect(spy).toHaveBeenCalledWith("money-updated", expect.any(Function));
  });
});
