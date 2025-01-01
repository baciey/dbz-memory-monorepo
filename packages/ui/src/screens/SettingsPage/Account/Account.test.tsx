import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { Account } from "./Account";
import { renderWithProviders } from "../../../utils/testUtils";
import {
  MOCK_APP_STATE,
  MOCK_USER_STATE,
} from "../../../../__mocks__/mockData";

// jest.useFakeTimers();

it("displays correctly for logged in user", async () => {
  renderWithProviders(<Account />, {
    preloadedState: {
      app: MOCK_APP_STATE,
      user: MOCK_USER_STATE,
    },
  });
  const { getByTestId, getByText, findByText } = screen;

  expect(getByText("You are logged in.")).toBeOnTheScreen();
  expect(getByText("Change password")).toBeOnTheScreen();
  expect(getByText("Logout")).toBeOnTheScreen();

  fireEvent.press(getByText("Change password"));

  await waitFor(
    async () => {
      expect(await findByText("Password")).toBeOnTheScreen();
    },
    { timeout: 3000 },
  );
});
