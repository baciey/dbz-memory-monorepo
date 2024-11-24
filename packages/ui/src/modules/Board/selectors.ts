import { RootState } from "../../redux/store";

const getImagesPercentageLoaded = (state: RootState) =>
  state.board.imagesPercentageLoaded;

const getPlayersNames = (state: RootState) => state.board.playersNames;
const getPlayerName = (state: RootState) => state.board.playerName;

export const boardSelectors = {
  getImagesPercentageLoaded,
  getPlayersNames,
  getPlayerName,
};
