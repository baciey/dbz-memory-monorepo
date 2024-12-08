import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ACTION_STATUS, AppState } from "./slice.types";
import { THEME_MODE } from "../constants/theme";
import { LANGUAGE } from "../constants/lang";

const initialState: AppState = {
  themeMode: THEME_MODE.light,
  language: LANGUAGE.pl,
  authModal: {
    isVisible: false,
    type: undefined,
  },
  me: null,
  meStatus: ACTION_STATUS.IDLE,
  meUpdateStatus: ACTION_STATUS.IDLE,
};

export const APP_REDUCER_NAME = "app";

const appSlice = createSlice({
  name: APP_REDUCER_NAME,
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<AppState["themeMode"]>) => {
      state.themeMode = action.payload;
    },
    setLanguage: (state, action: PayloadAction<AppState["language"]>) => {
      state.language = action.payload;
    },
    setAuthModal: (state, action: PayloadAction<AppState["authModal"]>) => {
      state.authModal = action.payload;
    },
    meLoading: (state) => {
      state.meStatus = ACTION_STATUS.LOADING;
    },
    meSuccess: (state, action: PayloadAction<AppState["me"]>) => {
      state.meStatus = ACTION_STATUS.SUCCESS;
      state.me = action.payload;
    },
    meError: (state) => {
      state.meStatus = ACTION_STATUS.ERROR;
    },
    meIdle: (state) => {
      state.meStatus = ACTION_STATUS.IDLE;
      state.me = null;
    },
    meUpdateLoading: (state) => {
      state.meUpdateStatus = ACTION_STATUS.LOADING;
    },
    meUpdateSuccess: (state) => {
      state.meUpdateStatus = ACTION_STATUS.SUCCESS;
    },
    meUpdateError: (state) => {
      state.meUpdateStatus = ACTION_STATUS.ERROR;
    },
    meUpdateIdle: (state) => {
      state.meUpdateStatus = ACTION_STATUS.IDLE;
    },
  },
});

export const appReducer = appSlice.reducer;
export const appSliceActions = appSlice.actions;
