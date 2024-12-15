import { RootState } from "../../redux/store";

const getImagesPercentageLoaded = (state: RootState) =>
  state.game.imagesPercentageLoaded;

const getPlayersNames = (state: RootState) => state.game.playersNames;
const getPlayerName = (state: RootState) => state.game.playerName;
const getOnePlayerGames = (state: RootState) => state.game.onePlayerGames;
const getOnePlayerGamesStatus = (state: RootState) =>
  state.game.onePlayerGamesStatus;
const getTwoPlayerGames = (state: RootState) => state.game.twoPlayerGames;
const getTwoPlayerGamesStatus = (state: RootState) =>
  state.game.twoPlayerGamesStatus;
const getShowPersonalGames = (state: RootState) => state.game.showPersonalGames;

export const gameSelectors = {
  getImagesPercentageLoaded,
  getPlayersNames,
  getPlayerName,
  getOnePlayerGames,
  getOnePlayerGamesStatus,
  getTwoPlayerGames,
  getTwoPlayerGamesStatus,
  getShowPersonalGames,
};
