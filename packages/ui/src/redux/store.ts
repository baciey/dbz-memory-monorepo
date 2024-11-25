import { PayloadAction, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { baseApi } from "./services/api";
import { APP_REDUCER_NAME, appReducer } from "./slice";
import { BOARD_REDUCER_NAME, boardReducer } from "../modules/Board/slice";
import { GAMES_REDUCER_NAME, gamesReducer } from "./Games/slice";

export const store = configureStore({
  reducer: {
    [APP_REDUCER_NAME]: appReducer,
    [BOARD_REDUCER_NAME]: boardReducer,
    [GAMES_REDUCER_NAME]: gamesReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
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
