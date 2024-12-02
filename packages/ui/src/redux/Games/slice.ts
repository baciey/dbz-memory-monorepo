import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GamesState } from "./slice.types";
import { ACTION_STATUS } from "../slice.types";

const initialState: GamesState = {
  onePlayerGames: [],
  twoPlayerGames: [],
  onePlayerGamesStatus: ACTION_STATUS.IDLE,
  twoPlayerGamesStatus: ACTION_STATUS.IDLE,
};

export const GAMES_REDUCER_NAME = "games";

const gamesSlice = createSlice({
  name: GAMES_REDUCER_NAME,
  initialState,
  reducers: {
    onePlayerGamesLoading(state) {
      state.onePlayerGamesStatus = ACTION_STATUS.LOADING;
    },
    onePlayerGamesSuccess(
      state,
      action: PayloadAction<GamesState["onePlayerGames"]>,
    ) {
      state.onePlayerGames = action.payload;
      state.onePlayerGamesStatus = ACTION_STATUS.SUCCESS;
    },
    onePlayerGamesError(state) {
      state.onePlayerGamesStatus = ACTION_STATUS.ERROR;
    },
    onePlayerGamesIdle(state) {
      state.onePlayerGamesStatus = ACTION_STATUS.IDLE;
    },
    twoPlayerGamesLoading(state) {
      state.twoPlayerGamesStatus = ACTION_STATUS.LOADING;
    },
    twoPlayerGamesSuccess(
      state,
      action: PayloadAction<GamesState["twoPlayerGames"]>,
    ) {
      state.twoPlayerGames = action.payload;
      state.twoPlayerGamesStatus = ACTION_STATUS.SUCCESS;
    },
    twoPlayerGamesError(state) {
      state.twoPlayerGamesStatus = ACTION_STATUS.ERROR;
    },
    twoPlayerGamesIdle(state) {
      state.twoPlayerGamesStatus = ACTION_STATUS.IDLE;
    },
  },
});

export const gamesReducer = gamesSlice.reducer;
export const gamesSliceActions = gamesSlice.actions;
