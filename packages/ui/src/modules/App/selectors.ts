import { RootState } from "../../redux/store";

const getThemeMode = (state: RootState) => state.app.themeMode;
const getLanguage = (state: RootState) => state.app.language;
const getAuthModal = (state: RootState) => state.app.authModal;

export const appSelectors = {
  getThemeMode,
  getLanguage,
  getAuthModal,
};
