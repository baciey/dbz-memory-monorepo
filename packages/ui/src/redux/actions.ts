import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import { STORAGE_KEYS } from "../constants/storage";
import { appSliceActions } from "./slice";
import { AppState, AUTH_MODAL_TYPES, MeUpdate } from "./slice.types";
import { supabase } from "../utils/supabase";
import { Session } from "@supabase/supabase-js";
import { PayloadThunkAction } from "./store";
import { Me } from "../models/user";
import { DATABASE_TABLE } from "../constants/database";

const changeThemeMode = (themeMode: AppState["themeMode"]) => {
  AsyncStorage.setItem(STORAGE_KEYS.themeMode, themeMode).catch(() => {
    console.error("Failed to save theme mode to storage");
  });
  return appSliceActions.setThemeMode(themeMode);
};

const changeLanguage = (language: AppState["language"]) => {
  AsyncStorage.setItem(STORAGE_KEYS.language, language)
    .then(() => {
      i18next.changeLanguage(language);
    })
    .catch(() => {
      console.error("Failed to save language to i18next");
    });

  return appSliceActions.setLanguage(language);
};

const getMe = (session: Session): PayloadThunkAction => {
  return async (dispatch) => {
    dispatch(appSliceActions.meLoading());

    supabase
      .from(DATABASE_TABLE.profiles)
      .select(`username, avatar_url, password`)
      .eq("id", session.user.id)
      .single()
      .then(({ data, error, status }) => {
        // console.log(error, status);
        if (error) {
          dispatch(
            appSliceActions.setAuthModal({
              isVisible: true,
              type: AUTH_MODAL_TYPES.LOGIN,
            })
          );
        }
        if (data) {
          const me: Me = {
            avatarUrl: data.avatar_url,
            username: data.username,
            email: session.user.email || "",
            id: session.user.id,
            password: data.password,
            session,
            isAnonymous: Boolean(session.user.is_anonymous),
          };

          dispatch(appSliceActions.meSuccess(me));
        } else {
          dispatch(appSliceActions.meError());
        }
      });
  };
};

const updateMe = (me: MeUpdate, session: Session): PayloadThunkAction => {
  return async (dispatch) => {
    dispatch(appSliceActions.meUpdateLoading());

    supabase
      .from(DATABASE_TABLE.profiles)
      .upsert(me)
      .then(({ error }) => {
        if (error) {
          console.log({ error });
          dispatch(appSliceActions.meUpdateError());
        } else {
          dispatch(appSliceActions.meUpdateSuccess());
          dispatch(getMe(session));
        }
      });
  };
};

const logoutMe = (): PayloadThunkAction => {
  return async (dispatch) => {
    dispatch(appSliceActions.meLoading());
    const { error } = await supabase.auth.signOut();
    console.log({ error });
    dispatch(appSliceActions.meIdle());
  };
};

export const appActions = {
  changeThemeMode,
  changeLanguage,
  getMe,
  updateMe,
  logoutMe,
};
