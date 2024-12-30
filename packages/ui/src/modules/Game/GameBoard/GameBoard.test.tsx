import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { GameBoard } from "./GameBoard";
import { GAME_BOARD_MODE } from "./GameBoard.types";
import { renderWithProviders } from "../../../utils/testUtils";

describe("GameBoard", () => {
  it("presses two cards in 1-player mode", async () => {
    const props = {
      mode: GAME_BOARD_MODE.player1,
      handleSetGameMode: jest.fn(),
    };
    renderWithProviders(<GameBoard {...props} />);
    const { findByTestId, queryByTestId } = screen;

    const card0 = await findByTestId("cardContainer-0");
    const card1 = await findByTestId("cardContainer-1");

    // first click
    expect(await findByTestId("cardBack-0")).toBeOnTheScreen();
    fireEvent.press(card0);
    expect(queryByTestId("cardBack-0")).not.toBeOnTheScreen();

    // second click
    expect(await findByTestId("cardBack-1")).toBeOnTheScreen();
    fireEvent.press(card1);
    expect(queryByTestId("cardBack-1")).not.toBeOnTheScreen();
  });

  it("presses four cards in 2-player mode", async () => {
    const props = {
      mode: GAME_BOARD_MODE.player2,
      handleSetGameMode: jest.fn(),
    };
    renderWithProviders(<GameBoard {...props} />);
    const { findByTestId, queryByTestId } = screen;

    const card0 = await findByTestId("cardContainer-0");
    const card1 = await findByTestId("cardContainer-1");
    const card2 = await findByTestId("cardContainer-2");
    const card3 = await findByTestId("cardContainer-3");

    // first player
    // first click
    expect(await findByTestId("cardBack-0")).toBeOnTheScreen();
    fireEvent.press(card0);
    expect(queryByTestId("cardBack-0")).not.toBeOnTheScreen();

    // second click
    expect(await findByTestId("cardBack-1")).toBeOnTheScreen();
    fireEvent.press(card1);
    expect(queryByTestId("cardBack-1")).not.toBeOnTheScreen();

    await waitFor(
      async () => {
        // second player
        // first click
        expect(await findByTestId("cardBack-2")).toBeOnTheScreen();
        fireEvent.press(card2);
        expect(queryByTestId("cardBack-2")).not.toBeOnTheScreen();

        // second click
        expect(await findByTestId("cardBack-3")).toBeOnTheScreen();
        fireEvent.press(card3);
        expect(queryByTestId("cardBack-3")).not.toBeOnTheScreen();
      },
      { timeout: 3000 },
    );
  });
});
