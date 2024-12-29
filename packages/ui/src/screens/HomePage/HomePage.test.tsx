import React from "react";
import { HomePage } from "./HomePage";
import { renderWithProviders } from "../../utils/testUtils";
import { fireEvent, screen } from "@testing-library/react-native";

it("presses 1 player button then cancel", async () => {
  renderWithProviders(<HomePage />);
  const { getByText, queryByText } = screen;

  fireEvent.press(getByText("1 player"));
  expect(getByText("Enter your name")).toBeOnTheScreen();
  const cancelButton = getByText("Cancel");
  fireEvent.press(cancelButton);
  expect(queryByText("Cancel")).toBeFalsy();
});

it("presses 1 player button then confirm", async () => {
  jest.useFakeTimers();
  renderWithProviders(<HomePage />);
  const { getByText, getByTestId, findByTestId } = screen;

  fireEvent.press(getByText("1 player"));
  expect(getByText("Enter your name")).toBeOnTheScreen();
  const confirmButton = getByText("Confirm");
  const input = getByTestId("player1Name");
  fireEvent.changeText(input, "test name");
  fireEvent.press(confirmButton);
  expect(await findByTestId("loader")).toBeOnTheScreen();
});

it("presses 2 players button then cancel", () => {
  renderWithProviders(<HomePage />);
  const { getByText, queryByText } = screen;

  fireEvent.press(getByText("2 players"));
  const cancelButton = getByText("Cancel");
  expect(cancelButton).toBeOnTheScreen();
  fireEvent.press(cancelButton);
  expect(queryByText("Cancel")).toBeFalsy();
});

it("presses 2 players button then confirm", async () => {
  jest.useFakeTimers();
  renderWithProviders(<HomePage />);
  const { getByText, findByTestId } = screen;

  fireEvent.press(getByText("2 players"));
  const confirmButton = getByText("Confirm");
  expect(confirmButton).toBeOnTheScreen();
  const input1 = screen.getByTestId("player1Name");
  const input2 = screen.getByTestId("player2Name");
  fireEvent.changeText(input1, "test name 1");
  fireEvent.changeText(input2, "test name 2");
  fireEvent.press(confirmButton);
  expect(await findByTestId("loader")).toBeOnTheScreen();
});
