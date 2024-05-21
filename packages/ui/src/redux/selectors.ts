import { RootState } from "./store";

const getThemeMode = (state: RootState) => state.app.themeMode;
const getLanguage = (state: RootState) => state.app.language;

export const appSelectors = {
  getThemeMode,
  getLanguage,
};
