import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BoardState } from "./slice.types";

const initialState: BoardState = {
  imagesPercentageLoaded: 0,
};

export const BOARD_REDUCER_NAME = "board";

const boardSlice = createSlice({
  name: BOARD_REDUCER_NAME,
  initialState,
  reducers: {
    setImagesPercentageLoaded: (
      state,
      action: PayloadAction<BoardState["imagesPercentageLoaded"]>,
    ) => {
      state.imagesPercentageLoaded = action.payload;
    },
  },
});

export const boardReducer = boardSlice.reducer;
export const boardSliceActions = boardSlice.actions;
