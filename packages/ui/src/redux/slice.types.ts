import { LANGUAGES } from "../constants/lang";
import { THEME_MODES } from "../constants/theme";
import { Me } from "../models/user";

export enum ACTION_STATUS {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

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
export interface AppState {
  themeMode: THEME_MODES;
  language: LANGUAGES;
  authModal: AuthModalType;
  me: Me | null;
  meStatus: ACTION_STATUS;
  meUpdateStatus: ACTION_STATUS;
}

export type MeUpdate = {
  id: string;
  username: string;
};
