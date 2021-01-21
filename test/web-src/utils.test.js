const utils = require("../../web-src/src/utils");

jest.mock("node-fetch");
const fetch = require("node-fetch");

const fakeParams = {
  actionsName: "fake-action",
  header: {
    authorization: "Bearer fake",
    "x-gw-ims-org-id": "fake IMS ORG",
  },
  params: {
    apiKey: "fake API Key",
    containerID: "fake-container-ID",
  },
};
const mockFetchErrorResponse = {
  ok: false,
  text: () => Promise.reject(JSON.stringify(new Error("fake"))),
};

const mockFetchResponse = {
  ok: true,
  text: () =>
    Promise.resolve({ statusCode: 200, data: { name: "Luke Skywalker" } }),
};
describe("actionWebInvoke", () => {
  test("returns response data", async () => {
    fetch.mockResolvedValue(mockFetchResponse);
    const response = await utils.default(fakeParams);
    expect(response).toEqual({
      statusCode: 200,
      data: { name: "Luke Skywalker" },
    });
  });
});
