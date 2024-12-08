import React, { ReactNode } from "react";
import { THEME_MODE } from "../../constants/theme";
import { useAppSelector } from "../../redux/store";
import { appSelectors } from "../../redux/selectors";
import { CombinedDarkTheme, CombinedDefaultTheme } from "../../styles/theme";
import { PaperProvider } from "react-native-paper";

export const PaperProviderWrapper = ({ children }: { children: ReactNode }) => {
  const themeMode = useAppSelector(appSelectors.getThemeMode);

  return (
    <PaperProvider
      theme={
        themeMode === THEME_MODE.light
          ? CombinedDefaultTheme
          : CombinedDarkTheme
      }
    >
      {children}
    </PaperProvider>
  );
};
