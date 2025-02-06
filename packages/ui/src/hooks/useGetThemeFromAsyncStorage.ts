import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../redux/store";
import { THEME_MODE } from "../constants/theme";
import { appActions } from "../modules/App/actions";

export const useGetThemeFromAsyncStorage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const setThemeMode = async () => {
      try {
        const themeMode = await AsyncStorage.getItem("themeMode");
        if (themeMode === THEME_MODE.light) {
          dispatch(appActions.changeThemeMode(themeMode));
        } else {
          dispatch(appActions.changeThemeMode(THEME_MODE.dark));
        }
      } catch (error) {
        console.error("setThemeMode error:", error);
      }
    };

    setThemeMode();
  }, [dispatch]);

  return null;
};
