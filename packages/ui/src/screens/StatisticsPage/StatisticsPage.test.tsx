import React from "react";
import { renderWithProviders } from "../../utils/testUtils";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { StatisticsPage } from "./StatisticsPage";
import { MOCK_GAME_STATE } from "../../../__mocks__/mockData";

jest.useFakeTimers();

it("displays 1 player table correctly", () => {
  renderWithProviders(<StatisticsPage />, {
    preloadedState: {
      game: MOCK_GAME_STATE,
    },
  });
  const { getByText } = screen;

  const games = MOCK_GAME_STATE.onePlayerGames;

  expect(getByText(games[0].name)).toBeOnTheScreen();
  expect(getByText(String(games[0].time))).toBeOnTheScreen();
  expect(getByText(games[0].createdAt)).toBeOnTheScreen();

  expect(getByText(games[1].name)).toBeOnTheScreen();
  expect(getByText(String(games[1].time))).toBeOnTheScreen();
  expect(getByText(games[1].createdAt)).toBeOnTheScreen();
});

it("displays 2 players table correctly", async () => {
  renderWithProviders(<StatisticsPage />, {
    preloadedState: {
      game: MOCK_GAME_STATE,
    },
  });
  const { getByText } = screen;

  fireEvent.press(getByText("2 players"));

  const games = MOCK_GAME_STATE.twoPlayerGames;

  expect(getByText(games[0].player1Name)).toBeOnTheScreen();
  expect(getByText(games[0].player2Name)).toBeOnTheScreen();
  expect(getByText(String(games[0].player1Score))).toBeOnTheScreen();
  expect(getByText(String(games[0].player2Score))).toBeOnTheScreen();
  expect(getByText(games[0].createdAt)).toBeOnTheScreen();

  expect(getByText(games[1].player1Name)).toBeOnTheScreen();
  expect(getByText(games[1].player2Name)).toBeOnTheScreen();
  expect(getByText(String(games[1].player1Score))).toBeOnTheScreen();
  expect(getByText(String(games[1].player2Score))).toBeOnTheScreen();
  expect(getByText(games[1].createdAt)).toBeOnTheScreen();
});

it("changes search bar text correctly", async () => {
  renderWithProviders(<StatisticsPage />, {
    preloadedState: {
      game: MOCK_GAME_STATE,
    },
  });
  const { getByText, getByTestId } = screen;

  const searchBar = getByTestId("search-bar");
  fireEvent.press(getByText("1 player"));
  fireEvent.changeText(searchBar, "test");
  expect(searchBar).toHaveProp("value", "test");
  const searchBarIcon = getByTestId("search-bar-clear-icon");
  fireEvent.press(searchBarIcon);
  expect(searchBar).toHaveProp("value", "");
});
