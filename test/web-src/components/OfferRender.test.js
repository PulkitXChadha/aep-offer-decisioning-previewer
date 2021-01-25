import React from "react";

import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
jest.mock("../../../web-src/src/hooks/useActionWebInvoke.js");
import { useActionWebInvoke } from "../../../web-src/src/hooks/useActionWebInvoke";
import mock from "../../actions/mock";

import OfferRender from "../../../web-src/src/components/OfferRender";

afterEach(cleanup);
const fakeProps = {
  ims: { token: "fake-token", org: "fake-org" },
  containerID: "fake-container",
  placementID: "fake-placementID",
  activityID: "fake-activityID",
  identityNamespace: "fake-identityNamespace",
  entityValue: "fake-entityValue",
};
describe("<OfferRender> calls custom hook", () => {
  const mockResponse = {
    data: null,
    isLoading: true,
    error: null,
  };
  it("call custom hooks with global parameters correctly", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<OfferRender {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("call custom hooks with global parameters correctly", () => {
    const fakeProps = {
      ims: { authorization: "fake-token", "x-gw-ims-org-id": "fake-org" },
      containerID: "fake-container",
      placementID: "fake-placementID",
      activityID: "fake-activityID",
      identityNamespace: "fake-identityNamespace",
      entityValue: "fake-entityValue",
    };
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<OfferRender {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("<OfferRender> on load", () => {
  const mockResponse = {
    data: null,
    isLoading: true,
    error: null,
  };
  it("renders correctly on load", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<OfferRender {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("has a <ProgressCircle> when loading", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(<OfferRender {...fakeProps} />);
    expect(screen.getByLabelText("Getting Offer Representation")).toBeDefined();
  });
});

// describe("<OfferRender> on load - offer image", () => {
//   const mockResponse = {
//     data: mock.data.offerRepresentationImage,
//     isLoading: false,
//     error: null,
//   };
//   it("renders correctly on data", async () => {
//     useActionWebInvoke.mockReturnValue(mockResponse);
//     render(
//       <Provider theme={defaultTheme} colorScheme={`light`}>
//         <OfferRender {...fakeProps} />
//       </Provider>
//     );
//     ;
//     expect(screen.getByRole('img')).toBeInTheDocument();
//   });
// });

// describe("<OfferRender> on load - offer text", () => {
//   const mockResponse = {
//     data: mock.data.offerRepresentationText,
//     isLoading: false,
//     error: null,
//   };
//   it("renders correctly on data", async () => {
//     useActionWebInvoke.mockReturnValue(mockResponse);
//     render(
//       <Provider theme={defaultTheme} colorScheme={`light`}>
//         <OfferRender {...fakeProps} />
//       </Provider>
//     );
//     expect(screen.getByText('Ready for a new ride!!!')).toBeInTheDocument();
//   });
// });
// describe("<OfferRender> on error", () => {
//   const mockResponse = {
//     data: mock.data.offerRepresentationError,
//     isLoading: false,
//     error: null,
//   };
//   it("renders correctly on error", () => {
//     useActionWebInvoke.mockReturnValue(mockResponse);
//     const { asFragment } = render(<OfferRender {...fakeProps} />);
//     expect(asFragment()).toMatchSnapshot();
//   });

//   it("show error message", async () => {
//     useActionWebInvoke.mockReturnValue(mockResponse);
//     render(<OfferRender {...fakeProps} />);
//     expect(screen.getAllByText("fake-error-message")).toBeDefined();
//   });
// });

