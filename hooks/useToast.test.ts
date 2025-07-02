import { renderHook, act } from "@testing-library/react";
import { useToast } from "./useToast"; // adapte le chemin si besoin
import { ToastType } from "@/types/game";

describe("useToast", () => {
  it("should start with no toast", () => {
    const { result } = renderHook(() => useToast());

    expect(result.current.toast).toBeNull();
  });

  it("should show a toast with given message and type", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast("Hello world", "error");
    });

    expect(result.current.toast).toEqual({
      message: "Hello world",
      type: "error",
    });
  });

  it('should default to "success" type if none is provided', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast("Auto-success");
    });

    expect(result.current.toast).toEqual({
      message: "Auto-success",
      type: "success",
    });
  });

  it("should hide the toast", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast("Temp message");
      result.current.hideToast();
    });

    expect(result.current.toast).toBeNull();
  });
});
