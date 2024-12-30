import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { renderWithProviders } from "../../../utils/testUtils";
import { GameInfo } from "./GameInfo";
import { GAME_BOARD_MODE, PLAYER_TURN } from "../GameBoard";

describe("GameBoard", () => {
  const defaultProps = {
    mode: GAME_BOARD_MODE.player1,
    elapsedTime: 5,
    scores: { player1: 4, player2: 5 },
    playerTurn: PLAYER_TURN.player1,
  };
  it("displays correct info for 1-player mode", async () => {
    renderWithProviders(<GameInfo {...defaultProps} />);
    const { getByText, queryByText } = screen;

    expect(getByText("Time: 5 sec")).toBeOnTheScreen();

    expect(queryByText("Player 1: 4")).not.toBeOnTheScreen();
    expect(queryByText("Player 2: 5")).not.toBeOnTheScreen();
  });

  it("displays correct info for 2-player mode", async () => {
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
