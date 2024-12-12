import { LANGUAGE } from "../../constants/lang";
import { THEME_MODE } from "../../constants/theme";

export enum AUTH_MODAL_TYPES {
  LOGIN = "login",
  REGISTER = "register",
  SET_PASSWORD = "set_password",
  FORGOT_PASSWORD = "forgot_password",
}

export type AuthModalType = {
  isVisible: boolean;
  type?: AUTH_MODAL_TYPES;
};

export enum ACTION_STATUS {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface AppState {
  themeMode: THEME_MODE;
  language: LANGUAGE;
  authModal: AuthModalType;
}
