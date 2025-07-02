import { renderHook, act } from "@testing-library/react";
import { useServerAction } from "./useServerAction";

describe("useServerAction", () => {
  it("should call the passed action", async () => {
    const { result } = renderHook(() => useServerAction());

    const action = jest.fn().mockResolvedValueOnce(null);

    await act(async () => {
      await result.current.executeAction(action);
    });

    expect(action).toHaveBeenCalled();
  });

  it("should return loading and isPending states", () => {
    const { result } = renderHook(() => useServerAction());

    expect(result.current).toHaveProperty("loading");
    expect(result.current).toHaveProperty("isPending");
    expect(result.current).toHaveProperty("executeAction");
    expect(typeof result.current.executeAction).toBe("function");
  });
});
