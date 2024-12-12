import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "./slice.types";
import { ACTION_STATUS } from "../App/slice.types";

const initialState: UserState = {
  me: null,
  meStatus: ACTION_STATUS.IDLE,
  meUpdateStatus: ACTION_STATUS.IDLE,
};

export const USER_REDUCER_NAME = "user";

const userSlice = createSlice({
  name: USER_REDUCER_NAME,
  initialState,
  reducers: {
    meLoading: (state) => {
      state.meStatus = ACTION_STATUS.LOADING;
    },
    meSuccess: (state, action: PayloadAction<UserState["me"]>) => {
      state.meStatus = ACTION_STATUS.SUCCESS;
      state.me = action.payload;
    },
    meError: (state) => {
      state.meStatus = ACTION_STATUS.ERROR;
    },
    meIdle: (state) => {
      state.meStatus = ACTION_STATUS.IDLE;
      state.me = null;
    },
    meUpdateLoading: (state) => {
      state.meUpdateStatus = ACTION_STATUS.LOADING;
    },
    meUpdateSuccess: (state) => {
      state.meUpdateStatus = ACTION_STATUS.SUCCESS;
    },
    meUpdateError: (state) => {
      state.meUpdateStatus = ACTION_STATUS.ERROR;
    },
    meUpdateIdle: (state) => {
      state.meUpdateStatus = ACTION_STATUS.IDLE;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userSliceActions = userSlice.actions;
