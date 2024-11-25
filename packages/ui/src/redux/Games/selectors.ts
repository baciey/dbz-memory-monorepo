import { RootState } from "./../store";

const getSinglePlayerGames = (state: RootState) =>
  state.games.singlePlayerGames;
const getSinglePlayerGamesStatus = (state: RootState) =>
  state.games.singlePlayerGamesStatus;
const getMultiPlayerGames = (state: RootState) => state.games.multiPlayerGames;
const getMultiPlayerGamesStatus = (state: RootState) =>
  state.games.multiPlayerGamesStatus;

export const gamesSelectors = {
  getSinglePlayerGames,
  getSinglePlayerGamesStatus,
  getMultiPlayerGames,
  getMultiPlayerGamesStatus,
};
