import {
  PayloadAction,
  ThunkAction,
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { USER_REDUCER_NAME, userReducer } from "../modules/User/slice";
import { GAME_REDUCER_NAME, gameReducer } from "../modules/Game/slice";
import { APP_REDUCER_NAME, appReducer } from "../modules/App/slice";

const rootReducer = combineReducers({
  [APP_REDUCER_NAME]: appReducer,
  [USER_REDUCER_NAME]: userReducer,
  [GAME_REDUCER_NAME]: gameReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export type PayloadThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  PayloadAction<unknown>
>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
