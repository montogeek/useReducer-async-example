import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Conferences from "./Conferences";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Fetch conferences when it mounts", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            name: "ACC",
            short_name: "Atlantic Coast Conference",
            abbreviation: "ACC"
          },
          {
            id: 4,
            name: "Big 12",
            short_name: "Big 12 Conference",
            abbreviation: "B12"
          }
        ])
    })
  );

  await act(async () => {
    render(<Conferences />, container);
  });

  expect(container.querySelector(".table")).toBeTruthy();
  expect(container.querySelector("tr > td:first-child").textContent).toEqual(
    "ACC"
  );

  global.fetch.mockRestore();
});
