import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { useAppDispatch } from "../redux/store";
import { appActions } from "../redux/actions";
import { THEME_MODES } from "../constants/theme";

export const useSetTheme = () => {
  const colorScheme = (useColorScheme() || THEME_MODES.light) as THEME_MODES;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const setThemeMode = async () => {
      try {
        const themeMode = await AsyncStorage.getItem("themeMode");
        if (themeMode === THEME_MODES.light || themeMode === THEME_MODES.dark) {
          dispatch(appActions.changeThemeMode(themeMode));
        } else {
          dispatch(appActions.changeThemeMode(colorScheme));
        }
      } catch (error) {
        console.error("setThemeMode error:", error);
      }
    };

    setThemeMode();
  }, [dispatch]);

  return null;
};
