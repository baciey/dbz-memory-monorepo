import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { Provider } from "react-redux";
import {
  store,
  useAppSelector,
  appSelectors,
  useSetLanguage,
  useSetTheme,
  PaperProviderWrapper,
  THEME_MODES,
} from "@repo/ui";
import { StatusBar } from "expo-status-bar";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const AppWithStore = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const isDarkMode =
    useAppSelector(appSelectors.getThemeMode) === THEME_MODES.dark;

  useSetLanguage();
  useSetTheme();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PaperProviderWrapper>
        <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
          <StatusBar style={isDarkMode ? "light" : "dark"} />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </PaperProviderWrapper>
    </Provider>
  );
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppWithStore />
    </Provider>
  );
}
