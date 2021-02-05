import React from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
jest.mock("../../../web-src/src/hooks/useActionWebInvoke.js");
import { useActionWebInvoke } from "../../../web-src/src/hooks/useActionWebInvoke";
import mock from "../../actions/mock";
import {
  ProfileProvider,
  useProfileState,
  useProfileDispatch,
} from "../../../web-src/src/context/ProfileViewContext";
import { UserSettingsProvider } from "../../../web-src/src/context/UserSettingsContext.js";
import ProfileView from "../../../web-src/src/components/ProfileView";

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

describe("<ProfileView> calls custom hook", () => {
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
      <UserSettingsProvider>
        <ProfileProvider>
          <ProfileView {...fakeProps} />
        </ProfileProvider>
      </UserSettingsProvider>
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
      <UserSettingsProvider>
        <ProfileProvider>
          <ProfileView {...fakeProps} />
        </ProfileProvider>
      </UserSettingsProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("<ProfileView> on load", () => {
  const mockResponse = {
    data: null,
    isLoading: true,
    error: null,
  };
  it("renders correctly on load", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(
      <UserSettingsProvider>
        <ProfileProvider>
          <ProfileView {...fakeProps} />
        </ProfileProvider>
      </UserSettingsProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("has a <ProgressCircle> when loading", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(
      <UserSettingsProvider>
        <ProfileProvider>
          <ProfileView {...fakeProps} />
        </ProfileProvider>
      </UserSettingsProvider>
    );
    expect(screen.getByLabelText("Getting Profile")).toBeDefined();
  });
});

describe("<ProfileView> on load", () => {
  const mockResponse = {
    data: mock.data.profile,
    isLoading: false,
    error: null,
  };
  it("renders correctly on data", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(
      <Provider theme={defaultTheme} colorScheme={`light`}>
        <UserSettingsProvider>
          <ProfileProvider>
            <ProfileView {...fakeProps} />
          </ProfileProvider>
        </UserSettingsProvider>
      </Provider>
    );
    expect(screen.getByText("profile")).toBeInTheDocument();
  });
});

describe("<ProfileView> on error", () => {
  const mockResponse = {
    data: null,
    isLoading: false,
    error: { message: "fake-error-message" },
  };
  it("renders correctly on error", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(
      <UserSettingsProvider>
        <ProfileProvider>
          <ProfileView {...fakeProps} />
        </ProfileProvider>
      </UserSettingsProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("show error message", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(
      <UserSettingsProvider>
        <ProfileProvider>
          <ProfileView {...fakeProps} />
        </ProfileProvider>
      </UserSettingsProvider>
    );
    expect(screen.getAllByText("No Profile Data Found")).toBeDefined();
  });
});

describe("<ProfileView> on data", () => {
  const mockResponse = {
    data: null,
    isLoading: false,
    error: null,
  };
  it("renders correctly on no data", () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    const { asFragment } = render(
      <UserSettingsProvider>
        <ProfileProvider>
          <ProfileView {...fakeProps} />
        </ProfileProvider>
      </UserSettingsProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("show no data message", async () => {
    useActionWebInvoke.mockReturnValue(mockResponse);
    render(
      <UserSettingsProvider>
        <ProfileProvider>
          <ProfileView {...fakeProps} />
        </ProfileProvider>
      </UserSettingsProvider>
    );
    expect(screen.getAllByText("No Profile Data Found")).toBeDefined();
  });
});
