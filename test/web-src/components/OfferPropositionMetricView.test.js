import React from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
jest.mock("../../../web-src/src/hooks/useActionWebInvoke.js");
import { useActionWebInvoke } from "../../../web-src/src/hooks/useActionWebInvoke";
import mock from "../../actions/mock";

import OfferPropositionMetricView from "../../../web-src/src/components/OfferPropositionMetricView";

afterEach(cleanup);
beforeEach(() => {
  jest.clearAllMocks();
});

const fakeProps = {
  ims: { token: "fake-token", org: "fake-org" },
  containerID: "fake-containerID",
  offerID: "fake-offerID",
  offerGlobalCap: "100",
  onLoad: jest.fn(0),
};

describe("<OfferPropositionMetricView> calls custom hook", () => {
  const mockResponse = {
    data: null,
    isLoading: true,
    error: null,
  };
  it("call custom hooks with global parameters correctly", () => {
    const fakeProps = {
      ims: { token: "fake-token", org: "fake-org" },
      containerID: "fake-containerID",
      offerID: "fake-offerID",
      offerGlobalCap: "100",
      onLoad: jest.fn(0),
    };

    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(
      <OfferPropositionMetricView {...fakeProps} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("call custom hooks with global parameters correctly", () => {
    const fakeProps = {
      ims: { authorization: "fake-token", "x-gw-ims-org-id": "fake-org" },
      offerID: "fake-offerID",
      offerGlobalCap: "100",
      onLoad: jest.fn(0),
    };

    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(
      <OfferPropositionMetricView {...fakeProps} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("<OfferPropositionMetricView> on load", () => {
  const mockResponse = {
    data: null,
    isLoading: true,
    error: null,
  };
  it("renders correctly on load", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(
      <OfferPropositionMetricView {...fakeProps} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("has a <ProgressCircle> when loading", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(<OfferPropositionMetricView {...fakeProps} />);
    expect(
      screen.getByLabelText("Getting Offer Proposition Metrics")
    ).toBeDefined();
  });
});

describe("<OfferPropositionMetricView> on load", () => {
  const mockResponse = {
    data: mock.data.offerPropositionMetric,
    isLoading: false,
    error: null,
  };
  it("renders correctly on data", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(
      <Provider theme={defaultTheme} colorScheme={`light`}>
        <OfferPropositionMetricView {...fakeProps} />
      </Provider>
    );
    expect(screen.getByText("Usage")).toBeInTheDocument();
  });
});

describe("<OfferPropositionMetricView> on error", () => {
  const mockResponse = {
    data: null,
    isLoading: false,
    error: { message: "fake-error-message" },
  };
  it("renders correctly on error", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(
      <OfferPropositionMetricView {...fakeProps} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("<OfferPropositionMetricView> on data", () => {
  const mockResponse = {
    data: null,
    isLoading: false,
    error: null,
  };
  it("renders correctly on no data", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(
      <OfferPropositionMetricView {...fakeProps} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("show no data message", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(<OfferPropositionMetricView {...fakeProps} />);
    expect(screen.getAllByText("Metrics not Found")).toBeDefined();
  });
});
