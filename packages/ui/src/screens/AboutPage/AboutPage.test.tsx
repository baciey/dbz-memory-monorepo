import React from "react";
import { renderWithProviders } from "../../utils/testUtils";
import { screen, waitFor } from "@testing-library/react-native";
import { AboutPage } from "./AboutPage";
import { technologies } from "./AboutPage.const";

jest.useFakeTimers();

it("renders correctly", async () => {
  renderWithProviders(<AboutPage />);
  const { getByText } = screen;

  await waitFor(() => {
    expect(getByText("About this project")).toBeOnTheScreen();
    expect(getByText("Description")).toBeOnTheScreen();
    expect(getByText("Used technologies")).toBeOnTheScreen();

    technologies.forEach((technology) => {
      expect(getByText(technology.name)).toBeOnTheScreen();
    });
  });
});
