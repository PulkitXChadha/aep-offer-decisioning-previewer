import React from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
jest.mock("../../../web-src/src/hooks/useActionWebInvoke.js");
import { useActionWebInvoke } from "../../../web-src/src/hooks/useActionWebInvoke";
import mock from "../../actions/mock";
import ActivityList from "../../../web-src/src/components/ActivityList";

afterEach(cleanup);
beforeEach(() => {
  jest.clearAllMocks();
});

const onSelectionChange = jest.fn(0);
const fakeProps = {
  ims: { token: "fake-token", org: "fake-org" },
  containerID: "fake-containerID",
  onSelectionChange: onSelectionChange,
};

describe("<ActivityList> calls custom hook", () => {
  const mockResponse = {
    data: null,
    isLoading: true,
    error: null,
  };
  it("call custom hooks with global parameters correctly", () => {
    const fakeProps = {
      ims: { token: "fake-token", org: "fake-org" },
      containerID: "fake-containerID",
      onSelectionChange: onSelectionChange,
    };

    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<ActivityList {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("call custom hooks with global parameters correctly", () => {
    const fakeProps = {
      ims: { authorization: "fake-token", "x-gw-ims-org-id": "fake-org" },
      containerID: "fake-containerID",
      onSelectionChange: onSelectionChange,
    };

    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<ActivityList {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
describe("<ActivityList> on load", () => {
  const mockResponse = {
    data: null,
    isLoading: true,
    error: null,
  };
  it("renders correctly on load", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<ActivityList {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("has a <ProgressCircle> when loading", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(<ActivityList {...fakeProps} />);
    expect(screen.getByLabelText("Getting Offer Activities")).toBeDefined();
  });
});

describe("<ActivityList> on load", () => {
  const mockResponse = {
    data: mock.data.offerActivity,
    isLoading: false,
    error: null,
  };
  it("renders correctly on data", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(
      <Provider theme={defaultTheme} colorScheme={`light`}>
        <ActivityList {...fakeProps} />
      </Provider>
    );
    expect(screen.getByText("Select Offer Activity")).toBeInTheDocument();
    userEvent.click(screen.getByLabelText("Select Offer Activity"));
  });
});

describe("ActivityList on error", () => {
  const mockResponse = {
    data: null,
    isLoading: false,
    error: { message: "fake-error-message" },
  };
  it("renders correctly on error", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<ActivityList {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("show error message", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(<ActivityList {...fakeProps} />);
    expect(screen.getAllByText("fake-error-message")).toBeDefined();
  });
});

describe("<ActivityList> on data", () => {
  const mockResponse = {
    data: null,
    isLoading: false,
    error: null,
  };
  it("renders correctly on no data", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(<ActivityList {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("show no data message", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(<ActivityList {...fakeProps} />);
    expect(screen.getAllByText("You have no activities !")).toBeDefined();
  });
});
