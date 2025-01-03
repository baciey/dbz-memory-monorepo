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
import { AuthModal } from "../modules/App/AuthModal";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const TestPaperProvider = ({
  children,
  withAuthModal,
}: PropsWithChildren<{
  withAuthModal?: boolean;
}>) => {
  const themeMode = useAppSelector(appSelectors.getThemeMode);

  return (
    <PaperProvider
      theme={
        themeMode === THEME_MODE.light
          ? CombinedDefaultTheme
          : CombinedDarkTheme
      }
    >
      {withAuthModal && <AuthModal />}
      {children}
    </PaperProvider>
  );
};

export function TestWrapper({
  children,
  store = setupStore({}),
  withAuthModal = true,
}: PropsWithChildren<{
  store?: AppStore;
  withAuthModal?: boolean;
}>): JSX.Element {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <TestPaperProvider withAuthModal={withAuthModal}>
          {children}
        </TestPaperProvider>
      </I18nextProvider>
    </Provider>
  );
}

export function TestHooksWrapper({
  children,
  store = setupStore({}),
}: PropsWithChildren<{ store?: AppStore }>): JSX.Element {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
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
  withAuthModal = true,
) {
  return {
    store,
    ...render(ui, {
      wrapper: (props) => (
        <TestWrapper store={store} {...props} withAuthModal={withAuthModal} />
      ),
      ...renderOptions,
    }),
  };
}
