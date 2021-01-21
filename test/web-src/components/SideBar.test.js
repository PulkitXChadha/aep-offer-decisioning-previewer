import React from "react";
import { Provider, lightTheme } from "@adobe/react-spectrum";
import { render, screen, cleanup } from "@testing-library/react";
import { HashRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import mock from "../../actions/mock";
import SideBar from "../../../web-src/src/components/SideBar";

afterEach(cleanup);

describe("<SideBar> on load", () => {
  it("renders correctly ", () => {
    const { asFragment } = render(
      <Router>
        <Provider theme={lightTheme} colorScheme={`dark`}>
          <SideBar />
        </Provider>
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("<SideBar> on sandbox selection", () => {
  it("renders correctly", () => {
    const fakeProps = { isSandboxSelected: true };
    const { asFragment } = render(
      <Router>
        <SideBar {...fakeProps} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
