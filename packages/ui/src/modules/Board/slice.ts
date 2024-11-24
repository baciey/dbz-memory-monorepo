import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BoardState } from "./slice.types";

const initialState: BoardState = {
  imagesPercentageLoaded: 0,
  playersNames: [],
  playerName: "",
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
    setPlayersNames: (
      state,
      action: PayloadAction<BoardState["playersNames"]>,
    ) => {
      state.playersNames = action.payload;
    },
    setPlayerName: (state, action: PayloadAction<BoardState["playerName"]>) => {
      state.playerName = action.payload;
    },
  },
});

export const boardReducer = boardSlice.reducer;
export const boardSliceActions = boardSlice.actions;
