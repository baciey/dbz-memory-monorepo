import { Session } from "@supabase/supabase-js";

export type Me = {
  username: string;
  avatarUrl: string;
  id: string;
  email?: string;
  isAnonymous: boolean;
  session: Session;
};
