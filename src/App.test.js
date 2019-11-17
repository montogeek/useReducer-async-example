import React from "react";
import TestRenderer from "react-test-renderer";
import App from "./App";
import Teams from "./pages/Teams";
import Conferences from "./pages/Conferences";

describe("App", () => {
  it("Renders Teams by default", () => {
    const testRenderer = TestRenderer.create(<App />);
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(Teams)).toBeTruthy();
  });

  it("Renders Conferences when using navigation", () => {
    const testRenderer = TestRenderer.create(<App />);
    const testInstance = testRenderer.root;

    const link = testInstance.findAllByProps({ className: "nav-link" })[1];

    TestRenderer.act(() => {
      link.props.onClick();
    });

    expect(() => testInstance.findByType(Teams)).toThrow();
    expect(testInstance.findByType(Conferences)).toBeTruthy();
  });
});
