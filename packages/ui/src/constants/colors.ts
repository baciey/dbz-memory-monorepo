/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const COLORS = {
  light: {
    text: "#11181C", //black
    background: "#fff", //white
    background2: "#F9F7F5", //dark white
    tint: tintColorLight, //lightblue
    icon: "#687076", //grey
    tabIconDefault: "#687076", //grey
    tabIconSelected: tintColorLight, //lightblue
  },
  dark: {
    text: "#ECEDEE", //lightgrey
    background: "#151718", //black
    background2: "#37383b", //light black
    tint: tintColorDark, //white
    icon: "#9BA1A6", //grey
    tabIconDefault: "#9BA1A6", //grey
    tabIconSelected: tintColorDark, //white
  },
};
