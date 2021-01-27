import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../../../web-src/src/components/Home";

afterEach(cleanup);

describe("<Home> on load", () => {
  it("renders correctly ", () => {
    const fakeProps = { isSandboxSelected: false, isLoading: true };
    const { asFragment } = render(<Home {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByLabelText("Getting Containers")).toBeDefined();
  });
});

describe("<Home> on sandbox selection", () => {
  it("renders correctly", () => {
    const fakeProps = { isSandboxSelected: true, isLoading: false };
    const { asFragment } = render(<Home {...fakeProps} />);
    expect(asFragment()).toMatchSnapshot();
    expect(screen.queryByText("Select a Sandbox")).toBeNull();
  });
});
