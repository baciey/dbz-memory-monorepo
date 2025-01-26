import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameState } from "./slice.types";
import { ACTION_STATUS } from "../App/slice.types";

const initialGameState: GameState = {
  playersNames: [],
  playerName: "",
  onePlayerGames: [],
  twoPlayerGames: [],
  onePlayerGamesStatus: ACTION_STATUS.IDLE,
  twoPlayerGamesStatus: ACTION_STATUS.IDLE,
  showPersonalGames: false,
  multiPlayerGames: [],
  multiPlayerGamesStatus: ACTION_STATUS.IDLE,
};

export const GAME_REDUCER_NAME = "game";

const gameSlice = createSlice({
  name: GAME_REDUCER_NAME,
  initialState: initialGameState,
  reducers: {
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
    setShowPersonalGames: (
      state,
      action: PayloadAction<GameState["showPersonalGames"]>,
    ) => {
      state.showPersonalGames = action.payload;
    },
    multiPlayerGamesLoading(state) {
      state.multiPlayerGamesStatus = ACTION_STATUS.LOADING;
    },
    multiPlayerGamesSuccess(
      state,
      action: PayloadAction<GameState["multiPlayerGames"]>,
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

export const gameReducer = gameSlice.reducer;
export const gameSliceActions = gameSlice.actions;
