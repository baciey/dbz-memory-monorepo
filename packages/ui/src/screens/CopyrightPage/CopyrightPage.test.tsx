import React from "react";
import { renderWithProviders } from "../../utils/testUtils";
import { screen, waitFor } from "@testing-library/react-native";
import { CopyrightPage } from "./CopyrightPage";
import { authors, description } from "./CopyrightPage.const";

jest.useFakeTimers();

it("renders correctly", async () => {
  renderWithProviders(<CopyrightPage />);
  const { getByText, getAllByText } = screen;

  await waitFor(() => {
    expect(getByText("Copyright")).toBeOnTheScreen();
    expect(getByText(description)).toBeOnTheScreen();

    authors.forEach((author) => {
      expect(getByText(author.name)).toBeOnTheScreen();

      if (author.licenseShort === "CC BY 3.0") {
        expect(getAllByText(author.licenseShort)).toHaveLength(3);
      } else if (author.licenseShort === "CC BY-SA 3.0") {
        expect(getAllByText(author.licenseShort)).toHaveLength(1);
      } else if (author.licenseShort === "CC BY-ND 3.0") {
        expect(getAllByText(author.licenseShort)).toHaveLength(1);
      }
      author.images.forEach((image) => {
        expect(getByText(image.name)).toBeOnTheScreen();
      });
    });
  });
});
