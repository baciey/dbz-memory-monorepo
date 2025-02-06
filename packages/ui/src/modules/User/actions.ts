import { userSliceActions } from "./slice";
import { MeUpdate } from "./slice.types";
import { Session } from "@supabase/supabase-js";
import * as ImagePicker from "expo-image-picker";
import { Dispatch, SetStateAction } from "react";
import { PayloadThunkAction } from "../../redux/store";
import { DATABASE_TABLE } from "../../constants/database";
import { supabase } from "../../utils/supabase";
import { Me } from "../../models/user";
import { AUTH_MODAL_TYPES } from "../App/slice.types";
import { appSliceActions } from "../App/slice";

const getMe = (session: Session): PayloadThunkAction => {
  return async (dispatch) => {
    dispatch(userSliceActions.meLoading());
    supabase
      .from(DATABASE_TABLE.profiles)
      .select(`username, avatar_url, password`)
      .eq("id", session.user.id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          dispatch(
            appSliceActions.setAuthModal({
              isVisible: true,
              type: AUTH_MODAL_TYPES.LOGIN,
            }),
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

          dispatch(userSliceActions.meSuccess(me));
          dispatch(userSliceActions.meUpdateSuccess());
        } else {
          dispatch(userSliceActions.meError());
        }
      });
  };
};

const updateMe = (me: MeUpdate, session: Session): PayloadThunkAction => {
  return async (dispatch) => {
    dispatch(userSliceActions.meUpdateLoading());
    supabase
      .from(DATABASE_TABLE.profiles)
      .upsert(me)
      .then(({ error }) => {
        if (error) {
          dispatch(userSliceActions.meUpdateError());
        } else {
          dispatch(getMe(session));
        }
      });
  };
};

const logoutMe = (): PayloadThunkAction => {
  return async (dispatch) => {
    dispatch(userSliceActions.meLoading());
    const { error } = await supabase.auth.signOut();
    if (!error) {
      dispatch(userSliceActions.meIdle());
    }
  };
};

const uploadAvatar = (
  me: Me,
  isWeb: boolean,
  setIsAvatarLoaded: Dispatch<SetStateAction<boolean>>,
): PayloadThunkAction => {
  return async (dispatch) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      allowsEditing: true,
      quality: 1,
      exif: false,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      setIsAvatarLoaded(true);
      return;
    }

    dispatch(userSliceActions.meUpdateLoading());

    const image = result.assets[0];
    const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer());
    const fileExt = isWeb
      ? (image.uri.split(";")[0].split("/")[1] ?? "jpeg")
      : (image.uri.split(".").pop()?.toLowerCase() ?? "jpeg");
    const fileName = `${Date.now()}.${fileExt}`;

    supabase.storage
      .from("avatars")
      .upload(fileName, arraybuffer, {
        contentType: image.mimeType ?? "image/jpeg",
      })
      .then(({ data, error }) => {
        if (error) {
          dispatch(userSliceActions.meUpdateError());
          setIsAvatarLoaded(true);
        } else {
          const newMe = {
            id: me.id,
            avatar_url: data.fullPath,
          };
          dispatch(userActions.updateMe(newMe, me?.session));
        }
      });
  };
};

export const userActions = {
  getMe,
  updateMe,
  logoutMe,
  uploadAvatar,
};
