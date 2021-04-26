import React from "react";
import { render, screen, cleanup, waitFor, act } from "@testing-library/react";
import { getRoles } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "../../../web-src/src/components/App";
jest.mock("../../../web-src/src/utils");
import actionWebInvoke from "../../../web-src/src/utils";
import mock from "../../actions/mock";
import { UserSettingsProvider } from "../../../web-src/src/context/UserSettingsContext.js";
afterEach(cleanup);
const onSelectionChange = jest.fn();
const mockRuntime = { on: () => {} };
const mockIms = {
  token: "fake-token",
  org: "fake-org",
  profile: { first_name: "fake-firstname" },
};

describe("<App> on initial load", () => {
  it("renders correctly ", async () => {
    actionWebInvoke.mockResolvedValue(mock.data.sandboxes);
    render(
      <UserSettingsProvider>
        <App
          runtime={mockRuntime}
          ims={mockIms}
          onSelectionChange={onSelectionChange}
        />
      </UserSettingsProvider>
    );

    expect(screen.getAllByRole("progressbar")).toHaveLength(2);
    expect(screen.getByRole("list")).toBeDefined();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);

    await waitFor(() => expect(actionWebInvoke).toHaveBeenCalledTimes(5));

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.getByText("select a sandbox")).toBeDefined();
  });
});
