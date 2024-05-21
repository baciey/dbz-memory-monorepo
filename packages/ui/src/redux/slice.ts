import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "./slice.types";
import { THEME_MODES } from "../constants/theme";
import { LANGUAGES } from "../constants/lang";

const initialState: AppState = {
  themeMode: THEME_MODES.light,
  language: LANGUAGES.pl,
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
  },
});

export const appReducer = appSlice.reducer;
export const appSliceActions = appSlice.actions;
