import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Session } from "@supabase/supabase-js";
import { useAppDispatch } from "../redux/store";
import { appActions } from "../redux/actions";

supabase.auth.startAutoRefresh();

export const useGetUser = () => {
  const [session, setSession] = useState<Session | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) {
      dispatch(appActions.getMe(session));
    }
  }, [session, dispatch]);

  // console.log({ session });

  return null;
};
