import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameState } from "./slice.types";
import { ACTION_STATUS } from "../App/slice.types";

const initialState: GameState = {
  imagesPercentageLoaded: 0,
  playersNames: [],
  playerName: "",
  onePlayerGames: [],
  twoPlayerGames: [],
  onePlayerGamesStatus: ACTION_STATUS.IDLE,
  twoPlayerGamesStatus: ACTION_STATUS.IDLE,
};

export const GAME_REDUCER_NAME = "game";

const gameSlice = createSlice({
  name: GAME_REDUCER_NAME,
  initialState,
  reducers: {
    setImagesPercentageLoaded: (
      state,
      action: PayloadAction<GameState["imagesPercentageLoaded"]>,
    ) => {
      state.imagesPercentageLoaded = action.payload;
    },
    setPlayersNames: (
      state,
      action: PayloadAction<GameState["playersNames"]>,
    ) => {
      state.playersNames = action.payload;
    },
    setPlayerName: (state, action: PayloadAction<GameState["playerName"]>) => {
      state.playerName = action.payload;
    },
    onePlayerGamesLoading(state) {
      state.onePlayerGamesStatus = ACTION_STATUS.LOADING;
    },
    onePlayerGamesSuccess(
      state,
      action: PayloadAction<GameState["onePlayerGames"]>,
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
      action: PayloadAction<GameState["twoPlayerGames"]>,
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

export const gameReducer = gameSlice.reducer;
export const gameSliceActions = gameSlice.actions;
