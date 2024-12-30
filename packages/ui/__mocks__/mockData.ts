import { ACTION_STATUS } from "../src/modules/App/slice.types";
import { GameState } from "../src/modules/Game/slice.types";

export const MOCK_GAME_STATE: GameState = {
  imagesPercentageLoaded: 0,
  playersNames: ["mock name 1", "mock name 2"],
  playerName: "mock single player name",
  twoPlayerGames: [
    {
      id: 1,
      player1Name: "Player 1 1",
      player2Name: "Player 2 1",
      player1Score: 10,
      player2Score: 20,
      createdAt: "2021-10-10",
    },
    {
      id: 2,
      player1Name: "Player 1 2",
      player2Name: "Player 2 2",
      player1Score: 30,
      player2Score: 40,
      createdAt: "2021-10-11",
    },
  ],
  onePlayerGames: [
    {
      id: 1,
      name: "Game 1",
      time: 100,
      createdAt: "2021-10-10",
    },
    {
      id: 2,
      name: "Game 2",
      time: 200,
      createdAt: "2021-10-11",
    },
  ],
  onePlayerGamesStatus: ACTION_STATUS.SUCCESS,
  twoPlayerGamesStatus: ACTION_STATUS.SUCCESS,
  showPersonalGames: false,
};
