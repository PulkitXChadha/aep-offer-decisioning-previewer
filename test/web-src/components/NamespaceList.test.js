import React from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
jest.mock("../../../web-src/src/hooks/useActionWebInvoke.js");
import { useActionWebInvoke } from "../../../web-src/src/hooks/useActionWebInvoke";
import mock from "../../actions/mock";

import NamespaceList from "../../../web-src/src/components/NamespaceList";

afterEach(cleanup);
beforeEach(() => {
  jest.clearAllMocks();
});

const onSelectionChange = jest.fn(0);
const fakeProps = {
  ims: { token: "fake-token", org: "fake-org" },
  sandboxName: "fake-sandboxName",
  onSelectionChange: onSelectionChange,
};

describe("<NamespaceList> calls custom hook", () => {
  const mockResponse = {
    data: null,
    isLoading: true,
    error: null,
  };
  it("call custom hooks with global parameters correctly", () => {
    const fakeProps = {
      ims: { token: "fake-token", org: "fake-org" },
      sandboxName: "fake-sandboxName",
      onSelectionChange: onSelectionChange,
    };

    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<NamespaceList {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("call custom hooks with global parameters correctly", () => {
    const fakeProps = {
      ims: { authorization: "fake-token", "x-gw-ims-org-id": "fake-org" },
      onSelectionChange: onSelectionChange,
    };

    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<NamespaceList {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
describe("<NamespaceList> on load", () => {
  const mockResponse = {
    data: null,
    isLoading: true,
    error: null,
  };
  it("renders correctly on load", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<NamespaceList {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("has a <ProgressCircle> when loading", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(<NamespaceList {...fakeProps} />);
    // screen.debug();
    expect(screen.getByLabelText("Getting Identity Namespaces")).toBeDefined();
  });
});

describe("<NamespaceList> on load", () => {
  const mockResponse = {
    data: mock.data.identityPreviewReport,
    isLoading: false,
    error: null,
  };
  it("renders correctly on data", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(
      <Provider theme={defaultTheme} colorScheme={`light`}>
        <NamespaceList {...fakeProps} />
      </Provider>
    );
    expect(screen.getByText("Select Identity Namespace")).toBeInTheDocument();
    userEvent.click(screen.getByLabelText("Select Identity Namespace"));
  });
});

describe("<NamespaceList> on error", () => {
  const mockResponse = {
    data: null,
    isLoading: false,
    error: { message: "fake-error-message" },
  };
  it("renders correctly on error", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<NamespaceList {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("show error message", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(<NamespaceList {...fakeProps} />);
    expect(screen.getAllByText("fake-error-message")).toBeDefined();
  });
});

describe("<NamespaceList> on data", () => {
  const mockResponse = {
    data: null,
    isLoading: false,
    error: null,
  };
  it("renders correctly on no data", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<NamespaceList {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("show no data message", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(<NamespaceList {...fakeProps} />);
    expect(screen.getAllByText("You have no namespaces !")).toBeDefined();
  });
});
