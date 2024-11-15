import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const CombinedDefaultTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: "#ffffff",
    onBackground: "#11181C",
    surface: "#F9F7F5",
    onSurface: "#11181C",
    primary: "#4b6cdb",
    onPrimary: "#ffffff",
    secondary: "green",
    // tertiary: "#0a7ea4",
  },
};
export const CombinedDarkTheme = {
  ...MD3DarkTheme,
  roundness: 4,
  colors: {
    ...MD3DarkTheme.colors,
    background: "#151718",
    onBackground: "#b3b4b5",
    surface: "#37383b",
    onSurface: "#cccecf",
    primary: "#4b6cdb",
    onPrimary: "#11181C",
    secondary: "green",
    // tertiary: "#0a7ea4",
  },
};
