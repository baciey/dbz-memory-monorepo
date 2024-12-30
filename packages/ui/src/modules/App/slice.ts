import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "./slice.types";
import { LANGUAGE } from "../../constants/lang";
import { THEME_MODE } from "../../constants/theme";

const initialAppState: AppState = {
  themeMode: THEME_MODE.light,
  language: LANGUAGE.pl,
  authModal: {
    isVisible: false,
    type: undefined,
  },
};

export const APP_REDUCER_NAME = "app";

const appSlice = createSlice({
  name: APP_REDUCER_NAME,
  initialState: initialAppState,
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
  },
});

export const appReducer = appSlice.reducer;
export const appSliceActions = appSlice.actions;
