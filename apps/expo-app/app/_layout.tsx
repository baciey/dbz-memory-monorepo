import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import SpaceMono from "../assets/fonts/SpaceMono-Regular.ttf";

import { Provider } from "react-redux";
import {
  store,
  useAppSelector,
  useGetLanguageFromAsyncStorage,
  useGetThemeFromAsyncStorage,
  PaperProviderWrapper,
  THEME_MODE,
  useHandleAuthState,
  AuthModal,
} from "@repo/ui";
import { StatusBar } from "expo-status-bar";
import { appSelectors } from "@repo/ui/src/modules/App/selectors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const AppWithStore = () => {
  const [loaded] = useFonts({
    SpaceMono: SpaceMono,
  });

  const isDarkMode =
    useAppSelector(appSelectors.getThemeMode) === THEME_MODE.dark;

  useGetLanguageFromAsyncStorage();
  useGetThemeFromAsyncStorage();
  useHandleAuthState();

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
