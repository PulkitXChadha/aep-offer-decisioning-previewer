/*
 * <license header>
 */

jest.mock("@adobe/aio-sdk", () => ({
  Core: {
    Logger: jest.fn(),
  },
}));

const { Core } = require("@adobe/aio-sdk");

const mockLoggerInstance = {
  info: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
};
Core.Logger.mockReturnValue(mockLoggerInstance);

jest.mock("@adobe/aio-lib-state", () => ({
  init: jest.fn(),
}));

const mockStateInstance = {
  get: jest.fn(),
};

const stateLib = require("@adobe/aio-lib-state");
stateLib.init.mockReturnValue(mockStateInstance);

const state = require("../../../actions/misc/get-aio-state.js");

beforeEach(() => {
  Core.Logger.mockClear();
  mockLoggerInstance.info.mockReset();
  mockLoggerInstance.debug.mockReset();
  mockLoggerInstance.error.mockReset();

  stateLib.init.mockClear();

  mockStateInstance.get.mockReset();
});

const fakeParams = {
  key: "fake-state-key",
};

describe("get-aio-state", () => {
  test("main should be defined", () => {
    expect(state.main).toBeInstanceOf(Function);
  });

  test("should set logger to use LOG_LEVEL param", async () => {
    await state.main({ ...fakeParams, LOG_LEVEL: "fakeLevel" });
    expect(Core.Logger).toHaveBeenCalledWith(expect.any(String), {
      level: "fakeLevel",
    });
  });

  test("should return an http response with status code 200", async () => {
    mockStateInstance.get.mockReturnValueOnce({ value: "fake-state-value" });
    const response = await state.main(fakeParams);
    expect(response.statusCode).toEqual(200);

    expect(response.body).toEqual("fake-state-value");
  });

  test("if there is an error should return a 500 and log the error", async () => {
    const response = await state.main(fakeParams);
    expect(response).toEqual({
      error: {
        statusCode: 500,
        body: { error: "server error" },
      },
    });
  });

  test("missing input request parameters, should return 400", async () => {
    const response = await state.main({});
    expect(response).toEqual({
      error: {
        statusCode: 400,
        body: {
          error: "missing parameter(s) 'key'",
        },
      },
    });
  });
});
