import React from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
jest.mock("../../../web-src/src/hooks/useActionWebInvoke.js");
import { useActionWebInvoke } from "../../../web-src/src/hooks/useActionWebInvoke";
import mock from "../../actions/mock";

import FallbackOfferDetails from "../../../web-src/src/components/FallbackOfferDetails";

afterEach(cleanup);
beforeEach(() => {
  jest.clearAllMocks();
});

const onSelectionChange = jest.fn(0);
const fakeProps = {
  ims: { token: "fake-token", org: "fake-org" },
  containerID: "fake-containerID",
  ruleID: "fake-rule-id",
};

describe("<FallbackOfferDetails> calls custom hook", () => {
  const mockResponse = {
    data: null,
    isLoading: true,
    error: null,
  };
  it("call custom hooks with global parameters correctly", () => {
    const fakeProps = {
      ims: { token: "fake-token", org: "fake-org" },
      containerID: "fake-containerID",
      ruleID: "fake-rule-id",
    };

    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<FallbackOfferDetails {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("call custom hooks with global parameters correctly", () => {
    const fakeProps = {
      ims: { authorization: "fake-token", "x-gw-ims-org-id": "fake-org" },
      onSelectionChange: onSelectionChange,
    };

    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<FallbackOfferDetails {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("<FallbackOfferDetails> on load", () => {
  const mockResponse = {
    data: null,
    isLoading: true,
    error: null,
  };
  it("renders correctly on load", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<FallbackOfferDetails {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("has a <ProgressCircle> when loading", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(<FallbackOfferDetails {...fakeProps} />);
    expect(screen.getByLabelText("Getting Offer Details")).toBeDefined();
  });
});

describe("<FallbackOfferDetails> on load", () => {
  const mockResponse = {
    data: mock.data.offerFallback,
    isLoading: false,
    error: null,
  };
  it("renders correctly on data", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(
      <Provider theme={defaultTheme} colorScheme={`light`}>
        <FallbackOfferDetails {...fakeProps} />
      </Provider>
    );
    expect(screen.getByText("Offer Details")).toBeInTheDocument();
  });
});

describe("<FallbackOfferDetails> on error", () => {
  const mockResponse = {
    data: null,
    isLoading: false,
    error: { message: "fake-error-message" },
  };
  it("renders correctly on error", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<FallbackOfferDetails {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("show error message", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(<FallbackOfferDetails {...fakeProps} />);
    expect(screen.getAllByText("fake-error-message")).toBeDefined();
  });
});
describe("<FallbackOfferDetails> on ODE error", () => {
  const mockResponse = {
    data: { status: 404, detail: "fake-error-message" },
    isLoading: false,
    error: null,
  };
  it("renders correctly on error", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<FallbackOfferDetails {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("show error message", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(<FallbackOfferDetails {...fakeProps} />);
    expect(screen.getAllByText("fake-error-message")).toBeDefined();
  });
});
describe("<FallbackOfferDetails> on data", () => {
  const mockResponse = {
    data: null,
    isLoading: false,
    error: null,
  };
  it("renders correctly on no data", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<FallbackOfferDetails {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("show no data message", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(<FallbackOfferDetails {...fakeProps} />);
    expect(screen.getAllByText("No details available.")).toBeDefined();
  });
});
