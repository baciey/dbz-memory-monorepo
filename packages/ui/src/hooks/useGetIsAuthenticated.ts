import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Session } from "@supabase/supabase-js";
import { appActions } from "../redux/actions";
import { useAppDispatch } from "../redux/store";
import { appSliceActions } from "../redux/slice";
import { AUTH_MODAL_TYPES } from "../redux/slice.types";

export const useGetIsAuthenticated = () => {
  const dispatch = useAppDispatch();

  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthenticated(Boolean(session));
    });

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setIsAuthenticated(Boolean(session));

      if (event === "INITIAL_SESSION") {
        console.log("INITIAL_SESSION");
        // handle initial session
      } else if (event === "SIGNED_IN") {
        console.log("SIGNED_IN");
        dispatch(
          appSliceActions.setAuthModal({
            isVisible: false,
            type: undefined,
          }),
        );
        // handle sign in event
      } else if (event === "SIGNED_OUT") {
        console.log("SIGNED_OUT");
        dispatch(appSliceActions.meIdle());
        dispatch(
          appSliceActions.setAuthModal({
            isVisible: true,
            type: AUTH_MODAL_TYPES.LOGIN,
          }),
        );
      } else if (event === "PASSWORD_RECOVERY") {
        console.log("PASSWORD_RECOVERY");
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        console.log("TOKEN_REFRESHED");
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        console.log("USER_UPDATED");
        // handle user updated event
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (session) {
      dispatch(appActions.getMe(session));
    }
  }, [session, dispatch]);

  // console.log({ session });

  return isAuthenticated;
};
