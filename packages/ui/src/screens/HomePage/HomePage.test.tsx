import React from "react";
import { HomePage } from "./HomePage";
import { renderWithProviders } from "../../utils/testUtils";

it("renders buttons correctly", () => {
  const { getByText } = renderWithProviders(<HomePage />);
  expect(getByText("1 player")).toBeTruthy();
  expect(getByText("2 players")).toBeTruthy();
});
