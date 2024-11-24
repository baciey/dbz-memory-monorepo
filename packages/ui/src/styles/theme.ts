import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { GLOBAL_STYLES } from "./globalStyles";

export const CombinedDefaultTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: GLOBAL_STYLES.colors.white,
    onBackground: GLOBAL_STYLES.colors.blackLight,
    surface: GLOBAL_STYLES.colors.whiteDark,
    onSurface: GLOBAL_STYLES.colors.blackLight,
    primary: GLOBAL_STYLES.colors.blue,
    onPrimary: GLOBAL_STYLES.colors.whiteDark,
    secondary: GLOBAL_STYLES.colors.green,
    onSecondary: GLOBAL_STYLES.colors.white,
    tertiary: GLOBAL_STYLES.colors.blueLight,
    backdrop: GLOBAL_STYLES.colors.backdrop,
  },
};
export const CombinedDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: GLOBAL_STYLES.colors.black,
    onBackground: GLOBAL_STYLES.colors.whiteDark,
    surface: GLOBAL_STYLES.colors.blackLight,
    onSurface: GLOBAL_STYLES.colors.whiteDark,
    primary: GLOBAL_STYLES.colors.blue,
    onPrimary: GLOBAL_STYLES.colors.black,
    secondary: GLOBAL_STYLES.colors.green,
    onSecondary: GLOBAL_STYLES.colors.black,
    tertiary: GLOBAL_STYLES.colors.blueLight,
    backdrop: GLOBAL_STYLES.colors.backdrop,
  },
};
