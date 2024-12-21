import { useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { userSelectors } from "../modules/User/selectors";
import { userActions } from "../modules/User/actions";
import { appSliceActions } from "../modules/App/slice";
import { AUTH_MODAL_TYPES } from "../modules/App/slice.types";
import { userSliceActions } from "../modules/User/slice";

export const useHandleAuthState = () => {
  const dispatch = useAppDispatch();

  const me = useAppSelector(userSelectors.getMe);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && !me) dispatch(userActions.getMe(session));
    });

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        if (!session) {
          dispatch(
            appSliceActions.setAuthModal({
              isVisible: true,
              type: AUTH_MODAL_TYPES.LOGIN,
            }),
          );
        }
      } else if (event === "SIGNED_IN") {
        dispatch(
          appSliceActions.setAuthModal({
            isVisible: false,
            type: undefined,
          }),
        );
        if (!me && session) dispatch(userActions.getMe(session));
      } else if (event === "SIGNED_OUT") {
        dispatch(userSliceActions.meIdle());
        dispatch(
          appSliceActions.setAuthModal({
            isVisible: true,
            type: AUTH_MODAL_TYPES.LOGIN,
          }),
        );
      } else if (event === "PASSWORD_RECOVERY") {
        console.log("PASSWORD_RECOVERY");
      } else if (event === "TOKEN_REFRESHED") {
        console.log("TOKEN_REFRESHED");
      } else if (event === "USER_UPDATED") {
        if (session) dispatch(userActions.getMe(session));
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [dispatch, me]);

  return null;
};
