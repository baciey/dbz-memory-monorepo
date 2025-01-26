import React from "react";
import { screen } from "@testing-library/react-native";
import { renderWithProviders } from "../../../utils/testUtils";
import { GameInfo } from "./GameInfo";
import { GAME_BOARD_MODE } from "../GameBoard";

jest.useFakeTimers();

describe("GameInfo", () => {
  const defaultProps = {
    mode: GAME_BOARD_MODE.player1,
    elapsedTime: 5,
    player1Score: 4,
    player2Score: 5,
    player1Name: "Player 1",
    player2Name: "Player 2",
    player2Id: "player2Id",
    isPlayer1Turn: true,
  };
  it("displays correct info for 1-player mode", () => {
    renderWithProviders(<GameInfo {...defaultProps} />);
    const { getByText, queryByText } = screen;

    expect(getByText("Time: 5 sec")).toBeOnTheScreen();

    expect(queryByText("Player 1: 4")).not.toBeOnTheScreen();
    expect(queryByText("Player 2: 5")).not.toBeOnTheScreen();
  });

  it("displays correct info for 2-player mode", () => {
    const props = {
      ...defaultProps,
      mode: GAME_BOARD_MODE.player2,
    };
    renderWithProviders(<GameInfo {...props} />);
    const { getByText, queryByText } = screen;

    expect(getByText("Player 1: 4")).toBeOnTheScreen();
    expect(getByText("Player 2: 5")).toBeOnTheScreen();

    expect(queryByText("Time: 5 sec")).not.toBeOnTheScreen();
  });
});
