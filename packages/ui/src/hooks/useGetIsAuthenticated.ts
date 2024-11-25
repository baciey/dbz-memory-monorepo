import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Session } from "@supabase/supabase-js";
import { appActions } from "../redux/actions";
import { useAppDispatch } from "../redux/store";

export const useGetIsAuthenticated = () => {
  const dispatch = useAppDispatch();

  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthenticated(Boolean(session));
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsAuthenticated(Boolean(session));
    });
  }, []);

  useEffect(() => {
    if (session) {
      dispatch(appActions.getMe(session));
    }
  }, [session, dispatch]);

  // console.log({ session });

  return isAuthenticated;
};
