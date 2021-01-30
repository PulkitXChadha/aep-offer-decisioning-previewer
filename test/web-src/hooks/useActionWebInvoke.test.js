import { act, renderHook } from "@testing-library/react-hooks";
import { useActionWebInvoke } from "../../../web-src/src/hooks/useActionWebInvoke";

jest.mock("../../../web-src/src/utils");
import actionWebInvoke from "../../../web-src/src/utils";

describe("use the useActionWebInvoke hook", () => {
  it("data is fetched when loading is complete", async () => {
    const fakeSWData = { result: [{ name: "Luke Skywalker" }] };
    const fakeParams = {
      actionName: "fake-action",
      headers: {},
      params: {},
    };
    actionWebInvoke.mockResolvedValue(fakeSWData);
    const { result, waitForNextUpdate } = renderHook(() =>
      useActionWebInvoke(fakeParams)
    );
    expect(result.current.data).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.isLoading).toBeTruthy();

    await waitForNextUpdate();
    expect(actionWebInvoke).toBeCalledWith("fake-action", {}, {});

    expect(result.current.data).toEqual({
      result: [{ name: "Luke Skywalker" }],
    });
  });

  it("on error return error message", async () => {
    const fakeParams = {
      actionName: "fake-falling-action",
      headers: {},
      params: {},
    };
    const fakeError = new Error("fake-error");
    actionWebInvoke.mockRejectedValue(fakeError);
    const { result, waitForNextUpdate } = renderHook(() =>
      useActionWebInvoke(fakeParams)
    );
    expect(result.current.data).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();

    expect(actionWebInvoke).toBeCalledWith("fake-action", {}, {});

    expect(result.current.data).toBeFalsy();
    expect(result.current.error).toEqual(fakeError);
    expect(result.current.isLoading).toBeFalsy();
  });
});
