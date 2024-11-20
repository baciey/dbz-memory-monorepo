import { RootState } from "../../redux/store";

const getImagesPercentageLoaded = (state: RootState) =>
  state.board.imagesPercentageLoaded;

export const boardSelectors = {
  getImagesPercentageLoaded,
};
