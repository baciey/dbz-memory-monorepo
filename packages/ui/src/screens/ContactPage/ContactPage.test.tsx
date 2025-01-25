import React from "react";
import { renderWithProviders } from "../../utils/testUtils";
import { screen, waitFor } from "@testing-library/react-native";
import { ContactPage } from "./ContactPage";

jest.useFakeTimers();

it("renders correctly", async () => {
  renderWithProviders(<ContactPage />);
  const { getByText } = screen;

  await waitFor(() => {
    expect(getByText("Contact us")).toBeOnTheScreen();
  });
});
