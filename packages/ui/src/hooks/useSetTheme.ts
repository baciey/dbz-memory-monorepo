import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { useAppDispatch } from "../redux/store";
import { THEME_MODE } from "../constants/theme";
import { appActions } from "../modules/App/actions";

export const useSetTheme = () => {
  const colorScheme = (useColorScheme() || THEME_MODE.light) as THEME_MODE;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const setThemeMode = async () => {
      try {
        const themeMode = await AsyncStorage.getItem("themeMode");
        if (themeMode === THEME_MODE.light || themeMode === THEME_MODE.dark) {
          dispatch(appActions.changeThemeMode(themeMode));
        } else {
          dispatch(appActions.changeThemeMode(colorScheme));
        }
      } catch (error) {
        console.error("setThemeMode error:", error);
      }
    };

    setThemeMode();
  }, [dispatch, colorScheme]);

  return null;
};
