import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import { AppState } from "./slice.types";
import { THEME_MODE } from "../../constants/theme";
import { STORAGE_KEYS } from "../../constants/storage";
import { appSliceActions } from "./slice";
import { PayloadThunkAction } from "../../redux/store";

const changeThemeMode = (themeMode: THEME_MODE): PayloadThunkAction => {
  return async (dispatch) => {
    AsyncStorage.setItem(STORAGE_KEYS.themeMode, themeMode).catch(() => {
      console.error("Failed to save theme mode to storage");
    });
    dispatch(appSliceActions.setThemeMode(themeMode));
  };
};

const changeLanguage = (language: AppState["language"]): PayloadThunkAction => {
  return async (dispatch) => {
    AsyncStorage.setItem(STORAGE_KEYS.language, language)
      .then(() => {
        i18next.changeLanguage(language);
      })
      .catch(() => {
        console.error("Failed to save language to i18next");
      });
    dispatch(appSliceActions.setLanguage(language));
  };
};

export const appActions = {
  changeThemeMode,
  changeLanguage,
};
