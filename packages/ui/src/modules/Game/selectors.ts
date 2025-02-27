import { RootState } from "../../redux/store";

const getPlayersNames = (state: RootState) => state.game.playersNames;
const getPlayerName = (state: RootState) => state.game.playerName;
const getOnePlayerGames = (state: RootState) => state.game.onePlayerGames;
const getOnePlayerGamesStatus = (state: RootState) =>
  state.game.onePlayerGamesStatus;
const getTwoPlayerGames = (state: RootState) => state.game.twoPlayerGames;
const getTwoPlayerGamesStatus = (state: RootState) =>
  state.game.twoPlayerGamesStatus;
const getShowPersonalGames = (state: RootState) => state.game.showPersonalGames;
const getMultiPlayerGames = (state: RootState) => state.game.multiPlayerGames;
const getMultiPlayerGamesStatus = (state: RootState) =>
  state.game.multiPlayerGamesStatus;
const getCardsVanishTime = (state: RootState) => state.game.cardsVanishTime;

export const gameSelectors = {
  getPlayersNames,
  getPlayerName,
  getOnePlayerGames,
  getOnePlayerGamesStatus,
  getTwoPlayerGames,
  getTwoPlayerGamesStatus,
  getShowPersonalGames,
  getMultiPlayerGames,
  getMultiPlayerGamesStatus,
  getCardsVanishTime,
};
