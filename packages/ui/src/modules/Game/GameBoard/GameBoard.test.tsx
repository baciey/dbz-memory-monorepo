import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { GameBoard } from "./GameBoard";
import { GAME_BOARD_MODE } from "./GameBoard.types";
import { renderWithProviders } from "../../../utils/testUtils";

describe("GameBoard", () => {
  const props = {
    mode: GAME_BOARD_MODE.player1,
    handleSetGameMode: jest.fn(),
    setAlert: jest.fn(),
    setAlertOnPress: jest.fn(),
    setIsAlertWithCancel: jest.fn(),
  };

  it("presses two cards in 1-player mode", async () => {
    renderWithProviders(<GameBoard {...props} />);
    const { queryByTestId, getByTestId, findByTestId } = screen;

    await waitFor(async () => {
      // first click
      const card0 = await findByTestId("cardContainer-0");
      expect(getByTestId("cardBack-0")).toBeOnTheScreen();
      fireEvent.press(card0);

      await waitFor(() => {
        expect(queryByTestId("cardBack-0")).not.toBeOnTheScreen();
      });

      // second click
      const card1 = getByTestId("cardContainer-1");
      expect(getByTestId("cardBack-1")).toBeOnTheScreen();
      fireEvent.press(card1);

      await waitFor(() => {
        expect(queryByTestId("cardBack-1")).not.toBeOnTheScreen();
      });
    });
  }, 10000);

  it("presses two pairs of cards in 2-player mode", async () => {
    const customProps = {
      ...props,
      mode: GAME_BOARD_MODE.player2,
    };
    renderWithProviders(<GameBoard {...customProps} />);
    const { queryByTestId, getByTestId, findByTestId } = screen;

    // first pair of cards
    await waitFor(async () => {
      // first click
      const card0 = await findByTestId("cardContainer-0");
      expect(getByTestId("cardBack-0")).toBeOnTheScreen();
      fireEvent.press(card0);

      await waitFor(() => {
        expect(queryByTestId("cardBack-0")).not.toBeOnTheScreen();
      });

      // second click
      const card1 = getByTestId("cardContainer-1");
      expect(getByTestId("cardBack-1")).toBeOnTheScreen();
      fireEvent.press(card1);

      await waitFor(() => {
        expect(queryByTestId("cardBack-1")).not.toBeOnTheScreen();
      });
    });

    // second pair of cards
    await waitFor(
      async () => {
        // first click
        const card2 = getByTestId("cardContainer-2");
        expect(getByTestId("cardBack-2")).toBeOnTheScreen();
        fireEvent.press(card2);

        await waitFor(() => {
          expect(queryByTestId("cardBack-2")).not.toBeOnTheScreen();
        });

        // second click
        const card3 = getByTestId("cardContainer-3");
        expect(getByTestId("cardBack-3")).toBeOnTheScreen();
        fireEvent.press(card3);

        await waitFor(() => {
          expect(queryByTestId("cardBack-3")).not.toBeOnTheScreen();
        });
      },
      {
        timeout: 3000,
      },
    );
  }, 10000);
});
