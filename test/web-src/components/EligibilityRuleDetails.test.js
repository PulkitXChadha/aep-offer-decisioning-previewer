import React from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
jest.mock("../../../web-src/src/hooks/useActionWebInvoke.js");
import { useActionWebInvoke } from "../../../web-src/src/hooks/useActionWebInvoke";
import mock from "../../actions/mock";
import {
  ProfileProvider,
  useProfileState,
  useProfileDispatch,
} from "../../../web-src/src/context/ProfileViewContext";
import EligibilityRuleDetails from "../../../web-src/src/components/EligibilityRuleDetails";

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

describe("<EligibilityRuleDetails> calls custom hook", () => {
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
    const { asFragment } = render(
      <ProfileProvider>
        <EligibilityRuleDetails {...fakeProps} />
      </ProfileProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("call custom hooks with global parameters correctly", () => {
    const fakeProps = {
      ims: { authorization: "fake-token", "x-gw-ims-org-id": "fake-org" },
      onSelectionChange: onSelectionChange,
    };

    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(
      <ProfileProvider>
        <EligibilityRuleDetails {...fakeProps} />{" "}
      </ProfileProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("<EligibilityRuleDetails> on load", () => {
  const mockResponse = {
    data: null,
    isLoading: true,
    error: null,
  };
  it("renders correctly on load", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(
      <ProfileProvider>
        <EligibilityRuleDetails {...fakeProps} />
      </ProfileProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("has a <ProgressCircle> when loading", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(
      <ProfileProvider>
        <EligibilityRuleDetails {...fakeProps} />
      </ProfileProvider>
    );
    expect(screen.getByLabelText("Getting Offer Details")).toBeDefined();
  });
});

describe("<EligibilityRuleDetails> on load", () => {
  const mockResponse = {
    data: mock.data.offerDecisionRule,
    isLoading: false,
    error: null,
  };
  it("renders correctly on data", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(
      <Provider theme={defaultTheme} colorScheme={`light`}>
        <ProfileProvider>
          <EligibilityRuleDetails {...fakeProps} />
        </ProfileProvider>
      </Provider>
    );
    expect(screen.getByText("Decision Rule Details")).toBeInTheDocument();
    expect(screen.getByText("Condition:")).toBeInTheDocument();
  });
});

describe("<EligibilityRuleDetails> on error", () => {
  const mockResponse = {
    data: null,
    isLoading: false,
    error: { message: "fake-error-message" },
  };
  it("renders correctly on error", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(
      <ProfileProvider>
        <EligibilityRuleDetails {...fakeProps} />
      </ProfileProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("show error message", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(
      <ProfileProvider>
        <EligibilityRuleDetails {...fakeProps} />
      </ProfileProvider>
    );
    expect(screen.getAllByText("fake-error-message")).toBeDefined();
  });
});

describe("<EligibilityRuleDetails> on data", () => {
  const mockResponse = {
    data: null,
    isLoading: false,
    error: null,
  };
  it("renders correctly on no data", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(
      <ProfileProvider>
        <EligibilityRuleDetails {...fakeProps} />
      </ProfileProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("show no data message", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(
      <ProfileProvider>
        <EligibilityRuleDetails {...fakeProps} />
      </ProfileProvider>
    );
    expect(screen.getAllByText("No Details found.")).toBeDefined();
  });
});
