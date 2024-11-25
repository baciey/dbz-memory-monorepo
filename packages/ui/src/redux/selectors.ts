import { RootState } from "./store";

const getThemeMode = (state: RootState) => state.app.themeMode;
const getLanguage = (state: RootState) => state.app.language;
const getMe = (state: RootState) => state.app.me;
const getMeStatus = (state: RootState) => state.app.meStatus;
const getMeUpdateStatus = (state: RootState) => state.app.meUpdateStatus;
const getAuthModal = (state: RootState) => state.app.authModal;

export const appSelectors = {
  getThemeMode,
  getLanguage,
  getMe,
  getMeStatus,
  getMeUpdateStatus,
  getAuthModal,
};
