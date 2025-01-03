import React from "react";
import { HomePage } from "./HomePage";
import { renderWithProviders } from "../../utils/testUtils";
import { fireEvent, screen } from "@testing-library/react-native";

it("presses 1 player button then cancel", () => {
  renderWithProviders(<HomePage />);
  const { getByText, queryByText } = screen;

  fireEvent.press(getByText("1 player"));
  expect(getByText("Enter your name")).toBeOnTheScreen();
  fireEvent.press(getByText("Cancel"));

  expect(queryByText("Cancel")).not.toBeOnTheScreen();
});

it("presses 1 player button then confirm", async () => {
  renderWithProviders(<HomePage />);
  const { getByText, getByTestId, queryByTestId, findByTestId } = screen;

  expect(queryByTestId("cardContainer-0")).not.toBeOnTheScreen();
  fireEvent.press(getByText("1 player"));
  const input = getByTestId("player1Name");
  fireEvent.changeText(input, "test name");
  fireEvent.press(getByText("Confirm"));

  expect(await findByTestId("cardContainer-0")).toBeOnTheScreen();
});

it("presses 2 players button then cancel", () => {
  renderWithProviders(<HomePage />);
  const { getByText, queryByText } = screen;

  fireEvent.press(getByText("2 players"));
  expect(getByText("Enter your names")).toBeOnTheScreen();
  fireEvent.press(getByText("Cancel"));

  expect(queryByText("Cancel")).not.toBeOnTheScreen();
});

it("presses 2 players button then confirm", async () => {
  renderWithProviders(<HomePage />);
  const { getByText, getByTestId, queryByTestId, findByTestId } = screen;

  expect(queryByTestId("cardContainer-0")).not.toBeOnTheScreen();
  fireEvent.press(getByText("2 players"));

  const input1 = getByTestId("player1Name");
  const input2 = getByTestId("player2Name");

  fireEvent.changeText(input1, "test name 1");
  fireEvent.changeText(input2, "test name 2");
  fireEvent.press(getByText("Confirm"));

  expect(await findByTestId("cardContainer-0")).toBeOnTheScreen();
});
