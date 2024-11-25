import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GamesState } from "./slice.types";
import { ACTION_STATUS } from "../slice.types";

const initialState: GamesState = {
  singlePlayerGames: [],
  multiPlayerGames: [],
  singlePlayerGamesStatus: ACTION_STATUS.IDLE,
  multiPlayerGamesStatus: ACTION_STATUS.IDLE,
};

export const GAMES_REDUCER_NAME = "games";

const gamesSlice = createSlice({
  name: GAMES_REDUCER_NAME,
  initialState,
  reducers: {
    singlePlayerGamesLoading(state) {
      state.singlePlayerGamesStatus = ACTION_STATUS.LOADING;
    },
    singlePlayerGamesSuccess(
      state,
      action: PayloadAction<GamesState["singlePlayerGames"]>,
    ) {
      state.singlePlayerGames = action.payload;
      state.singlePlayerGamesStatus = ACTION_STATUS.SUCCESS;
    },
    singlePlayerGamesError(state) {
      state.singlePlayerGamesStatus = ACTION_STATUS.ERROR;
    },
    singlePlayerGamesIdle(state) {
      state.singlePlayerGamesStatus = ACTION_STATUS.IDLE;
    },
    multiPlayerGamesLoading(state) {
      state.multiPlayerGamesStatus = ACTION_STATUS.LOADING;
    },
    multiPlayerGamesSuccess(
      state,
      action: PayloadAction<GamesState["multiPlayerGames"]>,
    ) {
      state.multiPlayerGames = action.payload;
      state.multiPlayerGamesStatus = ACTION_STATUS.SUCCESS;
    },
    multiPlayerGamesError(state) {
      state.multiPlayerGamesStatus = ACTION_STATUS.ERROR;
    },
    multiPlayerGamesIdle(state) {
      state.multiPlayerGamesStatus = ACTION_STATUS.IDLE;
    },
  },
});

export const gamesReducer = gamesSlice.reducer;
export const gamesSliceActions = gamesSlice.actions;
