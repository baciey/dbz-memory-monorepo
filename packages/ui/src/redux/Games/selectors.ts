import { RootState } from "./../store";

const getOnePlayerGames = (state: RootState) => state.games.onePlayerGames;
const getOnePlayerGamesStatus = (state: RootState) =>
  state.games.onePlayerGamesStatus;
const getTwoPlayerGames = (state: RootState) => state.games.twoPlayerGames;
const getTwoPlayerGamesStatus = (state: RootState) =>
  state.games.twoPlayerGamesStatus;

export const gamesSelectors = {
  getOnePlayerGames,
  getOnePlayerGamesStatus,
  getTwoPlayerGames,
  getTwoPlayerGamesStatus,
};
