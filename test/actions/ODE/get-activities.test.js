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

jest.mock("node-fetch");
const fetch = require("node-fetch");
const mock = require("../mock");
const action = require("../../../actions/ODE/get-activities");

beforeEach(() => {
  Core.Logger.mockClear();
  mockLoggerInstance.info.mockReset();
  mockLoggerInstance.debug.mockReset();
  mockLoggerInstance.error.mockReset();
});

const fakeParams = {
  __ow_headers: {
    authorization: "Bearer fake",
    "x-gw-ims-org-id": "fake IMS ORG",
  },
  apiKey: "fake API Key",
  containerID: "fake-container-ID",
};
describe("get-activities", () => {
  const mockFetchErrorResponse = {
    ok: false,
    json: () => Promise.reject(new Error("fake")),
  };
  const mockFetchResponse = {
    ok: true,
    json: () => Promise.resolve(mock.data.offerActivity),
  };

  test("main should be defined", () => {
    expect(action.main).toBeInstanceOf(Function);
  });
  test("should set logger to use LOG_LEVEL param", async () => {
    await action.main({ ...fakeParams, LOG_LEVEL: "fakeLevel" });
    expect(Core.Logger).toHaveBeenCalledWith(expect.any(String), {
      level: "fakeLevel",
    });
  });
  test("should return an http response with status code 200", async () => {
    fetch.mockResolvedValue(mockFetchResponse);
    const response = await action.main(fakeParams);
    expect(response.statusCode).toEqual(200);
  });
  test("if there is an error should return a 500 and log the error", async () => {
    fetch.mockRejectedValue(mockFetchErrorResponse);
    const response = await action.main(fakeParams);
    expect(response).toEqual({
      error: {
        statusCode: 500,
        body: { error: "server error" },
      },
    });
    expect(mockLoggerInstance.error).toHaveBeenCalledWith(
      mockFetchErrorResponse
    );
  });
  test("if returned service status code is not ok should return a 500 and log the status", async () => {
    const mockFetchResponse = {
      ok: false,
      status: 404,
    };
    fetch.mockResolvedValue(mockFetchResponse);
    const response = await action.main(fakeParams);
    expect(response).toEqual({
      error: {
        statusCode: 500,
        body: { error: "server error" },
      },
    });
    // error message should contain 404
    expect(mockLoggerInstance.error).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining("404") })
    );
  });
  test("missing input request parameters, should return 400", async () => {
    const response = await action.main({});
    expect(response).toEqual({
      error: {
        statusCode: 400,
        body: {
          error:
            "missing header(s) 'authorization,x-gw-ims-org-id' and missing parameter(s) 'containerID,apiKey'",
        },
      },
    });
  });
});
