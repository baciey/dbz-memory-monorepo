import { RootState } from "../../redux/store";

const getMe = (state: RootState) => state.user.me;
const getMeStatus = (state: RootState) => state.user.meStatus;
const getMeUpdateStatus = (state: RootState) => state.user.meUpdateStatus;

export const userSelectors = {
  getMe,
  getMeStatus,
  getMeUpdateStatus,
};
