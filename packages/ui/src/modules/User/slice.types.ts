import { Me } from "../../models/user";
import { ACTION_STATUS } from "../App/slice.types";

export type MeUpdate = {
  id: string;
  username?: string;
  avatarUrl?: string;
};

export interface UserState {
  me: Me | null;
  meStatus: ACTION_STATUS;
  meUpdateStatus: ACTION_STATUS;
}
