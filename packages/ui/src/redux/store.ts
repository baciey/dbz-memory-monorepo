import { PayloadAction, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { USER_REDUCER_NAME, userReducer } from "../modules/User/slice";
import { GAME_REDUCER_NAME, gameReducer } from "../modules/Game/slice";
import { APP_REDUCER_NAME, appReducer } from "../modules/App/slice";

export const store = configureStore({
  reducer: {
    [APP_REDUCER_NAME]: appReducer,
    [USER_REDUCER_NAME]: userReducer,
    [GAME_REDUCER_NAME]: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type PayloadThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  PayloadAction<unknown>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
