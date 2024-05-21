import { LANGUAGES } from "../constants/lang";
import { THEME_MODES } from "../constants/theme";

export interface AppState {
  themeMode: THEME_MODES;
  language: LANGUAGES;
}
