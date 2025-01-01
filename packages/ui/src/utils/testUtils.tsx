import React, { PropsWithChildren } from "react";
import { type RenderOptions, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import {
  AppStore,
  RootState,
  setupStore,
  useAppSelector,
} from "../redux/store";
import { PaperProvider } from "react-native-paper";
import { I18nextProvider } from "react-i18next";
import { i18n } from "../locales";
import { THEME_MODE } from "../constants/theme";
import { CombinedDarkTheme, CombinedDefaultTheme } from "../styles/theme";
import { appSelectors } from "../modules/App/selectors";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const TestPaperProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

export function TestWrapper({
  children,
  store = setupStore({}),
}: PropsWithChildren<{ store?: AppStore }>): JSX.Element {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <TestPaperProvider>{children}</TestPaperProvider>
      </I18nextProvider>
    </Provider>
  );
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  return {
    store,
    ...render(ui, {
      wrapper: (props) => <TestWrapper store={store} {...props} />,
      ...renderOptions,
    }),
  };
}
