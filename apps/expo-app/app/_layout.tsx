import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import SpaceMono from "../assets/fonts/SpaceMono-Regular.ttf";
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
  useGetUser,
  AuthModal,
} from "@repo/ui";
import { StatusBar } from "expo-status-bar";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const AppWithStore = () => {
  const [loaded] = useFonts({
    SpaceMono: SpaceMono,
  });

  const isDarkMode =
    useAppSelector(appSelectors.getThemeMode) === THEME_MODES.dark;

  useSetLanguage();
  useSetTheme();
  useGetUser();

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
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        <AuthModal />

        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="test" />
        </Stack>
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
