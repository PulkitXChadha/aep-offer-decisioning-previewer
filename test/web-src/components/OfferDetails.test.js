import React from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
jest.mock("../../../web-src/src/hooks/useActionWebInvoke.js");
import { useActionWebInvoke } from "../../../web-src/src/hooks/useActionWebInvoke";
import mock from "../../actions/mock";

import OfferDetails from "../../../web-src/src/components/OfferDetails";

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

describe("<OfferDetails> calls custom hook", () => {
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
    const { asFragment } = render(<OfferDetails {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("call custom hooks with global parameters correctly", () => {
    const fakeProps = {
      ims: { authorization: "fake-token", "x-gw-ims-org-id": "fake-org" },
      onSelectionChange: onSelectionChange,
    };

    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<OfferDetails {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("<OfferDetails> on load", () => {
  const mockResponse = {
    data: null,
    isLoading: true,
    error: null,
  };
  it("renders correctly on load", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<OfferDetails {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("has a <ProgressCircle> when loading", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(<OfferDetails {...fakeProps} />);
    expect(screen.getByLabelText("Getting Offer Details")).toBeDefined();
  });
});

// describe("<OfferDetails> on load", () => {
//   const mockResponse = {
//     data: mock.data.offerDetails,
//     isLoading: false,
//     error: null,
//   };
//   it("renders correctly on data", async () => {
//     useActionWebInvoke.mockReturnValue(mockResponse);
//     render(
//       <Provider theme={defaultTheme} colorScheme={`light`}>
//         <OfferDetails {...fakeProps} />
//       </Provider>
//     );
//     expect(screen.getByText("Offer Details")).toBeInTheDocument();
//   });
// });

describe("<OfferDetails> on error", () => {
  const mockResponse = {
    data: null,
    isLoading: false,
    error: { message: "fake-error-message" },
  };
  it("renders correctly on error", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<OfferDetails {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("show error message", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(<OfferDetails {...fakeProps} />);
    expect(screen.getAllByText("fake-error-message")).toBeDefined();
  });
});

describe("<OfferDetails> on data", () => {
  const mockResponse = {
    data: null,
    isLoading: false,
    error: null,
  };
  it("renders correctly on no data", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<OfferDetails {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("show no data message", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(<OfferDetails {...fakeProps} />);
    expect(screen.getAllByText("No details available.")).toBeDefined();
  });
});
